<template>
  <transition name="el-message-fade">
    <div
      v-bind="$attrs"
      v-show="visible"
      :id="id"
      :class="[
        'el-message',
        type ? `el-message--${type}` : 'el-message--info',
        center ? 'is-center' : '',
        showClose ? 'is-closable' : '',
        plain? 'is-plain' : '',
        customClass,
      ]"
      :style="positionStyle"
      role="alert"
    >
      <el-badge
        v-if="repeatNum > 1"
        :value="repeatNum"
        :type="badgeType"
        class="el-message__badge"
      />
      <el-icon-plus v-if="iconComponent && !icon" :class="typeClass">
        <component :is="iconComponent" />
      </el-icon-plus>
      <el-icon v-if="iconComponent && icon" :name="icon" :class="typeClass" />
      <div class="el-message__content">
        <slot></slot>
      </div>
      <el-icon-plus v-if="showClose" :class="el-message__closeBtn">
        <Close />
      </el-icon-plus>
    </div>
  </transition>
</template>

<script>
import { ElBadge, ElIcon as ElIconPlus } from 'element-plus';
import { Close, SuccessFilled, WarningFilled, CircleCloseFilled, InfoFilled } from '@element-plus/icons-vue';
import Message from './message';
import { ElIcon } from '../index';
const typeMap = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error',
};
export const TypeComponentsMap = {
  success: SuccessFilled,
  info: InfoFilled,
  warning: WarningFilled,
  error: CircleCloseFilled,
}
export default {
  name: 'ElMessageDesigner',
  components: {
    ElIconPlus,
    ElIcon,
    ElBadge,
    Close,
    SuccessFilled, 
    WarningFilled, 
    CircleCloseFilled, 
    InfoFilled
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
        ? `el-icon el-message__icon el-message-icon--${typeMap[this.type]}`
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
    badgeType() {
      return this.type ? (this.type === 'error' ? 'danger' : this.type) : 'info';
    },
    iconComponent() {
      const type = this.type || 'info';
      return this.icon || TypeComponentsMap[type] || '';
    }
  },
};
</script>
