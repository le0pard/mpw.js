import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import {actionTypes} from 'reducers/ww/constants'

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

class GeneratePasswordForm extends React.Component {

  handlePassword(values) {
    console.log('Values', values)
    this.props.onSubmitForm(values)
  }

  render() {
    if (!this.props.isHaveGeneratedKey) {
      return null
    }

    const {handleSubmit, pristine, submitting, reset, passwordResponse} = this.props
    return (
      <form action="#" onChange={() => {
          setTimeout(handleSubmit(this.handlePassword.bind(this)), 0)
        }} onSubmit={handleSubmit(this.handlePassword.bind(this))}>
        <Field
          name="site"
          type="text"
          component={renderField}
          label="Site"
        />
        <div>
          <button type="submit" disabled={submitting}>
            Generate Password
          </button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </button>
        </div>
        {passwordResponse && <div>
          <h1>Your password: {passwordResponse}</h1>
        </div>}
      </form>
    )
  }
}

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
})(GeneratePasswordForm))
