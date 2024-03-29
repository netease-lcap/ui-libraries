if (!window.URL) {
  window.URL = {};
}

window.URL.createObjectURL = () => 'mock:createObjectURL';
