<template>
  <div class="el-list-components__item" :style="comStyle" vusion-slot-name="default">
    <slot :item="item" :index="index"></slot>
  </div>
</template>

<script>
export default {
  name: 'el-list-components-item',
  components: {},
  props: {
    item: {
      type: [Object, String, Number],
    },
    index: {
      type: [Object, String, Number],
    },
    column: {
      type: Number,
    },
    equalWidth: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    comStyle() {
      if (this.column && this.equalWidth) {
        const num = this.column;
        const width = 100 / num;
        return {
          width: width + '%',
        };
      }
      return {};
    },
  },
  watch: {},
  methods: {},
};
</script>
<style>
.el-list-components__item {
}
</style>
