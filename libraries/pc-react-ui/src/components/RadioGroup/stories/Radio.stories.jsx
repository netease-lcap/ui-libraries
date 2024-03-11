import React from 'react';
import { Radio, RadioGroup } from '@/index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/RadioGroup',
  component: Radio,
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
  render: (args) => {
    const ref = React.useRef({});
    const [value, setValue] = React.useState(undefined);
    React.useEffect(() => {
      setTimeout(() => {
        setValue([1, 2, 3]);
      }, 300);
    }, []);
    return [
      <button
        onClick={() => {
          ref.current.reload();
        }}
      >
        11
      </button>,
      <RadioGroup dataSource={value} ref={ref} />,
    ];
  },
  args: {
    color: 'magenta',
    // dataSource: undefined,
    // children: 'Tag',
    // dataSource: async () => {
    //   return ;
    // },
  },
};
export const 数据源 = {
  render: (args) => <RadioGroup {...args} />,
  args: {
    dataSource: async () => ({
      list: [
        {
          checkbox: {
            id: 1,
            createdTime: null,
            updatedTime: null,
            createdBy: null,
            updatedBy: null,
            name: '苹果',
          },
        },
        {
          checkbox: {
            id: 2,
            createdTime: null,
            updatedTime: null,
            createdBy: null,
            updatedBy: null,
            name: '香蕉',
          },
        },
        {
          checkbox: {
            id: 3,
            createdTime: null,
            updatedTime: null,
            createdBy: null,
            updatedBy: null,
            name: '橘子',
          },
        },
      ],
      total: 3,
    }),
    // dataSource: ['苹果', '香蕉', '橘子'],
    textField: 'checkbox.id',
    valueField: 'checkbox.id',
  },
};