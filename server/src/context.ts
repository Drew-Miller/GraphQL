import { SchoolSource, LibrarySource } from "./sources";

type MyContext = {
  // Context typing
  dataSources: {
    librarySource: LibrarySource,
    schoolSource: SchoolSource
  };
}

export { MyContext };