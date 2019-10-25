import { GraphQLServer } from 'graphql-yoga'
import uuid from 'uuidv4'

// Scalar types - String, Boolean, Int, Float, ID

// Dummy user data
const users = [
  {
    id: '1',
    name: 'Brett',
    email: 'brett@example.com',
    age: 28,
  },
  {
    id: '2',
    name: 'Tim',
    email: 'tim@example.com',
  },
  {
    id: '3',
    name: 'Matt',
    email: 'matt@example.com',
  },
]

// Dummy post data
const posts = [
  {
    id: '10',
    title: 'GraphQL 101',
    body: 'This is how to use GraphQL...',
    published: true,
    author: '2',
  },
  {
    id: '11',
    title: 'GraphQL 201',
    body: 'This is an advanced GraphQL post...',
    published: false,
    author: '1',
  },
  {
    id: '12',
    title: 'Programming Music',
    body:
      'Here is a list of my favorite songs to listen to while coding and crying.',
    published: false,
    author: '3',
  },
]

const comments = [
  {
    id: '22',
    text: 'such a fucking good post oh em geeeeee!!! more more more!!!!',
    author: '3',
    post: '10',
  },
  {
    id: '23',
    text: 'im super offended by your existence...',
    author: '2',
    post: '12',
  },
  {
    id: '24',
    text: 'graphql gets me so hot.',
    author: '1',
    post: '11',
  },
  {
    id: '25',
    text:
      'great post! check out my profile to learn more about investing in timeshares!',
    author: '2',
    post: '10',
  },
]

// Type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments(query: String): [Comment!]!
        me: User!
        post: Post!
    }

    type Mutation {
      createUser(name: String!, email: String!, age: Int): User! 
      createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post! 

    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post]!
        comments: [Comment]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment]!
    }

    type Comment {
      id: ID!
      text: String!
      author: User!
      post: Post
    }
`

// Resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users
      }

      return users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase())
      })
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts
      }

      return posts.filter(post => {
        const isTitleMatch = post.title
          .toLowerCase()
          .includes(args.query.toLowerCase())
        const isBodyMatch = post.body
          .toLowerCase()
          .includes(args.query.toLowerCase())
        return isTitleMatch || isBodyMatch
      })
    },
    comments(parent, args, ctx, info) {
      if (!args.query) {
        return comments
      }
    },
  },
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some(user => user.email === args.email)

      if (emailTaken) {
        throw new Error('Email taken.')
      }

      const user = {
        id: uuid(),
        name: args.name,
        email: args.email,
        age: args.age,
      }

      users.push(user)
      return user
    },
    createPost(parent, args, ctx, info) {
      const userExists = users.some(user => user.id === args.author)
      if (!userExists) {
        throw new Error('User not found')
      }

      const post = {
        id: uuid(),
        title: args.title,
        body: args.body,
        published: args.published,
        author: args.author,
      }
      posts.push(post)
      return post
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => user.id === parent.author)
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => comment.post === parent.id)
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => post.author === parent.id)
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => comment.author === parent.id)
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find(user => user.id === parent.author)
    },
    post(parent, args, ctx, info) {
      return posts.find(post => post.id === parent.post)
    },
  },
}

const server = new GraphQLServer({
  typeDefs,
  resolvers,
})

server.start(() => {
  console.log('The server is up!')
})
