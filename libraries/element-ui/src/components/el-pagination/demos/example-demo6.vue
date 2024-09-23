<!-- 当只有一页时隐藏分页 -->
<!--  当只有一页时，通过设置 `hide-on-single-page` 属性来隐藏分页。 -->
<template>
  <div>
    <div>
      <el-switch v-model="value"> </el-switch>
      <el-pagination
        :hide-on-single-page="value"
        :total="5"
        layout="prev, pager, next">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: false,
    };
  },
};
</script>
