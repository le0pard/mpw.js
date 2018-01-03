import React from 'react'
import PropTypes from 'prop-types'
import _camelCase from 'lodash/camelCase'

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

    const inputID = _camelCase(`${input.name}-id`)

    return (
      <div>
        <label htmlFor={inputID}>
          {label}
        </label>
        <div>
          <input
            {...input}
            {...inputProps}
            id={inputID}
            placeholder={label}
            type={type} />
          {touched && error && <span>{error}</span>}
        </div>
      </div>
    )
  }
}
