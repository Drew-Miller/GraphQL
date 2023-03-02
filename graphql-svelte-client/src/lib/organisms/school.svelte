
<script lang=ts>
  import type { College, Student } from "$apollo/dtos";
  
  // const apolloStore = useApolloStore();
  // const authorQuery = apolloStore.getAuthors();
  // const bookQuery = apolloStore.getBooks();
  
  // const authors = computed<Author[]>(() => {
  //   const results = authorQuery.result;
  //   return results?.value?.authors ?? [];
  // });
  // const books = computed<Book[]>(() => {
  //   const results = bookQuery.result;
  //   return results?.value?.books ?? [];
  // });

  let colleges: College[] = [{
    id: "1",
    name: "Hello",
    location: "You Mom's",
    rating: 5.0,
    students: []
  }, {
    id: "2",
    name: "World",
    location: "House",
    rating: 5.0,
    students: []
  }];
  let students: Student[] = [];
  
  let selectedCollege: College | null =  null;
  let selectedStudent: Student | null = null;
  
  function toggleAuthor(index: number) {
    selectedCollege = colleges[index];
    selectedStudent = null;
  }

  function toggleBook(index: number) {
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
        <tr on:click="{() => toggleAuthor(index)}" class:selected="{college.id === selectedStudent?.college.id || college === selectedCollege}">
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
        <tr on:click="{ () => toggleBook(index) }" class:selected="{student.college.id === selectedCollege?.id || student === selectedStudent}">
          <td>{student.firstName}</td>
          <td>{student.lastName}</td>
          <td>{student.email}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
