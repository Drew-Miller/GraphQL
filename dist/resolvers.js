"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./db"));
// The GraphQL schema
const resolvers = {
    Hearbeat: {
        hello: () => 'world'
    },
    Library: {
        books: () => db_1.default.books,
        authors: () => db_1.default.authors
    },
    School: {
        colleges: () => db_1.default.colleges,
        students: () => db_1.default.students
    }
};
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map