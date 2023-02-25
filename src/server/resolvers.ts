import { CollegeStore, LibraryStore, books } from '../db';
import { MyContext } from './context';

// The GraphQL schema
const resolvers = {
  Query: {
    hello: () => 'world',
    ping: () => 'pong',

    books: (_: any, __: any, contextValue: MyContext) => {
      console.log(JSON.stringify(books))
      return books.list();
    },
    authors: (_: any, __: any, contextValue: MyContext) => {
      let store: LibraryStore
      if (contextValue.dataSources && !!(store = contextValue.dataSources.libraryStore)) {
        return store.authors.list();
      }
    },
    colleges: (_: any, __: any, contextValue: MyContext) => {
      let store: CollegeStore
      if (contextValue.dataSources && !!(store = contextValue.dataSources.collegeStore)) {
        return store.colleges.list();
      }
    },
    students: (_: any, __: any, contextValue: MyContext) => {
      let store: CollegeStore
      if (contextValue.dataSources && !!(store = contextValue.dataSources.collegeStore)) {
        return store.students.list();
      }
    },
  }
};

export default resolvers;