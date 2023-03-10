
<script lang=ts>
  import { onDestroy, onMount } from "svelte";
  import { query } from "svelte-apollo";  
  import type { College, Student } from "$apollo/dtos";
  import { ALL_COLLEGES, ALL_STUDENTS } from "$apollo/queries";
  import type { Unsubscriber } from "svelte/store";

  let colleges: College[] = [];
  let students: Student[] = [];
  
  const collegeQuery = query<{ colleges: College[] }>(ALL_COLLEGES);
  const studentQuery = query<{ students: Student[] }>(ALL_STUDENTS);
  $: collegeQuery.refetch();
  $: studentQuery.refetch();

  let destroy: Unsubscriber[] = [];
  onMount(async () => {
    destroy = [
      collegeQuery.subscribe(res => {
        colleges = res.data?.colleges ?? [];
      }),

      studentQuery.subscribe(res => {
        students = res.data?.students ?? [];
      })
    ]
  });

  onDestroy(() => {
    destroy.forEach(unsub => unsub());
  });

  let selectedCollege: College | null =  null;
  let selectedStudent: Student | null = null;
  
  function toggleCollege(index: number) {
    selectedCollege = colleges[index];
    selectedStudent = null;
  }

  function toggleStudent(index: number) {
    selectedCollege = null;
    selectedStudent = students[index];
  }
</script>  
  
<div class="section">
  <h2 class="section-title">Authors</h2>
  <table class="table colleges">
    <thead>
      <tr>
        <th>College</th>
        <th>Location</th>
        <th>Rating</th>
      </tr>
    </thead>
    <tbody>
      {#each colleges as college, index}
        <tr on:click="{() => toggleCollege(index)}" class:selected="{college.id === selectedStudent?.college.id || college === selectedCollege}">
          <td>{college.name}</td>
          <td>{college.location}</td>
          <td>{college.rating}</td>
        </tr>
      {/each}
    </tbody>
  </table>
  <h2 class="section-title">Books</h2>
  <table class="table students">
    <thead>
      <tr>
        <th>First</th>
        <th>Last</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      {#each students as student, index}
        <tr on:click="{ () => toggleStudent(index) }" class:selected="{student.college.id === selectedCollege?.id || student === selectedStudent}">
          <td>{student.firstName}</td>
          <td>{student.lastName}</td>
          <td>{student.email}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
