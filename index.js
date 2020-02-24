'use strict';
import { remote } from 'electron'
import * as createError from 'axios/lib/core/createError';
import * as settle from 'axios/lib/core/settle';

/**
 * The Electron Adapter, creates with axios config
 * Usage:
 * @code AxiosStatic.defaults.adapter = ElectronAdapter
 * @param config AxiosRequestConfig
 * @returns {Promise} the promise
 */
module.exports = function ElectronAdapter(config) {
    const processFunc = (resolve, reject) => {
        const FullUrl =
            (config.baseURL? config.baseURL : '') +
            (config.baseURL?.endsWith('/') ? '' : '/') +
            (config.url? config.url : '');
        const clientReq = remote.net.request({
            method: config.method,
            url: FullUrl
        });

        if (config.headers){
            for (const key in config.headers){
                if (config.headers.hasOwnProperty(key))
                    clientReq.setHeader(key, config.headers[key])
            }
        }

        clientReq
            .on("response", response => {
                response
                    .on('data', chunk => {
                        const contentType = response.headers['Content-Type'] || response.headers['content-type'] || 'application/json; charset=utf-8';
                        const data = (contentType.indexOf('application/json') !== -1) ?
                            JSON.parse(chunk.toString('utf8')) : chunk.toString();
                        const axiosResp = {
                            status: response.statusCode,
                            headers: response.headers,
                            config: config,
                            request: clientReq,
                            statusText: response.statusMessage,
                            data: data,
                        };
                        settle(resolve, reject, axiosResp)
                    })
                    .on('error', () => {
                        reject(createError('Network Error', config, null, clientReq))
                    })
                    .on('aborted', () => {
                        reject(createError('Request aborted', config, 'ECONNABORTED', clientReq));
                    })
            })
            .on('error', error => {
                reject(createError(`Network Error : ${error.message}`, config, null, clientReq));
            })
            .end(config.data, 'utf8')
    };
    return Promise.race([
        new Promise((resolve, reject) => processFunc(resolve, reject)),
        new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(createError('Timeout'))
            }, config.timeout? config.timeout : 2000)
        })
    ])
};
