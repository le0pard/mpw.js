import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './field.sass'

export default class FormField extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    field: PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.any
    }).isRequired,
    form: PropTypes.shape({
      touched: PropTypes.object,
      errors: PropTypes.object
    }).isRequired
  }

  render() {
    const {
      label,
      field,
      form: {
        touched,
        errors
      },
      ...props
    } = this.props

    const isError = touched[field.name] && errors[field.name]

    return (
      <div
        className={classnames('form-field', {
          'form-field--error': isError
        })}>
        <div className="form-field__input-wrapper">
          <input
            {...field}
            {...props}
            className="form-field__input"
            placeholder={label}
            aria-label={label} />
        </div>
        {isError && <div className="form-field__error">{errors[field.name]}</div>}
      </div>
    )
  }
}
