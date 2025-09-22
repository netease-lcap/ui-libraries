<!-- 排列方向和排列数示例 -->
<template>
  <div class="layout-demo">
    <h2>单选组布局示例</h2>
    
    <div class="demo-section">
      <h3>交互式布局测试</h3>
      <div class="controls">
        <div class="control-item">
          <label>排列方向：</label>
          <select v-model="interactiveDirection" class="control-select">
            <option value="horizontal">水平</option>
            <option value="vertical">垂直</option>
          </select>
        </div>
        <div class="control-item" v-if="interactiveDirection === 'horizontal'">
          <label>每行列数：</label>
          <input 
            v-model.number="interactiveColumn" 
            type="number" 
            min="1" 
            class="control-input"
          />
        </div>
      </div>
      <el-radio-group-pro 
        :direction="interactiveDirection" 
        :column="interactiveColumn"
        :value.sync="interactiveValue" 
        @change="onInteractiveChange">
        <el-radio-pro value="item1">选项一</el-radio-pro>
        <el-radio-pro value="item2">选项二</el-radio-pro>
        <el-radio-pro value="item3">选项三</el-radio-pro>
        <el-radio-pro value="item4">选项四</el-radio-pro>
        <el-radio-pro value="item5">选项五</el-radio-pro>
        <el-radio-pro value="item6">选项六</el-radio-pro>
        <el-radio-pro value="item7">选项七</el-radio-pro>
        <el-radio-pro value="item8">选项八</el-radio-pro>
      </el-radio-group-pro>
      <p>选中值: {{ interactiveValue }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutDemo',
  data() {
    return {
      interactiveDirection: 'horizontal',
      interactiveColumn: 3,
      interactiveValue: 'item1',
    };
  },
  methods: {
    onInteractiveChange(value) {
      console.log('Interactive radio changed:', value);
    },
  },
};
</script>

<style scoped>
.controls {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.control-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.control-select {
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 100px;
}

.control-input {
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 80px;
  text-align: center;
}
</style>
