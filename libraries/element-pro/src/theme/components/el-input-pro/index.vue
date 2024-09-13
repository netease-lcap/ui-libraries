<template>
  <div>
    <el-radio-group-pro v-model="size">
      <el-radio-pro value="small">小尺寸</el-radio-pro>
      <el-radio-pro value="medium">中尺寸(默认)</el-radio-pro>
      <el-radio-pro value="large">大尺寸</el-radio-pro>
    </el-radio-group-pro>
    <div class="inputs-wrap">
      <el-input-pro disabled placeholder="禁用状态" :size="size" />
      <el-input-pro readonly placeholder="只读状态" :size="size" />
      <el-input-pro placeholder="默认状态-可清空" clearable :size="size" tips="这是普通文本提示" />
      <el-input-pro status="success" type="password" placeholder="成功状态-密码输入框" :size="size" tips="校验通过文本提示" />
      <el-input-pro status="warning" placeholder="警告状态-带提示文字的输入框" :size="size" tips="校验不通过文本提示" />
      <el-input-pro v-model="input1" :maxlength="5" show-limit-number allow-input-over-max placeholder="内置字数限制，字数超出时报错"
        :tips="errorTips" :status="errorTips ? 'error' : ''" @validate="onValidate" />
      <el-input-pro label="价格：" type="number" suffix="元" placeholder="带提示文字的输入框" :size="size" />
      <el-input-group-pro separate>
        <el-input-pro :style="{ width: '100px' }" placeholder="0731" />
        <el-input-pro placeholder="12345677" />
      </el-input-group-pro>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      size: 'medium',
      input1: '',
      errorTips: ''
    }
  },
  methods: {
    onValidate({ error }) {
      this.errorTips = error ? '输入内容长度不允许超过 5 个字' : '';
    },
  },
}
</script>
<style scoped>
.inputs-wrap {
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-top: 20px;
}
</style>
