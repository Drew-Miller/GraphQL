import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { DataStore } from 'notarealdb';
import typeDefs from './schema';
const { PORT } = process.env;
const port = Number(PORT) || 4000;
// Data
const store = new DataStore('./data');
const db = {
    students: store.collection('students'),
    colleges: store.collection('colleges'),
    books: store.collection('books'),
    authors: store.collection('authors')
};
// The GraphQL schema
const resolvers = {
    Hearbeat: {
        hello: () => 'world'
    },
    Library: {
        books: () => db.books,
        authors: () => db.authors
    },
    School: {
        colleges: () => db.colleges,
        students: () => db.students
    }
};
// Apollo Server setup
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
    listen: { port: port },
});
console.log(`🚀  Server ready at: ${url}`);
