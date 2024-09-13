import { gql } from "@apollo/client";

export const GET_BOOKS = gql `
  query GetBooks {
    books {
      id
      name
      author {
        id
        name
      }
    }
  }
`;

export const GET_AUTHORS = gql `
  query GetAuthors {
    authors {
      id
      name
      age
      books {
        id
        name
      }
    }
  }
`;

export const ADD_BOOK = gql `
  mutation AddBook($name: String!, $authorId: ID!) {
    addBook(name: $name, authorId: $authorId) {
      id
      name
      author {
        id
        name
      }
    }
  }
`;

export const ADD_AUTHOR = gql `
  mutation AddAuthor($name: String!, $age: Number!) {
    addAuthor(name: $name, age: $age) {
      id
      name
      age
      books {
        id
        title
      }
    }
  }
`;