import {MPW} from 'lib/mpw'

self.addEventListener('message', (e) => {
  MPW.test().then(() => console.log('All OK')).catch((error) => console.error('GET error', error))
  if (e.data.type && e.data.name.length && e.data.password.length) {
    const {name, password} = e.data;
    const mpw = new MPW(name, password)
    mpw.generatePassword('test').then((pass) => {
      self.postMessage({pass})
    })
  } else {
    self.postMessage(e.data)
  }
}, false)
