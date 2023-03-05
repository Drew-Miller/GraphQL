import { query } from "svelte-apollo";
import { AUTHOR_SEARCH } from "./queries";

class AuthorClient {
  public authorSearch(options: { searchText: string }) {
    return query<{ searchByAuthor: { name: string }[] }>(AUTHOR_SEARCH, {
      variables: { name: options.searchText }
    });
  }
}

const authorClient = new AuthorClient();

export { authorClient };

