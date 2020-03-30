import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import gqlApolloTestClient from '../../gqlApolloTestClient';
import { act } from 'react-dom/test-utils';
import NotesPage from './NotesPage';
import PromiseMock from 'promise-mock';

jest.mock('../../components/Layout/Page', () => ({ children }) => <div className="page">{children}</div>);
jest.mock('../../components/Notes/Note', () => () => <div className="note" />);

describe('NotesPage', () => {
  let wrapper;

  beforeEach(() => {
    PromiseMock.install();
  });

  afterEach(() => {
    PromiseMock.uninstall();
  });

  it('should render the NotesPage component correctly', () => {
    wrapper = mount(
      <ApolloProvider client={gqlApolloTestClient}>
        <MemoryRouter>
          <NotesPage />
        </MemoryRouter>
      </ApolloProvider>
    );

    act(() => {
      PromiseMock.runAll();
    });

    wrapper.update();
    expect((wrapper).find('.page').length).toBe(1);
    expect((wrapper).find('.note').length).toBe(2);
  });
});
