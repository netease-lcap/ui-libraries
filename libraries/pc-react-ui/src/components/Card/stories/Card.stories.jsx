import React from 'react';
import {
  Card, Flex, Text, CheckboxGroup, Checkbox,
} from '@/index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Card',
  component: Card,
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
  render: (arg) => (
    <Card
      data-nodepath="rootview.0"
      ide-iscontainer="true"
      bordered
      title={(() => (
        <div ide-draggable="false" data-nodepath="rootview.0.0">
          <Text data-nodepath="rootview.0.0.0" children="多选框：静态数据" style={{ fontSize: 'inherit' }} />
        </div>
      ))()}
    >
      <Flex data-nodepath="rootview.0.1" ide-iscontainer="true" vertical={arg?.add} gap="small" justify="start">
        <Flex data-nodepath="rootview.0.1.0" ide-iscontainer="true" justify="start">
          <Text data-nodepath="rootview.0.1.0.0" children="普通文本" />
          <CheckboxGroup data-nodepath="rootview.0.1.0.1" ide-iscontainer="true">
            <Checkbox ide-iscontainer="true" value="苹果" checked={false}>
              <Text data-nodepath="rootview.0.1.0.1.0.0" children="苹果" />
            </Checkbox>
            <Checkbox ide-iscontainer="true" value="A">
              <Text data-nodepath="rootview.0.1.0.1.1.0" children="多选框1" />
            </Checkbox>
          </CheckboxGroup>
        </Flex>
        <Flex data-nodepath="rootview.0.1.1" ide-iscontainer="true" vertical="nasl.core.Boolean" align="start" style={{ textAlign: 'left' }} />
      </Flex>
    </Card>
  ),
  args: {
    color: 'magenta',
    children: 'Tag',
    add: true,
  },
};
