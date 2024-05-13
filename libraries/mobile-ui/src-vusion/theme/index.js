import Vue from 'vue';
import * as Vant from '../index.js';
import ComponentPreivew from './component-preview.vue';

Vue.use(Vant);

export const renderAppPreview = (app) => app;

export const ComponentWrap = ComponentPreivew;
