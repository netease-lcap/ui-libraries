import React from 'react';
import { Row, Col } from '../index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Row',
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
export const 默认 = {
  render: (args) => {
    function EmptySlot(params) {
      return <div>1</div>;
    }
    return (
      <div>
        {' '}
        <Row
          data-nodepath="rootview.0"
          ide-iscontainer="true"
          gutterAlign={50}
          key="component-27"
          style={{ width: '1009px', border: '1px solid red' }}
        >
          <Col
            data-nodepath="rootview.0.0"
            ide-iscontainer="true"
            span={8}
            offset={2}
            flex={0}
            key="component-28"
            style={{ border: '1px solid blue' }}
          >
            <EmptySlot data-emptyslot-nodepath="rootview.0.0" key="22" />
          </Col>
          <Col
            data-nodepath="rootview.0.1"
            ide-iscontainer="true"
            span={2}
            offset={5}
            flex={1}
            pull={0}
            style={{ border: '1px solid blue' }}
            key="component-29"
          >
            <EmptySlot data-emptyslot-nodepath="rootview.0.1" key="23" />
          </Col>
          <Col
            data-nodepath="rootview.0.2"
            ide-iscontainer="true"
            span={7}
            style={{ border: '1px solid blue' }}
            key="component-30"
          >
            <EmptySlot data-emptyslot-nodepath="rootview.0.2" key="24" />
          </Col>
        </Row>
        <Row>
          <Col span={6} style={{ border: '1px solid blue' }} offset={6}>
            col-6 col-offset-6
          </Col>
          <Col span={6} style={{ border: '1px solid blue' }} offset={6}>
            col-6 col-offset-6
          </Col>
        </Row>
      </div>
    );
  },
  args: {
    color: 'magenta',
  },
};
