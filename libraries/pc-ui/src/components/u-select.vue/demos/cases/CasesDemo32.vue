<!-- 自定义选中值的展示形式，项可添加描述 -->
<template>
<u-linear-layout>
    <u-select v-model="value" placeholder="自定义选中展示">
        <u-select-item v-for="item in list" :key="item.value" :value="item.value" :item="item" :description="item.description">
            {{ item.text }}
        </u-select-item>
        <template #selected="{item}">
            <i-ico name="home"></i-ico>
            <u-text style="margin-left:5px;">选中的是{{ item.text }}</u-text>
        </template>
    </u-select>
    <u-select v-model="value" :data-source="list" descriptionField="description" placeholder="自定义选中展示">
        <template #selected="{item}">
            <i-ico name="home"></i-ico>
            <u-text style="margin-left:5px;">选中的是{{ item.text }}</u-text>
        </template>
    </u-select>
</u-linear-layout>
</template>

<script>
export default {
    data() {
        return {
            value: '',
            list: [
                { text: 'Java', value: 'java', description: '这是java'},
                { text: 'Python', value: 'python', description: '这是python'},
                { text: 'Node.js', value: 'nodejs', description: '这是nodejs' },
                { text: 'Go', value: 'go', description: '这是go' },
                { text: '.NET', value: '.net', description: '这是.net' },
                { text: 'PHP', value: 'php', description: '这是php' },
            ],
        };
    },
};
</script>