"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs-extra");
var path = require("path");
var babel = require("@babel/core");
var t = require("@babel/types");
var generator_1 = require("@babel/generator");
formatH5();
function formatH5() {
    var root = path.join(__dirname, "../../vant");
    var frontend = 'h5';
    var data = [];
    var pkg = require("".concat(root, "/package.json"));
    var components = require("".concat(root, "/scripts/lcap/config.js"));
    components.forEach(function (component) {
        var sourceDir = 'src';
        var componentDir = path.join(root, "".concat(sourceDir, "/").concat(component.name));
        if (!fs.existsSync(componentDir)) {
            sourceDir = 'src-vusion/components';
            componentDir = path.join(root, "".concat(sourceDir, "/").concat(component.name));
        }
        component.symbol = component.name;
        component.frontend = frontend;
        // api.ts
        try {
            var tsPath = "".concat(componentDir, "/api.ts");
            // component.tsPath = tsPath;
            var code = format(fs.readFileSync(tsPath, 'utf8'));
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
        data.push(component);
    });
    fs.writeFileSync(path.join(__dirname, "../".concat(frontend, ".json")), JSON.stringify(data, null, 2));
}
function format(code) {
    // export class VanPopupCombinationOptions {
    //     @Prop({
    //         title: '触发方式',
    //         description: '弹出框的触发方式',
    //         setter: {
    //             type: 'enumSelect',
    //             titles: ['点击', '悬浮', '右击', '双击', '手动'],
    //         },
    //     })
    //     private trigger: 'click' | 'hover' | 'right-click' | 'double-click' | 'manual' = 'click';
    // }
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
    // 将上述代码转中@Prop下的setter.type === 'enumSelect'的代码转换成
    // export class VanPopupCombinationOptions {
    //     @Prop({
    //         title: '触发方式',
    //         description: '弹出框的触发方式',
    //         setter: {
    //             type: 'enumSelect',
    //             options: [{ title: '点击' }, { title: '悬浮' }, { title: '右击' }, { title: '双击' }, { title: '手动' }]
    //         },
    //     })
    //     private trigger: 'click' | 'hover' | 'right-click' | 'double-click' | 'manual' = 'click';
    // }
    var needFormat = false;
    babel.traverse(root, {
        ClassProperty: function (path) {
            var decorators = path.node.decorators;
            if (!decorators)
                return;
            var decorator = decorators.find(function (decorator) { return decorator.expression.callee.name === 'Prop'; });
            if (!decorator)
                return;
            var options = decorator.expression.arguments[0];
            if (!options)
                return;
            var setter = options.properties.find(function (property) { return property.key.name === 'setter'; });
            if (!setter)
                return;
            var type = setter.value.properties.find(function (property) { return property.key.name === 'type'; });
            if (!type)
                return;
            if (type.value.value !== 'capsules')
                return;
            var titles = setter.value.properties.find(function (property) { return property.key.name === 'titles'; });
            if (!titles)
                return;
            var icons = setter.value.properties.find(function (property) { return property.key.name === 'icons'; });
            var tooltips = setter.value.properties.find(function (property) { return property.key.name === 'tooltips'; });
            var optionsProperty = t.objectProperty(t.identifier('options'), t.arrayExpression(titles.value.elements.map(function (element, idx) {
                var icon = icons.value.elements[idx];
                var tooltip = tooltips.value.elements[idx];
                return t.objectExpression([
                    t.objectProperty(t.identifier('title'), element),
                    t.objectProperty(t.identifier('icon'), icon),
                    t.objectProperty(t.identifier('tooltip'), tooltip),
                ]);
            })));
            setter.value.properties = setter.value.properties.filter(function (property) { return !['titles', 'icons', 'tooltips'].includes(property.key.name); });
            setter.value.properties.push(optionsProperty);
            needFormat = true;
        }
    });
    if (!needFormat)
        return false;
    var result = (0, generator_1.default)(root);
    return result.code;
}
