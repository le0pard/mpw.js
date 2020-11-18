import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import _camelCase from 'lodash/camelCase'

import './dropdown.sass'

const FormDropdown = ({
  label,
  options,
  field,
  form: {
    touched,
    errors
  },
  ...rest
}) => {
  const dropdownID = _camelCase(`${field.name}-id`)
  const isError = touched[field.name] && errors[field.name]

  return (
    <div
      className={classnames('form-dropdown', {
        'form-dropdown--error': isError
      })}>
      <div className="form-dropdown__wrapper">
        <label className="form-dropdown__label" htmlFor={dropdownID}>
          {label}
        </label>
        <select className="form-dropdown__select" {...field} {...rest} id={dropdownID}>
          {options.map((option, index) => {
            return (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            )
          })}
        </select>
      </div>
      {isError && <div className="form-dropdown__error">{errors[field.name]}</div>}
    </div>
  )
}

FormDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.any
  }).isRequired,
  form: PropTypes.shape({
    touched: PropTypes.object,
    errors: PropTypes.object
  }).isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired
  }).isRequired)
}

export default FormDropdown
