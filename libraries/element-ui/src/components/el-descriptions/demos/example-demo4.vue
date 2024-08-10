<!-- 自定义样式 -->
<!--  -->
<template>
  <div>
    <el-descriptions title="自定义样式列表" :column="3" border>
      <el-descriptions-item
        label="用户名"
        label-class-name="my-label"
        content-class-name="my-content"
        >kooriookami</el-descriptions-item
      >
      <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
      <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
      <el-descriptions-item label="备注">
        <el-tag size="small">学校</el-tag>
      </el-descriptions-item>
      <el-descriptions-item
        label="联系地址"
        :contentStyle="{ 'text-align': 'right' }"
        >江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item
      >
    </el-descriptions>
  </div>
</template>

<style>
.my-label {
  background: #e1f3d8;
}

.my-content {
  background: #fde2e2;
}
</style>
