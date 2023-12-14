"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs-extra");
var path = require("path");
var babel = require("@babel/core");
var t = require("@babel/types");
var generator_1 = require("@babel/generator");
formatH5();
function formatH5() {
    var root = path.join(__dirname, "../../../../vant");
    var components = require("".concat(root, "/scripts/lcap/config.js"));
    components.forEach(function (component) {
        var sourceDir = 'src';
        var componentDir = path.join(root, "".concat(sourceDir, "/").concat(component.name));
        if (!fs.existsSync(componentDir)) {
            sourceDir = 'src-vusion/components';
            componentDir = path.join(root, "".concat(sourceDir, "/").concat(component.name));
        }
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
    });
}
function format(code) {
    // export class VanPopupCombinationOptions {
    //     @Prop({
    //         title: '触发方式',
    //         description: '弹出框的触发方式',
    //         setter: {
    //             type: 'enumSelect',
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
    //             concept: 'EnumSelectSetter',
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
            type.key = t.identifier('concept');
            // 首字母大写 尾部追加Setter
            type.value = t.stringLiteral(type.value.value[0].toUpperCase() + type.value.value.slice(1) + 'Setter');
            // if ((type.value as t.StringLiteral).value !== 'capsules') return;
            // const titles = (setter.value as t.ObjectExpression).properties.find((property: any) => property.key.name === 'titles') as t.ObjectProperty;
            // if (!titles) return;
            // const icons = (setter.value as t.ObjectExpression).properties.find((property: any) => property.key.name === 'icons') as t.ObjectProperty;
            // const tooltips = (setter.value as t.ObjectExpression).properties.find((property: any) => property.key.name === 'tooltips') as t.ObjectProperty;
            // const optionsProperty = t.objectProperty(
            //     t.identifier('options'),
            //     t.arrayExpression(
            //         (titles.value as t.ArrayExpression).elements.map((element: any, idx) => {
            //             const icon = (icons.value as t.ArrayExpression).elements[idx] as any;
            //             const tooltip = (tooltips.value as t.ArrayExpression).elements[idx] as any;
            //             return t.objectExpression([
            //                 t.objectProperty(
            //                     t.identifier('title'),
            //                     element
            //                 ),
            //                 t.objectProperty(
            //                     t.identifier('icon'),
            //                     icon
            //                 ),
            //                 t.objectProperty(
            //                     t.identifier('tooltip'),
            //                     tooltip
            //                 ),
            //             ])
            //         })
            //     )
            // );
            // (setter.value as t.ObjectExpression).properties = (setter.value as t.ObjectExpression).properties.filter((property: any) => !['titles', 'icons', 'tooltips'].includes(property.key.name));
            // (setter.value as t.ObjectExpression).properties.push(optionsProperty);
            needFormat = true;
        }
    });
    if (!needFormat)
        return false;
    var result = (0, generator_1.default)(root);
    return result.code;
}
