import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styled from 'styled-components';
import { Button } from 'antd';
import TodoTextInput from './TodoTextInput';

const Element = styled.div`
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  display: flex;

  &:hover {
    background: #fafafa;
  }
`;

class TodoItem extends Component {
  state = {
    editing: false,
    hovered: false,
  }

  handleToggleHover = () => {
    this.setState(({ hovered }) => ({
      hovered: !hovered,
    }));
  }

  handleDoubleClick = () => {
    this.setState({ editing: true });
  }

  handleSave = (id, text) => {
    if (text.length === 0) {
      this.props.deleteTodo(id);
    } else {
      this.props.editTodo(id, text);
    }
    this.setState({ editing: false });
  }

  // eslint-disable-next-line
  renderLabel = (onDoubleClick, text) => <label onDoubleClick={onDoubleClick}>{text}</label>;

  // eslint-disable-next-line
  renderButton = (id, deleteTodo) => <Button type="link" danger onClick={() => deleteTodo(id)}>Delete</Button>;

  render() {
    const { todo, completeTodo, deleteTodo } = this.props;
    const { id, completed, text } = todo;
    const { editing, hovered } = this.state;

    let element;

    if (editing) {
      element = (
        <TodoTextInput
          text={text}
          editing={editing}
          onSave={(textToSave) => this.handleSave(id, textToSave)}
        />
      );
    } else {
      element = (
        <Element onMouseEnter={this.handleToggleHover} onMouseLeave={this.handleToggleHover}>
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={() => completeTodo(id)}
          />
          {this.renderLabel(this.handleDoubleClick, text)}
          {hovered && this.renderButton(id, deleteTodo)}
        </Element>
      );
    }

    return (
      <li className={classnames({
        completed,
        editing,
      })}
      >
        {element}
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.shape.isRequired,
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired,
};

export default TodoItem;
