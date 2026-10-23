import { test, expect, describe } from 'vitest';
import { mount } from '@vue/test-utils';
import { UTreeSelectNew } from '../index';

const sleep = (ms) => new Promise((resolve) => {
  setTimeout(() => resolve(true), ms);
});

const flatRecords = [
  { typeId: 'A', typeName: '人员异常', parentId: '' },
  { typeId: 'B', typeName: '人员数量不足', parentId: 'A' },
  { typeId: 'C', typeName: '人员技能不足', parentId: 'B' },
];

const flatProps = {
  textField: 'typeName',
  valueField: 'typeId',
  parentField: 'parentId',
  childrenField: 'children',
};

const lazyProps = {
  textField: 'text',
  valueField: 'value',
  childrenField: 'children',
};

function lazyLoad(params) {
  if (!params.node) {
    return [
      { text: '节点 1', value: '1' },
      { text: '节点 2', value: '2' },
    ];
  }
  if (params.node.value === '1') {
    return [
      { text: '节点 1.1', value: '1.1' },
      { text: '节点 1.2', value: '1.2' },
    ];
  }
  if (params.node.value === '2') {
    return [{ text: '节点 2.1', value: '2.1' }];
  }
  return [];
}

function createCounterLoader(impl, maxCalls = 20) {
  const counter = { n: 0 };
  const load = async (params = {}) => {
    counter.n += 1;
    if (counter.n > maxCalls) {
      return new Promise(() => {});
    }
    return impl(params, counter.n);
  };
  return { load, counter };
}

async function mountSelect(propsData, extra = {}) {
  const wrapper = mount(UTreeSelectNew, { propsData, ...extra });
  await sleep(60);
  await wrapper.vm.$nextTick();
  return wrapper;
}

describe('多选补加载闭环', () => {
  test.each([
    ['空选 []', [], 0],
    ['单个选中 [A]', ['A'], 1],
    ['多个选中 [A,B]', ['A', 'B'], 1],
  ])('函数数据源 + %s', async (_, value, expected) => {
    const { load, counter } = createCounterLoader(() => flatRecords.map((item) => ({ ...item })));
    const wrapper = await mountSelect({
      ...flatProps,
      checkable: true,
      value,
      dataSource: load,
    });

    expect(counter.n).toBe(expected);
    if (value.length) {
      value.forEach((item) => {
        expect(wrapper.vm.checkableValue).toContain(
          flatRecords.find((record) => record.typeId === item).typeName,
        );
      });
    }
    wrapper.destroy();
  });

  test.each([
    ['空选 []', [], 0],
    ['多个选中 [A,B]', ['A', 'B'], 1],
  ])('{data, load} + %s', async (_, value, expected) => {
    const { load, counter } = createCounterLoader(() => flatRecords.map((item) => ({ ...item })));
    const wrapper = await mountSelect({
      ...flatProps,
      checkable: true,
      value,
      dataSource: { data: [], load },
    });

    expect(counter.n).toBe(expected);
    wrapper.destroy();
  });

  test('{list,total} + 多选只加载一次', async () => {
    const { load, counter } = createCounterLoader(() => ({
      list: flatRecords.map((item) => ({ ...item })),
      total: flatRecords.length,
    }));
    const wrapper = await mountSelect({
      ...flatProps,
      checkable: true,
      value: ['A', 'B'],
      dataSource: load,
    });

    expect(counter.n).toBe(1);
    expect(wrapper.vm.checkableValue).toContain('人员异常');
    expect(wrapper.vm.checkableValue).toContain('人员数量不足');
    wrapper.destroy();
  });

  test('多选空字符串视作空选', async () => {
    const { load, counter } = createCounterLoader(() => flatRecords.map((item) => ({ ...item })));
    const wrapper = await mountSelect({
      ...flatProps,
      checkable: true,
      value: '',
      dataSource: load,
    });

    expect(counter.n).toBe(0);
    wrapper.destroy();
  });

  test('parentField 整表数据源只根加载，不按 node 补加载', async () => {
    const nodeCalls = { n: 0 };
    const { load, counter } = createCounterLoader((params) => {
      if (params.node) {
        nodeCalls.n += 1;
      }
      return flatRecords.map((item) => ({ ...item }));
    });
    const wrapper = await mountSelect({
      ...flatProps,
      checkable: true,
      value: ['A', 'NOT_EXIST'],
      dataSource: load,
    });

    expect(counter.n).toBe(1);
    expect(nodeCalls.n).toBe(0);
    expect(wrapper.vm.checkableValue).toContain('人员异常');
    wrapper.destroy();
  });

  test('无 parentField 的整表数据源缺失选中值时也有限', async () => {
    const { load, counter } = createCounterLoader(() => flatRecords.map((item) => ({ ...item })));
    const wrapper = await mountSelect({
      textField: 'typeName',
      valueField: 'typeId',
      childrenField: 'children',
      checkable: true,
      value: ['A', 'NOT_EXIST'],
      dataSource: load,
    });

    expect(counter.n).toBe(4);
    expect(wrapper.vm.checkableValue).toContain('人员异常');
    wrapper.destroy();
  });
});

describe('单选行为保持不变', () => {
  test('单选扁平数据', async () => {
    const { load, counter } = createCounterLoader(() => flatRecords.map((item) => ({ ...item })));
    const wrapper = await mountSelect({
      ...flatProps,
      value: 'B',
      dataSource: load,
    });

    expect(counter.n).toBe(1);
    expect(wrapper.vm.selectedItem.text).toBe('人员数量不足');
    wrapper.destroy();
  });

  test('单选懒加载逐级回显', async () => {
    const { load, counter } = createCounterLoader(lazyLoad);
    const wrapper = await mountSelect({
      ...lazyProps,
      value: '1.1',
      initialLoad: false,
      dataSource: load,
    });

    expect(counter.n).toBe(2);
    expect(wrapper.vm.selectedItem.text).toBe('节点 1.1');
    wrapper.destroy();
  });

  test('单选懒加载打开下拉后回显不变', async () => {
    const { load, counter } = createCounterLoader(lazyLoad);
    const wrapper = await mountSelect({
      ...lazyProps,
      value: '1.1',
      opened: true,
      dataSource: load,
    });
    await sleep(100);

    expect(counter.n).toBe(5);
    expect(wrapper.vm.selectedItem.text).toBe('节点 1.1');
    wrapper.destroy();
  });
});

describe('多选懒加载选中项回显', () => {
  test('多选单个选中项', async () => {
    const { load, counter } = createCounterLoader(lazyLoad);
    const wrapper = await mountSelect({
      ...lazyProps,
      checkable: true,
      value: ['1.1'],
      dataSource: load,
    });

    expect(counter.n).toBe(2);
    expect(wrapper.vm.checkableValue).toContain('节点 1.1');
    wrapper.destroy();
  });

  test('多选跨分支选中项完整回显', async () => {
    const { load, counter } = createCounterLoader(lazyLoad);
    const wrapper = await mountSelect({
      ...lazyProps,
      checkable: true,
      value: ['1.1', '2.1'],
      dataSource: load,
    });

    // 按原 DFS 顺序：root -> 1 -> 1.1 -> 1.2 -> 2
    expect(counter.n).toBe(5);
    expect(wrapper.vm.checkableValue).toContain('节点 1.1');
    expect(wrapper.vm.checkableValue).toContain('节点 2.1');
    wrapper.destroy();
  });

  test('多选中存在数据源返回不了的项时有限且不漏已有项', async () => {
    const { load, counter } = createCounterLoader(lazyLoad);
    const wrapper = await mountSelect({
      ...lazyProps,
      checkable: true,
      value: ['1.1', 'NOT_EXIST'],
      dataSource: load,
    });

    expect(counter.n).toBe(6);
    expect(wrapper.vm.checkableValue).toContain('节点 1.1');
    wrapper.destroy();
  });

  test('多选打开下拉时完整回显且不再循环', async () => {
    const { load, counter } = createCounterLoader(lazyLoad);
    const wrapper = await mountSelect({
      ...lazyProps,
      checkable: true,
      value: ['1.1', '2.1'],
      opened: true,
      dataSource: load,
    });
    await sleep(100);

    expect(counter.n).toBeLessThanOrEqual(6);
    expect(wrapper.vm.checkableValue).toContain('节点 1.1');
    expect(wrapper.vm.checkableValue).toContain('节点 2.1');
    wrapper.destroy();
  });
});

describe('空选初始加载与事件', () => {
  async function mountClosed(value, checkable) {
    const { load, counter } = createCounterLoader(() => flatRecords.map((item) => ({ ...item })));
    const loadEvents = { n: 0 };
    const wrapper = mount(UTreeSelectNew, {
      propsData: {
        ...flatProps,
        checkable,
        value,
        dataSource: load,
      },
      listeners: {
        load: () => {
          loadEvents.n += 1;
        },
      },
    });
    await sleep(60);
    return { wrapper, counter, loadEvents };
  }

  test('单选空值挂载不加载，打开后由 tree-view 初始加载一次', async () => {
    const { wrapper, counter, loadEvents } = await mountClosed(undefined, false);
    expect(counter.n).toBe(0);
    expect(loadEvents.n).toBe(0);

    wrapper.setProps({ opened: true });
    await sleep(120);
    await wrapper.vm.$nextTick();

    expect(counter.n).toBe(1);
    expect(loadEvents.n).toBe(1);
    wrapper.destroy();
  });

  test('多选空选挂载不加载，打开后由 tree-view 初始加载一次', async () => {
    const { wrapper, counter, loadEvents } = await mountClosed([], true);
    expect(counter.n).toBe(0);
    expect(loadEvents.n).toBe(0);

    wrapper.setProps({ opened: true });
    await sleep(120);
    await wrapper.vm.$nextTick();

    expect(counter.n).toBe(1);
    expect(loadEvents.n).toBe(1);
    wrapper.destroy();
  });
});

describe('静态/混合/独立选择', () => {
  test('多选静态数据不触发请求', async () => {
    const wrapper = await mountSelect({
      ...flatProps,
      checkable: true,
      value: ['A', 'B'],
      dataSource: flatRecords.map((item) => ({ ...item })),
    });

    expect(wrapper.vm.checkableValue).toContain('人员异常');
    expect(wrapper.vm.checkableValue).toContain('人员数量不足');
    wrapper.destroy();
  });

  test('静态节点与数据源混合时选中项都回显', async () => {
    const { load, counter } = createCounterLoader(() => flatRecords.map((item) => ({ ...item })));
    const wrapper = await mountSelect({
      ...flatProps,
      checkable: true,
      value: ['A', 'jing1'],
      dataSource: load,
    }, {
      slots: {
        default: '<u-tree-view-node-new text="静态节点" value="jing1" />',
      },
    });

    expect(counter.n).toBe(1);
    expect(wrapper.vm.checkableValue).toContain('人员异常');
    expect(wrapper.vm.checkableValue).toContain('静态节点');
    wrapper.destroy();
  });

  test('父子独立选择 + 多选只加载一次', async () => {
    const { load, counter } = createCounterLoader(() => flatRecords.map((item) => ({ ...item })));
    const wrapper = await mountSelect({
      ...flatProps,
      checkable: true,
      checkControlled: true,
      value: ['A', 'B'],
      dataSource: load,
    });

    expect(counter.n).toBe(1);
    expect(wrapper.vm.checkableValue).toContain('人员异常');
    expect(wrapper.vm.checkableValue).toContain('人员数量不足');
    wrapper.destroy();
  });
});
