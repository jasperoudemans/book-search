const { gql } = require("@apollo/client");

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation SaveBook($bookToSave: SaveBookInput!) {
    saveBook(bookToSave: $bookToSave) {
      username
      savedBooks {
        title
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation RemoveBook($removeBookId: ID!) {
    removeBook(bookId: $removeBookId) {
      username
    }
  }
`;
