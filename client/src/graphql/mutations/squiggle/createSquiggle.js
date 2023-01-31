import { gql } from '@apollo/client';

const createSquiggle = gql`
  mutation SquiggleMutation(
    $content: String!
  ) {
    createSquiggle(
      squiggleType: $squiggleType
      content: $content
    ) {
      id
      content
    }
  }
`;

export default createSquiggle;
