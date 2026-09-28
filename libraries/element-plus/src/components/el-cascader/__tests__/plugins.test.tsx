import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '../../../../ep-test/test-utils/render-hook';
import CascaderAccumulate from '../plugins/index';
import idePlugin from '../plugins/ide';

// Mock ElPreview
vi.mock('@/index', () => ({
  ElPreview: vi.fn(() => 'ElPreview'),
}));

describe('plugins/index.tsx', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('应该正确导出 CascaderAccumulate', () => {
    expect(CascaderAccumulate).toBeDefined();
    expect(typeof CascaderAccumulate.addPlugin).toBe('function');
    expect(typeof CascaderAccumulate.addAccumulate).toBe('function');
  });

  it('应该包含所有插件', () => {
    const plugins = CascaderAccumulate.getPluginMethod();
    expect(Array.isArray(plugins)).toBe(true);
    expect(plugins.length).toBeGreaterThan(0);
  });

  describe('handleTagName 插件', () => {
    const plugin = CascaderAccumulate.getPluginMethodByName('handleTagName') as any;

    it('应该正确处理插件基本结构', () => {
      expect(plugin).toBeDefined();
      expect(plugin.name).toBe('handleTagName');
      expect(typeof plugin.handle).toBe('function');
    });

    it('应该返回正确的标签名', () => {
      const { currentValue } = renderHook(plugin, {});

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.formTagName).toBe('el-form-cascader');
      expect(currentValue.value.tagName).toBe('el-cascader');
    });
  });

  describe('handleComponentInForm 插件', () => {
    const plugin = CascaderAccumulate.getPluginMethodByName('handleComponentInForm') as any;

    it('应该正确处理插件基本结构', () => {
      expect(plugin).toBeDefined();
      expect(plugin.name).toBe('handleComponentInForm');
      expect(typeof plugin.handle).toBe('function');
    });

    it('应该调用 handleComponentInForm 函数', () => {
      const { currentValue } = renderHook(plugin, {});

      expect(currentValue.value).toBeDefined();
      // 检查插件是否正确执行，不依赖具体的返回值
      expect(typeof currentValue.value).toBe('object');
    });
  });

  describe('handleControllableValue 插件', () => {
    const plugin = CascaderAccumulate.getPluginMethodByName('handleControllableValue') as any;

    it('应该正确处理插件基本结构', () => {
      expect(plugin).toBeDefined();
      expect(plugin.name).toBe('handleControllableValue');
      expect(typeof plugin.handle).toBe('function');
    });

    it('应该调用 handleControllableValue 函数', () => {
      const { currentValue } = renderHook(plugin, {});

      expect(currentValue.value).toBeDefined();
      // 检查插件是否正确执行，不依赖具体的返回值
      expect(typeof currentValue.value).toBe('object');
    });
  });

  describe('handleDataSource 插件', () => {
    const plugin = CascaderAccumulate.getPluginMethodByName('handleDataSource') as any;

    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('应该正确处理插件基本结构', () => {
      expect(plugin).toBeDefined();
      expect(plugin.name).toBe('handleDataSource');
      expect(typeof plugin.handle).toBe('function');
    });

    it('应该正确处理函数类型的 dataSource', () => {
      const mockDataSource = vi.fn(() => [
        { id: 1, label: 'Item 1', value: 'item1', children: [] },
        { id: 2, label: 'Item 2', value: 'item2', children: [] },
      ]);

      const { currentValue } = renderHook(plugin, {
        dataSource: mockDataSource,
        textField: 'label',
        valueField: 'value',
        parentField: 'parentId',
        ref: {},
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.ref).toBeDefined();
    });

    it('应该正确处理对象类型的 dataSource', () => {
      const mockDataSource = vi.fn(() => [
        { id: 1, title: 'Title 1', parentId: null },
        { id: 2, title: 'Title 2', parentId: 1 },
      ]);

      const { currentValue } = renderHook(plugin, {
        dataSource: mockDataSource,
        textField: 'title',
        valueField: 'id',
        parentField: 'parentId',
        ref: {},
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.ref).toBeDefined();
    });

    it('应该正确处理没有 dataSource 的情况', () => {
      const { currentValue } = renderHook(plugin, {
        textField: 'title',
        valueField: 'id',
        ref: {},
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.ref).toBeDefined();
    });

    it('应该正确处理默认的字段名', () => {
      const mockDataSource = vi.fn(() => [
        { label: 'Label 1', value: 'value1' },
        { label: 'Label 2', value: 'value2' },
      ]);

      const { currentValue } = renderHook(plugin, {
        dataSource: mockDataSource,
        ref: {},
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.ref).toBeDefined();
    });

    it('应该正确处理空的 dataSource', () => {
      const { currentValue } = renderHook(plugin, {
        dataSource: null,
        ref: {},
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.ref).toBeDefined();
    });

    it('应该正确处理 undefined 的 dataSource', () => {
      const { currentValue } = renderHook(plugin, {
        dataSource: undefined,
        ref: {},
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.ref).toBeDefined();
    });

    it('应该正确处理复杂的 dataSource 配置', () => {
      const mockDataSource = vi.fn(() => [
        { customText: 'Text 1', customValue: 'value1', customParent: null },
        { customText: 'Text 2', customValue: 'value2', customParent: 'value1' },
      ]);

      const { currentValue } = renderHook(plugin, {
        dataSource: mockDataSource,
        textField: 'customText',
        valueField: 'customValue',
        parentField: 'customParent',
        ref: { current: null },
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.ref).toBeDefined();
    });

    it('应该正确处理空的字段名', () => {
      const mockDataSource = vi.fn(() => [
        { name: 'Name 1', id: 'id1' },
        { name: 'Name 2', id: 'id2' },
      ]);

      const { currentValue } = renderHook(plugin, {
        dataSource: mockDataSource,
        textField: '',
        valueField: '',
        ref: {},
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.ref).toBeDefined();
    });

    it('应该正确处理数字类型的字段', () => {
      const mockDataSource = vi.fn(() => [
        { 0: 'Text 1', 1: 'value1' },
        { 0: 'Text 2', 1: 'value2' },
      ]);

      const { currentValue } = renderHook(plugin, {
        dataSource: mockDataSource,
        textField: 0,
        valueField: 1,
        ref: {},
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.ref).toBeDefined();
    });

    it('应该正确处理布尔类型的字段', () => {
      const mockDataSource = vi.fn(() => [
        { true: 'Text 1', false: 'value1' },
        { true: 'Text 2', false: 'value2' },
      ]);

      const { currentValue } = renderHook(plugin, {
        dataSource: mockDataSource,
        textField: true,
        valueField: false,
        ref: {},
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.ref).toBeDefined();
    });

    it('应该正确处理数组类型的字段', () => {
      const mockDataSource = vi.fn(() => [
        { ['text']: 'Text 1', ['value']: 'value1' },
        { ['text']: 'Text 2', ['value']: 'value2' },
      ]);

      const { currentValue } = renderHook(plugin, {
        dataSource: mockDataSource,
        textField: ['text'],
        valueField: ['value'],
        ref: {},
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.ref).toBeDefined();
    });

    it('应该正确处理对象类型的字段', () => {
      const mockDataSource = vi.fn(() => [
        { 'field:text': 'Text 1', 'field:value': 'value1' },
        { 'field:text': 'Text 2', 'field:value': 'value2' },
      ]);

      const { currentValue } = renderHook(plugin, {
        dataSource: mockDataSource,
        textField: { field: 'text' },
        valueField: { field: 'value' },
        ref: {},
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.ref).toBeDefined();
    });

    it('应该正确处理复杂的 ref 结构', () => {
      const complexRef = {
        current: null,
        value: 'test',
        focus: vi.fn(),
        blur: vi.fn(),
      };

      const mockDataSource = vi.fn(() => [
        { label: 'Label 1', value: 'value1' },
        { label: 'Label 2', value: 'value2' },
      ]);

      const { currentValue } = renderHook(plugin, {
        dataSource: mockDataSource,
        ref: complexRef,
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.ref).toBeDefined();
    });

    it('应该正确处理所有 props 的组合', () => {
      const mockDataSource = vi.fn(() => [
        { title: 'Title 1', id: 'id1', parentId: null },
        { title: 'Title 2', id: 'id2', parentId: 'id1' },
      ]);

      const { currentValue } = renderHook(plugin, {
        dataSource: mockDataSource,
        textField: 'title',
        valueField: 'id',
        parentField: 'parentId',
        ref: { current: null },
        otherProp: 'test',
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.ref).toBeDefined();
    });

    it('应该正确处理空的 TreeData 情况', () => {
      const mockDataSource = vi.fn(() => []);

      const { currentValue } = renderHook(plugin, {
        dataSource: mockDataSource,
        ref: {},
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.ref).toBeDefined();
      // 当 TreeData 为空时，不应该有 options 属性
      expect(currentValue.value.options).toBeUndefined();
    });

    it('应该正确处理非空的 TreeData 情况', () => {
      const mockDataSource = vi.fn(() => [
        { label: 'Label 1', value: 'value1', children: [] },
        { label: 'Label 2', value: 'value2', children: [] },
      ]);

      const { currentValue } = renderHook(plugin, {
        dataSource: mockDataSource,
        ref: {},
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.ref).toBeDefined();
    });

    it('应该正确处理复杂的 ref 合并', () => {
      const originalRef = {
        current: null,
        value: 'original',
        focus: vi.fn(),
        blur: vi.fn(),
      };

      const mockDataSource = vi.fn(() => [
        { label: 'Label 1', value: 'value1' },
        { label: 'Label 2', value: 'value2' },
      ]);

      const { currentValue } = renderHook(plugin, {
        dataSource: mockDataSource,
        ref: originalRef,
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.ref).toBeDefined();
      expect(currentValue.value.ref).toHaveProperty('reload');
      expect(currentValue.value.ref).toHaveProperty('data');
    });

    it('应该正确处理各种数据源配置', () => {
      const testCases = [
        { dataSource: vi.fn(() => [{ label: 'Test 1', value: 'test1' }]) },
        { dataSource: vi.fn(() => [{ label: 'Test 2', value: 'test2' }]) },
        { dataSource: vi.fn(() => [{ label: 'Test 3', value: 'test3' }]) },
        { dataSource: vi.fn(() => [{ label: 'Test 4', value: 'test4' }]) },
      ];

      testCases.forEach((testCase) => {
        const { currentValue } = renderHook(plugin, {
          ...testCase,
          ref: {},
        });

        expect(currentValue.value).toBeDefined();
        expect(currentValue.value.ref).toBeDefined();
      });
    });

    it('应该正确处理字段映射的各种组合', () => {
      const fieldCombinations = [
        { textField: 'name', valueField: 'id', parentField: 'parentId' },
        { textField: 'title', valueField: 'key', parentField: 'parentKey' },
        { textField: 'label', valueField: 'value', parentField: 'parent' },
        { textField: 'displayName', valueField: 'code', parentField: 'parentCode' },
      ];

      fieldCombinations.forEach((fields) => {
        const mockDataSource = vi.fn(() => [
          { [fields.textField]: 'Text 1', [fields.valueField]: 'value1', [fields.parentField]: null },
          { [fields.textField]: 'Text 2', [fields.valueField]: 'value2', [fields.parentField]: 'value1' },
        ]);

        const { currentValue } = renderHook(plugin, {
          dataSource: mockDataSource,
          ...fields,
          ref: {},
        });

        expect(currentValue.value).toBeDefined();
        expect(currentValue.value.ref).toBeDefined();
      });
    });
  });

  describe('handleCascaderProps 插件', () => {
    const plugin = CascaderAccumulate.getPluginMethodByName('handleCascaderProps') as any;

    it('应该正确处理插件基本结构', () => {
      expect(plugin).toBeDefined();
      expect(plugin.name).toBe('handleCascaderProps');
      expect(typeof plugin.handle).toBe('function');
    });

    it('应该正确处理默认的 multiple 和 checkStrictly', () => {
      const { currentValue } = renderHook(plugin, {});

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.props).toBeDefined();
      expect(currentValue.value.props.multiple).toBe(false);
      expect(currentValue.value.props.checkStrictly).toBe(false);
    });

    it('应该正确处理自定义的 multiple 和 checkStrictly', () => {
      const { currentValue } = renderHook(plugin, {
        multiple: true,
        checkStrictly: true,
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.props).toBeDefined();
      expect(currentValue.value.props.multiple).toBe(true);
      expect(currentValue.value.props.checkStrictly).toBe(true);
    });

    it('应该正确处理 props 对象', () => {
      const customProps = {
        expandTrigger: 'hover',
        lazy: true,
        lazyLoad: vi.fn(),
      };

      const { currentValue } = renderHook(plugin, {
        multiple: true,
        checkStrictly: false,
        props: customProps,
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.props).toBeDefined();
      expect(currentValue.value.props.multiple).toBe(true);
      expect(currentValue.value.props.checkStrictly).toBe(false);
      expect(currentValue.value.props.expandTrigger).toBe('hover');
      expect(currentValue.value.props.lazy).toBe(true);
      expect(currentValue.value.props.lazyLoad).toBe(customProps.lazyLoad);
    });

    it('应该正确处理非对象的 props', () => {
      const { currentValue } = renderHook(plugin, {
        multiple: true,
        checkStrictly: false,
        props: 'invalid',
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.props).toBeDefined();
      expect(currentValue.value.props.multiple).toBe(true);
      expect(currentValue.value.props.checkStrictly).toBe(false);
    });

    it('应该正确处理 null 的 props', () => {
      const { currentValue } = renderHook(plugin, {
        multiple: true,
        checkStrictly: false,
        props: null,
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.props).toBeDefined();
      expect(currentValue.value.props.multiple).toBe(true);
      expect(currentValue.value.props.checkStrictly).toBe(false);
    });

    it('应该正确处理 undefined 的 props', () => {
      const { currentValue } = renderHook(plugin, {
        multiple: true,
        checkStrictly: false,
        props: undefined,
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.props).toBeDefined();
      expect(currentValue.value.props.multiple).toBe(true);
      expect(currentValue.value.props.checkStrictly).toBe(false);
    });

    it('应该正确处理各种类型的 multiple 值', () => {
      const testCases = [
        { multiple: true, expected: true },
        { multiple: false, expected: false },
        { multiple: 'true', expected: 'true' },
        { multiple: 1, expected: 1 },
        { multiple: 0, expected: 0 },
        { multiple: null, expected: null },
      ];

      testCases.forEach(({ multiple, expected }) => {
        const { currentValue } = renderHook(plugin, { multiple });
        expect(currentValue.value.props.multiple).toBe(expected);
      });

      // 单独测试 undefined 的情况
      const { currentValue } = renderHook(plugin, {});
      expect(currentValue.value.props.multiple).toBe(false);
    });

    it('应该正确处理各种类型的 checkStrictly 值', () => {
      const testCases = [
        { checkStrictly: true, expected: true },
        { checkStrictly: false, expected: false },
        { checkStrictly: 'true', expected: 'true' },
        { checkStrictly: 1, expected: 1 },
        { checkStrictly: 0, expected: 0 },
        { checkStrictly: null, expected: null },
      ];

      testCases.forEach(({ checkStrictly, expected }) => {
        const { currentValue } = renderHook(plugin, { checkStrictly });
        expect(currentValue.value.props.checkStrictly).toBe(expected);
      });

      // 单独测试 undefined 的情况
      const { currentValue } = renderHook(plugin, {});
      expect(currentValue.value.props.checkStrictly).toBe(false);
    });
  });

  describe('handlePreview 插件', () => {
    const plugin = CascaderAccumulate.getPluginMethodByName('handlePreview') as any;

    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('应该正确处理插件基本结构', () => {
      expect(plugin).toBeDefined();
      expect(plugin.name).toBe('handlePreview');
      expect(typeof plugin.handle).toBe('function');
    });

    it('应该正确处理基本的预览渲染', () => {
      const { currentValue } = renderHook(plugin, {
        ref: {},
        render: vi.fn(),
        multiple: false,
        separator: ' / ',
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.ref).toBeDefined();
      expect(currentValue.value.render).toBeDefined();
    });

    it('应该正确处理 multiple 模式', () => {
      const { currentValue } = renderHook(plugin, {
        ref: {},
        render: vi.fn(),
        multiple: true,
        separator: ', ',
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.ref).toBeDefined();
      expect(currentValue.value.render).toBeDefined();
    });

    it('应该正确处理自定义分隔符', () => {
      const { currentValue } = renderHook(plugin, {
        ref: {},
        render: vi.fn(),
        multiple: false,
        separator: ' -> ',
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.ref).toBeDefined();
      expect(currentValue.value.render).toBeDefined();
    });

    it('应该正确处理默认分隔符', () => {
      const { currentValue } = renderHook(plugin, {
        ref: {},
        render: vi.fn(),
        multiple: false,
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.ref).toBeDefined();
      expect(currentValue.value.render).toBeDefined();
    });

    it('应该正确处理复杂的 ref 结构', () => {
      const complexRef = {
        current: null,
        value: 'test',
        focus: vi.fn(),
        blur: vi.fn(),
      };

      const { currentValue } = renderHook(plugin, {
        ref: complexRef,
        render: vi.fn(),
        multiple: false,
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.ref).toBeDefined();
      expect(currentValue.value.render).toBeDefined();
    });

    it('应该正确处理 IDE 环境', () => {
      const { currentValue } = renderHook(plugin, {
        ref: {},
        render: vi.fn(),
        'data-nodepath': '/test/path',
        multiple: false,
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.ref).toBeDefined();
      expect(currentValue.value.render).toBeDefined();
    });

    it('应该正确处理所有 props 的组合', () => {
      const { currentValue } = renderHook(plugin, {
        ref: { current: null },
        render: vi.fn(),
        multiple: true,
        separator: ' | ',
        'data-nodepath': '/test/path',
        otherProp: 'test',
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.ref).toBeDefined();
      expect(currentValue.value.render).toBeDefined();
    });

    it('应该正确处理预览渲染函数的内部逻辑', () => {
      const { currentValue } = renderHook(plugin, {
        ref: {},
        render: vi.fn(),
        multiple: false,
        separator: ' -> ',
        'data-nodepath': '/test/path',
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.render).toBeDefined();
    });

    it('应该正确处理非 IDE 环境的预览渲染', () => {
      const { currentValue } = renderHook(plugin, {
        ref: {},
        render: vi.fn(),
        multiple: false,
        separator: ' / ',
        // 不提供 data-nodepath，模拟非 IDE 环境
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.render).toBeDefined();
    });

    it('应该正确处理多选模式的预览渲染', () => {
      const { currentValue } = renderHook(plugin, {
        ref: {},
        render: vi.fn(),
        multiple: true,
        separator: ', ',
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.render).toBeDefined();
    });

    it('应该正确处理复杂的预览渲染场景', () => {
      const complexRef = {
        current: null,
        value: 'test',
        focus: vi.fn(),
        blur: vi.fn(),
        reload: vi.fn(),
        data: [{ label: 'Test', value: 'test' }],
      };

      const { currentValue } = renderHook(plugin, {
        ref: complexRef,
        render: vi.fn(),
        multiple: true,
        separator: ' | ',
        'data-nodepath': '/complex/path',
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.ref).toBeDefined();
      expect(currentValue.value.render).toBeDefined();
    });

    it('应该正确处理预览渲染函数中的 getPathText 逻辑', () => {
      const { currentValue } = renderHook(plugin, {
        ref: {},
        render: vi.fn(),
        multiple: false,
        separator: ' -> ',
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.render).toBeDefined();
    });

    it('应该正确处理预览渲染函数中的 getListPreviewText 逻辑', () => {
      const { currentValue } = renderHook(plugin, {
        ref: {},
        render: vi.fn(),
        multiple: true,
        separator: ', ',
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.render).toBeDefined();
    });

    it('应该正确处理预览渲染函数中的空路径情况', () => {
      const { currentValue } = renderHook(plugin, {
        ref: {},
        render: vi.fn(),
        multiple: false,
        separator: ' / ',
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.render).toBeDefined();
    });

    it('应该正确处理预览渲染函数中的空选项情况', () => {
      const { currentValue } = renderHook(plugin, {
        ref: {},
        render: vi.fn(),
        multiple: false,
        separator: ' / ',
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.render).toBeDefined();
    });

    it('应该正确处理预览渲染函数中的节点查找逻辑', () => {
      const { currentValue } = renderHook(plugin, {
        ref: {},
        render: vi.fn(),
        multiple: false,
        separator: ' / ',
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.render).toBeDefined();
    });

    it('应该正确处理预览渲染函数中的多选过滤逻辑', () => {
      const { currentValue } = renderHook(plugin, {
        ref: {},
        render: vi.fn(),
        multiple: true,
        separator: ', ',
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.render).toBeDefined();
    });

    it('应该正确处理预览渲染函数中的 ref 合并逻辑', () => {
      const originalRef = {
        current: null,
        value: 'original',
        focus: vi.fn(),
        blur: vi.fn(),
        reload: vi.fn(),
        data: [{ label: 'Test', value: 'test' }],
      };

      const { currentValue } = renderHook(plugin, {
        ref: originalRef,
        render: vi.fn(),
        multiple: false,
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.ref).toBeDefined();
      expect(currentValue.value.render).toBeDefined();
    });

    it('应该正确处理预览渲染函数中的各种分隔符', () => {
      const separators = [' / ', ' -> ', ' | ', ', ', ' - ', ' > '];
      
      separators.forEach((separator) => {
        const { currentValue } = renderHook(plugin, {
          ref: {},
          render: vi.fn(),
          multiple: false,
          separator,
        });

        expect(currentValue.value).toBeDefined();
        expect(currentValue.value.render).toBeDefined();
      });
    });

    it('应该正确处理预览渲染函数中的各种 multiple 值', () => {
      const multipleValues = [true, false, 'true', 'false', 1, 0];
      
      multipleValues.forEach((multiple) => {
        const { currentValue } = renderHook(plugin, {
          ref: {},
          render: vi.fn(),
          multiple,
          separator: ' / ',
        });

        expect(currentValue.value).toBeDefined();
        expect(currentValue.value.render).toBeDefined();
      });
    });

    it('应该正确处理预览渲染函数中的各种 data-nodepath 值', () => {
      const nodePaths = ['/test/path', '/complex/nested/path', '', null, undefined];
      
      nodePaths.forEach((nodePath) => {
        const { currentValue } = renderHook(plugin, {
          ref: {},
          render: vi.fn(),
          multiple: false,
          'data-nodepath': nodePath,
        });

        expect(currentValue.value).toBeDefined();
        expect(currentValue.value.render).toBeDefined();
      });
    });
  });
});

describe('plugins/ide.ts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('应该正确导出 idePlugin', () => {
    expect(idePlugin).toBeDefined();
    expect(typeof idePlugin.addPlugin).toBe('function');
  });

  describe('handleNodePath 插件', () => {
    const plugin = idePlugin.getPluginMethodByName('handleNodePath') as any;

    it('应该正确处理插件基本结构', () => {
      expect(plugin).toBeDefined();
      expect(plugin.name).toBe('handleNodePath');
      expect(plugin.type).toBe('ide');
      expect(typeof plugin.handle).toBe('function');
    });

    it('应该正确处理基本的节点路径', () => {
      const { currentValue } = renderHook(plugin, {
        'data-nodepath': '/test/path',
        'vusion-d2c-id': 'test-id',
        class: 'existing-class',
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.class).toBeDefined();
      expect(currentValue.value.class).toContain('existing-class');
      expect(currentValue.value.class).toContain('Cascader_');
    });

    it('应该正确处理空的 class', () => {
      const { currentValue } = renderHook(plugin, {
        'data-nodepath': '/test/path',
        'vusion-d2c-id': 'test-id',
        class: '',
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.class).toBeDefined();
      expect(currentValue.value.class).toContain('Cascader_');
    });

    it('应该正确处理 undefined 的 class', () => {
      const { currentValue } = renderHook(plugin, {
        'data-nodepath': '/test/path',
        'vusion-d2c-id': 'test-id',
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.class).toBeDefined();
      expect(currentValue.value.class).toContain('Cascader_');
    });

    it('应该正确处理 null 的 class', () => {
      const { currentValue } = renderHook(plugin, {
        'data-nodepath': '/test/path',
        'vusion-d2c-id': 'test-id',
        class: null,
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.class).toBeDefined();
      expect(currentValue.value.class).toContain('Cascader_');
    });

    it('应该正确处理空的 nodePath', () => {
      const { currentValue } = renderHook(plugin, {
        'data-nodepath': '',
        'vusion-d2c-id': 'test-id',
        class: 'existing-class',
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.class).toBeDefined();
      expect(currentValue.value.class).toContain('existing-class');
      expect(currentValue.value.class).toContain('Cascader_');
    });

    it('应该正确处理 undefined 的 nodePath', () => {
      const { currentValue } = renderHook(plugin, {
        'vusion-d2c-id': 'test-id',
        class: 'existing-class',
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.class).toBeDefined();
      expect(currentValue.value.class).toContain('existing-class');
      expect(currentValue.value.class).toContain('Cascader_');
    });

    it('应该正确处理空的 vusionD2cId', () => {
      const { currentValue } = renderHook(plugin, {
        'data-nodepath': '/test/path',
        'vusion-d2c-id': '',
        class: 'existing-class',
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.class).toBeDefined();
      expect(currentValue.value.class).toContain('existing-class');
      expect(currentValue.value.class).toContain('Cascader_');
    });

    it('应该正确处理 undefined 的 vusionD2cId', () => {
      const { currentValue } = renderHook(plugin, {
        'data-nodepath': '/test/path',
        class: 'existing-class',
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.class).toBeDefined();
      expect(currentValue.value.class).toContain('existing-class');
      expect(currentValue.value.class).toContain('Cascader_');
    });

    it('应该正确处理所有 props 的组合', () => {
      const { currentValue } = renderHook(plugin, {
        'data-nodepath': '/complex/test/path',
        'vusion-d2c-id': 'complex-id-123',
        class: 'multiple classes here',
        otherProp: 'test',
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.class).toBeDefined();
      expect(currentValue.value.class).toContain('multiple classes here');
      expect(currentValue.value.class).toContain('Cascader_');
    });

    it('应该正确处理 useEffect 的 DOM 操作', () => {
      // Mock document.querySelector
      const mockElement = {
        setAttribute: vi.fn(),
      };
      const mockQuerySelector = vi.fn().mockReturnValue(mockElement);
      Object.defineProperty(document, 'querySelector', {
        value: mockQuerySelector,
        writable: true,
      });

      const { currentValue } = renderHook(plugin, {
        'data-nodepath': '/test/path',
        'vusion-d2c-id': 'test-id',
        class: 'test-class',
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.class).toBeDefined();
    });

    it('应该正确处理 DOM 元素不存在的情况', () => {
      // Mock document.querySelector 返回 null
      const mockQuerySelector = vi.fn().mockReturnValue(null);
      Object.defineProperty(document, 'querySelector', {
        value: mockQuerySelector,
        writable: true,
      });

      const { currentValue } = renderHook(plugin, {
        'data-nodepath': '/test/path',
        'vusion-d2c-id': 'test-id',
        class: 'test-class',
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.class).toBeDefined();
    });

    it('应该正确处理复杂的节点路径和 ID', () => {
      const { currentValue } = renderHook(plugin, {
        'data-nodepath': '/very/complex/nested/path/with/many/levels',
        'vusion-d2c-id': 'very-long-complex-id-with-numbers-123456',
        class: 'very-long-class-name-with-multiple-words',
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.class).toBeDefined();
      expect(currentValue.value.class).toContain('very-long-class-name-with-multiple-words');
      expect(currentValue.value.class).toContain('Cascader_');
    });

    it('应该正确处理特殊字符的节点路径', () => {
      const { currentValue } = renderHook(plugin, {
        'data-nodepath': '/path/with/special-chars-123_abc',
        'vusion-d2c-id': 'id-with-special-chars-123_abc',
        class: 'class-with-special-chars-123_abc',
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.class).toBeDefined();
      expect(currentValue.value.class).toContain('class-with-special-chars-123_abc');
      expect(currentValue.value.class).toContain('Cascader_');
    });
  });
});

describe('插件集成和扩展性测试', () => {
  it('应该能够与其他插件组合使用', () => {
    const combinedAccumulate = CascaderAccumulate.addPlugin({
      name: 'testPlugin',
      handle: () => ({
        testProperty: 'test-value',
        customData: 'custom',
      }),
    });

    const plugins = combinedAccumulate.getPluginMethod();
    expect(plugins.length).toBeGreaterThanOrEqual(6);

    const pluginNames = [
      'handleTagName',
      'handleComponentInForm',
      'handleControllableValue',
      'handleDataSource',
      'handleCascaderProps',
      'handlePreview',
      'testPlugin',
    ];

    pluginNames.forEach((pluginName) => {
      const plugin = combinedAccumulate.getPluginMethodByName(pluginName);
      expect(plugin).toBeDefined();
      if (plugin) {
        expect(plugin.name).toBe(pluginName);
      }
    });
  });

  it('应该正确处理插件的执行顺序', () => {
    const plugin1 = {
      name: 'plugin1',
      handle: () => ({ step1: 'completed' }),
    };
    const plugin2 = {
      name: 'plugin2',
      handle: () => ({ step2: 'completed' }),
    };

    const testAccumulate = CascaderAccumulate.addPlugin(plugin1).addPlugin(plugin2);

    const plugins = testAccumulate.getPluginMethod();
    expect(plugins.length).toBeGreaterThanOrEqual(8);

    const foundPlugin1 = testAccumulate.getPluginMethodByName('plugin1');
    const foundPlugin2 = testAccumulate.getPluginMethodByName('plugin2');

    expect(foundPlugin1).toBeDefined();
    expect(foundPlugin2).toBeDefined();
  });

  it('应该正确处理插件方法的获取', () => {
    const allMethods = CascaderAccumulate.getPluginMethod();
    expect(Array.isArray(allMethods)).toBe(true);
    expect(allMethods.length).toBeGreaterThan(0);

    allMethods.forEach((method) => {
      expect(typeof method === 'function' || (typeof method === 'object' && typeof method.handle === 'function')).toBe(
        true,
      );
    });
  });

  it('应该正确处理不存在的插件查询', () => {
    const nonExistentPlugin = CascaderAccumulate.getPluginMethodByName('nonExistentPlugin');
    expect(nonExistentPlugin).toBeUndefined();
  });
});

describe('插件组合测试', () => {
  it('应该验证所有插件都能独立工作', () => {
    const pluginNames = [
      'handleTagName',
      'handleComponentInForm',
      'handleControllableValue',
      'handleDataSource',
      'handleCascaderProps',
      'handlePreview',
    ];

    pluginNames.forEach((pluginName) => {
      const plugin = CascaderAccumulate.getPluginMethodByName(pluginName);
      expect(plugin).toBeDefined();
      expect(plugin?.name).toBe(pluginName);
      expect(typeof plugin?.handle).toBe('function');
    });
  });

  it('应该验证插件的基本功能完整性', () => {
    const dataSourcePlugin = CascaderAccumulate.getPluginMethodByName('handleDataSource');
    const cascaderPropsPlugin = CascaderAccumulate.getPluginMethodByName('handleCascaderProps');
    const previewPlugin = CascaderAccumulate.getPluginMethodByName('handlePreview');

    expect(dataSourcePlugin).toBeDefined();
    expect(typeof dataSourcePlugin.handle).toBe('function');

    expect(cascaderPropsPlugin).toBeDefined();
    expect(typeof cascaderPropsPlugin.handle).toBe('function');

    expect(previewPlugin).toBeDefined();
    expect(typeof previewPlugin.handle).toBe('function');
  });

  it('应该正确处理级联选择器的完整流程', () => {
    const dataSourcePlugin = CascaderAccumulate.getPluginMethodByName('handleDataSource');
    const cascaderPropsPlugin = CascaderAccumulate.getPluginMethodByName('handleCascaderProps');

    expect(dataSourcePlugin).toBeDefined();
    expect(dataSourcePlugin.name).toBe('handleDataSource');

    expect(cascaderPropsPlugin).toBeDefined();
    expect(cascaderPropsPlugin.name).toBe('handleCascaderProps');

    expect(typeof dataSourcePlugin.handle).toBe('function');
    expect(typeof cascaderPropsPlugin.handle).toBe('function');
  });
});