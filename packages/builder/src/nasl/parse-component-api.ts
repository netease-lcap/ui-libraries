/* eslint-disable no-useless-escape */
/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
/* eslint-disable global-require */
/* eslint-disable no-use-before-define */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as babel from '@babel/core';
import * as babelTypes from '@babel/types';
import generate from '@babel/generator';
import * as astTypes from '@nasl/types/nasl.ui.ast';
import { evalOptions, getSlotName } from '../utils/babel-utils';

function getValueFromObjectExpressionByKey(object: babelTypes.ObjectExpression, key: string): unknown {
  const property = object.properties.find((prop) => prop.type === 'ObjectProperty' && (prop.key as babelTypes.Identifier).name === key) as babelTypes.ObjectProperty;
  if (!property) return undefined;

  return generate(property.value).code;
}

type DefaultValue =
  | babelTypes.NullLiteral
  | babelTypes.BooleanLiteral
  | babelTypes.StringLiteral
  | babelTypes.NumericLiteral
  | babelTypes.ArrayExpression
  | babelTypes.ObjectExpression
  | babelTypes.TSAsExpression;
type Annotation = babelTypes.TSTypeReference | babelTypes.TSUnionType;
const isPrimitive = (name: string) => ['String', 'Integer', 'Decimal', 'Boolean'].includes(name);

const getMemberExpressionName = (node: babelTypes.MemberExpression): string => {
  if (node.object.type === 'MemberExpression') {
    // @ts-ignore
    return `${getMemberExpressionName(node.object)}.${node.property.name}`;
  }

  // @ts-ignore
  return `${node.object.name}.${node.property.name}`;
};

// eslint-disable-next-line consistent-return
function transformTypeAnnotation(node: Annotation): astTypes.TypeAnnotation | undefined {
  if (node.type === 'TSTypeReference') {
    const { typeName, typeParameters } = node;
    if (typeParameters && typeName.type === 'TSQualifiedName') {
      const { left, right } = typeName;
      const primitive = isPrimitive(right.name);
      const namespace = `${((left as babelTypes.TSQualifiedName).left as babelTypes.Identifier).name}.${(left as babelTypes.TSQualifiedName).right.name}`;

      return {
        typeKind: typeParameters?.params?.length ? 'generic' : primitive ? 'primitive' : 'reference',
        typeName: right.name,
        typeNamespace: namespace,
        concept: 'TypeAnnotation',
        inferred: false,
        ruleMap: new Map(),
        typeArguments: transformTypeParameters(typeParameters),
      };
    }

    if (typeParameters && typeName.type === 'Identifier') {
      const primitive = isPrimitive(typeName.name);

      return {
        typeKind: typeParameters?.params?.length ? 'generic' : primitive ? 'primitive' : 'reference',
        typeName: typeName.name,
        typeNamespace: ['Current', 'CurrentDynamic'].includes(typeName.name) ? 'nasl.ui' : '',
        concept: 'TypeAnnotation',
        inferred: false,
        ruleMap: new Map(),
        typeArguments: transformTypeParameters(typeParameters),
      };
    }
  }
}

function transformTypeParameters(typeParameters: babelTypes.TSTypeParameterInstantiation): astTypes.TypeAnnotation[] | any {
  return (
    typeParameters?.params?.map((param) => {
      return {
        ...transformTypeAnnotation(param as Annotation),
        concept: 'TypeAnnotation',
        typeKind: 'typeParam',
        inferred: false,
        ruleMap: new Map(),
      };
    }) || []
  );
}

function transformSlotParams(params: babelTypes.Identifier[]): astTypes.Param[] | any {
  return (params || []).map((param) => {
    const typeAnnotation = param.typeAnnotation as babelTypes.TSTypeAnnotation;
    return {
      concept: 'Param',
      name: param.name,
      description: '',
      typeAnnotation: transformTypeAnnotation(typeAnnotation.typeAnnotation as Annotation),
    };
  });
}

function transformValue(node: DefaultValue, typeAnnotation?: Annotation): any {
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
      items: node.elements.map((item) => transformValue(item as DefaultValue)),
      typeAnnotation: transformTypeAnnotation(typeAnnotation as any),
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
        return transformValue(node.expression as DefaultValue, node.typeAnnotation as Annotation);
      }
    }
  }
}

export default function transform(tsCode: string): astTypes.ViewComponentDeclaration[] {
  const root = babel.parseSync(tsCode, {
    filename: 'result.ts',
    presets: [require('@babel/preset-typescript')],
    plugins: [
      [require('@babel/plugin-proposal-decorators'), { legacy: true }],
      // 'babel-plugin-parameter-decorator'
    ],
    rootMode: 'root',
    root: __dirname,
  }) as babelTypes.File;
  const programBody = root.program.body;
  let blockOrDecl: babelTypes.TSModuleDeclaration | babelTypes.TSModuleBlock = programBody.find((stat) => stat.type === 'TSModuleDeclaration') as babelTypes.TSModuleDeclaration;
  while (blockOrDecl && blockOrDecl.type === 'TSModuleDeclaration') {
    blockOrDecl = blockOrDecl.body;
  }
  if (!blockOrDecl) return [];

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
    if (classDecl.id && classDecl.id.name.endsWith('Options')) {
      const className = classDecl.id.name.replace(/Options$/, '');
      let classItem: any = classMap.get(className);
      if (!classItem) {
        classItem = [null, classDecl];
        classMap.set(className, classItem);
      } else {
        classItem[1] = classDecl;
      }
    } else {
      const className: any = classDecl?.id?.name;
      if ((classDecl.superClass as babelTypes.Identifier).name === 'ViewComponent') {
        let classItem: any = classMap.get(className);
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
  const result: astTypes.ViewComponentDeclaration[] = [];
  let index = 0;
  classMap.forEach((classItem, className) => {
    const [classDecl, optionsDecl] = classItem;
    if (!classDecl) return;

    const component: astTypes.ViewComponentDeclaration = {
      concept: 'ViewComponentDeclaration',
      group: '',
      // VanRouterView
      name: className,
      // van-router-view
      kebabName: className.replace(/([A-Z])/g, (m, $1) => `-${$1.toLowerCase()}`).replace(/^-/, ''),
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

    (classDecl.decorators as any[]).forEach((decorator) => {
      if (decorator.expression.type === 'CallExpression' && (decorator.expression.callee as babelTypes.Identifier).name === 'Component') {
        decorator.expression.arguments.forEach((arg) => {
          if (arg.type === 'ObjectExpression') Object.assign(component, evalOptions(arg));
        });
      } else if (decorator.expression.type === 'CallExpression' && (decorator.expression.callee.name === 'ExtensionComponent' || decorator.expression.callee.name === 'IDEExtraInfo')) {
        decorator.expression.arguments.forEach((arg) => {
          if (arg.type === 'ObjectExpression') { Object.assign(component, evalOptions(arg)); }
        });
      }
    });

    {
      const classTypeParams = generate(
        babelTypes.tsInterfaceDeclaration(babelTypes.identifier('Wrapper'), classDecl.typeParameters as babelTypes.TSTypeParameterDeclaration, [], babelTypes.tsInterfaceBody([])),
      )
        .code.replace(/^interface Wrapper<?/, '')
        .replace(/>? {}$/, '');
      const optionsTypeParams = generate(
        babelTypes.tsInterfaceDeclaration(babelTypes.identifier('Wrapper'), optionsDecl.typeParameters as babelTypes.TSTypeParameterDeclaration, [], babelTypes.tsInterfaceBody([])),
      )
        .code.replace(/^interface Wrapper<?/, '')
        .replace(/>? {}$/, '');
      if (classTypeParams !== optionsTypeParams) throw new Error(`组件的${className}泛型类型参数不匹配！`);

      component.tsTypeParams = classTypeParams;
    }

    optionsDecl.body.body.forEach((member) => {
      if (member.type === 'ClassProperty' && member.decorators) {
        for (let i = 0; i < member.decorators.length; i++) {
          const decorator = member.decorators[i];
          if (decorator.expression.type === 'CallExpression') {
            const calleeName = (decorator.expression.callee as babelTypes.Identifier).name;
            if (calleeName === 'Prop') {
              // 过滤private属性
              if (member.accessibility === 'private') {
                // eslint-disable-next-line no-continue
                continue;
              }

              const prop: astTypes.PropDeclaration = {
                concept: 'PropDeclaration',
                group: (getValueFromObjectExpressionByKey(decorator.expression.arguments[0] as babelTypes.ObjectExpression, 'group') as astTypes.PropDeclaration['group']) || '主要属性',
                sync: getValueFromObjectExpressionByKey(decorator.expression.arguments[0] as babelTypes.ObjectExpression, 'sync') as astTypes.PropDeclaration['sync'],
                bindHide: getValueFromObjectExpressionByKey(decorator.expression.arguments[0] as babelTypes.ObjectExpression, 'bindHide') as astTypes.PropDeclaration['bindHide'],
                bindOpen: getValueFromObjectExpressionByKey(decorator.expression.arguments[0] as babelTypes.ObjectExpression, 'bindOpen') as astTypes.PropDeclaration['bindOpen'],
                tabKind: (getValueFromObjectExpressionByKey(decorator.expression.arguments[0] as babelTypes.ObjectExpression, 'tabKind') as astTypes.PropDeclaration['tabKind']) || 'property',
                setter: getValueFromObjectExpressionByKey(decorator.expression.arguments[0] as babelTypes.ObjectExpression, 'setter') as astTypes.PropDeclaration['setter'],
                name: (member.key as babelTypes.Identifier).name,
                title: getValueFromObjectExpressionByKey(decorator.expression.arguments[0] as babelTypes.ObjectExpression, 'title') as astTypes.PropDeclaration['title'],
                tsType: generate((member.typeAnnotation as babelTypes.TSTypeAnnotation).typeAnnotation).code,
              };
              // 默认值
              if (member.value) {
                const typeAnnotation = member.typeAnnotation as babelTypes.TSTypeAnnotation;
                prop.defaultValue = {
                  concept: 'DefaultValue',
                  expression: transformValue(member.value as DefaultValue, typeAnnotation.typeAnnotation as Annotation),
                  playground: [] as Array<astTypes.LogicItem>,
                };
              }

              // @TODO: default
              // @TODO: private
              decorator.expression.arguments.forEach((arg) => {
                if (arg.type === 'ObjectExpression') Object.assign(prop, evalOptions(arg));
              });

              // 枚举类型生成选项
              if (['EnumSelectSetter', 'CapsulesSetter'].includes(prop?.setter?.concept)) {
                // 因为converter里有'join:|'，所有这里的分割前后需要空格
                const types = prop?.tsType.split(' | ').map((type) => type.replace(/(\'|\")/g, '').trim());
                // @ts-ignore
                prop?.setter?.options = prop?.setter?.options?.map((option: any, idx) => {
                  if (option.if) {
                    option.if = option.if.toString();
                    option.tsIf = option.if;
                  }
                  if (option.disabledIf) {
                    option.disabledIf = option.disabledIf.toString();
                    option.tsDisabledIf = option.disabledIf;
                  }
                  return {
                    ...option,
                    value: types[idx],
                  };
                });
              }

              if (['_alignment', '_justify'].includes(prop.name)) {
                // 去掉_
                prop.name = prop.name.replace(/^_/, '');
              }

              component.props.push(prop);
            } else if (calleeName === 'Event') {
              const event: astTypes.EventDeclaration = {
                concept: 'EventDeclaration',
                name: (member.key as babelTypes.Identifier).name.replace(/^on(\w+)/, ($0, $1) => {
                  return $1.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
                }),
                title: '',
                tsType: generate((member.typeAnnotation as babelTypes.TSTypeAnnotation).typeAnnotation).code,
              };
              decorator.expression.arguments.forEach((arg) => {
                if (arg.type === 'ObjectExpression') Object.assign(event, evalOptions(arg));
              });
              component.events.push(event);
            } else if (calleeName === 'Slot') {
              const parameters = ((member.typeAnnotation as babelTypes.TSTypeAnnotation).typeAnnotation as babelTypes.TSFunctionType).parameters as babelTypes.Identifier[];

              let slotName;

              if (member.key.type === 'Identifier') {
                slotName = member.key.name;
              } else if (member.key.type === 'StringLiteral') {
                slotName = member.key.value;
              }

              const slot: astTypes.SlotDeclaration = {
                concept: 'SlotDeclaration',
                snippets: getValueFromObjectExpressionByKey(decorator.expression.arguments[0] as babelTypes.ObjectExpression, 'snippets') as astTypes.SlotDeclaration['snippets'],
                name: getSlotName(slotName),
                title: '',
                tsType: generate((member.typeAnnotation as babelTypes.TSTypeAnnotation).typeAnnotation).code,
                params: transformSlotParams(parameters),
              };

              decorator.expression.arguments.forEach((arg) => {
                if (arg.type === 'ObjectExpression') Object.assign(slot, evalOptions(arg));
              });
              component.slots.push(slot);
            }
          }
        }
      }
    });

    classDecl.body.body.forEach((member) => {
      if ((member.type === 'ClassProperty' || member.type === 'ClassMethod') && member.accessibility === 'private') {
        return;
      }

      if (member.type === 'ClassProperty') {
        member.decorators?.forEach((decorator) => {
          if (decorator.expression.type === 'CallExpression') {
            const calleeName = (decorator.expression.callee as babelTypes.Identifier).name;
            if (calleeName === 'Prop') {
              const prop: astTypes.PropDeclaration = {
                concept: 'PropDeclaration',
                group: (getValueFromObjectExpressionByKey(decorator.expression.arguments[0] as babelTypes.ObjectExpression, 'group') as astTypes.PropDeclaration['group']) || '主要属性',
                sync: getValueFromObjectExpressionByKey(decorator.expression.arguments[0] as babelTypes.ObjectExpression, 'sync') as astTypes.PropDeclaration['sync'],
                bindHide: getValueFromObjectExpressionByKey(decorator.expression.arguments[0] as babelTypes.ObjectExpression, 'bindHide') as astTypes.PropDeclaration['bindHide'],
                bindOpen: getValueFromObjectExpressionByKey(decorator.expression.arguments[0] as babelTypes.ObjectExpression, 'bindOpen') as astTypes.PropDeclaration['bindOpen'],
                tabKind: (getValueFromObjectExpressionByKey(decorator.expression.arguments[0] as babelTypes.ObjectExpression, 'tabKind') as astTypes.PropDeclaration['tabKind']) || 'property',
                setter: getValueFromObjectExpressionByKey(decorator.expression.arguments[0] as babelTypes.ObjectExpression, 'setter') as astTypes.PropDeclaration['setter'],
                name: (member.key as babelTypes.Identifier).name,
                title: getValueFromObjectExpressionByKey(decorator.expression.arguments[0] as babelTypes.ObjectExpression, 'title') as astTypes.PropDeclaration['title'],
                tsType: generate((member.typeAnnotation as babelTypes.TSTypeAnnotation).typeAnnotation).code,
              };

              // @TODO: default
              // @TODO: private
              decorator.expression.arguments.forEach((arg) => {
                if (arg.type === 'ObjectExpression') Object.assign(prop, evalOptions(arg));
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
              const method: astTypes.LogicDeclaration = {
                concept: 'LogicDeclaration',
                description: getValueFromObjectExpressionByKey(decorator.expression.arguments[0] as babelTypes.ObjectExpression, 'description') as astTypes.LogicDeclaration['description'],
                params: member.params.map((param: any) => {
                  const { type } = param;

                  // 有默认值
                  if (type === 'AssignmentPattern') {
                    const decorator = param.left.decorators[0];
                    const typeAnnotation = (param.left as babelTypes.Identifier).typeAnnotation as babelTypes.TSTypeAnnotation;
                    return {
                      concept: 'Param',
                      name: (param.left as babelTypes.Identifier).name,
                      description: getValueFromObjectExpressionByKey(
                        (decorator.expression as babelTypes.CallExpression).arguments[0] as babelTypes.ObjectExpression,
                        'description',
                      ) as astTypes.LogicDeclaration['description'],
                      typeAnnotation: transformTypeAnnotation(typeAnnotation.typeAnnotation as Annotation),
                      defaultValue: {
                        concept: 'DefaultValue',
                        expression: transformValue((param as babelTypes.AssignmentPattern).right as DefaultValue, typeAnnotation.typeAnnotation as Annotation),
                        playground: [] as Array<astTypes.LogicItem>,
                      },
                    };
                  }
                  // eslint-disable-next-line no-shadow
                  const decorator = param.decorators[0];
                  const typeAnnotation = (param as babelTypes.Identifier).typeAnnotation as babelTypes.TSTypeAnnotation;
                  return {
                    concept: 'Param',
                    name: (param as babelTypes.Identifier).name,
                    description: getValueFromObjectExpressionByKey(
                      (decorator.expression as babelTypes.CallExpression).arguments[0] as babelTypes.ObjectExpression,
                      'description',
                    ) as astTypes.LogicDeclaration['description'],
                    typeAnnotation: transformTypeAnnotation(typeAnnotation.typeAnnotation as Annotation),
                  } as any;
                }),
                // TODO
                returns: [],

                name: (member.key as babelTypes.Identifier).name,
                title: getValueFromObjectExpressionByKey(decorator.expression.arguments[0] as babelTypes.ObjectExpression, 'title') as astTypes.LogicDeclaration['title'],
                // type: generate((member. as babelTypes.TSTypeAnnotation).typeAnnotation).code,
              };

              decorator.expression.arguments.forEach((arg) => {
                if (arg.type === 'ObjectExpression') Object.assign(method, evalOptions(arg));
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
