import { GraphQLServer } from 'graphql-yoga'
import { fieldsConflictMessage } from 'graphql/validation/rules/OverlappingFieldsCanBeMerged'

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
    body: '',
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
