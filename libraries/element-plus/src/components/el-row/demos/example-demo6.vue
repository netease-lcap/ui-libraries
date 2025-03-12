<!-- 响应式布局 -->
<!--  参照了 Bootstrap 的 响应式设计，预设了五个响应尺寸：`xs`、`sm`、`md`、`lg` 和 `xl`。 -->
<template>
  <div>
    <el-row :gutter="10">
      <el-col :xs="{  offset: 8 }" :sm="{ span: 6, offset: 0 }" :md="{ span: 4, offset: 0 }" :lg="{ span: 3, offset: 0 }" :xl="{ span: 1, offset: 0 }"
        ><div class="grid-content bg-purple"></div
      ></el-col>
      <el-col :xs="{  offset: 4 }" :sm="{ span: 6, offset: 0 }" :md="{ span: 8, offset: 0 }" :lg="{ span: 9, offset: 0 }" :xl="{ span: 11, offset: 0 }"
        ><div class="grid-content bg-purple-light"></div
      ></el-col>
      <el-col :xs="{  offset: 4 }" :sm="{ span: 6, offset: 0 }" :md="{ span: 8, offset: 0 }" :lg="{ span: 9, offset: 0 }" :xl="{ span: 11, offset: 0 }"
        ><div class="grid-content bg-purple"></div
      ></el-col>
      <el-col :xs="{  offset: 8 }" :sm="{ span: 6, offset: 0 }" :md="{ span: 4, offset: 0 }" :lg="{ span: 3, offset: 0 }" :xl="{ span: 1, offset: 0 }"
        ><div class="grid-content bg-purple-light"></div
      ></el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :xsOffset="8" :smSpan="6" :mdSpan="4" :lgSpan="3" :xlSpan="1"
        ><div class="grid-content bg-purple"></div
      ></el-col>
      <el-col :xsOffset="4" :smSpan="6" :mdSpan="8" :lgSpan="9" :xlSpan="11"
        ><div class="grid-content bg-purple-light"></div
      ></el-col>
      <el-col :xsOffset="4" :smSpan="6" :mdSpan="8" :lgSpan="9" :xlSpan="11"
        ><div class="grid-content bg-purple"></div
      ></el-col>
      <el-col :xsOffset="8" :smSpan="6" :mdSpan="4" :lgSpan="3" :xlSpan="1"
        ><div class="grid-content bg-purple-light"></div
      ></el-col>
    </el-row>
  </div>
</template>

<style>
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
