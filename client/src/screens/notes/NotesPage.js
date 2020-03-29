import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-apollo';
import styled, { css } from 'styled-components';
import { CreateNoteMutation, DeleteNoteMutation, UpdateNoteMutation }  from './graphql/mutations';
import NotesQuery from './graphql/queries';
import Page from '../../components/Layout/Page';
import Note from '../../components/Notes/Note';
import { Button, Input, message } from 'antd';

const NotesContent = styled.div`
  box-shadow: 0px 0px 3px 1px #f5f5f5;
  border-radius: 10px;
  max-width: 600px;
  overflow: hidden;
`;

const pageSectionStyle = css`
  background: white;
`;

const CreateNoteSection = styled.div`
  border-bottom: solid 1px #f5f5f5;
  padding: 20px;
  display: flex;
  ${pageSectionStyle}
`;

const NotesListSection = styled.div`
  overflow-y: scroll;
  height: 510px;
  ${pageSectionStyle}
`;

const ListElement = styled.div`
  border-bottom: solid 1px #f5f5f5;
  padding:  15px 0px 15px 10px;
  padding: 20px;

  &:hover {
    background: #fafafa;
    cursor: pointer;
  }
    
  &:last-child {
    border-bottom: none;
  }
`;

const NotesPage = () => {
  // Graphql query
  const { loading, data, error } = useQuery(NotesQuery);

  // State hooks
  const [newNote, setNewNote] = useState('');
  const [listScrollableContainer, setListScrollableContainer] = useState(null);

  // Graphql mutations
  const [createNoteMutation] = useMutation(CreateNoteMutation);
  const [deleteNoteMutation] = useMutation(DeleteNoteMutation);
  const [updateNoteMutation] = useMutation(UpdateNoteMutation);

  if (error) {
    message.error('Error :(');
    return null;
  }

  // Handlers
  const handleCreateNote = () => {
    if (newNote) {
      createNoteMutation({ variables: { content: newNote }, refetchQueries: ['NotesQuery'] }).then(() => {
        message.success('Note created');
      }).catch(createNoteMutationError => {
        message.error(createNoteMutationError);
      });
      setNewNote('');
    }
  };

  const handleOnChangeNewNote = e => setNewNote(e.target.value);

  return (
    <Page currentPage="notes" loading={loading}>
      <NotesContent>
        <CreateNoteSection>
          <Input
            value={newNote}
            onChange={handleOnChangeNewNote}
            placeholder="Add a note here"
            style={{  height: '50px' }}
          />
          <Button type="primary" onClick={handleCreateNote} style={{  height: '50px' }}>Create note</Button>
        </CreateNoteSection>
        <NotesListSection ref={setListScrollableContainer}>
          {data?.notes.map(note => {
            const { content, _id } = note;

            return (
              <ListElement key={_id}>
                <Note
                  id={_id}
                  note={content}
                  onUpdateNote={updateNoteMutation}
                  onDeleteNote={deleteNoteMutation}
                  parentScrollableContainer={listScrollableContainer}
                />
              </ListElement>
            );
          })}
        </NotesListSection>
      </NotesContent>
    </Page>
  );
};

export default NotesPage;
