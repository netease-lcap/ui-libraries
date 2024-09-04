<template>
  <transition name="el-message-fade">
    <div
      v-bind="$attrs"
      :class="[
        'el-message',
        type ? `el-message--${type}` : '',
        center ? 'is-center' : '',
        showClose ? 'is-closable' : '',
        customClass,
      ]"
      :style="positionStyle"
      v-show="visible"
      role="alert">
      <i v-if="!icon" :class="typeClass"></i>
      <div class="el-message__content">
        <el-icon v-if="icon" :name="icon" class="el-message__icon" />
        <slot></slot>
      </div>
      <i
        v-if="showClose"
        class="el-message__closeBtn el-icon-close"></i>
    </div>
  </transition>
</template>

<script>
import ElIcon from '../el-icon/icon';
import Message from './message';
const typeMap = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error',
};

export default {
  name: 'ElMessageDesigner',
  components: {
    ElIcon,
  },
  props: {
    ...Message.props,
    static: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    typeClass() {
      return this.type
        ? `el-message__icon el-icon-${typeMap[this.type]}`
        : '';
    },
    positionStyle() {
      if (this.static) {
        return {
          position: 'relative',
          left: 'auto',
          top: 'auto',
          transform: 'none',
          zIndex: 7000,
        };
      }
      return {
        top: `${this.offset}px`,
        zIndex: 7000,
      };
    },
  },
};
</script>
