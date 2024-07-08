import { test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { UTimePicker } from '../index';

test('test sync value', async () => {
  let syncValue = '';
  const DefaultValue = '10:00:00';
  const wrapper = mount(UTimePicker, {
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
  const wrapper = mount(UTimePicker, {
    propsData: {
      range: true,
      startTime: '10:00:00',
      endTime: '12:00:01',
    },
    listeners: {
      'sync:startTime': (v) => {
        syncStartValue = v;
      },
      'sync:endTime': (v) => {
        syncEndValue = v;
      },
    },
  });

  await wrapper.vm.$nextTick();
  expect(syncStartValue).toBe('10:00:00');
  expect(syncEndValue).toBe('12:00:01');
});
