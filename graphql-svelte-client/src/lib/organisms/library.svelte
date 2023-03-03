
<script lang="ts">
  import { onMount } from "svelte";
  import { setClient, query } from "svelte-apollo";
  import { apolloClient } from "$apollo/client";
  import type { Author, Book } from "$apollo/dtos";
  import { AUTHOR_QUERY, BOOK_QUERY } from "$apollo/queries";

  setClient(apolloClient);
  
  let authors: Author[] = [];
  let books: Book[] = [];

  const authorQuery = query<{ authors: Author[] }>(AUTHOR_QUERY);
  const bookQuery = query<{ books: Book[] }>(BOOK_QUERY);
  $: authorQuery.refetch();
  $: bookQuery.refetch();

  onMount(async () => {
    authorQuery.subscribe(res => {
      authors = res.data?.authors ?? [];
    });

    bookQuery.subscribe(res => {
      books = res.data?.books ?? [];
    });  
  });

  let selectedAuthor: Author | null = null;
  let selectedBook: Book | null = null;
  
  function toggleAuthor(index: number) {
    selectedBook = null;
    selectedAuthor = authors[index];
  }

  function toggleBook(index: number) {
    selectedAuthor = null;
    selectedBook = books[index];
  }
</script>  
  
<div class="section">
  <h2 class="section-title">Authors</h2>
  <table class="table colleges">
    <thead>
      <tr>
        <th>Name</th>
      </tr>
    </thead>
    <tbody>
      {#each authors as author, index}
        <tr on:click="{() => toggleAuthor(index)}" class:selected="{author.id === selectedBook?.author.id || author === selectedAuthor}">
          <td>{author.name}</td>
        </tr>
      {/each}
    </tbody>
  </table>
  <h2 class="section-title">Books</h2>
  <table class="table students">
    <thead>
      <tr>
        <th>Title</th>
      </tr>
    </thead>
    <tbody>
      {#each books as book, index}
        <tr on:click="{ () => toggleBook(index) }" class:selected="{book.author.id === selectedAuthor?.id || book === selectedBook}">
          <td>{book.title}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
