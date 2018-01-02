import React from 'react'
import PropTypes from 'prop-types'

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

    return (
      <div>
        <label>{label}</label>
        <div>
          <select {...input}>
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
