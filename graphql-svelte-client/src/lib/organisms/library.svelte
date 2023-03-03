
<script lang=ts>
  import { onDestroy } from "svelte";
  import { query } from "svelte-apollo";
  import type { Author, Book } from "$apollo/dtos";
  import { AUTHOR_SEARCH } from "$apollo/queries";

  let input: string = "";
  let selectedAuthor: Author | null = null;
  let authors: Author[] = [];
  let books: Book[] = [];

  const search = query<{ searchByAuthor: Author[] }>(AUTHOR_SEARCH, {
    variables: { name: input }
  });

  $: search.refetch({ name: input });

  const sub = search.subscribe(results => {
    console.log("REFETCHED");
    authors = results.data?.searchByAuthor ?? [];
    console.log(authors);
  });

  function selectAuthor(author: Author) {
    selectedAuthor = author;
    books = author.books
  }

  onDestroy(sub);
</script>  
  
<div class="section">
  <h2 class="section-title">Authors</h2>

  <input type="text" bind:value="{input}" />

  <table class="table">
    <thead>
      <tr>
        <th>Name</th>
      </tr>
    </thead>
    <tbody>
      {#if !authors || !authors.length}
        <tr>
          <td>No Result</td>
        </tr>
      {:else}
        {#each authors as author, index}
          <tr>
            <td>{author.name}</td>
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>

  <h2 class="section-title">Books</h2>

  <table class="table">
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
      </tr>
    </thead>
    <tbody>
      {#if authors && authors.length}
        {#each authors as author}
          {#each author.books as book}
            <tr>
              <td>{book.title}</td>
              <td>{author.name}</td>
            </tr>
          {/each}
        {/each}  
      {/if}
    </tbody>
  </table>
</div>
