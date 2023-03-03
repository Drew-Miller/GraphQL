<script>
  import Library from "$lib/organisms/library.svelte";
  import School from "$lib/organisms/school.svelte";
  import { apolloClient } from "$apollo/client";
  import { setClient } from "svelte-apollo";

  setClient(apolloClient);
</script>

<div class="container">
  <h1 class="header">GraphQL Svelte Client</h1>
  <Library></Library>
  <!-- <School></School> -->
</div>