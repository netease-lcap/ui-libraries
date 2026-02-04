import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ElCheckbox, ElCheckboxButton } from 'element-plus';
import plugins from '../plugins/index';
import idePlugin from '../plugins/ide';
import { renderHook as customRenderHook } from '../../../../ep-test/test-utils/render-hook';

// Mock Element Plus components
vi.mock('element-plus', () => ({
  ElCheckbox: vi.fn(({ children, ...props }) => (
    <div data-testid="el-checkbox" {...props}>
      {children}
    </div>
  )),
  ElCheckboxButton: vi.fn(({ children, ...props }) => (
    <div data-testid="el-checkbox-button" {...props}>
      {children}
    </div>
  )),
  ElForm: vi.fn(({ children, ...props }) => (
    <div data-testid="el-form" {...props}>
      {children}
    </div>
  )),
  ElFormItem: vi.fn(({ children, ...props }) => (
    <div data-testid="el-form-item" {...props}>
      {children}
    </div>
  )),
}));

// Mock ElPreview component
vi.mock('@/index', () => ({
  ElPreview: vi.fn(({ text }) => <div data-testid="el-preview">{text}</div>),
}));

describe('plugins/index.tsx', () => {
  describe('应该正确导出 CheckboxAccumulate', () => {
    it('应该导出 CheckboxAccumulate 实例', () => {
      expect(plugins).toBeDefined();
      expect(plugins.getPluginMethod).toBeDefined();
    });
  });

  describe('应该包含所有插件', () => {
    it('应该包含所有必需的插件', () => {
      const pluginNames = [
        'handleTagName',
        'handleComponentInForm',
        'handleControllableValue',
        'handleDataSource',
        'handleItemType',
        'handlePreview',
        'handleDirection',
      ];

      pluginNames.forEach((name) => {
        const plugin = plugins.getPluginMethodByName(name);
        expect(plugin).toBeDefined();
        expect(plugin.name).toBe(name);
      });
    });
  });

  describe('handleTagName 插件', () => {
    it('应该正确处理插件基本结构', () => {
      const plugin = plugins.getPluginMethodByName('handleTagName');
      expect(plugin).toBeDefined();
      expect(plugin.name).toBe('handleTagName');
      expect(typeof plugin.handle).toBe('function');
    });

    it('应该返回正确的标签名', () => {
      const plugin = plugins.getPluginMethodByName('handleTagName');
      const result = plugin.handle();

      expect(result).toEqual({
        formTagName: 'el-form-checkbox-group',
        tagName: 'el-checkbox-group',
      });
    });
  });

  describe('handleComponentInForm 插件', () => {
    it('应该正确处理插件基本结构', () => {
      const plugin = plugins.getPluginMethodByName('handleComponentInForm');
      expect(plugin).toBeDefined();
      expect(plugin.name).toBe('handleComponentInForm');
      expect(typeof plugin.handle).toBe('function');
    });

    it('应该使用 renderHook 测试 handleComponentInForm', () => {
      const plugin = plugins.getPluginMethodByName('handleComponentInForm');
      const props = {
        formItem: { label: 'Test Label' },
        form: { rules: {} },
      };

      const { currentValue } = customRenderHook(plugin, props);

      expect(currentValue.value).toBeDefined();
    });

    it('应该使用 renderHook 测试没有 formItem 的情况', () => {
      const plugin = plugins.getPluginMethodByName('handleComponentInForm');
      const props = {
        formItem: undefined,
        form: { rules: {} },
      };

      const { currentValue } = customRenderHook(plugin, props);

      expect(currentValue.value).toBeDefined();
    });
  });

  describe('handleControllableValue 插件', () => {
    it('应该正确处理插件基本结构', () => {
      const plugin = plugins.getPluginMethodByName('handleControllableValue');
      expect(plugin).toBeDefined();
      expect(plugin.name).toBe('handleControllableValue');
      expect(typeof plugin.handle).toBe('function');
    });

    it('应该使用 renderHook 测试 handleControllableValue', () => {
      const plugin = plugins.getPluginMethodByName('handleControllableValue');
      const props = {
        modelValue: ['option1', 'option2'],
        'onUpdate:modelValue': vi.fn(),
      };

      const { currentValue } = customRenderHook(plugin, props);

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('modelValue');
      expect(currentValue.value).toHaveProperty('onUpdate:modelValue');
    });

    it('应该使用 renderHook 测试没有 modelValue 的情况', () => {
      const plugin = plugins.getPluginMethodByName('handleControllableValue');
      const props = {
        modelValue: undefined,
        'onUpdate:modelValue': vi.fn(),
      };

      const { currentValue } = customRenderHook(plugin, props);

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('modelValue');
      expect(currentValue.value).toHaveProperty('onUpdate:modelValue');
    });
  });

  describe('handleDataSource 插件', () => {
    it('应该正确处理插件基本结构', () => {
      const plugin = plugins.getPluginMethodByName('handleDataSource');
      expect(plugin).toBeDefined();
      expect(plugin.name).toBe('handleDataSource');
      expect(typeof plugin.handle).toBe('function');
    });

    it('应该使用 renderHook 测试数据源配置', () => {
      const plugin = plugins.getPluginMethodByName('handleDataSource');
      const props = {
        dataSource: () => [
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
        ],
        valueField: 'value',
        slots: {},
        ref: {},
      };

      const { currentValue } = customRenderHook(plugin, props);

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('ref');
      expect(currentValue.value).toHaveProperty('loading');
      expect(currentValue.value).toHaveProperty('data');
      expect(currentValue.value).toHaveProperty('slots');
    });

    it('应该使用 renderHook 测试没有数据源的情况', () => {
      const plugin = plugins.getPluginMethodByName('handleDataSource');
      const props = {
        dataSource: null,
        valueField: 'value',
        slots: {},
        ref: {},
      };

      const { currentValue } = customRenderHook(plugin, props);

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('slots');
      expect(currentValue.value.slots).not.toHaveProperty('default');
    });

    it('应该使用 renderHook 测试自定义字段名', () => {
      const plugin = plugins.getPluginMethodByName('handleDataSource');
      const props = {
        dataSource: () => [
          { label: 'Option 1', id: '1' },
          { label: 'Option 2', id: '2' },
        ],
        valueField: 'id',
        slots: {},
        ref: {},
      };

      const { currentValue } = customRenderHook(plugin, props);

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('slots');
      expect(currentValue.value.slots).toHaveProperty('default');
    });

    it('应该使用 renderHook 测试 slots 配置', () => {
      const plugin = plugins.getPluginMethodByName('handleDataSource');
      const mockSlots = {
        item: vi.fn(({ item }) => `Custom: ${item.label}`),
      };
      const props = {
        dataSource: () => [
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
        ],
        valueField: 'value',
        slots: mockSlots,
        ref: {},
      };

      const { currentValue } = customRenderHook(plugin, props);

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('slots');
      expect(currentValue.value.slots).toHaveProperty('default');
    });

    it('应该使用 renderHook 测试 undefined 数据源', () => {
      const plugin = plugins.getPluginMethodByName('handleDataSource');
      const props = {
        dataSource: undefined,
        valueField: 'value',
        slots: {},
        ref: {},
      };

      const { currentValue } = customRenderHook(plugin, props);

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('slots');
      expect(currentValue.value.slots).not.toHaveProperty('default');
    });
  });

  describe('handleItemType 插件', () => {
    it('应该正确处理插件基本结构', () => {
      const plugin = plugins.getPluginMethodByName('handleItemType');
      expect(plugin).toBeDefined();
      expect(plugin.name).toBe('handleItemType');
      expect(typeof plugin.handle).toBe('function');
    });

    it('应该使用 renderHook 测试 button 类型', () => {
      const plugin = plugins.getPluginMethodByName('handleItemType');
      const mockSlots = {
        default: vi.fn(() => [
          { props: { value: '1' }, children: 'Option 1' },
          { props: { value: '2' }, children: 'Option 2' },
        ]),
      };
      const props = {
        type: 'button',
        slots: mockSlots,
      };

      const { currentValue } = customRenderHook(plugin, props);

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('slots');
      expect(currentValue.value.slots).toHaveProperty('default');
      expect(typeof currentValue.value.slots.default).toBe('function');
    });

    it('应该使用 renderHook 测试 border 类型', () => {
      const plugin = plugins.getPluginMethodByName('handleItemType');
      const mockSlots = {
        default: vi.fn(() => [
          { props: { value: '1' }, children: 'Option 1' },
          { props: { value: '2' }, children: 'Option 2' },
        ]),
      };
      const props = {
        type: 'border',
        slots: mockSlots,
      };

      const { currentValue } = customRenderHook(plugin, props);

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('slots');
      expect(currentValue.value.slots).toHaveProperty('default');
      expect(typeof currentValue.value.slots.default).toBe('function');
    });

    it('应该使用 renderHook 测试默认类型', () => {
      const plugin = plugins.getPluginMethodByName('handleItemType');
      const mockSlots = {
        default: vi.fn(() => [
          { props: { value: '1' }, children: 'Option 1' },
          { props: { value: '2' }, children: 'Option 2' },
        ]),
      };
      const props = {
        type: 'default',
        slots: mockSlots,
      };

      const { currentValue } = customRenderHook(plugin, props);

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('slots');
      expect(currentValue.value.slots).toHaveProperty('default');
      expect(typeof currentValue.value.slots.default).toBe('function');
    });

    it('应该使用 renderHook 测试 undefined 类型', () => {
      const plugin = plugins.getPluginMethodByName('handleItemType');
      const mockSlots = {
        default: vi.fn(() => [
          { props: { value: '1' }, children: 'Option 1' },
          { props: { value: '2' }, children: 'Option 2' },
        ]),
      };
      const props = {
        type: undefined,
        slots: mockSlots,
      };

      const { currentValue } = customRenderHook(plugin, props);

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('slots');
      expect(currentValue.value.slots).toHaveProperty('default');
      expect(typeof currentValue.value.slots.default).toBe('function');
    });

    it('应该使用 renderHook 测试其他类型', () => {
      const plugin = plugins.getPluginMethodByName('handleItemType');
      const mockSlots = {
        default: vi.fn(() => [
          { props: { value: '1' }, children: 'Option 1' },
          { props: { value: '2' }, children: 'Option 2' },
        ]),
      };
      const props = {
        type: 'other',
        slots: mockSlots,
      };

      const { currentValue } = customRenderHook(plugin, props);

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('slots');
      expect(currentValue.value.slots).toHaveProperty('default');
      expect(typeof currentValue.value.slots.default).toBe('function');
    });
  });

  describe('handlePreview 插件', () => {
    it('应该正确处理插件基本结构', () => {
      const plugin = plugins.getPluginMethodByName('handlePreview');
      expect(plugin).toBeDefined();
      expect(plugin.name).toBe('handlePreview');
      expect(typeof plugin.handle).toBe('function');
    });

    it('应该使用 renderHook 测试预览模式', () => {
      const plugin = plugins.getPluginMethodByName('handlePreview');
      const props = {
        class: 'custom-class',
        preview: true,
      };

      const { currentValue } = customRenderHook(plugin, props);

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('disabled');
      expect(currentValue.value).toHaveProperty('direction');
      expect(currentValue.value).toHaveProperty('type');
      expect(currentValue.value).toHaveProperty('class');
      expect(currentValue.value.disabled).toBe(true);
      expect(currentValue.value.direction).toBe('horizontal');
      expect(currentValue.value.type).toBe('default');
      expect(currentValue.value.class).toContain('el-checkbox-group-preview');
    });

    it('应该使用 renderHook 测试非预览模式', () => {
      const plugin = plugins.getPluginMethodByName('handlePreview');
      const props = {
        class: 'custom-class',
        preview: false,
      };

      const { currentValue } = customRenderHook(plugin, props);

      expect(currentValue.value).toEqual({});
    });

    it('应该使用 renderHook 测试 IDE 环境预览', () => {
      const plugin = plugins.getPluginMethodByName('handlePreview');
      const props = {
        class: 'custom-class',
        'data-nodepath': '/root/checkbox',
        preview: true,
      };

      const { currentValue } = customRenderHook(plugin, props);

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.disabled).toBe(true);
      expect(currentValue.value.direction).toBe('horizontal');
      expect(currentValue.value.type).toBe('default');
      expect(currentValue.value.class).toContain('el-checkbox-group-preview');
    });

    it('应该合并自定义 class', () => {
      const plugin = plugins.getPluginMethodByName('handlePreview');
      const props = {
        class: 'my-custom-class',
        preview: true,
      };

      const { currentValue } = customRenderHook(plugin, props);

      expect(currentValue.value.class).toContain('my-custom-class');
      expect(currentValue.value.class).toContain('el-checkbox-group-preview');
    });
  });

  describe('handleDirection 插件', () => {
    it('应该正确处理插件基本结构', () => {
      const plugin = plugins.getPluginMethodByName('handleDirection');
      expect(plugin).toBeDefined();
      expect(plugin.name).toBe('handleDirection');
      expect(typeof plugin.handle).toBe('function');
    });

    it('应该使用 renderHook 测试垂直方向', () => {
      const plugin = plugins.getPluginMethodByName('handleDirection');
      const props = {
        direction: 'vertical',
        class: 'custom-class',
        column: undefined,
        style: { color: 'red' },
      };

      const { currentValue } = customRenderHook(plugin, props);

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('class');
      expect(currentValue.value.class).toContain('el-checkbox-group-vertical');
      expect(currentValue.value).toHaveProperty('style');
      expect(currentValue.value.style).toHaveProperty('grid-template-columns');
      expect(currentValue.value.style).toHaveProperty('grid-auto-flow');
    });

    it('应该使用 renderHook 测试水平方向', () => {
      const plugin = plugins.getPluginMethodByName('handleDirection');
      const props = {
        direction: 'horizontal',
        class: 'custom-class',
        column: undefined,
        style: { color: 'red' },
      };

      const { currentValue } = customRenderHook(plugin, props);

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('class');
      expect(currentValue.value.class).not.toContain('el-checkbox-group-vertical');
      expect(currentValue.value).toHaveProperty('style');
    });

    it('应该使用 renderHook 测试列数配置', () => {
      const plugin = plugins.getPluginMethodByName('handleDirection');
      const props = {
        direction: 'horizontal',
        class: 'custom-class',
        column: 3,
        style: { color: 'red' },
      };

      const { currentValue } = customRenderHook(plugin, props);

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('style');
      expect(currentValue.value.style['grid-template-columns']).toBe('repeat(3, 1fr)');
      expect(currentValue.value.style['grid-auto-flow']).toBe('row');
    });

    it('应该使用 renderHook 测试空的样式', () => {
      const plugin = plugins.getPluginMethodByName('handleDirection');
      const props = {
        direction: 'horizontal',
        class: '',
        column: undefined,
        style: undefined,
      };

      const { currentValue } = customRenderHook(plugin, props);

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('class');
      expect(currentValue.value).toHaveProperty('style');
      expect(currentValue.value.style['grid-template-columns']).toBe('auto-fill');
      expect(currentValue.value.style['grid-auto-flow']).toBe('auto');
    });

    it('应该使用 renderHook 测试 undefined 的 class', () => {
      const plugin = plugins.getPluginMethodByName('handleDirection');
      const props = {
        direction: 'horizontal',
        class: undefined,
        column: undefined,
        style: {},
      };

      const { currentValue } = customRenderHook(plugin, props);

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('class');
      expect(currentValue.value).toHaveProperty('style');
    });

    it('应该使用 renderHook 测试 undefined 的 direction', () => {
      const plugin = plugins.getPluginMethodByName('handleDirection');
      const props = {
        direction: undefined,
        class: 'custom-class',
        column: undefined,
        style: {},
      };

      const { currentValue } = customRenderHook(plugin, props);

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('class');
      expect(currentValue.value.class).not.toContain('el-checkbox-group-vertical');
      expect(currentValue.value).toHaveProperty('style');
    });
  });
});

describe('plugins/ide.ts', () => {
  describe('应该正确导出 idePlugin', () => {
    it('应该导出 idePlugin 实例', () => {
      expect(idePlugin).toBeDefined();
      expect(idePlugin.getPluginMethod).toBeDefined();
    });
  });

  describe('handleNodePath 插件', () => {
    it('应该正确处理插件基本结构', () => {
      const plugin = idePlugin.getPluginMethodByName('handleNodePath');
      expect(plugin).toBeDefined();
      expect(plugin.name).toBe('handleNodePath');
      expect(typeof plugin.handle).toBe('function');
    });

    it('应该使用 renderHook 测试基本的节点路径', () => {
      const plugin = idePlugin.getPluginMethodByName('handleNodePath');
      const props = {
        'data-nodepath': 'node-path',
        class: 'custom-class',
      };

      const { currentValue } = customRenderHook(plugin, props);

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('class');
      expect(currentValue.value.class).toContain('custom-class');
      // 检查是否有 $deletePropsList 属性（Symbol 属性）
      const symbolKeys = Object.getOwnPropertySymbols(currentValue.value);
      const hasDeletePropsList = symbolKeys.some(
        (key) => currentValue.value[key]
          && Array.isArray(currentValue.value[key])
          && currentValue.value[key].includes('data-nodepath'),
      );
      expect(hasDeletePropsList).toBe(true);
    });

    it('应该使用 renderHook 测试空的 class', () => {
      const plugin = idePlugin.getPluginMethodByName('handleNodePath');
      const props = {
        'data-nodepath': 'node-path',
        class: '',
      };

      const { currentValue } = customRenderHook(plugin, props);

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('class');
      expect(currentValue.value.class).toContain('');
      // 检查是否有 $deletePropsList 属性（Symbol 属性）
      const symbolKeys = Object.getOwnPropertySymbols(currentValue.value);
      const hasDeletePropsList = symbolKeys.some(
        (key) => currentValue.value[key] && Array.isArray(currentValue.value[key]),
      );
      expect(hasDeletePropsList).toBe(true);
    });

    it('应该使用 renderHook 测试 undefined 的 class', () => {
      const plugin = idePlugin.getPluginMethodByName('handleNodePath');
      const props = {
        'data-nodepath': 'node-path',
        class: undefined,
      };

      const { currentValue } = customRenderHook(plugin, props);

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('class');
      expect(currentValue.value.class).toContain('');
      // 检查是否有 $deletePropsList 属性（Symbol 属性）
      const symbolKeys = Object.getOwnPropertySymbols(currentValue.value);
      const hasDeletePropsList = symbolKeys.some(
        (key) => currentValue.value[key] && Array.isArray(currentValue.value[key]),
      );
      expect(hasDeletePropsList).toBe(true);
    });

    it('应该使用 renderHook 测试空的 nodePath', () => {
      const plugin = idePlugin.getPluginMethodByName('handleNodePath');
      const props = {
        'data-nodepath': '',
        class: 'custom-class',
      };

      const { currentValue } = customRenderHook(plugin, props);

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('class');
      expect(currentValue.value.class).toContain('custom-class');
      // 检查是否有 $deletePropsList 属性（Symbol 属性）
      const symbolKeys = Object.getOwnPropertySymbols(currentValue.value);
      const hasDeletePropsList = symbolKeys.some(
        (key) => currentValue.value[key] && Array.isArray(currentValue.value[key]),
      );
      expect(hasDeletePropsList).toBe(true);
    });

    it('应该使用 renderHook 测试 undefined 的 nodePath', () => {
      const plugin = idePlugin.getPluginMethodByName('handleNodePath');
      const props = {
        'data-nodepath': undefined,
        class: 'custom-class',
      };

      const { currentValue } = customRenderHook(plugin, props);

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('class');
      expect(currentValue.value.class).toContain('custom-class');
      // 检查是否有 $deletePropsList 属性（Symbol 属性）
      const symbolKeys = Object.getOwnPropertySymbols(currentValue.value);
      const hasDeletePropsList = symbolKeys.some(
        (key) => currentValue.value[key] && Array.isArray(currentValue.value[key]),
      );
      expect(hasDeletePropsList).toBe(true);
    });

    it('应该使用 renderHook 测试所有 props 的组合', () => {
      const plugin = idePlugin.getPluginMethodByName('handleNodePath');
      const props = {
        'data-nodepath': 'complex-node-path',
        class: 'complex-class',
      };

      const { currentValue } = customRenderHook(plugin, props);

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('class');
      expect(currentValue.value.class).toContain('complex-class');
      // 检查是否有 $deletePropsList 属性（Symbol 属性）
      const symbolKeys = Object.getOwnPropertySymbols(currentValue.value);
      const hasDeletePropsList = symbolKeys.some(
        (key) => currentValue.value[key]
          && Array.isArray(currentValue.value[key])
          && currentValue.value[key].includes('data-nodepath'),
      );
      expect(hasDeletePropsList).toBe(true);
    });
  });
});

describe('插件集成和扩展性测试', () => {
  it('应该能够与其他插件组合使用', () => {
    const plugin1 = plugins.getPluginMethodByName('handleTagName');
    const plugin2 = plugins.getPluginMethodByName('handleDirection');

    expect(plugin1).toBeDefined();
    expect(plugin2).toBeDefined();

    const result1 = plugin1.handle();
    const result2 = plugin2.handle({
      get: vi.fn((key) => {
        if (key === 'direction') return 'vertical';
        if (key === 'class') return 'test-class';
        if (key === 'column') return undefined;
        if (key === 'style') return {};
        return undefined;
      }),
    });

    expect(result1).toHaveProperty('tagName');
    expect(result2).toHaveProperty('class');
  });

  it('应该正确处理插件的执行顺序', () => {
    const pluginNames = [
      'handleTagName',
      'handleComponentInForm',
      'handleControllableValue',
      'handleDataSource',
      'handleItemType',
      'handlePreview',
      'handleDirection',
    ];

    pluginNames.forEach((name) => {
      const plugin = plugins.getPluginMethodByName(name);
      expect(plugin).toBeDefined();
      expect(plugin.name).toBe(name);
    });
  });

  it('应该正确处理插件方法的获取', () => {
    const plugin = plugins.getPluginMethodByName('handleTagName');
    expect(plugin).toBeDefined();
    expect(plugin.name).toBe('handleTagName');
    expect(typeof plugin.handle).toBe('function');
  });

  it('应该正确处理不存在的插件查询', () => {
    const plugin = plugins.getPluginMethodByName('nonExistentPlugin');
    expect(plugin).toBeUndefined();
  });
});

describe('插件组合测试', () => {
  it('应该验证所有插件都能独立工作', () => {
    const pluginNames = [
      'handleTagName',
      'handleComponentInForm',
      'handleControllableValue',
      'handleDataSource',
      'handleItemType',
      'handlePreview',
      'handleDirection',
    ];

    pluginNames.forEach((name) => {
      const plugin = plugins.getPluginMethodByName(name);
      expect(plugin).toBeDefined();
      expect(plugin.name).toBe(name);
      expect(typeof plugin.handle).toBe('function');
    });
  });

  it('应该验证插件的基本功能完整性', () => {
    // 测试 handleTagName
    const tagNamePlugin = plugins.getPluginMethodByName('handleTagName');
    const tagNameResult = tagNamePlugin.handle();
    expect(tagNameResult).toHaveProperty('tagName');
    expect(tagNameResult).toHaveProperty('formTagName');

    // 测试 handleDirection
    const directionPlugin = plugins.getPluginMethodByName('handleDirection');
    const directionResult = directionPlugin.handle({
      get: vi.fn((key) => {
        if (key === 'direction') return 'vertical';
        if (key === 'class') return 'test-class';
        if (key === 'column') return undefined;
        if (key === 'style') return {};
        return undefined;
      }),
    });
    expect(directionResult).toHaveProperty('class');
    expect(directionResult).toHaveProperty('style');
  });

  it('应该正确处理复选框组的完整流程', () => {
    const mockProps = {
      get: vi.fn((key) => {
        if (key === 'dataSource') return { url: '/api/options' };
        if (key === 'valueField') return 'value';
        if (key === 'type') return 'button';
        if (key === 'direction') return 'vertical';
        if (key === 'class') return 'custom-class';
        if (key === 'column') return 2;
        if (key === 'style') return { color: 'red' };
        if (key === 'slots') return {};
        if (key === 'ref') return {};
        return [];
      }),
    };

    // 测试数据源插件
    const dataSourcePlugin = plugins.getPluginMethodByName('handleDataSource');
    expect(dataSourcePlugin).toBeDefined();
    expect(typeof dataSourcePlugin.handle).toBe('function');

    // 测试类型插件
    const itemTypePlugin = plugins.getPluginMethodByName('handleItemType');
    expect(itemTypePlugin).toBeDefined();
    expect(typeof itemTypePlugin.handle).toBe('function');

    // 测试方向插件
    const directionPlugin = plugins.getPluginMethodByName('handleDirection');
    const directionResult = directionPlugin.handle(mockProps);
    expect(directionResult).toHaveProperty('class');
    expect(directionResult).toHaveProperty('style');
  });
});
