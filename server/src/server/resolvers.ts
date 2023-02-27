import { Author, Book } from 'db/@types';
import { CollegeStore, LibraryStore, books } from '../../../data/src';
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
  Mutation: {
    addBook: (_: any, req: { title: string, author: string }, contextValue: MyContext) => {
      let store: LibraryStore
      if (contextValue.dataSources && !!(store = contextValue.dataSources.libraryStore)) {
        let author: Author = store.authors.list().find(x => x.name == req.author);
  
        if (!author) {
          const authorIds = store.authors.list().sort().map(x => x.id);
          const authorId = Number(authorIds.pop()) + 1;
  
          store.authors.create({
            id: authorId,
            name: req.author
          });
  
          author = store.authors.list().find(x => x.name == req.author);
        }

        
        let book = store.books.list().find(x => x.title == req.title);
        if (!book) {
          const bookIds = store.books.list().sort().map(x => x.id);
          const bookId = Number(bookIds.pop()) + 1;
  
          store.books.create({
            id: bookId,
            title: req.title,
            authorId: author.id
          });
  
          book = store.books.list().find(x => x.title == req.title);
        } else {
          store.books.update({
            ...book,
            authorId: author.id
          })
        }
        
        const res = {
          ...book,
          author: store.authors.get(book.authorId)
        } as Book;

        return res;
      }
    }
  }
};

export default resolvers;