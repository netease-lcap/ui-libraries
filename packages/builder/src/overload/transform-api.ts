import * as babel from '@babel/core';
import * as babelTypes from '@babel/types';
import generate from '@babel/generator';
import traverse from '@babel/traverse';
import { OverloadComponentContext } from './context';
import { upperFirst } from 'lodash';

function addPrefix(name, prefix) {
  return upperFirst(prefix.toLowerCase()) + name;
}

export function transformAPITs(tsCode, context: OverloadComponentContext) {
  const ast = babel.parse(tsCode, {
    filename: 'result.ts',
    presets: [require('@babel/preset-typescript')],
    plugins: [
      [require('@babel/plugin-proposal-decorators'), { legacy: true }],
    ],
    rootMode: 'root',
    root: __dirname,
  }) as babelTypes.File;

  const insertAST = babel.parseSync('const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;');

  traverse(ast, {
    TSModuleDeclaration(path) {
      const parentNode = path.parent;
      if (
        parentNode.type === 'TSModuleDeclaration'
        && parentNode.id.type === 'Identifier'
        && parentNode.id.name === 'nasl'
        && path.node.id.type === 'Identifier'
        && path.node.id.name === 'ui'
        && path.node.body.type === 'TSModuleBlock'
      ) {
        parentNode.id.name = 'extensions';
        path.node.id.name = context.pkgName;

        const tempBody = path.node.body;
        path.node.body = {
          type: 'TSModuleDeclaration',
          id: {
            type: 'Identifier',
            name: 'viewComponents'
          },
          body: tempBody,
        };

        if (insertAST) {
          tempBody.body.unshift(...insertAST.program.body);
        }
      }
    },
    TSTypeReference(path) {
      const addNaslUINamespace = [
        'ViewComponent', 'CurrentDynamic', 'DataSourceParams',
        'PoiInfo', 'File', 'SelectData', 'DragAndDropUpdateData',
        'ValidateResult', 'BaseEvent',
      ];
      if (path.node.typeName.type === 'Identifier' && addNaslUINamespace.indexOf(path.node.typeName.name) !== -1) {
        const typeName = path.node.typeName;
        path.node.typeName = {
          type: 'TSQualifiedName',
          left: {
            type: 'TSQualifiedName',
            left: {
              type: 'Identifier',
              name: 'nasl',
            },
            right: {
              type: 'Identifier',
              name: 'ui',
            }
          },
          right: typeName,
        }
      }

      if (
        path.node.typeName.type === 'Identifier'
        && path.node.typeName.name.endsWith('Options')
      ) {
        path.node.typeName.name = addPrefix(path.node.typeName.name, context.prefix);
      }
    },
    ClassDeclaration(path) {
      if (path.node.superClass && path.node.id && path.node.id.type === 'Identifier' && path.node.superClass.type === 'Identifier' && path.node.superClass.name === 'ViewComponent') {
        if (path.node.id.name !== context.naslUIConfig.name) {
          path.remove();
          return;
        }
        path.node.id.name = addPrefix(path.node.id.name, context.prefix);
        if (!path.node.decorators) {
          return;
        }
        const decorator = path.node.decorators.find((d) => d.expression.type === 'CallExpression' && d.expression.callee.type === 'Identifier' && d.expression.callee.name === 'Component');

        const index = path.node.decorators.findIndex((d) => d.expression.type === 'CallExpression' && d.expression.callee.type === 'Identifier' && d.expression.callee.name === 'IDEExtraInfo');
        if (index !== -1) {
          path.node.decorators.splice(index, 1);
        }

        if (
          decorator && context.naslUIConfig.ideusage
        ) {
          const code = `const temp = ${JSON.stringify(context.naslUIConfig.ideusage)};`;
          const tempAST = babel.parseSync(code);
          const decorators = path.node.decorators || [];
          if (tempAST) {
            traverse(tempAST, {
              VariableDeclarator(p) {
                if (p.node.id.type === 'Identifier' && p.node.id.name === 'temp' && p.node.init && p.node.init.type === 'ObjectExpression') {
                  decorators.unshift({
                    type: 'Decorator',
                    expression: {
                      type: 'CallExpression',
                      callee: {
                        type: 'Identifier',
                        name: 'ExtensionComponent',
                      },
                      arguments: [{
                        type: 'ObjectExpression',
                        properties: [{
                          type: 'ObjectProperty',
                          key: {
                            type: 'Identifier',
                            name: 'type',
                          },
                          value: {
                            type: 'StringLiteral',
                            value: context.type,
                          },
                          computed: false,
                          shorthand: false,
                        }, {
                          type: 'ObjectProperty',
                          key: {
                            type: 'Identifier',
                            name: 'show',
                          },
                          value: {
                            type: 'BooleanLiteral',
                            value: true,
                          },
                          computed: false,
                          shorthand: false,
                        },{
                          type: 'ObjectProperty',
                          key: {
                            type: 'Identifier',
                            name: 'ideusage',
                          },
                          value: p.node.init,
                          computed: false,
                          shorthand: false,
                        }]
                      }],
                    }
                  });
                }
              }
            });
          }
        }
      } else if (path.node.id && path.node.id.type === 'Identifier' && path.node.superClass && path.node.superClass.type === 'Identifier' && path.node.superClass.name === 'ViewComponentOptions') {
        if (path.node.id.name !== `${context.naslUIConfig.name}Options`) {
          path.remove();
          return;
        }
        path.node.id.name = addPrefix(path.node.id.name, context.prefix);
      }
    },
    // ObjectProperty(path) {
    //   if (path.node.key.type === 'Identifier' && path.node.key.name === 'code' && path.node.value.type === 'StringLiteral') {
    //     let code = path.node.value.value;

    //     Object.keys(context.replaceTagMap).forEach((name) => {
    //       code = code.replaceAll(`<${name}`, `<${context.replaceTagMap[name]}`).replaceAll(`</${name}`, `</${context.replaceTagMap[name]}`);
    //     });
    //     path.node.value.value = code;
    //   }
    // }
  });

  return generate(ast).code;
}
