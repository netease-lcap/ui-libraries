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
    const ref = React.useRef();
    React.useEffect(() => {
      console.log(ref, 'ref');
    }, []);
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
          avatarSrc="https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg"
          getTargetContainer={(el) => {
            return document.getElementById('test-pro-layout') || document.body;
          }}
          avatarTitle="张梦燕"
          fixSiderbar
          layout="mix"
          logo="http://minio-api.codewave-dev.163yun.com/lowcode-static/packages/%40lcap/pc-react-ui%401.0.0-beta.0/dist-theme/LOGO.png"
          title="应用名称"
          // avatarRender={(
          //   <Dropdown
          //     menuItem={(
          //       <>
          //         <MenuItem label="导航项目" />
          //         <MenuItem label="导航项目" />
          //       </>
          //     )}
          //   />
          // )}
          avatarRender={(props, dom) => {
            return (
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
              >
                {dom}
              </Dropdown>
            );
          }}
          menuSlot={(
            <>
              <MenuItem label="采购信息" path="/1">
                <MenuItem label="采购信息录入" key="record" labelSlot={<></>} />
                <MenuItem label="采购信息管理" key="list" labelSlot={<></>} />
              </MenuItem>
              <MenuItem label="导航项" path="/2" />
              <MenuItem
                data-nodepath="rootview.0.0.1.1"
                ide-iscontainer="true"
                label="导航项"
                path="/2"
                labelIsSlot
                key="component-8"
                labelSlot={(() => (
                  <div ide-draggable="false" data-nodepath="rootview.0.0.1.1.0">
                    1234
                  </div>
                ))()}
              />
            </>
          )}
        />
      </div>
    );
  },
  args: {
    color: 'magenta',
    children: 'Tag',
  },
};
