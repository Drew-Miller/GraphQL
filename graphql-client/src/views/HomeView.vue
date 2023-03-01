<template>
  <div class="container">
    <h1 class="header">GraphQL Vue Client</h1>
    <div class="section">
      <h2 class="section-title">Colleges</h2>
      <table class="table colleges">
        <thead>
          <tr>
            <th>College</th>
            <th>Location</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(college, index) in colleges" :key="index" @click="toggleCollege(index)"
            :class="{ selected: college.id === state.selectedStudent?.college.id || college === state.selectedCollege }">
            <td>{{ college.name }}</td>
            <td>{{ college.location }}</td>
            <td>{{ college.rating }}</td>
          </tr>
        </tbody>
      </table>
      <h2 class="section-title">Students</h2>
      <table class="table students">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in students" :key="index" @click="toggleStudents(index)"
            :class="{ selected: student.college.id === state.selectedCollege?.id || student === state.selectedStudent }">
            <td>{{ student.firstName }}</td>
            <td>{{ student.lastName }}</td>
            <td>{{ student.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, reactive, ref } from 'vue';
import type { College, Student } from "graphql-lib";
import { provideApolloClient, useQuery } from '@vue/apollo-composable';
import { COLLEGE_QUERY, STUDENT_QUERY } from '@/apollo-queries';
import { apolloClient } from '@/apollo-providers';

provideApolloClient(apolloClient)

const collegeQuery = useQuery<{ colleges: College[] }>(COLLEGE_QUERY);

const studentQuery = useQuery<{ students: Student[] }>(STUDENT_QUERY);


export default {
  setup() {
    const colleges = computed<College[]>(() => {
      const results = collegeQuery.result;
      return results?.value?.colleges ?? [];
    });
    const students = computed<Student[]>(() => {
      const results = studentQuery.result;
      return results?.value?.students ?? [];
    });
    return {
      colleges,
      students
    };
  },
  data() {
    const state = reactive({
      selectedCollege: null as College | null,
      selectedStudent: null as Student | null,
    });

    return {
      state
    };
  },
  methods: {
    toggleStudents(index: number) {
      this.state.selectedStudent = this.students[index];
      this.state.selectedCollege = null;
    },
    toggleCollege(index: number) {
      this.state.selectedStudent = null;
      this.state.selectedCollege = this.colleges[index];
    },
  },
};
</script>
