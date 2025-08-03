import React from 'react';
import { render, screen } from '@testing-library/react';
import PageTree from './index';

const data = [
  {
    id: '1',
    name: 'Section 1',
    children: [
      {
        id: '1-1',
        name: 'Subsection 1-1',
        children: [],
      },
    ],
  },
];

test('renders PageTree with sections and subsections', () => {
  
  
  expect(screen.getByText(/Section 1/i)).toBeInTheDocument();
  expect(screen.getByText(/Subsection 1-1/i)).toBeInTheDocument();
});
