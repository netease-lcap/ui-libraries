"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs-extra");
var path = require("path");
var babel = require("@babel/core");
var t = require("@babel/types");
var generator_1 = require("@babel/generator");
var yaml = require('js-yaml');
formatH5();
function formatH5() {
    var root = path.join(__dirname, "../../../../cloud-ui");
    var components = require("".concat(root, "/scripts/lcap/config.js"));
    components.forEach(function (component) {
        var sourceDir = 'src';
        var componentDir = path.join(root, "".concat(sourceDir, "/").concat(component.name));
        if (!fs.existsSync(componentDir)) {
            sourceDir = 'src/components';
            componentDir = path.join(root, "".concat(sourceDir, "/").concat(component.name, ".vue"));
        }
        // api.ts
        try {
            var tsPath = "".concat(componentDir, "/api.ts");
            var yamlPath = "".concat(componentDir, "/api.yaml");
            // component.tsPath = tsPath;
            var code = format(fs.readFileSync(tsPath, 'utf8'), yaml.load(fs.readFileSync(yamlPath)));
            // code写回去
            if (code) {
                fs.writeFileSync(tsPath, code, {
                    encoding: 'utf8'
                });
            }
        }
        catch (e) {
            console.log('找不到 TS 文件或 TS 报错', componentDir);
            console.log(e);
        }
    });
}
function format(code, yaml) {
    var _a;
    var root = babel.parseSync(code, {
        filename: 'result.ts',
        presets: [
            require('@babel/preset-typescript'),
        ],
        plugins: [
            [require('@babel/plugin-proposal-decorators'), { legacy: true }],
            // 'babel-plugin-parameter-decorator'
        ]
    });
    var needFormat = false;
    var group = (_a = yaml[0]) === null || _a === void 0 ? void 0 : _a.labels[0];
    babel.traverse(root, {
        Decorator: function (path) {
            var expression = path.node.expression;
            if (t.isCallExpression(expression)) {
                var callee = expression.callee;
                if (t.isIdentifier(callee) && callee.name === 'Component') {
                    var args = expression.arguments;
                    var options = args[0];
                    if (t.isObjectExpression(options)) {
                        options.properties.push(t.objectProperty(t.identifier('group'), t.stringLiteral(group)));
                        needFormat = true;
                    }
                }
            }
        }
    });
    if (!needFormat)
        return false;
    var result = (0, generator_1.default)(root);
    return result.code;
}
