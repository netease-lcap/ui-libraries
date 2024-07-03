import { test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { UNavbarMulti } from '../index';

test('test sync value', async () => {
  const syncState = {};
  const wrapper = mount(UNavbarMulti, {
    propsData: {
      value: 'java',
      hasDataSource: true,
      router: false,
      dataSource: [
        { text: 'Java', value: 'java', description: '这是java' },
        { text: 'Python', value: 'python', description: '这是python' },
        { text: 'Node.js', value: 'nodejs', description: '这是nodejs' },
        { text: 'Go', value: 'go', description: '这是go' },
        { text: '.NET', value: '.net', description: '这是.net' },
        { text: 'PHP', value: 'php', description: '这是php' },
      ],
      textField: 'text',
      valueField: 'value',
    },
    listeners: {
      'sync:state': (name, v) => {
        syncState[name] = v;
      },
    },
  });

  await wrapper.vm.$nextTick();
  expect(syncState.value).toBe('java');
  expect(syncState.data.length).toBe(6);
  expect(syncState.readonly).toBe(false);
  expect(syncState.disabled).toBe(false);
});
