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

  getStudents(): Promise<Student[]> {
    const config = this.getAxiosConfig({ token: this.token });
    return axios.get(this.url + "/getstudents", config);
  }

  getColleges(): Promise<College[]> {
    const config = this.getAxiosConfig({ token: this.token });
    return axios.get(this.url + "/getcolleges", config);
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