import React from 'react'
import PropTypes from 'prop-types'
import {Field} from 'redux-form'
import GenerateKeyField from './field'

export default class GenerateKeyForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    isHaveGeneratedKey: PropTypes.bool.isRequired,
    onSubmitForm: PropTypes.func.isRequired
  }

  handleGenerateKey(values) {
    this.props.onSubmitForm(values)
  }

  render() {
    const {
      isHaveGeneratedKey,
      handleSubmit,
      pristine,
      submitting,
      reset
    } = this.props

    if (isHaveGeneratedKey) {
      return null
    }

    return (
      <form onSubmit={handleSubmit(this.handleGenerateKey.bind(this))}>
        <Field
          name="name"
          type="text"
          component={GenerateKeyField}
          label="Name"
        />
        <Field
          name="password"
          type="password"
          component={GenerateKeyField}
          label="Password"
        />
        <Field name="version" component="select">
          <option value="3">V3</option>
          <option value="2">V2</option>
          <option value="1">V1</option>
          <option value="0">V0</option>
        </Field>
        <div>
          <button type="submit" disabled={submitting}>
            Generate
          </button>
          <button type="button"
            disabled={pristine || submitting}
            onClick={reset}>
            Clear Values
          </button>
        </div>
      </form>
    )
  }
}
