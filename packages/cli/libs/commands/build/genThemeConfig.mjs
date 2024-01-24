/* eslint-disable no-useless-escape */
import fs from 'fs-extra';
import path from 'path';
import * as postcss from 'postcss';
import * as logger from '../../utils/logger.mjs';

export default (config) => {
  const {
    rootPath,
    destPath,
    themePath,
    themeConfigPath,
  } = config;

  const themeFilePath = path.join(rootPath, themePath);
  const resultPath = path.join(rootPath, themeConfigPath);

  const themeComponentsMap = {};
  const themePropertiesMap = {};

  if (!fs.existsSync(resultPath)) {
    logger.warn(`未找到主题样式配置文件：${themeConfigPath}`);
    return;
  }

  const cssContent = fs.readFileSync(themeFilePath, 'utf-8');
  const root = postcss.parse(cssContent);
  // eslint-disable-next-line no-underscore-dangle
  const _root = root.nodes.find(
    (node) => node.type === 'rule' && node.selector === ':root',
  );

  let lastComponent;
  let lastProp;

  _root.nodes.forEach((node) => {
    if (node.type === 'comment') {
      if (node.raws.before && node.raws.before.includes('\n')) {
        if (node.text.includes('@component ')) {
          const cap = /@component\s+([\w-]+)(\s+@hidden)?/.exec(
            node.text.trim(),
          );
          const name = cap[1].trim();
          const hidden = !!cap[2];

          if (!lastComponent || lastComponent.name !== name) {
            if (lastComponent) {
              const {
                name: componentName,
                cssProperty,
                dependencyComponents,
              } = lastComponent;
              themeComponentsMap[componentName] = {
                cssProperty,
                dependencyComponents,
              };
            }

            lastComponent = {
              name,
              cssProperty: {},
            };
            if (hidden) {
              lastComponent = undefined;
            }
          }
        } else if (node.text.includes('@dependency-components ')) {
          const cap = /@dependency-components\s+([\w-]+)/.exec(
            node.text.trim(),
          );
          if (lastComponent) {
            lastComponent.dependencyComponents = cap[1].trim().split(',');
          }
        }
      } else if (lastComponent) {
        if (node.text.trim() === '@hidden') {
          // 不展示此变量
          delete lastComponent.cssProperty[lastProp];
        } else if (node.text.includes('@type ')) {
          // 变量展示、输入的类型
          const cap = /@type\s+([\w-]+)/.exec(node.text.trim());
          lastComponent.cssProperty[lastProp].type = cap[1].trim();
        } else if (node.text.includes('@desc ')) {
          // 描述
          const cap = /@desc\s+([\u4e00-\u9fa5|\w|,|\s|：|\#|（|）|(|)|\.|，]+)/.exec(
            node.text.trim(),
          );
          lastComponent.cssProperty[lastProp].desc = cap[1].trim();
        } else if (node.text.includes('@group ')) {
          // 变量的分组
          const cap = /@group\s+([\S]+)/.exec(node.text.trim());
          lastComponent.cssProperty[lastProp].group = cap[1].trim();
        } else if (node.text.includes('@prefix ')) {
          // 变量前缀，方便让子组件去除变量前缀
          const cap = /@prefix\s+([\S]+)/.exec(node.text.trim());
          lastComponent.cssProperty[lastProp].prefix = cap[1].trim();
        } else if (node.text.includes('@depAttrs ')) {
          // 此变量依赖的属性
          const cap = /@depAttrs\s+(.*)/.exec(node.text.trim());
          lastComponent.cssProperty[lastProp].depAttrs = JSON.parse(
            cap[1] || '{}',
          );
        } else if (node.text.includes('@excludeElTags ')) {
          // 排除elTag
          const cap = /@excludeElTags\s+([\S]+)/.exec(node.text.trim());
          lastComponent.cssProperty[
            lastProp
          ].excludeElTags = cap[1].trim().split(',');
        } else if (node.text.includes('@excludeTags ')) {
          // 排除组件
          const cap = /@excludeTags\s+([\S]+)/.exec(node.text.trim());
          lastComponent.cssProperty[lastProp].excludeTags = cap[1]
            .trim()
            .split(',');
        } else if (node.text.includes('@title ')) {
          const cap = /@title\s+([\S]+)/.exec(node.text.trim());
          lastComponent.cssProperty[lastProp].title = cap[1].trim();
        } else if (node.text.includes('@depParentAttrs ')) {
          // 此变量依赖的父组件属性
          const cap = /@depParentAttrs\s+(.*)/.exec(node.text.trim());
          lastComponent.cssProperty[lastProp].depParentAttrs = JSON.parse(
            cap[1] || '{}',
          );
        } else if (node.text.includes('@depStaticStyles ')) {
          // 此变量依赖的静态样式属性
          const cap = /@depStaticStyles\s+(.*)/.exec(node.text.trim());
          lastComponent.cssProperty[lastProp].depStaticStyles = JSON.parse(
            cap[1] || '[]',
          );
        }
      }
    } else if (node.type === 'decl') {
      themePropertiesMap[node.prop] = node.value;
      if (!lastComponent) return;
      lastComponent.cssProperty[node.prop] = {
        type: 'input',
      };
      lastProp = node.prop;
    }
  });
  if (lastComponent) {
    const {
      name: componentName,
      cssProperty,
      dependencyComponents,
    } = lastComponent;
    themeComponentsMap[componentName] = {
      cssProperty,
      dependencyComponents,
    };
  }

  const resultList = fs.readJSONSync(resultPath);

  if (Array.isArray(resultList)) {
    resultList.forEach((result) => {
      const { toPosition, items } = result || {};
      if (toPosition === 'highLevelSetting') {
        if (Array.isArray(items)) {
          items.forEach((item) => {
            const { name } = item || {};
            const themeComponent = themeComponentsMap[name];
            if (themeComponent) {
              item.cssProperty = themeComponent.cssProperty;
              const { dependencyComponents } = themeComponent;
              if (dependencyComponents) {
                dependencyComponents.forEach((depName) => {
                  const depThemeComponent = themeComponentsMap[depName];
                  if (depThemeComponent) {
                    item.cssProperty = {
                      ...item.cssProperty,
                      ...depThemeComponent.cssProperty,
                    };
                  }
                });
              }
            }
          });
        }
      }
    });
  }

  fs.writeJsonSync(resultPath, resultList, {
    spaces: 2,
  });

  const theme = {
    defaultTheme: JSON.stringify(themeComponentsMap),
    themeConfig: JSON.stringify(resultList),
  };

  // 输出文件
  const destDir = path.join(rootPath, destPath);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const destFile = `${destDir}/theme.json`;
  fs.writeJSONSync(destFile, theme, { spaces: 2 });
};
