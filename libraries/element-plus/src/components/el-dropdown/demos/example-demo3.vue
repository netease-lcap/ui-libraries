<!-- 触发方式 -->
<!--  可以配置 click 激活或者 hover 激活。 -->
<template>
  <div>
    <el-row class="block-col-2">
      <el-col :span="12">
        <span class="demonstration">hover 激活</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus"
              >狮子头</el-dropdown-item
            >
            <el-dropdown-item icon="el-icon-circle-plus-outline"
              >螺蛳粉</el-dropdown-item
            >
            <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-check"
              >蚵仔煎</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="12">
        <span class="demonstration">click 激活</span>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus"
              >狮子头</el-dropdown-item
            >
            <el-dropdown-item icon="el-icon-circle-plus-outline"
              >螺蛳粉</el-dropdown-item
            >
            <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-check"
              >蚵仔煎</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<style>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
