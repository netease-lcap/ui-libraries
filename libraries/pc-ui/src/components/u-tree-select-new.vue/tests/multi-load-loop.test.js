import { test, expect, describe } from 'vitest';
import { mount } from '@vue/test-utils';
import { UTreeSelectNew } from '../index';

const sleep = (ms) => new Promise((resolve) => {
  setTimeout(() => resolve(true), ms);
});

// 客户现场数据：3 条扁平数据，parentId 描述层级
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

function createCounterLoader(impl, maxCalls = 20) {
  const counter = { n: 0 };
  const load = async (params = {}) => {
    counter.n += 1;
    if (counter.n > maxCalls) {
      // 阻断错误实现造成的无限递归，同时让断言能失败
      return new Promise(() => {});
    }
    return impl(params, counter.n);
  };
  return { load, counter };
}

async function mountSelect(propsData) {
  const wrapper = mount(UTreeSelectNew, { propsData });
  await sleep(60);
  await wrapper.vm.$nextTick();
  return wrapper;
}

describe('多选 + 函数数据源不会形成重复请求闭环', () => {
  test.each([
    ['空选 []', []],
    ['单个选中 [A]', ['A']],
    ['多个选中 [A,B]', ['A', 'B']],
  ])('函数数据源 + %s 只加载一次', async (_, value) => {
    const { load, counter } = createCounterLoader(() => flatRecords.map((item) => ({ ...item })));
    const wrapper = await mountSelect({
      ...flatProps,
      checkable: true,
      value,
      dataSource: load,
    });

    expect(counter.n).toBe(value.length ? 1 : 0);
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
    ['空选 []', []],
    ['单个选中 [A]', ['A']],
    ['多个选中 [A,B]', ['A', 'B']],
  ])('{data, load} 数据源 + %s 只加载一次', async (_, value) => {
    const { load, counter } = createCounterLoader(() => flatRecords.map((item) => ({ ...item })));
    const wrapper = await mountSelect({
      ...flatProps,
      checkable: true,
      value,
      dataSource: { data: [], load },
    });

    expect(counter.n).toBe(value.length ? 1 : 0);
    wrapper.destroy();
  });

  test('多选空字符串视作空选，不发起补加载', async () => {
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

  test('parentField 整表数据源不会按 node 补加载，选中值缺失时也有限', async () => {
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

  test('函数数据源返回 {list} + parentField 时只加载一次', async () => {
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

  test('从空选切换到多选后仍只加载一次', async () => {
    const { load, counter } = createCounterLoader(() => flatRecords.map((item) => ({ ...item })));
    const wrapper = await mountSelect({
      ...flatProps,
      checkable: true,
      value: undefined,
      dataSource: load,
    });
    expect(counter.n).toBe(0);

    wrapper.setProps({ value: ['A', 'B'] });
    await sleep(60);
    await wrapper.vm.$nextTick();

    expect(counter.n).toBe(1);
    expect(wrapper.vm.checkableValue).toContain('人员异常');
    wrapper.destroy();
  });

  test('多选空选打开下拉只加载一次', async () => {
    const { load, counter } = createCounterLoader(() => flatRecords.map((item) => ({ ...item })));
    const wrapper = await mountSelect({
      ...flatProps,
      checkable: true,
      value: [],
      opened: true,
      dataSource: load,
    });
    await sleep(100);
    await wrapper.vm.$nextTick();

    expect(counter.n).toBe(1);
    wrapper.destroy();
  });

  test('打开下拉后仍保持有限加载', async () => {
    const { load, counter } = createCounterLoader(() => flatRecords.map((item) => ({ ...item })));
    const wrapper = await mountSelect({
      ...flatProps,
      checkable: true,
      value: ['A', 'B'],
      opened: true,
      dataSource: load,
    });
    await sleep(100);
    await wrapper.vm.$nextTick();

    expect(counter.n).toBeLessThanOrEqual(2);
    wrapper.destroy();
  });
});

describe('空选的初始加载行为', () => {
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

  test('单选空值挂载不加载，打开下拉后由 tree-view 初始加载一次', async () => {
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

  test('多选空选挂载不加载，打开下拉后由 tree-view 初始加载一次', async () => {
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

describe('懒加载与多选选中项回显的适用边界', () => {
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

  test('多选懒加载：加载祖先节点后完整回显所有选中项', async () => {
    const { load, counter } = createCounterLoader(lazyLoad);
    const wrapper = await mountSelect({
      ...lazyProps,
      checkable: true,
      value: ['1.1', '2.1'],
      dataSource: load,
    });

    expect(counter.n).toBe(3);
    expect(wrapper.vm.checkableValue).toContain('节点 1.1');
    expect(wrapper.vm.checkableValue).toContain('节点 2.1');
    wrapper.destroy();
  });

  test('多选中存在数据源永远返回不了的项时加载有限且不漏已存在项', async () => {
    const { load, counter } = createCounterLoader(lazyLoad);
    const wrapper = await mountSelect({
      ...lazyProps,
      checkable: true,
      value: ['1.1', 'NOT_EXIST'],
      dataSource: load,
    });

    // 数据源中不存在的选中值无法被证明不存在，最多把已知节点各加载一次（root + 5 个节点）
    expect(counter.n).toBe(6);
    expect(wrapper.vm.checkableValue).toContain('节点 1.1');
    wrapper.destroy();
  });

  test('单选懒加载行为保持不变', async () => {
    const { load, counter } = createCounterLoader(lazyLoad);
    const wrapper = await mountSelect({
      ...lazyProps,
      value: '1.1',
      initialLoad: false,
      dataSource: load,
    });

    expect(counter.n).toBe(2);
    expect(wrapper.vm.selectedItem).toBeTruthy();
    expect(wrapper.vm.selectedItem.text).toBe('节点 1.1');
    wrapper.destroy();
  });

  test('单选扁平数据行为保持不变', async () => {
    const { load, counter } = createCounterLoader(() => flatRecords.map((item) => ({ ...item })));
    const wrapper = await mountSelect({
      ...flatProps,
      value: 'B',
      dataSource: load,
    });

    expect(counter.n).toBe(1);
    expect(wrapper.vm.selectedItem).toBeTruthy();
    expect(wrapper.vm.selectedItem.text).toBe('人员数量不足');
    wrapper.destroy();
  });
});

describe('加载状态的重置与重试', () => {
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
      return [{ text: '节点 1.1', value: '1.1' }];
    }
    if (params.node.value === '2') {
      return [{ text: '节点 2.1', value: '2.1' }];
    }
    return [];
  }

  test('节点加载失败后下一次触发仍会重试，不会永久跳过', async () => {
    let nodeAttempts = 0;
    const load = async (params) => {
      if (!params.node) {
        return [{ text: '节点 1', value: '1' }];
      }
      nodeAttempts += 1;
      if (nodeAttempts === 1) {
        throw new Error('network error');
      }
      return [{ text: '节点 1.1', value: '1.1' }];
    };
    const wrapper = await mountSelect({
      ...lazyProps,
      value: '1.1',
      initialLoad: false,
      dataSource: load,
    });

    expect(nodeAttempts).toBe(1);
    expect(wrapper.vm.selectedItem).toBeFalsy();

    wrapper.vm.loadUntilSelectedItem();
    await sleep(60);
    await wrapper.vm.$nextTick();

    expect(nodeAttempts).toBe(2);
    expect(wrapper.vm.selectedItem).toBeTruthy();
    expect(wrapper.vm.selectedItem.text).toBe('节点 1.1');
    wrapper.destroy();
  });

  test('根加载失败后下一次触发仍会重试', async () => {
    let rootAttempts = 0;
    const load = async (params) => {
      if (!params.node) {
        rootAttempts += 1;
        if (rootAttempts === 1) {
          throw new Error('network error');
        }
        return flatRecords.map((item) => ({ ...item }));
      }
      return [];
    };
    const wrapper = await mountSelect({
      ...flatProps,
      checkable: true,
      value: ['A', 'B'],
      dataSource: load,
    });

    expect(rootAttempts).toBe(1);
    expect(wrapper.vm.checkableValue).not.toContain('人员异常');

    wrapper.vm.loadUntilSelectedItem();
    await sleep(60);
    await wrapper.vm.$nextTick();

    expect(rootAttempts).toBe(2);
    expect(wrapper.vm.checkableValue).toContain('人员异常');
    wrapper.destroy();
  });

  test('数据源引用切换后重置状态并使用新数据源', async () => {
    let resolveOld;
    const oldLoad = () => new Promise((resolve) => {
      resolveOld = resolve;
    });
    const { load: newLoad, counter: newCounter } = createCounterLoader(
      () => flatRecords.map((item) => ({ ...item })),
    );
    const wrapper = await mountSelect({
      ...flatProps,
      checkable: true,
      value: ['A', 'B'],
      dataSource: oldLoad,
    });

    expect(resolveOld).toBeTypeOf('function');
    wrapper.setProps({ dataSource: newLoad });
    await sleep(80);
    await wrapper.vm.$nextTick();

    expect(newCounter.n).toBe(1);
    expect(wrapper.vm.checkableValue).toContain('人员异常');
    expect(wrapper.vm.checkableValue).toContain('人员数量不足');

    resolveOld([{ typeId: 'STALE', typeName: '旧数据', parentId: '' }]);
    await sleep(40);

    expect(wrapper.vm.checkableValue).toContain('人员异常');
    expect(wrapper.vm.checkableValue).not.toContain('旧数据');
    wrapper.destroy();
  });

  test('切到初始数据为空的新数据源时清掉旧回显并重新加载', async () => {
    const { load: oldLoad, counter: oldCounter } = createCounterLoader(
      () => flatRecords.map((item) => ({ ...item })),
    );
    const wrapper = await mountSelect({
      ...flatProps,
      checkable: true,
      value: ['A', 'B'],
      dataSource: oldLoad,
    });
    expect(oldCounter.n).toBe(1);
    expect(wrapper.vm.checkableValue).toContain('人员异常');

    let resolveNew;
    let newCalls = 0;
    const newLoad = () => {
      newCalls += 1;
      return new Promise((resolve) => {
        resolveNew = resolve;
      });
    };
    wrapper.setProps({ dataSource: newLoad });
    await sleep(40);
    await wrapper.vm.$nextTick();

    expect(newCalls).toBe(1);
    expect(wrapper.vm.checkableValue).not.toContain('人员异常');

    resolveNew(flatRecords.map((item) => ({ ...item })));
    await sleep(40);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.checkableValue).toContain('人员异常');
    expect(oldCounter.n).toBe(1);
    wrapper.destroy();
  });

  test('重载结果为空时清掉旧回显且不继续请求', async () => {
    let calls = 0;
    const load = async () => {
      calls += 1;
      return calls === 1 ? flatRecords.map((item) => ({ ...item })) : [];
    };
    const wrapper = await mountSelect({
      ...flatProps,
      checkable: true,
      value: ['A'],
      dataSource: load,
    });
    expect(calls).toBe(1);
    expect(wrapper.vm.checkableValue).toContain('人员异常');

    wrapper.vm.reload();
    await sleep(60);
    await wrapper.vm.$nextTick();

    expect(calls).toBe(2);
    expect(wrapper.vm.checkableValue).not.toContain('人员异常');
    wrapper.destroy();
  });

  test('请求进行中 reload 会发起新请求且旧结果不覆盖', async () => {
    const respawn = [];
    let calls = 0;
    const load = () => {
      calls += 1;
      return new Promise((resolve) => {
        respawn.push(resolve);
      });
    };
    const wrapper = await mountSelect({
      ...flatProps,
      checkable: true,
      value: ['A'],
      dataSource: load,
    });
    expect(calls).toBe(1);

    wrapper.vm.reload();
    await sleep(40);
    expect(calls).toBe(2);

    respawn[0]([{ typeId: 'STALE', typeName: '旧数据', parentId: '' }]);
    await sleep(40);
    expect(wrapper.vm.checkableValue).not.toContain('旧数据');

    respawn[1](flatRecords.map((item) => ({ ...item })));
    await sleep(40);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.checkableValue).toContain('人员异常');
    wrapper.destroy();
  });

  test('reload 后重置尝试集合并重新解析选中项', async () => {
    const { load, counter } = createCounterLoader(lazyLoad);
    const wrapper = await mountSelect({
      ...lazyProps,
      value: '1.1',
      initialLoad: false,
      dataSource: load,
    });

    expect(counter.n).toBe(2);
    wrapper.vm.reload();
    await sleep(80);
    await wrapper.vm.$nextTick();

    expect(counter.n).toBe(4);
    expect(wrapper.vm.selectedItem).toBeTruthy();
    expect(wrapper.vm.selectedItem.text).toBe('节点 1.1');
    wrapper.destroy();
  });

  test('选中值变化后重置状态并能加载新选中项', async () => {
    const { load, counter } = createCounterLoader(lazyLoad);
    const wrapper = await mountSelect({
      ...lazyProps,
      value: '1.1',
      initialLoad: false,
      dataSource: load,
    });

    expect(counter.n).toBe(2);
    wrapper.setProps({ value: '2.1' });
    await sleep(80);
    await wrapper.vm.$nextTick();

    expect(counter.n).toBe(3);
    expect(wrapper.vm.selectedItem).toBeTruthy();
    expect(wrapper.vm.selectedItem.text).toBe('节点 2.1');
    wrapper.destroy();
  });
});

describe('动静结合兼容性', () => {
  test('静态节点与数据源混合时选中项回显不被清掉', async () => {
    const { load, counter } = createCounterLoader(() => flatRecords.map((item) => ({ ...item })));
    const wrapper = mount(UTreeSelectNew, {
      propsData: {
        ...flatProps,
        checkable: true,
        value: ['A', 'jing1'],
        dataSource: load,
      },
      slots: {
        default: '<u-tree-view-node-new text="静态节点" value="jing1" />',
      },
    });
    await sleep(60);
    await wrapper.vm.$nextTick();

    expect(counter.n).toBe(1);
    expect(wrapper.vm.checkableValue).toContain('人员异常');
    expect(wrapper.vm.checkableValue).toContain('静态节点');
    wrapper.destroy();
  });
});

describe('父子节点独立选择', () => {
  test.each([
    ['空选 []', []],
    ['父子同时选中 [A,B]', ['A', 'B']],
  ])('独立选择 + %s 只加载一次', async (_, value) => {
    const { load, counter } = createCounterLoader(() => flatRecords.map((item) => ({ ...item })));
    const wrapper = await mountSelect({
      ...flatProps,
      checkable: true,
      checkControlled: true,
      value,
      dataSource: load,
    });

    expect(counter.n).toBe(value.length ? 1 : 0);
    if (value.length) {
      expect(wrapper.vm.checkableValue).toContain('人员异常');
      expect(wrapper.vm.checkableValue).toContain('人员数量不足');
    }
    wrapper.destroy();
  });

  test('父子同时选中但数据源缺子项时不会漏父项回显', async () => {
    const { load, counter } = createCounterLoader(() => flatRecords.map((item) => ({ ...item })));
    const wrapper = await mountSelect({
      ...flatProps,
      checkable: true,
      checkControlled: true,
      value: ['A', 'NOT_EXIST'],
      dataSource: load,
    });

    expect(counter.n).toBe(1);
    expect(wrapper.vm.checkableValue).toContain('人员异常');
    wrapper.destroy();
  });
});
