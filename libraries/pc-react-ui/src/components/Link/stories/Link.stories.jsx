import React from 'react';
import { Link, Icon } from '@/index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Link',
  component: Link,
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
      <Link {...args}>
        asdf
        {/* <Icon
          style={{marginLeft: '10px'}}
          name="RiArrowDownSLine"
        /> */}
      </Link>
    );
  },
  args: {
    color: 'magenta',
    icon: 'RiArrowDownSLine',
    link: 'https://www.baidu.com',
    onFocus: (e) => {
      console.log(23);
    },
  },
};
