import React from 'react'
import PropTypes from 'prop-types'
import _debounce from 'lodash/debounce'
import {Field} from 'redux-form'
import FormField from 'components/form/field'
import FormDropdown from 'components/form/dropdown'
import CopyButton from 'components/copyButton'

const INPUT_CHANGE_TIMEOUT = 150

export default class GenerateKeyForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    isHaveGeneratedKey: PropTypes.bool.isRequired,
    password: PropTypes.string,
    onSubmitForm: PropTypes.func.isRequired,
    formResetPassword: PropTypes.func.isRequired
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
    return setTimeout(this.handleFormSubmitFunc(), 0)
  }

  handleResetPassword() {
    const {reset} = this.props
    this.props.formResetPassword()
    reset()
  }

  renderPassword() {
    const {password} = this.props

    if (!password) {
      return null
    }

    return (
      <div>
        <h1>Your password: {password}</h1>
        <CopyButton text={password} />
      </div>
    )
  }

  render() {
    const {
      isHaveGeneratedKey,
      pristine,
      submitting
    } = this.props

    if (!isHaveGeneratedKey) {
      return null
    }

    return (
      <form
        onChange={_debounce(this.formChangeBind, INPUT_CHANGE_TIMEOUT)}
        onSubmit={this.handleFormSubmitFunc()}>
        <Field
          name="site"
          type="text"
          component={FormField}
          autoFocus={true}
          label="Site"
        />
        <Field
          name="counter"
          type="number"
          component={FormField}
          label="Counter"
        />
        <Field
          name="template"
          component={FormDropdown}
          label="Template"
          options={[
            {label: 'PIN', value: 'pin'},
            {label: 'Short', value: 'short'},
            {label: 'Basic', value: 'basic'},
            {label: 'Medium', value: 'medium'},
            {label: 'Long', value: 'long'},
            {label: 'Maximum', value: 'maximum'},
            {label: 'Name', value: 'name'},
            {label: 'Phrase', value: 'phrase'}
          ]}
        />
        <div>
          <button type="submit" disabled={submitting}>
            Generate Password
          </button>
          <button type="button"
            disabled={pristine || submitting}
            onClick={this.handleResetPassword.bind(this)}>
            Clear Values
          </button>
        </div>
        {this.renderPassword()}
      </form>
    )
  }
}
