const { gql } = require("@apollo/client");

export const GET_ME = gql`
  query GetMe {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        authors
        description
        bookId
        title
        image
        link
      }
    }
  }
`;
