import {combineReducers} from 'redux'
import {createAction, createReducer} from 'redux-act'
import {APP_THEMES_LIGHT, APP_THEMES_DARK} from './constants'

export const settingsTogglePassword = createAction('Toggle password visibility')
export const settingsToggleTheme = createAction('Toggle app theme')

const hidePassword = createReducer({
  [settingsTogglePassword]: (state) => !state
}, false)

const theme = createReducer({
  [settingsToggleTheme]: (state) => (
    APP_THEMES_LIGHT === state ? APP_THEMES_DARK : APP_THEMES_LIGHT
  )
}, APP_THEMES_LIGHT)

export const reducer = combineReducers({
  hidePassword,
  theme
})
