import GeneratePassForm from 'components/generatePassForm'
import {actionTypes} from 'reducers/ww/constants'
import {reduxForm} from 'redux-form'
import {connect} from 'react-redux'

const mapStateToProps = (state) => ({
  isHaveGeneratedKey: state.ww.isHaveGeneratedKey,
  passwordResponse: state.ww.passwordResponse
})

const mapDispatchToProps = (dispatch) => ({
  onSubmitForm: (values) => dispatch({
    wwTypes: [
      actionTypes.WW_GENERATE_PASSWORD_REQUEST,
      actionTypes.WW_GENERATE_PASSWORD_SUCCESS,
      actionTypes.WW_GENERATE_PASSWORD_ERROR
    ],
    payload: values
  })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'generatePassForm'
})(GeneratePassForm))
