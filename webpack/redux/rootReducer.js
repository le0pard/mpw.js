import {combineReducers} from 'redux'

import {reducer as form} from 'redux-form'
import {routerReducer as router} from 'react-router-redux'

export default combineReducers({
  form,
  router
})
