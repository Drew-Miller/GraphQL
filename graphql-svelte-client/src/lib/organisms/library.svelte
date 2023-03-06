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

  function handleResultClick(result: string) {}

  function handleFocusChange(event: FocusEvent) {
    if (event.type === "focusin") {
      focused = true;
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      focused = false;
      input.blur();
    }
  }

  function handleClick(event: MouseEvent) {
    event.stopPropagation();
  }
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
      <span class="material-symbols-outlined">search</span>

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
        <span
          class="material-symbols-outlined"
          on:click={() => (searchText = "")}
          on:keypress={() => (searchText = "")}>close</span
        >
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
