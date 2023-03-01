import { gql } from '@apollo/client/core';

export {
  COLLEGE_QUERY,
  STUDENT_QUERY,

  AUTHOR_QUERY,
  BOOK_QUERY
};

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

const AUTHOR_QUERY = gql`
  query GetAuthors {
    authors {
      id,
      name,
      books {
        title
      }
    }
  }
`;

const BOOK_QUERY = gql`
  query GetBooks {
    books {
      title,
      author {
        id,
        name
      }
    }
  }
`;
