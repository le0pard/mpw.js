import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import classnames from 'classnames'

const isSmallTouchDevice = 'ontouchstart' in window &&
  window.matchMedia &&
  window.matchMedia('(max-width: 1100px)').matches

export default class SelectDropdown extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
      ]).isRequired
    })).isRequired,
    clearable: PropTypes.bool,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func
  }

  onNativeDropdownChanged(evt) {
    const {options, clearable, onChange} = this.props
    if (onChange && evt.target) {
      const fixedOptions = clearable ? [{value: ''}, ...options] : options
      const selectedOption = fixedOptions[evt.target.selectedIndex]
      if (selectedOption) {
        onChange({value: selectedOption.value})
      }
    }
  }

  renderNativeDropdown() {
    const {
      value,
      placeholder,
      clearable,
      options,
      className,
      ...restProps
    } = this.props

    return (
      <div className={classnames('select-dropdown', className)}>
        <div className="Select-control">
          <select
            {...selectOptions}
            onChange={this.onNativeDropdownChanged.bind(this)}
            className="select-dropdown__select" value={value || ''}>
            {clearable ?
              <option value="">{placeholder || 'Select...'}</option> : null}
            {options.map((item, index) => {
              return (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              )
            })}
          </select>
          <span className="select-dropdown__arrow-wrapper">
            <span className="Select-arrow" />
          </span>
        </div>
      </div>
    );
  }

  renderDefaultDropdown() {
    const {className, placeholder, ...restProps} = this.props

    return (
      <Select {...restProps}
        placeholder={placeholder || 'Select...'}
        className={classnames('select-dropdown', className)}
      />
    );
  }

  render() {
    if (isSmallTouchDevice) {
      return this.renderNativeDropdown()
    } else {
      return this.renderDefaultDropdown()
    }
  }
}
