import React from 'react';
import { Tree, TreeNode } from '../index';
// import { Tree } from 'antd';

// const { TreeNode } = Tree;

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Tree/blocks',
  component: Tree,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const 默认 = {
  render: () => {
    return (
      <Tree>
        <TreeNode title="节点1" key={1}>
          <TreeNode title="节点4" key={5} />
          <TreeNode title="节点5" key={6} />
        </TreeNode>
        <TreeNode title="节点2" key={2} />
        <TreeNode title="节点3" key={4} />
      </Tree>
    );
  },
};
