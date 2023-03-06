<script lang=ts>
  import { setClient } from "svelte-apollo";
  import Library from "$lib/organisms/library.svelte";
  import School from "$lib/organisms/school.svelte";
  import { apolloClient } from "$apollo/client";
  import { mouseEventStore } from "$/stores/mouse-event-store";

  setClient(apolloClient);

  function handleClick(event: MouseEvent) {
    console.log("Set Click");
    mouseEventStore.set(event);
  }
</script>

<style>
  .page {
    min-height: 100vh;
    height: 100vh;
  }
</style>

<div class="page" on:click={handleClick} on:keypress={() => {}}>
  <Library></Library>
</div>

<!-- <School></School> -->
