<template>
  <transition name="msgbox-fade">
    <div
      class="el-message-box__wrapper"
      tabindex="-1"
      :style="customStyle"
      v-show="visible"
      role="dialog"
      aria-modal="true"
      :aria-label="title || 'dialog'">
      <div
        class="el-message-box"
        :class="[customClass, center && 'el-message-box--center']">
        <div class="el-message-box__header" v-if="title !== null">
          <div class="el-message-box__title">
            <div
              :class="['el-message-box__status', icon]"
              v-if="icon && center"></div>
            <span>{{ title }}</span>
          </div>
          <button
            type="button"
            class="el-message-box__headerbtn"
            aria-label="Close"
            v-if="showClose"
          >
            <i class="el-message-box__close el-icon-close"></i>
          </button>
        </div>
        <div class="el-message-box__content">
          <div class="el-message-box__container">
            <div
              :class="['el-message-box__status', icon]"
              v-if="icon && !center && message !== ''"></div>
            <div class="el-message-box__message">
              <slot></slot>
            </div>
          </div>
          <div class="el-message-box__input" v-show="type === 'prompt'">
            <el-input
              v-model="inputValue"
              :type="inputType"
              :placeholder="inputPlaceholder"
              ref="input"></el-input>
            <div
              class="el-message-box__errormsg"
              :style="{
                visibility: !!editorErrorMessage ? 'visible' : 'hidden',
              }">
              {{ editorErrorMessage }}
            </div>
          </div>
        </div>
        <div class="el-message-box__btns">
          <el-button
            :loading="cancelButtonLoading"
            :class="[cancelButtonClasses]"
            v-if="showCancelButton"
            :round="roundButton"
            size="small"
          >
            {{ cancelButtonText || t('el.messagebox.cancel') }}
          </el-button>
          <el-button
            :loading="confirmButtonLoading"
            ref="confirm"
            :class="[confirmButtonClasses]"
            v-show="showConfirmButton"
            :round="roundButton"
            size="small"
          >
            {{ confirmButtonText || t('el.messagebox.confirm') }}
          </el-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import MessageBox from './message-box';
import Popup from 'element-ui/lib/utils/popup';
import Locale from 'element-ui/lib/mixins/locale';
import ElInput from 'element-ui/lib/input';
import ElButton from 'element-ui/lib/button';
import { t } from 'element-ui/lib/locale';

let typeMap = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error',
};

export default {
  name: 'ElMessageBoxDesigner',
  mixins: [Popup, Locale],

  props: {
    ...MessageBox.props,
    modal: {
      default: true,
    },
    lockScroll: {
      default: true,
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    closeOnClickModal: {
      default: true,
    },
    closeOnPressEscape: {
      default: true,
    },
    closeOnHashChange: {
      default: true,
    },
    center: {
      default: false,
      type: Boolean,
    },
    roundButton: {
      default: false,
      type: Boolean,
    },
    static: {
      type: Boolean,
      default: false,
    }
  },

  components: {
    ElInput,
    ElButton,
  },

  computed: {
    icon() {
      const { iconType } = this;
      return iconType && typeMap[iconType] ? `el-icon-${typeMap[iconType]}` : '';
    },

    confirmButtonClasses() {
      return `el-button--primary ${this.confirmButtonClass}`;
    },
    cancelButtonClasses() {
      return `${this.cancelButtonClass}`;
    },
    customStyle() {
      if (this.static) {
        return {
          zIndex: 2000,
          position: 'relative',
          left: 'auto',
          right: 'auto',
          top: 'auto',
          bottom: 'auto',
        };
      }

      return {
        zIndex: 2000,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      };
    }
  },

  data() {
    return {
      uid: 1,
      confirmButtonClass: '',
      cancelButtonClass: '',
    };
  },
};
</script>
