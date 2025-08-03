import React from 'react';
import styles from './index.module.scss';
import { Tree } from 'react-arborist';


interface TreeNode {
  id: string;
  label: string;
  children?: Array<TreeNode>;
}

interface PageTreeProps {
  treeData: Array<TreeNode>;
  onNodeClick: (nodeId: string) => void;
}

const PageTree: React.FC<PageTreeProps> = ({ treeData, onNodeClick }) => {
  return (
    <Tree initialData={treeData} />
  );
};

export default PageTree;
