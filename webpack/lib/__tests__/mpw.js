import MPW from '../mpw'

test('simple check', () => {
  const mpw = new MPW('user', 'password')
  return mpw.generate('example.com', 1, null, 'long', MPW.NS)
    .then(password => expect(password).toEqual('ZedaFaxcZaso9*'))
})

describe('User Max Power with long password', () => {
  let mpw
  beforeAll(() => {
    mpw = new MPW('Max Power', 'supersecretpassword12874!')
  })

  test('check long password', () => {
    return mpw.generatePassword('some.important-size.com', 1, 'long')
      .then(password => expect(password).toEqual('JidcGoweRowe0#'))
  })

  test('check long password with three counter', () => {
    return mpw.generatePassword('some.important-size.com', 3, 'long')
      .then(password => expect(password).toEqual('Yipe7~QiwvJuzu'))
  })

  test('check short password', () => {
    return mpw.generatePassword('some.important-size.com', 1, 'short')
      .then(password => expect(password).toEqual('Jid4'))
  })

  test('check basic password', () => {
    return mpw.generatePassword('some.important-size.com', 1, 'basic')
      .then(password => expect(password).toEqual('oiO40uXm'))
  })

  test('check medium password', () => {
    return mpw.generatePassword('some.important-size.com', 1, 'medium')
      .then(password => expect(password).toEqual('Jid4-Lak'))
  })

  test('check maximum password', () => {
    return mpw.generatePassword('some.important-size.com', 1, 'maximum')
      .then(password => expect(password).toEqual('o7+#6no0URohokcJLA*J'))
  })

  test('check name', () => {
    return mpw.generatePassword('some.important-size.com', 1, 'name')
      .then(password => expect(password).toEqual('jidcalake'))
  })

  test('check pin', () => {
    return mpw.generatePassword('some.important-size.com', 1, 'pin')
      .then(password => expect(password).toEqual('6774'))
  })
})
