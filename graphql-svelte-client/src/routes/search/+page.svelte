<script lang="ts">
  import { setClient } from "svelte-apollo";
  import SearchResults from "$lib/organisms/search-results.svelte";
  import SearchBar from "$lib/molecules/search-bar.svelte";
  import { apolloClient } from "$apollo/client";
  import type { SearchResult } from "$apollo/dtos";
  import { mouseEventStore } from "$stores/mouse-event-store";

  /** @type {import('./$types').LayoutData} */
  export let data: { q: string };
  console.log(data);

  setClient(apolloClient);

  let results: SearchResult[] = [];

  function handleClick(event: MouseEvent) {
    mouseEventStore.set(event);
  }
</script>

<div class="page" on:click={handleClick} on:keypress={() => {}}>
  <div class="nav-bar">
    <h1 class="header">GQL Library</h1>

    <div class="search-bar-container">
      <SearchBar searchText={data.q} bind:results={results}></SearchBar>
    </div>
  </div>

  <SearchResults bind:results={results}></SearchResults>
  
</div>

<style>  
  .page {
    position: relative;
    min-height: 100vh;
    height: 100vh;
    padding-bottom: var(--footer-height);
  }

  .nav-bar {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100px;
    padding: 0 40px;
  }

  .header {
    color: var(--color-brand-primary);
    font-family: 'Smokum', sans-serif;
    font-weight: 700;
    font-size: 2.25rem;
    text-align: center;
    margin: 0 40px;
  }

  .search-bar-container {
    width: 700px;
  }
</style>