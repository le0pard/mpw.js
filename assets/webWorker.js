import { actionTypes } from 'reducers/ww/constants'
import { MPW, VERSION } from 'lib/mpw'

let mpwObject = null

const generateMpwKey = (successType, errorType, payload) => {
  const { name, password, version } = payload
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
  const { site, counter, template } = payload
  if (!mpwObject) {
    return self.postMessage({
      type: errorType,
      payload: 'You need generate key'
    })
  }
  return mpwObject.generatePassword(site, counter, template)
    .then((password) => {
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

const resetMpwKey = (successType) => {
  if (mpwObject) {
    mpwObject.invalidate()
    mpwObject.key.catch(() => {
      // do nothing
    })
  }
  mpwObject = null
  return self.postMessage({
    type: successType
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
    case actionTypes.WW_RESET_KEY_REQUEST: {
      return resetMpwKey(successType)
    }
    default: {
      return self.postMessage({
        type: successType
      })
    }
  }
}, false)
