import { test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { UDateTimePicker } from '../../index';

test('test sync value', async () => {
  let syncValue = '';
  const DefaultValue = '2018-08-08 10:00:00';
  const wrapper = mount(UDateTimePicker, {
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
  expect(syncValue).toBe('2018-08-08T02:00:00.000Z');
});

test('test range sync value', async () => {
  let syncStartValue = '';
  let syncEndValue = '';
  const wrapper = mount(UDateTimePicker, {
    propsData: {
      range: true,
      startDate: '2018-08-08 10:00:00',
      endDate: '2019-08-08 10:00:00',
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
  expect(syncStartValue).toBe('2018-08-08T02:00:00.000Z');
  expect(syncEndValue).toBe('2019-08-08T02:00:00.000Z');
});
