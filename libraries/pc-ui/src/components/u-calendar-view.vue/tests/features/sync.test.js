import { test, expect, vi as jest } from 'vitest';
import { mount } from '@vue/test-utils';

import { UCalendarView } from '../../index.js';

test('test sync value', async () => {
  let syncValue = '';
  const wrapper = mount(UCalendarView, {
    propsData: {
      value: '2024-06-01',
    },
    listeners: {
      'sync:value': (v) => {
        syncValue = v;
      },
    },
  });

  await wrapper.vm.$nextTick();
  expect(syncValue).toBe('2024-06-01');

  const tdList = wrapper.findAll('td');
  await tdList.at(10).trigger('click');
  await wrapper.vm.$nextTick();
  expect(syncValue).toBe('2024-06-06');
});

test('test multiple sync value', async () => {
  let syncValue = [];
  const wrapper = mount(UCalendarView, {
    propsData: {
      value: '2024-06-01',
      multiple: true,
    },
    listeners: {
      'sync:value': (v) => {
        syncValue = v;
      },
    },
  });

  await wrapper.vm.$nextTick();
  expect(syncValue).toEqual(['2024-06-01']);

  const tdList = wrapper.findAll('td');
  await tdList.at(10).trigger('click', {
    ctrlKey: true,
  });
  await wrapper.vm.$nextTick();
  expect(syncValue).toEqual(['2024-06-01', '2024-06-06']);
});
