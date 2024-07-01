import { test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { URadios } from '../../index';

test('test sync value', async () => {
  let syncValue = '';
  let syncData = [];
  const DefaultValue = 1;
  const wrapper = mount(URadios, {
    propsData: {
      value: DefaultValue,
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
  expect(syncValue).toBe(DefaultValue);

  await wrapper.findAll('label').at(1).trigger('click');

  await wrapper.vm.$nextTick();

  expect(syncValue).toEqual(2);
  expect(syncData.length).toBe(3);
  expect(syncData[1].value).toBe(2);
});
