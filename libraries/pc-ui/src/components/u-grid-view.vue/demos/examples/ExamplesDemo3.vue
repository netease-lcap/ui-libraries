<!-- 指定选项字段名 -->
<template>
    <u-grid-layout :repeat="3">
        <u-grid-layout-column>
            <u-grid-view v-model="value" :data-source="list" text-field="name" value-field="name"></u-grid-view>
        </u-grid-layout-column>
        <u-grid-layout-column :span="2">
            <div :class="$style.result">选择的语言为：{{ value }}</div>
        </u-grid-layout-column>
    </u-grid-layout>
</template>
<script>
export default {
    data() {
        return {
            value: 'C++',
            list: [
                { name: 'Batch' },
                { name: 'C' },
                { name: 'C#' },
                { name: 'C++' },
                { name: 'CSS' },
                { name: 'Clojure' },
                { name: 'CoffeeScript' },
                { name: 'Coq' },
                { name: 'Diff' },
                { name: 'Dockerfile' },
                { name: 'F#' },
                { name: 'Go' },
                { name: 'Groovy' },
                { name: 'HLSL' },
                { name: 'HTML' },
                { name: 'Handlebars' },
                { name: 'Ignore' },
                { name: 'Ini' },
                { name: 'JSON' },
                { name: 'Java' },
                { name: 'JavaScript' },
                { name: 'Jinja' },
                { name: 'Jupyter' },
                { name: 'Less' },
                { name: 'Log' },
                { name: 'Lua' },
                { name: 'Makefile' },
                { name: 'Markdown' },
                { name: 'Objective-C' },
                { name: 'Objective-C++' },
                { name: 'PHP' },
                { name: 'Perl' },
                { name: 'PowerShell' },
                { name: 'Properties' },
                { name: 'Pug' },
                { name: 'Python' },
                { name: 'R' },
                { name: 'Razor' },
                { name: 'Ruby' },
                { name: 'Rust' },
                { name: 'SCSS' },
                { name: 'SQL' },
                { name: 'SVG' },
                { name: 'Shaderlab' },
                { name: 'Shell Script' },
                { name: 'Swift' },
                { name: 'TypeScript' },
                { name: 'Visual Basic' },
                { name: 'Vue' },
                { name: 'XML' },
                { name: 'XSL' },
                { name: 'YAML' },
            ],
        };
    },
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