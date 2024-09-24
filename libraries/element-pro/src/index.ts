import { install } from './main';

export * from './main';

if (typeof window !== 'undefined' && typeof window.Vue !== 'undefined') {
  install(window.Vue);
}
