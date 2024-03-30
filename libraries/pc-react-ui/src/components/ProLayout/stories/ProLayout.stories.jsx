import React, { useState } from 'react';
import {
  CaretDownFilled,
  DoubleRightOutlined,
  GithubFilled,
  InfoCircleFilled,
  LogoutOutlined,
  PlusCircleFilled,
  QuestionCircleFilled,
  SearchOutlined,
} from '@ant-design/icons';
import {
  PageContainer,
  ProCard,
  ProConfigProvider,
  ProLayout as AntProLayout,
  SettingDrawer,
} from '@ant-design/pro-components';
import {
  Button,
  ConfigProvider,
  Divider,
  Dropdown,
  Input,
  Popover,
  theme,
} from 'antd';
import {
  Menu, MenuItem, Text, MenuSubMenu, ProLayout,
} from '@/index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/ProLaout',
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
  render: () => {
    const [settings, setSetting] = useState({
      fixSiderbar: true,
      layout: 'mix',
      // splitMenus: true,
    });

    const [pathname, setPathname] = useState('/list/sub-page/sub-sub-page1');
    const [num, setNum] = useState(40);
    if (typeof document === 'undefined') {
      return <div />;
    }
    return (
      <div
        id="test-pro-layout"
        style={{
          height: '100vh',
          width: '1200px',
          overflow: 'auto',
        }}
      >
        <ProLayout
          getTargetContainer={() => {
            return document.getElementById('test-pro-layout') || document.body;
          }}
          avatarSrc="https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg"
          avatarTitle="七妮妮"
          avatarRender={(
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'logout',
                    icon: <LogoutOutlined />,
                    label: '退出登录',
                  },
                ],
              }}
            />
          )}
          fixSiderbar
          layout="mix"
          // logo="https://bkimg.cdn.bcebos.com/pic/e1fe9925bc315c6034a8d84c71f8dc1349540923d974?x-bce-process=image/format,f_auto/quality,Q_70/resize,m_lfit,limit_1,w_536.jpg"
          title="应用名称"
          // splitMenus
          menuDataRender={(menuData) => {
            return [{ name: 2, label: 1, path: '/a' }];
          }}
          menuSlot={[
            <MenuItem
              label="1234"
              title="123"
              key="/123"
              onClick={(el) => {
                console.log(el, '--');
                console.log(1234);
              }}
            />,
          ]}
        >
          <div>1234</div>
        </ProLayout>
      </div>
    );
  },
  args: {
    color: 'magenta',
    children: 'Tag',
  },
};
