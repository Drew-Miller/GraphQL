import { CollegeSource, LibrarySource } from "./sources";

type MyContext = {
  // Context typing
  dataSources: {
    librarySource: LibrarySource,
    collegeSource: CollegeSource
  };
}

export { MyContext };