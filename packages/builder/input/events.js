import registerIElement from './registerIElement';

/* eslint-disable */
const methods = {
  setTheme: (data) => {
    const element = document.getElementById('theme');
    if (!element) {
      throw new Error('Not found theme style');
    }

    element.textContent = data || '';
  },
  scrollToComponent: (name) => {
    const element = document.getElementById(name);
    if (!element) {
      return;
    }

    element.scrollIntoView();
  }
};

export function sendRenderOk() {
  window.top.postMessage({ from: 'lcap-theme', type: 'init', data: null }, '*');
}

export function sendClickComponent(name) {
  window.top.postMessage({ from: 'lcap-theme', type: 'clickComponent', data: name }, '*');
}

registerIElement(methods);

window.addEventListener('message', (event) => {
  const { from, type, data } = event.data;
  if (from !== 'lcap') return;

  return methods[type]?.(data);
});

