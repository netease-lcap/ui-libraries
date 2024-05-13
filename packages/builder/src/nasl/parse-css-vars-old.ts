/* eslint-disable */
import * as postcss from 'postcss';
import type { ThemeInfo, ThemeVariable, ThemeComponentVars } from './parse-css-vars';

const GLOBAL_NAME = '$global';

export interface ComponentVarInfo {
  name: string;
  cssProperty: { [name: string]: ThemeVariable };
  hidden?: boolean;
  dependencyComponents?: string;
}

export default (cssContent: string) => {
  const themeInfo: ThemeInfo = {
    global: {
      selector: '',
      variables: [],
    },
    components: [],
  };

  const root: any = postcss.parse(cssContent);
  // eslint-disable-next-line no-underscore-dangle
  const _root = root.nodes.find(
    (node) => node.type === 'rule' && node.selector === ':root',
  );

  const themeComponentsMap: { [name: string]: any } = {};
  let lastComponent = {
    name: GLOBAL_NAME,
    cssProperty: {},
  };
  let lastProp;

  _root.nodes.forEach((node) => {
    if (node.type === 'comment') {
      if (node.raws.before && node.raws.before.includes('\n')) {
        if (node.text.includes('@component ')) {
          const cap: any = /@component\s+([\w-]+)(\s+@hidden)?/.exec(
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
              lastComponent.hidden = true;
            }
          }
        } else if (node.text.includes('@dependency-components ')) {
          const cap: any = /@dependency-components\s+([\w-]+)/.exec(
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
          const cap: any = /@type\s+([\w-]+)/.exec(node.text.trim());
          lastComponent.cssProperty[lastProp].type = cap[1].trim();
        } else if (node.text.includes('@desc ')) {
          // 描述
          const cap: any = /@desc\s+([\u4e00-\u9fa5|\w|,|\s|：|#|（|）|(|)|.|，]+)/.exec(
            node.text.trim(),
          );
          lastComponent.cssProperty[lastProp].desc = cap[1].trim();
        } else if (node.text.includes('@group ')) {
          // 变量的分组
          const cap: any = /@group\s+([\S]+)/.exec(node.text.trim());
          lastComponent.cssProperty[lastProp].group = cap[1].trim();
        } else if (node.text.includes('@prefix ')) {
          // 变量前缀，方便让子组件去除变量前缀
          const cap: any = /@prefix\s+([\S]+)/.exec(node.text.trim());
          lastComponent.cssProperty[lastProp].prefix = cap[1].trim();
        } else if (node.text.includes('@depAttrs ')) {
          // 此变量依赖的属性
          const cap: any = /@depAttrs\s+(.*)/.exec(node.text.trim());
          lastComponent.cssProperty[lastProp].depAttrs = JSON.parse(
            cap[1] || '{}',
          );
        } else if (node.text.includes('@excludeElTags ')) {
          // 排除elTag
          const cap: any = /@excludeElTags\s+([\S]+)/.exec(node.text.trim());
          lastComponent.cssProperty[
            lastProp
          ].excludeElTags = cap[1].trim().split(',');
        } else if (node.text.includes('@excludeTags ')) {
          // 排除组件
          const cap: any = /@excludeTags\s+([\S]+)/.exec(node.text.trim());
          lastComponent.cssProperty[lastProp].excludeTags = cap[1]
            .trim()
            .split(',');
        } else if (node.text.includes('@title ')) {
          const cap: any = /@title\s+([\S]+)/.exec(node.text.trim());
          lastComponent.cssProperty[lastProp].title = cap[1].trim();
        } else if (node.text.includes('@depParentAttrs ')) {
          // 此变量依赖的父组件属性
          const cap: any = /@depParentAttrs\s+(.*)/.exec(node.text.trim());
          lastComponent.cssProperty[lastProp].depParentAttrs = JSON.parse(
            cap[1] || '{}',
          );
        } else if (node.text.includes('@depStaticStyles ')) {
          // 此变量依赖的静态样式属性
          const cap: any = /@depStaticStyles\s+(.*)/.exec(node.text.trim());
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


  return themeInfo;
};
