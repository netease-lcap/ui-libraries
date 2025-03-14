<template>
  <transition name="fade-in-linear">
    <el-overlay-plus
      v-show="props.visible"
      overlay-class="is-message-box"
      :mask="props.modal"
    >
      <div
        role="dialog"
        :aria-label="props.title"
        aria-modal="true"
        class="el-overlay-message-box"
      >
        <div
          :class="[
            'el-message-box',
            props.customClass,
            props.draggable ? 'is-draggable' : '',
            props.center ? 'el-message-box--center' : '',
          ]"
          :style="props.customStyle"
          tabindex="-1"
        >
          <div
            v-if="props.title !== null && props.title !== undefined"
            :class="['el-message-box__header', { 'show-close': props.showClose }]"
          >
            <div class="el-message-box__title">
              <el-icon-plus
                v-if="iconComponent && props.center"
                :class="['el-message-box__status', typeClass]"
              >
                <component :is="iconComponent" />
              </el-icon-plus>
              <span>{{ props.title }}</span>
            </div>
            <button
              v-if="props.showClose"
              type="button"
              class="el-message-box__headerbtn"
            >
              <el-icon-plus class="el-message-box__close">
                <component :is="closeIconComp" />
              </el-icon-plus>
            </button>
          </div>
          <div class="el-message-box__content">
            <div class="el-message-box__container">
              <el-icon-plus
                v-if="iconComponent && !props.center"
                :class="['el-message-box__status', typeClass]"
              >
                <component :is="iconComponent" />
              </el-icon-plus>
              <div class="el-message-box__message">
                <slot></slot>
              </div>
            </div>
            <div v-show="showInput" class="el-message-box__input">
              <el-input-plus
                v-model="props.inputValue"
                :type="props.inputType"
                :placeholder="props.inputPlaceholder"
              />
            </div>
          </div>
          <div class="el-message-box__btns">
            <el-button-plus
              v-if="props.showCancelButton"
              :loading="props.cancelButtonLoading"
              :loading-icon="props.cancelButtonLoadingIcon"
              :class="[props.cancelButtonClass]"
              :round="props.roundButton"
              :size="props.buttonSize"
            >
              {{ props.cancelButtonText }}
            </el-button-plus>
            <el-button-plus
              v-show="props.showConfirmButton"
              type="primary"
              :loading="props.confirmButtonLoading"
              :loading-icon="props.confirmButtonLoadingIcon"
              :class="props.confirmButtonClass"
              :round="props.roundButton"
              :disabled="props.confirmButtonDisabled"
              :size="props.buttonSize"
            >
              {{ props.confirmButtonText }}
            </el-button-plus>
          </div>
        </div>
      </div>
    </el-overlay-plus>
  </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  CircleCloseFilled,
  InfoFilled,
  SuccessFilled,
  WarningFilled,
  Close,
} from '@element-plus/icons-vue'
import { 
  ElInput as ElInputPlus, 
  ElButton as ElButtonPlus, 
  ElOverlay as ElOverlayPlus, 
  ElIcon as ElIconPlus 
} from 'element-plus';
import MessageBox from './message-box';

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
  ...MessageBox.props,
  modal: {
    type: Boolean,
    default: true,
  },
  closeOnClickModal: {
    type: Boolean,
    default: true,
  },
  closeOnPressEscape: {
    type: Boolean,
    default: true,
  },
  closeOnHashChange: {
    type: Boolean,
    default: true,
  },
  static: {
    type: Boolean,
    default: false,
  }
});

// 计算属性
const showInput = computed(() => { 
  return props.type === 'prompt';
});

const closeIconComp = computed(() => {
  return props.closeIcon || Close;
});

const iconComponent = computed(() => {
  const type = props.iconType;
  return props.icon || (type && TypeComponentsMap[type]) || '';
});

const typeClass = computed(() => {
  const type = props.iconType;
  return type && TypeComponentsMap[type]
        ? `el-message-box-icon--${typeMap[type]}`
        : '';
});

// const customStyle = computed(() => {
//   const propCustomStyle = props.customStyle || {};
//   if (props.static) {
//     return {
//       ...propCustomStyle,
//       zIndex: 2000,
//       position: 'relative',
//       left: 'auto',
//       right: 'auto',
//       top: 'auto',
//       bottom: 'auto',
//     };
//   }

//   return {
//     ...propCustomStyle,
//     zIndex: 2000,
//   };
// });
</script>