<template>
  <transition name="el-fade-in">
    <div
      @click.stop="handleClick"
      :style="{
        'right': styleRight,
        'bottom': styleBottom
      }"
      class="el-backtop">
      <slot>
        <el-icon name="caret-top"></el-icon>
      </slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ElBacktopDesigner',

  props: {
    visibilityHeight: {
      type: Number,
      default: 200
    },
    target: [String],
    right: {
      type: Number,
      default: 40
    },
    bottom: {
      type: Number,
      default: 40
    }
  },

  computed: {
    styleBottom() {
      return `${this.bottom}px`;
    },
    styleRight() {
      return `${this.right}px`;
    }
  },
};
</script>
