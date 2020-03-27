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

const userTwo = {
  input: {
    name: 'Juha Tommila',
    email: 'juha@example.com',
    password: bcrypt.hashSync('secret123')
  },
  user: undefined,
  jwt: undefined
}

const postOne = {
  input: {
    title: 'My published post',
    body: '',
    published: true,
  },
  post: undefined
}

const postTwo = {
  input: {
    title: 'My draft post',
    body: '',
    published: false
  },
  post: undefined
}

const commentOne = {
  input: {
    text: "Juha commented postOne"
  },
  comment: undefined
}

const commentTwo = {
  input: {
    text: "Timo's comment"
  },
  comment: undefined
}
const seedDatabse = async () => {
  // delete testData
  await prisma.mutation.deleteManyComments()
  await prisma.mutation.deleteManyPosts()
  await prisma.mutation.deleteManyUsers()

  // create userOne
  userOne.user = await prisma.mutation.createUser({ data: userOne.input })
  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET)

  // create userTwo
  userTwo.user = await prisma.mutation.createUser({ data: userTwo.input })
  userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET)

  // create post one
  postOne.post = await prisma.mutation.createPost({
    data: {
      ...postOne.input,
      author: {
        connect: {
          id: userOne.user.id
        }
      }
    }
  })

  // Create post two
  postTwo.post = await prisma.mutation.createPost({
    data: {
      ...postTwo.input,
      author: {
        connect: {
          id: userOne.user.id
        }
      }
    }
  })

  // Create commentOne by userTwo
  commentOne.comment = await prisma.mutation.createComment({
    data: {
      ...commentOne.input,
      author: {
        connect: {
          id: userTwo.user.id
        }
      },
      post: {
        connect: {
          id: postOne.post.id
        }
      }
    }
  })

  // Create commentTwo by userOne
  commentTwo.comment = await prisma.mutation.createComment({
    data: {
      ...commentTwo.input,
      author: {
        connect: {
          id: userOne.user.id
        }
      },
      post: {
        connect: {
          id: postOne.post.id
        }
      }
    }
  })

}
export { seedDatabse as default, userOne, postOne, postTwo, commentOne, commentTwo }