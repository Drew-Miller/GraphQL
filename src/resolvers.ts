import db from './db';

// The GraphQL schema
const resolvers = {
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
};

export default resolvers;