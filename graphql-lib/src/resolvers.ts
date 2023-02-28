import { AddBook } from './dto';
import { MyContext } from './context';

// The GraphQL schema
const resolvers = {
  Query: {
    hello: () => 'world',
    ping: () => 'pong',
    colleges: async (_: any, __: any, contextValue: MyContext) => {
      return await contextValue.dataSources.schoolAPI.getColleges();
    },
    students: async (_: any, __: any, contextValue: MyContext) => {
      return await contextValue.dataSources.schoolAPI.getStudents();
    },
    books: async (_: any, __: any, contextValue: MyContext) => {
      return await contextValue.dataSources.libraryAPI.getBooks();
    },
    authors: async (_: any, __: any, contextValue: MyContext) => {
      return await contextValue.dataSources.libraryAPI.getAuthors();
    },
  },
  Mutation: {
    addBook: async (_: any, req: AddBook, contextValue: MyContext) => {
      return await contextValue.dataSources.libraryAPI.addBook(req);
    }
  }
};

export { resolvers };