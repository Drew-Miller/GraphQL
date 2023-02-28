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

  async getBooks(): Promise<Book[]> {
    const config = this.getAxiosConfig({ token: this.token });
    return await axios.get<Book[]>(this.url + "/getbooks", config).then(response => response.data);
  }

  async getAuthors(): Promise<Author[]> {
    const config = this.getAxiosConfig({ token: this.token });
    return await axios.get<Author[]>(this.url + "/getauthors", config).then(response => response.data);
  }

  async addBook(dto: AddBook): Promise<Book> {
    const config = this.getAxiosConfig({ token: this.token });
    return await axios.post<Book>(this.url + "/addbook", {
      ...config,
      data: dto
    }).then(response => response.data);
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