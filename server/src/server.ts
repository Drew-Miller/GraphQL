import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './schema';
import resolvers from './resolvers';
import { CollegeStore, LibraryStore, students, colleges, books, authors } from '../../../data/src';
import { MyContext } from './context';
import { GraphQLError } from 'graphql';
import { AppErrors } from './errors';

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
    context: async ({ req, res }) => {
      if (!authors || !books) {
        throw AppErrors.GetGraphQLError(AppErrors.LIBRARY_STORE_UNDEFINED);
      }

      if (!colleges || !students) {
        throw AppErrors.GetGraphQLError(AppErrors.COLLEGE_STORE_UNDEFINED);
      }

      const dataSources = {
        libraryStore: {
          authors,
          books
        },
        collegeStore: {
          students,
          colleges
        }
      }

      return { dataSources };
    },
  });
  
  console.log(`🚀  Server ready at: ${url}`);
}

export default startServer;