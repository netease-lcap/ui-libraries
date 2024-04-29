import React from 'react';
import { Breadcrumb, BreadcrumbItem } from '../index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Breadcrumb',
  component: Breadcrumb,
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
  render: (...arg) => {
    const items = [
      [
        {
          title: 'Home',
        },
        {
          title: <a href="">Application Center</a>,
        },
      ],
    ];
    return (
      <Breadcrumb
        items={[
          {
            title: 'Home',
          },
          {
            title: <a href="">Application Center</a>,
          },
          {
            title: <a href="">Application List</a>,
          },
          {
            title: 'An Application',
            onClick: (e) => {
              console.log(e, 'e');
            },
          },
        ]}
      />
    );
  },
  args: {
    onDoubleClick: (e) => {
      console.log(1234);
    },
    color: 'magenta',
    auto: true,
    children: 'Tag',
    onClick: (e) => {
      console.log(e, 'e');
    },
    items: [
      [
        {
          title: 'Home',
        },
        {
          title: <a href="">Application Center</a>,
        },
      ],
    ],
  },
};
