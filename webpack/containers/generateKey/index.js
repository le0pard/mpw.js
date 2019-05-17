import GenerateKey from 'components/generateKey'
import {actionTypes} from 'reducers/ww/constants'
import {connect} from 'react-redux'

const mapStateToProps = (state) => ({
  isGeneratingKey: state.ww.isGeneratingKey
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
)(GenerateKey)
