<script lang=ts>
  import { onMount, onDestroy } from "svelte";
  import { authorClient } from "$/apollo/author-client";
  
  let searchText = '';
  let results: string[] = [];

  const query = authorClient.authorSearch({ searchText });

  $: query.refetch({ searchText });

  onMount(() => {
    query.subscribe(payload => {
      if (!payload.data) {
        return results = [];
      }
      results = payload.data.searchByAuthor.map(author => author.name);
    });
  });
  
  async function fetchSearchResults(query: string) {
    // Call your search API here and return the results
    // You can use a library like Axios or Fetch to make the API call
    // For this example, we'll just return some dummy data
    return [
      { title: 'Search Result 1', url: 'https://example.com/search-result-1' },
      { title: 'Search Result 2', url: 'https://example.com/search-result-2' },
      { title: 'Search Result 3', url: 'https://example.com/search-result-3' },
    ];
  }
  
  function handleSearchInput($event: KeyboardEvent) {
    
  }
  
  function handleResultClick($event: KeyboardEvent) {
    
  }
</script>  
  
<div class="section">
  <h2 class="section-title">Authors</h2>

  <input type="text" bind:value="{searchText}" />

  <table class="table">
    <thead>
      <tr>
        <th>Name</th>
      </tr>
    </thead>
    <tbody>
      {#if !results || !results.length}
        <tr>
          <td>No Result</td>
        </tr>
      {:else}
        {#each results as author, index}
          <tr>
            <td>{author}</td>
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</div>
