import React from 'react'
import MainGenerator from 'containers/mainGenerator'

import './dashboard.sass'

export default class DashboardPage extends React.Component {
  render() {
    return (
      <div className="dashboard-page">
        <h1 className="dashboard-page-title">
          Master password generator
        </h1>
        <MainGenerator />
      </div>
    )
  }
}
