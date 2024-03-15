/* eslint-disable */
const setTheme = (data) => {
  const element = document.getElementById('style');
  if (!element) {
    throw new Error('Not found theme style');
  }

  element.textContent = data || '';
};

window.top.addEventListener('message', (event) => {
  const { from, type, data } = event.data;
  if (from !== 'lcap') return;

  switch (type) {
    case 'setTheme':
      return setTheme(data);
  }
});


export function postMessage(from, type, data) {

}
