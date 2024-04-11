import React from 'react';
import { Steps, Icon } from '@/index';
import { StepsItem } from '../index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Steps',
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
export const 默认 = {
  render: () => (
    <div>
      {' '}
      <Steps current={1}>
        <StepsItem
          key={1}
          title="finished"
          description="his is a description"
        />
        <StepsItem
          key={2}
          title="In Progress"
          description="his is a description"
        />
        <StepsItem
          key={3}
          title="Waiting"
          description="his is a description"
          icon="//minio-api.codewave-dev.163yun.com/lowcode-static/user/defaulttenant/1701943475046_%E9%80%BB%E8%BE%91%26%E6%95%B0%E6%8D%AE.svg"
        />
      </Steps>
    </div>
  ),
  args: {},
};
