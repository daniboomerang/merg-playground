import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import Header from './Header';
import TodoTextInput from './TodoTextInput';

const setup = () => {
  const props = {
    addTodo: jest.fn(),
  };

  const renderer = createRenderer();

  renderer.render(<Header {...props} />);
  const output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer,
  };
};

describe('components', () => {
  describe('Header', () => {
    it('should render correctly', () => {
      const { output } = setup();

      expect(output.type).toBe(TodoTextInput);
      expect(output.props.newTodo).toBe(true);
      expect(output.props.placeholder).toBe('What needs to be done?');
    });

    it('should call addTodo if length of text is greater than 0', () => {
      const { output, props } = setup();

      output.props.onSave('');
      expect(props.addTodo).not.toBeCalled();
      output.props.onSave('Use Redux');
      expect(props.addTodo).toBeCalled();
    });
  });
});
