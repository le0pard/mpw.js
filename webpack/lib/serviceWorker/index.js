import {CACHE} from './constants'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.onmessage = (evt) => {
    const message = JSON.parse(evt.data)
    console.log('serviceWorker', message)
  }

  const swUrl = document.getElementById('app-root').dataset.serviceWorker
  navigator.serviceWorker.register(swUrl)
  navigator.serviceWorker.ready.then(() => {
    console.log('serviceWorker ready')
  });
}
