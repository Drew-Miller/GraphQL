import axios from "axios";
import { AppErrors } from "errors";
import { MyToken, College, Student } from "../dto";

export class CollegeSource {
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
    return axios.get(this.url + "/getstudents");
  }

  getColleges(): Promise<Student[]> {
    return axios.get(this.url + "/getcolleges");
  }
}