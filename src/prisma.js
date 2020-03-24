import { Prisma } from 'prisma-binding'
import { fragmentReplacements } from './resolvers/index'

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql', 
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  fragmentReplacements
})

export { prisma as default }


// prisma.query prisma.mutation prisma.subscription prisma.exists


// 1. Create new post
// 2. Fetch all info about the author

// const createPostForUser = async (authorId, data) => {
//   const post = await prisma.mutation.createPost({
//     data: {
//       ...data,
//       author: {
//         connect: {
//           id: authorId
//         }
//       }
//     }
//   }, '{id}')
//   const user = await prisma.query.user({
//     where: {
//       id: authorId
//     }
//   }, '{ id, name, email posts { id, title , published}}')
//   return user
// }

// createPostForUser('ck7yl3p9o02du0805lfgircz3', {
//   title: 'Books to read',
//   body: 'more paperwork',
//   published: true
// }).then((user) => {
//   console.log(JSON.stringify(user, undefined, 2))
// })

// const updatePostForUser = async (postId, data) => {
//   const post = await prisma.mutation.updatePost({
//     where: {
//       id: postId
//     },
//     data: {
//       ...data,
//     }
//   }, '{author {id}}')
//   const user = await prisma.query.user({
//     where: {
//       id: post.author.id
//     }
//   }, '{id name email posts {id title published}}')
//   return user
// }

// const updatePostForUser = async (postId, data) => {
//   const postExists = await prisma.exists.Post({ id: postId })

//   if (!postExists) {
//     throw new Error('Post not found')
//   }

//   const post = await prisma.mutation.updatePost({
//     where: {
//       id: postId
//     },
//     data
//   }, '{ author { id name email posts { id title published } } }')

//   return post.author
// }

// updatePostForUser('ck7xjeesq01l30905gnv5xpcr',
//   {
//     published: false,
//     title: 'More comments part 4'
//   }, {
// }).then((post) => {
//   console.log(JSON.stringify(post, undefined, 2))
// })