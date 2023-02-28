import { AddBook } from 'dto';
import { MyContext } from './context';

// The GraphQL schema
const resolvers = {
  Query: {
    hello: () => 'world',
    ping: () => 'pong',
    colleges: async (_: any, __: any, contextValue: MyContext) => {
      return await contextValue.dataSources.collegeSource.getColleges();
    },
    students: async (_: any, __: any, contextValue: MyContext) => {
      return await contextValue.dataSources.collegeSource.getStudents();
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

export default resolvers;