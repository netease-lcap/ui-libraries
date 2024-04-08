import React from 'react';
import { Tabs, TabPane, Text } from '@/index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Tabs',
  component: Tabs,
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
export const 异步函数 = {
  render: (args) => {
    const ref = React.useRef();
    const [value, setValue] = React.useState();
    React.useEffect(() => {
      console.log(ref, ref, 'ref');
    }, []);
    return (
      <div>
        <button
          onClick={() => {
            // ref.current.setValue(3);
            setValue('1');
          }}
        >
          1234
        </button>
        <Tabs
          ref={ref}
          activeKey={value}
          dataSource={args.dataSource}
          textField="entityForSel.name"
          valueField="entityForSel.id"
          onActiveKeyChange={setValue}
        />
      </div>
    );
  },
  args: {
    dataSource: () => new Promise((res) => {
      setTimeout(() => {
        res([
          {
            entityForSel: {
              id: 1,
              createdTime: null,
              updatedTime: null,
              createdBy: null,
              updatedBy: null,
              fid: 0,
              name: '测试1',
              sonid: [],
            },
          },
          {
            entityForSel: {
              id: 2,
              createdTime: null,
              updatedTime: null,
              createdBy: null,
              updatedBy: null,
              fid: 0,
              name: '测试2',
              sonid: [],
            },
          },
          {
            entityForSel: {
              id: 3,
              createdTime: null,
              updatedTime: null,
              createdBy: null,
              updatedBy: null,
              fid: 1,
              name: '测试1.1',
              sonid: [],
            },
          },
          {
            entityForSel: {
              id: 4,
              createdTime: null,
              updatedTime: null,
              createdBy: null,
              updatedBy: null,
              fid: 3,
              name: '测试1.1.1',
              sonid: [],
            },
          },
          {
            entityForSel: {
              id: 5,
              createdTime: null,
              updatedTime: null,
              createdBy: null,
              updatedBy: null,
              fid: 2,
              name: '测试2.1',
              sonid: [],
            },
          },
        ]);
      }, 3000);
    }),
  },
};
export const 同步函数 = {
  render: (args) => <Tabs {...args} />,
  args: {
    dataSource: () => [
      { label: 'Option 1', key: '1' },
      { label: 'Option 2', key: '2' },
      { label: 'Option 3', key: '3' },
    ],
  },
};

export const 数组 = {
  render: (args) => {
    return (
      <Tabs
        data-nodepath="rootview.11"
        ide-iscontainer="true"
        defaultActiveKey="2"
      >
        <TabPane
          ide-iscontainer="true"
          key={1}
          tab={(() => (
            <Text data-nodepath="rootview.11.0.0.0" children="选项卡1" />
          ))()}
        >
          <Text data-nodepath="rootview.11.0.2" children="普通文本" />
        </TabPane>
        <TabPane
          ide-iscontainer="true"
          key={2}
          tab={(() => (
            <Text data-nodepath="rootview.11.1.0.0" children="选项卡2" />
          ))()}
        >
          <Text data-nodepath="rootview.11.1.1" children="普通文本" />
        </TabPane>
        <TabPane
          ide-iscontainer="true"
          key={3}
          tab={(() => (
            <Text data-nodepath="rootview.11.2.0.0" children="选项卡3" />
          ))()}
        />
      </Tabs>
    );
  },
  args: {
    dataSource: [
      { label: 'Option 1', key: '1' },
      { label: 'Option 2', key: '2' },
      { label: 'Option 3', key: '3' },
    ],
  },
};
