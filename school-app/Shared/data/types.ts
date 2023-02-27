export type College = {
  id: string,
  name: string,
  location: string,
  rating: number
};

export type Student = {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  collegeId: string
};
