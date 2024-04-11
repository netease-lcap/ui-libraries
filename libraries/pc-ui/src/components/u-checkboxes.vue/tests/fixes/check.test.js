import { test, expect } from 'vitest';

/**
 * 以下测试用例根据 docs/*.md 自动生成，请勿修改和提交！！！
 */
import Vue from 'vue';
import { mount } from '@vue/test-utils';
import Checkboxs from '../../index.vue';
import Checkbox from '../../../u-checkbox.vue';

test('should check all', async () => {
  const wrapper = mount(Checkboxs, {
    propsData: {
      value: [1],
      checkAll: true,
      dataSource: [{
        value: 1,
        text: 'text1',
      }, {
        value: 2,
        text: 'text2',
      }, {
        value: 3,
        text: 'text3',
      }],
    },
  });

  await wrapper.vm.$nextTick();
  const checkAll = wrapper.findComponent(Checkbox);
  expect(checkAll.vm.status).toBe('null');
  wrapper.vm.value = [];
  await wrapper.vm.$nextTick();
  expect(checkAll.vm.status).toBe('false');
  wrapper.vm.value = [1, 2, 3];
  await wrapper.vm.$nextTick('true');
});
