import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './field.sass'

const FormField = ({
  label,
  field,
  form: {
    touched,
    errors
  },
  ...rest
}) => {
  const isError = touched[field.name] && errors[field.name]

  return (
    <div
      className={classnames('form-field', {
        'form-field--error': isError
      })}>
      <div className="form-field__input-wrapper">
        <input
          {...field}
          {...rest}
          className="form-field__input"
          placeholder={label}
          aria-label={label} />
      </div>
      {isError && <div className="form-field__error">{errors[field.name]}</div>}
    </div>
  )
}

FormField.propTypes = {
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

export default FormField
