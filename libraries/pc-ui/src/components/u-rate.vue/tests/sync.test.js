import { test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { URate } from '../../index';

test('test sync value', async () => {
  let syncValue = '';
  const DefaultValue = 4;
  const wrapper = mount(URate, {
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
});
