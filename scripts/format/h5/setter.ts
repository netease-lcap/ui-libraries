
import * as fs from 'fs-extra';
import * as path from 'path';

import * as babel from '@babel/core';
import * as t from '@babel/types';
import generate from '@babel/generator';

formatH5();

function formatH5() {
    const root = path.join(__dirname, "../../../../vant");

    const components = require(`${root}/scripts/lcap/config.js`);
    components.forEach((component: any) => {
        let sourceDir = 'src'
        let componentDir = path.join(root, `${sourceDir}/${component.name}`);
        if (!fs.existsSync(componentDir)) {
            sourceDir = 'src-vusion/components';
            componentDir = path.join(root, `${sourceDir}/${component.name}`);
        }

        // api.ts
        try {
            const tsPath = `${componentDir}/api.ts`;
            // component.tsPath = tsPath;
            const code = format(fs.readFileSync(tsPath, 'utf8'));
            // code写回去
            if (code) {
                fs.writeFileSync(tsPath, code, {
                    encoding: 'utf8'
                });
            }
            
        } catch (e) {
            console.log('找不到 TS 文件或 TS 报错', componentDir);
            console.log(e);
        }
    })
}

function format(code: string) {
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

    const root = babel.parseSync(code, {
        filename: 'result.ts',
        presets: [
            require('@babel/preset-typescript'),
        ],
        plugins: [
            [require('@babel/plugin-proposal-decorators'), { legacy: true }],
            // 'babel-plugin-parameter-decorator'
        ]
    }) as t.File;

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

    let needFormat = false;

    babel.traverse(root, {
        ClassProperty(path) {
            const decorators = path.node.decorators;
            if (!decorators) return;

            const decorator = decorators.find((decorator: any) => decorator.expression.callee.name === 'Prop');
            if (!decorator) return;

            const options = (decorator.expression as t.CallExpression).arguments[0] as t.ObjectExpression;
            if (!options) return;

            const setter = options.properties.find((property: any) => property.key.name === 'setter') as t.ObjectProperty;
            if (!setter) return;

            const type = (setter.value as t.ObjectExpression).properties.find((property: any) => property.key.name === 'type') as t.ObjectProperty;
            if (!type) return;

            type.key = t.identifier('concept');
            // 首字母大写 尾部追加Setter
            type.value = t.stringLiteral((type.value as t.StringLiteral).value[0].toUpperCase() + (type.value as t.StringLiteral).value.slice(1) + 'Setter');
            

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
    })

    if (!needFormat) return false;

    const result = generate(root);

    return result.code;
}
