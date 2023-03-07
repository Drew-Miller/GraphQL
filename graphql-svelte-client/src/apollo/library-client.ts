import { query } from "svelte-apollo";
import type { SearchResult } from "./dtos";
import { AUTHOR_SEARCH } from "./queries";

class LibraryClient {
  public search(options: { value: string }) {
    return query<{ search: SearchResult[] }>(AUTHOR_SEARCH, {
      variables: {
        value: options.value
      }
    });
  }
}

const libraryClient = new LibraryClient();

export { libraryClient };

