<template>
<div :class="$style.root">
  <van-popover v-model="visible" :placement="placement" theme="dark" get-container="body">
    <span :class="$style.tooltip">{{ success ? successText : failTip }}</span>

    <template #reference>
      <div @click="copy" vusion-slot-name="default">
          <slot>
              <s-empty v-if="(!$slots.default) && $env.VUE_APP_DESIGNER && !!$attrs['vusion-node-path']"></s-empty>
              <van-link v-else :disabled="disabled" vusion-slot-name-edit="text">{{ text }}</van-link>
          </slot>
      </div>
    </template>
  </van-popover>
</div>
</template>

<script>
import ClipboardJS from 'clipboard';
// import i18n from '@/utils/i18n';
import { SEmpty } from 'cloud-ui.vusion/src/components/s-empty.vue';
import Popover from '../../../src/popover';
import { createI18N } from '../../../src/utils/create/i18n'

const name = 'van-copy';

const t = createI18N(name);

export default {
    name,
    components: {
      SEmpty,
      Popover
    },
    props: {
        value: String,
        text: { type: String, default: '复制' },
        placement: { type: String, default: 'top' },
        successText: { type: String, default: '已复制' },
        disabled: { type: Boolean, default: false },
        hideDelay: { type: Number, default: 3000 },
        feedback: { type: String, default: 'tooltip' },
    },
    data() {
        return {
          success: false,
          timeoutId: undefined,
          visible: false,
        };
    },
    computed: {
        failTip() {
            return t('fail');
        },
    },
    destroyed() {
        clearTimeout(this.timeoutId);
    },
    methods: {
        copy() {
            if (this.disabled)
                return;
            this.success = ClipboardJS.copy(this.value);
            if (this.success) {
                if (this.feedback === 'toast')
                    this.$toast.show(this.successText, this.hideDelay);
                this.$emit('copy', { value: this.value }, this);
            }

            clearTimeout(this.timeoutId);
            this.timeoutId = setTimeout(() => {
              this.visible = false;
            }, this.hideDelay);

            this.visible = true;
        },
    },
};
</script>

<style module>
.root {
    display: inline-block;
    position: relative;
}
.tooltip {
  white-space: nowrap;
  font-size: 12px;
  padding: 5px 10px;
  color: #fff;
}
</style>
