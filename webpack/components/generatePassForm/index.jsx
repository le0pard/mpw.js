import React from 'react'
import PropTypes from 'prop-types'
import {Field} from 'redux-form'
import GeneratePassField from './field'

export default class GenerateKeyForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    isHaveGeneratedKey: PropTypes.bool.isRequired,
    password: PropTypes.string,
    onSubmitForm: PropTypes.func.isRequired
  }

  handlePasswordGeneration(values) {
    this.props.onSubmitForm(values)
  }

  render() {
    const {
      isHaveGeneratedKey,
      handleSubmit,
      pristine,
      submitting,
      reset,
      password
    } = this.props

    if (!isHaveGeneratedKey) {
      return null
    }

    return (
      <form onChange={() => {
        setTimeout(handleSubmit(this.handlePasswordGeneration.bind(this)), 0)
      }} onSubmit={handleSubmit(this.handlePasswordGeneration.bind(this))}>
        <Field
          name="site"
          type="text"
          component={GeneratePassField}
          label="Site"
        />
        <Field
          name="counter"
          type="number"
          component={GeneratePassField}
          defaultValue={0}
          label="Counter"
        />
        <Field name="template" component="select">
          <option value="pin">PIN</option>
          <option value="short">Short</option>
          <option value="basic">Basic</option>
          <option value="medium">Medium</option>
          <option value="long">Long</option>
          <option value="maximum">Maximum</option>
          <option value="name">Name</option>
          <option value="phrase">Phrase</option>
        </Field>
        <div>
          <button type="submit" disabled={submitting}>
            Generate Password
          </button>
          <button type="button"
            disabled={pristine || submitting}
            onClick={reset}>
            Clear Values
          </button>
        </div>
        {password && <div>
          <h1>Your password: {password}</h1>
        </div>}
      </form>
    )
  }
}
