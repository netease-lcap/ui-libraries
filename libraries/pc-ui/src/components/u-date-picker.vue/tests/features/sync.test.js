import { test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { UDatePicker } from '../../index';

test('test sync value', async () => {
  let syncValue = '';
  const DefaultValue = '2018-08-08';
  const wrapper = mount(UDatePicker, {
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

test('test range sync value', async () => {
  let syncStartValue = '';
  let syncEndValue = '';
  const wrapper = mount(UDatePicker, {
    propsData: {
      range: true,
      startDate: '2018-08-08',
      endDate: '2019-08-08',
    },
    listeners: {
      'sync:startDate': (v) => {
        syncStartValue = v;
      },
      'sync:endDate': (v) => {
        syncEndValue = v;
      },
    },
  });

  await wrapper.vm.$nextTick();
  expect(syncStartValue).toBe('2018-08-08');
  expect(syncEndValue).toBe('2019-08-08');
});
