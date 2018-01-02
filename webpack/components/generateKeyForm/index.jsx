import React from 'react'
import PropTypes from 'prop-types'
import {Field} from 'redux-form'
import FormField from 'components/form/field'
import FormDropdown from 'components/form/dropdown'
import Spinner from 'components/spinner'

export default class GenerateKeyForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    isHaveGeneratedKey: PropTypes.bool.isRequired,
    isGeneratingKey: PropTypes.bool.isRequired,
    onSubmitForm: PropTypes.func.isRequired
  }

  handleGenerateKey(values) {
    this.props.onSubmitForm(values)
  }

  render() {
    const {
      isHaveGeneratedKey,
      isGeneratingKey,
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
          component={FormField}
          autoFocus={true}
          label="Name"
        />
        <Field
          name="password"
          type="password"
          component={FormField}
          label="Password"
        />
        <Field
          name="version"
          component={FormDropdown}
          label="Version"
          options={[
            {label: 'V3', value: 3},
            {label: 'V2', value: 2},
            {label: 'V1', value: 1},
            {label: 'V0', value: 0}
          ]}
        />
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
        {isGeneratingKey && <Spinner />}
      </form>
    )
  }
}
