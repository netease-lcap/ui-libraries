import { test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { USelectableSteps } from '../index';

const sleep = (ms) => new Promise((resolve) => {
  setTimeout(() => resolve(true), ms);
});

test('test sync value', async () => {
  const syncValues = {
    value: 0,
    isFirst: false,
    isLast: false,
  };
  const wrapper = mount(USelectableSteps, {
    propsData: {
      value: 1,
      dataSource: [
        {
          title: '步骤 1',
          desc1: '描述 1',
        }, {
          title: '步骤 2',
          desc1: '描述 2',
        }, {
          title: '步骤 3',
          desc1: '描述 3',
        }, {
          title: '步骤 4',
          desc1: '描述 4',
        },
      ],
    },
    listeners: {
      'sync:value': (v) => {
        syncValues.value = v;
      },
      'sync:isFirst': (v) => {
        syncValues.isFirst = v;
      },
      'sync:isLast': (v) => {
        syncValues.isLast = v;
      },
    },
  });

  await wrapper.vm.$nextTick();
  expect(syncValues.value).toBe(1);

  wrapper.vm.prev();
  await wrapper.vm.$nextTick();
  expect(syncValues.value).toBe(0);
  expect(syncValues.isFirst).toBe(true);

  wrapper.vm.next();
  await wrapper.vm.$nextTick();
  wrapper.vm.next();
  await wrapper.vm.$nextTick();
  wrapper.vm.next();
  await wrapper.vm.$nextTick();
  wrapper.vm.next();
  await wrapper.vm.$nextTick();
  expect(syncValues.value).toBe(3);
  expect(syncValues.isLast).toBe(true);

  wrapper.vm.prev();
  await wrapper.vm.$nextTick();
  expect(syncValues.value).toBe(2);
  expect(syncValues.isLast).toBe(false);
  expect(syncValues.isFirst).toBe(false);
});
