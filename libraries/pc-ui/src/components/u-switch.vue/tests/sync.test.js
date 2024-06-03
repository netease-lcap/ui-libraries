import { test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { USwitch } from '../../index';

test('test sync value', async () => {
  let syncValue = false;
  const wrapper = mount(USwitch, {
    propsData: {
    },
    listeners: {
      'sync:value': (v) => {
        syncValue = v;
      },
    },
  });

  await wrapper.vm.$nextTick();
  expect(syncValue).toBe(false);

  const input = wrapper.find('label');
  await input.trigger('click');

  await wrapper.vm.$nextTick();
  expect(syncValue).toBe(true);
});
