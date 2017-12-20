import {CACHE} from './lib/serviceWorker/constants'

self.addEventListener('install', (evt) => {
  console.log('The service worker is being installed.')

  evt.waitUntil(caches.open(CACHE).then((cache) => {
    return fetch('/assets-manifest.json').then((response) => {
      return response.json()
    }).then((data) => {
      const files = Object.keys(data).
        map((key) => data[key]).
        filter((file) => /^app/i.test(file))
      return cache.addAll(['./index.html'].concat(files))
    }).then(() => self.skipWaiting())
  }))
})

self.addEventListener('fetch', (evt) => {
  console.log('The service worker is serving the asset.')

  evt.respondWith(fromCache(evt.request))

  evt.waitUntil(
    update(evt.request).then(refresh)
  )
})

const fromCache = (request) => {
  return caches.open(CACHE).then((cache) => {
    return cache.match(request)
  })
}

const update = (request) => {
  return caches.open(CACHE).then((cache) => {
    return fetch(request).then((response) => {
      return cache.put(request, response.clone()).then(() => {
        return response
      })
    })
  })
}

const refresh = (response) => {
  return self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      const message = {
        type: 'refresh',
        url: response.url,
        eTag: response.headers.get('ETag'),
        lastModified: response.headers.get('Last-Modified')
      }
      client.postMessage(JSON.stringify(message))
    })
  })
}
