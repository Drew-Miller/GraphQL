import { AuthorSource } from './author-source';
import { authors, books } from './data';
import { Author, Book } from './data/types';
import { CreateBook } from './dto';

type CreateEntity = {
  title: string,
  authorId: string
}; 

export class BookSource {
  public getByTitle(title: string): Book {
    return books.list().find(x => x.title == title);
  }

  public get(): Book[] {
    return books.list().map(book => {
      const res = {
        ...book,
        author: authors.get(book.authorId)
      };
      return res;
    });
  }

  public addBook(create: CreateBook, authorSource: AuthorSource) {
    let author: Author = authorSource.getByName(create.author);
    if (!author) {
      author = authorSource.create({ name: create.author });
    }
    
    let book = this.getByTitle(create.title);
    if (!book) {
      book = this.create({ title: create.title, authorId: author.id });
    } else {
      books.update({
        ...book,
        authorId: author.id
      });
      book.authorId = author.id;
    }
    
    const res = {
      ...book,
      author: author
    } as Book;

    return res;
  }

  public create(create: CreateEntity): Book {
    const bookIds = books.list().sort().map(x => x.id);
    const bookId = Number(bookIds.pop()) + 1;

    const book: Book = {
      id: bookId.toString(),
      title: create.title,
      authorId: create.authorId
    };

    books.create(book);

    return book;
  }
}