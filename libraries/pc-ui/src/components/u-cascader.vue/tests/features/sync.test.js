import { test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { UCascader } from '../../index';

test('test sync value', async () => {
  let syncValue = '';
  let syncData = [];
  const DefaultValue = '工学 / 计算机科学与技术';
  const wrapper = mount(UCascader, {
    propsData: {
      value: DefaultValue,
      dataSource: [
        { entity1: { property1: '理学', id: 1 } },
        { entity1: { property1: '工学', id: 2 } },
        { entity1: { property1: '物理学', id: 11, parentid: 1 } },
        { entity1: { property1: '数学', id: 12, parentid: 1 } },
        { entity1: { property1: '化学', id: 13, parentid: 1 } },
        { entity1: { property1: '计算机科学与技术', id: 21, parentid: 2 } },
        { entity1: { property1: '软件工程', id: 22, parentid: 2 } },
        { entity1: { property1: '机械工程', id: 23, parentid: 2 } },
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
  expect(syncValue).toBe(DefaultValue);

  await wrapper.setProps({
    useArrayLikeValue: true,
    value: [12],
  });

  await wrapper.vm.$nextTick();

  expect(syncValue).toEqual([12]);
  expect(syncData.length).toBe(8);
  expect(syncData[0].entity1.id).toBe(1);
});
