import { test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { USelect } from '../index';

test('test sync value', async () => {
  let syncValue = '';
  let syncData = [];
  const wrapper = mount(USelect, {
    propsData: {
      value: 'java',
      dataSource: [
        { text: 'Java', value: 'java', description: '这是java'},
        { text: 'Python', value: 'python', description: '这是python'},
        { text: 'Node.js', value: 'nodejs', description: '这是nodejs' },
        { text: 'Go', value: 'go', description: '这是go' },
        { text: '.NET', value: '.net', description: '这是.net' },
        { text: 'PHP', value: 'php', description: '这是php' },
      ],
    },
    listeners: {
      'sync:value': (v) => {
        syncValue = v;
      },
      'sync:data': (v) => {
        syncData = v;
      },
    },
  });

  await wrapper.vm.$nextTick();
  expect(syncValue).toBe('java');
  expect(syncData.length).toBe(6);

  await wrapper.setProps({
    multiple: true,
    value: ['value', 'java'],
  });

  await wrapper.vm.$nextTick();
  expect(syncValue).toEqual(['java']);
});
