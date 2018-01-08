import React from 'react'
import PropTypes from 'prop-types'
import {APP_THEMES} from 'reducers/settings'

export default class ThemeSwitcher extends React.Component {
  static propTypes = {
    theme: PropTypes.oneOf(APP_THEMES),
    settingsToggleTheme: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.htmlRoot = document.querySelector(':root')
  }

  updateDomTheme() {
    if (this.htmlRoot) {
      const {theme} = this.props
      this.htmlRoot.className = theme
    }
  }

  componentDidMount() {
    this.updateDomTheme()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.theme !== this.props.theme) {
      this.updateDomTheme()
    }
  }

  handleToggleTheme(e) {
    e.preventDefault()
    const {theme, settingsToggleTheme} = this.props
    settingsToggleTheme(theme)
  }

  render() {
    const {theme} = this.props

    return (
      <a onClick={this.handleToggleTheme.bind(this)} href="#">
        {theme} theme
      </a>
    )
  }
}
