import React from 'react'
import PropTypes from 'prop-types'

export default class FormField extends React.Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    autoFocus: PropTypes.bool,
    meta: PropTypes.shape({
      touched: PropTypes.bool.isRequired,
      error: PropTypes.string
    }).isRequired
  }

  static defaultProps = {
    autoFocus: false
  }

  render() {
    const {
      label,
      input,
      type,
      autoFocus,
      meta: {touched, error}
    } = this.props

    return (
      <div>
        <label>{label}</label>
        <div>
          <input
            {...input}
            placeholder={label}
            type={type}
            autoFocus={autoFocus} />
          {touched && error && <span>{error}</span>}
        </div>
      </div>
    )
  }
}
