/* eslint-disable */
import './global.css';
import { defineComponent, h } from 'vue';
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
  const app = window.__app;
  const appContext = window.__app?._context;

  if (!appContext || !appContext.components) {
    return;
  }

  const componentMap = appContext.components;

  Object.keys(icons).forEach((key) => {
    if (registerComponentSet.has(key)) {
      return;
    }

    const component = componentMap[key] || componentMap[upperFirst(camelCase(key))];
    if (!component) {
      return;
    }

    const WrapperComponent = (props, { attrs, slots }) => {
      const defaultIconProps = window.__THEME_ICONS__[key] || {};
      const innerProps = {
        ...defaultIconProps,
        ...props,
        ...attrs,
      };

      return h(component, {
        ...innerProps,
      }, slots);
    };

    app.component(key, WrapperComponent);
    app.component(upperFirst(camelCase(key)), WrapperComponent);
    registerComponentSet.add(key);
    registerComponentSet.add(upperFirst(camelCase(key)));
  });
}

export default defineComponent({
  name: 'ThemePreviewApp',
  data() {
    return {
      renderKey: 0,
    };
  },
  provide() {
    return {
      getRenderKey: this.getRenderKey,
    }
  },
  mounted() {
    sendRenderOk();
    window.addEventListener('message', this.handleMessage);
  },
  beforeUnmount() {
    window.removeEventListener('message', this.handleMessage);
  },
  methods: {
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
    getRenderKey() {
      return `uni_${this.renderKey}`;
    },
    setIcons(icons) {
      window.__THEME_ICONS__ = icons;
      resetThemeComponent(icons);
      this.renderKey++;
    },
  },
  render() {
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

    return renderAppPreview(h(Preview, { ...props }));
  },
});
