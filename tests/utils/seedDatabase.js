import bcrypt from 'bcryptjs'
import prisma from '../../src/prisma'

const seedDatabse = async () => {
  await prisma.mutation.deleteManyPosts()
  await prisma.mutation.deleteManyUsers()
  const user = await prisma.mutation.createUser({
    data: {
      name: 'Timo Mäki',
      email: 'timo@example.com',
      password: bcrypt.hashSync('secret123')
    }
  })
  await prisma.mutation.createPost({
    data: {
      title: 'My published post',
      body: '',
      published: true,
      author: {
        connect: {
          id: user.id
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
          id: user.id
        }
      }
    }
  })
}

export { seedDatabse as default }