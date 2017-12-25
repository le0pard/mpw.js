import React from 'react'
import PropTypes from 'prop-types'
import {Provider} from 'react-redux'
import {routerHistory} from './redux/store'
import {ConnectedRouter} from 'react-router-redux'
import {renderRoutes} from 'react-router-config'
import {routes} from './routes'
import {initServiceWorker} from './sw'
import {initWebWorker} from './ww'

export default class Root extends React.Component {
  static propTypes = {
    appRoot: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    const {appRoot, store} = props
    initServiceWorker(store)
    initWebWorker(appRoot, store)
  }

  render() {
    const {store} = this.props

    return (
      <Provider store={store} key="provider">
        <ConnectedRouter history={routerHistory} key="connected-router">
          {renderRoutes(routes)}
        </ConnectedRouter>
      </Provider>
    )
  }
}
