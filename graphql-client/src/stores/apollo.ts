import { apolloClient } from "@/apollo/client";
import { AUTHOR_QUERY, BOOK_QUERY, COLLEGE_QUERY, STUDENT_QUERY } from "@/apollo/queries";
import { provideApolloClient, useQuery } from "@vue/apollo-composable";
import type { Author, Book, College, Student } from "graphql-lib";
import { defineStore } from "pinia";

export const useApolloStore = defineStore('apollo', () => {
  provideApolloClient(apolloClient)
  
  function getColleges() {
    return useQuery<{ colleges: College[] }>(COLLEGE_QUERY);
  }
  function getStudents() {
    return useQuery<{ students: Student[] }>(STUDENT_QUERY);
  }

  function getAuthors() {
    return useQuery<{ authors: Author[] }>(AUTHOR_QUERY);
  }
  function getBooks() {
    return useQuery<{ books: Book[] }>(BOOK_QUERY);
  }

  return {
    getStudents, getColleges,
    getAuthors, getBooks
  };
});