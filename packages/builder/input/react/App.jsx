import React from 'react';
import { ConfigProvider } from '@lcap/pc-react-ui';
import ThemePagePreviewMap from 'virtual:lcap-theme-page-preview.js';
import ThemeComponentPreview from 'virtual:lcap-theme-component-previews.js';

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
    if (group && window.THEME_INFO && window.THEME_INFO.components) {
      const { components } = window.THEME_INFO;
      const names = components.filter((c) => c.group === group).map((c) => c.name);
      props.componentNames = names;
    } else if (name) {
      props.componentNames = [name];
    }
  } else {
    Preview = ThemePagePreviewMap.dashboard;
  }

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
