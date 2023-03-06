<script lang="ts">
  import SearchBar from "$lib/molecules/search-bar.svelte";
  import { mouseEventStore } from "$stores/mouse-event-store";
  import { onDestroy, onMount } from "svelte";
  import type { Unsubscriber } from "svelte/store";

  let loseFocus: () => void;
  let skipFirstSub = true;

  let unsubscribe: Unsubscriber;
  onMount(() => {
    unsubscribe = mouseEventStore.subscribe(handleMouseEvent);
  });

  onDestroy(() => {
    // unsubscribe();
  });

  function handleMouseEvent(event: MouseEvent) {
    if (skipFirstSub) {
      skipFirstSub = false;
      return;
    }

    if (event.type === "click") {
      loseFocus();
    }
  }
</script>

<div class="container">
  <h1 class="header">GQL Library</h1>

  <SearchBar bind:loseFocus={loseFocus}></SearchBar>  
</div>

<style>
.container {
  max-width: 800px;
  margin: 0 auto;

  height: calc(100% - 200px);
  margin-top: auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container > * {
  padding: 20px 0;
}

.header {
  color: var(--color-brand-primary);
  font-family: 'Smokum', sans-serif;
  font-weight: 700;
  font-size: 4rem;
  text-align: center;
}
</style>