import React from 'react'
import PropTypes from 'prop-types'
import GithubCorner from 'components/githubCorner'
import AppUpdate from 'containers/appUpdate'
import {NavLink} from 'react-router-dom'
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
        <GithubCorner />
        <NavLink to="/">
          Dashboard
        </NavLink>
        <NavLink to="/algorithm">
          How It Works
        </NavLink>
        <AppUpdate />
        {renderRoutes(route.routes)}
      </div>
    )
  }
}
