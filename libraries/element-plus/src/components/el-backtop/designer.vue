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
    },
    target: {
      type: String
    },
    right: {
      type: Number,
    },
    bottom: {
      type: Number,
    }
  });
  
  const styleBottom = computed(() => typeof props.bottom === 'number' ? `${props.bottom}px` : 'unset');
  const styleRight = computed(() => typeof props.right === 'number' ? `${props.right}px` : 'unset');
</script>
  