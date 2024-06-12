import { test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { UTabs } from '../index';

test('test sync value', async () => {
  let syncValue = false;
  const wrapper = mount(UTabs, {
    propsData: {
      value: 1,
      contentField: 'contentUrl',
      dataSource: [{
        title: '标签页 1',
        value: 1,
        contentUrl: '/components/u-tabs',
        closable: true,
      }, {
        title: '标签页 2',
        value: 2,
        contentUrl: '/components/u-tabs#路由',
        closable: false,
      }, {
        title: '标签页 3',
        value: 3,
        contentUrl: '/components/u-tabs#默认显示和可关闭',
        closable: true,
      }],
    },
    listeners: {
      'sync:value': (v) => {
        syncValue = v;
      },
    },
  });

  await wrapper.vm.$nextTick();
  expect(syncValue).toBe(1);

  const tab = wrapper.findAll('a').at(1);
  await tab.trigger('click');

  await wrapper.vm.$nextTick();
  expect(syncValue).toBe(2);
});
