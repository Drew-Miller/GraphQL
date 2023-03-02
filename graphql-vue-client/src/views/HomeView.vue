<script lang="ts">
import TheSchool from "@/components/SchoolComponent.vue";
import TheLibrary from "@/components/LibraryComponent.vue";

export default {
  components: { TheSchool, TheLibrary }
}
</script>

<template>
  <div class="container">
    <h1 class="header">GraphQL Vue Client</h1>
    <TheSchool ></TheSchool>
    <TheLibrary></TheLibrary>
  </div>
</template>

