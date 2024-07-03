import { test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { UInput } from '../../index';

test('test sync value', async () => {
  let syncValue = '';
  const DefaultValue = '2018-08-08 10:00:00';
  const wrapper = mount(UInput, {
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

  const inputText = '123';

  const input = wrapper.find('input');
  input.element.value = inputText;
  await input.trigger('input');

  await wrapper.vm.$nextTick();
  expect(syncValue).toBe(inputText);
});
