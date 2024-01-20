/* 自动生成测试文件， 后面可删除，不可增加 */
import {
  describe,
  it,
  expect,
} from 'vitest';
import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';

import BlocksDemo1 from '../demos/blocks/BlocksDemo1.vue';
import CasesDemo1 from '../demos/cases/CasesDemo1.vue';
import CasesDemo2 from '../demos/cases/CasesDemo2.vue';
import CasesDemo3 from '../demos/cases/CasesDemo3.vue';
import CasesDemo4 from '../demos/cases/CasesDemo4.vue';
import CasesDemo5 from '../demos/cases/CasesDemo5.vue';
import ExamplesDemo1 from '../demos/examples/ExamplesDemo1.vue';
import ExamplesDemo2 from '../demos/examples/ExamplesDemo2.vue';
import ExamplesDemo3 from '../demos/examples/ExamplesDemo3.vue';
import ExamplesDemo4 from '../demos/examples/ExamplesDemo4.vue';
import ExamplesDemo5 from '../demos/examples/ExamplesDemo5.vue';
import ExamplesDemo6 from '../demos/examples/ExamplesDemo6.vue';
import ExamplesDemo7 from '../demos/examples/ExamplesDemo7.vue';
import ExamplesDemo8 from '../demos/examples/ExamplesDemo8.vue';
import ExamplesDemo9 from '../demos/examples/ExamplesDemo9.vue';

const sleep = (ms) => new Promise((resolve) => {
  setTimeout(() => resolve(true), ms);
});

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('u-time-picker.vue', () => {
  it('Demo-基本用法', async () => {
    const wrapper = mount(BlocksDemo1, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-日期范围', async () => {
    const wrapper = mount(CasesDemo1, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-时间单位容错', async () => {
    const wrapper = mount(CasesDemo2, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-范围选择变量绑定', async () => {
    const wrapper = mount(CasesDemo3, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-表单验证', async () => {
    const wrapper = mount(CasesDemo4, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-格式化', async () => {
    const wrapper = mount(CasesDemo5, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-基本用法', async () => {
    const wrapper = mount(ExamplesDemo1, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-隐藏底部按钮', async () => {
    const wrapper = mount(ExamplesDemo2, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-自定义底部文案', async () => {
    const wrapper = mount(ExamplesDemo3, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-只读和禁用', async () => {
    const wrapper = mount(ExamplesDemo4, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-日期范围', async () => {
    const wrapper = mount(ExamplesDemo5, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-日期最小单位', async () => {
    const wrapper = mount(ExamplesDemo6, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-方法', async () => {
    const wrapper = mount(ExamplesDemo7, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-范围选择', async () => {
    const wrapper = mount(ExamplesDemo8, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-范围选择分钟', async () => {
    const wrapper = mount(ExamplesDemo9, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
