# VanForm 表单

## 介绍

用于数据录入、校验、提交，包含复选框、单选框、输入框、下拉选择框等元素。

## 引入

```js
import { VanForm } from '@lcap/vant';
```

## 代码演示

### 基础用法

在表单中，每个 Field 代表一个表单项，使用 Field 的 rules 属性可以定义校验规则。

```html
<van-form @submit="onSubmit">
  <van-field
    v-model="username"
    name="用户名"
    label="用户名"
    placeholder="用户名"
    :rules="[{ required: true, message: '请填写用户名' }]"
  />
  <van-field
    v-model="password"
    type="password"
    name="密码"
    label="密码"
    placeholder="密码"
    :rules="[{ required: true, message: '请填写密码' }]"
  />
  <div style="margin: 16px;">
    <van-button round block type="primary" native-type="submit">
      提交
    </van-button>
  </div>
</van-form>
```

```js
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values);
    },
  },
};
```

## API

### Form Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label-width | 表单项 label 宽度，默认单位为 `px` | _number \| string_ | `6.2em` |
| label-align | 表单项 label 对齐方式，可选值为 `center` `right` | _string_ | `left` |
| input-align | 输入框对齐方式，可选值为 `center` `right` | _string_ | `left` |
| error-message-align | 错误提示文案对齐方式，可选值为 `center` `right` | _string_ | `left` |
| validate-trigger | 表单校验触发时机，可选值为 `onChange`、`onSubmit` | _string_ | `onBlur` |
| colon | 是否在 label 后面添加冒号 | _boolean_ | `false` |
| disabled | 是否禁用表单中的所有输入框 | _boolean_ | `false` |
| readonly | 是否将表单中的所有输入框设置为只读 | _boolean_ | `false` |
| scroll-to-error | 是否在某一项校验不通过时停止剩下的校验，并滚动到该表单项 | _boolean_ | `false` |
| show-error | 是否显示错误提示 | _boolean_ | `true` |
| show-error-message | 是否在校验不通过时标红输入框 | _boolean_ | `true` |
| submit-on-enter | 是否在按下回车键时提交表单 | _boolean_ | `true` |

### Form Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| submit | 提交表单且验证通过后触发 | _values: object_ |
| failed | 提交表单且验证不通过后触发 | _errorFields: object, values: object_ |

### Form 方法

通过 ref 可以获取到 Form 实例并调用实例方法。

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| submit | 提交表单，与点击提交按钮的效果等价 | - | - |
| validate | 验证表单，支持传入 name 来验证单个表单项 | _name?: string_ | _Promise_ |
| resetValidation | 重置表单项的验证提示，支持传入 name 来重置单个表单项 | _name?: string_ | - |
| getValidationStatus | 获取所有表单项的校验状态 | - | _object_ |
| scrollToField | 滚动到对应表单项的位置 | _name: string_ | - |

### Form Slots

| 名称 | 说明 |
| --- | --- |
| default | 表单内容 | 