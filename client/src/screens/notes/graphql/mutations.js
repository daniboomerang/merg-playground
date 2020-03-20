import gql from 'graphql-tag';

const CreateNoteMutation = gql`
  mutation CreateNoteMutation ($content: String) {
    createNote(content: $content) {
      _id
      content
    }
  }
`;

const UpdateNoteMutation = gql`
  mutation UpdateNoteMutation ($_id: ID, $content: String) {
    updateNote(_id: $_id, content: $content) {
      _id
      content
    }
  }
`;


const DeleteNoteMutation = gql`
  mutation DeleteNoteMutation($_id: ID) {
    deleteNote(_id: $_id)
  }
`;


export { CreateNoteMutation, UpdateNoteMutation, DeleteNoteMutation };
