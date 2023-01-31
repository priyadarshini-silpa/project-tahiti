import { gql } from '@apollo/client';

export default gql`
  query listSquiggles {
    listSquiggles {
      id
      content
    }
  }
`;
