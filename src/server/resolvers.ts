import db from '../data';

// The GraphQL schema
const resolvers = {
  Query: {
    Hearbeat: {
      hello: () => 'world'
    },
    Library: {
      books: () => db.books,
      authors: () => db.authors
    },
    School: {
      colleges: () => db.colleges,
      students: () => db.students
    }
  }
};

export default resolvers;