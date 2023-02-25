import { Collection, DataStore } from 'notarealdb';
import { Author, Book, College, Student } from './types';

// Data
const store = new DataStore('./tables');

export type CollegeStore = {
   students: Collection<Student>,
   colleges: Collection<College>
};

export type LibraryStore = {
   authors: Collection<Author>,
   books: Collection<Book>
};

const db = {
   students: store.collection<Student>('students'),
   colleges: store.collection<College>('colleges'),
   books: store.collection<Book>('books'),
   authors: store.collection<Author>('authors')
};

export default db;
