<script lang="ts">
  import { setClient } from "svelte-apollo";
  import Library from "$lib/organisms/library.svelte";
  import { apolloClient } from "$apollo/client";
  import { mouseEventStore } from "$/stores/mouse-event-store";

  setClient(apolloClient);

  function handleClick(event: MouseEvent) {
    mouseEventStore.set(event);
  }
</script>

<style>
  :root {
    --footer-height: 40px;
  }
  
  .page {
    position: relative;
    min-height: 100vh;
    height: 100vh;
    padding-bottom: var(--footer-height);
  }

  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    padding: 0 40px 5px;
    justify-content: space-between;
    align-items: end;
    height: var(--footer-height);
    color: var(--color-heading);
    background-color: var(--color-background-weighted);
  }

  .footer-date {
    font-weight: 600;
  }

  .footer-brand {
    font-family: 'VT323', sans-serif;
    color: var(--persimmon);
    font-size: 1.25rem;
  }
</style>

<div class="page" on:click={handleClick} on:keypress={() => {}}>
  <Library></Library>
  <footer class="footer">
    <span>Hello, world!</span>
    <span class="footer-date">{new Date().toDateString()}</span>
    <span class="footer-brand">capncrush</span>
  </footer>
</div>

<!-- <School></School> -->
