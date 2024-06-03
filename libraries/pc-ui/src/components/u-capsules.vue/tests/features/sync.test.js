import { test, expect } from 'vitest';
import { mount } from '@vue/test-utils';

const TestUCapsules = {
  props: ['multiple', 'value'],
  template: `<u-capsules v-on="$listeners" :value="value" :multiple="multiple">
  <u-capsule value="1">Option-A</u-capsule>
  <u-capsule value="2">Option-B</u-capsule>
  <u-capsule id="test-cap" value="3">Option-C</u-capsule>
</u-capsules>`,
};

test('test sync value', async () => {
  let syncValue = '';
  const wrapper = mount(TestUCapsules, {
    propsData: {
      value: '2',
    },
    listeners: {
      'sync:value': (v) => {
        syncValue = v;
      },
    },
  });

  await wrapper.vm.$nextTick();
  expect(syncValue).toBe('2');

  const testDom = wrapper.find('#test-cap');
  await testDom.trigger('click');
  await wrapper.vm.$nextTick();
  expect(syncValue).toBe('3');
});

test('test multiple sync value', async () => {
  let syncValue = [];
  const wrapper = mount(TestUCapsules, {
    propsData: {
      value: ['1'],
      multiple: true,
    },
    listeners: {
      'sync:value': (v) => {
        syncValue = v;
      },
    },
  });

  await wrapper.vm.$nextTick();
  expect(syncValue).toEqual(['1']);
  const testDom = wrapper.find('#test-cap');
  await testDom.trigger('click');
  await wrapper.vm.$nextTick();
  expect(syncValue).toEqual(['1', '3']);
});
