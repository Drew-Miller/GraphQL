import { AddBook } from 'dto';
import { MyContext } from './context';

// The GraphQL schema
const resolvers = {
  Query: {
    hello: () => 'world',
    ping: () => 'pong',
    colleges: async (_: any, __: any, contextValue: MyContext) => {
      return await contextValue.dataSources.schoolSource.getColleges();
    },
    students: async (_: any, __: any, contextValue: MyContext) => {
      return await contextValue.dataSources.schoolSource.getStudents();
    },
    books: async (_: any, __: any, contextValue: MyContext) => {
      return await contextValue.dataSources.librarySource.getBooks();
    },
    authors: async (_: any, __: any, contextValue: MyContext) => {
      return await contextValue.dataSources.librarySource.getAuthors();
    },
  },
  Mutation: {
    addBook: async (_: any, req: AddBook, contextValue: MyContext) => {
      return await contextValue.dataSources.librarySource.addBook(req);
    }
  }
};

export { resolvers };