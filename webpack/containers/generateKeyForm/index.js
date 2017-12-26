import GenerateKeyForm from 'components/generateKeyForm'
import {actionTypes} from 'reducers/ww/constants'
import {reduxForm} from 'redux-form'
import {connect} from 'react-redux'

const mapStateToProps = (state) => ({
  isHaveGeneratedKey: state.ww.isHaveGeneratedKey
})

const mapDispatchToProps = (dispatch) => ({
  onSubmitForm: (values) => dispatch({
    wwTypes: [
      actionTypes.WW_GENERATE_KEY_REQUEST,
      actionTypes.WW_GENERATE_KEY_SUCCESS,
      actionTypes.WW_GENERATE_KEY_ERROR
    ],
    payload: values
  })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'generateKeyForm'
})(GenerateKeyForm))
