<template>
    <div :class="[$style.root, {[$style.empty]: (!$slots.default) && $env.VUE_APP_DESIGNER && !!$attrs['vusion-node-path']}]" v-on="$listeners" vusion-slot-name="default">
        <slot></slot>
        <template v-if="(!$slots.default) && $env.VUE_APP_DESIGNER && !!$attrs['vusion-node-path']">
            <div :class="$style.emptyTip">拖入组件放至任意位置</div>
        </template>
    </div>
</template>

<script>

export default {
    name: 'u-absolute-layout',
    provide() {
      return {
        inAbsoluteLayout: true,
      };
    },
};
</script>

<style module>
.root {
    position: relative;
    width: 100%;
    height: 300px;
    min-height: 30px;
}
.root.empty{
    background: #F7F8FA;
}

.root>* {
    position: absolute !important;
    text-decoration: inherit;
}
/* 在编辑器里禁用 transition，防止位置尺寸变化时候出现延迟 */
.root>[vusion-node-path]{
    transition: none !important;
}
.emptyTip {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #999;
}
.emptyTip::before {
content: "\e666";
    font-family: "lcap-ui-icons";
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-decoration: inherit;
    text-rendering: optimizeLegibility;
    text-transform: none;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-smoothing: antialiased;
    font-size: 12px;
    margin-right: 5px;
    position: relative;
    bottom: 1px;
}
</style>

