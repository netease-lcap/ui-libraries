import { test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { UComboSlider } from '../../index';

test('test sync value', async () => {
  let syncValue = '';
  const DefaultValue = 1;
  const wrapper = mount(UComboSlider, {
    propsData: {
      value: DefaultValue,
    },
    listeners: {
      'sync:value': (v) => {
        syncValue = v;
      },
    },
  });

  await wrapper.vm.$nextTick();
  expect(syncValue).toBe(DefaultValue);

  await wrapper.setProps({
    multiple: true,
    value: [10, 20],
  });

  await wrapper.vm.$nextTick();
  expect(syncValue).toEqual([10, 20]);
});
