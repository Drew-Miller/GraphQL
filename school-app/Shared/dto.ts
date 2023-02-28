export type College = {
  id: string,
  name: string,
  location: string,
  rating: number,
  students?: Student[]
};

export type Student = {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  college?: College
};
