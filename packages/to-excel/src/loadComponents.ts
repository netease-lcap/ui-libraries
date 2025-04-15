/* eslint-disable no-param-reassign */

import * as fs from 'fs-extra';
import * as path from 'path';

const componentPathMap: Record<string, string> = {
  'u-toast-single': 'u-toast.vue/index.single.vue',
  'van-cardu': 'cardu/cardu.less',
  'u-checkbox': 'u-checkbox.vue',
  'u-radio': 'u-radios.vue/radio.vue',
  'u-capsule': 'u-capsules.vue/capsule.vue',
  'u-tab': 'u-tabs.vue/tab.vue',
  'u-selectable-step': 'u-selectable-steps.vue/step.vue',
  'u-tree-view-node-new': 'u-tree-view-new.vue/node.vue',
};

/**
 * @TODO: 切成 { getComponentMetaInfos }，暂时没时间改
 */
export function loadComponents(libNames: { pc: string, h5?: string } = { pc: 'pc-ui', h5: 'mobile-ui' }) {
  const pcComponents = fs.readJSONSync(path.join(__dirname, `../../../libraries/${libNames.pc}/dist-theme/nasl.ui.json`)) as any[];
  const h5Components = libNames.h5 && fs.readJSONSync(path.join(__dirname, `../../../libraries/${libNames.h5}/dist-theme/nasl.ui.json`)) as any[] | undefined;

  pcComponents.forEach((component) => {
    const componentNamePath = componentPathMap[component.kebabName] || `${component.kebabName}.vue/api.ts`;
    const componentPath = path.join(__dirname, `../../../libraries/${libNames.pc}/src/components/${componentNamePath}`);
    component.frontend = 'pc';
    component.componentPath = componentPath;
    component.children.unshift(component);
  });
  h5Components && h5Components.forEach((component) => {
    const componentNamePath = componentPathMap[component.kebabName] || `${component.kebabName.replace(/^van-/g, '')}/api.ts`;
    let componentPath = path.join(__dirname, `../../../libraries/${libNames.h5}/src/${componentNamePath}`);
    if (!fs.existsSync(componentPath)) componentPath = path.join(__dirname, `../../../libraries/${libNames.h5}/src-vusion/components/${componentNamePath}`);
    component.frontend = 'h5';
    component.componentPath = componentPath;
    component.children.unshift(component);
  });

  /**
   * PC、H5 按组对齐，用于基本信息展示
   */
  const components0 = pcComponents.slice();
  h5Components && h5Components.forEach((item) => {
    let lastIndex = components0.length - 1;
    for (let i = components0.length - 1; i >= 0; i--) {
      const item2 = components0[i];
      if (item2.group === item.group) {
        lastIndex = i;
        break;
      }
    }
    components0.splice(lastIndex + 1, 0, item);
  });
  /**
   * PC、H5 按名字对齐，方便属性、事件对比
   */
  const components = pcComponents.slice();
  h5Components && h5Components.forEach((item) => {
    let lastIndex = components.length - 1;
    for (let i = components.length - 1; i >= 0; i--) {
      const item2 = components[i];
      if (item2.title === item.title) {
        lastIndex = i;
        break;
      }
    }
    if (lastIndex === components.length - 1) {
      for (let i = components.length - 1; i >= 0; i--) {
        const item2 = components[i];
        if (item2.group === item.group) {
          lastIndex = i;
          break;
        }
      }
    }
    components.splice(lastIndex + 1, 0, item);
  });

  return { components, components0 };
}
