import { authors, books } from './data';
import { Author } from './data/types';

export class AuthorSource {
  public getByName(name: string): Author {
    return authors.list().find(x => x.name == name);
  }
  
  public get(): Author[] {
    return authors.list().map(author => {
      const res = {
        ...author,
        books: books
          .list()
          .filter(book => book.authorId == author.id)
      };
      return res;
    });
  }

  public create(create: { name: string }): Author {
    const authorIds = authors.list().sort().map(x => x.id);

    const authorId = Number(authorIds.pop()) + 1;

    const author: Author = {
      id: authorId.toString(),
      name: create.name
    }

    authors.create(author);

    return author;
  }
}