import React from 'react';
import { theme, Layout } from 'antd';
import {
  Menu,
  MenuItem,
  MenuSubMenu,
  MenuItemGroup,
  Text,
  Image,
  Dropdown,
  Button,
  Flex,
  ProLayout,
  Router,
} from '@/index';

const { Header } = Layout;
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/ProLaout/blocks',
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
      <ProLayout
        getTargetContainer={() => {
          return document.getElementById('test-pro-layout') || document.body;
        }}
        avatarSrc="https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg"
        avatarTitle={
          window.$global?.userInfo?.UserName ?? 'window.$global.userInfo'
        }
        avatarRender={(
          <Dropdown
            menuItem={(
              <>
                <MenuItem label={<Text>导航项目</Text>} />
                <MenuItem label={<Text>导航项目2</Text>} />
              </>
            )}
          />
        )}
        fixSiderbar
        layout="mix"
        title="应用名称"
        menuDataRender={(menuData) => {
          return [{ name: 2, label: 1, path: '/a' }];
        }}
        menuSlot={(
          <>
            <MenuItem label="导航项" path="/1" />
            <MenuItem label="导航项" path="/2" />
          </>
        )}
      />
    );
  },
};
