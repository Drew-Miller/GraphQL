import { DataStore } from 'notarealdb';

type College = {
   id: string,
   name: string,
   location: string,
   rating: number
};

type Student = {
   id: string,
   firstName: string,
   lastName: string,
   email: string,
   password: string,
   collegeId: string
};

// Data
const store = new DataStore('./data');

const db = {
   students: store.collection<Student>('students'),
   colleges: store.collection<College>('colleges'),
   books: store.collection('books'),
   authors: store.collection('authors')
};

export default db;
export { Student, College};