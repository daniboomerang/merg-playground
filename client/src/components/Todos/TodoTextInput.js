import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class TodoTextInput extends Component {
  state = {
    text: this.props.text || '',
  }

  handleSubmit = (e) => {
    const text = e.target.value.trim();
    const { onSave, newTodo } = this.props;

    if (e.which === 13) {
      onSave(text);
      if (newTodo) {
        this.setState({ text: '' });
      }
    }
  }

  handleChange = (e) => {
    this.setState({ text: e.target.value });
  }

  handleBlur = (e) => {
    const { onSave, newTodo } = this.props;

    if (!newTodo) {
      onSave(e.target.value);
    }
  }

  render() {
    const {
      editing,
      newTodo,
      placeholder,
    } = this.props;

    const { text } = this.state;

    return (
      <input
        className={
          classnames({
            edit: editing,
            'new-todo': newTodo,
          })
        }
        type="text"
        placeholder={placeholder}
        value={text}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit}
      />
    );
  }
}

TodoTextInput.propTypes = {
  onSave: PropTypes.func.isRequired,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  editing: PropTypes.bool,
  newTodo: PropTypes.bool,
};

TodoTextInput.defaultProps = {
  text: '',
  placeholder: '',
  editing: false,
  newTodo: false,
};


export default TodoTextInput;
