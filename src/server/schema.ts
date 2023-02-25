const typeDefs = `#graphql
type Query {
  heartbeat: String
  books: [Book]
  authors: [Author]
  colleges: [College]
  students: [Student]
}

type Mutation {
  addBook(title: String, author: String): AddBookMutationResponse
}

type Book {
  title: String!
  author: Author!
}

type Author {
  name: String!
  books: [Book!]!
}

type AddBookMutationResponse {
  code: String!
  success: Boolean!
  message: String!
  book: Book
}

type College {
  id: String!
  name: String!
  location: String!
  rating: Int
}

type Student {
  id: String!
  firstName: String!
  lastName: String!
  email: String!
  password: String!
  collegeId: String!
}

`;

export default typeDefs;