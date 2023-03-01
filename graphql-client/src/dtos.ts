export type College = {
  id: string,
  name: string,
  location: string,
  rating: number,
  students: Student[]
};

export type Student = {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  college: College
};

export type Book = {
  id: string,
  title: string,
  author: Author
};

export type AddBook = {
  title: string,
  author: string
};

export type Author = {
  id: string,
  name: string,
  books: Book[]
};