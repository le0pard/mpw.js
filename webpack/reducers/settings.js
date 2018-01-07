import {combineReducers} from 'redux'
import {createAction, createReducer} from 'redux-act'

export const settingsTogglePassword = createAction('Toggle password visibility')

const hidePassword = createReducer({
  [settingsTogglePassword]: (state) => !state
}, false)

export const reducer = combineReducers({
  hidePassword
})
