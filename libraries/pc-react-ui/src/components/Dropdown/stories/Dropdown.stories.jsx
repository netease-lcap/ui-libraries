import React from 'react';
import { Dropdown, MenuItem, Text, Button } from '@/index';
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
        data-nodepath="rootview.0"
        trigger="click"
        menuItem={(() => (
          <>
            <MenuItem
              key="www.baidu.com"
              data-nodepath="rootview.0.0.0"
              ide-iscontainer="true"
              label={(() => (
                <Text data-nodepath="rootview.0.0.0.0.0" children="导航项目" />
              ))()}
            >
              <div />
            </MenuItem>
            <MenuItem
              data-nodepath="rootview.0.0.1"
              ide-iscontainer="true"
              key="/app"
              label={(() => (
                <Text data-nodepath="rootview.0.0.1.0.0" children="导航项目2" />
              ))()}
            >
              <div />
            </MenuItem>
          </>
        ))()}
      >
        <div style={{ display: 'inline-block' }} ide-iscontainer="true" data-nodepath="rootview.0">
          <Button data-nodepath="rootview.0.1" type="primary" children="按钮" />
        </div>
      </Dropdown>
    );
  },
  args: {},
};
