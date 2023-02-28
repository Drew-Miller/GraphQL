export type CreateBook = {
  title: string,
  author: string
};

export type Book = {
  id: string,
  title: string,
  author?: Author
};

export type Author = {
  id: string,
  name: string,
  books?: Book[]
};