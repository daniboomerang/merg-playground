import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import TodosPage from './TodosPage';
import Page from '../../components/Layout/Page';
import Header from '../../components/Todos/containers/Header';
import MainSection from '../../components/Todos/containers/MainSection';

const setup = (_propOverrides) => {
  const renderer = createRenderer();

  renderer.render(<TodosPage />);
  const output = renderer.getRenderOutput();

  return output;
};

describe('components', () => {
  describe('Header', () => {
    it('should render', () => {
      const output = setup();
      const content = output.props.children;
      const [header,mainSection] = content.props.children;

      expect(header.type).toBe(Header);
      expect(mainSection.type).toBe(MainSection);
    });

  });
});
