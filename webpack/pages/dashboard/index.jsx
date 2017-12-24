import React from 'react'
import {Field, reduxForm} from 'redux-form'

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

class DashboardPage extends React.Component {

  handleGenerateKey(values) {
    console.log('Values', values)
    this.cryptoWorker = new Worker(
      document.getElementById('app-root').dataset.worker
    )
    this.cryptoWorker.addEventListener('message', (e) => {
      console.log('Worker said: ', e.data)
    }, false)

    this.cryptoWorker.postMessage({
      type: 'generateKey',
      name: values.name,
      password: values.password
    })
  }

  render() {
    const {handleSubmit, pristine, submitting, reset} = this.props
    return (
      <div>
        <h1>Master password</h1>
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
      </div>
    )
  }
}

export default reduxForm({
  form: 'masterPasswordForm'
})(DashboardPage)
