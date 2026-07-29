import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHooks } from '@ep-test/test-utils/render-hook';
import { $deletePropsList } from '@/plugins/constants';
import '@/utils/index';
import ElTreeBasicAccumulate from '../plugins/basic-plugins';

describe('el-tree 插件集成测试', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('第一部分：插件链式执行测试', () => {
    it('应该按顺序执行所有插件并合并状态', async () => {
      const plugins = ElTreeBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        dataSource: [
          { label: 'Node 1', value: 'n1', parent: null },
          { label: 'Node 1-1', value: 'n1-1', parent: 'n1' },
          { label: 'Node 2', value: 'n2', parent: null },
        ],
        textField: 'label',
        valueField: 'value',
        parentField: 'parent',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      const result = currentValue.value;

      expect(result).toBeDefined();
      expect(result.data).toBeDefined();
      expect(result.nodeKey).toBe('value');
      expect(result.ref).toBeDefined();
    });

    it('应该正确处理空 props 的情况', async () => {
      const plugins = ElTreeBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result).toBeDefined();
    });
  });

  describe('第二部分：数据源处理完整测试', () => {
    it('应该正确处理平铺数据源并转换为树形结构', async () => {
      const plugins = ElTreeBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const flatDataSource = [
        { label: 'Root 1', value: 'r1', parent: null },
        { label: 'Child 1-1', value: 'r1-c1', parent: 'r1' },
        { label: 'Child 1-2', value: 'r1-c2', parent: 'r1' },
        { label: 'Root 2', value: 'r2', parent: null },
        { label: 'Child 2-1', value: 'r2-c1', parent: 'r2' },
      ];
      const props = {
        dataSource: flatDataSource,
        textField: 'label',
        valueField: 'value',
        parentField: 'parent',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      const result = currentValue.value;

      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toBeGreaterThan(0);
    });

    it('应该正确处理异步数据源', async () => {
      const plugins = ElTreeBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const asyncDataSource = vi.fn().mockResolvedValue([
        { label: 'Async Root', value: 'ar', parent: null },
        { label: 'Async Child', value: 'ar-c', parent: 'ar' },
      ]);
      const props = {
        dataSource: asyncDataSource,
        textField: 'label',
        valueField: 'value',
        parentField: 'parent',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(asyncDataSource).toHaveBeenCalled();
      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.loading).toBeDefined();
    });

    it('应该正确处理自定义字段映射', async () => {
      const plugins = ElTreeBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { title: 'Item 1', id: 'i1', pid: null },
        { title: 'Item 1-1', id: 'i1-1', pid: 'i1' },
      ];
      const props = {
        dataSource,
        textField: 'title',
        valueField: 'id',
        parentField: 'pid',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
    });

    it('应该正确设置 ref.reload 和 ref.data', async () => {
      const plugins = ElTreeBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [{ label: 'Test Node', value: 'test', parent: null }];
      const props = {
        dataSource,
        parentField: 'parent',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.ref).toBeDefined();
      expect(currentValue.value.ref.reload).toBeDefined();
      expect(typeof currentValue.value.ref.reload).toBe('function');
      expect(currentValue.value.ref.data).toBeDefined();
    });

    it('应该正确处理 parentField 为 null 的情况', async () => {
      const plugins = ElTreeBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
      ];
      const props = {
        dataSource,
        parentField: null,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
    });

    it('应该正确处理空数据源', async () => {
      const testCases = [{ dataSource: null }, { dataSource: undefined }, { dataSource: [] }];

      testCases.forEach(async (testCase) => {
        const plugins = ElTreeBasicAccumulate.getPluginMethod({ isInDesigner: false });
        const props = {
          ...testCase,
          slots: {},
          ref: {},
          [$deletePropsList]: [],
        };

        const { currentValue } = await renderHooks(plugins, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
      });
    });

    it('应该正确处理自定义 item slot', async () => {
      const plugins = ElTreeBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [{ label: 'Node A', value: 'a', parent: null }];
      const itemSlot = vi.fn(({ item }) => `Custom: ${item.label}`);
      const props = {
        dataSource,
        parentField: 'parent',
        slots: {
          item: itemSlot,
        },
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.slots.default).toBeDefined();
    });
  });

  describe('第三部分：virtualize 处理测试', () => {
    it('应该在 virtualize=true 时使用 ElTreeV2', async () => {
      const plugins = ElTreeBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Node 1', value: 'n1', parent: null },
        { label: 'Node 2', value: 'n2', parent: null },
      ];
      const props = {
        dataSource,
        virtualize: true,
        parentField: 'parent',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.render).toBeDefined();
    });

    it('应该在 virtualize=false 时不使用自定义 render', async () => {
      const plugins = ElTreeBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [{ label: 'Test', value: 'test', parent: null }];
      const props = {
        dataSource,
        virtualize: false,
        parentField: 'parent',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.render).toBeUndefined();
    });
  });

  describe('第四部分：受控值处理测试（单选模式）', () => {
    it('应该正确处理单选模式的受控值', async () => {
      const plugins = ElTreeBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Node A', value: 'a', parent: null },
        { label: 'Node B', value: 'b', parent: null },
      ];
      const props = {
        dataSource,
        value: 'a',
        showCheckbox: false,
        parentField: 'parent',
        slots: {},
        ref: {
          setCurrentKey: vi.fn(),
        },
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.onNodeClick).toBeDefined();
    });

    it('应该在单选模式下正确处理 onNodeClick', async () => {
      const plugins = ElTreeBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onNodeClick = vi.fn();
      const dataSource = [{ label: 'Node', value: 'n', parent: null }];
      const props = {
        dataSource,
        showCheckbox: false,
        onNodeClick,
        parentField: 'parent',
        slots: {},
        ref: {
          setCurrentKey: vi.fn(),
        },
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.onNodeClick).toBeDefined();
      expect(typeof currentValue.value.onNodeClick).toBe('function');
    });
  });

  describe('第五部分：受控值处理测试（多选模式）', () => {
    it('应该正确处理多选模式的受控值', async () => {
      const plugins = ElTreeBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Node A', value: 'a', parent: null },
        { label: 'Node B', value: 'b', parent: null },
      ];
      const props = {
        dataSource,
        value: ['a', 'b'],
        showCheckbox: true,
        parentField: 'parent',
        slots: {},
        ref: {
          setCheckedKeys: vi.fn(),
        },
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.onCheck).toBeDefined();
    });

    it('应该在多选模式下正确处理 onCheck', async () => {
      const plugins = ElTreeBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onCheck = vi.fn();
      const dataSource = [{ label: 'Node', value: 'n', parent: null }];
      const props = {
        dataSource,
        showCheckbox: true,
        onCheck,
        parentField: 'parent',
        slots: {},
        ref: {
          setCheckedKeys: vi.fn(),
        },
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.onCheck).toBeDefined();
      expect(typeof currentValue.value.onCheck).toBe('function');
    });
  });

  describe('第六部分：插件交叉组合测试', () => {
    it('交叉组合：dataSource + virtualize + 单选', async () => {
      const plugins = ElTreeBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Node 1', value: 'n1', parent: null },
        { label: 'Node 1-1', value: 'n1-1', parent: 'n1' },
      ];
      const props = {
        dataSource,
        virtualize: true,
        value: 'n1',
        showCheckbox: false,
        parentField: 'parent',
        slots: {},
        ref: {
          setCurrentKey: vi.fn(),
        },
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.render).toBeDefined();
      expect(currentValue.value.onNodeClick).toBeDefined();
    });

    it('交叉组合：异步数据源 + 多选 + 自定义字段', async () => {
      const plugins = ElTreeBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const asyncDataSource = vi.fn().mockResolvedValue([
        { name: 'Async A', id: 'aa', pid: null },
        { name: 'Async B', id: 'ab', pid: 'aa' },
      ]);
      const props = {
        dataSource: asyncDataSource,
        textField: 'name',
        valueField: 'id',
        parentField: 'pid',
        showCheckbox: true,
        value: ['aa', 'ab'],
        slots: {},
        ref: {
          setCheckedKeys: vi.fn(),
        },
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(asyncDataSource).toHaveBeenCalled();
      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.onCheck).toBeDefined();
    });

    it('交叉组合：virtualize + 多选 + item slot', async () => {
      const plugins = ElTreeBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Node 1', value: 'n1', parent: null },
        { label: 'Node 2', value: 'n2', parent: null },
      ];
      const itemSlot = vi.fn(({ item }) => `🌲 ${item.label}`);
      const props = {
        dataSource,
        virtualize: true,
        showCheckbox: true,
        value: ['n1'],
        parentField: 'parent',
        slots: {
          item: itemSlot,
        },
        ref: {
          setCheckedKeys: vi.fn(),
        },
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.render).toBeDefined();
      expect(currentValue.value.slots.default).toBeDefined();
    });
  });

  describe('第七部分：边界和异常测试', () => {
    it('边界测试：深层嵌套的树形数据', async () => {
      const plugins = ElTreeBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const deepData = [
        { label: 'L1', value: 'l1', parent: null },
        { label: 'L2', value: 'l2', parent: 'l1' },
        { label: 'L3', value: 'l3', parent: 'l2' },
        { label: 'L4', value: 'l4', parent: 'l3' },
        { label: 'L5', value: 'l5', parent: 'l4' },
      ];
      const props = {
        dataSource: deepData,
        parentField: 'parent',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
    });

    it('边界测试：大量节点', async () => {
      const plugins = ElTreeBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const largeDataSource = Array.from({ length: 500 }, (_, i) => ({
        label: `Node ${i}`,
        value: `node-${i}`,
        parent: i > 0 ? `node-${Math.floor(i / 2)}` : null,
      }));
      const props = {
        dataSource: largeDataSource,
        parentField: 'parent',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
    });

    it('边界测试：空选择值', async () => {
      const plugins = ElTreeBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [{ label: 'Test', value: 'test', parent: null }];
      const emptyValues = [null, undefined, '', []];

      for (const emptyValue of emptyValues) {
        const props = {
          dataSource,
          value: emptyValue,
          parentField: 'parent',
          slots: {},
          ref: {
            setCurrentKey: vi.fn(),
            setCheckedKeys: vi.fn(),
          },
          [$deletePropsList]: [],
        };

        const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

        await waitForNextUpdate();

        expect(currentValue.value.data).toBeDefined();
      }
    });
  });

  describe('第八部分：props 更新响应式测试（使用 setValue）', () => {
    it('响应式测试：使用 setValue 更新 dataSource', async () => {
      const plugins = ElTreeBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const initialData = [{ label: 'Old Node', value: 'old', parent: null }];
      const props = {
        dataSource: initialData,
        parentField: 'parent',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();

      const newData = [
        { label: 'New Root', value: 'new-root', parent: null },
        { label: 'New Child', value: 'new-child', parent: 'new-root' },
      ];
      await setValue({ dataSource: newData });

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
    });

    it('响应式测试：使用 setValue 更新 value（不需要 waitForNextUpdate）', async () => {
      const plugins = ElTreeBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Node A', value: 'a', parent: null },
        { label: 'Node B', value: 'b', parent: null },
        { label: 'Node C', value: 'c', parent: null },
      ];
      const props = {
        dataSource,
        value: 'a',
        showCheckbox: false,
        parentField: 'parent',
        slots: {},
        ref: {
          setCurrentKey: vi.fn(),
        },
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      await setValue({ value: 'b' });

      await setValue({ value: 'c' });
    });

    it('响应式测试：使用 setValue 切换 virtualize', async () => {
      const plugins = ElTreeBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [{ label: 'Test', value: 'test', parent: null }];
      const props = {
        dataSource,
        virtualize: false,
        parentField: 'parent',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.render).toBeUndefined();

      await setValue({ virtualize: true });

      expect(currentValue.value.render).toBeDefined();
    });

    it('响应式测试：使用 setValue 切换 showCheckbox', async () => {
      const plugins = ElTreeBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [{ label: 'Node', value: 'n', parent: null }];
      const props = {
        dataSource,
        showCheckbox: false,
        value: 'n',
        parentField: 'parent',
        slots: {},
        ref: {
          setCurrentKey: vi.fn(),
          setCheckedKeys: vi.fn(),
        },
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.onNodeClick).toBeDefined();

      await setValue({ showCheckbox: true, value: ['n'] });

      expect(currentValue.value.onCheck).toBeDefined();
    });

    it('响应式测试：使用 setValue 更新字段映射', async () => {
      const plugins = ElTreeBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [{ label: 'Item', name: 'Name', value: 'val', id: 'i', parent: null, pid: null }];
      const props = {
        dataSource,
        textField: 'label',
        valueField: 'value',
        parentField: 'parent',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      await setValue({ textField: 'name', valueField: 'id', parentField: 'pid' });

      expect(currentValue.value.data).toBeDefined();
    });

    it('响应式测试：使用 setValue 同时更新多个属性', async () => {
      const plugins = ElTreeBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const initialData = [{ label: 'Old', value: 'old', parent: null }];
      const props = {
        dataSource: initialData,
        virtualize: false,
        showCheckbox: false,
        parentField: 'parent',
        slots: {},
        ref: {
          setCurrentKey: vi.fn(),
          setCheckedKeys: vi.fn(),
        },
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      const newData = [
        { label: 'New', value: 'new', parent: null },
        { label: 'New Child', value: 'new-child', parent: 'new' },
      ];

      await setValue({
        dataSource: newData,
        virtualize: true,
        showCheckbox: true,
        value: ['new'],
      });

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.render).toBeDefined();
      expect(currentValue.value.onCheck).toBeDefined();
    });
  });

  describe('第九部分：完整流程集成测试', () => {
    it('完整流程：异步加载 → 树形转换 → 虚拟化 → 多选', async () => {
      const plugins = ElTreeBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const asyncDataSource = vi.fn().mockResolvedValue([
        { label: 'Department', value: 'dept', parent: null },
        { label: 'Team A', value: 'team-a', parent: 'dept' },
        { label: 'Member 1', value: 'member-1', parent: 'team-a' },
        { label: 'Team B', value: 'team-b', parent: 'dept' },
      ]);

      const props = {
        dataSource: asyncDataSource,
        virtualize: true,
        showCheckbox: true,
        value: ['member-1', 'team-b'],
        parentField: 'parent',
        slots: {},
        ref: {
          setCheckedKeys: vi.fn(),
        },
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(asyncDataSource).toHaveBeenCalled();
      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.render).toBeDefined();
      expect(currentValue.value.onCheck).toBeDefined();
    });

    it('完整流程：字段映射 + item slot + 单选', async () => {
      const plugins = ElTreeBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { name: 'Category A', id: 'ca', pid: null },
        { name: 'Item A-1', id: 'ca-1', pid: 'ca' },
        { name: 'Category B', id: 'cb', pid: null },
      ];
      const itemSlot = vi.fn(({ item }) => `📁 ${item.label}`);
      const props = {
        dataSource,
        textField: 'name',
        valueField: 'id',
        parentField: 'pid',
        showCheckbox: false,
        value: 'ca-1',
        slots: {
          item: itemSlot,
        },
        ref: {
          setCurrentKey: vi.fn(),
        },
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.slots.default).toBeDefined();
      expect(currentValue.value.onNodeClick).toBeDefined();
    });
  });
});
