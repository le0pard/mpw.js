import React from 'react'
import PropTypes from 'prop-types'
import Clipboard from 'clipboard'

const COPIED_TIMEOUT = 1500

export default class CopyButton extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    text: PropTypes.string.isRequired,
    label: PropTypes.string,
    successLabel: PropTypes.string,
    errorLabel: PropTypes.string
  }

  static defaultProps = {
    label: 'Copy',
    successLabel: 'Copied',
    errorLabel: 'Error'
  }

  constructor(props) {
    super(props)
    this.initialState = {
      copiedSuccess: false,
      copiedError: false
    }
    this.state = this.initialState
  }

  resetState() {
    setTimeout(() => {
      if (this.clipboard) {
        this.setState(() => (this.initialState))
      }
    }, COPIED_TIMEOUT)
  }

  componentDidMount() {
    if (this.copyButton) {
      this.clipboard = new Clipboard(this.copyButton)
      this.clipboard.on('success', () => {
        this.setState(() => ({copiedSuccess: true}))
        this.resetState()
      })
      this.clipboard.on('error', () => {
        this.setState(() => ({copiedError: true}))
        this.resetState()
      })
    }
  }

  componentWillUnmount() {
    if (this.clipboard) {
      this.clipboard.destroy()
      this.clipboard = null
    }
  }

  buttonRef(r) {
    this.copyButton = r
  }

  renderLabel() {
    const {label, successLabel, errorLabel} = this.props
    const {copiedSuccess, copiedError} = this.state

    if (copiedSuccess) {
      return successLabel
    } else if (copiedError) {
      return errorLabel
    } else {
      return label
    }
  }

  render() {
    const {text, className} = this.props

    return (
      <button
        className={className}
        ref={(r) => this.buttonRef(r)}
        data-clipboard-text={text}>
        {this.renderLabel()}
      </button>
    )
  }
}
