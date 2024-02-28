import React from 'react';
import { Select, SelectOption, SelectOptGroup } from '../index';
import { Text } from '@/index';
// import Select from 'antd';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Select',
  component: Select,
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
    // const ref = React.useRef({});
    // console.log(ref, 'ref');
    // React.useEffect(() => {
    //   console.log(ref, 'ref');
    // }, []);
    return (
      <div>
        {/* <button onClick={() => ref.current.open()}>1234</button> */}

        <Select {...args}>
          {/* <SelectOption key="1" label="1" value="1" />
        <SelectOption key="2" label="2" value="2" disabled /> */}
        </Select>
      </div>
    );
  },
  args: {
    style: { width: '256px' },
    dataSource: () => new Promise((res) => {
      setTimeout(() => {
        res([
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ]);
      }, 3000);
    }),
  },
};
export const 异步函数1 = {
  render: (args) => {
    return (
      <Select {...args}>
        <SelectOptGroup
          label={(() => (
            <Text children="1234" />
          ))()}
        >
          <SelectOption key="1" label="1" value="1" />
          <SelectOption key="2" label="2" value="2" disabled />
        </SelectOptGroup>
        <SelectOptGroup label={<Text children="1234" />}>
          <SelectOption key="1" label="1" value="1" />
          <SelectOption key="2" label="2" value="2" disabled />
        </SelectOptGroup>
      </Select>
    );
  },
  args: {
    style: { width: '256px' },
  },
};
