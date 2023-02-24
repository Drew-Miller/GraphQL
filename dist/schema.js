const typeDefs = `#graphql
type Query {
  books: [Book]
  authors: [Author]
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
`;
export default typeDefs;
