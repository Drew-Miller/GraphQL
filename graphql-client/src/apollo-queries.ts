import { gql } from '@apollo/client/core';

const COLLEGE_QUERY = gql`
  query GetCollege {
    colleges {
      id,
      name,
      location,
      rating,
      students {
        firstName,
        lastName,
        email
      }
    }
  }
`;

const STUDENT_QUERY = gql`
  query GetStudents {
    students {
      firstName,
      lastName,
      email,
      college {
        id,
        name,
        location,
        rating
      }
    }
  }
`;

export {
  COLLEGE_QUERY,
  STUDENT_QUERY
};