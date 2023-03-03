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
    getStudent: async (_: any, req: { id: string }, { dataSources }: MyContext) => {
      return dataSources.schoolAPI.getStudent(req.id);
    },

    books: async (_: any, __: any, { dataSources }: MyContext) => {
      return dataSources.libraryAPI.getBooks();
    },
    authors: async (_: any, __: any, { dataSources }: MyContext) => {
      return dataSources.libraryAPI.getAuthors();
    },
    searchByAuthor: async (_: any, req: { name: string }, { dataSources }: MyContext ) => {
      return dataSources.libraryAPI.searchByAuthor(req.name);
    }
  },
  Mutation: {
    addBook: async (_: any, req: AddBook, { dataSources }: MyContext) => {
      return dataSources.libraryAPI.addBook(req);
    }
  }
};

export { resolvers };