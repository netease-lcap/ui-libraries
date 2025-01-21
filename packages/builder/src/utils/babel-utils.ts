/* eslint-disable global-require */
import fs from 'fs-extra';
import * as babel from '@babel/core';
import * as babelTypes from '@babel/types';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import { isNil, lowerFirst } from 'lodash';
import logger from './logger';
import { ComponentMetaInfo } from './types';

export const evalOptions = (object) => {
  const { code } = generate(object);
  // eslint-disable-next-line no-eval
  const result = eval(`(${code})`);
  if (result.if) {
    result.if = result.if.toString();
    result.tsIf = result.if;
  }

  if (result.disabledIf) {
    result.disabledIf = result.disabledIf.toString();
    result.tsDisabledIf = result.disabledIf;
  }

  if (result.onChange) {
    result.onChange.forEach((item) => {
      if (item.if) item.if = item.if.toString();
    });

    result.tsOnChange = JSON.stringify(result.onChange);
  }

  if (result.designerValue) {
    result.tsDesignerValue = JSON.stringify(result.designerValue);
  }

  return result;
};

export const getNodeCode = (node) => {
  try {
    const { code: text = '' } = generate(node);
    return text.replace(/\n/g, ' ');
  } catch (e) {
    logger.warn(`生成code 错误，${JSON.stringify(node)}`);
  }
  return '';
};

export const getJSXNameByNode = (node) => {
  if (!node || !node.name || node.name.type !== 'JSXIdentifier') {
    return '';
  }

  return node.name.name;
};

export const getSlotName = (slotName) => {
  if (!slotName) {
    return '';
  }

  const slotRegex = /^slot[A-Z].*/;
  if (slotRegex.test(slotName)) {
    return lowerFirst(slotName.substring(4));
  }

  const slotPrefix = 'slot-';
  if (slotName.startsWith(slotPrefix)) {
    return slotName.substring(slotPrefix.length);
  }

  return slotName;
};

export const getComponentMetaByApiTs = (tsPath) => {
  const tsCode = fs.readFileSync(tsPath, 'utf-8').toString();
  const ast = babel.parse(tsCode, {
    filename: 'result.ts',
    presets: [require('@babel/preset-typescript')],
    plugins: [
      [require('@babel/plugin-proposal-decorators'), { legacy: true }],
    ],
    rootMode: 'root',
    root: __dirname,
  }) as babelTypes.File;

  let metaInfo: ComponentMetaInfo | undefined;

  traverse(ast, {
    ClassDeclaration(p) {
      if (!p.node.superClass || !p.node.id || p.node.id.type !== 'Identifier' || p.node.superClass.type !== 'Identifier' || p.node.superClass.name !== 'ViewComponent') {
        return;
      }

      const compMetaInfo: ComponentMetaInfo = {
        name: p.node.id.name,
        tsPath,
      };

      (p.node.decorators as any[]).forEach((decorator) => {
        if (decorator.expression.type === 'CallExpression' && (decorator.expression.callee as babelTypes.Identifier).name === 'Component') {
          decorator.expression.arguments.forEach((arg) => {
            if (arg.type === 'ObjectExpression') {
              const config = evalOptions(arg) || {};
              ['title', 'show', 'group', 'icon'].forEach((key) => {
                if (!isNil(config[key])) {
                  compMetaInfo[key] = config[key];
                }
              });
            }
          });
        }
      });

      if (metaInfo) {
        if (!metaInfo.children) {
          metaInfo.children = [];
        }

        metaInfo.children.push(compMetaInfo);
      } else {
        metaInfo = compMetaInfo;
      }
    },
  });

  return metaInfo;
};
