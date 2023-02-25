import { CollegeStore, LibraryStore } from "db";

type MyContext = {
  // Context typing
  dataSources: {
    libraryStore: LibraryStore,
    collegeStore: CollegeStore
  };
}

export { MyContext };