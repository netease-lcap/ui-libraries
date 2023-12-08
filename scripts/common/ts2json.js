"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transform = void 0;
var babel = require("@babel/core");
var babelTypes = require("@babel/types");
var generator_1 = require("@babel/generator");
function evalOptions(object) {
    var code = (0, generator_1.default)(object).code;
    var result = eval("(".concat(code, ")"));
    if (result.if)
        result.if = result.if.toString();
    if (result.disabledIf)
        result.disabledIf = result.disabledIf.toString();
    if (result.onToggle) {
        result.onToggle.forEach(function (item) {
            if (item.if)
                item.if = item.if.toString();
        });
    }
    return result;
}
function transform(tsCode) {
    var root = babel.parseSync(tsCode, {
        filename: 'result.ts',
        presets: [
            require('@babel/preset-typescript'),
        ],
        plugins: [
            [require('@babel/plugin-proposal-decorators'), { legacy: true }],
            // 'babel-plugin-parameter-decorator'
        ]
    });
    var programBody = root.program.body;
    var blockOrDecl = programBody.find(function (stat) { return stat.type === 'TSModuleDeclaration'; });
    while (blockOrDecl && blockOrDecl.type === 'TSModuleDeclaration') {
        blockOrDecl = blockOrDecl.body;
    }
    if (!blockOrDecl)
        return [];
    var mainBody = blockOrDecl.body;
    /**
     * 组件名：[组件 class, 组件选项 class]
     */
    var classMap = new Map();
    mainBody.forEach(function (statement) {
        var classDecl;
        if (statement.type === 'ExportNamedDeclaration') {
            classDecl = statement.declaration;
        }
        else if (statement.type === 'ClassDeclaration') {
            classDecl = statement;
        }
        else {
            return;
        }
        if (classDecl.id.name.endsWith('Options')) {
            var className = classDecl.id.name.replace(/Options$/, '');
            var classItem = classMap.get(className);
            if (!classItem) {
                classItem = [null, classDecl];
                classMap.set(className, classItem);
            }
            else {
                classItem[1] = classDecl;
            }
        }
        else {
            var className = classDecl.id.name;
            if (classDecl.superClass.name === 'ViewComponent') {
                var classItem = classMap.get(className);
                if (!classItem) {
                    classItem = [classDecl, null];
                    classMap.set(className, classItem);
                }
                else {
                    classItem[0] = classDecl;
                }
            }
        }
    });
    // forEach classMap
    var result = [];
    classMap.forEach(function (classItem, className) {
        var classDecl = classItem[0], optionsDecl = classItem[1];
        if (!classDecl)
            return;
        var component = {
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
        classDecl.decorators.forEach(function (decorator) {
            if (decorator.expression.type === 'CallExpression' && decorator.expression.callee.name === 'Component') {
                decorator.expression.arguments.forEach(function (arg) {
                    if (arg.type === 'ObjectExpression')
                        Object.assign(component, evalOptions(arg));
                });
            }
        });
        {
            var classTypeParams = (0, generator_1.default)(babelTypes.tsInterfaceDeclaration(babelTypes.identifier('Wrapper'), classDecl.typeParameters, [], babelTypes.tsInterfaceBody([]))).code.replace(/^interface Wrapper<?/, '').replace(/>? {}$/, '');
            var optionsTypeParams = (0, generator_1.default)(babelTypes.tsInterfaceDeclaration(babelTypes.identifier('Wrapper'), optionsDecl.typeParameters, [], babelTypes.tsInterfaceBody([]))).code.replace(/^interface Wrapper<?/, '').replace(/>? {}$/, '');
            if (classTypeParams !== optionsTypeParams)
                throw new Error("\u7EC4\u4EF6\u7684".concat(className, "\u6CDB\u578B\u7C7B\u578B\u53C2\u6570\u4E0D\u5339\u914D\uFF01"));
            component.typeParams = classTypeParams;
        }
        optionsDecl.body.body.forEach(function (member) {
            if (member.type === 'ClassProperty') {
                member.decorators.forEach(function (decorator) {
                    if (decorator.expression.type === 'CallExpression') {
                        var calleeName = decorator.expression.callee.name;
                        if (calleeName === 'Prop') {
                            var prop_1 = {
                                name: member.key.name,
                                title: '',
                                type: (0, generator_1.default)(member.typeAnnotation.typeAnnotation).code,
                            };
                            // @TODO: default
                            // @TODO: private
                            decorator.expression.arguments.forEach(function (arg) {
                                if (arg.type === 'ObjectExpression')
                                    Object.assign(prop_1, evalOptions(arg));
                            });
                            component.props.push(prop_1);
                        }
                        else if (calleeName === 'Event') {
                            var event_1 = {
                                name: member.key.name.replace(/^on(\w)/, function (m, $1) { return $1.toLowerCase(); }),
                                title: '',
                                type: (0, generator_1.default)(member.typeAnnotation.typeAnnotation).code,
                            };
                            decorator.expression.arguments.forEach(function (arg) {
                                if (arg.type === 'ObjectExpression')
                                    Object.assign(event_1, evalOptions(arg));
                            });
                            component.events.push(event_1);
                        }
                        else if (calleeName === 'Slot') {
                            var slot_1 = {
                                name: member.key.name.replace(/^slot(\w)/, function (m, $1) { return $1.toLowerCase(); }),
                                title: '',
                                type: (0, generator_1.default)(member.typeAnnotation.typeAnnotation).code,
                            };
                            decorator.expression.arguments.forEach(function (arg) {
                                if (arg.type === 'ObjectExpression')
                                    Object.assign(slot_1, evalOptions(arg));
                            });
                            component.slots.push(slot_1);
                        }
                    }
                });
            }
        });
        classDecl.body.body.forEach(function (member) {
            var _a, _b;
            if (member.type === 'ClassProperty') {
                (_a = member.decorators) === null || _a === void 0 ? void 0 : _a.forEach(function (decorator) {
                    if (decorator.expression.type === 'CallExpression') {
                        var calleeName = decorator.expression.callee.name;
                        if (calleeName === 'Prop') {
                            var prop_2 = {
                                name: member.key.name,
                                title: '',
                                type: (0, generator_1.default)(member.typeAnnotation.typeAnnotation).code,
                            };
                            // @TODO: default
                            // @TODO: private
                            decorator.expression.arguments.forEach(function (arg) {
                                if (arg.type === 'ObjectExpression')
                                    Object.assign(prop_2, evalOptions(arg));
                            });
                            component.readableProps.push(prop_2);
                        }
                    }
                });
            }
            else if (member.type === 'ClassMethod') {
                (_b = member.decorators) === null || _b === void 0 ? void 0 : _b.forEach(function (decorator) {
                    if (decorator.expression.type === 'CallExpression') {
                        var calleeName = decorator.expression.callee.name;
                        if (calleeName === 'Method') {
                            var method_1 = {
                                name: member.key.name,
                                title: '',
                                type: '',
                                // type: generate((member. as babelTypes.TSTypeAnnotation).typeAnnotation).code,
                            };
                            // @TODO: private
                            decorator.expression.arguments.forEach(function (arg) {
                                if (arg.type === 'ObjectExpression')
                                    Object.assign(method_1, evalOptions(arg));
                            });
                            component.methods.push(method_1);
                        }
                    }
                });
            }
        });
        result.push(component);
    });
    return result;
}
exports.transform = transform;
