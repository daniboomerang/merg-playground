import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import MainSection from './MainSection';
import VisibleTodoList from './containers/VisibleTodoList';
import Footer from './Footer';

const setup = (propOverrides) => {
  const props = {
    todosCount: 2,
    completedCount: 1,
    actions: {
      editTodo: jest.fn(),
      deleteTodo: jest.fn(),
      completeTodo: jest.fn(),
      clearCompleted: jest.fn(),
    },
    ...propOverrides,
  };

  const renderer = createRenderer();

  renderer.render(<MainSection {...props} />);
  const output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer,
  };
};

describe('components', () => {
  describe('MainSection', () => {
    it('should render container', () => {
      const { output } = setup();

      expect(output.type.displayName).toBe('styled.section');
    });

    describe('footer', () => {
      it('should render', () => {
        const { output } = setup();
        const [, footer] = output.props.children;

        expect(footer.type).toBe(Footer);
        expect(footer.props.completedCount).toBe(1);
        expect(footer.props.activeCount).toBe(1);
      });

      it('onClearCompleted should call clearCompleted', () => {
        const { output, props } = setup();
        const [, footer] = output.props.children;

        footer.props.onClearCompleted();
        expect(props.actions.clearCompleted).toBeCalled();
      });
    });

    describe('visible todo list', () => {
      it('should render', () => {
        const { output } = setup();
        const [list,] = output.props.children;
        expect(list.type.displayName).toBe('styled.div');
        const visibleTodoList = list.props.children;
        expect(visibleTodoList.type).toBe(VisibleTodoList);
      });
    });
  });
});
