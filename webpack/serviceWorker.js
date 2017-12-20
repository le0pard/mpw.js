import {CACHE} from './lib/serviceWorker/constants'

const NETWORK_TIMEOUT = 400

self.addEventListener('install', (evt) => {
  evt.waitUntil(precache())
})

self.addEventListener('fetch', (evt) => {
  evt.respondWith(respondToFetch(evt))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

const precache = () => {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll([
      './index.html',
      './app.js',
      './app.css'
    ]);
  });
}

const respondToFetch = (evt) => {
  return caches.open(CACHE).then((cache) => {
    return fromNetwork(cache, evt.request, NETWORK_TIMEOUT)
      .catch(() => fromCache(cache, evt.request))
  })
}

const fromNetwork = (cache, request, timeout) => {
  return new Promise((fulfill, reject) => {
    const timeoutId = setTimeout(reject, timeout)

    fetch(request).then((response) => {
      clearTimeout(timeoutId)
      return cache.put(request, response.clone()).then(() => {
        return fulfill(response)
      }).catch(() => {
        return fulfill(response)
      })
    }).catch(reject)
  })
}

const fromCache = (cache, request) => {
  return cache.match(request).then((matching) => {
    return matching || Promise.reject('no-match')
  })
}
