import { test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { UCheckboxes } from '../../index';
import { UCheckbox } from '../../../u-checkbox.vue/index';

test('test sync value', async () => {
  let syncValue = '';
  let syncData = [];
  const DefaultValue = 1;
  const wrapper = mount(UCheckboxes, {
    propsData: {
      value: [DefaultValue],
      dataSource: [
        { label: '理学', value: 1 },
        { label: '工学', value: 2 },
        { label: '物理学', value: 3 },
      ],
      textField: 'label',
      valueField: 'value',
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
  expect(syncValue).toEqual([DefaultValue]);

  await wrapper.findAll('label').at(1).trigger('click');

  await wrapper.vm.$nextTick();

  expect(syncValue).toEqual([1, 2]);
  expect(syncData.length).toBe(3);
  expect(syncData[1].value).toBe(2);
});

test('test checkbox sync value', async () => {
  let syncValue = '';
  const wrapper = mount(UCheckbox, {
    propsData: {
      value: false,
    },
    listeners: {
      'sync:value': (v) => {
        syncValue = v;
      },
    },
  });

  await wrapper.vm.$nextTick();
  expect(syncValue).toBe(false);

  await wrapper.find('label').trigger('click');
  await wrapper.vm.$nextTick();
  expect(syncValue).toBe(true);
});
