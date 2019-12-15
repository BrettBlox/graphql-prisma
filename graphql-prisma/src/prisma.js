import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466',
})

// prisma.query prisma.mutation prisma.subscription prisma.exists

// prisma.query.users(null, '{ id name posts { id title } }').then(data => {
//   console.log(JSON.stringify(data, undefined, 2))
// })

// prisma.query.comments(null, '{ id text author { id name } }').then(data => {
//   console.log(JSON.stringify(data, undefined, 2))
// })

// prisma.mutation
//   .createPost(
//     {
//       data: {
//         title: 'GraphQL 101',
//         body: '',
//         published: false,
//         author: {
//           connect: {
//             id: 'ck386l4i200ce0799kyjsnq37',
//           },
//         },
//       },
//     },
//     '{ id title body published }'
//   )
//   .then(data => {
//     console.log(data)
//     return prisma.query.users(null, '{ id name posts { id title } }')
//   })
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2))
//   })

//
// Goal: Mess around with mutations
//
// 1. Update the newly created post changing it's body and marking it as published
// 2. Fetch all posts (id, title, body, published) and print them to the console
// 3. View the list of posts and confirm that post did have it body and published values updated

prisma.mutation
  .updatePost(
    {
      where: {
        id: 'ck44xjrai00250732vu6m5f57',
      },
      data: {
        body: 'This is how to get started with Graphql...',
        published: true,
      },
    },
    '{ id }'
  )
  .then(data => prisma.query.posts(null, '{ id title body published }'))
  .then(data => {
    console.log(data)
  })
