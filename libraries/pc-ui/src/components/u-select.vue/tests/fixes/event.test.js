import { test, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { USelect } from '../../index.js';

const sleep = (ms) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(true), ms);
  });

test('test onChange event', async () => {
  const onChange = vi.fn();
  const wrapper = mount(USelect, {
    propsData: {
      value: [],
      multiple: true,
      dataSource: [
        { text: 'Java', value: 'java', description: '这是java' },
        { text: 'Python', value: 'python', description: '这是python' },
        { text: 'Node.js', value: 'nodejs', description: '这是nodejs' },
        { text: 'Go', value: 'go', description: '这是go' },
        { text: '.NET', value: '.net', description: '这是.net' },
        { text: 'PHP', value: 'php', description: '这是php' },
      ],
    },
    listeners: {
      change: onChange,
    },
  });

  await wrapper.vm.$nextTick();

  await wrapper.setProps({
    value: ['java'],
  });

  await wrapper.setProps({
    dataSource: [
      { text: 'Java', value: 'java', description: '这是java' },
      { text: 'Python', value: 'python', description: '这是python' },
      { text: 'Node.js', value: 'nodejs', description: '这是nodejs' },
      { text: 'Go', value: 'go', description: '这是go' },
      { text: '.NET', value: '.net', description: '这是.net' },
      { text: 'PHP', value: 'php', description: '这是php' },
      { text: 'TTT', value: 'tt', description: '这是tt' },
    ],
  });
  await wrapper.setProps({
    value: ['java', 'python'],
  });

  expect(wrapper.emitted().change).toBeTruthy();
  expect(onChange).toBeCalledTimes(2);
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
          { text: 'Java', value: 'java', description: '这是java' },
          { text: 'Python', value: 'python', description: '这是python' },
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

test('test change value ant datasource reactive ', async () => {
  const remoteData = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New hampshire',
    'New jersey',
    'New mexico',
    'New york',
    'North carolina',
    'North dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode island',
    'South carolina',
    'South dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West virginia',
    'Wisconsin',
    'Wyoming',
  ].map((text) => ({
    text: `1${text}`,
    value: text,
  }));
  const wrapper = mount({
    component: {
      USelect,
    },
    data() {
      return {
        value: '',
        list: [
          { text: 'Java', value: 'java', description: '这是java' },
          { text: 'Python', value: 'python', description: '这是python' },
          { text: 'Node.js', value: 'nodejs', description: '这是nodejs' },
          { text: 'Go', value: 'go', description: '这是go' },
          { text: '.NET', value: '.net', description: '这是.net' },
          { text: 'PHP', value: 'php', description: '这是php' },
        ],
      };
    },
    methods: {
      handleChange() {
        this.value = 'Alabama';
        this.list = remoteData.map((n) => ({ ...n }));
      },
      handleChangeEmpty() {
        this.value = '222';
      },
    },
    template: '<u-select :value.sync="value" filterable :data-source="list" />',
  });

  await wrapper.vm.$nextTick();
  const input = wrapper.find('input');

  expect(!input.element.value).toBe(true);

  wrapper.vm.value = 'java';
  await sleep(20);
  expect(input.element.value).toBe('Java');

  wrapper.vm.handleChange();
  await sleep(20);
  expect(input.element.value).toBe('1Alabama');

  wrapper.vm.handleChangeEmpty();
  await sleep(20);
  expect(input.element.value).toBe('');
});
