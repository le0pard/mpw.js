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

class GenerateKeyForm extends React.Component {

  handleGenerateKey(values) {
    console.log('Values', values)
    this.props.onSubmitForm(values)
  }

  render() {
    const {handleSubmit, pristine, submitting, reset} = this.props
    return (
      <form action="#" onSubmit={handleSubmit(this.handleGenerateKey.bind(this))}>
        <Field
          name="name"
          type="text"
          component={renderField}
          label="Name"
        />
        <Field
          name="password"
          type="password"
          component={renderField}
          label="Password"
        />
        <div>
          <button type="submit" disabled={submitting}>
            Generate
          </button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = () => ({})

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
