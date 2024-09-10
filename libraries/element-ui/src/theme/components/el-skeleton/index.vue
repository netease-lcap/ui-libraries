<template>
  <div>
    <div style="width: 240px">
      <el-skeleton style="width: 240px" :loading="loading" animated>
        <template slot="template">
          <el-skeleton-item
            variant="image"
            style="width: 240px; height: 240px" />
          <el-skeleton-item variant="h3" style="width: 50%" />
          <el-skeleton-item variant="text" style="margin-right: 16px" />
          <el-skeleton-item variant="text" style="width: 30%" />
        </template>
      </el-skeleton>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: true,
    };
  },
};
</script>
