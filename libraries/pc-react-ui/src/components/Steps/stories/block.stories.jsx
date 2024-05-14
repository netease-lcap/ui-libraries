import React from 'react';
import { Steps, StepsItem } from '../index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Steps/blocks',
  component: Steps,
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
export const 基本用法 = {
  render: () => {
    return (
      <Steps current={1}>
        <StepsItem key={1} />
        <StepsItem key={2} />
        <StepsItem key={3} />
      </Steps>
    );
  },
};

export const 禁用 = {
  render: () => {
    return (
      <Steps current={1}>
        <StepsItem disabled key={1} />
        <StepsItem disabled key={2} />
        <StepsItem disabled key={3} />
      </Steps>
    );
  },
};
