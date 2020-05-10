import React from 'react';
import PropTypes from 'prop-types';
import TodoTextInput from './TodoTextInput';

const Header = ({ addTodo }) => (
  <TodoTextInput
    newTodo
    onSave={(text) => {
      if (text.length !== 0) {
        addTodo(text);
      }
    }}
    placeholder="What needs to be done?"
  />
);

Header.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default Header;
