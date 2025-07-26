import React from 'react';
import styles from './index.module.scss';

export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}

export interface PageTreeProps {
  treeData: TreeNode[];
  onNodeClick: (nodeId: string) => void;
  activeNodeId?: string; // Добавляем пропс для активного узла
}

const PageTree: React.FC<PageTreeProps> = ({ treeData, onNodeClick, activeNodeId }) => {
  const renderTree = (nodes: TreeNode[], level = 0) => {
    return (
      <>
        {nodes.map((node) => (
          <div
            key={node.id}
            className={`${styles.treeItem} ${level > 0 ? styles.nested : ''} ${node.id === activeNodeId ? styles.active : ''}`}
            onClick={() => onNodeClick(node.id)}
          >
            {node.label}
            {node.children && node.children.length > 0 && (
              <div className={styles.nested}>{renderTree(node.children, level + 1)}</div>
            )}
          </div>
        ))}
      </>
    );
  };

  return (
    <div className={styles.treeContainer}>
      {renderTree(treeData)}
    </div>
  );
};

export default PageTree;
