import { gql } from '@apollo/client/core';

export {
  ALL_COLLEGES,
  ALL_STUDENTS,

  ALL_AUTHORS,
  ALL_BOOKS,

  AUTHOR_SEARCH
};

const ALL_COLLEGES = gql`
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

const ALL_STUDENTS = gql`
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

const ALL_AUTHORS = gql`
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

const ALL_BOOKS = gql`
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

const AUTHOR_SEARCH = gql`
  query Search($value: String!) {
    search(value: $value) {
      value,
      description,
      type
    }
  }
`;