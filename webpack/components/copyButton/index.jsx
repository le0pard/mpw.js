import React from 'react'
import PropTypes from 'prop-types'
import Clipboard from 'clipboard'

export default class CopyButton extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    label: PropTypes.string
  }

  static defaultProps = {
    label: 'Copy'
  }

  componentDidMount() {
    if (this.copyButton) {
      this.clipboard = new Clipboard(this.copyButton)
    }
  }

  componentWillUnmount() {
    if (this.clipboard) {
      this.clipboard.destroy()
    }
  }

  buttonRef(r) {
    this.copyButton = r
  }

  render() {
    const {label, text} = this.props

    return (
      <button
        ref={(r) => this.buttonRef(r)}
        data-clipboard-text={text}>
        {label}
      </button>
    )
  }
}
