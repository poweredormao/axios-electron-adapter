//import {StringLTrim, StringRTrim} from './trims'

const {StringLTrim, StringRTrim} = require('./trims')

const config = {
    baseURL: "http://localhost/",
    url: "/v2/zoo/animals/",
};
const FinalResult = 'http://localhost/v2/zoo/animals/';

let baseUrl = config.baseURL? config.baseURL : '';
let configUrl = config.url ? config.url : '';
baseUrl = StringRTrim(baseUrl, '/');
configUrl = StringLTrim(configUrl, '/');
const FullUrl = `${baseUrl}/${configUrl}`;
console.log(FullUrl, FinalResult)
console.assert(FullUrl === FinalResult);
