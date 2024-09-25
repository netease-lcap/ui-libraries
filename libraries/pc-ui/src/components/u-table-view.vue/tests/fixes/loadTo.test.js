import {
    describe,
    it,
    vi as jest,
    expect,
  } from 'vitest';
  import { mount } from '@vue/test-utils';
  
  import LoadToDemo from './__demos__/loadTo.vue';
  
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  
  describe('u-table-view.vue', () => {
    it('开启 showJumper loadTo pageNumber 变化', async () => {
      const wrapper = mount(LoadToDemo);
      await sleep(30);
      await wrapper.vm.$nextTick();
  
      // 点击到第二页
      wrapper.vm.pageTo = 2;
      wrapper.vm.loadTo();
      await wrapper.vm.$nextTick();
      await sleep(30);
      const selectedPage = wrapper.find('a[selected="selected"]');
      expect(selectedPage.text()).toBe('2');
    });
  });
  