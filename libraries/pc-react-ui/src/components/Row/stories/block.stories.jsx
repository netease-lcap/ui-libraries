import React from 'react';
import { Row, Col } from '../index';
import { Text } from '@/index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Row/blocks',
  component: Row,
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
export const 三栏布局 = {
  render: () => {
    return (
      <Row style={{ width: '1000px' }}>
        <Col style={{ backgroundColor: '#1677ffbf', height: 54 }} span={8} />
        <Col style={{ backgroundColor: '#1677ff', height: 54 }} span={8} />
        <Col style={{ backgroundColor: '#1677ffbf', height: 54 }} span={8} />
      </Row>
    );
  },
};
