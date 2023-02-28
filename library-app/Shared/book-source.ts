import { authors, books } from './data';
import { BookEntity } from './data/types';
import { Book } from './dto';

type CreateEntity = {
  title: string,
  authorId: string
}; 

export class BookSource {
  public getByTitle(title: string): BookEntity {
    return books.list().find(x => x.title == title);
  }

  public get(): Book[] {
    return books.list().map(book => {
      const res: Book = {
        ...book,
        author: authors.get(book.authorId)
      };
      return res;
    });
  }

  public create(create: CreateEntity): BookEntity {
    const bookIds = books.list().sort().map(x => x.id);
    const bookId = Number(bookIds.pop()) + 1;

    const book: BookEntity = {
      id: bookId.toString(),
      title: create.title,
      authorId: create.authorId
    };

    books.create(book);

    return book;
  }

  public update(book: BookEntity) {
    books.update(book);
  }
}