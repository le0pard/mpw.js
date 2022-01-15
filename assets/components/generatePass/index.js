import React, {useEffect} from 'react'
import {actionTypes} from 'reducers/ww/constants'
import {resetPassword} from 'reducers/ww'
import {useDispatch, useSelector} from 'react-redux'
import {settingsTogglePassword} from 'reducers/settings'
import LocalStorage from 'lib/localStorage'
import _times from 'lodash/times'
import _debounce from 'lodash/debounce'
import classnames from 'classnames'
import {Formik, Field, Form} from 'formik'
import FormField from 'components/form/field'
import FormDropdown from 'components/form/dropdown'
import CopyButton from 'components/copyButton'

import './generate-pass.css'

const INPUT_CHANGE_TIMEOUT = 150

const INPUT_TEMPLATES = [
  {label: 'PIN', value: 'pin'},
  {label: 'Short', value: 'short'},
  {label: 'Basic', value: 'basic'},
  {label: 'Medium', value: 'medium'},
  {label: 'Long', value: 'long'},
  {label: 'Maximum', value: 'maximum'},
  {label: 'Name', value: 'name'},
  {label: 'Phrase', value: 'phrase'}
]

const MPW_TEMPLATES = INPUT_TEMPLATES.map((t) => t.value)

const validate = (values) => {
  const errors = {}
  if (!values.site) {
    errors.site = 'Required'
  }
  if (!values.counter) {
    errors.counter = 'Required'
  }
  if (parseInt(values.counter, 10) < 1) {
    errors.counter = 'Greater than zero'
  }
  if (!values.template) {
    errors.template = 'Required'
  }
  if (MPW_TEMPLATES.indexOf(values.template) === -1) {
    errors.template = 'Invalid template'
  }
  return errors
}

const GenerateKey = () => {
  const dispatch = useDispatch()
  const password = useSelector(({ww}) => ww.password)
  const hidePassword = useSelector(({settings}) => settings.hidePassword)

  useEffect(() => {
    return () => dispatch(resetPassword())
  }, [dispatch])

  const handlePasswordGeneration = (values, {setSubmitting}) => {
    dispatch({
      wwTypes: [
        actionTypes.WW_GENERATE_PASSWORD_REQUEST,
        actionTypes.WW_GENERATE_PASSWORD_SUCCESS,
        actionTypes.WW_GENERATE_PASSWORD_ERROR
      ],
      payload: values
    })
    setSubmitting(false)
  }

  const handleResetPassword = (reset) => {
    dispatch(resetPassword())
    reset()
  }

  const togglePasswordVisibility = (e) => {
    dispatch(settingsTogglePassword())
    LocalStorage.setItem('hidePassword', e.target.checked)
  }

  const displayPassword = () => {
    if (hidePassword) {
      return _times(password.length, () => '*').join('')
    } else {
      return password
    }
  }

  const resetMpwKey = (e) => {
    e.preventDefault()
    dispatch({
      wwTypes: [
        actionTypes.WW_RESET_KEY_REQUEST,
        actionTypes.WW_RESET_KEY_SUCCESS,
        actionTypes.WW_RESET_KEY_ERROR
      ]
    })
  }

  const renderPassword = () => {
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
              value={displayPassword()} />
            <div>
              <input
                className="generate-pass__password-visibility-input"
                id="passwordVisibilityId"
                type="checkbox"
                name="passwordVisibility"
                defaultChecked={hidePassword}
                onChange={togglePasswordVisibility} />
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

  return (
    <div>
      <div className="generate-pass__reset-wrapper">
        <a className="generate-pass__reset-link"
          href="#" onClick={resetMpwKey}>
          Reset master key
        </a>
      </div>
      <Formik
        onSubmit={handlePasswordGeneration}
        initialValues={{
          site: '',
          counter: 1,
          template: 'long'
        }}
        validate={validate}
      >{({submitForm, isSubmitting, dirty, handleReset}) => (
          <Form onChange={_debounce(submitForm, INPUT_CHANGE_TIMEOUT)}>
            <Field
              name="site"
              type="text"
              label="Site"
              component={FormField}
              autoFocus={true}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
            />
            <Field
              name="counter"
              type="number"
              component={FormField}
              label="Counter"
              step={1}
              min={1}
              max={1000}
              pattern="[0-9]*"
            />
            <Field
              name="template"
              component={FormDropdown}
              label="Template"
              options={INPUT_TEMPLATES}
            />
            <div className="generate-pass__buttons-wrapper">
              <button className={classnames('generate-pass__submit-button', {
                'generate-pass__submit-button--disabled': isSubmitting
              })} type="submit" disabled={isSubmitting}>
                Generate Password
              </button>
              <button className={classnames('generate-pass__reset-button', {
                'generate-pass__reset-button--disabled': !dirty || isSubmitting
              })} type="button" disabled={!dirty || isSubmitting}
              onClick={() => handleResetPassword(handleReset)}>
                Clear Form
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {renderPassword()}
    </div>
  )
}

export default GenerateKey
