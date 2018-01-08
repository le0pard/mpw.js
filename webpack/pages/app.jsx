import React from 'react'
import PropTypes from 'prop-types'
import GithubCorner from 'containers/githubCorner'
import AppUpdate from 'containers/appUpdate'
import ThemeSwitcher from 'containers/themeSwitcher'
import {NavLink} from 'react-router-dom'
import {renderRoutes} from 'react-router-config'

import './app.sass'

export default class AppLayout extends React.Component {
  static propTypes = {
    route: PropTypes.shape({
      routes: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
      ]).isRequired
    }).isRequired
  }

  renderNavigation() {
    return (
      <nav className="app__navigation" role="navigation">
        <div className="app__navigation__item">
          <NavLink to="/">Dashboard</NavLink>
        </div>
        <div className="app__navigation__item">
          <NavLink to="/algorithm">How It Works</NavLink>
        </div>
        <div className="app__navigation__item">
          <ThemeSwitcher />
        </div>
      </nav>
    )
  }

  render() {
    const {route} = this.props

    return (
      <div className="app">
        <GithubCorner />
        <main className="app__main" role="main">
          {this.renderNavigation()}
          <AppUpdate />
          {renderRoutes(route.routes)}
        </main>
      </div>
    )
  }
}
