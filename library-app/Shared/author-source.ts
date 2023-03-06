import { authors, books } from './data';
import { AuthorEntity } from './data/types';
import { Author } from './dto';

export class AuthorSource {
  public search(value: string): Author[] {
    const results: AuthorEntity[] = authors.list().filter(author => {
      const hit: boolean = this.searchHit(value, author);
      
      if (!hit) {
        return;
      }
      return author;
    });

    return results.map(author => {
      return {
        ...author,
        books: []
      } as Author;
    });
  }

  public getByName(name: string): AuthorEntity {
    return authors.list().find(x => x.name == name);
  }
  
  public get(): Author[] {
    return authors.list().map(author => {
      const res: Author = {
        ...author,
        books: books
          .list()
          .filter(book => book.authorId == author.id)
      };
      return res;
    });
  }

  public create(create: { name: string }): AuthorEntity {
    const authorIds = authors.list().sort().map(x => x.id);

    const authorId = Number(authorIds.pop()) + 1;

    const author: AuthorEntity = {
      id: authorId.toString(),
      name: create.name,
    }

    authors.create(author);

    return author;
  }

  private searchHit(value: string, entity: AuthorEntity): boolean {
    const hit = entity
      .name.toLocaleLowerCase()
      .indexOf(value.toLocaleLowerCase()) > -1;

    return hit;
  }
}