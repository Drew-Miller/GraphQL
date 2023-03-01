<template>
  <div class="container">
    <h1 class="header">GraphQL Vue Client</h1>
    <div class="section">
      <h2 class="section-title">School</h2>
      <table class="table colleges">
        <thead>
          <tr>
            <th>College</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(college, index) in state.colleges" :key="index" @click="toggleCollege(index)"
            :class="{ selected: college.name === state.selectedStudent?.college || college === state.selectedCollege }">
            <td>{{ college.name }}</td>
          </tr>
        </tbody>
      </table>
      <table class="table students">
        <thead>
          <tr>
            <th>Student</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in state.students" :key="index" @click="toggleStudents(index)"
            :class="{ selected: student.college === state.selectedCollege?.name || student === state.selectedStudent }">
            <td>{{ student.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue';
// import type { College, Student } from "graphql-lib";


type College = { name: string; students: { name: string; college: string }[] };
type Student = { name: string; college: string };

export default {
  data() {
    const state = reactive({
      colleges: [] as College[],
      students: [] as Student[],
      selectedCollege: null as College | null,
      selectedStudent: null as Student | null,
    });

    return {
      state
    };
  },
  mounted() {
    this.state.colleges = [
      {
        name: "College A",
        students: [
          { name: "John", college: "College A" },
          { name: "Sarah", college: "College A" },
          { name: "Mark", college: "College A" },
        ],
      },
      {
        name: "College B",
        students: [
          { name: "Rachel", college: "College B" },
          { name: "Mike", college: "College B" },
          { name: "Emily", college: "College B" },
        ],
      },
    ];

    this.state.students = [
      { name: "John", college: "College A" },
      { name: "Sarah", college: "College A" },
      { name: "Mark", college: "College A" },
      { name: "Rachel", college: "College B" },
      { name: "Mike", college: "College B" },
      { name: "Emily", college: "College B" },
    ];
  },
  methods: {
    toggleStudents(index: number) {
      this.state.selectedStudent = this.state.students[index];
      this.state.selectedCollege = null;
    },
    toggleCollege(index: number) {
      this.state.selectedStudent = null;
      this.state.selectedCollege = this.state.colleges[index];
    },
  },
};
</script>
