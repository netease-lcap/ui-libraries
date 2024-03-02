import React from 'react';
import { Input } from 'antd';
import { Modal, Flex } from '@/index';
// import { Add } from '../index';
import { Button } from '@/components/Button/index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Modal',
  component: Modal,
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
    const modalRef = React.useRef({});
    const flexRef = React.useRef({});
    const [open, setOpen] = React.useState(false);
    React.useEffect(() => {
      console.log(modalRef, 'modalRef');
      console.log(flexRef, 'flexRef');
    }, []);
    const showModal = () => {
      modalRef.current.open();
    };
    return (
      <div>
        <Button type="primary" onClick={showModal}>
          Open Modal
        </Button>
        <Flex ref={flexRef}>
          <Input ref={modalRef} />
          {/* <Modal title="Basic Modal" ref={modalRef} defaultOpen>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal> */}
        </Flex>
      </div>
    );
  },
  args: {
    color: 'magenta',
    children: 'Tag',
  },
};
