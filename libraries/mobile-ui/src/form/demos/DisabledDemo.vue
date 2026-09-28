<template>
  <demo-block :title="t('disabledDemo')">
    <div style="margin-bottom: 16px; padding: 0 16px;">
      <van-switch v-model="formDisabled">
        <template #checked>{{ t('formDisabled') }}</template>
        <template #unchecked>{{ t('formEnabled') }}</template>
      </van-switch>
    </div>
    <van-form :disabled="formDisabled">
      <van-field name="input" :label="t('input')">
        <template #input>
          <van-linear-layout>
            <van-fieldinput v-model="formData.input" placeholder="请输入内容" clearable></van-fieldinput>
          </van-linear-layout>
        </template>
      </van-field>

      <van-field name="textarea" :label="t('textarea')">
        <template #input>
          <van-fieldtextarea v-model="formData.textarea" placeholder="请输入内容" clearable></van-fieldtextarea>
        </template>
      </van-field>

      <van-field name="stepper" :label="t('stepper')">
        <template #input>
          <van-stepper v-model="formData.stepper" />
        </template>
      </van-field>

      <van-field name="switch" :label="t('switch')">
        <template #input>
          <van-switch v-model="formData.switch" size="20" />
        </template>
      </van-field>

      <van-field name="radio" :label="t('radio')">
        <template #input>
          <van-radio-group v-model="formData.radio" direction="horizontal">
            <van-radio name="1">{{ t('radio') }} 1</van-radio>
            <van-radio name="2">{{ t('radio') }} 2</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field name="checkbox" :label="t('checkbox')">
        <template #input>
          <van-checkbox-group v-model="formData.checkbox" direction="horizontal">
            <van-checkbox name="1" shape="square">{{ t('checkbox') }} 1</van-checkbox>
            <van-checkbox name="2" shape="square">{{ t('checkbox') }} 2</van-checkbox>
          </van-checkbox-group>
        </template>
      </van-field>

      <van-field name="picker" :label="t('picker')">
        <template #input>
          <van-picker v-model="formData.picker" :columns="pickerColumns" title="请选择"></van-picker>
        </template>
      </van-field>

      <van-field name="datetimePicker" :label="t('datetimePicker')">
        <template #input>
          <van-datetime-picker v-model="formData.datetimePicker" type="datetime" title="请选择日期时间"></van-datetime-picker>
        </template>
      </van-field>

      <van-field name="rate" :label="t('rate')">
        <template #input>
          <van-rate v-model="formData.rate" />
        </template>
      </van-field>

      <van-field name="slider" :label="t('slider')">
        <template #input>
          <van-slider v-model="formData.slider" />
        </template>
      </van-field>

      <van-field name="uploader" :label="t('uploader')">
        <template #input>
          <van-uploader v-model="formData.uploader" max-count="2" />
        </template>
      </van-field>

      <div style="margin: 16px 16px 0">
        <van-button round block type="info" native-type="submit">
          {{ t('submit') }}
        </van-button>
      </div>
    </van-form>
  </demo-block>
</template>

<script>
export default {
  i18n: {
    'zh-CN': {
      input: '输入框',
      textarea: '多行输入框',
      stepper: '步进器',
      switch: '开关',
      radio: '单选框',
      checkbox: '复选框',
      picker: '选择器',
      datetimePicker: '日期时间选择器',
      rate: '评分',
      slider: '滑块',
      uploader: '文件上传',
      submit: '提交',
      disabledDemo: '全局禁用',
      formDisabled: '表单已禁用',
      formEnabled: '表单已启用',
    },
    'en-US': {
      input: 'Input',
      textarea: 'Textarea',
      stepper: 'Stepper',
      switch: 'Switch',
      radio: 'Radio',
      checkbox: 'Checkbox',
      picker: 'Picker',
      datetimePicker: 'Datetime Picker',
      rate: 'Rate',
      slider: 'Slider',
      uploader: 'Uploader',
      submit: 'Submit',
      disabledDemo: 'Global Disabled',
      formDisabled: 'Form Disabled',
      formEnabled: 'Form Enabled',
    },
  },

  data() {
    return {
      formDisabled: false,
      formData: {
        input: '',
        textarea: '',
        stepper: 1,
        switch: false,
        radio: '',
        checkbox: [],
        picker: '',
        datetimePicker: '',
        rate: 3,
        slider: 50,
        uploader: [],
      },
      pickerColumns: [
        { text: '选项1', value: 'option1' },
        { text: '选项2', value: 'option2' },
        { text: '选项3', value: 'option3' },
      ],
    };
  },

  methods: {
    onSubmit(values) {
      console.log('submit', values);
    },
  },
};
</script>

