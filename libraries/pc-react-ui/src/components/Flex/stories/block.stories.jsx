import React from 'react';
import { Flex } from '../index';
import { Text } from '@/index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Flex/blocks',
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
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const 单行排布 = {
  render: () => {
    return <Flex />;
  },
};
export const 多行排布 = {
  render: () => {
    return (
      <Flex vertical gap="small">
        <Flex />
        <Flex />
      </Flex>
    );
  },
};
