import * as fs from 'fs-extra';
import * as path from 'path';

import * as babel from '@babel/core';
import * as babelTypes from '@babel/types';
import generate from '@babel/generator';
import * as apiTypes from './common/apiTypes';
import { evalOptions } from './common/ts2json'

const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

genH5();
genPC();

function genH5() {
    const root = path.join(__dirname, "../../vant");
    const frontend = 'h5';
    const data: apiTypes.ComponentAPI[] = []
    const pkg = require(`${root}/package.json`);
    const libInfo = `${pkg.name}@${pkg.version}`;

    const components = require(`${root}/scripts/lcap/config.js`);
    components.forEach((component: any) => {
        let sourceDir = 'src'
        let componentDir = path.join(root, `${sourceDir}/${component.name}`);
        if (!fs.existsSync(componentDir)) {
            sourceDir = 'src-vusion/components';
            componentDir = path.join(root, `${sourceDir}/${component.name}`);
        }

        component.symbol = component.name;
        component.frontend = frontend;

        // api.ts
        try {
            const tsPath = `${componentDir}/api.ts`;
            // component.tsPath = tsPath;
            const info = transform(fs.readFileSync(tsPath, 'utf8'));
            Object.assign(component, info);

        } catch (e) {
            console.log('找不到 TS 文件或 TS 报错', componentDir);
            console.log(e);
        }

        // blocks
        try {
            const blockPath = `${componentDir}/docs/blocks.md`;
            const blocks = getBlocks(fs.readFileSync(blockPath, 'utf8').toString());
            Object.assign(component, { blocks });
        } catch (e) {
            console.log('找不到 blocks.md 文件', componentDir);
            console.log(e);
        }

        // screenShot
        try {
            const screenShotPath = `${componentDir}/screenshots`;
            let screenShot: string[] = [];
            if (hasImg(screenShotPath)) {
                screenShot = fs.readdirSync(screenShotPath)
                    .sort((a, b) => parseInt(a) - parseInt(b))
                    .filter((filename) => filename.indexOf('.DS_Store') === -1);

                Object.assign(component, {
                    screenShot: screenShot.map((screen) => {
                        let prefix = `https://static-vusion.163yun.com/packages/${libInfo}/${sourceDir}`;
                        return `${prefix}/${component.symbol}/screenshots/${screen}`;
                    }).join(','),
                });
            }

        } catch (e) {
            console.log('找不到 screenShot 文件', componentDir);
            console.log(e);
        }

        // drawings
        try {
            const drawingsPath = `${componentDir}/drawings`;
            let drawings: string[] = [];
            if (hasSvg(drawingsPath)) {
                drawings = fs.readdirSync(drawingsPath)
                    .sort((a, b) => parseInt(a) - parseInt(b))
                    .filter((filename) => filename.indexOf('.DS_Store') === -1);

                Object.assign(component, {
                    drawings: drawings.map((drawing) => {
                        let prefix = `https://static-vusion.163yun.com/packages/${libInfo}/${sourceDir}`;
                        return `${prefix}/${component.symbol}/drawings/${drawing}`;
                    }).join(','),
                });
            }
        } catch (e) {
            console.log('找不到 drawings 文件', componentDir);
            console.log(e);
        }

        data.push(component);
    })
    fs.writeFileSync(
        path.join(__dirname, `../${frontend}.json`),
        JSON.stringify(data, null, 2)
    );
}

function genPC() {
    const root = path.join(__dirname, "../../cloud-ui");
    const frontend = 'pc';
    const data: apiTypes.ComponentAPI[] = []
    const pkg = require(`${root}/package.json`);
    const libInfo = `${pkg.name}@${pkg.version}`;

    const components = require(`${root}/scripts/lcap/config.js`);
    components.forEach((component: any) => {
        let sourceDir = 'src/components'
        let componentDir = path.join(root, `${sourceDir}/${component.name}.vue`);

        component.symbol = component.name;
        component.frontend = frontend;

        // api.ts
        try {
            const tsPath = `${componentDir}/api.ts`;
            // component.tsPath = tsPath;
            const info = transform(fs.readFileSync(tsPath, 'utf8'));
            Object.assign(component, info);

        } catch (e) {
            console.log('找不到 TS 文件或 TS 报错', componentDir);
            console.log(e);
        }

        // blocks
        try {
            const blockPath = `${componentDir}/docs/blocks.md`;
            const blocks = getBlocks(fs.readFileSync(blockPath, 'utf8').toString());
            Object.assign(component, { blocks });
        } catch (e) {
            console.log('找不到 blocks.md 文件', componentDir);
            console.log(e);
        }

        // screenShot
        try {
            const screenShotPath = `${componentDir}/screenshots`;
            let screenShot: string[] = [];
            if (hasImg(screenShotPath)) {
                screenShot = fs.readdirSync(screenShotPath)
                    .sort((a, b) => parseInt(a) - parseInt(b))
                    .filter((filename) => filename.indexOf('.DS_Store') === -1);

                Object.assign(component, {
                    screenShot: screenShot.map((screen) => {
                        let prefix = `https://static-vusion.163yun.com/packages/${libInfo}/${sourceDir}`;
                        return `${prefix}/${component.symbol}/screenshots/${screen}`;
                    }).join(','),
                });
            }

        } catch (e) {
            console.log('找不到 screenShot 文件', componentDir);
            console.log(e);
        }

        // drawings
        try {
            const drawingsPath = `${componentDir}/drawings`;
            let drawings: string[] = [];
            if (hasSvg(drawingsPath)) {
                drawings = fs.readdirSync(drawingsPath)
                    .sort((a, b) => parseInt(a) - parseInt(b))
                    .filter((filename) => filename.indexOf('.DS_Store') === -1);

                Object.assign(component, {
                    drawings: drawings.map((drawing) => {
                        let prefix = `https://static-vusion.163yun.com/packages/${libInfo}/${sourceDir}`;
                        return `${prefix}/${component.symbol}/drawings/${drawing}`;
                    }).join(','),
                });
            }
        } catch (e) {
            console.log('找不到 drawings 文件', componentDir);
            console.log(e);
        }

        data.push(component);
    })
    fs.writeFileSync(
        path.join(__dirname, `../${frontend}.json`),
        JSON.stringify(data, null, 2)
    );
}

function getBlocks(content: string): apiTypes.BlockAPI[] {
    const tokens = md.parse(content, {});
    let title = '';
    let description = '';
    let blocks: apiTypes.BlockAPI[] = [];
    tokens.forEach((token, index) => {
        if (token.type === 'heading_close' && token.tag === 'h3') {
            const inline = tokens[index - 1];
            if (inline && inline.type === 'inline')
                title = inline.content;
        } else if (token.type === 'paragraph_close') {
            const inline = tokens[index - 1];
            if (inline && inline.type === 'inline')
                description += inline.content + '\n';
        } else if (token.type === 'fence') {
            const lang = token.info.trim().split(' ')[0];

            if (lang === 'html') {
                blocks.push({
                    title,
                    description,
                    code: `<template>\n${token.content}</template>\n`,
                });
            } else if (lang === 'vue') {
                blocks.push({
                    title,
                    description,
                    code: token.content,
                });
            }
            description = '';
        }
    });

    return blocks;
}

function hasImg(dir: string) {
    return fs.existsSync(path.join(dir, '0.png'));
};

function hasSvg(dir: string) {
    return fs.existsSync(path.join(dir, '0.svg'));
};

function transform(code: string) {
    const root = babel.parseSync(code, {
        filename: 'result.ts',
        presets: [
            require('@babel/preset-typescript'),
        ],
        plugins: [
            [require('@babel/plugin-proposal-decorators'), { legacy: true }],
            // 'babel-plugin-parameter-decorator'
        ]
    }) as babelTypes.File;

    const programBody = root.program.body;
    let blockOrDecl: babelTypes.TSModuleDeclaration | babelTypes.TSModuleBlock = programBody.find((stat) => stat.type === 'TSModuleDeclaration') as babelTypes.TSModuleDeclaration;
    while (blockOrDecl && blockOrDecl.type === 'TSModuleDeclaration') {
        blockOrDecl = blockOrDecl.body;
    }
    if (!blockOrDecl)
        return;

    const mainBody = (blockOrDecl as babelTypes.TSModuleBlock).body;
    /**
     * 组件名：[组件 class, 组件选项 class]
     */
    const classMap: Map<string, [babelTypes.ClassDeclaration, babelTypes.ClassDeclaration]> = new Map();
    mainBody.forEach((statement) => {
        let classDecl: babelTypes.ClassDeclaration;
        if (statement.type === 'ExportNamedDeclaration') {
            classDecl = statement.declaration as babelTypes.ClassDeclaration;
        } else if (statement.type === 'ClassDeclaration') {
            classDecl = statement as babelTypes.ClassDeclaration;
        } else {
            return;
        }

        if (classDecl.id.name.endsWith('Options')) {
            const className = classDecl.id.name.replace(/Options$/, '');
            let classItem = classMap.get(className);
            if (!classItem) {
                classItem = [null, classDecl];
                classMap.set(className, classItem);
            } else {
                classItem[1] = classDecl;
            }
        } else {
            const className = classDecl.id.name;
            if ((classDecl.superClass as babelTypes.Identifier).name === 'ViewComponent') {
                let classItem = classMap.get(className);
                if (!classItem) {
                    classItem = [classDecl, null];
                    classMap.set(className, classItem);
                } else {
                    classItem[0] = classDecl;
                }
            }
        }
    });

    // forEach classMap
    const result: apiTypes.ComponentAPI[] = [];
    let idx = 0;
    classMap.forEach((classItem, className) => {
        const [classDecl, optionsDecl] = classItem;
        // console.log('classItem', classItem);
        if (!classDecl)
            return;

        const component: apiTypes.ComponentAPI = {
            name: className,
            title: '',
            description: '',
            icon: '',
            advanced: false,
            typeParams: undefined,
            props: [],
            readableProps: [],
            events: [],
            methods: [],
            slots: [],
            children: [],
        };

        classDecl.decorators.forEach((decorator) => {
            if (decorator.expression.type === 'CallExpression' && (decorator.expression.callee as babelTypes.Identifier).name === 'Component') {
                decorator.expression.arguments.forEach((arg) => {
                    if (arg.type === 'ObjectExpression')
                        Object.assign(component, evalOptions(arg));
                });
            }
        });

        {
            const classTypeParams = generate(babelTypes.tsInterfaceDeclaration(
                babelTypes.identifier('Wrapper'),
                classDecl.typeParameters as babelTypes.TSTypeParameterDeclaration,
                [],
                babelTypes.tsInterfaceBody([]),
            )).code.replace(/^interface Wrapper<?/, '').replace(/>? {}$/, '');
            const optionsTypeParams = generate(babelTypes.tsInterfaceDeclaration(
                babelTypes.identifier('Wrapper'),
                optionsDecl.typeParameters as babelTypes.TSTypeParameterDeclaration,
                [],
                babelTypes.tsInterfaceBody([]),
            )).code.replace(/^interface Wrapper<?/, '').replace(/>? {}$/, '');
            if (classTypeParams !== optionsTypeParams)
                throw new Error(`组件的${className}泛型类型参数不匹配！`);

            component.typeParams = classTypeParams;
        }

        optionsDecl.body.body.forEach((member) => {
            if (member.type === 'ClassProperty') {
                member.decorators.forEach((decorator) => {
                    if (decorator.expression.type === 'CallExpression') {
                        const calleeName = (decorator.expression.callee as babelTypes.Identifier).name;
                        if (calleeName === 'Prop') {
                            const prop: apiTypes.PropAPI = {
                                name: (member.key as babelTypes.Identifier).name,
                                title: '',
                                type: generate((member.typeAnnotation as babelTypes.TSTypeAnnotation).typeAnnotation).code,
                            };
                            // @TODO: default
                            // @TODO: private
                            decorator.expression.arguments.forEach((arg) => {
                                if (arg.type === 'ObjectExpression')
                                    Object.assign(prop, evalOptions(arg));
                            });

                            // 枚举类型生成选项
                            if (['enumSelect', 'capsules'].includes(prop?.setter?.type)) {
                                const types = prop?.type.split('|').map((type) => type.replace(/(\'|\")/g, '').trim());
                                // @ts-ignore
                                prop?.setter?.options = prop?.setter?.options?.map((option: any, idx) => {
                                    return {
                                        ...option,
                                        value: types[idx],
                                    }
                                })

                            }

                            component.props.push(prop);
                        } else if (calleeName === 'Event') {
                            const event: apiTypes.EventAPI = {
                                name: (member.key as babelTypes.Identifier).name.replace(/^on(\w)/, (m, $1) => $1.toLowerCase()),
                                title: '',
                                type: generate((member.typeAnnotation as babelTypes.TSTypeAnnotation).typeAnnotation).code,
                            };
                            decorator.expression.arguments.forEach((arg) => {
                                if (arg.type === 'ObjectExpression')
                                    Object.assign(event, evalOptions(arg));
                            });
                            component.events.push(event);
                        } else if (calleeName === 'Slot') {
                            const slot: apiTypes.SlotAPI = {
                                name: (member.key as babelTypes.Identifier).name.replace(/^slot(\w)/, (m, $1) => $1.toLowerCase()),
                                title: '',
                                type: generate((member.typeAnnotation as babelTypes.TSTypeAnnotation).typeAnnotation).code,
                            };
                            decorator.expression.arguments.forEach((arg) => {
                                if (arg.type === 'ObjectExpression')
                                    Object.assign(slot, evalOptions(arg));
                            });
                            component.slots.push(slot);
                        }
                    }
                });
            }
        });

        classDecl.body.body.forEach((member) => {
            if (member.type === 'ClassProperty') {
                member.decorators?.forEach((decorator) => {
                    if (decorator.expression.type === 'CallExpression') {
                        const calleeName = (decorator.expression.callee as babelTypes.Identifier).name;
                        if (calleeName === 'Prop') {
                            const prop: apiTypes.PropAPI = {
                                name: (member.key as babelTypes.Identifier).name,
                                title: '',
                                type: generate((member.typeAnnotation as babelTypes.TSTypeAnnotation).typeAnnotation).code,
                            };
                            // @TODO: default
                            // @TODO: private
                            decorator.expression.arguments.forEach((arg) => {
                                if (arg.type === 'ObjectExpression')
                                    Object.assign(prop, evalOptions(arg));
                            });
                            component.readableProps.push(prop);
                        }
                    }
                });
            } else if (member.type === 'ClassMethod') {
                member.decorators?.forEach((decorator) => {
                    if (decorator.expression.type === 'CallExpression') {
                        const calleeName = (decorator.expression.callee as babelTypes.Identifier).name;
                        if (calleeName === 'Method') {
                            const method: apiTypes.MethodAPI = {
                                name: (member.key as babelTypes.Identifier).name,
                                title: '',
                                type: '',
                                // type: generate((member. as babelTypes.TSTypeAnnotation).typeAnnotation).code,
                            };
                            // @TODO: private
                            decorator.expression.arguments.forEach((arg) => {
                                if (arg.type === 'ObjectExpression')
                                    Object.assign(method, evalOptions(arg));
                            });
                            component.methods.push(method);
                        }
                    }
                });
            }
        });

        if (idx === 0) {
            result.push(component);
        } else {
            const parent = result[0];
            parent.children.push(component);
        }

        idx++;
    });
    return result[0];
}
