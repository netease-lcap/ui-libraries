<!-- 禁用某一项 -->
<template>
<u-transfer :source="source" :target="target" show-head></u-transfer>
</template>
<script>
export default {
    data() {
        return {
            source: [
                { text: 'C', value: 'c' },
                { text: 'C#', value: 'csharp' },
                { text: 'C++', value: 'cpp' },
                { text: 'Coq', value: 'coq', disabled: true },
                { text: 'Go', value: 'go' },
                { text: 'Handlebars', value: 'Handlebars', disabled: true },
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
            ],
            target: [
                { text: 'CSS', value: 'css', disabled: true },
                { text: 'HTML', value: 'html', disabled: true },
                { text: 'JavaScript', value: 'javascript' },
                { text: 'Vue', value: 'vue' },
            ],
        };
    },
};
</script>