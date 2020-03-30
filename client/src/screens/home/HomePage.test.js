import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';

jest.mock('../../components/Layout/Page', () => ({ children }) => <div className="page">{children}</div>);

describe('HomePage', () => {
  it('should render the HomePage component correctly', () => {
    const wrapper = mount(
      <MemoryRouter keyLength={0}>
        <HomePage />
      </MemoryRouter>
    );

    expect((wrapper).text()).toBe('Merg PlaygroundA Mongo, Express, GraphQL & React stack. Playground with demo apps using different React libraries.NotesNotes demo with CRUD actions using Apollo GraphQL server API and mongoDB.');
    expect(wrapper.find('a').length).toBe(1);
    expect(wrapper.find('a').props().href).toBe('/notes');
    expect(wrapper).toMatchSnapshot();
  });
});
