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

  async getBooks(): Promise<Book[]> {
    return this.get<Book[]>("/getbooks");
  }

  async getAuthors(): Promise<Author[]> {
    return this.get<Author[]>("/getauthors");
  }

  async addBook(dto: AddBook): Promise<Book> {
    return this.post<Book>("/addbook", {
      body: dto
    });
  }

  override willSendRequest(_path: string, request: AugmentedRequest) {
    request.headers['authorization'] = this.token;
  }
}