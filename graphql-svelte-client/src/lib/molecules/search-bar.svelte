<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { authorClient } from "$/apollo/author-client";
  import type { Unsubscriber } from "svelte/store";

  export const loseFocus = () => {
    input.blur();
    focused = false;
  };

  let input: HTMLInputElement;
  let searchText: string = "";
  let results: string[] = [];
  let focused: boolean = false;

  const query = authorClient.authorSearch({ searchText });

  $: query.refetch({ name: searchText });
  $: showResults = focused && results && !!results.length;

  let unsubscribe: Unsubscriber;
  onMount(() => {
    unsubscribe = query.subscribe((payload) => {
      if (!payload.data) {
        return (results = []);
      }
      results = payload.data.searchByAuthor.map((author) => author.name);
    });
  });

  onDestroy(() => {
    // unsubscribe();
  });

  function onUse(el: HTMLInputElement) {
    input = el;
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
      search();
      return;
    }
  }

  function handleClick(event: MouseEvent) {
    event.stopPropagation();
  }

  function search() {}
</script>

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
  </div>
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

<style>
  .material-symbols-outlined {
    font-size: 1.25rem;
    line-height: 2.5rem;
  }

  .search-bar {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    border: 1px solid var(--color-border);
    border-radius: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: width 0.2s ease;
  }

  .search-bar:hover,
  .search-bar:focus-within,
  .search-bar.focused {
    /* Makes up for the missing border height */
    margin: 1px;
    border: none;
    width: 100%;
    background-color: var(--color-background-soft);
  }

  .search-bar.has-results {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .search-bar-contents {
    display: flex;
    align-items: center;
    height: 40px;
    width: 100%;
    margin: 0 20px;
  }

  .search-bar.has-results .search-bar-contents {
    border-bottom: 1px solid var(--color-border-hover);
  }

  .search-bar input {
    flex: 1;
    height: 100%;
    font-size: 1rem;
    margin: 10px;
    border: none;
    outline: none;
    background: transparent;
    color: var(--color-text);
  }

  .search-bar input::placeholder {
    color: var(--color-text);
  }

  .search-results {
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    padding-top: 10px;
    padding-bottom: 10px;
    background: var(--color-background-soft);
    border-radius: 0 0 20px 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1;
  }

  .search-result {
    padding: 5px 40px;
    cursor: pointer;
  }

  .search-result a {
    text-decoration: none;
    color: var(--color-text);
    font-weight: 700;
  }

  .search-result a:visited {
    color: var(--color-link-visited);
  }

  .search-result:hover {
    background: rgba(255, 255, 255, 0.1);
  }
</style>
