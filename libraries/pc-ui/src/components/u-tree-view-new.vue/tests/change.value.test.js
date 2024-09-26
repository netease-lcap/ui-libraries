import { test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { UTreeViewNew } from '../index';

test('test change value', async () => {
  let syncValue = '';
  const DefaultValue = ['节点 1', '节点 2'];
  const wrapper = mount(UTreeViewNew, {
    propsData: {
      value: DefaultValue,
      valueField: 'text1',
      textField: 'text1',
      checkable: true,
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
      'update:value': (v) => {
        syncValue = v;
      },
    },
  });

  await wrapper.vm.$nextTick();
  expect(syncValue).toEqual(['节点 2', '节点 1.1', '节点 1.2.1', '节点 1.2.2', '节点 1.3', '节点 1.4']);

  await wrapper.setProps({
    value: ['节点 2', '节点 3', '节点 1.2'],
  });

  await wrapper.vm.$nextTick();
  expect(syncValue).toEqual(['节点 2', '节点 1.2.1', '节点 1.2.2', '节点 3.1', '节点 3.2']);
});

test('test checked controlled value', async () => {
  let syncValue = '';
  const DefaultValue = ['节点 1', '节点 2'];
  const wrapper = mount(UTreeViewNew, {
    propsData: {
      value: DefaultValue,
      valueField: 'text1',
      textField: 'text1',
      checkable: true,
      checkControlled: true,
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
      'update:value': (v) => {
        syncValue = v;
      },
    },
  });

  await wrapper.vm.$nextTick();
  expect(wrapper.vm.currentValues).toEqual(DefaultValue);

  await wrapper.setProps({
    value: ['节点 2', '节点 3', '节点 1.2'],
  });

  await wrapper.vm.$nextTick();
  expect(wrapper.vm.currentValues).toEqual(['节点 2', '节点 3', '节点 1.2']);
  expect(syncValue).toBe('');
});
