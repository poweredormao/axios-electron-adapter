# axios-electron-adapter
用于Electron网络请求的Axios适配器

在独立的Electron应用程序里面用Axios发送网络请求会被CORS阻止，不管适配器是XHR还是NodeJS HTTP（切换后捕捉到的请求还是XHR类型）
~~~
# 开发模式的 origin 字段
    origin: http://localhost:8080
# 应用程序模式的 origin 字段
    origin: file://
~~~

# 用法
~~~ javascript
import ElectronAdapter from 'axios-electron-adapter'

# 替代默认的Axios适配器
AxiosStatic.defaults.adapter = ElectronAdapter

# 正常调用Axios发请求
const EXAMPLE_BASEURL = 'http://localhost'
const EXAMPLE_POST_DATA = {
    title: "hello sign"
}
Axios.post('/myworld/signs', EXAMPLE_POST_DATA)
~~~

# 提示
由这个适配器发起的网络请求无法被控制台（Devtools > Network）记录
