import { SchoolAPI, LibraryAPI } from "./api";

type MyContext = {
  // Context typing
  dataSources: {
    libraryAPI: LibraryAPI,
    schoolAPI: SchoolAPI
  };
}

export { MyContext };