import React from 'react';
// @ts-ignore
import ComponentPreivew, { demos } from 'virtual:lcap-theme-component-previews.js';
import Dashboard from './previews/dashboard';
import Form from './previews/form';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'ThemePreviews',
  parameters: {
    // layout: 'fullscreen',
    backgrounds: {
      default: 'twitter',
      values: [
        {
          name: 'twitter',
          value: '#f5f5f5',
        },
      ],
    },
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
    originDataSource: {
      options: ['无', 'employee', 'department'],
      control: { type: 'select' }, // Automatically inferred when 'options' is defined
    },
  },
};

export const DashboardPage = {
  name: 'dashboard',
  render: () => (<Dashboard />),
};

export const FormPage = {
  name: '表单页',
  render: () => (<Form />),
};

export const Components = {
  name: '组件预览',
  render: ComponentPreivew,
  args: {
    componentNames: ['Button', 'List', 'Tree'],
  },
  argTypes: {
    componentNames: {
      options: demos.map((c) => c.name),
      control: { type: 'multi-select' }, // Automatically inferred when 'options' is defined
    },
  },
};
