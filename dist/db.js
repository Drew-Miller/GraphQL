"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notarealdb_1 = require("notarealdb");
// Data
const store = new notarealdb_1.DataStore('./data');
const db = {
    students: store.collection('students'),
    colleges: store.collection('colleges'),
    books: store.collection('books'),
    authors: store.collection('authors')
};
exports.default = db;
//# sourceMappingURL=db.js.map