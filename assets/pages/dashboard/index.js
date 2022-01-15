import React from 'react'
import MainGenerator from 'components/mainGenerator'

import './dashboard.css'

const DashboardPage = () => (
  <div className="dashboard-page">
    <h1 className="dashboard-page-title">
      Master password generator
    </h1>
    <MainGenerator />
  </div>
)

export default DashboardPage
