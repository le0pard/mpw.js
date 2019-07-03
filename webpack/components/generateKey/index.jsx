import React from 'react'
import PropTypes from 'prop-types'
import {Formik, Field, Form} from 'formik'
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

  handleGenerateKey(values, {setSubmitting}) {
    this.props.onSubmitForm(values)
    setSubmitting(false)
  }

  render() {
    const {isGeneratingKey} = this.props

    return (
      <Formik
        initialValues={{
          name: '',
          password: '',
          version: 3
        }}
        validate={validate}
        onSubmit={this.handleGenerateKey.bind(this)}
        render={({isSubmitting, dirty, handleReset}) => (
          <div>
            <Form>
              <Field
                type="text"
                name="name"
                label="Name"
                component={FormField}
                autoFocus={true}
                autoComplete="on"
                autoCorrect="off"
                autoCapitalize="none"
              />
              <Field
                type="password"
                name="password"
                label="Password"
                component={FormField}
              />
              <Field
                name="version"
                label="Version"
                component={FormDropdown}
                options={[
                  {label: 'V3', value: 3},
                  {label: 'V2', value: 2},
                  {label: 'V1', value: 1},
                  {label: 'V0', value: 0}
                ]}
              />
              <div className="generate-key__buttons-wrapper">
                <button className={classnames('generate-key__submit-button', {
                  'generate-key__submit-button--disabled': isSubmitting
                })} type="submit" disabled={isSubmitting}>
                  Generate Master Key
                </button>
                <button className={classnames('generate-key__reset-button', {
                  'generate-key__reset-button--disabled': !dirty || isSubmitting
                })} type="button" disabled={!dirty || isSubmitting} onClick={handleReset}>
                  Clear Form
                </button>
              </div>
            </Form>
            {isGeneratingKey && <Spinner />}
          </div>
        )}
      />
    )
  }
}
