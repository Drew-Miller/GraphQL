<script lang=ts>
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

    let y = mouseEventStore.subscribe((event) => {
      console.log(event);
      if (skipFirstSub) {
        skipFirstSub = false;
        return;
      }

      focused = false;
      input.blur();
    });

    unsubscribes.push(x, y);
  });

  onDestroy(() => {
    unsubscribes.forEach((x) => x());
  });

  function setInput(el: HTMLInputElement) {
    input = el;
  }

  function handleResultClick(result: string) {}

  function handleFocusChange(event: FocusEvent) {
    switch (event.type) {
      case "focusin": {
        focused = true;
        break;
      }
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
    class:has-results={showResults}
    on:focusin={handleFocusChange}
  >
    <input
      type="text"
      tabindex="0"
      placeholder="Search..."
      bind:value={searchText}
      use:setInput
      on:keydown={handleKeyDown}
      on:click={handleClick}
    />

    {#if showResults}
      <div class="search-results">
        {#each results as result}
          <div
            class="search-result"
            on:click={() => handleResultClick(result)}
            on:keypress={() => handleResultClick(result)}
          >
            <p>{result}</p>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>
