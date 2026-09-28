import { test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { UTreeSelectNew } from '../index';

const sleep = (ms) => new Promise((resolve) => {
  setTimeout(() => resolve(true), ms);
});

async function load(params) {
  if (!params.node) {
    return [{ text: '节点 1', value: '1' }];
  }
  if (params.node.value === '1') {
    return [
      { text: '节点 1.1', value: '1.1' },
      { text: '节点 1.2', value: '1.2' },
    ];
  }
  return [];
}

test('函数数据源懒加载时回显选中项文本', async () => {
  const wrapper = mount(UTreeSelectNew, {
    propsData: {
      value: '1.1',
      initialLoad: false,
      dataSource: load,
    },
  });

  await sleep(50);
  await wrapper.vm.$nextTick();

  expect(wrapper.vm.selectedItem).toBeTruthy();
  expect(wrapper.vm.selectedItem.text).toBe('节点 1.1');
  expect(wrapper.text()).toContain('节点 1.1');
});

test('展开懒加载后选中项能正确回显文本', async () => {
  const wrapper = mount(UTreeSelectNew, {
    propsData: {
      value: null,
      opened: true,
      initialLoad: false,
      dataSource: load,
    },
  });

  await wrapper.vm.$nextTick();
  const treeView = wrapper.vm.$refs.treeView;
  expect(treeView).toBeTruthy();

  await treeView.load();
  await sleep(50);
  await wrapper.vm.$nextTick();

  const rootNode = treeView.nodeVMs[0];
  await rootNode.load();
  await sleep(50);
  await wrapper.vm.$nextTick();

  wrapper.vm.onUpdateValue('1.1');
  await wrapper.vm.$nextTick();

  expect(wrapper.vm.selectedItem).toBeTruthy();
  expect(wrapper.vm.selectedItem.text).toBe('节点 1.1');
  expect(wrapper.text()).toContain('节点 1.1');
});

test('已有回显值展开子节点后不应清空文本', async () => {
  const wrapper = mount(UTreeSelectNew, {
    propsData: {
      value: '1.1',
      opened: true,
      initialLoad: false,
      dataSource: load,
    },
  });

  await sleep(50);
  await wrapper.vm.$nextTick();

  expect(wrapper.vm.selectedItem).toBeTruthy();
  expect(wrapper.text()).toContain('节点 1.1');

  const treeView = wrapper.vm.$refs.treeView;
  await treeView.load();
  await sleep(50);
  await wrapper.vm.$nextTick();

  expect(wrapper.vm.actualValue).toBe('1.1');
  expect(wrapper.vm.selectedItem).toBeTruthy();
  expect(wrapper.text()).toContain('节点 1.1');

  const rootNode = treeView.nodeVMs[0];
  await rootNode.toggle(true);
  await sleep(50);
  await wrapper.vm.$nextTick();

  expect(wrapper.vm.actualValue).toBe('1.1');
  expect(wrapper.vm.selectedItem).toBeTruthy();
  expect(wrapper.text()).toContain('节点 1.1');
});
