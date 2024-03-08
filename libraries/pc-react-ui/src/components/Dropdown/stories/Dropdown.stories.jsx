import React from 'react';
import {
  Dropdown, MenuItem, Text, Button,
} from '@/index';
// import { Dropdown } from 'antd';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Dropdown',
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
    const ref = React.useRef();
    const items = [
      {
        key: '1',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
            1st menu item
          </a>
        ),
      },
      {
        key: '2',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
            2nd menu item
          </a>
        ),
      },
    ];
    React.useEffect(() => {
      console.log(ref);
    }, []);
    return (
      <Dropdown
        style={{
          marginLeft: '20px', '--update-key': 'y2xu', marginTop: '20px', marginBottom: '20px', color: '#583838',
        }}
        type="dashed"
        menuItem={(
          <>
            <MenuItem
              key="https://www.sf.163.com/"
              icon="file-jpg"
              label={(
                <Text>图标+外部链接</Text>
              )}
            />
            <MenuItem
              key="/navbar"
              icon=""
              label={(
                <Text>内部链接</Text>
              )}
            />
            <MenuItem
              // onClick={localStore.MenuItem55Click}
              key=""
              icon=""
              label={(
                <Text>事件</Text>
              )}
            />
            <MenuItem
              disabled
              label={(
                <Text>禁用</Text>
              )}
            />
          </>
        )}
      >
        <Button type="primary">点击打开菜单项</Button>
      </Dropdown>
    );
  },
  args: {},
};
