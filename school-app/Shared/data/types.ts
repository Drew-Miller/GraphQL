export type CollegeEntity = {
  id: string,
  name: string,
  location: string,
  rating: number
};

export type StudentEntity = {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  collegeId: string
};
