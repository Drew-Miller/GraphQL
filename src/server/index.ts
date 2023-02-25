import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './schema';
import resolvers from './resolvers';
import db, { CollegeStore, LibraryStore } from '../data';

const { PORT } = process.env;
const port = Number(PORT) || 4000;


type MyContext = {
  // Context typing
  dataSources: {
    libraryStore: LibraryStore,
    collegeStore: CollegeStore
  };
}

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
        libraryStore: db as LibraryStore,
        collegeStore: db as CollegeStore
      }
    }),
  });
  
  console.log(`🚀  Server ready at: ${url}`);
}

export default startServer;