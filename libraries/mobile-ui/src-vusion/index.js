import * as Vant from './main';

export * from './main';

if (typeof window !== 'undefined' && typeof window.Vue !== 'undefined') {
  window.Vue.use(Vant);
  window.LcapUI = Vant;
}
