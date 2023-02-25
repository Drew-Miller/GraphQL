import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './schema';
import resolvers from './resolvers';
import { CollegeStore, LibraryStore, students, colleges, books, authors } from '../db';
import { MyContext } from './context';

const { PORT } = process.env;
const port = Number(PORT) || 4000;

// Apollo Server setup
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
})

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: port },
    context: async ({ req }) => ({
      dataSources: {
        libraryStore: {
          authors,
          books
        } as LibraryStore,
        collegeStore: {
          students,
          colleges
        } as CollegeStore
      }
    }),
  });
  
  console.log(`🚀  Server ready at: ${url}`);
}

export default startServer;