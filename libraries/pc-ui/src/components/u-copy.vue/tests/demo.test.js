/* 自动生成测试文件， 后面可删除，不可增加 */
import {
  describe,
  it,
  expect,
} from 'vitest';
import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';

import BlocksDemo1 from '../demos/blocks/BlocksDemo1.vue';
import ExamplesDemo1 from '../demos/examples/ExamplesDemo1.vue';
import ExamplesDemo2 from '../demos/examples/ExamplesDemo2.vue';
import ExamplesDemo3 from '../demos/examples/ExamplesDemo3.vue';
import ExamplesDemo4 from '../demos/examples/ExamplesDemo4.vue';
import ExamplesDemo5 from '../demos/examples/ExamplesDemo5.vue';
import ExamplesDemo6 from '../demos/examples/ExamplesDemo6.vue';
import ExamplesDemo7 from '../demos/examples/ExamplesDemo7.vue';
import ExamplesDemo8 from '../demos/examples/ExamplesDemo8.vue';
import ExamplesDemo9 from '../demos/examples/ExamplesDemo9.vue';
import ExamplesDemo10 from '../demos/examples/ExamplesDemo10.vue';
import ExamplesDemo11 from '../demos/examples/ExamplesDemo11.vue';
import ExamplesDemo12 from '../demos/examples/ExamplesDemo12.vue';
import ExamplesDemo13 from '../demos/examples/ExamplesDemo13.vue';
import ExamplesDemo14 from '../demos/examples/ExamplesDemo14.vue';
import ExamplesDemo15 from '../demos/examples/ExamplesDemo15.vue';

const sleep = (ms) => new Promise((resolve) => {
  setTimeout(() => resolve(true), ms);
});

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('u-copy.vue', () => {
  it('Demo-复制链接', async () => {
    const wrapper = mount(BlocksDemo1, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-基本用法', async () => {
    const wrapper = mount(ExamplesDemo1, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-触发元素', async () => {
    const wrapper = mount(ExamplesDemo2, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-触发元素', async () => {
    const wrapper = mount(ExamplesDemo3, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-提示内容', async () => {
    const wrapper = mount(ExamplesDemo4, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-tooltip (默认)', async () => {
    const wrapper = mount(ExamplesDemo5, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-toast', async () => {
    const wrapper = mount(ExamplesDemo6, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-toast', async () => {
    const wrapper = mount(ExamplesDemo7, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-不提示', async () => {
    const wrapper = mount(ExamplesDemo8, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-提示位置', async () => {
    const wrapper = mount(ExamplesDemo9, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-指令形式', async () => {
    const wrapper = mount(ExamplesDemo10, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-tooltip 弹框', async () => {
    const wrapper = mount(ExamplesDemo11, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-toast 提示', async () => {
    const wrapper = mount(ExamplesDemo12, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-指令形式', async () => {
    const wrapper = mount(ExamplesDemo13, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-禁用状态', async () => {
    const wrapper = mount(ExamplesDemo14, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-指令形式', async () => {
    const wrapper = mount(ExamplesDemo15, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
