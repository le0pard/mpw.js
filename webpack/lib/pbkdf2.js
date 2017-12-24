// https://github.com/golang/crypto/blob/master/pbkdf2/pbkdf2.go
import crypto from 'crypto-js'

const pbkdf2 = (password, salt, iter, keyLen, hash) => {
  let hashAlg = null
  switch ((hash.name || hash).toUpperCase()) {
    case 'SHA1':
      hashAlg = crypto.algo.SHA
      break
    case 'SHA224':
    case 'SHA-224':
      hashAlg = crypto.algo.SHA224
      break
    case 'SHA256':
    case 'SHA-256':
      hashAlg = crypto.algo.SHA256
      break
    case 'SHA384':
    case 'SHA-384':
      hashAlg = crypto.algo.SHA384
      break
    case 'SHA512':
    case 'SHA-512':
      hashAlg = crypto.algo.SHA512
      break
    default:
      let err = new Error(
        'A parameter or an operation is not supported by the underlying object'
      )
      err.name = 'InvalidAccessError'
      return Promise.reject(err)
  }

  return new Promise((resolve) => {
    // Create crypto-js WordArrays from Uint8Arrays password and salt
    password = crypto.lib.WordArray.create(password)
    salt = crypto.lib.WordArray.create(salt)

    // Derive key using PBKDF2 w/ password and salt
    let ckey = crypto.PBKDF2(password, salt, {
      keySize: keyLen * 8 / 32,
      iterations: iter,
      hasher: hashAlg
    })

    // Create key array and a DataView representing it
    let key = new Uint8Array(ckey.words.length * 4/*sizeof(int32)*/)
    let keyView = new DataView(key.buffer, key.byteOffset, key.byteLength)

    // Loop over Ckey.words which are INT32
    for (let i = 0; i < ckey.words.length; i++) {
      // Set key[i*4,i*4+4] to Ckey.words[i] INT32 in big-endian form
      keyView.setInt32(
        i * 4/*sizeof(int32)*/,
        ckey.words[i],
        false/*big-endian*/
      )
    }
    // Return the key Uint8Array
    resolve(key)
  })
}

export default pbkdf2
