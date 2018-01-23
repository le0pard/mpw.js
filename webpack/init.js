// general css, css-only components, third-party libraries
import './css/app.sass'

// general polifils
import 'whatwg-fetch'
import Promise from 'promise-polyfill'

// To add to window
if (!window.Promise) window.Promise = Promise
