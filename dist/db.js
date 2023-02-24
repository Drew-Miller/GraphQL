import { DataStore } from 'notarealdb';
const store = new DataStore('./data');
const db = {
    students: store.collection('students'),
    colleges: store.collection('colleges')
};
export { db };
