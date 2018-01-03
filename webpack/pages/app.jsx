import React from 'react'
import PropTypes from 'prop-types'
import AppUpdate from 'containers/appUpdate'
import {renderRoutes} from 'react-router-config'

export default class AppLayout extends React.Component {
  static propTypes = {
    route: PropTypes.shape({
      routes: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
      ]).isRequired
    }).isRequired
  }

  render() {
    const {route} = this.props

    return (
      <div>
        <AppUpdate />
        {renderRoutes(route.routes)}
      </div>
    )
  }
}
