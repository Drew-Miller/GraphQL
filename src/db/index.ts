import { Collection, DataStore } from 'notarealdb';
import path from 'path';
import { Author, Book, College, Student } from './types';

// Relative path to the database
const fp = path.resolve(__dirname, './data');

// Data
const store = new DataStore(fp);

export type CollegeStore = {
   students: Collection<Student>,
   colleges: Collection<College>
};

export type LibraryStore = {
   authors: Collection<Author>,
   books: Collection<Book>
};

const students = store.collection<Student>('students');
const colleges = store.collection<College>('colleges');
const books = store.collection<Book>('books');
const authors = store.collection<Author>('authors');

export { students, colleges, books, authors };
