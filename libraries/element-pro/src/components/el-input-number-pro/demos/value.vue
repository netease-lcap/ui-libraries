<template>
  <div>
    <h3>双向绑定</h3>
    <div>value: {{ JSON.stringify(value) }}  {{ Object.prototype.toString.call(value) }}</div>
    <el-input-number-pro
      :value.sync="value"
      placeholder="请输入内容"
      clearable
      @change="onChange"
      @clear="onClear"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: undefined
    }
  },
  methods: {
    onChange(event) {
      console.log('onChange', event)
    },
    onClear(event) {
      console.log('onClear', event)
    }
  }
}
</script>
