import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PageTree from './index';

const testTreeData = [
  { id: '1', label: 'Section 1' },
  { id: '2', label: 'Section 2' },
];

describe('PageTree Component', () => {
  it('renders without crashing', () => {
    render(<PageTree treeData={testTreeData} onNodeClick={() => {}} />);
    expect(screen.getByText('Section 1')).toBeInTheDocument();
  });

  it('calls onNodeClick when a node is clicked', () => {
    const mockOnNodeClick = jest.fn();
    render(<PageTree treeData={testTreeData} onNodeClick={mockOnNodeClick} />);
    fireEvent.click(screen.getByText('Section 1'));
    expect(mockOnNodeClick).toHaveBeenCalledWith('1');
  });
});