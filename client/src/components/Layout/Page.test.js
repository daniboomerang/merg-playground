import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Page from './Page';

describe('Page', () => {
  it('should render the Page component correctly', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Page currentPage="home">
          Home page content
        </Page>
      </MemoryRouter>,
    );

    expect((wrapper).text()).toBe('···Home···Notes···Home page content');
    const links = wrapper.find('a');

    expect(links.length).toBe(2);
    expect(links.at(0).props().href).toBe('/');
    expect(links.at(1).props().href).toBe('/notes');
    // FIXME: Commenting out the expect snapshot.
    // Antd Menu loads asynch. -> expect(wrapper).toMatchSnapshot();
  });
});
