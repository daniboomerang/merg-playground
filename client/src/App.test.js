import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);

  const linkElementHome = getByText('Home');

  expect(linkElementHome).toBeInTheDocument();

  const linkElementNotes = getByText('Notes');

  expect(linkElementNotes).toBeInTheDocument();
});
