import ElRadio from '../index';
import ExampleDemo1 from '../demos/example-demo1.vue';
import ExampleDemo2 from '../demos/example-demo2.vue';
import ExampleDemo3 from '../demos/example-demo3.vue';

export default {
  id: 'el-radio-examples',
  title: '组件列表/Radio 单选框/示例',
  component: ElRadio,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
};

/*  基础示例 */
export const Example1 = {
  name: '基础示例',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo1,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  数据源 */
export const Example2 = {
  name: '数据源',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo2,
    },
    template: '<example-demo></example-demo>',
  }),
};

export const Example3 = {
  name: '不同类型',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo3,
    },
    template: '<example-demo></example-demo>',
  }),
};

export const Example4 = {
  name: '事件',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo3,
    },
    template: `
    <el-radio-group 
      data-nodepath="d4eecd218cba45de8271943cb5ba67be" 
      key="component-d4eecd218cba45de8271943cb5ba67be" 
      valueField="" textField="" type="button"  >
        <el-radio value="value" key="component-f1bef39c136247d098169e4650ee5e36"  >
          <HoistNodePath nodePath="f1bef39c136247d098169e4650ee5e36" topSelector="label.el-radio"  ></HoistNodePath>
          <el-text data-nodepath="98092dec5dca4cb6b26b2f9078132171" text="单选项" 
          key="component-98092dec5dca4cb6b26b2f9078132171" data-editable="true" data-hover-tip="双击可编辑文本"  ></el-text>
        </el-radio>
          <template #item={...argus}>
              <div data-nodepath="5a3a6bf5258047bcb9dc02af3ec1a235"  ><EmptySlot data-emptyslot-nodepath="5a3a6bf5258047bcb9dc02af3ec1a235"  ></EmptySlot></div>
          </template>
    </el-radio-group>
      `,
  }),
};
