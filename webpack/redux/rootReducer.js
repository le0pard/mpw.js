import {combineReducers} from 'redux'

import {reducer as form} from 'redux-form'
import {routerReducer as router} from 'react-router-redux'

import {reducer as sw} from 'reducers/sw'
import {reducer as ww} from 'reducers/ww'

export default combineReducers({
  form,
  router,
  sw,
  ww
})
