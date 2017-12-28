import React from 'react'
import PropTypes from 'prop-types'
import {Field} from 'redux-form'
import GenerateKeyField from './field'
import SelectDropdown from 'components/selectDropdown'

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
        <Field
          name="version"
          component={SelectDropdown}
          options={[{label: 'V3', value: 3}]}
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
      </form>
    )
  }
}
