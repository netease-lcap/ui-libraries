import {
  describe,
  it,
  vi as jest,
  expect,
} from 'vitest';
import { mount } from '@vue/test-utils';

import HugePageNumberDemo from './__demos__/hugePageNumber.vue';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe('u-table-view.vue', () => {
  it('pageNumber 变化', async () => {
    const wrapper = mount(HugePageNumberDemo);
    await sleep(16);

    // 点击到第二页
    wrapper.vm.$refs.tableview.$refs.pagination.select(2);
    await sleep(16);
    const selectedPage = wrapper.find('a[selected="selected"]');
    expect(selectedPage.text()).toBe('2');
    expect(wrapper.html()).toMatchSnapshot();

    // 改变pageNumber
    wrapper.vm.pageNumber = 10000;
    await sleep(16);
    const selectedPage2 = wrapper.find('a[selected="selected"]');
    expect(selectedPage2.exists()).toBe(true);
    expect(selectedPage2.text()).toBe('10000');
    expect(wrapper.html()).toMatchSnapshot();
  });
});
