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
    return mpw.generate('some.important-size.com', 1, null, 'long', MPW.NS)
      .then(password => expect(password).toEqual('JidcGoweRowe0#'))
  })

  test('check long password with three counter', () => {
    return mpw.generate('some.important-size.com', 3, null, 'long', MPW.NS)
      .then(password => expect(password).toEqual('Yipe7~QiwvJuzu'))
  })

  test('check short password', () => {
    return mpw.generate('some.important-size.com', 1, null, 'short', MPW.NS)
      .then(password => expect(password).toEqual('Jid4'))
  })

  test('check basic password', () => {
    return mpw.generate('some.important-size.com', 1, null, 'basic', MPW.NS)
      .then(password => expect(password).toEqual('oiO40uXm'))
  })

  test('check medium password', () => {
    return mpw.generate('some.important-size.com', 1, null, 'medium', MPW.NS)
      .then(password => expect(password).toEqual('Jid4-Lak'))
  })

  test('check maximum password', () => {
    return mpw.generate('some.important-size.com', 1, null, 'maximum', MPW.NS)
      .then(password => expect(password).toEqual('o7+#6no0URohokcJLA*J'))
  })

  test('check name', () => {
    return mpw.generate('some.important-size.com', 1, null, 'name', MPW.NS)
      .then(password => expect(password).toEqual('jidcalake'))
  })

  test('check pin', () => {
    return mpw.generate('some.important-size.com', 1, null, 'pin', MPW.NS)
      .then(password => expect(password).toEqual('6774'))
  })
})
