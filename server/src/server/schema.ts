const typeDefs = `#graphql

# Standard 1 to 1 queries.
type Query {
  hello: String
  ping: String
  colleges: [College]
  students: [Student]
  books: [Book]
  authors: [Author]
}

# Operations grouped by context.
type Mutation {
  addBook(title: String, author: String): Book
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
  title: String!
  author: Author!
}

type Author {
  name: String!
  books: [Book!]!
}

`;

export default typeDefs;