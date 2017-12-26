import {MPW, MPW_NS} from '../mpw'

test('simple check', () => {
  const mpw = new MPW('some user', 'some password')
  return mpw.generate('example.com', 1, null, 'long', MPW_NS)
    .then(password => expect(password).toEqual('QetpHedf2,Woge'))
})

describe('User "Max Power" with super secret password', () => {
  let mpw = null

  beforeAll(() => {
    mpw = new MPW('Max Power', 'supersecretpassword12874!')
  })

  describe('#generatePassword', () => {
    test('check long password', () => {
      return mpw.generatePassword('some.important-site.com')
        .then(password => expect(password).toEqual('Fene7_VokiQubl'))
    })

    test('check long password with three counter', () => {
      return mpw.generatePassword('some.important-site.com', 3, 'long')
        .then(password => expect(password).toEqual('FuwoXecnCose7/'))
    })

    test('check short password', () => {
      return mpw.generatePassword('some.important-site.com', 1, 'short')
        .then(password => expect(password).toEqual('Fen6'))
    })

    test('check basic password', () => {
      return mpw.generatePassword('some.important-site.com', 1, 'basic')
        .then(password => expect(password).toEqual('HHc6MJx3'))
    })

    test('check medium password', () => {
      return mpw.generatePassword('some.important-site.com', 1, 'medium')
        .then(password => expect(password).toEqual('FenFis5='))
    })

    test('check maximum password', () => {
      return mpw.generatePassword('some.important-site.com', 1, 'maximum')
        .then(password => expect(password).toEqual('HW#%Co91ikO3HnlRzC6/'))
    })

    test('check name', () => {
      return mpw.generatePassword('some.important-site.com', 1, 'name')
        .then(password => expect(password).toEqual('fenfisapi'))
    })

    test('check pin', () => {
      return mpw.generatePassword('some.important-site.com', 1, 'pin')
        .then(password => expect(password).toEqual('1166'))
    })

    test('check pin with 5 counter', () => {
      return mpw.generatePassword('some.important-site.com', 5, 'pin')
        .then(password => expect(password).toEqual('4845'))
    })

    test('check phrase', () => {
      return mpw.generatePassword('some.important-site.com', 1, 'phrase')
        .then(password => expect(password).toEqual('fenf sap sanbofo wer'))
    })

    test('check phrase with 9 counter', () => {
      return mpw.generatePassword('some.important-site.com', 9, 'phrase')
        .then(password => expect(password).toEqual('mubc noq kolreza tuh'))
    })
  })

  describe('#generateLogin', () => {
    test('check login', () => {
      return mpw.generateLogin('some.important-site.com')
        .then(login => expect(login).toEqual('poqbudanu'))
    })

    test('check login with 5 counter', () => {
      return mpw.generateLogin('some.important-site.com', 5)
        .then(login => expect(login).toEqual('bupyaxape'))
    })
  })

  describe('#generateAnswer', () => {
    test('check answer', () => {
      return mpw.generateAnswer('some.important-site.com', 1, 'some answer')
        .then(login => expect(login).toEqual('mokl bav qemviba mal'))
    })

    test('check answer with 4 counter', () => {
      return mpw.generateAnswer('some.important-site.com', 4, 'some answer')
        .then(login => expect(login).toEqual('si yujfa vif qafihqi'))
    })
  })
})

describe('User "Max Power" with super secret password and version v0', () => {
  let mpw = null

  beforeAll(() => {
    mpw = new MPW('Max Power', 'supersecretpassword12874!', 0)
  })

  describe('#generatePassword', () => {
    test('check long password', () => {
      return mpw.generatePassword('some.important-site.com')
        .then(password => expect(password).toEqual('Tece7.GokwJufp'))
    })
  })
})
