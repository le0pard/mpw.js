import {actionTypes} from 'reducers/ww/constants'
import {MPW, VERSION} from 'lib/mpw'

let mpwObject = null

const generateMpwKey = (successType, errorType, payload) => {
  const {name, password, version} = payload
  const algorithmVersion = (() => {
    if (version && version.length) {
      return parseInt(version, 10)
    } else {
      return VERSION
    }
  })()
  mpwObject = new MPW(name, password, algorithmVersion)
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

const generateMpwPassword = (successType, errorType, payload) => {
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

self.addEventListener('message', (e) => {
  const {
    requestType,
    successType,
    errorType,
    payload
  } = e.data

  switch (requestType) {
    case actionTypes.WW_GENERATE_KEY_REQUEST: {
      return generateMpwKey(successType, errorType, payload)
    }
    case actionTypes.WW_GENERATE_PASSWORD_REQUEST: {
      return generateMpwPassword(successType, errorType, payload)
    }
    default: {
      return self.postMessage({
        type: successType
      })
    }
  }
}, false)
