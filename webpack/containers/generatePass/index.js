import GeneratePass from 'components/generatePass'
import {actionTypes} from 'reducers/ww/constants'
import {resetPassword} from 'reducers/ww'
import {reduxForm} from 'redux-form'
import {connect} from 'react-redux'

const validate = (values) => {
  const errors = {}
  if (!values.site) {
    errors.site = 'Required'
  }
  if (parseInt(values.counter, 10) < 1) {
    errors.counter = 'Greater than zero'
  }
  return errors
}

const mapStateToProps = (state) => ({
  password: state.ww.password
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
  })
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
