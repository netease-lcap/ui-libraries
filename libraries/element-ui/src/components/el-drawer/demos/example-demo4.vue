<!-- 多层嵌套 -->
<!--  `Drawer` 组件也拥有多层嵌套的方法 -->
<template>
  <div>
    <el-button @click="drawer = true" type="primary" style="margin-left: 16px">
      点我打开
    </el-button>

    <el-drawer title="我是外面的 Drawer" :visible.sync="drawer" size="50%">
      <div>
        <el-button @click="innerDrawer = true">打开里面的!</el-button>
        <el-drawer
          title="我是里面的"
          :append-to-body="true"
          :before-close="handleClose"
          :visible.sync="innerDrawer">
          <p>_(:зゝ∠)_</p>
        </el-drawer>
      </div>
    </el-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      drawer: false,
      innerDrawer: false,
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm('还有未保存的工作哦确定关闭吗？')
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>
