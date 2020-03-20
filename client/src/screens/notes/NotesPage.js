import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-apollo';
import { CreateNoteMutation, DeleteNoteMutation, UpdateNoteMutation }  from './graphql/mutations';
import NotesQuery from './graphql/queries';

const NotesPage = () => {
  // Graphql query
  const { loading, data, error } = useQuery(NotesQuery);

  // State hooks
  const [newNote, setNewNote] = useState('');
  const [noteContentBeingUpdated, setNoteContentBeingUpdated] = useState('');
  const [noteIdBeingUpdated, setNoteIdBeingUpdated] = useState('');

  // Graphql mutations
  const [createNoteMutation] = useMutation(CreateNoteMutation);
  const [deleteNoteMutation] = useMutation(DeleteNoteMutation);
  const [updateNoteMutation] = useMutation(UpdateNoteMutation);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { notes } = data;

  // Handlers
  const handleCreateNote = () => {
    if (newNote) {
      createNoteMutation({ variables: { content: newNote }, refetchQueries: ['NotesQuery'] }).then(() => {
        // eslint-disable-next-line no-console
        console.log('Response received from server.');
      }).catch(createNoteMutationError => {
        // eslint-disable-next-line no-console
        console.log(createNoteMutationError);
      });
      setNewNote('');
    }
  };
  const handleUpdateNote = (_id, content, isBeingUpdated) => () => {
    if (isBeingUpdated) {
      updateNoteMutation({ variables: { _id, content: noteContentBeingUpdated } }).then(() => {
        // eslint-disable-next-line no-console
        console.log('Response received from server.');
      }).catch(updateNoteMutationError => {
        // eslint-disable-next-line no-console
        console.log(updateNoteMutationError);
      });
      setNoteIdBeingUpdated('');
      setNoteContentBeingUpdated('');
    } else {
      setNoteIdBeingUpdated(_id);
      setNoteContentBeingUpdated(content);
    }
  };
  const handleNoteBeingUpdated = (e) => setNoteContentBeingUpdated(e.target.value);
  const handleDeleteNote = (_id) => () => {
    deleteNoteMutation({ variables: { _id }, refetchQueries: ['NotesQuery'] }).then(() => {
      // eslint-disable-next-line no-console
      console.log('Response received from server.');
    }).catch(deleteNoteMutationError => {
      // eslint-disable-next-line no-console
      console.log(deleteNoteMutationError);
    });
  };
  const handleOnChangeNote = e => setNewNote(e.target.value);

  return (
    <div>
      <header>Notes</header>
      <ul>
        {notes.map(note => {
          const { content, _id } = note;
          const isBeingUpdated = noteIdBeingUpdated === _id;

          return (
            <div key={_id}>
              {isBeingUpdated ? (
                <li>
                  <input
                    value={noteContentBeingUpdated}
                    onChange={handleNoteBeingUpdated}
                  />
                </li>
              ) : (
                <li>{content}</li>
              )}
              <div style={{ display: 'flex' }}>
                <button type="button" onClick={handleUpdateNote(_id, content, isBeingUpdated)}>update</button>
                <button type="button" onClick={handleDeleteNote(_id)}>delete</button>
              </div>
            </div>
          );
        })}
      </ul>
      <footer>
        <input
          value={newNote}
          onChange={handleOnChangeNote}
          placeholder='Add a note here'
        />
        <button type="button" onClick={handleCreateNote}>create note</button>
      </footer>
    </div>
  );
};

export default NotesPage;
