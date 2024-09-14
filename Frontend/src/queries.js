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
  mutation AddBook($name: String!, $authorId: ID!, $genre: String!) {
    AddBook(name: $name, authorId: $authorId, genre: $genre) {
      id
      name
      genre
      author {
        id
        name
      }
    }
  }
`;

export const ADD_AUTHOR = gql `
  mutation AddAuthor($name: String!, $age: Int!) {
    AddAuthor(name: $name, age: $age) {
      id
      name
      age
    }
  }
`;