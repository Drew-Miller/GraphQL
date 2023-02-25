import { Author, Book } from 'db/types';
import { CollegeStore, LibraryStore, books } from '../db';
import { MyContext } from './context';

// The GraphQL schema
const resolvers = {
  Query: {
    hello: () => 'world',
    ping: () => 'pong',
    colleges: (_: any, __: any, contextValue: MyContext) => {
      let store: CollegeStore
      if (contextValue.dataSources && !!(store = contextValue.dataSources.collegeStore)) {
        return store.colleges.list().map(college => {
          const res = {
            ...college,
            students: store.students
              .list()
              .filter(student => student.collegeId == college.id)
          };
          return res;
        });
      }
    },
    students: (_: any, __: any, contextValue: MyContext) => {
      let store: CollegeStore
      if (contextValue.dataSources && !!(store = contextValue.dataSources.collegeStore)) {
        return store.students.list().map(student => {
          const res = {
            ...student,
            college: store.colleges.get(student.collegeId)
          };
          return res;
        });
      }
    },
    books: (_: any, __: any, contextValue: MyContext) => {
      let store: LibraryStore
      if (contextValue.dataSources && !!(store = contextValue.dataSources.libraryStore)) {
        return store.books.list().map(book => {
          const res = {
            ...book,
            author: store.authors.get(book.authorId)
          };
          return res;
        });
      }
    },
    authors: (_: any, __: any, contextValue: MyContext) => {
      let store: LibraryStore
      if (contextValue.dataSources && !!(store = contextValue.dataSources.libraryStore)) {
        return store.authors.list().map(author => {
          const res = {
            ...author,
            books: store.books
              .list()
              .filter(book => book.authorId == author.id)
          };
          return res;
        });
      }
    },
  },
  Library: {
    addBook: (_: any, __: { title: string, author: string }, contextValue: MyContext) => {
      let store: LibraryStore
      if (contextValue.dataSources && !!(store = contextValue.dataSources.libraryStore)) {
        let author: Author = store.authors.list().find(x => x.name == __.author);
  
        if (!author) {
          const authorId = Number(store.authors.list().map(x => x.id)[-1]) + 1;
  
          store.authors.create({
            id: authorId,
            name: __.author
          });
  
          author = store.authors.list().find(x => x.name == __.author);
        }
        
        let book = store.books.list().find(x => x.title == __.title);
        if (!book) {
          const bookId = Number(store.authors.list().map(x => x.id)[-1]) + 1;
  
          store.books.create({
            id: bookId,
            title: __.title,
            authorId: author.id
          });
  
          book = store.books.list().find(x => x.title == __.title);
        } else {
          store.books.update({
            ...book,
            authorId: author.id
          })
        }
        
        return {
          ...book,
          author: store.authors.get(book.authorId)
        } as Book;
      }
    }
  }
};

export default resolvers;