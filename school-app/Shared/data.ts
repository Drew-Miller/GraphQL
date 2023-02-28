import { Collection, DataStore } from 'notarealdb';
import * as path from 'path';
import { CollegeEntity, StudentEntity } from './data/types';

// Relative path to the database
const fp = path.resolve(__dirname, '../../Shared/data');
console.log(fp);

// Data
const store = new DataStore(fp);

const students = store.collection<StudentEntity>('students');
const colleges = store.collection<CollegeEntity>('colleges');

export { students, colleges };
