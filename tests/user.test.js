import 'cross-fetch/polyfill'
import { gql } from 'apollo-boost'
import prisma from '../src/prisma'
import seedDatabase from './utils/seedDatabase'
import getClient from './utils/getClient'

const client = getClient()

beforeEach(seedDatabase)

test('Should create a new user', async () => {
  const createUser = gql`
        mutation {
            createUser(
                data: {
                    name: "Lasse",
                    email: "lasse@example.com",
                    password: "secret123"
                }
            ){
                token,
                user {
                    id
                }
            }
        }
    `

  const response = await client.mutate({
    mutation: createUser
  })

  const exists = await prisma.exists.User({ id: response.data.createUser.user.id })
  expect(exists).toBe(true)
})

test('Should expose public author profiles', async () => {
  const getUsers = gql`
    query {
      users {
        id
        name
        email
      }
    }
  `
  const response = await client.query({ query: getUsers })

  expect(response.data.users.length).toBe(1)
  expect(response.data.users[0].email).toBe(null)
  expect(response.data.users[0].name).toBe('Timo Mäki')
})

test('Should not signup user with invalid password', async () => {
  const login = gql`
    mutation {
      login(
        data: {
          email: "timo@example.com",
          password: "Secret123"
        }
      ){
        token
      }
    }
  `
  await expect(client.mutate({ mutation: login })).rejects.toThrow()
})

test('Should not signup user with invalid password', async () => {
  const createUser = gql`
    mutation {
      createUser(
        data: {
          name: "Lasse"
          email: "lasse@example.com",
          password: "secret"
        }
      ){
        token
      }
    }
  `
  await expect(client.mutate({ mutation: createUser })).rejects.toThrow()
})
