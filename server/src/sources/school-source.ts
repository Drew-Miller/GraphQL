import axios, { AxiosRequestConfig } from "axios";
import { AppErrors } from "../errors";
import { MyToken, College, Student } from "../dto";

export class SchoolSource {
  private url: string;
  private token: MyToken;

  constructor(options: { url: string, token: MyToken }) {
    if (!options.url) {
      throw AppErrors.GetGraphQLError(AppErrors.COLLEGE_URL_UNDEFINED);
    }
    
    this.url = options.url;
    this.token = options.token;
  }

  async getStudents(): Promise<Student[]> {
    const config = this.getAxiosConfig({ token: this.token });
    return await axios.get<Student[]>(this.url + "/getstudents", config).then(response => response.data);
  }

  async getColleges(): Promise<College[]> {
    const config = this.getAxiosConfig({ token: this.token });
    return await axios.get<College[]>(this.url + "/getcolleges", config).then(response => response.data);
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