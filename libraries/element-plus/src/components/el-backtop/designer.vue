<template>
  <transition name="el-fade-in">
    <div
      :style="{
        right: styleRight,
        bottom: styleBottom
      }"
      class="el-backtop"
    >
      <slot>
        <el-icon-plus name="caret-top" />
      </slot>
    </div>
  </transition>
</template>
  
<script setup lang="ts">
  import { computed } from 'vue';
  import { ElIcon as ElIconPlus} from 'element-plus';
  
  const props = defineProps({
    visibilityHeight: {
      type: Number,
      default: 200
    },
    target: {
      type: String
    },
    right: {
      type: Number,
      default: 40
    },
    bottom: {
      type: Number,
      default: 40
    }
  });
  
  const styleBottom = computed(() => `${props.bottom}px`);
  const styleRight = computed(() => `${props.right}px`);
</script>
  