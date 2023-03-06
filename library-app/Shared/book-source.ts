import { authors, books } from './data';
import { BookEntity } from './data/types';
import { Book } from './dto';

type CreateEntity = {
  title: string,
  authorId: string
}; 

export class BookSource {
  public search(value: string): Book[] {
    const results = books.list().filter(book => {
      const hit: boolean = this.searchHit(value, book)
      
      if (!hit) {
        return;
      }
      return book;
    });

    return results.map(book => {
      return {
        ...book,
        author: authors.get(book.authorId)
      } as Book;
    });
  }

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

  private searchHit(value: string, entity: BookEntity): boolean {
    const hit = entity
      .title.toLocaleLowerCase()
      .indexOf(value.toLocaleLowerCase()) > -1;

    return hit;
  }
}