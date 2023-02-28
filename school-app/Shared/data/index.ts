import { Collection, DataStore } from 'notarealdb';
import * as path from 'path';
import { CollegeEntity, StudentEntity } from './types';

// Relative path to the database
const fp = path.resolve(__dirname, './data');

// Data
const store = new DataStore(fp);

export type CollegeStore = {
   students: Collection<StudentEntity>,
   colleges: Collection<CollegeEntity>
};

const students = store.collection<StudentEntity>('students');
const colleges = store.collection<CollegeEntity>('colleges');

export { students, colleges };
