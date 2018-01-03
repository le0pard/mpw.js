import React from 'react'
import PropTypes from 'prop-types'

export default class FormField extends React.Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    inputProps: PropTypes.object,
    autoFocus: PropTypes.bool,
    meta: PropTypes.shape({
      touched: PropTypes.bool.isRequired,
      error: PropTypes.string
    }).isRequired
  }

  static defaultProps = {
    inputProps: {}
  }

  render() {
    const {
      label,
      input,
      type,
      inputProps,
      meta: {touched, error}
    } = this.props

    return (
      <div>
        <label>{label}</label>
        <div>
          <input
            {...input}
            {...inputProps}
            placeholder={label}
            type={type} />
          {touched && error && <span>{error}</span>}
        </div>
      </div>
    )
  }
}
