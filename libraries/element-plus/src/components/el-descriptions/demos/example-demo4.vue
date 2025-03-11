<!-- 自定义样式 -->
<!--  -->
<template>
  <div>
    <el-descriptions title="自定义样式列表" :column="3" border>
      <el-descriptions-item label-class-name="my-label" content-class-name="my-content">
        <template slot="label">
          <i class="el-icon-user"></i>
          用户名
        </template>
        kooriookami
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          手机号
        </template>
        18100000000
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          居住地
        </template>
        苏州市
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          备注
        </template>
        <el-tag size="small">学校</el-tag>
      </el-descriptions-item>
      <el-descriptions-item :contentStyle="{ 'text-align': 'right' }">
        <template slot="label">
          <i class="el-icon-office-building"></i>
          联系地址
        </template>
        江苏省苏州市吴中区吴中大道 1188 号
      </el-descriptions-item>
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
