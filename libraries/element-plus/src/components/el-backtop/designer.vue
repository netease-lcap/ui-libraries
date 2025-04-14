<template>
  <transition name="el-backtop-fade-in">
    <div
      :style="{
        right: styleRight,
        bottom: styleBottom
      }"
      class="el-backtop"
    >
      <slot>
        <el-icon-plus class="el-backtop__icon"><caret-top /></el-icon-plus>
      </slot>
    </div>
  </transition>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { ElIcon as ElIconPlus} from 'element-plus';
  import { CaretTop } from '@element-plus/icons-vue'

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
  