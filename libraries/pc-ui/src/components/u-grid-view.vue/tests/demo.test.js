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
import ExamplesDemo9 from '../demos/examples/ExamplesDemo9.vue';
import ExamplesDemo10 from '../demos/examples/ExamplesDemo10.vue';
import ExamplesDemo11 from '../demos/examples/ExamplesDemo11.vue';
import ExamplesDemo12 from '../demos/examples/ExamplesDemo12.vue';
import ExamplesDemo13 from '../demos/examples/ExamplesDemo13.vue';
import ExamplesDemo14 from '../demos/examples/ExamplesDemo14.vue';
import ExamplesDemo15 from '../demos/examples/ExamplesDemo15.vue';
import ExamplesDemo16 from '../demos/examples/ExamplesDemo16.vue';
import ExamplesDemo17 from '../demos/examples/ExamplesDemo17.vue';
import ExamplesDemo18 from '../demos/examples/ExamplesDemo18.vue';
import ExamplesDemo19 from '../demos/examples/ExamplesDemo19.vue';
import ExamplesDemo20 from '../demos/examples/ExamplesDemo20.vue';
import ExamplesDemo21 from '../demos/examples/ExamplesDemo21.vue';

const sleep = (ms) => new Promise((resolve) => {
  setTimeout(() => resolve(true), ms);
});

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('u-grid-view.vue', () => {
  it('Demo-普通数据网格', async () => {
    const wrapper = mount(BlocksDemo1, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-基本用法', async () => {
    const wrapper = mount(CasesDemo1, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-选项值', async () => {
    const wrapper = mount(CasesDemo2, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-只读、禁用、禁用某一项', async () => {
    const wrapper = mount(CasesDemo3, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-分隔符', async () => {
    const wrapper = mount(CasesDemo4, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-分组', async () => {
    const wrapper = mount(CasesDemo5, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-可取消', async () => {
    const wrapper = mount(CasesDemo6, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-多项选择', async () => {
    const wrapper = mount(CasesDemo7, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-前端分页', async () => {
    const wrapper = mount(CasesDemo8, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-一次性后端数据，前端分页', async () => {
    const wrapper = mount(CasesDemo9, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-多选时验证', async () => {
    const wrapper = mount(CasesDemo10, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-loading', async () => {
    const wrapper = mount(CasesDemo11, { localVue, router });
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

  it('Demo-指定选项字段名', async () => {
    const wrapper = mount(ExamplesDemo3, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-只读状态、禁用状态、禁用某一项', async () => {
    const wrapper = mount(ExamplesDemo4, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-可取消', async () => {
    const wrapper = mount(ExamplesDemo5, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-多项选择', async () => {
    const wrapper = mount(ExamplesDemo6, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-添加头部', async () => {
    const wrapper = mount(ExamplesDemo7, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-添加尾部', async () => {
    const wrapper = mount(ExamplesDemo8, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-自定义内容', async () => {
    const wrapper = mount(ExamplesDemo9, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-表单验证', async () => {
    const wrapper = mount(ExamplesDemo10, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-修改尺寸', async () => {
    const wrapper = mount(ExamplesDemo11, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-前端过滤（搜索）', async () => {
    const wrapper = mount(ExamplesDemo12, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-匹配方式', async () => {
    const wrapper = mount(ExamplesDemo13, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-区分大小写', async () => {
    const wrapper = mount(ExamplesDemo14, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-后端过滤（搜索）', async () => {
    const wrapper = mount(ExamplesDemo15, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-前端分页', async () => {
    const wrapper = mount(ExamplesDemo16, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-加载更多', async () => {
    const wrapper = mount(ExamplesDemo17, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-后端分页与加载更多', async () => {
    const wrapper = mount(ExamplesDemo18, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-自定义内容', async () => {
    const wrapper = mount(ExamplesDemo19, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-自定义内容', async () => {
    const wrapper = mount(ExamplesDemo20, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-结合卡片', async () => {
    const wrapper = mount(ExamplesDemo21, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
