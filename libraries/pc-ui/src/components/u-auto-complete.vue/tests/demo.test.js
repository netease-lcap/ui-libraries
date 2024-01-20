/* 自动生成测试文件， 后面可删除，不可增加 */
import {
  describe,
  it,
  expect,
} from 'vitest';
import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';

import BlocksDemo1 from '../demos/blocks/BlocksDemo1.vue';
import BlocksDemo2 from '../demos/blocks/BlocksDemo2.vue';
import BlocksDemo3 from '../demos/blocks/BlocksDemo3.vue';
import BlocksDemo4 from '../demos/blocks/BlocksDemo4.vue';
import BlocksDemo5 from '../demos/blocks/BlocksDemo5.vue';
import BlocksDemo6 from '../demos/blocks/BlocksDemo6.vue';
import BlocksDemo7 from '../demos/blocks/BlocksDemo7.vue';
import BlocksDemo8 from '../demos/blocks/BlocksDemo8.vue';
import CasesDemo1 from '../demos/cases/CasesDemo1.vue';
import CasesDemo2 from '../demos/cases/CasesDemo2.vue';
import CasesDemo3 from '../demos/cases/CasesDemo3.vue';
import CasesDemo4 from '../demos/cases/CasesDemo4.vue';
import CasesDemo5 from '../demos/cases/CasesDemo5.vue';
import CasesDemo6 from '../demos/cases/CasesDemo6.vue';
import CasesDemo7 from '../demos/cases/CasesDemo7.vue';
import CasesDemo8 from '../demos/cases/CasesDemo8.vue';
import CasesDemo9 from '../demos/cases/CasesDemo9.vue';
import CasesDemo10 from '../demos/cases/CasesDemo10.vue';
import CasesDemo11 from '../demos/cases/CasesDemo11.vue';
import CasesDemo12 from '../demos/cases/CasesDemo12.vue';
import ExamplesDemo1 from '../demos/examples/ExamplesDemo1.vue';
import ExamplesDemo2 from '../demos/examples/ExamplesDemo2.vue';

const sleep = (ms) => new Promise((resolve) => {
  setTimeout(() => resolve(true), ms);
});

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('u-auto-complete.vue', () => {
  it('Demo-', async () => {
    const wrapper = mount(BlocksDemo1, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-', async () => {
    const wrapper = mount(BlocksDemo2, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-', async () => {
    const wrapper = mount(BlocksDemo3, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-', async () => {
    const wrapper = mount(BlocksDemo4, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-', async () => {
    const wrapper = mount(BlocksDemo5, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-', async () => {
    const wrapper = mount(BlocksDemo6, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-', async () => {
    const wrapper = mount(BlocksDemo7, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-', async () => {
    const wrapper = mount(BlocksDemo8, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-基本用法', async () => {
    const wrapper = mount(CasesDemo1, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-加密', async () => {
    const wrapper = mount(CasesDemo2, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-双向绑定', async () => {
    const wrapper = mount(CasesDemo3, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-只读和禁用', async () => {
    const wrapper = mount(CasesDemo4, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-可清空', async () => {
    const wrapper = mount(CasesDemo5, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-展示方式', async () => {
    const wrapper = mount(CasesDemo6, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-自定义样式', async () => {
    const wrapper = mount(CasesDemo7, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-自动扩展大小', async () => {
    const wrapper = mount(CasesDemo8, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-@deprecated 搜索图标', async () => {
    const wrapper = mount(CasesDemo9, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-展示方式', async () => {
    const wrapper = mount(CasesDemo10, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-大小扩展', async () => {
    const wrapper = mount(CasesDemo11, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-添加图标', async () => {
    const wrapper = mount(CasesDemo12, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-data-source 数组', async () => {
    const wrapper = mount(ExamplesDemo1, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-data-source 函数', async () => {
    const wrapper = mount(ExamplesDemo2, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
