import { test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { UPagination } from '../index';

test('test sync value', async () => {
  let syncSize = 0;
  let syncPage = 0;
  let syncTotalPage = 0;
  const wrapper = mount(UPagination, {
    propsData: {
      totalItems: 75,
      showTotal: true,
      showSizer: true,
      showJumper: true,
      pageSize: 10,
      page: 3,
    },
    listeners: {
      'sync:size': (v) => {
        syncSize = v;
      },
      'sync:page': (v) => {
        syncPage = v;
      },
      'sync:totalPage': (v) => {
        syncTotalPage = v;
      },
    },
  });

  await wrapper.vm.$nextTick();
  expect(syncSize).toBe(10);
  expect(syncPage).toBe(3);
  expect(syncTotalPage).toBe(8);
});
