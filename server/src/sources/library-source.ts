import axios from "axios";
import { AppErrors } from "errors";
import { MyToken, Author, Book, AddBook } from "../dto";

export class LibrarySource {
  private url: string;
  private token: MyToken;

  constructor(options: { url: string, token: MyToken }) {
    if (!options.url) {
      throw AppErrors.GetGraphQLError(AppErrors.LIBRARY_URL_UNDEFINED);
    }
    
    this.url = options.url;
    this.token = options.token;
  }

  getBooks(): Promise<Book[]> {
    return axios.get(this.url + "/getbooks");
  }

  getAuthors(): Promise<Author[]> {
    return axios.get(this.url + "/getauthors");
  }

  addBook(dto: AddBook): Promise<Book> {
    return axios.post(this.url + "/addbook");
  }
}