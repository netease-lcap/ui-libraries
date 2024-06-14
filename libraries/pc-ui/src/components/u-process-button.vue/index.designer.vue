<template>
    <u-linear-layout v-if="$env.VUE_APP_DESIGNER" mode="inline" :class="$style.root" vusion-disabled-duplicate="true" vusion-disabled-copy="true">
        <u-button :color="colors.submit">提交</u-button>
        <u-button :color="colors.approve">同意</u-button>
        <u-button :color="colors.reject">拒绝</u-button>
        <u-button :color="colors.reassign">转派</u-button>
        <u-button :color="colors.addSign">加签</u-button>
        <u-button :color="colors.withdraw">撤回</u-button>
    </u-linear-layout>
        <component
        v-else
        is="u-process-button-real"
        v-bind="[$attrs, $props]"
        :colors="colors"
        v-on="$listeners">
    </component>
</template>
<script>
import UProcessButtonReal from './index.vue';

export default {
    component: {
        UProcessButtonReal,
    },
    props: {
        submit_color: { type: String, default: 'primary' },
        approve_color: { type: String, default: 'primary' },
        reject_color: { type: String, default: 'default' },
        revert_color: { type: String, default: 'default' },
        reassign_color: { type: String, default: 'default' },
        addSign_color: { type: String, default: 'default' },
        withdraw_color: { type: String, default: 'default' },
    },
    computed: {
        colors() {
            return {
                submit: this.submit_color,
                approve: this.approve_color,
                reject: this.reject_color,
                revert: this.revert_color,
                reassign: this.reassign_color,
                addSign: this.addSign_color,
                withdraw: this.withdraw_color,
            }
        },
    },
};
</script>

<style module src="./index.css"></style>
