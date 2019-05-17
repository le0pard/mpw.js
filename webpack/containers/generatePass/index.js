import GeneratePass from 'components/generatePass'
import {actionTypes} from 'reducers/ww/constants'
import {resetPassword} from 'reducers/ww'
import {settingsTogglePassword} from 'reducers/settings'
import {connect} from 'react-redux'
import LocalStorage from 'lib/localStorage'

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
)(GeneratePass)
