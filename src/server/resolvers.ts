import db, { CollegeStore, LibraryStore } from '../data';
import { MyContext } from './context';

// The GraphQL schema
const resolvers = {
  Query: {
    heartbeat: {
      hello: () => 'world',
      ping: () => 'pong'
    },
    books: (_: any, __: any, contextValue: MyContext) => {
      let store: LibraryStore
      if (contextValue.dataSources && (store = contextValue.dataSources.libraryStore)) {
        return store.books;
      }
    },
    authors: (_: any, __: any, contextValue: MyContext) => {
      let store: LibraryStore
      if (contextValue.dataSources && (store = contextValue.dataSources.libraryStore)) {
        return store.authors;
      }
    },
    colleges: (_: any, __: any, contextValue: MyContext) => {
      let store: CollegeStore
      if (contextValue.dataSources && (store = contextValue.dataSources.collegeStore)) {
        return store.colleges;
      }
    },
    students: (_: any, __: any, contextValue: MyContext) => {
      let store: CollegeStore
      if (contextValue.dataSources && (store = contextValue.dataSources.collegeStore)) {
        return store.students;
      }
    },
  }
};

export default resolvers;