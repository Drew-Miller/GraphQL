import { AuthorSource } from "./author-source";
import { BookSource } from "./book-source";
import { AuthorEntity, BookEntity } from "./data/types";
import { Author, Book, CreateBook } from "./dto";

export class AppSource {
  private bookSource = new BookSource()
  private authorSource = new AuthorSource();

  public searchByAuthor(name: string): Author[] {
    return this.authorSource.searchByAuthor(name);
  }

  public getBooks(): Book[] {
    return this.bookSource.get();
  }

  public getAuthors(): Author[] {
    return this.authorSource.get();
  }

  public addBook(create: CreateBook): Book {
    let author: AuthorEntity = this.authorSource.getByName(create.author);
    if (!author) {
      author = this.authorSource.create({ name: create.author });
    }
    
    let book: BookEntity = this.bookSource.getByTitle(create.title);
    if (!book) {
      book = this.bookSource.create({ title: create.title, authorId: author.id });
    } else {
      this.bookSource.update({
        ...book,
        authorId: author.id
      })
      book.authorId = author.id;
    }
    
    const res: Book = {
      ...book,
      author: author
    } as BookEntity;

    return res;
  }
}