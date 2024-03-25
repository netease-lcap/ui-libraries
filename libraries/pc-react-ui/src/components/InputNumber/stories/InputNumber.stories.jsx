import React from 'react';
import { InputNumber } from '../index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/InputNumber',
  component: InputNumber,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
    formatType: {
      options: ['无', 'thousandths', 'percentSign'],
      control: { type: 'select' }, // Automatically inferred when 'options' is defined
    },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = {
  render: (args) => <InputNumber {...args} />,
  args: {
    type: 'primary',
    style: { width: '256px' },
    onClick: () =>
      new Promise((res) => {
        setTimeout(() => {
          res();
        }, 3000);
      }),
    'data-nodepath': '123412',
    // controls: false,
    // labelText: '1',

    // mySize: 'small',
    // size: 'small',
    // onClick: () => {},
  },
};
