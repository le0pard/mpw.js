import {combineReducers} from 'redux'
import {createAction, createReducer} from 'redux-act'

export const APP_THEMES = ['light', 'dark']

export const settingsTogglePassword = createAction('Toggle password visibility')
export const settingsToggleTheme = createAction('Toggle app theme')

const hidePassword = createReducer({
  [settingsTogglePassword]: (state) => !state
}, false)

const theme = createReducer({
  [settingsToggleTheme]: (state) => (
    APP_THEMES[0] === state ? APP_THEMES[1] : APP_THEMES[0]
  )
}, APP_THEMES[0])

export const reducer = combineReducers({
  hidePassword,
  theme
})
