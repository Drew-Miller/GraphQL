import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import * as dotenv from 'dotenv';
import typeDefs from './schema';
import resolvers from './resolvers';
import { MyContext } from './context';
import { MyToken } from './dto';
import { SchoolSource, LibrarySource } from './sources';

dotenv.config();
const { PORT, SCHOOL_URL, LIBRARY_URL } = process.env;
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
    context: async ({ req, res }) => {
      const token: MyToken = req.headers.token ?? "TEST_TOKEN";

      const dataSources = {
        librarySource: new LibrarySource({ url: LIBRARY_URL, token }),
        schoolSource: new SchoolSource({ url: SCHOOL_URL, token })
      }

      return { dataSources };
    },
  });
  
  console.log(`🚀  Server ready at: ${url}`);
}

export default startServer;