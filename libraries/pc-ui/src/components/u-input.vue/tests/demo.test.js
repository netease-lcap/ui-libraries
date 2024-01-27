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
import CasesDemo6 from '../demos/cases/CasesDemo6.vue';
import CasesDemo7 from '../demos/cases/CasesDemo7.vue';
import CasesDemo8 from '../demos/cases/CasesDemo8.vue';
import CasesDemo9 from '../demos/cases/CasesDemo9.vue';
import CasesDemo10 from '../demos/cases/CasesDemo10.vue';
import CasesDemo11 from '../demos/cases/CasesDemo11.vue';
import ExamplesDemo1 from '../demos/examples/ExamplesDemo1.vue';
import ExamplesDemo2 from '../demos/examples/ExamplesDemo2.vue';
import ExamplesDemo3 from '../demos/examples/ExamplesDemo3.vue';
import ExamplesDemo4 from '../demos/examples/ExamplesDemo4.vue';
import ExamplesDemo5 from '../demos/examples/ExamplesDemo5.vue';
import ExamplesDemo6 from '../demos/examples/ExamplesDemo6.vue';
import ExamplesDemo7 from '../demos/examples/ExamplesDemo7.vue';
import ExamplesDemo8 from '../demos/examples/ExamplesDemo8.vue';

const sleep = (ms) => new Promise((resolve) => {
  setTimeout(() => resolve(true), ms);
});

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('u-input.vue', () => {
  it('Demo-', async () => {
    const wrapper = mount(BlocksDemo1, { localVue, router });
    await sleep(5);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-基本用法', async () => {
    const wrapper = mount(CasesDemo1, { localVue, router });
    await sleep(5);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-加密', async () => {
    const wrapper = mount(CasesDemo2, { localVue, router });
    await sleep(5);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-双向绑定', async () => {
    const wrapper = mount(CasesDemo3, { localVue, router });
    await sleep(5);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-只读和禁用', async () => {
    const wrapper = mount(CasesDemo4, { localVue, router });
    await sleep(5);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-可清空', async () => {
    const wrapper = mount(CasesDemo5, { localVue, router });
    await sleep(5);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-展示方式', async () => {
    const wrapper = mount(CasesDemo6, { localVue, router });
    await sleep(5);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-自定义样式', async () => {
    const wrapper = mount(CasesDemo7, { localVue, router });
    await sleep(5);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-自动扩展大小', async () => {
    const wrapper = mount(CasesDemo8, { localVue, router });
    await sleep(5);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-@deprecated 搜索图标', async () => {
    const wrapper = mount(CasesDemo9, { localVue, router });
    await sleep(5);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-和倒计时一起使用', async () => {
    const wrapper = mount(CasesDemo10, { localVue, router });
    await sleep(5);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-键盘事件', async () => {
    const wrapper = mount(CasesDemo11, { localVue, router });
    await sleep(5);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-基本用法', async () => {
    const wrapper = mount(ExamplesDemo1, { localVue, router });
    await sleep(5);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-加密', async () => {
    const wrapper = mount(ExamplesDemo2, { localVue, router });
    await sleep(5);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-双向绑定', async () => {
    const wrapper = mount(ExamplesDemo3, { localVue, router });
    await sleep(5);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-只读和禁用', async () => {
    const wrapper = mount(ExamplesDemo4, { localVue, router });
    await sleep(5);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-可清除', async () => {
    const wrapper = mount(ExamplesDemo5, { localVue, router });
    await sleep(5);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-展示方式', async () => {
    const wrapper = mount(ExamplesDemo6, { localVue, router });
    await sleep(5);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-大小扩展', async () => {
    const wrapper = mount(ExamplesDemo7, { localVue, router });
    await sleep(5);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-添加图标', async () => {
    const wrapper = mount(ExamplesDemo8, { localVue, router });
    await sleep(5);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
