import React from 'react';
import { mount } from 'enzyme';
import Note from './Note';

describe('Note', () => {
  const id = 'noteId';
  const note = 'This is a note';
  const updateNoteMutation = jest.fn();
  const deleteNoteMutation = jest.fn();
  const listScrollableContainer = null;
  const wrapper = mount(
    <Note
      id={id}
      note={note}
      onUpdateNote={updateNoteMutation}
      onDeleteNote={deleteNoteMutation}
      parentScrollableContainer={listScrollableContainer}
    />,
  );

  it('should render the Note component correctly', () => {
    expect(wrapper.text()).toBe(note);
    expect(wrapper).toMatchSnapshot();
  });
});
