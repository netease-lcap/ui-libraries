<!-- 指定选项字段名 -->
<template>
<u-select v-model="value" :data-source="list" text-field="name" value-field="name"></u-select>
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