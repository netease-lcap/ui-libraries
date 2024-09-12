<template>
  <div>
    <el-radio-group-pro v-model="size">
      <el-radio-pro value="small">小尺寸</el-radio-pro>
      <el-radio-pro value="medium">中尺寸(默认)</el-radio-pro>
      <el-radio-pro value="large">大尺寸</el-radio-pro>
    </el-radio-group-pro>
    <div style="margin: 10px 0 20px 0;">
      <el-checkbox-pro v-model="disabled">是否禁用</el-checkbox-pro>
    </div>
    <el-form-pro>
      <el-form-item-pro label="无按钮">
        <el-input-number-pro :disabled="disabled" :size="size" v-model="value4" suffix="kg"
          theme="normal"></el-input-number-pro>
      </el-form-item-pro>
      <el-form-item-pro label="上下箭头">
        <el-input-number-pro :disabled="disabled" :size="size" v-model="value5" suffix="kg"
          theme="column"></el-input-number-pro>
      </el-form-item-pro>
      <el-form-item-pro label="加减按钮">
        <el-input-number-pro :disabled="disabled" :size="size" v-model="value6" 
          theme="row"></el-input-number-pro>
      </el-form-item-pro>
      <!-- <el-form-item-pro label="成功提示">
        <el-input-number-pro :disabled="disabled" :size="size" v-model="value7" status="success"
          :inputProps="{ tips: '校验通过文本提示' }"></el-input-number-pro>
      </el-form-item-pro>
      <el-form-item-pro label="警告提示">
        <el-input-number-pro :disabled="disabled" :size="size" v-model="value8" status="warning"
          :inputProps="{ tips: '校验不通过文本提示' }"></el-input-number-pro>
      </el-form-item-pro>
      <el-form-item-pro label="错误提示">
        <el-input-number-pro :disabled="disabled" :size="size" v-model="value9" status="error"
          :inputProps="{ tips: '校验存在严重问题文本提示' }"></el-input-number-pro>
      </el-form-item-pro> -->
    </el-form-pro>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value4: 3,
      value5: 3,
      value6: 3,
      value7: 3,
      value8: 3,
      value9: 3,
      size: 'medium',
      disabled: false
    }
  },
}
</script>