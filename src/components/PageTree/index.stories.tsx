import React from 'react';
import { Story, Meta } from '@storybook/react';
import PageTree, { PageTreeProps } from './index';

export default {
  title: 'Components/PageTree',
  component: PageTree,
} as Meta;

const Template: Story<PageTreeProps> = (args) => <PageTree {...args} />;

export const Default = Template.bind({});
Default.args = {
  treeData: [
    {
      id: '1',
      label: 'Section 1',
      children: [
        { id: '1.1', label: 'Subsection 1.1' },
        {
          id: '1.2',
          label: 'Subsection 1.2',
          children: [
            { id: '1.2.1', label: 'Sub-subsection 1.2.1' },
            { id: '1.2.2', label: 'Sub-subsection 1.2.2' },
          ],
        },
      ],
    },
    { id: '2', label: 'Section 2' },
  ],
  onNodeClick: (nodeId) => {
    alert(`Clicked node: ${nodeId}`);
  },
};
