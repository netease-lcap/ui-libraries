<!-- 添加 loading -->
<template>
    <u-linear-layout direction="vertical" gap="small">
        <div><u-button @click="load()">加载</u-button></div>
        <u-transfer :source="source" :target="target" show-head :loading="loading"></u-transfer>
    </u-linear-layout>
</template>
<script>
// 模拟后端请求
const mockRequest = (data, timeout = 300) => new Promise((res, rej) => setTimeout(() => res(data), timeout));
// 模拟数据服务
const mockService = {
    loadSource() {
        return mockRequest([
            { text: 'C', value: 'c' },
            { text: 'C#', value: 'csharp' },
            { text: 'C++', value: 'cpp' },
            { text: 'Coq', value: 'coq' },
            { text: 'Go', value: 'go' },
            { text: 'Handlebars', value: 'Handlebars' },
            { text: 'JSON', value: 'json' },
            { text: 'Java', value: 'java' },
            { text: 'Makefile', value: 'makefile' },
            { text: 'Markdown', value: 'markdown' },
            { text: 'Objective-C', value: 'objective-c' },
            { text: 'Objective-C++', value: 'objective-cpp' },
            { text: 'PHP', value: 'php' },
            { text: 'Perl', value: 'perl' },
            { text: 'PowerShell', value: 'powershell' },
            { text: 'Python', value: 'python' },
            { text: 'Ruby', value: 'ruby' },
            { text: 'SQL', value: 'sql' },
            { text: 'SVG', value: 'svg' },
            { text: 'Shell Script', value: 'shellscript' },
            { text: 'Swift', value: 'swift' },
            { text: 'Visual Basic', value: 'vb' },
            { text: 'XML', value: 'xml' },
            { text: 'YAML', value: 'yaml' },
        ], 1000);
    },
    loadTarget() {
        return mockRequest([
                { text: 'CSS', value: 'css' },
                { text: 'HTML', value: 'html' },
                { text: 'JavaScript', value: 'javascript' },
                { text: 'Vue', value: 'vue' },
            ], 1000);
    },
};

export default {
    data() {
        return {
            source: undefined,
            target: undefined,
            loading: false,
        };
    },
    methods: {
        load() {
            this.loading = true;
            return Promise.all([
                mockService.loadSource(),
                mockService.loadTarget(),
            ]).then(([source, target]) => {
                this.loading = false;
                this.source = source;
                this.target = target;
            });
        },
    }
};
</script>
<style module>
.result {
    height: var(--list-view-height);
    padding: var(--list-view-item-padding);
    border: var(--border-width-base) solid var(--border-color-base);
    color: var(--color-light);
}
</style>