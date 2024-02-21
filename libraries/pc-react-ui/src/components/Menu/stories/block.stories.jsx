import React from 'react';
import {
  Menu, MenuItem, MenuSubMenu, MenuItemGroup, Text,
} from '../index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Menu/blocks',
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
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const 基本用法 = {
  render: () => {
    return (
      <Menu mode="inline" theme="dark">
        <MenuItem key="mail">
          <Text> Navigation Four - LinkM</Text>
        </MenuItem>
        <MenuItem key="app">
          <Text>Navigation</Text>
        </MenuItem>
      </Menu>
    );
  },
};
export const 折叠功能 = {
  render: () => {
    return (
      <Menu mode="inline" theme="dark" defaultOpenKeys={['sub1', 'sub2']}>
        <MenuSubMenu key="sub1" title="Navigation Four">
          <MenuItem key="mail">
            <Text> Navigation Four - LinkM</Text>
          </MenuItem>
        </MenuSubMenu>
        <MenuSubMenu title="Navigation" key="sub2">
          <MenuItem key="app">
            <Text>Navigation</Text>
          </MenuItem>
        </MenuSubMenu>
      </Menu>
    );
  },
};
export const 分组 = {
  render: () => {
    return (
      <Menu mode="inline" theme="dark" defaultOpenKeys={['sub1', 'sub2']}>
        <MenuItemGroup key="sub1" title="Navigation Four">
          <MenuItem key="mail">
            <Text> Navigation Four - LinkM</Text>
          </MenuItem>
        </MenuItemGroup>
        <MenuItemGroup title="Navigation" key="sub2">
          <MenuItem key="app">
            <Text>Navigation</Text>
          </MenuItem>
        </MenuItemGroup>
      </Menu>
    );
  },
};
