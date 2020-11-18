import crypto from 'crypto-es'
import scrypt from './scrypt'
import {TextEncoder as TextEncoderPolyfill} from 'text-encoding'

// A TextEncoder in UTF-8 to convert strings to `Uint8Array`s
const TXTENCODER = (
  typeof TextEncoder !== 'undefined' ? new TextEncoder : new TextEncoderPolyfill
)

// The latest version of MPW supported
export const VERSION = 3

// The namespace used in calculateKey
export const MPW_NS = 'com.lyndir.masterpassword'

// The namespaces used in calculateSeed
export const MPW_PASSWORD_NS = 'com.lyndir.masterpassword'
export const MPW_LOGIN_NS = 'com.lyndir.masterpassword.login'
export const MPW_ANSWER_NS = 'com.lyndir.masterpassword.answer'

// The templates that passwords may be created from
// The characters map to MPW_PASSCHARS
export const MPW_TEMPLATES = {
  maximum: [
    'anoxxxxxxxxxxxxxxxxx',
    'axxxxxxxxxxxxxxxxxno'
  ],
  long: [
    'CvcvnoCvcvCvcv',
    'CvcvCvcvnoCvcv',
    'CvcvCvcvCvcvno',
    'CvccnoCvcvCvcv',
    'CvccCvcvnoCvcv',
    'CvccCvcvCvcvno',
    'CvcvnoCvccCvcv',
    'CvcvCvccnoCvcv',
    'CvcvCvccCvcvno',
    'CvcvnoCvcvCvcc',
    'CvcvCvcvnoCvcc',
    'CvcvCvcvCvccno',
    'CvccnoCvccCvcv',
    'CvccCvccnoCvcv',
    'CvccCvccCvcvno',
    'CvcvnoCvccCvcc',
    'CvcvCvccnoCvcc',
    'CvcvCvccCvccno',
    'CvccnoCvcvCvcc',
    'CvccCvcvnoCvcc',
    'CvccCvcvCvccno'
  ],
  medium: [
    'CvcnoCvc',
    'CvcCvcno'
  ],
  basic: [
    'aaanaaan',
    'aannaaan',
    'aaannaaa'
  ],
  short: [
    'Cvcn'
  ],
  pin: [
    'nnnn'
  ],
  name: [
    'cvccvcvcv'
  ],
  phrase: [
    'cvcc cvc cvccvcv cvc',
    'cvc cvccvcvcv cvcv',
    'cv cvccv cvc cvcvccv'
  ]
}

// The password character mapping
// c in template becomes bcdfghjklmnpqrstvwxyz
export const MPW_PASSCHARS = {
  V: 'AEIOU',
  C: 'BCDFGHJKLMNPQRSTVWXYZ',
  v: 'aeiou',
  c: 'bcdfghjklmnpqrstvwxyz',
  A: 'AEIOUBCDFGHJKLMNPQRSTVWXYZ',
  a: 'AEIOUaeiouBCDFGHJKLMNPQRSTVWXYZbcdfghjklmnpqrstvwxyz',
  n: '0123456789',
  o: '@&%?,=[]_:-+*$#!\'^~;()/.',
  x: 'AEIOUaeiouBCDFGHJKLMNPQRSTVWXYZbcdfghjklmnpqrstvwxyz0123456789!@#$%^&*()',
  ' ': ' '
}

export class MPW {
  constructor(name, password, version = VERSION) {
    // The algorithm version
    this.version = version

    // Store name on the object, this is not used at all internally
    this.name = name

    // Check for valid algorithm versions
    if (version >= 0 && version <= VERSION) {
      // Calculate the master key which will be used to calculate
      // the password seed
      this.key = this.calculateKey(name, password, version)
    } else {
      this.key = Promise.reject(
        new Error(`Algorithm version ${version} not implemented`)
      )
    }
  }

  // calculateKey takes ~ 1450.000ms to complete
  calculateKey(name, password, version = VERSION) {
    if (!name || !name.length) {
      return Promise.reject(new Error('Argument name not present'))
    }

    if (!password || !password.length) {
      return Promise.reject(new Error('Argument password not present'))
    }

    // Cache the number of characters in name for older buggy
    // versions of MPW
    const nameCharLength = name.length

    // Convert password string to a Uint8Array w/ UTF-8
    password = TXTENCODER.encode(password)

    // Convert name string to a Uint8Array w/ UTF-8
    name = TXTENCODER.encode(name)

    // Convert MPW_NS string to a Uint8Array w/ UTF-8
    const NS = TXTENCODER.encode(MPW_NS)

    // Create salt array and a DataView representing it
    let salt = new Uint8Array(
      NS.length
      + 4/*sizeof(uint32)*/ + name.length
    )
    let saltView = new DataView(salt.buffer, salt.byteOffset, salt.byteLength)
    let i = 0

    // Set salt[0,] to NS
    salt.set(NS, i)
    i += NS.length

    if (version < 3) {
      // Set data[i,i+4] to nameCharLength UINT32 in big-endian form
      saltView.setUint32(i, nameCharLength, false/*big-endian*/)
      i += 4/*sizeof(uint32)*/
    } else {
      // Set salt[i,i+4] to name.length UINT32 in big-endian form
      saltView.setUint32(i, name.length, false/*big-endian*/)
      i += 4/*sizeof(uint32)*/
    }

    // Set salt[i,] to name
    salt.set(name, i)
    i += name.length

    // Derive the master key w/ scrypt
    // why is buflen 64*8==512 and not 32*8==256 ?
    return scrypt(
      password,
      salt,
      32768/*= n*/,
      8/*= r*/,
      2/*= p*/,
      64/*= buflen*/
    )
  }

  // calculateSeed takes ~ 3.000ms to complete + the time of calculateKey once
  calculateSeed(site, counter = 1, context = null, NS = MPW_NS) {
    if (!site) {
      return Promise.reject(new Error('Argument site not present'))
    }

    if (counter < 1 || counter > 4294967295/*Math.pow(2, 32) - 1*/) {
      return Promise.reject(new Error('Argument counter out of range'))
    }

    // Cache the number of characters in site for older buggy
    // versions of MPW
    const siteCharLength = site.length

    // Convert salt string to a Uint8Array w/ UTF-8
    site = TXTENCODER.encode(site)

    // Convert NS string to a Uint8Array w/ UTF-8
    NS = TXTENCODER.encode(NS)

    if (context) {
      // Convert context string to a Uint8Array w/ UTF-8
      context = TXTENCODER.encode(context)
    }

    // Create data array and a DataView representing it
    let data = new Uint8Array(
      NS.length
      + 4/*sizeof(uint32)*/ + site.length
      + 4/*sizeof(int32)*/
      + (context
        ? 4/*sizeof(uint32)*/ + context.length
        : 0)
    )
    let dataView = new DataView(data.buffer, data.byteOffset, data.byteLength)
    let i = 0

    // Set data[0,] to NS
    data.set(NS, i)
    i += NS.length

    if (this.version < 2) {
      // Set data[i,i+4] to siteCharLength UINT32 in big-endian form
      dataView.setUint32(i, siteCharLength, false/*big-endian*/)
      i += 4/*sizeof(uint32)*/
    } else {
      // Set data[i,i+4] to site.length UINT32 in big-endian form
      dataView.setUint32(i, site.length, false/*big-endian*/)
      i += 4/*sizeof(uint32)*/
    }

    // Set data[i,] to site
    data.set(site, i)
    i += site.length

    // Set data[i,i+4] to counter INT32 in big-endian form
    dataView.setInt32(i, counter, false/*big-endian*/)
    i += 4/*sizeof(int32)*/

    if (context) {
      // Set data[i,i+4] to context.length UINT32 in big-endian form
      dataView.setUint32(i, context.length, false/*big-endian*/)
      i += 4/*sizeof(uint32)*/

      // Set data[i,] to context
      data.set(context, i)
      i += context.length
    }

    return this.key.then((key) => {
      // Create crypto-js WordArrays from Uint8Arrays data and key
      data = crypto.lib.WordArray.create(data)
      key = crypto.lib.WordArray.create(key)

      // Sign data using HMAC-SHA-256 w/ key
      return crypto.HmacSHA256(data, key)/*= seed*/
    }).then((hash) => {
      // Create seed array and a DataView representing it
      let seed = new Uint8Array(
        hash.words.length * 4/*sizeof(int32)*/
      )
      let seedView = new DataView(
        seed.buffer,
        seed.byteOffset,
        seed.byteLength
      )

      // Loop over hash.words which are INT32
      for (let j = 0; j < hash.words.length; j++) {
        // Set seed[i*4,i*4+4] to hash.words[i] INT32 in big-endian form
        seedView.setInt32(
          j * 4/*sizeof(int32)*/,
          hash.words[j], false/*big-endian*/
        )
      }

      // Return the seed Uint8Array
      return seed
    })
  }

  // generate takes ~ 0.200ms to complete + the time of calculateSeed
  generate(site, counter = 1, context = null, template = 'long', NS = MPW_NS) {
    // Does the requested template exist?
    if (!(template in MPW_TEMPLATES)) {
      return Promise.reject(new Error('Argument template invalid'))
    }

    // Calculate the seed
    let seed = this.calculateSeed(site, counter, context, NS)

    if (this.version < 1) {
      // Convert seed from host byte order to network byte
      // to be compatible with v0 of MPW
      // Follows the implementation at https://github.com/...
      // Lyndir/MasterPassword/blob/master/MasterPassword/...
      // Java/masterpassword-algorithm/src/main/java/com/...
      // lyndir/masterpassword/MasterKeyV0.java#L105
      seed = seed.then((seedBytes) => {
        let seedRes = new Uint16Array(seedBytes.length)

        for (let i = 0; i < seedRes.length; i++) {
          seedRes[i] = (
            seedBytes[i] > 127 ? 0x00ff : 0x0000
          ) | (seedBytes[i] << 8)
        }

        return seedRes
      })
    }

    return seed.then((seedRes) => {
      // Find the selected template array
      template = MPW_TEMPLATES[template]

      // Select the specific template based on seed[0]
      template = template[seedRes[0] % template.length]

      // Split the template string (e.g. xxx...xxx)
      return template.split('').map((c, i) => {
        // Use MPW_PASSCHARS to map the template string (e.g. xxx...xxx)
        // to characters (e.g. c -> bcdfghjklmnpqrstvwxyz)
        const chars = MPW_PASSCHARS[c]

        // Select the character using seedRes[i + 1]
        return chars[seedRes[i + 1] % chars.length]
      }).join('')
    })/*= password*/
  }

  // generate a password with the password namespace
  generatePassword(site, counter = 1, template = 'long') {
    return this.generate(site, counter, null, template, MPW_PASSWORD_NS)
  }

  // generate a username with the login namespace
  generateLogin(site, counter = 1, template = 'name') {
    return this.generate(site, counter, null, template, MPW_LOGIN_NS)
  }

  // generate a security answer with the answer namespace
  generateAnswer(site, counter = 1, context = '', template = 'phrase') {
    return this.generate(site, counter, context, template, MPW_ANSWER_NS)
  }

  invalidate() {
    // Replace this.key w/ a Promise.reject
    // Preventing all future access
    this.key = Promise.reject(new Error('invalid state'))
  }
}
