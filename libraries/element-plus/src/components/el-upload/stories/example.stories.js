import Component from '../index';
import ExampleDemo from '../demos/exampleDemo.vue';

export default {
  id: 'el-upload-examples',
  title: '组件列表/upload 上传/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

export const Example1 = {
  name: '点击上传',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo,
    },
    template: '<example-demo></example-demo>',
  }),
};

export const Example2 = {
  name: '拖拽上传',
  render: () => ({
    template: `<el-upload
      class="upload-demo"
      drag
      action="/upload"
      multiple
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500kb
        </div>
      </template>
    </el-upload>`,
  }),
};
