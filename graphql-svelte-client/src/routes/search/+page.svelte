<script lang="ts">
  import { setClient } from "svelte-apollo";
  import SearchBar from "$lib/molecules/search-bar.svelte";
  import { apolloClient } from "$apollo/client";
  import { mouseEventStore } from "$/stores/mouse-event-store";

  /** @type {import('./$types').LayoutData} */
  export let data: { q: string };
  console.log(data);

  setClient(apolloClient);

  function handleClick(event: MouseEvent) {
    mouseEventStore.set(event);
  }
</script>

<style>  
  .page {
    position: relative;
    min-height: 100vh;
    height: 100vh;
    padding-bottom: var(--footer-height);
  }
</style>

<div class="page" on:click={handleClick} on:keypress={() => {}}>
  <SearchBar searchText={data.q}></SearchBar>
</div>
