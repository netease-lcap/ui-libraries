import React from 'react';
import ReactDOM from 'react-dom/client';
import ThemePagePreviewMap from 'virtual:lcap-theme-page-preview.js';
import ThemeComponentPreview from 'virtual:lcap-theme-component-preview.js';

const searchParams = new URLSearchParams(window.location.search);
const type = searchParams.get('type');
const group = searchParams.get('group');
const name = searchParams.get('name');

const App = () => {
  let Preview = null;
  if (type === 'page') {
    Preview = ThemePagePreviewMap[name || 'dashbord'];
  } else if (type === 'component') {
    Preview = ThemeComponentPreview;
  } else {
    Preview = ThemePagePreviewMap.dashbord;
  }

  return Preview;
};

const root = ReactDOM.createRoot(document.getElementById('app'));

root.render(App);
