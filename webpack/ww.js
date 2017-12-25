let webWorker = null

export const getWebWorker = () => webWorker

export const initWebWorker = (appRoot, store) => {
  webWorker = new Worker(
    appRoot.dataset.worker
  )
  webWorker.addEventListener('message', (e) => {
    const {
      type,
      payload
    } = e.data

    store.dispatch({
      type,
      payload
    })
  }, false)
}
