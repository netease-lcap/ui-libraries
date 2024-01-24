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
import CasesDemo12 from '../demos/cases/CasesDemo12.vue';
import CasesDemo13 from '../demos/cases/CasesDemo13.vue';
import CasesDemo14 from '../demos/cases/CasesDemo14.vue';
import CasesDemo15 from '../demos/cases/CasesDemo15.vue';
import CasesDemo16 from '../demos/cases/CasesDemo16.vue';
import CasesDemo17 from '../demos/cases/CasesDemo17.vue';
import CasesDemo18 from '../demos/cases/CasesDemo18.vue';
import CasesDemo19 from '../demos/cases/CasesDemo19.vue';
import CasesDemo20 from '../demos/cases/CasesDemo20.vue';
import CasesDemo21 from '../demos/cases/CasesDemo21.vue';
import CasesDemo22 from '../demos/cases/CasesDemo22.vue';
import CasesDemo23 from '../demos/cases/CasesDemo23.vue';
import CasesDemo24 from '../demos/cases/CasesDemo24.vue';
import CasesDemo25 from '../demos/cases/CasesDemo25.vue';
import CasesDemo26 from '../demos/cases/CasesDemo26.vue';
import CasesDemo27 from '../demos/cases/CasesDemo27.vue';
import CasesDemo28 from '../demos/cases/CasesDemo28.vue';
import CasesDemo29 from '../demos/cases/CasesDemo29.vue';
import CasesDemo30 from '../demos/cases/CasesDemo30.vue';
import CasesDemo31 from '../demos/cases/CasesDemo31.vue';
import CasesDemo32 from '../demos/cases/CasesDemo32.vue';
import CasesDemo33 from '../demos/cases/CasesDemo33.vue';
import CasesDemo34 from '../demos/cases/CasesDemo34.vue';
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
import ExamplesDemo22 from '../demos/examples/ExamplesDemo22.vue';
import ExamplesDemo23 from '../demos/examples/ExamplesDemo23.vue';
import ExamplesDemo24 from '../demos/examples/ExamplesDemo24.vue';
import ExamplesDemo25 from '../demos/examples/ExamplesDemo25.vue';
import ExamplesDemo26 from '../demos/examples/ExamplesDemo26.vue';
import ExamplesDemo27 from '../demos/examples/ExamplesDemo27.vue';
import ExamplesDemo28 from '../demos/examples/ExamplesDemo28.vue';

const sleep = (ms) => new Promise((resolve) => {
  setTimeout(() => resolve(true), ms);
});

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('u-select.vue', () => {
  it('Demo-数据选择框', async () => {
    const wrapper = mount(BlocksDemo1, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-基本用法', async () => {
    const wrapper = mount(CasesDemo1, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-appendTo:body', async () => {
    const wrapper = mount(CasesDemo2, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-双向绑定', async () => {
    const wrapper = mount(CasesDemo3, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-双向绑定', async () => {
    const wrapper = mount(CasesDemo4, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-只读、禁用、禁用某一项', async () => {
    const wrapper = mount(CasesDemo5, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-分隔符', async () => {
    const wrapper = mount(CasesDemo6, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-定位', async () => {
    const wrapper = mount(CasesDemo7, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-分组', async () => {
    const wrapper = mount(CasesDemo8, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-可清除', async () => {
    const wrapper = mount(CasesDemo9, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-Layer', async () => {
    const wrapper = mount(CasesDemo10, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-数据源', async () => {
    const wrapper = mount(CasesDemo11, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-基本用法', async () => {
    const wrapper = mount(CasesDemo12, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-双向绑定', async () => {
    const wrapper = mount(CasesDemo13, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-Tags 风格', async () => {
    const wrapper = mount(CasesDemo14, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-Tags 风格', async () => {
    const wrapper = mount(CasesDemo15, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-Tags 展示icon', async () => {
    const wrapper = mount(CasesDemo16, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-对齐和清空问题', async () => {
    const wrapper = mount(CasesDemo17, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-保持顺序', async () => {
    const wrapper = mount(CasesDemo18, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-选项初始值', async () => {
    const wrapper = mount(CasesDemo19, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-前端过滤', async () => {
    const wrapper = mount(CasesDemo20, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-有空的项', async () => {
    const wrapper = mount(CasesDemo21, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-清除缓存', async () => {
    const wrapper = mount(CasesDemo22, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-Tag 方式', async () => {
    const wrapper = mount(CasesDemo23, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-Data 方式', async () => {
    const wrapper = mount(CasesDemo24, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-列表与 value 同时改变的问题', async () => {
    const wrapper = mount(CasesDemo25, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-一次性后端数据，前端过滤', async () => {
    const wrapper = mount(CasesDemo26, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-后端过滤，后端分页', async () => {
    const wrapper = mount(CasesDemo27, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-一次性后端数据，前端分页', async () => {
    const wrapper = mount(CasesDemo28, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-prefix, suffix', async () => {
    const wrapper = mount(CasesDemo29, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-反色', async () => {
    const wrapper = mount(CasesDemo30, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-标签和数据源混合使用', async () => {
    const wrapper = mount(CasesDemo31, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-自定义选中值的展示形式，项可添加描述', async () => {
    const wrapper = mount(CasesDemo32, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-自定义可扩展下拉项', async () => {
    const wrapper = mount(CasesDemo33, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-选中值是下一页数据的选中处理', async () => {
    const wrapper = mount(CasesDemo34, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-tag 方式', async () => {
    const wrapper = mount(ExamplesDemo1, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-data-source 数组', async () => {
    const wrapper = mount(ExamplesDemo2, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-data-source 函数', async () => {
    const wrapper = mount(ExamplesDemo3, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-指定选项字段名', async () => {
    const wrapper = mount(ExamplesDemo4, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-禁用状态、禁用某一项', async () => {
    const wrapper = mount(ExamplesDemo5, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-为空禁用', async () => {
    const wrapper = mount(ExamplesDemo6, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-autofocus', async () => {
    const wrapper = mount(ExamplesDemo7, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-分隔符', async () => {
    const wrapper = mount(ExamplesDemo8, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-分组', async () => {
    const wrapper = mount(ExamplesDemo9, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-可清除', async () => {
    const wrapper = mount(ExamplesDemo10, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-多项选择', async () => {
    const wrapper = mount(ExamplesDemo11, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-多项选择', async () => {
    const wrapper = mount(ExamplesDemo12, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-多项选择', async () => {
    const wrapper = mount(ExamplesDemo13, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-多项选择', async () => {
    const wrapper = mount(ExamplesDemo14, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-Tags 风格', async () => {
    const wrapper = mount(ExamplesDemo15, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-可以重复', async () => {
    const wrapper = mount(ExamplesDemo16, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-Flag', async () => {
    const wrapper = mount(ExamplesDemo17, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-Label', async () => {
    const wrapper = mount(ExamplesDemo18, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-修改尺寸', async () => {
    const wrapper = mount(ExamplesDemo19, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-前端过滤（搜索）', async () => {
    const wrapper = mount(ExamplesDemo20, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-匹配方式', async () => {
    const wrapper = mount(ExamplesDemo21, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-区分大小写', async () => {
    const wrapper = mount(ExamplesDemo22, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-后端过滤（搜索）', async () => {
    const wrapper = mount(ExamplesDemo23, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-自动补充', async () => {
    const wrapper = mount(ExamplesDemo24, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-前端加载更多', async () => {
    const wrapper = mount(ExamplesDemo25, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-后端加载更多', async () => {
    const wrapper = mount(ExamplesDemo26, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-前缀方式', async () => {
    const wrapper = mount(ExamplesDemo27, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-自定义可扩展下拉项', async () => {
    const wrapper = mount(ExamplesDemo28, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
