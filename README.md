# axios-electron-adapter
The axios adapter for electron net request

Using XHR in Electron production mode will be blocked by CORS
~~~
# Origin in dev mode
    origin: http://localhost:8080
# Origin in production mode (Executable standalone)
    origin: file://
~~~

# Usage
~~~ javascript
import ElectronAdapter from 'axios-electron-adapter'

# Replace default adapter on boot
AxiosStatic.defaults.adapter = ElectronAdapter

# General request make
const EXAMPLE_BASEURL = 'http://localhost'
const EXAMPLE_POST_DATA = {
    title: "The sign"
}
Axios.post('/myworld/signs', EXAMPLE_POST_DATA)
~~~

# Warning
The request made by Electron will not be recorded in Devtools > Network
