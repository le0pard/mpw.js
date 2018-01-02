import {combineReducers} from 'redux'
import {createAction, createReducer} from 'redux-act'
import {actionTypes} from './constants'

export const generateKeyRequest = createAction(
  actionTypes.WW_GENERATE_KEY_REQUEST
)
export const generateKeySuccess = createAction(
  actionTypes.WW_GENERATE_KEY_SUCCESS
)
export const generateKeyError = createAction(
  actionTypes.WW_GENERATE_KEY_ERROR
)

export const generatePasswordRequest = createAction(
  actionTypes.WW_GENERATE_PASSWORD_REQUEST
)
export const generatePasswordSuccess = createAction(
  actionTypes.WW_GENERATE_PASSWORD_SUCCESS
)
export const generatePasswordError = createAction(
  actionTypes.WW_GENERATE_PASSWORD_ERROR
)

export const resetPassword = createAction('Reset password')

const isGeneratingKey = createReducer({
  [generateKeyRequest]: () => true,
  [generateKeySuccess]: () => false,
  [generateKeyError]: () => false
}, false)

const isHaveGeneratedKey = createReducer({
  [generateKeyRequest]: () => false,
  [generateKeySuccess]: () => true,
  [generateKeyError]: () => false
}, false)

const password = createReducer({
  [generatePasswordSuccess]: (state, payload) => payload,
  [resetPassword]: () => null
}, null)

export const reducer = combineReducers({
  isGeneratingKey,
  isHaveGeneratedKey,
  password
})
