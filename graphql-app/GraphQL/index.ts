import { Context } from "@azure/functions";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateHandler } from "@as-integrations/azure-functions";
import {
  typeDefs,
  resolvers,
  MyContext,
  MyToken,
  SchoolSource,
  LibrarySource,
} from "graphql-lib";

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
    const { req, res } = args.context;

    const token: MyToken = req.headers.token ?? "TEST_TOKEN";

    const dataSources = {
      librarySource: new LibrarySource({ url: LIBRARY_URL, token }),
      schoolSource: new SchoolSource({ url: SCHOOL_URL, token }),
    };

    return { dataSources };
  },
});
