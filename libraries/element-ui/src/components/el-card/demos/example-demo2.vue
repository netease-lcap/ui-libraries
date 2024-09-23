<!-- 简单卡片 -->
<!--  卡片可以只有内容区域。 -->
<template>
  <div>
    <el-card class="box-card">
      <div v-for="o in 4" :key="o" class="text item">
        {{ '列表内容 ' + o }}
      </div>
    </el-card>
  </div>
</template>

<style>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
</style>
