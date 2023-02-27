import { GraphQLError } from "graphql";
import { StatusCodes } from "http-status-codes";

export type Error = {
  message: string,
  code: string
  httpStatus: number
};

export class AppErrors {
  public static COLLEGE_STORE_UNDEFINED: Error = {
    message: "College store is not defined.",
    code: "",
    httpStatus: StatusCodes.FAILED_DEPENDENCY
  };

  public static LIBRARY_STORE_UNDEFINED: Error = {
    message: "Library store is not defined.",
    code: "",
    httpStatus: StatusCodes.FAILED_DEPENDENCY
  };

  public static GetGraphQLError(error: Error): GraphQLError {
    return new GraphQLError(error.message, {
      extensions: {
        code: error.code,
        http: { status: error.httpStatus }
      }
    });
  }
}