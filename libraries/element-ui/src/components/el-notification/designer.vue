<template>
  <transition name="el-notification-fade">
    <div
      :class="['el-notification', horizontalClass]"
      v-show="visible"
      :style="positionStyle"
      role="alert">
      <i
        class="el-notification__icon"
        :class="[typeClass, iconClass]"
        v-if="type || iconClass">
      </i>
      <div
        class="el-notification__group"
        :class="{ 'is-with-icon': typeClass || iconClass }">
        <h2 class="el-notification__title" v-text="title"></h2>
        <div class="el-notification__content">
          <slot></slot>
        </div>
        <div
          class="el-notification__closeBtn el-icon-close"
          v-if="showClose"
        ></div>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
import Notification from './notification';
let typeMap = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error',
};

export default {
  name: 'ElNotificationDesigner',
  props: {
    ...Notification.props,
    static: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    typeClass() {
      return this.type && typeMap[this.type]
        ? `el-icon-${typeMap[this.type]}`
        : '';
    },
    iconClass() {
      return this.icon ? `el-icon-${this.icon}` : '';
    },
    horizontalClass() {
      return this.position.indexOf('right') > -1 ? 'right' : 'left';
    },

    verticalProperty() {
      return /^top-/.test(this.position) ? 'top' : 'bottom';
    },

    positionStyle() {
      if (this.static) {
        return {
          position: 'relative',
          left: 'auto',
          right: 'auto',
          top: 'auto',
          bottom: 'auto',
          transform: 'none',
          zIndex: 7000,
        };
      }
      return {
        [this.verticalProperty]: `${this.offset}px`,
        zIndex: 7000,
      };
    },
  },
};
</script>
