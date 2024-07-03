import { test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { UTreeSelectNew } from '../index';

test('test sync value', async () => {
  let syncValue = '';
  const DefaultValue = '节点 1';
  const wrapper = mount(UTreeSelectNew, {
    propsData: {
      value: DefaultValue,
      valueField: 'text1',
      textField: 'text1',
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
    },
  });

  await wrapper.vm.$nextTick();
  expect(syncValue).toBe('节点 1');
});
