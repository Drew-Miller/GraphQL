import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import * as dotenv from 'dotenv';
import { typeDefs, resolvers, MyContext, SchoolAPI, LibraryAPI, getTokenFromRequest } from 'graphql-lib';

dotenv.config();
const { PORT, SCHOOL_URL, LIBRARY_URL } = process.env;
const port = Number(PORT) || 4000;

// Apollo Server setup
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: port },
    context: async ({ req, res }) => {
      const { cache } = server;

      const token = getTokenFromRequest(req);

      const dataSources = {
        libraryAPI: new LibraryAPI({ baseURL: LIBRARY_URL, token, cache }),
        schoolAPI: new SchoolAPI({ baseURL: SCHOOL_URL, token, cache })
      }

      return { dataSources };
    },
  });
  
  console.log(`🚀  Server ready at: ${url}`);
}

export default startServer;