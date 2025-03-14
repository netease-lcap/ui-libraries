<template>
  <transition name="el-notification-fade">
    <div
      v-show="props.visible"
      :class="['el-notification', props.customClass, horizontalClass]"
      :style="positionStyle"
      role="alert"
    >
      <el-icon v-if="iconComponent" :class="['el-notification__icon', typeClass]">
        <component :is="iconComponent" />
      </el-icon>
      <div class="el-notification__group">
        <h2 class="el-notification__title" v-text="props.title" />
        <div
          class="el-notification__content"
          :style="!!props.title ? undefined : { margin: 0 }"
        >
          <slot></slot>
        </div>
        <el-icon v-if="props.showClose" class="el-notification__closeBtn">
          <Close />
        </el-icon>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Close, SuccessFilled, WarningFilled, CircleCloseFilled, InfoFilled } from '@element-plus/icons-vue';
import { ElIcon } from 'element-plus';
import Notification from './notification';

const typeMap = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error',
};

const TypeComponentsMap = {
  success: SuccessFilled,
  warning: WarningFilled,
  error: CircleCloseFilled,
  info: InfoFilled,
}

// 定义 props
const props = defineProps({
  ...Notification.props,
  static: {
    type: Boolean,
    default: false,
  },
});

// 计算属性
const horizontalClass = computed(() => {
  return props.position.endsWith('right') ? 'right' : 'left';
});

const verticalProperty = computed(() =>
  props.position.startsWith('top') ? 'top' : 'bottom'
)

const positionStyle = computed(() => {
  return {
    [verticalProperty.value]: `${props.offset}px`,
    zIndex: props.zIndex,
    // zIndex: props.zIndex ?? currentZIndex.value,
  }
})
const iconComponent = computed(() => {
  if (!props.type) return props.icon
  return TypeComponentsMap[props.type] || props.icon
})

const typeClass = computed(() => {
  const type = props.type
  return type && TypeComponentsMap[props.type] ? `el-notification--${type}` : ''
})
</script>