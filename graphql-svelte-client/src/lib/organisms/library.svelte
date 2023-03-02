
<script lang=ts>
  import type { Author, Book } from "$apollo/dtos";
  
  // const apolloStore = useApolloStore();
  // const authorQuery = apolloStore.getAuthors();
  // const bookQuery = apolloStore.getBooks();
  
  // const authors = computed<Author[]>(() => {
  //   const results = authorQuery.result;
  //   return results?.value?.authors ?? [];
  // });
  // const books = computed<Book[]>(() => {
  //   const results = bookQuery.result;
  //   return results?.value?.books ?? [];
  // });

  let authors: Author[] = [{
    id: "1",
    name: "Hello",
    books: []
  }, {
    id: "2",
    name: "World",
    books: []
  }];
  let books: Book[] = [];
  
  let selectedAuthor: Author | null =  null;
  let selectedBook: Book | null = null;
  
  function toggleAuthor(index: number) {
    selectedAuthor = authors[index];
    selectedBook = null;
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
