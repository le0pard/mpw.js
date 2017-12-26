import React from 'react'
import GenerateKeyForm from 'containers/generateKeyForm'
import GeneratePasswordForm from 'containers/generatePassForm'

export default class DashboardPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Master password</h1>
        <GenerateKeyForm />
        <GeneratePasswordForm />
      </div>
    )
  }
}
