import React from 'react'
import PropTypes from 'prop-types'

export default class AppUpdate extends React.Component {
  static propTypes = {
    isNewVersionAvailable: PropTypes.bool.isRequired
  }

  reloadPage() {
    window.location.reload()
  }

  render() {
    const {isNewVersionAvailable} = this.props

    if (!isNewVersionAvailable) {
      return null
    }

    return (
      <div>
        <h3>
          New version available
        </h3>
        <a href="#" onClick={this.reloadPage.bind(this)}>Reload</a>
      </div>
    )
  }
}
