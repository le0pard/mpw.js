import React from 'react'
import PropTypes from 'prop-types'
import _camelCase from 'lodash/camelCase'

export default class FormDropdown extends React.Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired
    }).isRequired),
    meta: PropTypes.shape({
      touched: PropTypes.bool.isRequired,
      error: PropTypes.string
    }).isRequired
  }

  render() {
    const {
      label,
      input,
      options,
      meta: {touched, error}
    } = this.props

    const dropdownID = _camelCase(`${input.name}-id`)

    return (
      <div>
        <label htmlFor={dropdownID}>
          {label}
        </label>
        <div>
          <select {...input} id={dropdownID}>
            {options.map((option, index) => {
              return (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              )
            })}
          </select>
          {touched && error && <span>{error}</span>}
        </div>
      </div>
    )
  }
}
