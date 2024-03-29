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
import CasesDemo35 from '../demos/cases/CasesDemo35.vue';
import CasesDemo36 from '../demos/cases/CasesDemo36.vue';
import CasesDemo37 from '../demos/cases/CasesDemo37.vue';
// // import CasesDemo38 from '../demos/cases/CasesDemo38.vue';
import CasesDemo39 from '../demos/cases/CasesDemo39.vue';
import CasesDemo40 from '../demos/cases/CasesDemo40.vue';
import CasesDemo41 from '../demos/cases/CasesDemo41.vue';
import CasesDemo42 from '../demos/cases/CasesDemo42.vue';
import CasesDemo43 from '../demos/cases/CasesDemo43.vue';
import CasesDemo44 from '../demos/cases/CasesDemo44.vue';
import CasesDemo45 from '../demos/cases/CasesDemo45.vue';
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
import ExamplesDemo29 from '../demos/examples/ExamplesDemo29.vue';
import ExamplesDemo30 from '../demos/examples/ExamplesDemo30.vue';
import ExamplesDemo31 from '../demos/examples/ExamplesDemo31.vue';
import ExamplesDemo32 from '../demos/examples/ExamplesDemo32.vue';
import ExamplesDemo33 from '../demos/examples/ExamplesDemo33.vue';
import ExamplesDemo34 from '../demos/examples/ExamplesDemo34.vue';
import ExamplesDemo35 from '../demos/examples/ExamplesDemo35.vue';
import ExamplesDemo36 from '../demos/examples/ExamplesDemo36.vue';
import ExamplesDemo37 from '../demos/examples/ExamplesDemo37.vue';
import ExamplesDemo38 from '../demos/examples/ExamplesDemo38.vue';
import ExamplesDemo39 from '../demos/examples/ExamplesDemo39.vue';
import ExamplesDemo40 from '../demos/examples/ExamplesDemo40.vue';
import ExamplesDemo41 from '../demos/examples/ExamplesDemo41.vue';
import ExamplesDemo42 from '../demos/examples/ExamplesDemo42.vue';
import ExamplesDemo43 from '../demos/examples/ExamplesDemo43.vue';
import ExamplesDemo44 from '../demos/examples/ExamplesDemo44.vue';
import ExamplesDemo45 from '../demos/examples/ExamplesDemo45.vue';
import ExamplesDemo46 from '../demos/examples/ExamplesDemo46.vue';
import ExamplesDemo47 from '../demos/examples/ExamplesDemo47.vue';
import ExamplesDemo48 from '../demos/examples/ExamplesDemo48.vue';
import ExamplesDemo49 from '../demos/examples/ExamplesDemo49.vue';
import ExamplesDemo50 from '../demos/examples/ExamplesDemo50.vue';
import ExamplesDemo51 from '../demos/examples/ExamplesDemo51.vue';
import ExamplesDemo52 from '../demos/examples/ExamplesDemo52.vue';
import ExamplesDemo53 from '../demos/examples/ExamplesDemo53.vue';
import ExamplesDemo54 from '../demos/examples/ExamplesDemo54.vue';
import ExamplesDemo55 from '../demos/examples/ExamplesDemo55.vue';
import ExamplesDemo56 from '../demos/examples/ExamplesDemo56.vue';
import ExamplesDemo57 from '../demos/examples/ExamplesDemo57.vue';
import ExamplesDemo58 from '../demos/examples/ExamplesDemo58.vue';

const sleep = (ms) => new Promise((resolve) => {
  setTimeout(() => resolve(true), ms);
});

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('u-table-view.vue', () => {
  it('Demo-普通数据表格', async () => {
    const wrapper = mount(BlocksDemo1, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-纯数组前端分页', async () => {
    const wrapper = mount(CasesDemo1, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-刚开始为空的情况', async () => {
    const wrapper = mount(CasesDemo2, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-纯数组前端排序', async () => {
    const wrapper = mount(CasesDemo3, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-后端排序，前端分页', async () => {
    const wrapper = mount(CasesDemo4, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Demo-纯前端过滤', async () => {
    const wrapper = mount(CasesDemo5, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  // it('Demo-后端过滤，前端分页', async () => {
  //   const wrapper = mount(CasesDemo6, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-表头吸顶', async () => {
  //   const wrapper = mount(CasesDemo7, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-表头吸顶', async () => {
  //   const wrapper = mount(CasesDemo8, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  it('Demo-默认多行显示', async () => {
    const wrapper = mount(CasesDemo9, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  // it('Demo-省略显示', async () => {
  //   const wrapper = mount(CasesDemo10, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  it('Demo-表头文字省略展示', async () => {
    const wrapper = mount(CasesDemo11, { localVue, router });
    await sleep(16);
    expect(wrapper.html()).toMatchSnapshot();
  });

  // it('Demo-全部百分比', async () => {
  //   const wrapper = mount(CasesDemo12, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-百分比与数字结合，横向滚动', async () => {
  //   const wrapper = mount(CasesDemo13, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-固定列', async () => {
  //   const wrapper = mount(CasesDemo14, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-多选的问题', async () => {
  //   const wrapper = mount(CasesDemo15, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-局部报错', async () => {
  //   const wrapper = mount(CasesDemo16, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-value-field', async () => {
  //   const wrapper = mount(CasesDemo17, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-数据后来加载过来时，高度应当重新计算', async () => {
  //   const wrapper = mount(CasesDemo18, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-data-source Error 的情况', async () => {
  //   const wrapper = mount(CasesDemo19, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-步骤条中使用', async () => {
  //   const wrapper = mount(CasesDemo20, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-排序+调整列宽', async () => {
  //   const wrapper = mount(CasesDemo21, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // // it('Demo-切换时分页调整不回来，分页报错', async () => {
  // //   const wrapper = mount(CasesDemo22, { localVue, router });
  // //   await sleep(16);
  // //   expect(wrapper.html()).toMatchSnapshot();
  // // });

  // it('Demo-过滤下拉菜单不应该嵌在表格内部', async () => {
  //   const wrapper = mount(CasesDemo23, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-空表格显示数据异常', async () => {
  //   const wrapper = mount(CasesDemo24, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-空表格添加数据不会 reload', async () => {
  //   const wrapper = mount(CasesDemo25, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // // it('Demo-u-grid-layout 和 u-tabs 中的布局问题', async () => {
  // //   const wrapper = mount(CasesDemo26, { localVue, router });
  // //   await sleep(16);
  // //   expect(wrapper.html()).toMatchSnapshot();
  // // });

  // it('Demo-loading 的问题', async () => {
  //   const wrapper = mount(CasesDemo27, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-前端排序不需要 sorting 也能保持状态', async () => {
  //   const wrapper = mount(CasesDemo28, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-后端排序', async () => {
  //   const wrapper = mount(CasesDemo29, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-v-if', async () => {
  //   const wrapper = mount(CasesDemo30, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-v-show', async () => {
  //   const wrapper = mount(CasesDemo31, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-树型展示，点击选中', async () => {
  //   const wrapper = mount(CasesDemo32, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-树型展示', async () => {
  //   const wrapper = mount(CasesDemo33, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // // it('Demo-显隐列配置', async () => {
  // //   const wrapper = mount(CasesDemo34, { localVue, router });
  // //   await sleep(16);
  // //   expect(wrapper.html()).toMatchSnapshot();
  // // });

  // it('Demo-编辑行', async () => {
  //   const wrapper = mount(CasesDemo35, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-动态列', async () => {
  //   const wrapper = mount(CasesDemo36, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // // it('Demo-行列与表头合并', async () => {
  // //   const wrapper = mount(CasesDemo37, { localVue, router });
  // //   await sleep(16);
  // //   expect(wrapper.html()).toMatchSnapshot();
  // // });

  // // it('Demo-行列与表头合并+固定列', async () => {
  // //   const wrapper = mount(CasesDemo38, { localVue, router });
  // //   await sleep(16);
  // //   expect(wrapper.html()).toMatchSnapshot();
  // // });

  // it('Demo-自定义展开列图标', async () => {
  //   const wrapper = mount(CasesDemo39, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-虚拟列表', async () => {
  //   const wrapper = mount(CasesDemo40, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-纯数组前端分页', async () => {
  //   const wrapper = mount(CasesDemo41, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-纯前端分页数据源改变后分页情况', async () => {
  //   const wrapper = mount(CasesDemo42, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-后端分页', async () => {
  //   const wrapper = mount(CasesDemo43, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-纯数组前端排序', async () => {
  //   const wrapper = mount(CasesDemo44, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-纯前端过滤', async () => {
  //   const wrapper = mount(CasesDemo45, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-data-source 数组', async () => {
  //   const wrapper = mount(ExamplesDemo1, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-data-source 函数', async () => {
  //   const wrapper = mount(ExamplesDemo2, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-格式器', async () => {
  //   const wrapper = mount(ExamplesDemo3, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-格式器', async () => {
  //   const wrapper = mount(ExamplesDemo4, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-列插槽', async () => {
  //   const wrapper = mount(ExamplesDemo5, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-表格线条', async () => {
  //   const wrapper = mount(ExamplesDemo6, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-条纹展示', async () => {
  //   const wrapper = mount(ExamplesDemo7, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-表格颜色', async () => {
  //   const wrapper = mount(ExamplesDemo8, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-单行颜色', async () => {
  //   const wrapper = mount(ExamplesDemo9, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-隐藏头部', async () => {
  //   const wrapper = mount(ExamplesDemo10, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-加载中', async () => {
  //   const wrapper = mount(ExamplesDemo11, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-加载中', async () => {
  //   const wrapper = mount(ExamplesDemo12, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-加载错误', async () => {
  //   const wrapper = mount(ExamplesDemo13, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-加载错误', async () => {
  //   const wrapper = mount(ExamplesDemo14, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-没有数据', async () => {
  //   const wrapper = mount(ExamplesDemo15, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-表头固定', async () => {
  //   const wrapper = mount(ExamplesDemo16, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // // it('Demo-表头吸顶', async () => {
  // //   const wrapper = mount(ExamplesDemo17, { localVue, router });
  // //   await sleep(16);
  // //   expect(wrapper.html()).toMatchSnapshot();
  // // });

  // it('Demo-默认多行显示', async () => {
  //   const wrapper = mount(ExamplesDemo18, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-单行省略显示', async () => {
  //   const wrapper = mount(ExamplesDemo19, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-表头文字省略显示', async () => {
  //   const wrapper = mount(ExamplesDemo20, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-横向滚动', async () => {
  //   const wrapper = mount(ExamplesDemo21, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // // it('Demo-固定列', async () => {
  // //   const wrapper = mount(ExamplesDemo22, { localVue, router });
  // //   await sleep(16);
  // //   expect(wrapper.html()).toMatchSnapshot();
  // // });

  // it('Demo-隐藏部分列', async () => {
  //   const wrapper = mount(ExamplesDemo23, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-average', async () => {
  //   const wrapper = mount(ExamplesDemo24, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-sequence', async () => {
  //   const wrapper = mount(ExamplesDemo25, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-none', async () => {
  //   const wrapper = mount(ExamplesDemo26, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-前端分页', async () => {
  //   const wrapper = mount(ExamplesDemo27, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-后端分页', async () => {
  //   const wrapper = mount(ExamplesDemo28, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-翻页器功能', async () => {
  //   const wrapper = mount(ExamplesDemo29, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-滚动加载更多', async () => {
  //   const wrapper = mount(ExamplesDemo30, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-手动加载更多', async () => {
  //   const wrapper = mount(ExamplesDemo31, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-前端排序', async () => {
  //   const wrapper = mount(ExamplesDemo32, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-后端排序', async () => {
  //   const wrapper = mount(ExamplesDemo33, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-前端过滤（筛选）', async () => {
  //   const wrapper = mount(ExamplesDemo34, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-前端过滤（筛选）- 筛选项可多选', async () => {
  //   const wrapper = mount(ExamplesDemo35, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-后端过滤（筛选）', async () => {
  //   const wrapper = mount(ExamplesDemo36, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-后端过滤（筛选）- 筛选项可多选', async () => {
  //   const wrapper = mount(ExamplesDemo37, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-序号列', async () => {
  //   const wrapper = mount(ExamplesDemo38, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-单选列', async () => {
  //   const wrapper = mount(ExamplesDemo39, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-单选列', async () => {
  //   const wrapper = mount(ExamplesDemo40, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-多选列', async () => {
  //   const wrapper = mount(ExamplesDemo41, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-多选列', async () => {
  //   const wrapper = mount(ExamplesDemo42, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-展开列', async () => {
  //   const wrapper = mount(ExamplesDemo43, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-展开列', async () => {
  //   const wrapper = mount(ExamplesDemo44, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-展开列', async () => {
  //   const wrapper = mount(ExamplesDemo45, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-特殊列与普通功能共用', async () => {
  //   const wrapper = mount(ExamplesDemo46, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-编辑行', async () => {
  //   const wrapper = mount(ExamplesDemo47, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-编辑行-new', async () => {
  //   const wrapper = mount(ExamplesDemo48, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-树型展示', async () => {
  //   const wrapper = mount(ExamplesDemo49, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-树型展示', async () => {
  //   const wrapper = mount(ExamplesDemo50, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-表格行拖拽', async () => {
  //   const wrapper = mount(ExamplesDemo51, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-表格行拖拽', async () => {
  //   const wrapper = mount(ExamplesDemo52, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-表格行拖拽', async () => {
  //   const wrapper = mount(ExamplesDemo53, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-表格行拖拽', async () => {
  //   const wrapper = mount(ExamplesDemo54, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-两个表格拖拽', async () => {
  //   const wrapper = mount(ExamplesDemo55, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-两个表格拖拽', async () => {
  //   const wrapper = mount(ExamplesDemo56, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-两个表格拖拽', async () => {
  //   const wrapper = mount(ExamplesDemo57, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('Demo-导出 Excel', async () => {
  //   const wrapper = mount(ExamplesDemo58, { localVue, router });
  //   await sleep(16);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });
});
