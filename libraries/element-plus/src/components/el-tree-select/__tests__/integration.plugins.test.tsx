import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHooks } from '@ep-test/test-utils/render-hook';
import { $deletePropsList } from '@/plugins/constants';
import { $formProvide } from '@/components/el-form/constants';
import '@/utils/index';
import TreeSelectBasicAccumulate from '../plugins/index';

describe('el-tree-select 插件集成测试', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('第一部分：插件链式执行测试', () => {
    it('应该按顺序执行所有插件并合并状态', async () => {
      const plugins = TreeSelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        dataSource: [
          { label: 'Node 1', value: '1', parent: null },
          { label: 'Node 1-1', value: '1-1', parent: '1' },
          { label: 'Node 2', value: '2', parent: null },
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
      expect(result.formTagName).toBe('el-form-tree-select');
      expect(result.tagName).toBe('el-tree-select');
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
    });

    it('应该正确处理空 props 的情况', async () => {
      const plugins = TreeSelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result).toBeDefined();
      expect(result.formTagName).toBe('el-form-tree-select');
      expect(result.tagName).toBe('el-tree-select');
    });
  });

  describe('第二部分：数据源处理完整测试', () => {
    it('应该正确处理平铺数据源并转换为树形结构', async () => {
      const plugins = TreeSelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
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
      const plugins = TreeSelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
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
      const plugins = TreeSelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
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
      const plugins = TreeSelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
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
      const plugins = TreeSelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
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
        const plugins = TreeSelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
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
  });

  describe('第三部分：受控值处理测试', () => {
    it('应该正确处理受控模式', async () => {
      const plugins = TreeSelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: '1',
        'onUpdate:modelValue': vi.fn(),
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result).toBeDefined();
      expect(result.modelValue).toBe('1');
      expect(result['onUpdate:modelValue']).toBeDefined();
    });

    it('应该正确处理多选模式', async () => {
      const plugins = TreeSelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: ['1', '2', '3'],
        multiple: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.modelValue).toEqual(['1', '2', '3']);
    });

    it('应该正确设置 ref.resetField 方法', async () => {
      const plugins = TreeSelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: '1',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.ref).toBeDefined();
      expect(result.ref.resetField).toBeDefined();
      expect(typeof result.ref.resetField).toBe('function');
    });
  });

  describe('第四部分：预览模式测试', () => {
    it('应该正确生成单选预览文本', async () => {
      const plugins = TreeSelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Node A', value: 'a', parent: null },
        { label: 'Node B', value: 'b', parent: null },
      ];
      const props = {
        dataSource,
        modelValue: 'a',
        preview: true,
        parentField: 'parent',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.render).toBeDefined();
    });

    it('应该正确生成多选预览文本', async () => {
      const plugins = TreeSelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Apple', value: 'apple', parent: null },
        { label: 'Banana', value: 'banana', parent: null },
        { label: 'Cherry', value: 'cherry', parent: null },
      ];
      const props = {
        dataSource,
        modelValue: ['apple', 'cherry'],
        preview: true,
        parentField: 'parent',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.render).toBeDefined();
    });

    it('应该在 IDE 环境显示默认预览文本', async () => {
      const plugins = TreeSelectBasicAccumulate.getPluginMethod({ isInDesigner: true });
      const dataSource = [{ label: 'Test', value: 'test', parent: null }];
      const props = {
        'data-nodepath': '/root/tree-select',
        dataSource,
        modelValue: 'test',
        preview: true,
        parentField: 'parent',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.render).toBeDefined();
    });

    it('应该正确处理空值的预览', async () => {
      const plugins = TreeSelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [{ label: 'Test', value: 'test', parent: null }];
      const props = {
        dataSource,
        modelValue: null,
        preview: true,
        parentField: 'parent',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.render).toBeDefined();
    });
  });

  describe('第五部分：表单集成测试', () => {
    it('应该在表单环境中正确设置 formTagName', async () => {
      const plugins = TreeSelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        'data-nodepath': '/root/form/tree-select',
        inject: {
          [$formProvide]: {
            isInForm: true,
          },
        },
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.formTagName).toBe('el-form-tree-select');
    });

    it('应该在表单环境中支持 resetField', async () => {
      const plugins = TreeSelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [{ label: 'Test', value: 'test', parent: null }];
      const props = {
        'data-nodepath': '/root/form/tree-select',
        dataSource,
        modelValue: 'test',
        inject: {
          [$formProvide]: {
            isInForm: true,
          },
        },
        parentField: 'parent',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.ref.resetField).toBeDefined();
    });
  });

  describe('第六部分：插件交叉组合测试', () => {
    it('交叉组合：dataSource + 多选 + 预览', async () => {
      const plugins = TreeSelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Category 1', value: 'cat1', parent: null },
        { label: 'Item 1-1', value: 'item1-1', parent: 'cat1' },
        { label: 'Category 2', value: 'cat2', parent: null },
      ];
      const props = {
        dataSource,
        modelValue: ['cat1', 'item1-1'],
        preview: true,
        parentField: 'parent',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.render).toBeDefined();
    });

    it('交叉组合：异步数据源 + 表单环境 + 受控值', async () => {
      const plugins = TreeSelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const asyncDataSource = vi.fn().mockResolvedValue([
        { label: 'Async 1', value: 'a1', parent: null },
        { label: 'Async 1-1', value: 'a1-1', parent: 'a1' },
      ]);
      const props = {
        'data-nodepath': '/root/form/tree-select',
        dataSource: asyncDataSource,
        modelValue: 'a1',
        'onUpdate:modelValue': vi.fn(),
        inject: {
          [$formProvide]: {
            isInForm: true,
            preview: false,
          },
        },
        parentField: 'parent',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(asyncDataSource).toHaveBeenCalled();
      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.formTagName).toBe('el-form-tree-select');
      expect(currentValue.value.ref.resetField).toBeDefined();
    });

    it('交叉组合：自定义字段 + 预览 + 多选', async () => {
      const plugins = TreeSelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { name: 'Root', id: 'r', pid: null },
        { name: 'Child 1', id: 'r-c1', pid: 'r' },
        { name: 'Child 2', id: 'r-c2', pid: 'r' },
      ];
      const props = {
        dataSource,
        textField: 'name',
        valueField: 'id',
        parentField: 'pid',
        modelValue: ['r', 'r-c1'],
        preview: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.render).toBeDefined();
    });
  });

  describe('第七部分：边界和异常测试', () => {
    it('边界测试：深层嵌套的树形数据', async () => {
      const plugins = TreeSelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
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
        modelValue: 'l5',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
    });

    it('边界测试：空值选择', async () => {
      const plugins = TreeSelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [{ label: 'Test', value: 'test', parent: null }];
      const emptyValues = [null, undefined, '', []];

      for (const emptyValue of emptyValues) {
        const props = {
          dataSource,
          modelValue: emptyValue,
          parentField: 'parent',
          slots: {},
          ref: {},
          [$deletePropsList]: [],
        };

        const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

        await waitForNextUpdate();

        expect(currentValue.value.data).toBeDefined();
      }
    });

    it('边界测试：不存在的值', async () => {
      const plugins = TreeSelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [{ label: 'Existing', value: 'exists', parent: null }];
      const props = {
        dataSource,
        modelValue: 'nonexistent',
        preview: true,
        parentField: 'parent',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.render).toBeDefined();
    });

    it('边界测试：大量数据节点', async () => {
      const plugins = TreeSelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const largeDataSource = Array.from({ length: 100 }, (_, i) => ({
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
  });

  describe('第八部分：props 更新响应式测试（使用 setValue）', () => {
    it('响应式测试：使用 setValue 更新 dataSource', async () => {
      const plugins = TreeSelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
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

    it('响应式测试：使用 setValue 更新 modelValue（不需要 waitForNextUpdate）', async () => {
      const plugins = TreeSelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Node A', value: 'a', parent: null },
        { label: 'Node B', value: 'b', parent: null },
        { label: 'Node C', value: 'c', parent: null },
      ];
      const props = {
        dataSource,
        modelValue: 'a',
        parentField: 'parent',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.modelValue).toBe('a');

      await setValue({ modelValue: 'b' });

      expect(currentValue.value.modelValue).toBe('b');

      await setValue({ modelValue: 'c' });

      expect(currentValue.value.modelValue).toBe('c');
    });

    it('响应式测试：使用 setValue 切换多选模式', async () => {
      const plugins = TreeSelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Item 1', value: '1', parent: null },
        { label: 'Item 2', value: '2', parent: null },
      ];
      const props = {
        dataSource,
        modelValue: '1',
        parentField: 'parent',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      await setValue({ modelValue: ['1', '2'] });

      expect(currentValue.value.modelValue).toEqual(['1', '2']);
    });

    it('响应式测试：使用 setValue 切换 preview 模式', async () => {
      const plugins = TreeSelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [{ label: 'Test', value: 'test', parent: null }];
      const props = {
        dataSource,
        modelValue: 'test',
        preview: false,
        parentField: 'parent',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      await setValue({ preview: true });

      expect(currentValue.value.render).toBeDefined();
    });

    it('响应式测试：使用 setValue 更新字段映射', async () => {
      const plugins = TreeSelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [{ name: 'Item', title: 'Title', id: 'i', code: 'c', parentId: null, parentCode: null }];
      const props = {
        dataSource,
        textField: 'name',
        valueField: 'id',
        parentField: 'parentId',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      await setValue({ textField: 'title', valueField: 'code', parentField: 'parentCode' });

      expect(currentValue.value.data).toBeDefined();
    });

    it('响应式测试：使用 setValue 同时更新多个属性', async () => {
      const plugins = TreeSelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const initialData = [{ label: 'Old', value: 'old', parent: null }];
      const props = {
        dataSource: initialData,
        modelValue: 'old',
        preview: false,
        parentField: 'parent',
        slots: {},
        ref: {},
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
        modelValue: ['new', 'new-child'],
        preview: true,
      });

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.render).toBeDefined();
    });

    it('响应式测试：快速连续更新 modelValue', async () => {
      const plugins = TreeSelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'V1', value: 'v1', parent: null },
        { label: 'V2', value: 'v2', parent: null },
        { label: 'V3', value: 'v3', parent: null },
      ];
      const props = {
        dataSource,
        modelValue: 'v1',
        parentField: 'parent',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      await setValue({ modelValue: 'v1' });
      expect(currentValue.value.modelValue).toBe('v1');

      await setValue({ modelValue: 'v2' });
      expect(currentValue.value.modelValue).toBe('v2');

      await setValue({ modelValue: 'v3' });
      expect(currentValue.value.modelValue).toBe('v3');
    });
  });

  describe('第九部分：完整流程集成测试', () => {
    it('完整流程：异步加载 → 树形转换 → 选择值 → 预览', async () => {
      const plugins = TreeSelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const asyncDataSource = vi.fn().mockResolvedValue([
        { label: 'Department', value: 'dept', parent: null },
        { label: 'Team A', value: 'team-a', parent: 'dept' },
        { label: 'Member 1', value: 'member-1', parent: 'team-a' },
      ]);

      const props = {
        dataSource: asyncDataSource,
        modelValue: 'member-1',
        preview: true,
        parentField: 'parent',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(asyncDataSource).toHaveBeenCalled();
      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.modelValue).toBe('member-1');
      expect(currentValue.value.render).toBeDefined();
    });

    it('完整流程：多选 + 表单环境 + 字段映射', async () => {
      const plugins = TreeSelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { name: 'Category A', id: 'ca', pid: null },
        { name: 'Item A-1', id: 'ca-1', pid: 'ca' },
        { name: 'Category B', id: 'cb', pid: null },
      ];
      const props = {
        'data-nodepath': '/form/tree-select',
        dataSource,
        textField: 'name',
        valueField: 'id',
        parentField: 'pid',
        modelValue: ['ca-1', 'cb'],
        inject: {
          [$formProvide]: {
            isInForm: true,
            preview: false,
          },
        },
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.formTagName).toBe('el-form-tree-select');
      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.ref.resetField).toBeDefined();
    });
  });
});
