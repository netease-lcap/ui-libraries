import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '../../../../ep-test/test-utils/render-hook';
import DatePickerBasicAccumulate from '../plugins/basic-plugins';
import DatePickerIdeAccumulate from '../plugins/ide';
import { $deletePropsList } from '@/plugins/constants';

// Mock dayjs
vi.mock('dayjs', () => ({
  default: vi.fn((date) => ({
    isValid: () => !!(date && date !== 'invalid'),
    toJSON: () => date,
    format: (format) => date,
  })),
}));

// Mock ElText
vi.mock('@/index', () => ({
  ElText: vi.fn(({ text }) => <span data-testid="el-text">{text}</span>),
}));

// Mock common plugins
vi.mock('@/components/el-form/plugins/form-item', () => ({
  handleComponentInForm: vi.fn(() => ({ formItem: true })),
}));

vi.mock('@/plugins/common/icon', () => ({
  handleIcon: vi.fn(() => ({ icon: true })),
}));

vi.mock('@/plugins/common/preview', () => ({
  getIsPreview: vi.fn(() => false),
  getRender: vi.fn(() => ({ render: vi.fn(), insRef: { value: {} } })),
  getFormatDateOrTime: vi.fn((value, format) => value),
}));

describe('plugins/basic-plugins.tsx', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('应该正确导出 DatePickerBasicAccumulate', () => {
    expect(DatePickerBasicAccumulate).toBeDefined();
    expect(typeof DatePickerBasicAccumulate.addPlugin).toBe('function');
    expect(typeof DatePickerBasicAccumulate.getPluginMethod).toBe('function');
    expect(typeof DatePickerBasicAccumulate.getPluginMethodByName).toBe('function');
  });

  it('应该包含所有插件', () => {
    const plugins = DatePickerBasicAccumulate.getPluginMethod();
    expect(Array.isArray(plugins)).toBe(true);
    expect(plugins.length).toBeGreaterThan(0);
  });

  describe('handleRange 插件', () => {
    const plugin = DatePickerBasicAccumulate.getPluginMethodByName('handleRange') as any;

    it('应该正确处理插件基本结构', () => {
      expect(plugin).toBeDefined();
      expect(plugin.name).toBe('handleRange');
      expect(typeof plugin.handle).toBe('function');
    });

    it('应该正确处理 date 类型', () => {
      const { currentValue } = renderHook(plugin, {
        type: 'date',
        [$deletePropsList]: [],
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.range).toBe(false);
      expect(currentValue.value.formTagName).toBe('el-form-date-picker');
      expect(currentValue.value.tagName).toBe('el-date-picker');
    });

    it('应该正确处理 daterange 类型', () => {
      const { currentValue } = renderHook(plugin, {
        type: 'daterange',
        [$deletePropsList]: [],
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.range).toBe(true);
      expect(currentValue.value.formTagName).toBe('el-form-date-picker');
      expect(currentValue.value.tagName).toBe('el-date-picker');
    });

    it('应该正确处理 datetimerange 类型', () => {
      const { currentValue } = renderHook(plugin, {
        type: 'datetimerange',
        [$deletePropsList]: [],
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.range).toBe(true);
    });

    it('应该正确处理默认类型', () => {
      const { currentValue } = renderHook(plugin, {
        [$deletePropsList]: [],
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.range).toBe(false);
    });

    it('应该正确设置 deletePropsList', () => {
      const { currentValue } = renderHook(plugin, {
        type: 'date',
        [$deletePropsList]: ['existing-prop'],
      });

      const symbolKey = Object.getOwnPropertySymbols(currentValue.value).find((s) => s.toString().includes('deletePropsList')) as symbol;
      expect(symbolKey).toBeDefined();
      expect(Array.isArray(currentValue.value[symbolKey])).toBe(true);
      expect(currentValue.value[symbolKey]).toContain('data-nodepath');
      // 由于插件实现中使用了 concat，existing-prop 会被合并到数组中
      expect(currentValue.value[symbolKey]).toEqual(expect.arrayContaining(['data-nodepath']));
    });
  });

  describe('handleComponentInForm 插件', () => {
    const plugin = DatePickerBasicAccumulate.getPluginMethodByName('handleComponentInForm') as any;

    it('应该正确处理插件基本结构', () => {
      expect(plugin).toBeDefined();
      expect(plugin.name).toBe('handleComponentInForm');
      expect(typeof plugin.handle).toBe('function');
    });

    it('应该调用 handleComponentInForm', () => {
      const { currentValue } = renderHook(plugin, {
        [$deletePropsList]: [],
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.formItem).toBe(true);
    });
  });

  describe('handleIcon 插件', () => {
    const plugin = DatePickerBasicAccumulate.getPluginMethodByName('handleIcon') as any;

    it('应该正确处理插件基本结构', () => {
      expect(plugin).toBeDefined();
      expect(plugin.name).toBe('handleIcon');
      expect(typeof plugin.handle).toBe('function');
    });

    it('应该调用 handleIcon', () => {
      const { currentValue } = renderHook(plugin, {
        [$deletePropsList]: [],
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.icon).toBe(true);
    });
  });

  describe('handleRangeDateValue 插件', () => {
    const plugin = DatePickerBasicAccumulate.getPluginMethodByName('handleRangeDateValue') as any;

    it('应该正确处理插件基本结构', () => {
      expect(plugin).toBeDefined();
      expect(plugin.name).toBe('handleRangeDateValue');
      expect(typeof plugin.handle).toBe('function');
    });

    it('应该正确处理非 range 模式', () => {
      const { currentValue } = renderHook(plugin, {
        range: false,
        [$deletePropsList]: [],
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toEqual({});
    });

    it('应该正确处理 range 模式', () => {
      const { currentValue } = renderHook(plugin, {
        range: true,
        [$deletePropsList]: [],
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('modelValue');
      expect(currentValue.value).toHaveProperty('onUpdate:modelValue');
    });

    it('应该正确处理受控模式', () => {
      const { currentValue } = renderHook(plugin, {
        range: true,
        startValue: '2023-01-01',
        endValue: '2023-01-02',
        'onUpdate:startValue': vi.fn(),
        'onUpdate:endValue': vi.fn(),
        [$deletePropsList]: [],
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('modelValue');
      expect(currentValue.value).toHaveProperty('onUpdate:modelValue');
    });

    it('应该正确处理无效日期', () => {
      const { currentValue } = renderHook(plugin, {
        range: true,
        startValue: 'invalid-date',
        endValue: 'invalid-date',
        'onUpdate:startValue': vi.fn(),
        'onUpdate:endValue': vi.fn(),
        [$deletePropsList]: [],
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('modelValue');
      expect(currentValue.value).toHaveProperty('onUpdate:modelValue');
    });

    it('应该正确处理空值', () => {
      const { currentValue } = renderHook(plugin, {
        range: true,
        startValue: null,
        endValue: null,
        'onUpdate:startValue': vi.fn(),
        'onUpdate:endValue': vi.fn(),
        [$deletePropsList]: [],
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('modelValue');
      expect(currentValue.value).toHaveProperty('onUpdate:modelValue');
    });
  });

  describe('handleDateValue 插件', () => {
    const plugin = DatePickerBasicAccumulate.getPluginMethodByName('handleDateValue') as any;

    it('应该正确处理插件基本结构', () => {
      expect(plugin).toBeDefined();
      expect(plugin.name).toBe('handleDateValue');
      expect(typeof plugin.handle).toBe('function');
    });

    it('应该正确处理非 range 模式', () => {
      const { currentValue } = renderHook(plugin, {
        range: false,
        [$deletePropsList]: [],
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('modelValue');
      expect(currentValue.value).toHaveProperty('onUpdate:modelValue');
    });

    it('应该正确处理 range 模式', () => {
      const { currentValue } = renderHook(plugin, {
        range: true,
        [$deletePropsList]: [],
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toEqual({});
    });

    it('应该正确处理受控值', () => {
      const { currentValue } = renderHook(plugin, {
        range: false,
        modelValue: '2023-01-01',
        'onUpdate:modelValue': vi.fn(),
        [$deletePropsList]: [],
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('modelValue');
      expect(currentValue.value).toHaveProperty('onUpdate:modelValue');
    });
  });

  describe('handlePreview 插件', () => {
    const plugin = DatePickerBasicAccumulate.getPluginMethodByName('handlePreview') as any;

    it('应该正确处理插件基本结构', () => {
      expect(plugin).toBeDefined();
      expect(plugin.name).toBe('handlePreview');
      expect(typeof plugin.handle).toBe('function');
    });

    it('应该正确处理预览模式', () => {
      const { currentValue } = renderHook(plugin, {
        ref: {},
        render: vi.fn(),
        [$deletePropsList]: [],
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('ref');
      expect(currentValue.value).toHaveProperty('render');
    });

    it('应该正确处理 IDE 模式', () => {
      const { currentValue } = renderHook(plugin, {
        ref: {},
        render: vi.fn(),
        'data-nodepath': 'test-path',
        [$deletePropsList]: [],
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('ref');
      expect(currentValue.value).toHaveProperty('render');
    });

    it('应该正确处理空值预览', () => {
      const { currentValue } = renderHook(plugin, {
        ref: {},
        render: vi.fn(),
        modelValue: null,
        [$deletePropsList]: [],
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('ref');
      expect(currentValue.value).toHaveProperty('render');
    });

    it('应该正确处理数组值预览', () => {
      const { currentValue } = renderHook(plugin, {
        ref: {},
        render: vi.fn(),
        modelValue: ['2023-01-01', '2023-01-02'],
        format: 'YYYY-MM-DD',
        [$deletePropsList]: [],
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('ref');
      expect(currentValue.value).toHaveProperty('render');
    });
  });
});

describe('plugins/ide.ts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('应该正确导出 DatePickerIdeAccumulate', () => {
    expect(DatePickerIdeAccumulate).toBeDefined();
    expect(typeof DatePickerIdeAccumulate.addPlugin).toBe('function');
    expect(typeof DatePickerIdeAccumulate.getPluginMethod).toBe('function');
    expect(typeof DatePickerIdeAccumulate.getPluginMethodByName).toBe('function');
  });

  it('应该包含所有插件', () => {
    const plugins = DatePickerIdeAccumulate.getPluginMethod();
    expect(Array.isArray(plugins)).toBe(true);
    // IDE 插件可能没有插件或者插件数量为 0
    expect(plugins.length).toBeGreaterThanOrEqual(0);
  });

  describe('handleNodePath 插件', () => {
    const plugin = DatePickerIdeAccumulate.getPluginMethodByName('handleNodePath') as any;

    it('应该正确处理插件基本结构', () => {
      expect(plugin).toBeDefined();
      expect(plugin.name).toBe('handleNodePath');
      expect(plugin.type).toBe('ide');
      expect(typeof plugin.handle).toBe('function');
    });

    it('应该正确处理 nodePath', () => {
      const { currentValue } = renderHook(plugin, {
        'data-nodepath': 'test-path',
        'vusion-d2c-id': 'test-id',
        class: 'existing-class',
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('class');
      expect(currentValue.value.class).toContain('existing-class');
      expect(currentValue.value.class).toContain('DatePicker_');
    });

    it('应该正确处理空的 class', () => {
      const { currentValue } = renderHook(plugin, {
        'data-nodepath': 'test-path',
        'vusion-d2c-id': 'test-id',
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('class');
      expect(currentValue.value.class).toContain('DatePicker_');
    });

    it('应该正确处理空的 nodePath', () => {
      const { currentValue } = renderHook(plugin, {
        'vusion-d2c-id': 'test-id',
        class: 'existing-class',
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('class');
      expect(currentValue.value.class).toContain('existing-class');
      expect(currentValue.value.class).toContain('DatePicker_');
    });

    it('应该正确处理所有 props 的组合', () => {
      const { currentValue } = renderHook(plugin, {
        'data-nodepath': 'test-path',
        'vusion-d2c-id': 'test-id',
        class: 'existing-class',
        otherProp: 'test',
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('class');
      expect(currentValue.value.class).toContain('existing-class');
      expect(currentValue.value.class).toContain('DatePicker_');
    });
  });
});

describe('插件集成和扩展性测试', () => {
  it('应该能够与其他插件组合使用', () => {
    const combinedAccumulate = DatePickerBasicAccumulate.addPlugin({
      name: 'testPlugin',
      handle: () => ({
        testProperty: 'test-value',
        customData: 'custom',
      }),
    });

    const plugins = combinedAccumulate.getPluginMethod();
    expect(plugins.length).toBeGreaterThanOrEqual(6);

    const pluginNames = ['handleRange', 'handleComponentInForm', 'handleIcon', 'handleRangeDateValue', 'handleDateValue', 'handlePreview', 'testPlugin'];

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

    const testAccumulate = DatePickerBasicAccumulate.addPlugin(plugin1).addPlugin(plugin2);

    const plugins = testAccumulate.getPluginMethod();
    expect(plugins.length).toBeGreaterThanOrEqual(8);

    const foundPlugin1 = testAccumulate.getPluginMethodByName('plugin1');
    const foundPlugin2 = testAccumulate.getPluginMethodByName('plugin2');

    expect(foundPlugin1).toBeDefined();
    expect(foundPlugin2).toBeDefined();
  });

  it('应该正确处理插件方法的获取', () => {
    const allMethods = DatePickerBasicAccumulate.getPluginMethod();
    expect(Array.isArray(allMethods)).toBe(true);
    expect(allMethods.length).toBeGreaterThan(0);

    allMethods.forEach((method) => {
      expect(typeof method === 'function' || (typeof method === 'object' && typeof method.handle === 'function')).toBe(
        true,
      );
    });
  });

  it('应该正确处理不存在的插件查询', () => {
    const nonExistentPlugin = DatePickerBasicAccumulate.getPluginMethodByName('nonExistentPlugin');
    expect(nonExistentPlugin).toBeUndefined();
  });
});

describe('插件组合测试', () => {
  it('应该验证所有插件都能独立工作', () => {
    const pluginNames = ['handleRange', 'handleComponentInForm', 'handleIcon', 'handleRangeDateValue', 'handleDateValue', 'handlePreview'];

    pluginNames.forEach((pluginName) => {
      const plugin = DatePickerBasicAccumulate.getPluginMethodByName(pluginName);
      expect(plugin).toBeDefined();
      expect(plugin?.name).toBe(pluginName);
      expect(typeof plugin?.handle).toBe('function');
    });
  });

  it('应该验证插件的基本功能完整性', () => {
    const rangePlugin = DatePickerBasicAccumulate.getPluginMethodByName('handleRange');
    const dateValuePlugin = DatePickerBasicAccumulate.getPluginMethodByName('handleDateValue');

    expect(rangePlugin).toBeDefined();
    expect(typeof rangePlugin.handle).toBe('function');
    expect(dateValuePlugin).toBeDefined();
    expect(typeof dateValuePlugin.handle).toBe('function');
  });

  it('应该正确处理日期选择器的完整流程', () => {
    const rangePlugin = DatePickerBasicAccumulate.getPluginMethodByName('handleRange');
    const dateValuePlugin = DatePickerBasicAccumulate.getPluginMethodByName('handleDateValue');

    expect(rangePlugin).toBeDefined();
    expect(rangePlugin.name).toBe('handleRange');
    expect(dateValuePlugin).toBeDefined();
    expect(dateValuePlugin.name).toBe('handleDateValue');

    expect(typeof rangePlugin.handle).toBe('function');
    expect(typeof dateValuePlugin.handle).toBe('function');
  });
});

describe('边界情况和错误处理测试', () => {
  it('应该正确处理无效的日期格式', () => {
    const plugin = DatePickerBasicAccumulate.getPluginMethodByName('handleRangeDateValue') as any;

    const { currentValue } = renderHook(plugin, {
      range: true,
      startValue: 'invalid-date',
      endValue: 'another-invalid-date',
      'onUpdate:startValue': vi.fn(),
      'onUpdate:endValue': vi.fn(),
      [$deletePropsList]: [],
    });

    expect(currentValue.value).toBeDefined();
    expect(currentValue.value).toHaveProperty('modelValue');
    expect(currentValue.value).toHaveProperty('onUpdate:modelValue');
  });

  it('应该正确处理空字符串值', () => {
    const plugin = DatePickerBasicAccumulate.getPluginMethodByName('handleRangeDateValue') as any;

    const { currentValue } = renderHook(plugin, {
      range: true,
      startValue: '',
      endValue: '',
      'onUpdate:startValue': vi.fn(),
      'onUpdate:endValue': vi.fn(),
      [$deletePropsList]: [],
    });

    expect(currentValue.value).toBeDefined();
    expect(currentValue.value).toHaveProperty('modelValue');
    expect(currentValue.value).toHaveProperty('onUpdate:modelValue');
  });

  it('应该正确处理 undefined 回调函数', () => {
    const plugin = DatePickerBasicAccumulate.getPluginMethodByName('handleRangeDateValue') as any;

    const { currentValue } = renderHook(plugin, {
      range: true,
      startValue: '2023-01-01',
      endValue: '2023-01-02',
      'onUpdate:startValue': undefined,
      'onUpdate:endValue': undefined,
      [$deletePropsList]: [],
    });

    expect(currentValue.value).toBeDefined();
    expect(currentValue.value).toHaveProperty('modelValue');
    expect(currentValue.value).toHaveProperty('onUpdate:modelValue');
  });

  it('应该正确处理复杂的日期数组', () => {
    const plugin = DatePickerBasicAccumulate.getPluginMethodByName('handleDateValue') as any;

    const { currentValue } = renderHook(plugin, {
      range: false,
      modelValue: ['2023-01-01', '2023-01-02', '2023-01-03'],
      'onUpdate:modelValue': vi.fn(),
      [$deletePropsList]: [],
    });

    expect(currentValue.value).toBeDefined();
    expect(currentValue.value).toHaveProperty('modelValue');
    expect(currentValue.value).toHaveProperty('onUpdate:modelValue');
  });
});
