<!-- 数据源 -->
<!--  -->
<template>
  <div>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
      :dataSource="dataSource"
    >
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    const dataSource = [
      { value: '1', title: '导航一', icon: 'el-icon-location', type: 'submenu', children: [
        { value: '1-1', title: '选项1', type: 'item' },
        { value: '1-2', title: '选项2', type: 'item' },
        { value: '1-3', title: '选项3', type: 'item' },
        { value: '1-4', title: '选项4', type: 'group', children: [
          { value: '1-4-1', title: '选项1', type: 'item' }
        ] }
      ] },
      { value: '2', title: '导航二', icon: 'el-icon-menu', type: 'item' },
      { value: '3', title: '导航三', icon: 'el-icon-document', disabled: true, type: 'item' },
      { value: '4', title: '导航四', icon: 'el-icon-setting', type: 'item' }
    ];
    return {
      isCollapse: true,
      dataSource,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
