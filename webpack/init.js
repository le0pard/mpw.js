// general css, css-only components, third-party libraries
import './css/app.sass'

// general polifils
import 'whatwg-fetch'
import config from 'config'
import Raven from 'raven-js'
import Promise from 'promise-polyfill'

// To add to window
if (!window.Promise) window.Promise = Promise

// init sentry
if (config.sentry.enabled) {
  Raven.config(config.sentry.dsn).install()
}
