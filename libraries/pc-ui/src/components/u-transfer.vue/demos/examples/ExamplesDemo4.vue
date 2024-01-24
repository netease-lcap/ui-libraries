<!-- 指定选项字段名 -->
<template>
<u-transfer :source="source" :target="target" show-head text-field="name" value-field="name"></u-transfer>
</template>
<script>
export default {
    data() {
        return {
            source: [
                { name: 'C' },
                { name: 'C#' },
                { name: 'C++' },
                { name: 'Coq' },
                { name: 'Go' },
                { name: 'Handlebars' },
                { name: 'JSON' },
                { name: 'Java' },
                { name: 'Makefile' },
                { name: 'Markdown' },
                { name: 'Objective-C' },
                { name: 'Objective-C++' },
                { name: 'PHP' },
                { name: 'Perl' },
                { name: 'PowerShell' },
                { name: 'Python' },
                { name: 'Ruby' },
                { name: 'SQL' },
                { name: 'SVG' },
                { name: 'Shell Script' },
                { name: 'Swift' },
                { name: 'Visual Basic' },
                { name: 'XML' },
                { name: 'YAML' },
            ],
            target: [
                { name: 'CSS' },
                { name: 'HTML' },
                { name: 'JavaScript' },
                { name: 'TypeScript' },
                { name: 'Vue' },
            ],
        };
    },
};
</script>