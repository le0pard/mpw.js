import App from './pages/app'
import Dashboard from './pages/dashboard'
import AlgorithmPage from './pages/algorithm'

// routes
export const routes = [{
  component: App,
  routes: [
    {
      path: '/',
      exact: true,
      component: Dashboard
    },
    {
      path: '/algorithm',
      exact: true,
      component: AlgorithmPage
    }
  ]
}]
