import React from 'react';
import { Upload } from '../index';
import { Button, Icon } from '@/index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Upload/blocks',
  component: Upload,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const 单个文件按钮 = {
  render: () => {
    return (
      <Upload>
        <Button icon={<Icon iconType="UploadOutlined" />} children="上传" />
      </Upload>
    );
  },
};
// export const 单文件卡片 = {
//   render: () => {
//     return (
//       <Upload action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188" listType="picture-card">
//         <button style={{ border: 0, background: 'none' }} type="button">
//           <Icon iconType="PlusOutlined" />
//           <div style={{ marginTop: 8 }}>Upload</div>
//         </button>
//       </Upload>
//     );
//   },
// };

export const 多图片按钮 = {
  render: () => {
    return (
      <Upload action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188" listType="picture">
        <Button icon={<Icon iconType="UploadOutlined" />} children="上传" />
      </Upload>
    );
  },
};
