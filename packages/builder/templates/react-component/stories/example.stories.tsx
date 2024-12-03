import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {{compName}} from '../index';

export default {
  id: '{{compName}}-Examples',
  title: '组件列表/{{compName}}/组件示例',
  component: {{compName}},
} as Meta;


export const Default: StoryObj = {
  name: '基本用法',
  render: (args) => (
    <{{compName}} {...args} />
  ),
  args: {
  }
}