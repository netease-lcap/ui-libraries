import {
  describe,
  it,
  vi as jest,
  expect,
} from 'vitest';
  import Vue from 'vue';
import { USteps } from '../../index.js';
import { mount } from '@vue/test-utils';

describe('u-steps.vue', () => {
    it('IDE 中空值渲染', () => {
        Vue.prototype.$env.VUE_APP_DESIGNER = true;
        const wrapper = mount(USteps);
        expect(wrapper.html()).toMatchSnapshot();
        Vue.prototype.$env.VUE_APP_DESIGNER = false;
    });
});
