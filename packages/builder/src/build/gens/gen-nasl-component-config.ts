import { upperFirst } from 'lodash';
import { genNaslComponent } from '../../shared';
import logger from '../../utils/logger';

import { NaslUIComponentConfig } from '../../overload';
import { getComponentConfigByName } from '../../utils';

/** api 中可写的扩展字段（未在 @nasl/types 的 PropDeclaration 中声明） */
type PropDeclarationExt = NaslUIComponentConfig['props'][number] & {
  hidden?: boolean;
  if?: string;
};

export default genNaslComponent;

export function processComponentConfigExtends(components: NaslUIComponentConfig[], lcapUIComponents: any[] = []) {
  components.map((c) => {
    const arr = [c];
    if (Array.isArray(c.children)) {
      arr.push(...c.children);
    }

    arr.forEach((comp) => {
      if (!Array.isArray(comp.props)) {
        return;
      }
      // eslint-disable-next-line no-param-reassign -- 将 hidden props 转换为 IDE 可用的 if / tsIf
      comp.props = comp.props.map((prop) => {
        const p = prop as PropDeclarationExt;
        if (p.hidden !== true) {
          return prop;
        }
        return {
          ...prop,
          if: '_ => false',
          tsIf: '_ => false',
        };
      });
    });

    return arr;
  }).flat().filter((c) => Array.isArray(c.extends) && c.extends.length > 0).forEach((component) => {
    const extendList = (component.extends || []).map((exd) => {
      if (typeof exd === 'string') {
        return {
          name: exd,
        };
      }

      return exd;
    });
    extendList.forEach((exd) => {
      const { name, excludes = [] } = exd;

      if (!name) {
        return;
      }

      const exdComp = getComponentConfigByName(name, [...components, ...lcapUIComponents]);
      if (!exdComp || (exdComp.extends && exdComp.extends.length > 0)) {
        logger.warn(`找不到 ${component.name} 继承的组件 ${name} 的配置`);
        return;
      }

      [
        'methods',
        'slots',
        'readableProps',
        'props',
        'events',
      ].forEach((key) => {
        if (!component[key]) {
          component[key] = [];
        }

        (exdComp[key] || []).forEach((it) => {
          const i = component[key].findIndex((c) => c.name === it.name);
          let attrName = it.name;
          if (key === 'slots') {
            attrName = `slot${upperFirst(attrName)}`;
          } else if (key === 'events') {
            attrName = `on${upperFirst(attrName)}`;
          }
          if (i !== -1 || excludes.includes(attrName)) {
            return;
          }

          component[key].push(it);
        });
      });
    });
  });
}
