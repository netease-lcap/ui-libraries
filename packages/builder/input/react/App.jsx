import './global.css';
import React, { useEffect } from 'react';
import { ConfigProvider } from '@lcap/pc-react-ui';
import ThemePagePreviewMap from 'virtual:lcap-theme-page-preview.js';
import ThemeComponentPreview from 'virtual:lcap-theme-component-previews.js';
import { sendRenderOk, sendClickComponent } from '../events';

const searchParams = new URLSearchParams(window.location.search);
const type = searchParams.get('type');
const group = searchParams.get('group');
const name = searchParams.get('name');

const App = () => {
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

  useEffect(() => {
    sendRenderOk();
    const handleMessage = (e) => {
      if (!e.data) {
        return;
      }

      const { from, type: msgType, data } = e.data;
      if (from !== 'lcap' || msgType !== 'setTheme') {
        return;
      }

      const element = document.getElementById('theme');
      if (!element) {
        throw new Error('Not found theme style');
      }

      element.textContent = data || '';
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <ConfigProvider
      theme={
        {
          cssVar: { prefix: 'cw', key: 'cw-nasl' },
        }
      }
      prefixCls="cw"
    >
      <Preview {...props} />
    </ConfigProvider>
  );
};

export default App;
