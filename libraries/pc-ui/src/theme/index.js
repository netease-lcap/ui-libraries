import Vue from 'vue';
import * as CloudUI from '@/index.js';
import ComponentPreivew from './component-preview.vue';

Vue.use(CloudUI);

export const renderAppPreview = (app) => app;

export const ComponentWrap = ComponentPreivew;
