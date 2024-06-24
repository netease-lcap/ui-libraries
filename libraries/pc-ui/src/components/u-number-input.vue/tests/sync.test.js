import { test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { UNumberInput } from '../index';

test('test sync value', async () => {
  let syncValue = '';
  let formattedValue = '';
  const DefaultValue = 12.22;
  const wrapper = mount(UNumberInput, {
    propsData: {
      value: DefaultValue,
      formatter: '$ #,##0.00',
      precision: 0.01,
    },
    listeners: {
      'sync:value': (v) => {
        syncValue = v;
      },
      'sync:formattedValue': (v) => {
        formattedValue = v;
      },
    },
  });

  await wrapper.vm.$nextTick();
  expect(syncValue).toBe(DefaultValue);

  const inputText = '12.33';

  const input = wrapper.find('input');
  input.element.value = inputText;
  await input.trigger('input');
  await input.trigger('blur');

  await wrapper.vm.$nextTick();
  expect(syncValue).toBe(12.33);

  await wrapper.setProps({
    value: 1234878.46,
  });

  await wrapper.vm.$nextTick();
  expect(formattedValue).toBe('$ 1,234,878.46');
});
