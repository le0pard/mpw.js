import App from './pages/app'
import Dashboard from './pages/dashboard'

// routes
export const routes = [{
  component: App,
  routes: [
    {
      path: '/',
      exact: true,
      component: Dashboard
    }
  ]
}]
