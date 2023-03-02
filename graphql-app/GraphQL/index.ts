import { Context } from "@azure/functions";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateHandler } from "@as-integrations/azure-functions";
import {
  typeDefs,
  resolvers,
  MyContext,
  SchoolAPI,
  LibraryAPI,
  getTokenFromRequest,
} from "../Shared/graphql-lib";

const { SCHOOL_URL, LIBRARY_URL } = process.env;

// Apollo Server setup
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded"
});

export default startServerAndCreateHandler(server, {
  context: async (args: { context: Context }) => {
    const { cache } = server;
    const { req, res } = args.context;

    const token = getTokenFromRequest(req);

    const dataSources = {
      libraryAPI: new LibraryAPI({ baseURL: LIBRARY_URL, token, cache }),
      schoolAPI: new SchoolAPI({ baseURL: SCHOOL_URL, token, cache }),
    };

    return { dataSources };
  }
});
