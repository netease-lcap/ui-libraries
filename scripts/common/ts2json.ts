import * as babel from '@babel/core';
import * as babelTypes from '@babel/types';
import generate from '@babel/generator';
import * as apiTypes from './apiTypes';

function evalOptions(object: babelTypes.ObjectExpression) {
    const code = generate(object).code;
    const result = eval(`(${code})`);
    if (result.if)
        result.if = result.if.toString();
    if (result.disabledIf)
        result.disabledIf = result.disabledIf.toString();
    if (result.onToggle) {
        result.onToggle.forEach((item: { update: any, if?: string }) => {
            if (item.if)
                item.if = item.if.toString();
        });
    }
    return result;
}

export function transform(tsCode: string): apiTypes.ComponentAPI[] {
    const root = babel.parseSync(tsCode, {
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
        return [];

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
            if ((classDecl.superClass as babelTypes.Identifier).name === 'VueComponent') {
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
    classMap.forEach((classItem, className) => {
        const [classDecl, optionsDecl] = classItem;
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

        result.push(component);
    });
    return result;
}