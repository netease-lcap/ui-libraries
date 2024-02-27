import React from 'react';
import { theme, Layout } from 'antd';
import {
  Menu, MenuItem, MenuSubMenu, MenuItemGroup,
} from '../index';
import {
  Text, Image, Dropdown, Button, Flex,
} from '@/index';

const { Header } = Layout;
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
      <Menu mode="horizontal" style="height: 60px" theme="dark">
        <MenuItem key="mail" style="line-height:60px">
          <Text children="导航项目一" style="color:inherit" />
        </MenuItem>
        <MenuItem key="app" style="line-height:60px">
          <Text children="导航项目二" style="color:inherit" />
        </MenuItem>
      </Menu>
    );
  },
};
 const 模版 = {
  render: () => {
    return (
      <Layout>
        <Header style="display: flex; alignItems: center; padding: 0 24px">
          <Flex className="demo-logo">
            <Image width="32px" src="http://defaulttenant.lcap.react01-lowcode.com/favicon.ico" preview={false} />
            <Text children="应用名称" style="color: rgba(255, 255, 255, 0.65); margin: 0 24px" />
          </Flex>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style="flex: 1; minWidth: 0">
            <MenuItem key="mail">
              <Text style="color: inherit" children="导航下1" />
            </MenuItem>
          </Menu>
          <Dropdown>
            <Image width="32px" src="https://nobug.lcap.163yun.com/assets/avatar-default.svg" preview={false} />
          </Dropdown>
          <Text children="这是应用名称文案" style="color: rgba(255, 255, 255, 0.65); margin: 0 8px" />
        </Header>
      </Layout>
    );
  },
};
export const 折叠功能 = {
  render: () => {
    return (
      <Menu mode="horizontal" defaultOpenKeys={['sub1', 'sub2']}>
        <MenuSubMenu key="sub1" title="Navigation Four">
          <MenuItem key="mail">
            <Text> Navigation Four - LinkM</Text>
          </MenuItem>
        </MenuSubMenu>
        <MenuSubMenu title="Navigation" key="sub2">
          <MenuItem key="app">
            <Text children="Navigation" />
          </MenuItem>
        </MenuSubMenu>
      </Menu>
    );
  },
};
export const 分组 = {
  render: () => {
    return (
      <Menu mode="horizontal" defaultOpenKeys={['sub1', 'sub2']}>
        <MenuItemGroup key="sub1" title="Navigation Four">
          <MenuItem key="mail">
            <Text children=" Navigation Four - LinkM" />
          </MenuItem>
        </MenuItemGroup>
        <MenuItemGroup title="Navigation" key="sub2">
          <MenuItem key="app">
            <Text children="Navigation" />
          </MenuItem>
        </MenuItemGroup>
      </Menu>
    );
  },
};
