<template>
    <div v-if="$env.VUE_APP_DESIGNER" vusion-disabled-duplicate="true" vusion-disabled-copy="true">
        <div :class="$style.item">
            <div :class="$style.label">{{ $tt('startBy') }}：</div>
            <div :class="$style.value" v-ellipsis-title>张三（示例）</div>
        </div>
        <div :class="$style.item">
            <div :class="$style.label">{{ $tt('processStartTime') }}：</div>
            <div :class="$style.value" v-ellipsis-title>2024-01-24 08:00:00（示例）</div>
        </div>
        <div :class="$style.item">
            <div :class="$style.label">{{ $tt('finished') }}：</div>
            <div :class="$style.value" v-ellipsis-title>审批中（示例）</div>
        </div>
        <div :class="$style.item">
            <div :class="$style.label">{{ $tt('currentNodes') }}：</div>
            <div :class="$style.value" v-ellipsis-title>领导审批（示例）</div>
        </div>
        <div :class="$style.item">
            <div :class="$style.label">{{ $tt('currentCandidateUsers') }}：</div>
            <div :class="$style.value" v-ellipsis-title>李四、王五（示例）</div>
        </div>
    </div>
    <component
        v-else
        is="u-process-info-real"
        v-bind="[$attrs, $props]"
        v-on="$listeners">
    </component>
</template>
<script>
import UProcessInfoReal from './index.vue';
import i18nMixin from '../../mixins/i18n';

export default {
    mixins: [i18nMixin('u-process-info')],
    component: {
        UProcessInfoReal,
    },
};
</script>

<style module src="./index.css"></style>
