/* eslint-disable */
const babel = require('@babel/core');
const babelTypes = require('@babel/types');
const generate = require('@babel/generator').default;

const evalOptions = (object) => {
  const { code } = generate(object);
  const result = eval(`(${code})`);
  if (result.if) result.if = result.if.toString();
  if (result.disabledIf) result.disabledIf = result.disabledIf.toString();
  if (result.onChange) {
    result.onChange.forEach((item) => {
      if (item.if) item.if = item.if.toString();
    });
  }
  return result;
}

exports.evalOptions = evalOptions;

exports.transform = (tsCode) => {
  const root = babel.parseSync(tsCode, {
    filename: 'result.ts',
    presets: [require('@babel/preset-typescript')],
    plugins: [
      [require('@babel/plugin-proposal-decorators'), { legacy: true }],
      // 'babel-plugin-parameter-decorator'
    ],
    rootMode: 'root',
    root: __dirname,
  });
  const programBody = root.program.body;
  let blockOrDecl = programBody.find(
    (stat) => stat.type === 'TSModuleDeclaration',
  );
  while (blockOrDecl && blockOrDecl.type === 'TSModuleDeclaration') {
    blockOrDecl = blockOrDecl.body;
  }
  if (!blockOrDecl) return [];
  const mainBody = blockOrDecl.body;
  /**
   * 组件名：[组件 class, 组件选项 class]
   */
  const classMap = new Map();
  mainBody.forEach((statement) => {
    let classDecl;
    if (statement.type === 'ExportNamedDeclaration') {
      classDecl = statement.declaration;
    } else if (statement.type === 'ClassDeclaration') {
      classDecl = statement;
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
      if (classDecl.superClass.name === 'ViewComponent') {
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
  const result = [];
  let index = 0;
  classMap.forEach((classItem, className) => {
    const [classDecl, optionsDecl] = classItem;
    if (!classDecl) return;
    const component = {
      concept: 'ViewComponentDeclaration',
      group: '',
      // VanRouterView
      name: className,
      // van-router-view
      kebabName: className
        .replace(/([A-Z])/g, (m, $1) => `-${$1.toLowerCase()}`)
        .replace(/^-/, ''),
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
    classDecl.decorators.forEach((decorator) => {
      if (
        decorator.expression.type === 'CallExpression'
        && decorator.expression.callee.name === 'Component'
      ) {
        decorator.expression.arguments.forEach((arg) => {
          if (arg.type === 'ObjectExpression') { Object.assign(component, evalOptions(arg)); }
        });
      }
    });
    {
      const classTypeParams = generate(
        babelTypes.tsInterfaceDeclaration(
          babelTypes.identifier('Wrapper'),
          classDecl.typeParameters,
          [],
          babelTypes.tsInterfaceBody([]),
        ),
      )
        .code.replace(/^interface Wrapper<?/, '')
        .replace(/>? {}$/, '');
      const optionsTypeParams = generate(
        babelTypes.tsInterfaceDeclaration(
          babelTypes.identifier('Wrapper'),
          optionsDecl.typeParameters,
          [],
          babelTypes.tsInterfaceBody([]),
        ),
      )
        .code.replace(/^interface Wrapper<?/, '')
        .replace(/>? {}$/, '');
      if (classTypeParams !== optionsTypeParams) { throw new Error(`组件的${className}泛型类型参数不匹配！`); }
      component.tsTypeParams = classTypeParams;
    }
    optionsDecl.body.body.forEach((member) => {
      let _a; let _b; let _c; let
        _d;
      if (member.type === 'ClassProperty') {
        for (let i = 0; i < member.decorators.length; i++) {
          const decorator = member.decorators[i];
          if (decorator.expression.type === 'CallExpression') {
            const calleeName = decorator.expression.callee.name;
            if (calleeName === 'Prop') {
              // 过滤private属性
              if (member.accessibility === 'private') {
                continue;
              }
              const prop = {
                concept: 'PropDeclaration',
                group:
                  getValueFromObjectExpressionByKey(
                    decorator.expression.arguments[0],
                    'group',
                  ) || '主要属性',
                sync: getValueFromObjectExpressionByKey(
                  decorator.expression.arguments[0],
                  'sync',
                ),
                bindHide: getValueFromObjectExpressionByKey(
                  decorator.expression.arguments[0],
                  'bindHide',
                ),
                bindOpen: getValueFromObjectExpressionByKey(
                  decorator.expression.arguments[0],
                  'bindOpen',
                ),
                tabKind:
                  getValueFromObjectExpressionByKey(
                    decorator.expression.arguments[0],
                    'tabKind',
                  ) || 'property',
                setter: getValueFromObjectExpressionByKey(
                  decorator.expression.arguments[0],
                  'setter',
                ),
                name: member.key.name,
                title: getValueFromObjectExpressionByKey(
                  decorator.expression.arguments[0],
                  'title',
                ),
                tsType: generate(member.typeAnnotation.typeAnnotation).code,
              };
              // 默认值
              if (member.value) {
                const { typeAnnotation } = member;
                prop.defaultValue = {
                  concept: 'DefaultValue',
                  expression: transformValue(
                    member.value,
                    typeAnnotation.typeAnnotation,
                  ),
                  playground: [],
                };
              }
              // @TODO: default
              // @TODO: private
              decorator.expression.arguments.forEach((arg) => {
                if (arg.type === 'ObjectExpression') { Object.assign(prop, evalOptions(arg)); }
              });
              // 枚举类型生成选项
              if (
                ['EnumSelectSetter', 'CapsulesSetter'].includes(
                  (_a = prop === null || prop === void 0 ? void 0 : prop.setter)
                    === null || _a === void 0
                    ? void 0
                    : _a.concept,
                )
              ) {
                // 因为converter里有'join:|'，所有这里的分割前后需要空格
                const types = prop === null || prop === void 0
                  ? void 0
                  : prop.tsType
                    .split(' | ')
                    .map((type) => type.replace(/(\'|\")/g, '').trim());
                // @ts-ignore
                (_b = prop === null || prop === void 0 ? void 0 : prop.setter)
                  === null || _b === void 0
                  ? void 0
                  : (_b.options = (_d = (_c = prop === null || prop === void 0
                    ? void 0
                    : prop.setter) === null || _c === void 0
                    ? void 0
                    : _c.options) === null || _d === void 0
                    ? void 0
                    : _d.map((option, idx) => {
                      if (option.if) option.if = option.if.toString();
                      if (option.disabledIf) { option.disabledIf = option.disabledIf.toString(); }
                      return { ...option, value: types[idx] };
                    }));
              }
              if (['_alignment', '_justify'].includes(prop.name)) {
                // 去掉_
                prop.name = prop.name.replace(/^_/, '');
              }
              component.props.push(prop);
            } else if (calleeName === 'Event') {
              const event = {
                concept: 'EventDeclaration',
                name: member.key.name.replace(/^on(\w+)/, ($0, $1) => {
                  return $1.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
                }),
                title: '',
                tsType: generate(member.typeAnnotation.typeAnnotation).code,
              };
              decorator.expression.arguments.forEach((arg) => {
                if (arg.type === 'ObjectExpression') { Object.assign(event, evalOptions(arg)); }
              });
              component.events.push(event);
            } else if (calleeName === 'Slot') {
              const { parameters } = member.typeAnnotation.typeAnnotation;
              const slot = {
                concept: 'SlotDeclaration',
                snippets: getValueFromObjectExpressionByKey(
                  decorator.expression.arguments[0],
                  'snippets',
                ),
                name: member.key.name.replace(/^slot(\w)/, (m, $1) => $1.toLowerCase()),
                title: '',
                tsType: generate(member.typeAnnotation.typeAnnotation).code,
                params: transformSlotParams(parameters),
              };
              decorator.expression.arguments.forEach((arg) => {
                if (arg.type === 'ObjectExpression') { Object.assign(slot, evalOptions(arg)); }
              });
              component.slots.push(slot);
            }
          }
        }
      }
    });
    classDecl.body.body.forEach((member) => {
      let _a; let
        _b;
      if (member.type === 'ClassProperty') {
        (_a = member.decorators) === null || _a === void 0
          ? void 0
          : _a.forEach((decorator) => {
            if (decorator.expression.type === 'CallExpression') {
              const calleeName = decorator.expression.callee.name;
              if (calleeName === 'Prop') {
                const prop = {
                  concept: 'PropDeclaration',
                  group:
                      getValueFromObjectExpressionByKey(
                        decorator.expression.arguments[0],
                        'group',
                      ) || '主要属性',
                  sync: getValueFromObjectExpressionByKey(
                    decorator.expression.arguments[0],
                    'sync',
                  ),
                  bindHide: getValueFromObjectExpressionByKey(
                    decorator.expression.arguments[0],
                    'bindHide',
                  ),
                  bindOpen: getValueFromObjectExpressionByKey(
                    decorator.expression.arguments[0],
                    'bindOpen',
                  ),
                  tabKind:
                      getValueFromObjectExpressionByKey(
                        decorator.expression.arguments[0],
                        'tabKind',
                      ) || 'property',
                  setter: getValueFromObjectExpressionByKey(
                    decorator.expression.arguments[0],
                    'setter',
                  ),
                  name: member.key.name,
                  title: getValueFromObjectExpressionByKey(
                    decorator.expression.arguments[0],
                    'title',
                  ),
                  tsType: generate(member.typeAnnotation.typeAnnotation).code,
                };
                  // @TODO: default
                  // @TODO: private
                decorator.expression.arguments.forEach((arg) => {
                  if (arg.type === 'ObjectExpression') { Object.assign(prop, evalOptions(arg)); }
                });
                component.readableProps.push(prop);
              }
            }
          });
      } else if (member.type === 'ClassMethod') {
        (_b = member.decorators) === null || _b === void 0
          ? void 0
          : _b.forEach((decorator) => {
            if (decorator.expression.type === 'CallExpression') {
              const calleeName = decorator.expression.callee.name;
              if (calleeName === 'Method') {
                const method = {
                  concept: 'LogicDeclaration',
                  description: getValueFromObjectExpressionByKey(
                    decorator.expression.arguments[0],
                    'description',
                  ),
                  params: member.params.map((param) => {
                    const { type } = param;
                    // 有默认值
                    if (type === 'AssignmentPattern') {
                      const decorator = param.left.decorators[0];
                      const { typeAnnotation } = param.left;
                      return {
                        concept: 'Param',
                        name: param.left.name,
                        description: getValueFromObjectExpressionByKey(
                          decorator.expression.arguments[0],
                          'description',
                        ),
                        typeAnnotation: transformTypeAnnotation(
                          typeAnnotation.typeAnnotation,
                        ),
                        defaultValue: {
                          concept: 'DefaultValue',
                          expression: transformValue(
                            param.right,
                            typeAnnotation.typeAnnotation,
                          ),
                          playground: [],
                        },
                      };
                    }
                    const decorator = param.decorators[0];
                    const { typeAnnotation } = param;
                    return {
                      concept: 'Param',
                      name: param.name,
                      description: getValueFromObjectExpressionByKey(
                        decorator.expression.arguments[0],
                        'description',
                      ),
                      typeAnnotation: transformTypeAnnotation(
                        typeAnnotation.typeAnnotation,
                      ),
                    };
                  }),
                  // TODO
                  returns: [],
                  name: member.key.name,
                  title: getValueFromObjectExpressionByKey(
                    decorator.expression.arguments[0],
                    'title',
                  ),
                  // type: generate((member. as babelTypes.TSTypeAnnotation).typeAnnotation).code,
                };
                  // @TODO: private
                decorator.expression.arguments.forEach((arg) => {
                  if (arg.type === 'ObjectExpression') { Object.assign(method, evalOptions(arg)); }
                });
                component.methods.push(method);
              }
            }
          });
      }
    });
    if (index === 0) {
      result.push(component);
    } else {
      const parent = result[0];
      parent.children.push(component);
    }
    index++;
  });
  return result;
}
function getValueFromObjectExpressionByKey(object, key) {
  const property = object.properties.find(
    (prop) => prop.type === 'ObjectProperty' && prop.key.name === key,
  );
  if (!property) return undefined;
  return generate(property.value).code;
}
const isPrimitive = (name) => ['String', 'Integer', 'Decimal', 'Boolean'].includes(name);
const getMemberExpressionName = (node) => {
  if (node.object.type === 'MemberExpression') {
    // @ts-ignore
    return `${getMemberExpressionName(node.object)}.${node.property.name}`;
  }
  // @ts-ignore
  return `${node.object.name}.${node.property.name}`;
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
    const value = String(node.value);
    return {
      concept: 'NumericLiteral',
      value,
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
      items: node.elements.map((item) => transformValue(item)),
      typeAnnotation: transformTypeAnnotation(typeAnnotation),
    };
  }
  if (node.type === 'TSAsExpression') {
    if (node.expression) {
      if (node.expression.type === 'ArrowFunctionExpression') {
        const { body } = node.expression;
        if (body.type === 'MemberExpression') {
          let value = getMemberExpressionName(body);
          value = value
            .split('.')
            .slice(1)
            .join('.');
          return {
            concept: 'StringLiteral',
            value,
          };
        }
      } else {
        return transformValue(node.expression, node.typeAnnotation);
      }
    }
  }
}
function transformTypeAnnotation(node) {
  let _a; let
    _b;
  if (node.type === 'TSTypeReference') {
    const { typeName, typeParameters } = node;
    if (typeName.type === 'TSQualifiedName') {
      const { left, right } = typeName;
      const primitive = isPrimitive(right.name);
      const namespace = `${left.left.name}.${left.right.name}`;
      return {
        typeKind: ((_a = typeParameters === null || typeParameters === void 0
          ? void 0
          : typeParameters.params) === null || _a === void 0
          ? void 0
          : _a.length)
          ? 'generic'
          : primitive
            ? 'primitive'
            : 'reference',
        typeName: right.name,
        typeNamespace: namespace,
        concept: 'TypeAnnotation',
        inferred: false,
        ruleMap: new Map(),
        typeArguments: transformTypeParameters(typeParameters),
      };
    }
    if (typeName.type === 'Identifier') {
      const primitive = isPrimitive(typeName.name);
      return {
        typeKind: ((_b = typeParameters === null || typeParameters === void 0
          ? void 0
          : typeParameters.params) === null || _b === void 0
          ? void 0
          : _b.length)
          ? 'generic'
          : primitive
            ? 'primitive'
            : 'reference',
        typeName: typeName.name,
        typeNamespace: ['Current', 'CurrentDynamic'].includes(typeName.name)
          ? 'nasl.ui'
          : '',
        concept: 'TypeAnnotation',
        inferred: false,
        ruleMap: new Map(),
        typeArguments: transformTypeParameters(typeParameters),
      };
    }
  }
}
function transformTypeParameters(typeParameters) {
  let _a;
  return (
    ((_a = typeParameters === null || typeParameters === void 0
      ? void 0
      : typeParameters.params) === null || _a === void 0
      ? void 0
      : _a.map((param) => {
        return {
          ...transformTypeAnnotation(param),
          concept: 'TypeAnnotation',
          typeKind: 'typeParam',
          inferred: false,
          ruleMap: new Map(),
        };
      })) || []
  );
}
function transformSlotParams(params) {
  return (params || []).map((param) => {
    const { typeAnnotation } = param;
    return {
      concept: 'Param',
      name: param.name,
      description: '',
      typeAnnotation: transformTypeAnnotation(typeAnnotation.typeAnnotation),
    };
  });
}
