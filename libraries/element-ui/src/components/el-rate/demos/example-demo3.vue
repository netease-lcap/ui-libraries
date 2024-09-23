<!-- 其它 icon -->
<!--  当有多层评价时，可以用不同类型的 icon 区分评分层级 -->
<template>
  <div>
    <el-rate
      v-model="value"
      :icon-classes="iconClasses"
      void-icon-class="icon-rate-face-off"
      :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
    </el-rate>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: null,
      iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3'], // 等同于 { 2: 'icon-rate-face-1', 4: { value: 'icon-rate-face-2', excluded: true }, 5: 'icon-rate-face-3' }
    };
  },
};
</script>
