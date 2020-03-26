import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../../src/prisma'

const userOne = {
  input: {
    name: 'Timo Mäki',
    email: 'timo@example.com',
    password: bcrypt.hashSync('secret123')
  },
  user: undefined,
  jwt: undefined
}

const seedDatabse = async () => {
  // delete testData
  await prisma.mutation.deleteManyPosts()
  await prisma.mutation.deleteManyUsers()
  // create userOne
  userOne.user = await prisma.mutation.createUser({
    data: userOne.input
  })
  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET)

  await prisma.mutation.createPost({
    data: {
      title: 'My published post',
      body: '',
      published: true,
      author: {
        connect: {
          id: userOne.user.id
        }
      }
    }
  })
  await prisma.mutation.createPost({
    data: {
      title: 'My draft post',
      body: '',
      published: false,
      author: {
        connect: {
          id: userOne.user.id
        }
      }
    }
  })
}

export { seedDatabse as default, userOne }