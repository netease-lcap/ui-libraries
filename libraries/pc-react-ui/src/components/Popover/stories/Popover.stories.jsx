import React from 'react';
import { Popover } from '../index';
import { Button } from '@/index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Popover',
  component: Popover,
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
  render: (args) => (
    <Popover trigger="click" content={<div>1234</div>} onOpenChange={console.log} data-nodepath="12234" title="Title">
      <Button data-nodepath="1234" type="button">
        Hover me
      </Button>
    </Popover>
  ),
  args: {
    color: 'magenta',
    children: 'Tag',
  },
};
