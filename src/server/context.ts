import { CollegeStore, LibraryStore } from "data";

type MyContext = {
  // Context typing
  dataSources: {
    libraryStore: LibraryStore,
    collegeStore: CollegeStore
  };
}

export { MyContext };