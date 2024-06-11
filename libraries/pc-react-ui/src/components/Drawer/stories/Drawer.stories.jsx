import React from 'react';
import { Drawer } from '../index';
import { Button } from '@/components/Button/index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Drawer',
  component: Drawer,
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
    const modalRef = React.useRef(false);
    // const [ open,setOpen ]=React.useState(false)
    const showModal = () => {
      modalRef.current.open();
    };
    return (
      <div>
        <Button type="primary" onClick={showModal}>
          Open Modal
        </Button>
        <Drawer title="Basic Modal" ref={modalRef} defaultOpen>
          <p key={1}>Some contents...</p>
          <p key={2}>Some contents...</p>
          <p key={3}>Some contents...</p>
        </Drawer>
      </div>
    );
  },
  args: {
    color: 'magenta',
    children: 'Tag',
  },
};
