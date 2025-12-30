<!-- 全局禁用 -->
<template>
  <div>
    <div style="margin-bottom: 16px;">
      <u-switch v-model="formDisabled">
        <template #checked>表单已禁用</template>
        <template #unchecked>表单已启用</template>
      </u-switch>
    </div>
    <u-form :disabled="formDisabled" gap="large">
      <u-form-item label="输入框">
        <u-input v-model="formData.input" placeholder="请输入内容"></u-input>
      </u-form-item>
      <u-form-item label="多行输入框">
        <u-textarea v-model="formData.textarea" placeholder="请输入内容" :autosize="true"></u-textarea>
      </u-form-item>
      <u-form-item label="数字输入框">
        <u-number-input v-model="formData.numberInput" :min="0" :max="100" :step="1"></u-number-input>
      </u-form-item>
      <u-form-item label="组合滑块">
        <u-combo-slider v-model="formData.comboSlider" :min="0" :max="100" :step="1" unit="Mbps"></u-combo-slider>
      </u-form-item>
      <u-form-item label="选择器">
        <u-select v-model="formData.select" placeholder="请选择">
          <u-select-item value="option1">选项1</u-select-item>
          <u-select-item value="option2">选项2</u-select-item>
          <u-select-item value="option3">选项3</u-select-item>
        </u-select>
      </u-form-item>
      <u-form-item label="日期选择器">
        <u-date-picker v-model="formData.date" placeholder="请选择日期"></u-date-picker>
      </u-form-item>
      <u-form-item label="时间选择器">
        <u-time-picker v-model="formData.time" placeholder="请选择时间"></u-time-picker>
      </u-form-item>
      <u-form-item label="日期时间选择器">
        <u-date-time-picker v-model="formData.datetime" placeholder="请选择日期时间"></u-date-time-picker>
      </u-form-item>
      <u-form-item label="级联选择器">
        <u-cascader v-model="formData.cascader" :data="cascaderData" placeholder="请选择"></u-cascader>
      </u-form-item>
      <u-form-item label="开关">
        <u-switch v-model="formData.switch"></u-switch>
      </u-form-item>
      <u-form-item label="单选框组">
        <u-radios v-model="formData.radio">
          <u-radio label="radio1">选项1</u-radio>
          <u-radio label="radio2">选项2</u-radio>
          <u-radio label="radio3">选项3</u-radio>
        </u-radios>
      </u-form-item>
      <u-form-item label="复选框组">
        <u-checkboxes v-model="formData.checkbox">
          <u-checkbox label="check1">选项1</u-checkbox>
          <u-checkbox label="check2">选项2</u-checkbox>
          <u-checkbox label="check3">选项3</u-checkbox>
        </u-checkboxes>
      </u-form-item>
      <u-form-item label="上传组件">
        <u-uploader url="/api/upload" :value="formData.upload">
          <u-button color="primary" icon="upload">上传</u-button>
        </u-uploader>
      </u-form-item>
      <u-form-item>
        <u-button color="primary">提交</u-button>
        <u-button>重置</u-button>
      </u-form-item>
    </u-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formDisabled: false,
      formData: {
        input: '',
        textarea: '',
        numberInput: 0,
        comboSlider: 50,
        select: '',
        date: '',
        time: '',
        datetime: '',
        cascader: '',
        switch: false,
        radio: '',
        checkbox: [],
        upload: [],
      },
      cascaderData: [
        {
          text: '选项1',
          value: 'option1',
          children: [
            { text: '子选项1-1', value: 'option1-1' },
            { text: '子选项1-2', value: 'option1-2' },
          ],
        },
        {
          text: '选项2',
          value: 'option2',
          children: [
            { text: '子选项2-1', value: 'option2-1' },
            { text: '子选项2-2', value: 'option2-2' },
          ],
        },
      ],
    };
  },
};
</script>

