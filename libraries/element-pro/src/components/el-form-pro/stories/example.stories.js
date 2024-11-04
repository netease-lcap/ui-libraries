import {
  Space,
} from '@element-pro';
import ElFormPro from '../index';

export default {
  id: 'el-form-pro-examples',
  title: '组件列表/Form 表单/示例',
  component: ElFormPro,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
};

export const Default = {
  name: '基础示例',
  render: () => ({
    components: {
      ElSpace: Space,
    },
    data() {
      return {
        hobbyOptions: [
          {
            label: '运动',
            value: 'sports',
            children: [
              {
                label: '足球',
                value: 'soccer',
              },
              {
                label: '篮球',
                value: 'basketball',
              },
            ],
          },
          {
            label: '娱乐',
            value: 'entertainment',
            children: [
              {
                label: '电影',
                value: 'movie',
              },
              {
                label: '旅游',
                value: 'trip',
              },
            ],
          },
        ],
        regionOptions: [
          {
            label: '广东',
            value: '1',
            children: [
              {
                label: '深圳',
                value: '1.1',
              },
              {
                label: '广州',
                value: '1.2',
              },
            ],
          },
          {
            label: '湖南',
            value: '2',
            children: [
              {
                label: '长沙',
                value: '2.1',
              },
            ],
          },
        ],
        courseOptions: [
          { label: '语文', value: '1' },
          { label: '数学', value: '2' },
          { label: '英语', value: '3' },
          { label: '体育', value: '4' },
        ],
        options: [
          { label: '计算机学院', value: '1' },
          { label: '软件学院', value: '2' },
          { label: '物联网学院', value: '3' },
        ],
        inputValue: '',
        password: '',
        toggle: true,
        startDate: null,
        endDate: null,
      };
    },
    methods: {
      onReset(...args) {
        console.log('onReset', ...args);
      },
      onSubmit(...args) {
        console.log('onSubmit', ...args);
        console.log(this.$refs.form.getFormData(), this.$data);
        this.toggle = !this.toggle;
      },
      reset() {
        this.$refs.form.resetForm();
      },
      handleClear() {

      },
    },
    template: `<el-form-pro :clearFieldOnDestroy="true" ref="form" @reset="onReset" @submit="onSubmit">
    <el-form-item-pro label="用户名" help="这里可以展示一段说明文字" name="account">
      <el-input-pro :value.sync="inputValue" placeholder="请输入用户名"></el-input-pro>
    </el-form-item-pro>
    <el-form-item-pro label="年龄" name="age" :initial-value="10">
      <el-input-number-pro placeholder="年龄" />
    </el-form-item-pro>
    <el-form-item-pro label="籍贯" name="region">
      <el-cascader-pro placeholder="请选择籍贯" :data-source="regionOptions" clearable filterable />
    </el-form-item-pro>
    <el-form-item-pro v-if="toggle" label="密码" name="password">
      <el-input-pro type="password" :value.sync="password"  placeholder="请输入密码"></el-input-pro>
    </el-form-item-pro>
    <el-form-item-pro label="邮箱" name="email">
      <el-input-pro placeholder="请输入邮箱"></el-input-pro>
    </el-form-item-pro>
    <el-form-item-pro label="日期区间" name="range" :useRangeValue="true" start-field-name="startDate" end-field-name="endDate">
     <el-date-picker-pro :range="true" :startValue.sync="startDate" :endValue.sync="endDate" />
    </el-form-item-pro>
    <el-form-item-pro label="性别" name="gender" initial-value="male">
      <el-radio-group-pro>
        <el-radio-pro value="male">男</el-radio-pro>
        <el-radio-pro value="female">女</el-radio-pro>
      </el-radio-group-pro>
    </el-form-item-pro>
    <el-form-item-pro label="课程" name="course">
      <el-checkbox-group-pro :data-source="courseOptions">
        <template #item="current">
          {{ current.item.label }}
        </template>
      </el-checkbox-group-pro>
    </el-form-item-pro>
    <el-form-item-pro label="学院" name="college">
      <el-select-pro  class="demo-select-base" clearable filterable placeholder="请选择所在学院">
        <el-option-pro v-for="(item, index) in options" :value="item.value" :label="item.label" :key="index">
          {{ item.label }}
        </el-option-pro>
      </el-select-pro>
    </el-form-item-pro>
    <el-form-item-pro
      label="入学时间"
      name="date"
    >
      <el-date-picker-pro></el-date-picker-pro>
    </el-form-item-pro>
    <el-form-item-pro label="个人网站" name="content.url">
      <el-input-pro placeholder="请输入个人网站地址"></el-input-pro>
    </el-form-item-pro>
    <el-form-item-pro label="个人简介" help="请用一句话介绍自己" name="description">
      <el-textarea-pro placeholder="请用一句话介绍自己"></el-textarea-pro>
    </el-form-item-pro>
    <el-form-item-pro label="兴趣爱好" name="hobby">
      <el-tree-select-pro
        filterable
        :data-source="hobbyOptions"
        placeholder="请选择你的兴趣爱好"
      ></el-tree-select-pro>
    </el-form-item-pro>

    <el-form-item-pro style="margin-left: 100px">
      <el-space size="10px">
        <el-button theme="primary" type="submit">提交</el-button>
        <el-button theme="default" variant="base" @click="reset">重置</el-button>
        <el-button theme="default" variant="base" @click="handleClear">清空校验结果</el-button>
      </el-space>
    </el-form-item-pro>
  </el-form-pro>`,
  }),
};
