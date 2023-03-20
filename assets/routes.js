import React from 'react'
import AppLayout from './pages/app'
import Dashboard from './pages/dashboard'
import AlgorithmPage from './pages/algorithm'

// routes
export const routes = [{
  element: <AppLayout />,
  children: [
    {
      path: '/',
      element: <Dashboard />
    },
    {
      path: '/algorithm',
      element: <AlgorithmPage />
    },
    {
      path: '/algorithm.html',
      element: <AlgorithmPage />
    }
  ]
}]
