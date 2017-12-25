import {getWebWorker} from '../../ww'

const webWorkerMiddleware = ({dispatch, getState}) => {
  return next => action => {
    const {
      wwTypes,
      payload
    } = action

    if (!wwTypes) {
      // Normal action: pass it on
      return next(action)
    }

    if (
      !Array.isArray(wwTypes) ||
      wwTypes.length !== 3 ||
      !wwTypes.every(type => typeof type === 'string')
    ) {
      throw new Error('Expected an array of two string types')
    }

    const [requestType, successType, errorType] = wwTypes

    dispatch({
      payload,
      type: requestType
    })

    return getWebWorker().postMessage({
      requestType,
      successType,
      errorType,
      payload
    })
  }
}

export default webWorkerMiddleware
