<script lang="ts">
  import type { SearchResult } from "$apollo/dtos";

  export let results: SearchResult[] = [];
</script>

<div class="search-results">
  {#each results as result, i}
    <div class="search-result">
      <span class="url"></span>
      <a>
        <h3>{result.value}</h3>
      </a>
      <p>{result.body}</p>
      <p>{result.body}</p>
    </div>
  {/each}
</div>

<style>
  .search-results {
    max-width: 1300px;
    margin: auto;
  }

  .search-result {
    padding: 20px;
  }

  h3 {
    color: #1a0dab;
    font-size: 1.6rem;
    font-weight: 1.8rem;
    line-height: 1.8rem;
    margin-bottom: .2rem;
    padding-top: .4rem;
  }

  p {
    line-height: 1.7rem;
  }
</style>