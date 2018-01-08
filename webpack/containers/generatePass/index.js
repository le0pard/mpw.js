import GeneratePass, {INPUT_TEMPLATES} from 'components/generatePass'
import {actionTypes} from 'reducers/ww/constants'
import {resetPassword} from 'reducers/ww'
import {settingsTogglePassword} from 'reducers/settings'
import {reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import LocalStorage from 'lib/localStorage'

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

const mapStateToProps = (state) => ({
  password: state.ww.password,
  hidePassword: state.settings.hidePassword
})

const mapDispatchToProps = (dispatch) => ({
  onSubmitForm: (values) => dispatch({
    wwTypes: [
      actionTypes.WW_GENERATE_PASSWORD_REQUEST,
      actionTypes.WW_GENERATE_PASSWORD_SUCCESS,
      actionTypes.WW_GENERATE_PASSWORD_ERROR
    ],
    payload: values
  }),
  formResetPassword: () => dispatch(resetPassword()),
  resetMpwKey: () => dispatch({
    wwTypes: [
      actionTypes.WW_RESET_KEY_REQUEST,
      actionTypes.WW_RESET_KEY_SUCCESS,
      actionTypes.WW_RESET_KEY_ERROR
    ]
  }),
  settingsTogglePassword: (checked) => {
    dispatch(settingsTogglePassword())
    LocalStorage.setItem('hidePassword', checked)
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'generatePassForm',
  validate,
  initialValues: {
    counter: 1,
    template: 'long'
  }
})(GeneratePass))
