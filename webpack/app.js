import './init'
import React from 'react'
import ReactDom from 'react-dom'
import Root from './root'
import LocalStorage from 'lib/localStorage'
import {initializeStore} from './redux/store'
import {initServiceWorker} from './sw'
import {initWebWorker} from './ww'

const renderApp = (Component, appRoot, store) => {
  initWebWorker(appRoot, store)
  initServiceWorker(store)

  ReactDom.render(
    <Component store={store} />,
    appRoot, () => {
      // need to make this for feature tests - application ready for testing
      window.__isAppReady = true
    })
}

const prepareData = () => ({
  settings: {
    hidePassword: LocalStorage.getItem('hidePassword') || false
  }
})

const appRoot = document.getElementById('app-root')
const store = initializeStore(prepareData())
renderApp(Root, appRoot, store)
