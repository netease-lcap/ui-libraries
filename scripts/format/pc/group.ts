
import * as fs from 'fs-extra';
import * as path from 'path';
import * as babel from '@babel/core';
import * as t from '@babel/types';
import generate from '@babel/generator';

const yaml = require('js-yaml');

formatH5();

function formatH5() {
  const root = path.join(__dirname, "../../../../cloud-ui");

  const components = require(`${root}/scripts/lcap/config.js`);
  components.forEach((component: any) => {
    let sourceDir = 'src'
    let componentDir = path.join(root, `${sourceDir}/${component.name}`);
    if (!fs.existsSync(componentDir)) {
      sourceDir = 'src/components';
      componentDir = path.join(root, `${sourceDir}/${component.name}.vue`);
    }

    // api.ts
    try {
      const tsPath = `${componentDir}/api.ts`;
      const yamlPath = `${componentDir}/api.yaml`;

      // component.tsPath = tsPath;
      const code = format(
        fs.readFileSync(tsPath, 'utf8'), 
        yaml.load(fs.readFileSync(yamlPath))
      );
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

function format(code: string, yaml: any) {
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

  let needFormat = false;

  const group = yaml[0]?.labels[0];

  babel.traverse(root, {
    Decorator(path) {
      const { expression } = path.node;
      if (t.isCallExpression(expression)) {
        const { callee } = expression;
        if (t.isIdentifier(callee) && callee.name === 'Component') {
          const { arguments: args } = expression;
          const options = args[0];
          if (t.isObjectExpression(options)) {
            options.properties.push(
              t.objectProperty(
                t.identifier('group'),
                t.stringLiteral(group)
              )
            )

            needFormat = true;
          }
        }
      }
    }
  })

  if (!needFormat) return false;

  const result = generate(root);

  return result.code;
}
