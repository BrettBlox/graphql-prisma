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
    body: 'Here is a list of my favorite songs to listen to while coding and crying.',
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
    text: 'great post! check out my profile to learn more about investing in timeshares!',
    author: '2',
    post: '10',
  },
]

const db = {
  users,
  posts,
  comments,
}

export default db
