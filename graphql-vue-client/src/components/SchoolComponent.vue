<template>
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
            :class="{ selected: college.id === selectedStudent?.college.id || college === selectedCollege }">
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
            :class="{ selected: student.college.id === selectedCollege?.id || student === selectedStudent }">
            <td>{{ student.firstName }}</td>
            <td>{{ student.lastName }}</td>
            <td>{{ student.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import type { College, Student } from "graphql-lib";
import { useApolloStore } from '@/stores/apollo';

export default {
  setup() {
    const apolloStore = useApolloStore();
    const collegeQuery = apolloStore.getColleges();
    const studentQuery = apolloStore.getStudents();

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
    return {
      selectedCollege: ref<College | null>(null),
      selectedStudent: ref<Student | null>(null)
    };
  },
  methods: {
    toggleStudents(index: number) {
      this.selectedStudent = this.students[index];
      this.selectedCollege = null;
    },
    toggleCollege(index: number) {
      this.selectedStudent = null;
      this.selectedCollege = this.colleges[index];
    },
  },
};
</script>
