<template>
  <div class="home">
    <h1>GraphQL Vue Client</h1>
    <div class="section">
      <h2>School</h2>
      <table>
        <thead>
          <tr>
            <th>College</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(college, index) in colleges"
            :key="index"
            @click="toggleStudents(index)"
          >
            <td>{{ college.name }}</td>
          </tr>
          <tr v-if="selectedCollege !== null">
            <td colspan="1">
              <table>
                <thead>
                  <tr>
                    <th>Student</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(student, index) in selectedCollege.students"
                    :key="index"
                  >
                    <td>{{ student.name }}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>Student</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(student, index) in students"
            :key="index"
            @click="toggleCollege(index)"
          >
            <td>{{ student.name }}</td>
          </tr>
          <tr v-if="selectedStudent !== null">
            <td colspan="1">{{ selectedStudent.college }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
// import type { College, Student } from "graphql-lib";

type College = { name: string; students: { name: string; college: string }[] };
type Student = { name: string; college: string };

export default {
  data() {
    return {
      colleges: [] as College[],
      students: [] as Student[],
      selectedCollege: null as College | null,
      selectedStudent: null as Student | null,
    };
  },
  onMounted() {
    this.colleges = [
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

    this.students = [
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
