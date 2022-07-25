import { gql } from 'apollo-angular';

export const GET_CATEGORIES = gql`
  query {
    categories {
      id
      title
      todos {
        id
        text
        isCompleted
      }
    }
  }
`;
