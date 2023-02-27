import { Collection, DataStore } from 'notarealdb';
import * as path from 'path';
import { College, Student } from './types';

// Relative path to the database
const fp = path.resolve(__dirname, './data');

// Data
const store = new DataStore(fp);

export type CollegeStore = {
   students: Collection<Student>,
   colleges: Collection<College>
};

const students = store.collection<Student>('students');
const colleges = store.collection<College>('colleges');

export { students, colleges };
