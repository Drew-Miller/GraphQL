import { KeyValueCache } from "@apollo/utils.keyvaluecache";
import { AugmentedRequest, RESTDataSource } from "@apollo/datasource-rest";
import { AppErrors } from "../errors";
import { College, Student } from "../dto";

export class SchoolAPI extends RESTDataSource {
  private token: string;

  constructor(options: { token: string, baseURL: string, cache: KeyValueCache }) {
    super(options);

    if (!options.baseURL) {
      throw AppErrors.GetGraphQLError(AppErrors.COLLEGE_URL_UNDEFINED);
    }

    this.baseURL = options.baseURL;
    this.token = options.token;
  }

  async getStudent(id: string): Promise<Student> {
    const data = await this.get(`/api/getstudent?id=${encodeURIComponent(id)}`);
    const result: Student = JSON.parse(data);
    return result;
  }

  async getStudents(): Promise<Student[]> {
    const data = await this.get("/api/getstudents");
    const result: Student[] = JSON.parse(data);
    return result;
  }

  async getColleges(): Promise<College[]> {
    const data = await this.get("/api/getcolleges");
    const result: College[] = JSON.parse(data);
    return result;
  }

  override willSendRequest(_path: string, request: AugmentedRequest) {
    request.headers['token'] = this.token;
  }
}