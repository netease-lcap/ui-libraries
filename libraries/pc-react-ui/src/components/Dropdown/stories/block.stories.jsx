import React from 'react';
import { Dropdown } from '../index';
import {
  Button, Text, MenuItem, Link, Flex,
} from '@/index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Dropdown/blocks',
  component: Dropdown,
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
export const 默认 = {
  render: () => {
    return (
      <Dropdown
        menuItem={(
          <>
            <MenuItem label="导航项目" path="https://www.baidu.com" />
            <MenuItem label="导航项目2" />
          </>
        )}
      >
        <Link icon="RiArrowDownSLine" children="按钮" />
      </Dropdown>
    );
  },
  args: {},
};
