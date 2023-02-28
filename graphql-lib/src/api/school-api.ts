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

  async getStudents(): Promise<Student[]> {
    return this.get<Student[]>("/getstudents");
  }

  async getColleges(): Promise<College[]> {
    return this.get<College[]>("/getcolleges");
  }

  override willSendRequest(_path: string, request: AugmentedRequest) {
    request.headers['authorization'] = this.token;
  }
}