import React from 'react'
import PropTypes from 'prop-types'
import _times from 'lodash/times'
import _debounce from 'lodash/debounce'
import classnames from 'classnames'
import {Field} from 'redux-form'
import FormField from 'components/form/field'
import FormDropdown from 'components/form/dropdown'
import CopyButton from 'components/copyButton'

import './generate-pass.sass'

const INPUT_CHANGE_TIMEOUT = 150
export const INPUT_TEMPLATES = [
  {label: 'PIN', value: 'pin'},
  {label: 'Short', value: 'short'},
  {label: 'Basic', value: 'basic'},
  {label: 'Medium', value: 'medium'},
  {label: 'Long', value: 'long'},
  {label: 'Maximum', value: 'maximum'},
  {label: 'Name', value: 'name'},
  {label: 'Phrase', value: 'phrase'}
]

export default class GenerateKey extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    password: PropTypes.string,
    onSubmitForm: PropTypes.func.isRequired,
    hidePassword: PropTypes.bool.isRequired,
    formResetPassword: PropTypes.func.isRequired,
    resetMpwKey: PropTypes.func.isRequired,
    settingsTogglePassword: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.formChangeBind = this.formChangeBind.bind(this)
  }

  handlePasswordGeneration(values) {
    this.props.onSubmitForm(values)
  }

  handleFormSubmitFunc() {
    const {handleSubmit} = this.props
    return handleSubmit(this.handlePasswordGeneration.bind(this))
  }

  formChangeBind() {
    setTimeout(this.handleFormSubmitFunc(), 0)
  }

  handleResetPassword() {
    const {reset, formResetPassword} = this.props
    formResetPassword()
    reset()
  }

  togglePasswordVisibility(e) {
    this.props.settingsTogglePassword(e.target.checked)
  }

  displayPassword(password, hidePassword) {
    if (hidePassword) {
      return _times(password.length, () => '*').join('')
    } else {
      return password
    }
  }

  resetMpwKey(e) {
    e.preventDefault()
    this.props.resetMpwKey()
  }

  renderPassword() {
    const {password, hidePassword} = this.props

    if (!password) {
      return null
    }

    return (
      <div>
        <h2 className="generate-pass__result-title">
          Your password
        </h2>
        <div className="generate-pass__result-wrapper">
          <div className="generate-pass__result-inputs">
            <input
              className="generate-pass__result-password"
              type="text"
              onFocus={(e) => e.target.select()}
              readOnly={true}
              value={this.displayPassword(password, hidePassword)} />
            <div>
              <input
                className="generate-pass__password-visibility-input"
                id="passwordVisibilityId"
                type="checkbox"
                name="passwordVisibility"
                defaultChecked={hidePassword}
                onChange={this.togglePasswordVisibility.bind(this)} />
              <label
                className="generate-pass__password-visibility-label"
                htmlFor="passwordVisibilityId">
                Hide generated password
              </label>
            </div>
          </div>
          <CopyButton
            className="generate-pass__result-copy-button"
            text={password} />
        </div>
      </div>
    )
  }

  render() {
    const {
      pristine,
      submitting
    } = this.props

    return (
      <div>
        <div className="generate-pass__reset-wrapper">
          <a className="generate-pass__reset-link"
            href="#" onClick={this.resetMpwKey.bind(this)}>
            Reset master key
          </a>
        </div>
        <form
          onChange={_debounce(this.formChangeBind, INPUT_CHANGE_TIMEOUT)}
          onSubmit={this.handleFormSubmitFunc()}>
          <Field
            name="site"
            type="text"
            component={FormField}
            inputProps={{
              autoFocus: true,
              autoComplete: 'off',
              autoCorrect: 'off',
              autoCapitalize: 'none'
            }}
            label="Site"
          />
          <Field
            name="counter"
            type="number"
            component={FormField}
            inputProps={{
              step: 1,
              min: 1,
              max: 1000,
              pattern: '[0-9]*'
            }}
            label="Counter"
          />
          <Field
            name="template"
            component={FormDropdown}
            label="Template"
            options={INPUT_TEMPLATES}
          />
          <div className="generate-pass__buttons-wrapper">
            <button className={classnames('generate-pass__submit-button', {
              'generate-pass__submit-button--disabled': submitting
            })} type="submit" disabled={submitting}>
              Generate Password
            </button>
            <button className={classnames('generate-pass__reset-button', {
              'generate-pass__reset-button--disabled': pristine || submitting
            })} type="button" disabled={pristine || submitting}
            onClick={this.handleResetPassword.bind(this)}>
              Clear Form
            </button>
          </div>
        </form>
        {this.renderPassword()}
      </div>
    )
  }
}
