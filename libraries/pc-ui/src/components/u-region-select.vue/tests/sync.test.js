import { test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { URegionSelect } from '../../index';

const sleep = (ms) => new Promise((resolve) => {
  setTimeout(() => resolve(true), ms);
});

test('test sync value', async () => {
  let syncValue = '';
  const DefaultValue = '浙江省/杭州市/滨江区';
  const wrapper = mount(URegionSelect, {
    propsData: {
      value: DefaultValue,
      converter: 'name',
    },
    listeners: {
      'sync:value': (v) => {
        syncValue = v;
      },
    },
  });

  await sleep(50);

  expect(syncValue).toBe(DefaultValue);
});
