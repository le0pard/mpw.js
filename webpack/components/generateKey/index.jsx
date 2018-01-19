import React from 'react'
import PropTypes from 'prop-types'
import {Field} from 'redux-form'
import FormField from 'components/form/field'
import FormDropdown from 'components/form/dropdown'
import classnames from 'classnames'
import Spinner from 'components/spinner'

import './generate-key.sass'

export default class GenerateKey extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    isGeneratingKey: PropTypes.bool.isRequired,
    onSubmitForm: PropTypes.func.isRequired
  }

  handleGenerateKey(values) {
    this.props.onSubmitForm(values)
  }

  render() {
    const {
      isGeneratingKey,
      handleSubmit,
      pristine,
      submitting,
      reset
    } = this.props

    return (
      <div>
        <form onSubmit={handleSubmit(this.handleGenerateKey.bind(this))}>
          <Field
            name="name"
            type="text"
            component={FormField}
            inputProps={{autoFocus: true, autoComplete: 'on'}}
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
          <div className="generate-key__buttons-wrapper">
            <button className={classnames('generate-key__submit-button', {
              'generate-key__submit-button--disabled': submitting
            })} type="submit" disabled={submitting}>
              Generate Master Key
            </button>
            <button className={classnames('generate-key__reset-button', {
              'generate-key__reset-button--disabled': pristine || submitting
            })} type="button" disabled={pristine || submitting} onClick={reset}>
              Clear Form
            </button>
          </div>
        </form>
        {isGeneratingKey && <Spinner />}
      </div>
    )
  }
}
