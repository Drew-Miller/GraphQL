import { AddBook, Author, Book, College, Student } from './dto';
import { MyContext } from './context';

// The GraphQL schema
const resolvers = {
  Query: {
    hello: () => 'world',
    ping: () => 'pong',

    colleges: async (_: any, __: any, { dataSources }: MyContext) => {
      return dataSources.schoolAPI.getColleges();
    },
    students: async (_: any, __: any, { dataSources }: MyContext) => {      
      return dataSources.schoolAPI.getStudents();
    },

    books: async (_: any, __: any, { dataSources }: MyContext) => {
      return dataSources.libraryAPI.getBooks();
    },
    authors: async (_: any, __: any, { dataSources }: MyContext) => {
      return dataSources.libraryAPI.getAuthors();
    },
  },
  Mutation: {
    addBook: async (_: any, req: AddBook, { dataSources }: MyContext) => {
      return dataSources.libraryAPI.addBook(req);
    },

    getStudent: async (_: any, req: { id: string }, { dataSources }: MyContext) => {
      return dataSources.schoolAPI.getStudent(req.id);
    },
  }
};

export { resolvers };