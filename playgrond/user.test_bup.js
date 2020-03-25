import { getFirstName, isValidPassword} from '../src/utils/user.js'

test('Should return first name when given full name', () => {
  const firstName = getFirstName('Lasse Aro')

  expect(firstName).toBe('Lasse')
})

test('Should return first name when given first name', () => {
  const firstName = getFirstName('Jenny')

  expect(firstName).toBe('Jenny')
})

test('Should reject password shorter than 8 chars', () => {
  const password = isValidPassword('red123')

  expect(password).toBe(false)
})

test('Should reject password that contains word password', () => {
  const isValid = isValidPassword('password123')

  expect(isValid).toBe(false)
})

test('Should correctly validate a valid password', () => {
  const isValid = isValidPassword('secret123')

  expect(isValid ).toBe(true)
})