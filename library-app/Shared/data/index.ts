import { Collection, DataStore } from 'notarealdb';
import * as path from 'path';
import { Author, Book } from './types';

// Relative path to the database
const fp = path.resolve(__dirname, './data');

// Data
const store = new DataStore(fp);

export type LibraryStore = {
   authors: Collection<Author>,
   books: Collection<Book>
};

const books = store.collection<Book>('books');
const authors = store.collection<Author>('authors');

export { books, authors };
