import React from 'react'
import MainGenerator from 'containers/mainGenerator'

export default class DashboardPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Master password</h1>
        <MainGenerator />
      </div>
    )
  }
}
