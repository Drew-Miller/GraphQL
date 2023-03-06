<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { authorClient } from "$/apollo/author-client";
  import type { Unsubscriber } from "svelte/store";
  import { mouseEventStore } from "$/stores/mouse-event-store";

  let input: HTMLInputElement;
  let searchText: string = "";
  let results: string[] = [];
  let focused: boolean = false;
  let skipFirstSub = true;

  const query = authorClient.authorSearch({ searchText });

  $: query.refetch({ name: searchText });
  $: showResults = focused && results && !!results.length;

  let unsubscribes: Unsubscriber[] = [];
  onMount(() => {
    let x = query.subscribe((payload) => {
      if (!payload.data) {
        return (results = []);
      }
      results = payload.data.searchByAuthor.map((author) => author.name);
    });

    let y = mouseEventStore.subscribe(handleMouseEvent);

    unsubscribes.push(x, y);
  });

  onDestroy(() => {
    unsubscribes.forEach((x) => x());
  });

  function onUse(el: HTMLInputElement) {
    input = el;
  }

  function handleMouseEvent(event: MouseEvent) {
    if (skipFirstSub) {
      skipFirstSub = false;
      return;
    }

    if (event.type === "click") {
      input.blur();
      focused = false;
    }
  }

  function handleResultClick(result: string) {
    searchText = result;
  }

  function handleFocusChange(event: FocusEvent) {
    if (event.type === "focusin") {
      focused = true;
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    // Focus out on escape
    if (event.key === "Escape") {
      focused = false;
      input.blur();
      return;
    }

    if (event.key === "Enter") {
    }
  }

  function handleClick(event: MouseEvent) {
    event.stopPropagation();
  }

  function search() {}
</script>

<div class="container">
  <h1 class="header">GQL Library</h1>

  <div
    class="search-bar"
    class:focused
    class:has-results={showResults}
    on:focusin={handleFocusChange}
  >
    <div class="search-bar-contents">
      <button class="icon-button" on:click={search}>
        <span class="material-symbols-outlined">search</span>
      </button>

      <input
        type="text"
        tabindex="0"
        placeholder="Search..."
        bind:value={searchText}
        use:onUse
        on:keydown={handleKeyDown}
        on:click={handleClick}
      />

      {#if searchText}
        <button class="icon-button" on:click={() => (searchText = "")}>
          <span class="material-symbols-outlined">close</span>
        </button>
      {/if}

      {#if showResults}
        <div class="search-results">
          {#each results as result}
            <div
              class="search-result"
              on:click={() => handleResultClick(result)}
              on:keypress={() => handleResultClick(result)}
            >
              <a href="/author">{result}</a>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
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