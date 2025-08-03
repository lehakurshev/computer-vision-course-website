import React from 'react';
import PageTree from './index';

export default {
  title: 'Components/PageTree',
  component: PageTree,
};

const data = [
  {
    id: '1',
    name: 'Section 1',
    children: [
      {
        id: '1-1',
        name: 'Subsection 1-1',
        children: [
          { id: '1-1-1', name: 'Sub-subsection 1-1-1' },
          { id: '1-1-2', name: 'Sub-subsection 1-1-2' },
        ],
      },
      { id: '1-2', name: 'Subsection 1-2' },
    ],
  },
  {
    id: '2',
    name: 'Section 2',
    children: [],
  },
];


