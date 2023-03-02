<template>
  <div class="section">
      <h2 class="section-title">Authors</h2>
      <table class="table colleges">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(author, index) in authors" :key="index" @click="toggleAuthor(index)"
            :class="{ selected: author.id === selectedBook?.author.id || author === selectedAuthor }">
            <td>{{ author.name }}</td>
          </tr>
        </tbody>
      </table>
      <h2 class="section-title">Books</h2>
      <table class="table students">
        <thead>
          <tr>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(book, index) in books" :key="index" @click="toggleBook(index)"
            :class="{ selected: book.author.id === selectedAuthor?.id || book === selectedBook }">
            <td>{{ book.title }}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import type { Author, Book } from "@/dtos";
import { useApolloStore } from '@/stores/apollo';

export default {
  setup() {
    const apolloStore = useApolloStore();
    const authorQuery = apolloStore.getAuthors();
    const bookQuery = apolloStore.getBooks();

    const authors = computed<Author[]>(() => {
      const results = authorQuery.result;
      return results?.value?.authors ?? [];
    });
    const books = computed<Book[]>(() => {
      const results = bookQuery.result;
      return results?.value?.books ?? [];
    });
    return {
      authors,
      books
    };
  },
  data() {
    return {
      selectedAuthor: ref<Author | null>(null),
      selectedBook: ref<Book | null>(null)
    };
  },
  methods: {
    toggleAuthor(index: number) {
      this.selectedAuthor = this.authors[index];
      this.selectedBook = null;
    },
    toggleBook(index: number) {
      this.selectedAuthor = null;
      this.selectedBook = this.books[index];
    },
  },
};
</script>
