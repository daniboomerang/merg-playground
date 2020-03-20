import gql from 'graphql-tag';

const NotesQuery = gql`
  query NotesQuery {
    notes {
      _id
      content
    }
  }
`;

export default NotesQuery;
