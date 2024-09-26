import { test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { UTreeSelectNew } from '../index';

test('test sync value', async () => {
  let syncValue = '';
  let syncData = [];
  const DefaultValue = '节点 1';
  const wrapper = mount(UTreeSelectNew, {
    propsData: {
      value: DefaultValue,
      valueField: 'text1',
      textField: 'text1',
      opened: true,
      dataSource: [
        {
          text1: '节点 1',
          children: [
            { text1: '节点 1.1' },
            {
              text1: '节点 1.2',
              children: [{ text1: '节点 1.2.1' }, { text1: '节点 1.2.2' }],
            },
            { text1: '节点 1.3' },
            { text1: '节点 1.4' },
          ],
        },
        { text1: '节点 2' },
        {
          text1: '节点 3',
          children: [{ text1: '节点 3.1' }, { text1: '节点 3.2' }],
        },
      ],
    },
    listeners: {
      'sync:value': (v) => {
        syncValue = v;
      },
      'sync:data': (d) => {
        syncData = d;
      },
    },
  });

  await wrapper.vm.$nextTick();
  expect(syncValue).toBe('节点 1');
  expect(syncData.length).toBe(3);
});
