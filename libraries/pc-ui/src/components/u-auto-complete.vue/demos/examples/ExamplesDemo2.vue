<!-- data-source 函数 -->
<template>
<u-auto-complete v-model="value" :data-source="load"></u-auto-complete>
</template>
<script>
// 模拟后端请求
const mockRequest = (data, timeout = 300) => new Promise((res, rej) => setTimeout(() => res(data), timeout));
// 模拟数据服务
const mockService = {
    load() {
        return mockRequest([
            { text: 'Batch', value: 'bat' },
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
        ]);
    },
};

export default {
    data() {
        return {
            value: '',
        };
    },
    methods: {
        load() {
            return mockService.load();
        },
    }
};
</script>