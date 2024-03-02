import React from 'react';
import { Tabs, TabPane } from '@/index';

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
    React.useEffect(() => {
      console.log(ref, ref, 'ref');
    }, []);
    return (
      <div>
        <button
          onClick={() => {
            ref.current.setValue('3');
          }}
        >
          1234
        </button>
        <Tabs ref={ref}>
          {/* <TabPanePane key"1" ></TabPanePane> */}
          <TabPane key="2" tab="选项卡2" data-nodepath="12" />
          <TabPane key="3" tab="选项卡3" data-nodepath="123" />
          <TabPane key="1" tab="选项卡1" data-nodepath="1234" />
        </Tabs>
      </div>
    );
  },
  args: {
    // dataSource: () => new Promise((res) => {
    //   setTimeout(() => {
    //     res([
    //       { label: `Option 1${Math.random()}`, key: '1' },
    //       { label: 'Option 2', key: '2' },
    //       { label: 'Option 3', key: '3' },
    //     ]);
    //   }, 3000);
    // }),
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
  render: (args) => <Tabs {...args} />,
  args: {
    dataSource: [
      { label: 'Option 1', key: '1' },
      { label: 'Option 2', key: '2' },
      { label: 'Option 3', key: '3' },
    ],
  },
};
