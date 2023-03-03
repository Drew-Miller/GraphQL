import { KeyValueCache } from "@apollo/utils.keyvaluecache";
import { AugmentedRequest, RESTDataSource } from '@apollo/datasource-rest';
import { AppErrors } from "../errors";
import { Author, Book, AddBook } from "../dto";

export class LibraryAPI extends RESTDataSource {
  private token: string;

  constructor(options: { token: string, baseURL: string, cache: KeyValueCache }) {
    super(options);

    if (!options.baseURL) {
      throw AppErrors.GetGraphQLError(AppErrors.LIBRARY_URL_UNDEFINED);
    }

    this.baseURL = options.baseURL;
    this.token = options.token;
  }

  async searchByAuthor(name: string): Promise<Author[]> {
    const body = {
      name: name
    };

    const data = await this.post("/api/searchbyauthor", { body });
    const result: Author[] = JSON.parse(data);
    return result;
  }

  async getBooks(): Promise<Book[]> {
    const data = await this.get("/api/getbooks");
    const result: Book[] = JSON.parse(data);
    return result;
  }

  async getAuthors(): Promise<Author[]> {
    const data = await this.get("/api/getauthors");
    const result: Author[] = JSON.parse(data);
    return result;
  }

  async addBook(dto: AddBook): Promise<Book> {
    const data = await this.post("/api/addbook", {
      body: dto
    });
    const result: Book = JSON.parse(data);
    return result;
  }

  override willSendRequest(_path: string, request: AugmentedRequest) {
    request.headers['token'] = this.token;
  }
}