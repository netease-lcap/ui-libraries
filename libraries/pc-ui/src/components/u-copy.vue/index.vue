<template>
<div :class="$style.root">
    <div @click="copy" vusion-slot-name="default">
        <slot>
            <s-empty v-if="(!$slots.default) && $env.VUE_APP_DESIGNER && !!$attrs['vusion-node-path']"></s-empty>
            <u-link v-else :disabled="disabled" vusion-slot-name-edit="text">{{ text }}</u-link>
        </slot>
    </div>
    <u-tooltip v-if="feedback === 'tooltip'" :placement="placement" trigger="manual" :opened.sync="success">
        {{ successText }}
    </u-tooltip>
    <u-tooltip :placement="placement" trigger="manual" :opened.sync="failed">
        无复制对象
    </u-tooltip>
</div>
</template>

<script>
import { sync } from '@lcap/vue2-utils';
import { copy } from '../../utils/edit/clipboard';
// import i18n from '@/utils/i18n';
import SEmpty from '../../components/s-empty.vue';

export default {
    name: 'u-copy',
    components: { SEmpty },
    mixins: [
      sync('value', 'disabled'),
    ],
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
        return { success: false, timeoutId: undefined, failed: false };
    },
    destroyed() {
        clearTimeout(this.timeoutId);
    },
    methods: {
        copy() {
            if (this.disabled)
                return;
            this.success = copy(this.value);
            if (this.success) {
                if (this.feedback === 'toast')
                    this.$toast.show(this.successText, this.hideDelay);
                this.$emit('copy', { value: this.value }, this);
                clearTimeout(this.timeoutId);
                this.timeoutId = setTimeout(() => {
                    this.success = false;
                }, this.hideDelay);
            }
            this.failed = !this.success;
        },
    },
};
</script>

<style module>
.root {
    display: inline-block;
    position: relative;
}
</style>
