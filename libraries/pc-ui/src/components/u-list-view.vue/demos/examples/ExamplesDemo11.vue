<!-- 修改尺寸 -->
<template>
<u-grid-layout :repeat="3">
    <u-grid-layout-column>
        <u-list-view show-head title="normal" :data-source="list"></u-list-view>
    </u-grid-layout-column>
    <u-grid-layout-column>
        <u-list-view show-head size="large" title="large" :data-source="list"></u-list-view>
    </u-grid-layout-column>
    <u-grid-layout-column>
        <u-list-view show-head size="auto" title="auto" :data-source="list"></u-list-view>
    </u-grid-layout-column>
</u-grid-layout>
</template>
<script>
export default {
    data() {
        return {
            list: [
                { text: 'C', value: 'c' },
                { text: 'C#', value: 'csharp' },
                { text: 'C++', value: 'cpp' },
                { text: 'CSS', value: 'css', disabled: true },
                { text: 'Coq', value: 'coq', disabled: true },
                { text: 'Go', value: 'go' },
                { text: 'HTML', value: 'html', disabled: true },
                { text: 'Handlebars', value: 'Handlebars', disabled: true },
                { text: 'JSON', value: 'json' },
                { text: 'Java', value: 'java' },
                { text: 'JavaScript', value: 'javascript' },
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
                { text: 'Vue', value: 'vue' },
                { text: 'XML', value: 'xml' },
                { text: 'YAML', value: 'yaml' },
            ],
        };
    },
};
</script>