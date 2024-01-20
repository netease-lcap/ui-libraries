<!-- 修改尺寸 -->
<template>
<u-linear-layout direction="vertical">
    <u-linear-layout>
        <u-tree-select-new value="节点 1" valueField="text1" textField="text1" :data-source="[
            { text1: '节点 1', children: [
                { text1: '节点 1.1' },
                { text1: '节点 1.2', children: [
                    { text1: '节点 1.2.1' },
                    { text1: '节点 1.2.2' },
                ] },
                { text1: '节点 1.3' },
                { text1: '节点 1.4' },
            ] },
            { text1: '节点 2' },
            { text1: '节点 3', children: [
                { text1: '节点 3.1' }
                ,
                { text1: '节点 3.2' },
            ] },
        ]" :width="width" :height="height"></u-tree-select-new>
    </u-linear-layout>
    <u-linear-layout>
        <u-text>选择尺寸</u-text>
        <u-select placeholder="选择宽度" v-model="width">
            <u-select-item value="full">占满</u-select-item>
            <u-select-item value="huge">巨大</u-select-item>
            <u-select-item value="large">大</u-select-item>
            <u-select-item value="medium">中型</u-select-item>
            <u-select-item value="normal">正常</u-select-item>
            <u-select-item value="small">小</u-select-item>
            <u-select-item value="mini">迷你</u-select-item>
        </u-select>
        <u-select placeholder="选择高度" v-model="height">
            <u-select-item value="full">占满</u-select-item>
            <u-select-item value="huge">巨大</u-select-item>
            <u-select-item value="large">大</u-select-item>
            <u-select-item value="medium">中型</u-select-item>
            <u-select-item value="normal">正常</u-select-item>
            <u-select-item value="small">小</u-select-item>
            <u-select-item value="mini">迷你</u-select-item>
        </u-select>
    </u-linear-layout>
</u-linear-layout>
</template>
<script>
// 模拟后端请求

export default {
    data() {
        return {
            width: 'normal',
            height: 'normal',
        }
    },
}
</script>