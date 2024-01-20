import Vue from 'vue';
import { vi, expect } from 'vitest';
import vueSnapshotSerializer from 'jest-serializer-vue-tjw';
import * as CloudUI from '../src/index.js';

expect.addSnapshotSerializer(vueSnapshotSerializer);
Vue.use(CloudUI);

const mutationObserverMock = vi.fn(function MutationObserver(callback) {
  this.observe = vi.fn();
  this.disconnect = vi.fn();
  // Optionally add a trigger() method to manually trigger a change
  this.trigger = (mockedMutationsList) => {
    callback(mockedMutationsList, this);
  };
});
window.MutationObserver = mutationObserverMock;

// 将模拟对象赋值给实际的 VisualViewport 属性
Object.defineProperty(window, 'VisualViewport', { value: function() {} });
Object.assign(window.VisualViewport.prototype, {
  width: window.innerWidth,
  height: window.innerHeight,
  offsetLeft: 0,
  offsetTop: 0,
  pageLeft: window.pageXOffset,
  pageTop: window.pageYOffset,
  scale: Math.max(
    window.innerWidth / window.screen.width,
    window.innerHeight / window.screen.height,
  ),
  zoom: Math.log2(
    Math.max(
      window.innerWidth / window.screen.availWidth,
      window.innerHeight / window.screen.availHeight,
    ),
  ),
});
