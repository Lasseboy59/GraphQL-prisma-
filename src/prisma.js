import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466'
})

// prisma.query prisma.mutation prisma.subscription prisma.exists

// prisma.query.users(null, '{ id name posts { id title } }').then((data) => {
//   console.log(JSON.stringify(data, undefined, 2))
// })

// prisma.query.comments(null, '{ id text author { id name } }').then((data) => {
//   console.log(JSON.stringify(data, undefined, 2))
// })

// prisma.mutation.createPost({
//   data: {
//     title: " Graph 101, more post from Node terminal",
//     body: "hello there 2",
//     published: false,
//     author: {
//       connect: {
//         id: "ck7yia7az00v80805rfhv58yr"
//       }
//     }
//   }
// }, '{id title body published}').then((data) => {
//   console.log(data)
//   return prisma.query.users(null, '{id name posts { id title }}')
// }).then((data) => {
//   console.log(JSON.stringify(data, undefined, 2))
// })

prisma.mutation.updatePost({
  where: {
    id: "ck7xjeesq01l30905gnv5xpcr"
  },
  data: {
    title: " Graph 104, more post from NodeJS",
    body: "hello there 104",
    published: true
  }
}, '{id}').then((data) => {
  return prisma.query.posts(null, '{ id title body published }')
}).then((data) => {
  console.log(data)
})
