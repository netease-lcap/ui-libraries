import React from 'react';
import { Flex, Button } from '@/index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Flex',
  component: Flex,
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
      <Flex {...args}>
        <div style={{ height: '500px' }}>
          <Button>1234</Button>
        </div>
        <div>
          <Button>1234</Button>
        </div>
        <Button>1234</Button>
        <Button>1234</Button>
        <Button>1234</Button>
        <Button>1234</Button>
        <Button>1234</Button>
      </Flex>
    );
  },
  args: {
    color: 'magenta',
    // vertical: true,
    style: {
      border: '1px solid black',
      height: '200px',
    },
  },
};
