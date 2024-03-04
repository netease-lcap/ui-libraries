import {
  test,
  expect,
} from 'vitest';
import { mount } from '@vue/test-utils';
import { USelect } from '../../index.js';

const sleep = (ms) => new Promise((resolve) => {
  setTimeout(() => resolve(true), ms);
});

test('test change value = null reactive ', async () => {
  const wrapper = mount({
    component: {
      USelect,
    },
    data() {
      return {
        value: '',
        list: [
          { text: 'Java', value: 'java', description: '这是java'},
          { text: 'Python', value: 'python', description: '这是python'},
          { text: 'Node.js', value: 'nodejs', description: '这是nodejs' },
          { text: 'Go', value: 'go', description: '这是go' },
          { text: '.NET', value: '.net', description: '这是.net' },
          { text: 'PHP', value: 'php', description: '这是php' },
        ],
      };
    },
    template: '<u-select :value.sync="value" filterable :data-source="list" />',
  });

  await wrapper.vm.$nextTick();
  const input = wrapper.find('input');

  expect(!input.element.value).toBe(true);

  wrapper.vm.value = 'java';
  await sleep(20);
  expect(input.element.value).toBe('Java');

  wrapper.vm.value = '';
  await sleep(20);
  expect(input.element.value).toBe('');
});
