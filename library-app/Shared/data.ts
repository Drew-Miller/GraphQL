import { DataStore } from 'notarealdb';
import * as path from 'path';
import { AuthorEntity, BookEntity } from './data/types';

// Relative path to the database
const fp = path.resolve(__dirname, '../../Shared/data');

// Data
const store = new DataStore(fp);

const books = store.collection<BookEntity>('books');
const authors = store.collection<AuthorEntity>('authors');

export { books, authors };
