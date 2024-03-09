import React from 'react';
import { Menu, MenuItem, Text, MenuSubMenu } from '@/index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Menu',
  component: Menu,
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
    <Menu mode="horizontal" onClick={(e) => console.log(3)} onSelect={(e) => console.log(4)}>
      <MenuItem path="/app" label="21" icon="BorderInnerOutlined">
        Navigation Four - LinkM
      </MenuItem>
      <MenuItem key="/app">Navigation</MenuItem>
      <MenuSubMenu title={'subtitle'} key="sub2">
        <MenuItem key="/2app">
          <Text children="1Navigation" />
        </MenuItem>
        <MenuItem key="/app1">
          <Text children="1Navigation" />
        </MenuItem>
      </MenuSubMenu>
    </Menu>
  ),
  args: {
    color: 'magenta',
    children: 'Tag',
  },
};
