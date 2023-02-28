import axios, { AxiosRequestConfig } from "axios";
import { AppErrors } from "../errors";
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
    const config = this.getAxiosConfig({ token: this.token });
    return axios.get(this.url + "/getbooks", config);
  }

  getAuthors(): Promise<Author[]> {
    const config = this.getAxiosConfig({ token: this.token });
    return axios.get(this.url + "/getauthors", config);
  }

  addBook(dto: AddBook): Promise<Book> {
    const config = this.getAxiosConfig({ token: this.token });
    return axios.post(this.url + "/addbook", {
      ...config,
      data: dto
    });
  }

  private getAxiosConfig(options: { token: MyToken }): AxiosRequestConfig {
    const config = {
      headers:{
        token: options.token
      }
    };
    return config;
  }
}