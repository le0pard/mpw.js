import React from 'react'
import PropTypes from 'prop-types'
import {Form, Field} from 'react-final-form'
import FormField from 'components/form/field'
import FormDropdown from 'components/form/dropdown'
import classnames from 'classnames'
import Spinner from 'components/spinner'

import './generate-key.sass'

const validate = (values) => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  }
  if (!values.password) {
    errors.password = 'Required'
  }
  return errors
}

export default class GenerateKey extends React.Component {
  static propTypes = {
    isGeneratingKey: PropTypes.bool.isRequired,
    onSubmitForm: PropTypes.func.isRequired
  }

  handleGenerateKey(values) {
    this.props.onSubmitForm(values)
  }

  render() {
    const {isGeneratingKey} = this.props

    return (
      <Form
        onSubmit={this.handleGenerateKey.bind(this)}
        initialValues={{version: 3}}
        validate={validate}
        subscription={{submitting: true, pristine: true}}
        render={({handleSubmit, pristine, submitting, form}) => (
          <div>
            <form onSubmit={handleSubmit}>
              <Field
                name="name"
                type="text"
                component={FormField}
                inputProps={{
                  autoFocus: true,
                  autoComplete: 'on',
                  autoCorrect: 'off',
                  autoCapitalize: 'none'
                }}
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
                })} type="button" disabled={pristine || submitting} onClick={form.reset}>
                  Clear Form
                </button>
              </div>
            </form>
            {isGeneratingKey && <Spinner />}
          </div>
        )}
      />
    )
  }
}
