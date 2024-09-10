import { test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { UCascader } from '../../index';

test('test value control normal', async () => {
  const DefaultValue = '工学 / 计算机科学与技术';
  const wrapper = mount(UCascader, {
    propsData: {
      value: '',
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
  });

  await wrapper.vm.$nextTick();

  await wrapper.setProps({
    value: DefaultValue,
  });

  expect(wrapper.vm.currentValue).toBe(DefaultValue);
  expect(wrapper.vm.lastValueString).toBe(DefaultValue);

  await wrapper.setProps({
    showFinalValue: true,
    value: '理学 / 化学',
  });

  expect(wrapper.vm.currentValue).toBe('理学 / 化学');
  expect(wrapper.vm.lastValueString).toBe('理学 / 化学');
});

test('test value control arrayLike', async () => {
  const DefaultValue = [2, 21];
  const wrapper = mount(UCascader, {
    propsData: {
      value: null,
      useArrayLikeValue: true,
      valueField: 'entity1.id',
      parentField: 'entity1.parentid',
      field: 'entity1.property1',
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
  });

  await wrapper.vm.$nextTick();

  await wrapper.setProps({
    value: DefaultValue,
  });

  await wrapper.vm.$nextTick();
  expect(wrapper.vm.currentValue).toBe('工学 / 计算机科学与技术');
  expect(wrapper.vm.lastValueString).toBe('工学 / 计算机科学与技术');

  await wrapper.setProps({
    showFinalValue: true,
    value: [1, 13],
  });

  expect(wrapper.vm.currentValue).toBe('化学');
  expect(wrapper.vm.lastValueString).toBe('理学 / 化学');
});
