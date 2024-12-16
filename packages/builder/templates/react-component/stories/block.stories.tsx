import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {{compName}} from '../index';

export default {
  id: '{{compName}}-Blocks',
  title: '组件列表/{{compName}}/内置区块',
  component: {{compName}},
  parameters: {
    layout: 'centered',
  },
} as Meta;

export const Default: StoryObj = {
  name: '基本用法',
  render: () => (
    <{{compName}} />
  ),
};
