import { Collection, DataStore } from 'notarealdb';
import * as path from 'path';
import { AuthorEntity, BookEntity } from './types';

// Relative path to the database
const fp = path.resolve(__dirname, './data');

// Data
const store = new DataStore(fp);

export type LibraryStore = {
   authors: Collection<AuthorEntity>,
   books: Collection<BookEntity>
};

const books = store.collection<BookEntity>('books');
const authors = store.collection<AuthorEntity>('authors');

export { books, authors };
