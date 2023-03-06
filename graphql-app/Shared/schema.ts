export const typeDefs = `#graphql

# Standard 1 to 1 queries.
type Query {
  hello: String
  ping: String
  colleges: [College]
  students: [Student]
  getStudent(id: String!): Student

  books: [Book]
  authors: [Author]
  search(value: String!): [SearchResult]
}

# Operations grouped by context.
type Mutation {
  addBook(title: String!, author: String!): Book
}

type SearchResult {
  weight: Float!
  value: String!
  description: String
  body: String
  type: String!
  imgUrl: String
}

type College {
  id: String!
  name: String!
  location: String!
  rating: Float
  students: [Student!]!
}

type Student {
  id: String!
  firstName: String!
  lastName: String!
  email: String!
  password: String!
  college: College!
}

type Book {
  id: String
  title: String!
  author: Author!
}

type Author {
  id: String
  name: String!
  books: [Book!]!
}

`;