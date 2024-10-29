import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionTypes } from 'reducers/ww/constants'
import { Formik, Field, Form } from 'formik'
import FormField from 'components/form/field'
import FormDropdown from 'components/form/dropdown'
import classnames from 'classnames'
import Spinner from 'components/spinner'

import './generate-key.css'

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

const GenerateKey = () => {
  const dispatch = useDispatch()
  const isGeneratingKey = useSelector(({ ww }) => ww.isGeneratingKey)

  const handleGenerateKey = (values, { setSubmitting }) => {
    dispatch({
      wwTypes: [
        actionTypes.WW_GENERATE_KEY_REQUEST,
        actionTypes.WW_GENERATE_KEY_SUCCESS,
        actionTypes.WW_GENERATE_KEY_ERROR
      ],
      payload: values
    })
    setSubmitting(false)
  }

  return (
    <Formik
      initialValues={{
        name: '',
        password: '',
        version: 3
      }}
      validate={validate}
      onSubmit={handleGenerateKey}
    >{({ isSubmitting, dirty, handleReset }) => (
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
                { label: 'V3', value: 3 },
                { label: 'V2', value: 2 },
                { label: 'V1', value: 1 },
                { label: 'V0', value: 0 }
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
    </Formik>
  )
}

export default GenerateKey
