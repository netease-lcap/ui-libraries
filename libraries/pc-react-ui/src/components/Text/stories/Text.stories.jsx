import React from 'react';
import Text from '../index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Text',
  component: Text,
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
  render: (args) => <Text {...args} />,
  args: {
    color: 'magenta',
    children: '123',
  },
};
export const 默认1 = {
  render: (args) => (
    <Text
      {...args}
      usePlugin={{
        a(props) {
          return {
            render: (_props) => {
              const Compoent = props.get('render');
              return (
                <div>
                  1234
                  <Compoent {..._props} />
                </div>
              );
            },
          };
        },
      }}
    />
  ),
  args: {
    color: 'magenta',
    children: '222',
  },
};
