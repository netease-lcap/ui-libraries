import Component from '../index';
import ExampleDemo1 from '../demos/example-demo1.vue';
import ExampleDemo2 from '../demos/example-demo2.vue';
import ExampleDemo3 from '../demos/example-demo3.vue';
import ExampleDemo4 from '../demos/example-demo4.vue';
import ExampleDemo5 from '../demos/example-demo5.vue';
import ExampleDemo6 from '../demos/example-demo6.vue';

export default {
  id: 'el-date-picker-examples',
  title: '组件列表/DATE PICKER 日期选择器/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

/*  以「日」为基本单位，基础的日期选择控件 */
export const Example1 = {
  name: '选择日',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo1,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  通过扩展基础的日期选择，可以选择周、月、年或多个日期 */
export const Example2 = {
  name: '其他日期单位',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo2,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  可在一个选择器中便捷地选择一个时间范围 */
export const Example3 = {
  name: '选择日期范围',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo3,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  可在一个选择器中便捷地选择一个月份范围 */
export const Example4 = {
  name: '选择月份范围',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo4,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  使用`format`指定输入框的格式；使用`value-format`指定绑定值的格式。 默认情况下，组件接受并返回`Date`对象。以下为可用的格式化字符串，以 UTC 2017年1月2日 03:04:05 为例： | 格式 | 含义 | 备注 | 举例 | |------|------|------|------|------| | `yyyy` | 年 | | 2017 | | `M`  | 月 | 不补0 | 1 | | `MM` | 月 | | 01 | | `W`  | 周 | 仅周选择器的 `format` 可用；不补0 | 1 | | `WW` | 周 | 仅周选择器的 `format` 可用 | 01 | | `d`  | 日 | 不补0 | 2 | | `dd` | 日 | | 02 | | `H`  | 小时 | 24小时制；不补0 | 3 | | `HH` | 小时 | 24小时制 | 03 | | `h`  | 小时 | 12小时制，须和 `A` 或 `a` 使用；不补0 | 3 | | `hh` | 小时 | 12小时制，须和 `A` 或 `a` 使用 | 03 | | `m`  | 分钟 | 不补0 | 4 | | `mm` | 分钟 | | 04 | | `s`  | 秒 | 不补0 | 5 | | `ss` | 秒 | | 05 | | `A`  | AM/PM | 仅 `format` 可用，大写 | AM | | `a`  | am/pm | 仅 `format` 可用，小写 | am | | `timestamp` | JS时间戳 | 仅 `value-format` 可用；组件绑定值为`number`类型 | 1483326245000 | | `[MM]` | 不需要格式化字符 | 使用方括号标识不需要格式化的字符 (如  [A] [MM])  | MM | */
export const Example5 = {
  name: '日期格式',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo5,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  在选择日期范围时，指定起始日期和结束日期的默认时刻。 */
export const Example6 = {
  name: '默认显示日期',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo6,
    },
    template: '<example-demo></example-demo>',
  }),
};
