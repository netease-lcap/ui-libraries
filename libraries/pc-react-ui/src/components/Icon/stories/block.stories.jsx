import React from 'react';
import { Icon } from '../index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Icon/blocks',
  component: Icon,
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
    return (
      <Icon
        name="RiNeteaseCloudMusicLine"
        key="component-e1e577afa6af4443a311a1d7085a6b60"
      />
    );
  },
  args: {
    color: 'magenta',
    name: 'RiArrowRightCircleFill',
    // name: '//minio-api.codewave-dev.163yun.com/lowcode-static/user/defaulttenant/1711352646423_1711101097723_1710173501157_%E4%B8%89%E7%82%B9.svg',
  },
};
