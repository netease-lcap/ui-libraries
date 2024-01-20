<!-- 结合卡片 -->
<template>
<u-grid-view :repeat="4"
    pageable :page-size="12" remote-paging
                show-total show-sizer
                readonly readonly-mode="initial" :border="false"
                :style="{ height: 'auto' }"
                :data-source="list">
    <template #item="{ item }">
        <u-card :title="''">
            <u-grid-layout :repeat="3">
                <u-grid-layout-column :span="1">
                    <u-image src="https://static-vusion.163yun.com/assets/cloud-ui/1.jpg" fit="cover" style="width:100%;height:80px"></u-image>
                </u-grid-layout-column>
                <u-grid-layout-column :span="2">
                    <u-linear-layout direction="vertical" gap="small">
                        <u-linear-layout direction="horizontal">
                            <u-text text="语言"></u-text><u-text :text="item.value"></u-text>
                        </u-linear-layout>
                        <u-linear-layout direction="horizontal">
                            <u-text text="描述"></u-text><u-text :text="item.description"></u-text>
                        </u-linear-layout>
                        <u-linear-layout direction="horizontal">
                            <u-text text="创建时间"></u-text><u-text :text="item.createTime"></u-text>
                        </u-linear-layout>
                    </u-linear-layout>
                </u-grid-layout-column>
            </u-grid-layout>
        </u-card>
    </template>
</u-grid-view>
</template>
<script>
export default {
    data() {
        return {
            list: [
                { text: 'Batch', value: 'bat', description: 'bat', createTime: '2021-10-14 13:58:38'},
                { text: 'C', value: 'c' },
                { text: 'C#', value: 'csharp' },
                { text: 'C++', value: 'cpp' },
                { text: 'CSS', value: 'css' },
                { text: 'Clojure', value: 'clojure' },
                { text: 'CoffeeScript', value: 'coffeescript' },
                { text: 'Coq', value: 'coq' },
                { text: 'Diff', value: 'diff' },
                { text: 'Dockerfile', value: 'dockerfile' },
                { text: 'F#', value: 'fshape' },
                { text: 'Go', value: 'go' },
                { text: 'Groovy', value: 'groovy' },
                { text: 'HLSL', value: 'hlsl' },
                { text: 'HTML', value: 'html' },
                { text: 'Handlebars', value: 'Handlebars' },
                { text: 'Ignore', value: 'ignore' },
                { text: 'Ini', value: 'ini' },
                { text: 'JSON', value: 'json' },
                { text: 'Java', value: 'java' },
                { text: 'JavaScript', value: 'javascript' },
                { text: 'Jinja', value: 'jinja' },
                { text: 'Jupyter', value: 'jupyter' },
                { text: 'Less', value: 'less' },
                { text: 'Log', value: 'log' },
                { text: 'Lua', value: 'lua' },
                { text: 'Makefile', value: 'makefile' },
                { text: 'Markdown', value: 'markdown' },
                { text: 'Objective-C', value: 'objective-c' },
                { text: 'Objective-C++', value: 'objective-cpp' },
                { text: 'PHP', value: 'php' },
                { text: 'Perl', value: 'perl' },
                { text: 'PowerShell', value: 'powershell' },
                { text: 'Properties', value: 'properties' },
                { text: 'Pug', value: 'jade' },
                { text: 'Python', value: 'python' },
                { text: 'R', value: 'r' },
                { text: 'Razor', value: 'razor' },
                { text: 'Ruby', value: 'ruby' },
                { text: 'Rust', value: 'rust' },
                { text: 'SCSS', value: 'scss' },
                { text: 'SQL', value: 'sql' },
                { text: 'SVG', value: 'svg' },
                { text: 'Shaderlab', value: 'shaderlab' },
                { text: 'Shell Script', value: 'shellscript' },
                { text: 'Swift', value: 'swift' },
                { text: 'TypeScript', value: 'typescript' },
                { text: 'Visual Basic', value: 'vb' },
                { text: 'Vue', value: 'vue' },
                { text: 'XML', value: 'xml' },
                { text: 'XSL', value: 'xsl' },
                { text: 'YAML', value: 'yaml' },
            ],
        };
    },
};
</script>
<style module>
.title {
    margin: 0;
}
</style>