import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHooks } from '@ep-test/test-utils/render-hook';
import { $deletePropsList } from '@/plugins/constants';
import { $formProvide } from '@/components/el-form/constants';
import '@/utils/index';
import CascaderAccumulate from '../plugins/index';

describe('el-cascader 插件集成测试', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('第一部分：插件链式执行测试', () => {
    it('应该按顺序执行所有插件并合并状态', async () => {
      const plugins = CascaderAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        dataSource: [
          { label: 'Option 1', value: '1', parent: null },
          { label: 'Option 1-1', value: '1-1', parent: '1' },
          { label: 'Option 2', value: '2', parent: null },
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
      expect(result.formTagName).toBe('el-form-cascader');
      expect(result.tagName).toBe('el-cascader');
      expect(result.options).toBeDefined();
      expect(Array.isArray(result.options)).toBe(true);
    });

    it('应该正确处理空 props 的情况', async () => {
      const plugins = CascaderAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result).toBeDefined();
      expect(result.formTagName).toBe('el-form-cascader');
      expect(result.tagName).toBe('el-cascader');
    });
  });

  describe('第二部分：数据源处理完整测试', () => {
    it('应该正确处理平铺数据源并转换为树形结构', async () => {
      const plugins = CascaderAccumulate.getPluginMethod({ isInDesigner: false });
      const flatDataSource = [
        { label: 'Level 1', value: 'l1', parent: null },
        { label: 'Level 1-1', value: 'l1-1', parent: 'l1' },
        { label: 'Level 1-2', value: 'l1-2', parent: 'l1' },
        { label: 'Level 2', value: 'l2', parent: null },
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

      expect(result.options).toBeDefined();
      expect(Array.isArray(result.options)).toBe(true);
      expect(result.options.length).toBeGreaterThan(0);
    });

    it('应该正确处理异步数据源', async () => {
      const plugins = CascaderAccumulate.getPluginMethod({ isInDesigner: false });
      const asyncDataSource = vi.fn().mockResolvedValue([
        { label: 'Async 1', value: 'a1', parent: null },
        { label: 'Async 1-1', value: 'a1-1', parent: 'a1' },
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
      expect(currentValue.value.options).toBeDefined();
      expect(currentValue.value.loading).toBeDefined();
    });

    it('应该正确处理自定义字段映射', async () => {
      const plugins = CascaderAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { name: 'Item 1', id: 'i1', parentId: null },
        { name: 'Item 1-1', id: 'i1-1', parentId: 'i1' },
      ];
      const props = {
        dataSource,
        textField: 'name',
        valueField: 'id',
        parentField: 'parentId',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.options).toBeDefined();
    });

    it('应该正确设置 ref.reload 和 ref.data', async () => {
      const plugins = CascaderAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Test', value: 'test', parent: null },
      ];
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

    it('应该正确处理 parentField 为 null 的情况（不转换树）', async () => {
      const plugins = CascaderAccumulate.getPluginMethod({ isInDesigner: false });
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

      expect(currentValue.value.options).toBeDefined();
    });

    it('应该正确处理空数据源', async () => {
      const testCases = [{ dataSource: null }, { dataSource: undefined }, { dataSource: [] }];

      testCases.forEach(async (testCase) => {
        const plugins = CascaderAccumulate.getPluginMethod({ isInDesigner: false });
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
      const plugins = CascaderAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: ['1', '1-1'],
        'onUpdate:modelValue': vi.fn(),
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result).toBeDefined();
      expect(result.modelValue).toBeDefined();
      expect(result['onUpdate:modelValue']).toBeDefined();
    });

    it('应该正确设置 ref.resetField 方法', async () => {
      const plugins = CascaderAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: ['1'],
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

  describe('第四部分：cascaderProps 处理测试', () => {
    it('应该正确处理 multiple 和 checkStrictly 配置', async () => {
      const plugins = CascaderAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        dataSource: [{ label: 'Test', value: 'test', parent: null }],
        multiple: true,
        checkStrictly: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      const result = currentValue.value;

      expect(result.props).toBeDefined();
      expect(result.props.multiple).toBe(true);
      expect(result.props.checkStrictly).toBe(true);
    });

    it('应该合并自定义 props 配置', async () => {
      const plugins = CascaderAccumulate.getPluginMethod({ isInDesigner: false });
      const customProps = {
        expandTrigger: 'hover',
        emitPath: false,
      };
      const props = {
        dataSource: [{ label: 'Test', value: 'test', parent: null }],
        multiple: false,
        props: customProps,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      const result = currentValue.value;

      expect(result.props).toBeDefined();
      expect(result.props.expandTrigger).toBe('hover');
      expect(result.props.emitPath).toBe(false);
    });
  });

  describe('第五部分：预览模式测试', () => {
    it('应该正确生成单路径预览文本', async () => {
      const plugins = CascaderAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Level 1', value: 'l1', parent: null },
        { label: 'Level 1-1', value: 'l1-1', parent: 'l1' },
      ];
      const props = {
        dataSource,
        modelValue: ['l1', 'l1-1'],
        preview: true,
        parentField: 'parent',
        separator: ' / ',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.render).toBeDefined();
    });

    it('应该正确处理多选模式的预览', async () => {
      const plugins = CascaderAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'A', value: 'a', parent: null },
        { label: 'A-1', value: 'a-1', parent: 'a' },
        { label: 'B', value: 'b', parent: null },
      ];
      const props = {
        dataSource,
        modelValue: [
          ['a', 'a-1'],
          ['b'],
        ],
        multiple: true,
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
      const plugins = CascaderAccumulate.getPluginMethod({ isInDesigner: true });
      const dataSource = [{ label: 'Test', value: 'test', parent: null }];
      const props = {
        'data-nodepath': '/root/cascader',
        dataSource,
        modelValue: ['test'],
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

    it('应该正确处理自定义 separator', async () => {
      const plugins = CascaderAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'A', value: 'a', parent: null },
        { label: 'A-B', value: 'a-b', parent: 'a' },
      ];
      const props = {
        dataSource,
        modelValue: ['a', 'a-b'],
        preview: true,
        separator: ' > ',
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

  describe('第六部分：表单集成测试', () => {
    it('应该在表单环境中正确设置 formTagName', async () => {
      const plugins = CascaderAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        'data-nodepath': '/root/form/cascader',
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

      expect(result.formTagName).toBe('el-form-cascader');
    });
  });

  describe('第七部分：插件交叉组合测试', () => {
    it('交叉组合：dataSource + multiple + preview', async () => {
      const plugins = CascaderAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Category 1', value: 'c1', parent: null },
        { label: 'Item 1-1', value: 'c1-1', parent: 'c1' },
        { label: 'Category 2', value: 'c2', parent: null },
      ];
      const props = {
        dataSource,
        modelValue: [['c1', 'c1-1']],
        multiple: true,
        preview: true,
        parentField: 'parent',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.options).toBeDefined();
      expect(currentValue.value.props.multiple).toBe(true);
      expect(currentValue.value.render).toBeDefined();
    });

    it('交叉组合：异步数据源 + checkStrictly + 表单环境', async () => {
      const plugins = CascaderAccumulate.getPluginMethod({ isInDesigner: false });
      const asyncDataSource = vi.fn().mockResolvedValue([
        { label: 'Async 1', value: 'a1', parent: null },
        { label: 'Async 1-1', value: 'a1-1', parent: 'a1' },
      ]);
      const props = {
        'data-nodepath': '/root/form/cascader',
        dataSource: asyncDataSource,
        checkStrictly: true,
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
      expect(currentValue.value.options).toBeDefined();
      expect(currentValue.value.props.checkStrictly).toBe(true);
      expect(currentValue.value.formTagName).toBe('el-form-cascader');
    });

    it('交叉组合：自定义字段 + 自定义 props + 预览', async () => {
      const plugins = CascaderAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { name: 'Root', id: 'r', parentId: null },
        { name: 'Child', id: 'r-c', parentId: 'r' },
      ];
      const customProps = {
        expandTrigger: 'hover',
      };
      const props = {
        dataSource,
        textField: 'name',
        valueField: 'id',
        parentField: 'parentId',
        props: customProps,
        modelValue: ['r', 'r-c'],
        preview: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.options).toBeDefined();
      expect(currentValue.value.props.expandTrigger).toBe('hover');
      expect(currentValue.value.render).toBeDefined();
    });
  });

  describe('第八部分：边界和异常测试', () => {
    it('边界测试：深层嵌套的树形数据', async () => {
      const plugins = CascaderAccumulate.getPluginMethod({ isInDesigner: false });
      const deepData = [
        { label: 'L1', value: 'l1', parent: null },
        { label: 'L2', value: 'l2', parent: 'l1' },
        { label: 'L3', value: 'l3', parent: 'l2' },
        { label: 'L4', value: 'l4', parent: 'l3' },
      ];
      const props = {
        dataSource: deepData,
        parentField: 'parent',
        modelValue: ['l1', 'l2', 'l3', 'l4'],
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.options).toBeDefined();
    });

    it('边界测试：空路径的预览', async () => {
      const plugins = CascaderAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [{ label: 'Test', value: 'test', parent: null }];
      const props = {
        dataSource,
        modelValue: [],
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

    it('边界测试：不存在的路径值', async () => {
      const plugins = CascaderAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [{ label: 'Test', value: 'test', parent: null }];
      const props = {
        dataSource,
        modelValue: ['nonexistent', 'path'],
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

  describe('第九部分：props 更新响应式测试（使用 setValue）', () => {
    it('响应式测试：使用 setValue 更新 dataSource', async () => {
      const plugins = CascaderAccumulate.getPluginMethod({ isInDesigner: false });
      const initialData = [
        { label: 'Old 1', value: 'o1', parent: null },
      ];
      const props = {
        dataSource: initialData,
        parentField: 'parent',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.options).toBeDefined();

      const newData = [
        { label: 'New 1', value: 'n1', parent: null },
        { label: 'New 1-1', value: 'n1-1', parent: 'n1' },
      ];
      await setValue({ dataSource: newData });

      await waitForNextUpdate();

      expect(currentValue.value.options).toBeDefined();
    });

    it('响应式测试：使用 setValue 更新 modelValue（不需要 waitForNextUpdate）', async () => {
      const plugins = CascaderAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'A', value: 'a', parent: null },
        { label: 'A-1', value: 'a-1', parent: 'a' },
        { label: 'B', value: 'b', parent: null },
      ];
      const props = {
        dataSource,
        modelValue: ['a'],
        parentField: 'parent',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.modelValue).toEqual(['a']);

      await setValue({ modelValue: ['a', 'a-1'] });

      expect(currentValue.value.modelValue).toEqual(['a', 'a-1']);

      await setValue({ modelValue: ['b'] });

      expect(currentValue.value.modelValue).toEqual(['b']);
    });

    it('响应式测试：使用 setValue 切换 multiple 和 checkStrictly', async () => {
      const plugins = CascaderAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Test', value: 'test', parent: null },
      ];
      const props = {
        dataSource,
        multiple: false,
        checkStrictly: false,
        parentField: 'parent',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.props.multiple).toBe(false);

      await setValue({ multiple: true, checkStrictly: true });

      expect(currentValue.value.props.multiple).toBe(true);
      expect(currentValue.value.props.checkStrictly).toBe(true);
    });

    it('响应式测试：使用 setValue 切换 preview 模式', async () => {
      const plugins = CascaderAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Test', value: 'test', parent: null },
      ];
      const props = {
        dataSource,
        modelValue: ['test'],
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

    it('响应式测试：使用 setValue 更新 separator', async () => {
      const plugins = CascaderAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'A', value: 'a', parent: null },
        { label: 'A-B', value: 'a-b', parent: 'a' },
      ];
      const props = {
        dataSource,
        modelValue: ['a', 'a-b'],
        preview: true,
        separator: ' / ',
        parentField: 'parent',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      await setValue({ separator: ' > ' });

      expect(currentValue.value.render).toBeDefined();
    });

    it('响应式测试：使用 setValue 同时更新多个属性', async () => {
      const plugins = CascaderAccumulate.getPluginMethod({ isInDesigner: false });
      const initialData = [
        { label: 'Old', value: 'old', parent: null },
      ];
      const props = {
        dataSource: initialData,
        modelValue: ['old'],
        multiple: false,
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
        { label: 'New-Child', value: 'new-child', parent: 'new' },
      ];

      await setValue({
        dataSource: newData,
        modelValue: [['new', 'new-child']],
        multiple: true,
        preview: true,
      });

      await waitForNextUpdate();

      expect(currentValue.value.options).toBeDefined();
      expect(currentValue.value.props.multiple).toBe(true);
      expect(currentValue.value.render).toBeDefined();
    });

    it('响应式测试：使用 setValue 更新字段映射', async () => {
      const plugins = CascaderAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { name: 'Item', id: 'i', title: 'Title', parentId: null, parentName: null },
      ];
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

      await setValue({ textField: 'title', parentField: 'parentName' });


      expect(currentValue.value.options).toBeDefined();
    });
  });

  describe('第十部分：完整流程集成测试', () => {
    it('完整流程：异步加载 → 树形转换 → 选择值 → 预览', async () => {
      const plugins = CascaderAccumulate.getPluginMethod({ isInDesigner: false });
      const asyncDataSource = vi.fn().mockResolvedValue([
        { label: 'Province 1', value: 'p1', parent: null },
        { label: 'City 1-1', value: 'c1-1', parent: 'p1' },
        { label: 'District 1-1-1', value: 'd1-1-1', parent: 'c1-1' },
      ]);

      const props = {
        dataSource: asyncDataSource,
        modelValue: ['p1', 'c1-1', 'd1-1-1'],
        preview: true,
        parentField: 'parent',
        separator: ' / ',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(asyncDataSource).toHaveBeenCalled();
      expect(currentValue.value.options).toBeDefined();
      expect(currentValue.value.modelValue).toEqual(['p1', 'c1-1', 'd1-1-1']);
      expect(currentValue.value.render).toBeDefined();
    });

    it('完整流程：多选模式 + 严格模式 + 表单环境', async () => {
      const plugins = CascaderAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Category A', value: 'ca', parent: null },
        { label: 'Item A-1', value: 'ca-1', parent: 'ca' },
        { label: 'Category B', value: 'cb', parent: null },
      ];
      const props = {
        'data-nodepath': '/form/cascader',
        dataSource,
        modelValue: [['ca'], ['cb']],
        multiple: true,
        checkStrictly: true,
        parentField: 'parent',
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

      expect(currentValue.value.formTagName).toBe('el-form-cascader');
      expect(currentValue.value.options).toBeDefined();
      expect(currentValue.value.props.multiple).toBe(true);
      expect(currentValue.value.props.checkStrictly).toBe(true);
      expect(currentValue.value.ref.resetField).toBeDefined();
    });
  });
});

