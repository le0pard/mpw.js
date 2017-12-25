import {actionTypes} from 'reducers/ww/constants'
import {MPW} from 'lib/mpw'

let mpwObject = null

self.addEventListener('message', (e) => {
  const {
    requestType,
    successType,
    errorType,
    payload
  } = e.data

  switch (requestType) {
    case actionTypes.WW_GENERATE_KEY_REQUEST: {
      const {name, password} = payload
      mpwObject = new MPW(name, password)
      return mpwObject.key.then(() => {
        return self.postMessage({
          type: successType
        })
      }).catch((err) => {
        return self.postMessage({
          type: errorType,
          payload: err
        })
      })
    }
    case actionTypes.WW_GENERATE_PASSWORD_REQUEST: {
      const {site} = payload
      if (!mpwObject) {
        return self.postMessage({
          type: errorType,
          payload: 'You need generate key'
        })
      }
      return mpwObject.generatePassword(site).then((password) => {
        return self.postMessage({
          type: successType,
          payload: password
        })
      }).catch((err) => {
        return self.postMessage({
          type: errorType,
          payload: err
        })
      })
    }
    default: {
      return self.postMessage({
        type: successType
      })
    }
  }
}, false)
