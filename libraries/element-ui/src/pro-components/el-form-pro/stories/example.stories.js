import {
  Space,
} from '@element-pro';
import ElFormPro from '../index';

export default {
  id: 'el-form-pro-examples',
  title: 'Pro组件列表/Form 表单/示例',
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
    <el-form-input-pro help="这里可以展示一段说明文字" name="account" :value.sync="inputValue" placeholder="请输入用户名">
      <template #label>
        <el-text text="用户名" />
      </template>
    </el-form-input-pro>

    <el-form-input-number-pro name="age" :initialValue="10" placeholder="请输入年龄">
      <template #label>
        <el-text text="年龄" />
      </template>
    </el-form-input-number-pro>

    <el-form-cascader-pro name="region" placeholder="请选择籍贯" :dataSource="regionOptions" clearable filterable>
      <template #label>
        <el-text text="籍贯" />
      </template>
    </el-form-cascader-pro>

    <el-form-tree-select-pro name="tree" placeholder="请选择籍贯" :dataSource="regionOptions" clearable filterable>
      <template #label>
        <el-text text="树选择" />
      </template>
    </el-form-tree-select-pro>

    <el-form-input-pro v-if="toggle" name="password" type="password" :value.sync="password"  placeholder="请输入密码">
      <template #label>
        <el-text text="密码" />
      </template>
    </el-form-input-pro>
    <el-form-input-pro name="email" placeholder="请输入邮箱">
      <template #label>
        <el-text text="邮箱" />
      </template>
    </el-form-input-pro>
    <el-form-date-picker-pro name="range" :useRangeValue="true" startFieldName="startDate" endFieldName="endDate" :range="true" :startValue.sync="startDate" :endValue.sync="endDate">
      <template #label>
        <el-text text="日期区间" />
      </template>
    </el-form-date-picker-pro>
    <el-form-radio-group-pro name="gender" initialValue="male">
      <template #label>
        <el-text text="性别" />
      </template>
      <el-radio-pro value="male">男</el-radio-pro>
      <el-radio-pro value="female">女</el-radio-pro>
    </el-form-radio-group-pro>
    <el-form-checkbox-group-pro name="course" :dataSource="courseOptions">
      <template #label>
        <el-text text="课程" />
      </template>
      <template #item="current">
        {{ current.item.label }}
      </template>
    </el-form-checkbox-group-pro>
    <el-form-rate-pro name="rate" :initialValue="2">
      <template #label>
        <el-text text="评分" />
      </template>
    </el-form-rate-pro>
    <el-form-slider-pro name="slider">
      <template #label>
        <el-text text="滑块" />
      </template>
    </el-form-slider-pro>
      <el-form-switch-pro name="switch">
      <template #label>
        <el-text text="开关" />
      </template>
    </el-form-switch-pro>
    <el-form-select-pro name="college" class="demo-select-base" clearable filterable placeholder="请选择所在学院">
     <template #label>
        <el-text text="学院" />
      </template>
      <el-option-pro v-for="(item, index) in options" :value="item.value" :label="item.label" :key="index">
        {{ item.label }}
      </el-option-pro>
    </el-form-select-pro>

    <el-form-date-picker-pro name="date">
     <template #label>
        <el-text text="入学日期" />
      </template>
    </el-form-date-picker-pro>
     <el-form-time-picker-pro name="time">
     <template #label>
        <el-text text="入学时间" />
      </template>
    </el-form-time-picker-pro>
    <el-form-input-pro name="content.url" placeholder="请输入个人网站地址">
      <template #label>
        <el-text text="个人网站" />
      </template>
    </el-form-input-pro>
    <el-form-textarea-pro help="请用一句话介绍自己" name="description" placeholder="请用一句话介绍自己">
      <template #label>
        <el-text text="个人简介" />
      </template>
    </el-form-textarea-pro>
    <el-form-item-pro label="兴趣爱好" name="hobby">
      <el-tree-select-pro
        filterable
        :data-source="hobbyOptions"
        placeholder="请选择你的兴趣爱好"
      ></el-tree-select-pro>
    </el-form-item-pro>

    <el-form-transfer-pro name="transfer" :dataSource="options" textField="label" valueField="value">
     <template #label>
        <el-text text="学院" />
      </template>
    </el-form-transfer-pro>


    <el-form-item-pro style="margin-left: 100px">
      <el-space size="10px">
        <el-button theme="primary" @click="onSubmit">提交</el-button>
        <el-button theme="default" variant="base" @click="reset">重置</el-button>
        <el-button theme="default" variant="base" @click="handleClear">清空校验结果</el-button>
      </el-space>
    </el-form-item-pro>
  </el-form-pro>`,
  }),
};
