import React from 'react';
import { Icon } from '../index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Icon',
  component: Icon,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
    originDataSource: {
      options: ['无', 'employee', 'department'],
      control: { type: 'select' }, // Automatically inferred when 'options' is defined
    },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const 默认 = {
  render: (args) => {
    return (
      <Icon
        data-nodepath="rootview.6"
        name="//minio-api.codewave-dev.163yun.com/lowcode-static/user/defaulttenant/1701943475046_%E9%80%BB%E8%BE%91%26%E6%95%B0%E6%8D%AE.svg"
        key="component-66"
      />
    );
  },
  args: {
    color: 'magenta',
    name:
      '//minio-api.codewave-dev.163yun.com/lowcode-static/user/defaulttenant/1711352646423_1711101097723_1710173501157_%E4%B8%89%E7%82%B9.svg',
  },
};
