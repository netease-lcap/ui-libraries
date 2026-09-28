/* eslint-disable */
import './global.css';
import { camelCase, upperFirst } from 'lodash';
import { renderAppPreview } from 'virtual:lcap-theme-preview-wrap.js';
import ThemePagePreviewMap from 'virtual:lcap-theme-page-preview.js';
import ThemeComponentPreview from 'virtual:lcap-theme-component-previews.js';
import { sendRenderOk, sendClickComponent } from '../events';

const searchParams = new URLSearchParams(window.location.search);
const type = searchParams.get('type');
const group = searchParams.get('group');
const name = searchParams.get('name');

const registerComponentSet = new Set();
export function resetThemeComponent(icons) {
  Object.keys(icons).forEach((key) => {
    if (registerComponentSet.has(key)) {
      return;
    }

    const componentOptions = window.Vue.options.components[key] || window.Vue.options.components[upperFirst(camelCase(key))];
    if (!componentOptions) {
      return;
    }

    const WrapperComponent = {
      functional: true,
      name: key,
      model: componentOptions.model,
      props: componentOptions.props,
      render: (h, context) => {
        const defaultIconProps = window.__THEME_ICONS__[key] || {};
        const attrs = {
          ...defaultIconProps,
          ...context.props,
        };

        return h(componentOptions, {
          on: context.listeners,
          attrs,
          style: context.data.style,
          class: context.data.class,
          staticStyle: context.data.staticStyle,
          staticClass: context.data.staticClass,
          directives: context.data.directives,
          scopedSlots: context.scopedSlots,
          slot: context.data.slot,
          key: context.data.key,
          ref: context.data.ref,
        }, context.children);
      },
    };

    Vue.component(key, WrapperComponent);
    Vue.component(upperFirst(camelCase(key)), WrapperComponent);
    registerComponentSet.add(key);
    registerComponentSet.add(upperFirst(camelCase(key)));
  });
}

export default {
  name: 'ThemePreviewApp',
  data() {
    return {
      renderKey: 1,
    };
  },
  provide() {
    return {
      getRenderKey: this.getRenderKey,
    };
  },
  mounted() {
    sendRenderOk();
    window.addEventListener('message', this.handleMessage);
  },
  beforeDestroy() {
    window.removeEventListener('message', this.handleMessage);
  },
  methods: {
    getRenderKey() {
      return `uni_${this.renderKey}`;
    },
    setIcons(icons) {
      window.__THEME_ICONS__ = icons;
      resetThemeComponent(icons);
      this.renderKey++;
    },
    handleMessage(e) {
      if (!e.data) {
        return;
      }

      const { from, type: msgType, data } = e.data;
      if (from !== 'lcap' || (!['setTheme', 'setIcons'].includes(msgType))) {
        return;
      }

      if (msgType === 'setIcons') {
        this.setIcons(data);
        return;
      }

      const element = document.getElementById('theme');
      if (!element) {
        throw new Error('Not found theme style');
      }

      element.textContent = data || '';
    },
  },
  render(h) {
    let Preview = null;
    const props = {};
    if (type === 'page') {
      Preview = ThemePagePreviewMap[name || 'dashboard'];
    } else if (type === 'component') {
      Preview = ThemeComponentPreview;

      props.onActive = sendClickComponent;
      if (group && window.THEME_INFO && window.THEME_INFO.components) {
        const { components } = window.THEME_INFO;
        const names = components.filter((c) => c.group.toLowerCase() === group.toLowerCase()).map((c) => c.name);
        props.componentNames = names;
      } else if (name) {
        props.componentNames = [name];
      }
    } else {
      Preview = ThemePagePreviewMap.dashboard;
    }

    if (!Preview) {
      return null;
    }

    return renderAppPreview(h(Preview, { attrs: { ...props } }));
  },
};
