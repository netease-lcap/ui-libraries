"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transform = exports.evalOptions = void 0;
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
    if (result.onChange) {
        result.onChange.forEach(function (item) {
            if (item.if)
                item.if = item.if.toString();
        });
    }
    return result;
}
exports.evalOptions = evalOptions;
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
    var index = 0;
    classMap.forEach(function (classItem, className) {
        var classDecl = classItem[0], optionsDecl = classItem[1];
        if (!classDecl)
            return;
        var component = {
            concept: 'ViewComponentDeclaration',
            group: '',
            // VanRouterView
            name: className,
            // van-router-view
            kebabName: className.replace(/([A-Z])/g, function (m, $1) { return '-' + $1.toLowerCase(); }).replace(/^-/, ''),
            title: '',
            description: '',
            icon: '',
            tsTypeParams: undefined,
            props: [],
            readableProps: [],
            events: [],
            methods: [],
            slots: [],
            children: [],
            blocks: [],
            themeVariables: [],
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
            component.tsTypeParams = classTypeParams;
        }
        optionsDecl.body.body.forEach(function (member) {
            var _a, _b, _c, _d;
            if (member.type === 'ClassProperty') {
                var _loop_1 = function (i) {
                    var decorator = member.decorators[i];
                    if (decorator.expression.type === 'CallExpression') {
                        var calleeName = decorator.expression.callee.name;
                        if (calleeName === 'Prop') {
                            // 过滤private属性
                            if (member.accessibility === 'private') {
                                return "continue";
                            }
                            ;
                            var prop_1 = {
                                concept: 'PropDeclaration',
                                group: getValueFromObjectExpressionByKey(decorator.expression.arguments[0], 'group') || '主要属性',
                                sync: getValueFromObjectExpressionByKey(decorator.expression.arguments[0], 'sync'),
                                bindHide: getValueFromObjectExpressionByKey(decorator.expression.arguments[0], 'bindHide'),
                                bindOpen: getValueFromObjectExpressionByKey(decorator.expression.arguments[0], 'bindOpen'),
                                tabKind: getValueFromObjectExpressionByKey(decorator.expression.arguments[0], 'tabKind') || 'property',
                                setter: getValueFromObjectExpressionByKey(decorator.expression.arguments[0], 'setter'),
                                name: member.key.name,
                                title: getValueFromObjectExpressionByKey(decorator.expression.arguments[0], 'title'),
                                tsType: (0, generator_1.default)(member.typeAnnotation.typeAnnotation).code,
                            };
                            // 默认值
                            if (member.value) {
                                var typeAnnotation = member.typeAnnotation;
                                prop_1.defaultValue = {
                                    concept: 'DefaultValue',
                                    expression: transformValue(member.value, typeAnnotation.typeAnnotation),
                                    playground: [],
                                };
                            }
                            // @TODO: default
                            // @TODO: private
                            decorator.expression.arguments.forEach(function (arg) {
                                if (arg.type === 'ObjectExpression')
                                    Object.assign(prop_1, evalOptions(arg));
                            });
                            // 枚举类型生成选项
                            if (['EnumSelectSetter', 'CapsulesSetter'].includes((_a = prop_1 === null || prop_1 === void 0 ? void 0 : prop_1.setter) === null || _a === void 0 ? void 0 : _a.concept)) {
                                // 因为converter里有'join:|'，所有这里的分割前后需要空格
                                var types_1 = prop_1 === null || prop_1 === void 0 ? void 0 : prop_1.tsType.split(' | ').map(function (type) { return type.replace(/(\'|\")/g, '').trim(); });
                                // @ts-ignore
                                (_b = prop_1 === null || prop_1 === void 0 ? void 0 : prop_1.setter) === null || _b === void 0 ? void 0 : _b.options = (_d = (_c = prop_1 === null || prop_1 === void 0 ? void 0 : prop_1.setter) === null || _c === void 0 ? void 0 : _c.options) === null || _d === void 0 ? void 0 : _d.map(function (option, idx) {
                                    if (option.if)
                                        option.if = option.if.toString();
                                    if (option.disabledIf)
                                        option.disabledIf = option.disabledIf.toString();
                                    return __assign(__assign({}, option), { value: types_1[idx] });
                                });
                            }
                            if (['_alignment', '_justify'].includes(prop_1.name)) {
                                // 去掉_
                                prop_1.name = prop_1.name.replace(/^_/, '');
                            }
                            component.props.push(prop_1);
                        }
                        else if (calleeName === 'Event') {
                            var event_1 = {
                                concept: 'EventDeclaration',
                                name: member.key.name.replace(/^on(\w)/, function (m, $1) { return $1.toLowerCase(); }),
                                title: '',
                                tsType: (0, generator_1.default)(member.typeAnnotation.typeAnnotation).code,
                            };
                            decorator.expression.arguments.forEach(function (arg) {
                                if (arg.type === 'ObjectExpression')
                                    Object.assign(event_1, evalOptions(arg));
                            });
                            component.events.push(event_1);
                        }
                        else if (calleeName === 'Slot') {
                            var parameters = member.typeAnnotation.typeAnnotation.parameters;
                            var slot_1 = {
                                concept: 'SlotDeclaration',
                                snippets: getValueFromObjectExpressionByKey(decorator.expression.arguments[0], 'snippets'),
                                name: member.key.name.replace(/^slot(\w)/, function (m, $1) { return $1.toLowerCase(); }),
                                title: '',
                                tsType: (0, generator_1.default)(member.typeAnnotation.typeAnnotation).code,
                                params: transformSlotParams(parameters),
                            };
                            decorator.expression.arguments.forEach(function (arg) {
                                if (arg.type === 'ObjectExpression')
                                    Object.assign(slot_1, evalOptions(arg));
                            });
                            component.slots.push(slot_1);
                        }
                    }
                };
                for (var i = 0; i < member.decorators.length; i++) {
                    _loop_1(i);
                }
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
                                concept: 'PropDeclaration',
                                group: getValueFromObjectExpressionByKey(decorator.expression.arguments[0], 'group') || '主要属性',
                                sync: getValueFromObjectExpressionByKey(decorator.expression.arguments[0], 'sync'),
                                bindHide: getValueFromObjectExpressionByKey(decorator.expression.arguments[0], 'bindHide'),
                                bindOpen: getValueFromObjectExpressionByKey(decorator.expression.arguments[0], 'bindOpen'),
                                tabKind: getValueFromObjectExpressionByKey(decorator.expression.arguments[0], 'tabKind') || 'property',
                                setter: getValueFromObjectExpressionByKey(decorator.expression.arguments[0], 'setter'),
                                name: member.key.name,
                                title: getValueFromObjectExpressionByKey(decorator.expression.arguments[0], 'title'),
                                tsType: (0, generator_1.default)(member.typeAnnotation.typeAnnotation).code,
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
                                concept: 'LogicDeclaration',
                                description: getValueFromObjectExpressionByKey(decorator.expression.arguments[0], 'description'),
                                params: member.params.map(function (param) {
                                    var type = param.type;
                                    // 有默认值
                                    if (type === 'AssignmentPattern') {
                                        var decorator_1 = param.left.decorators[0];
                                        var typeAnnotation = param.left.typeAnnotation;
                                        return {
                                            concept: 'Param',
                                            name: param.left.name,
                                            description: getValueFromObjectExpressionByKey(decorator_1.expression.arguments[0], 'description'),
                                            typeAnnotation: transformTypeAnnotation(typeAnnotation.typeAnnotation),
                                            defaultValue: {
                                                concept: 'DefaultValue',
                                                expression: transformValue(param.right, typeAnnotation.typeAnnotation),
                                                playground: [],
                                            },
                                        };
                                    }
                                    else {
                                        var decorator_2 = param.decorators[0];
                                        var typeAnnotation = param.typeAnnotation;
                                        return {
                                            concept: 'Param',
                                            name: param.name,
                                            description: getValueFromObjectExpressionByKey(decorator_2.expression.arguments[0], 'description'),
                                            typeAnnotation: transformTypeAnnotation(typeAnnotation.typeAnnotation),
                                        };
                                    }
                                }),
                                // TODO
                                returns: [],
                                name: member.key.name,
                                title: getValueFromObjectExpressionByKey(decorator.expression.arguments[0], 'title'),
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
        if (index === 0) {
            result.push(component);
        }
        else {
            var parent_1 = result[0];
            parent_1.children.push(component);
        }
        index++;
    });
    return result;
}
exports.transform = transform;
function getValueFromObjectExpressionByKey(object, key) {
    var property = object.properties.find(function (prop) { return prop.type === 'ObjectProperty' && prop.key.name === key; });
    if (!property)
        return undefined;
    return (0, generator_1.default)(property.value).code;
}
var isPrimitive = function (name) { return ['String', 'Integer', 'Decimal', 'Boolean'].includes(name); };
var getMemberExpressionName = function (node) {
    if (node.object.type === 'MemberExpression') {
        // @ts-ignore
        return getMemberExpressionName(node.object) + '.' + node.property.name;
    }
    else {
        // @ts-ignore
        return node.object.name + '.' + node.property.name;
    }
};
function transformValue(node, typeAnnotation) {
    if (node.type === 'NullLiteral') {
        return {
            concept: 'NullLiteral',
        };
    }
    if (node.type === 'StringLiteral') {
        return {
            concept: 'StringLiteral',
            value: node.value,
        };
    }
    if (node.type === 'BooleanLiteral') {
        return {
            concept: 'BooleanLiteral',
            value: String(node.value),
        };
    }
    if (node.type === 'NumericLiteral') {
        var value = String(node.value);
        return {
            concept: 'NumericLiteral',
            value: value,
            typeAnnotation: {
                concept: 'TypeAnnotation',
                typeKind: 'primitive',
                typeName: value.includes('.') ? 'Decimal' : 'Integer',
                typeNamespace: 'nasl.core',
                inferred: false,
                ruleMap: new Map(),
            },
        };
    }
    if (node.type === 'ArrayExpression') {
        return {
            concept: 'NewList',
            items: node.elements.map(function (item) { return transformValue(item); }),
            typeAnnotation: transformTypeAnnotation(typeAnnotation)
        };
    }
    if (node.type === 'TSAsExpression') {
        if (node.expression) {
            if (node.expression.type === 'ArrowFunctionExpression') {
                var body = node.expression.body;
                if (body.type === 'MemberExpression') {
                    var value = getMemberExpressionName(body);
                    value = value.split('.').slice(1).join('.');
                    return {
                        concept: 'StringLiteral',
                        value: value,
                    };
                }
            }
            else {
                return transformValue(node.expression, node.typeAnnotation);
            }
        }
    }
}
function transformTypeAnnotation(node) {
    var _a, _b;
    if (node.type === 'TSTypeReference') {
        var typeName = node.typeName, typeParameters = node.typeParameters;
        if (typeName.type === 'TSQualifiedName') {
            var left = typeName.left, right = typeName.right;
            var primitive = isPrimitive(right.name);
            var namespace = left.left.name + '.' + left.right.name;
            return {
                typeKind: ((_a = typeParameters === null || typeParameters === void 0 ? void 0 : typeParameters.params) === null || _a === void 0 ? void 0 : _a.length)
                    ? 'generic'
                    : (primitive ? 'primitive' : 'reference'),
                typeName: right.name,
                typeNamespace: namespace,
                concept: 'TypeAnnotation',
                inferred: false,
                ruleMap: new Map(),
                typeArguments: transformTypeParameters(typeParameters)
            };
        }
        if (typeName.type === 'Identifier') {
            var primitive = isPrimitive(typeName.name);
            return {
                typeKind: ((_b = typeParameters === null || typeParameters === void 0 ? void 0 : typeParameters.params) === null || _b === void 0 ? void 0 : _b.length)
                    ? 'generic'
                    : (primitive ? 'primitive' : 'reference'),
                typeName: typeName.name,
                typeNamespace: ['Current', 'CurrentDynamic'].includes(typeName.name) ? 'nasl.ui' : '',
                concept: 'TypeAnnotation',
                inferred: false,
                ruleMap: new Map(),
                typeArguments: transformTypeParameters(typeParameters)
            };
        }
    }
}
function transformTypeParameters(typeParameters) {
    var _a;
    return ((_a = typeParameters === null || typeParameters === void 0 ? void 0 : typeParameters.params) === null || _a === void 0 ? void 0 : _a.map(function (param) {
        return __assign(__assign({}, transformTypeAnnotation(param)), { concept: 'TypeAnnotation', typeKind: 'typeParam', inferred: false, ruleMap: new Map() });
    })) || [];
}
function transformSlotParams(params) {
    return (params || []).map(function (param) {
        var typeAnnotation = param.typeAnnotation;
        return {
            concept: 'Param',
            name: param.name,
            description: '',
            typeAnnotation: transformTypeAnnotation(typeAnnotation.typeAnnotation),
        };
    });
}
