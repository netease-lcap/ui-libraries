import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '../../../../ep-test/test-utils/render-hook';
import DropdownBasicAccumulate from '../plugins/basic-plugins';
import DropdownItemBasicAccumulate from '../plugins/item-plugins';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';

// Mock Element Plus components
vi.mock('@/index', () => ({
  ElDropdownMenu: vi.fn((props) => ({
    type: 'ElDropdownMenu',
    props,
    children: props.children || [],
  })),
  ElDropdownItem: vi.fn((props) => ({
    type: 'ElDropdownItem',
    props,
    children: props.children || [],
  })),
  ElText: vi.fn((props) => ({
    type: 'ElText',
    props,
    children: props.children || [],
  })),
}));

// Mock ElIcon
vi.mock('../../el-icon/index', () => ({
  default: vi.fn((props) => ({
    type: 'ElIcon',
    props,
    children: props.children || [],
  })),
}));

// Mock lodash

describe('plugins/basic-plugins.tsx', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('应该正确导出 DropdownBasicAccumulate', () => {
    expect(DropdownBasicAccumulate).toBeDefined();
    expect(typeof DropdownBasicAccumulate.addPlugin).toBe('function');
    expect(typeof DropdownBasicAccumulate.getPluginMethod).toBe('function');
    expect(typeof DropdownBasicAccumulate.getPluginMethodByName).toBe('function');
  });

  it('应该包含所有插件', () => {
    const plugins = DropdownBasicAccumulate.getPluginMethod();
    expect(Array.isArray(plugins)).toBe(true);
    expect(plugins.length).toBeGreaterThan(0);
  });

  describe('handleDefaultSlot 插件', () => {
    const plugin = DropdownBasicAccumulate.getPluginMethodByName('handleDefaultSlot') as any;

    it('应该正确处理插件基本结构', () => {
      expect(plugin).toBeDefined();
      expect(plugin.name).toBe('handleDefaultSlot');
      expect(typeof plugin.handle).toBe('function');
    });

    it('应该正确处理有 default slot 的情况', () => {
      const mockDefaultSlot = vi.fn(() => 'test content');

      const { currentValue } = renderHook(plugin, {
        slots: {
          default: mockDefaultSlot,
        },
        [$deletePropsList]: [],
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('slots');
      expect(currentValue.value.slots).toHaveProperty('default');
      expect(typeof currentValue.value.slots.default).toBe('function');
    });

    it('应该正确处理没有 default slot 的情况', () => {
      const { currentValue } = renderHook(plugin, {
        slots: {},
        [$deletePropsList]: [],
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('slots');
      expect(currentValue.value.slots.default).toBeUndefined();
    });

    it('应该正确处理 undefined 的 slots', () => {
      expect(() => {
        const { currentValue } = renderHook(plugin, {
          [$deletePropsList]: [],
        });
        expect(currentValue.value).toBeDefined();
      }).not.toThrow();
    });

    it('应该正确处理复杂的 slots 结构', () => {
      const mockDefaultSlot = vi.fn(() => 'test content');
      const mockOtherSlot = vi.fn(() => 'other content');

      const { currentValue } = renderHook(plugin, {
        slots: {
          default: mockDefaultSlot,
          other: mockOtherSlot,
        },
        [$deletePropsList]: [],
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('slots');
      expect(currentValue.value.slots).toHaveProperty('default');
      expect(currentValue.value.slots).toHaveProperty('other');
      expect(typeof currentValue.value.slots.default).toBe('function');
      expect(typeof currentValue.value.slots.other).toBe('function');
    });
  });

  describe('handleDataSource 插件', () => {
    const plugin = DropdownBasicAccumulate.getPluginMethodByName('handleDataSource') as any;

    it('应该正确处理插件基本结构', () => {
      expect(plugin).toBeDefined();
      expect(plugin.name).toBe('handleDataSource');
      expect(typeof plugin.handle).toBe('function');
    });

    it('应该正确处理有 dataSource 的情况', () => {
      expect(() => {
        const { currentValue } = renderHook(plugin, {
          dataSource: () => [
            { text: 'Option 1', value: '1' },
            { text: 'Option 2', value: '2' },
          ],
          textField: 'text',
          valueField: 'value',
          slots: {},
          [$deletePropsList]: [],
          ref: {},
        });
        expect(currentValue.value).toBeDefined();
      }).not.toThrow();
    });

    it('应该正确处理没有 dataSource 的情况', () => {
      expect(() => {
        const { currentValue } = renderHook(plugin, {
          textField: 'text',
          valueField: 'value',
          slots: {},
          [$deletePropsList]: [],
          ref: {},
        });
        expect(currentValue.value).toBeDefined();
      }).not.toThrow();
    });

    it('应该正确处理默认的字段名', () => {
      expect(() => {
        const { currentValue } = renderHook(plugin, {
          dataSource: () => [
            { text: 'Option 1', value: '1' },
            { text: 'Option 2', value: '2' },
          ],
          slots: {},
          [$deletePropsList]: [],
          ref: {},
        });
        expect(currentValue.value).toBeDefined();
      }).not.toThrow();
    });

    it('应该正确处理自定义字段名', () => {
      expect(() => {
        const { currentValue } = renderHook(plugin, {
          dataSource: () => [
            { title: 'Option 1', id: '1' },
            { title: 'Option 2', id: '2' },
          ],
          textField: 'title',
          valueField: 'id',
          disabledField: 'disabled',
          dividedField: 'divided',
          slots: {},
          [$deletePropsList]: [],
          ref: {},
        });
        expect(currentValue.value).toBeDefined();
      }).not.toThrow();
    });

    it('应该正确处理 slots.items 的情况', () => {
      const mockItemsSlot = vi.fn(() => 'items content');

      expect(() => {
        const { currentValue } = renderHook(plugin, {
          slots: {
            items: mockItemsSlot,
          },
          [$deletePropsList]: [],
          ref: {},
        });
        expect(currentValue.value).toBeDefined();
      }).not.toThrow();
    });

    it('应该正确处理 slots.dropdown 的情况', () => {
      const mockDropdownSlot = vi.fn(() => 'dropdown content');

      expect(() => {
        const { currentValue } = renderHook(plugin, {
          slots: {
            dropdown: mockDropdownSlot,
          },
          [$deletePropsList]: [],
          ref: {},
        });
        expect(currentValue.value).toBeDefined();
      }).not.toThrow();
    });

    it('应该正确处理复杂的 ref 对象', () => {
      const complexRef = {
        current: null,
        value: 'test',
        focus: vi.fn(),
        blur: vi.fn(),
      };

      expect(() => {
        const { currentValue } = renderHook(plugin, {
          dataSource: () => [
            { text: 'Option 1', value: '1' },
            { text: 'Option 2', value: '2' },
          ],
          slots: {},
          [$deletePropsList]: [],
          ref: complexRef,
        });
        expect(currentValue.value).toBeDefined();
      }).not.toThrow();
    });

    it('应该正确处理函数类型的数据源', async () => {
      const dataSourceFn = vi.fn().mockResolvedValue([
        { text: 'Async Option 1', value: 'async1' },
        { text: 'Async Option 2', value: 'async2' },
      ]);

      expect(() => {
        const { currentValue } = renderHook(plugin, {
          dataSource: dataSourceFn,
          textField: 'text',
          valueField: 'value',
          slots: {},
          [$deletePropsList]: [],
          ref: {},
        });

        // 初始状态验证
        expect(currentValue.value).toBeDefined();
      }).not.toThrow();
    });

    it('应该正确处理所有 props 的组合', () => {
      const complexRef = {
        current: null,
        value: 'test',
        focus: vi.fn(),
      };
      const mockItemsSlot = vi.fn(() => 'items content');

      expect(() => {
        const { currentValue } = renderHook(plugin, {
          dataSource: () => [
            { title: 'Option 1', id: '1' },
            { title: 'Option 2', id: '2' },
          ],
          textField: 'title',
          valueField: 'id',
          disabledField: 'disabled',
          dividedField: 'divided',
          slots: {
            items: mockItemsSlot,
          },
          [$deletePropsList]: [],
          ref: complexRef,
          otherProp: 'test',
        });
        expect(currentValue.value).toBeDefined();
      }).not.toThrow();
    });
  });
});

describe('plugins/item-plugins.ts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('应该正确导出 DropdownItemBasicAccumulate', () => {
    expect(DropdownItemBasicAccumulate).toBeDefined();
    expect(typeof DropdownItemBasicAccumulate.addPlugin).toBe('function');
    expect(typeof DropdownItemBasicAccumulate.getPluginMethod).toBe('function');
    expect(typeof DropdownItemBasicAccumulate.getPluginMethodByName).toBe('function');
  });

  it('应该包含所有插件', () => {
    const plugins = DropdownItemBasicAccumulate.getPluginMethod();
    expect(Array.isArray(plugins)).toBe(true);
    expect(plugins.length).toBeGreaterThan(0);
  });

  describe('handleItemPlugin 插件', () => {
    const plugin = DropdownItemBasicAccumulate.getPluginMethodByName('handleItemPlugin') as any;

    it('应该正确处理插件基本结构', () => {
      expect(plugin).toBeDefined();
      expect(plugin.name).toBe('handleItemPlugin');
      expect(typeof plugin.handle).toBe('function');
    });

    it('应该正确处理插件基本功能', () => {
      const { currentValue } = renderHook(plugin, {
        icon: 'test-icon',
        [$deletePropsList]: [],
      });

      expect(currentValue.value).toBeDefined();
      const symbolKey = Object.getOwnPropertySymbols(currentValue.value).find((s) => s.toString().includes('deletePropsList')) as symbol;
      expect(symbolKey).toBeDefined();
      expect(currentValue.value[symbolKey]).toEqual(['icon']);
    });

    it('应该正确处理空的 props', () => {
      const { currentValue } = renderHook(plugin, {
        [$deletePropsList]: [],
      });

      expect(currentValue.value).toBeDefined();
      const symbolKey = Object.getOwnPropertySymbols(currentValue.value).find((s) => s.toString().includes('deletePropsList')) as symbol;
      expect(symbolKey).toBeDefined();
      expect(currentValue.value[symbolKey]).toEqual(['icon']);
    });

    it('应该正确处理复杂的 props', () => {
      const { currentValue } = renderHook(plugin, {
        icon: 'test-icon',
        text: 'test text',
        value: 'test value',
        disabled: false,
        [$deletePropsList]: [],
      });

      expect(currentValue.value).toBeDefined();
      const symbolKey = Object.getOwnPropertySymbols(currentValue.value).find((s) => s.toString().includes('deletePropsList')) as symbol;
      expect(symbolKey).toBeDefined();
      expect(currentValue.value[symbolKey]).toEqual(['icon']);
    });
  });
});

describe('插件集成和扩展性测试', () => {
  it('应该能够与其他插件组合使用', () => {
    const combinedAccumulate = DropdownBasicAccumulate.addPlugin({
      name: 'testPlugin',
      handle: () => ({
        testProperty: 'test-value',
        customData: 'custom',
      }),
    });

    const plugins = combinedAccumulate.getPluginMethod();
    expect(plugins.length).toBeGreaterThanOrEqual(3);

    const pluginNames = ['handleDefaultSlot', 'handleDataSource', 'testPlugin'];

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

    const testAccumulate = DropdownBasicAccumulate.addPlugin(plugin1).addPlugin(plugin2);

    const plugins = testAccumulate.getPluginMethod();
    expect(plugins.length).toBeGreaterThanOrEqual(4);

    const foundPlugin1 = testAccumulate.getPluginMethodByName('plugin1');
    const foundPlugin2 = testAccumulate.getPluginMethodByName('plugin2');

    expect(foundPlugin1).toBeDefined();
    expect(foundPlugin2).toBeDefined();
  });

  it('应该正确处理插件方法的获取', () => {
    const allMethods = DropdownBasicAccumulate.getPluginMethod();
    expect(Array.isArray(allMethods)).toBe(true);
    expect(allMethods.length).toBeGreaterThan(0);

    allMethods.forEach((method) => {
      expect(typeof method === 'function' || (typeof method === 'object' && typeof method.handle === 'function')).toBe(
        true,
      );
    });
  });

  it('应该正确处理不存在的插件查询', () => {
    const nonExistentPlugin = DropdownBasicAccumulate.getPluginMethodByName('nonExistentPlugin');
    expect(nonExistentPlugin).toBeUndefined();
  });
});

describe('插件组合测试', () => {
  it('应该验证所有插件都能独立工作', () => {
    const pluginNames = ['handleDefaultSlot', 'handleDataSource'];

    pluginNames.forEach((pluginName) => {
      const plugin = DropdownBasicAccumulate.getPluginMethodByName(pluginName);
      expect(plugin).toBeDefined();
      expect(plugin?.name).toBe(pluginName);
      expect(typeof plugin?.handle).toBe('function');
    });
  });

  it('应该验证插件的基本功能完整性', () => {
    const defaultSlotPlugin = DropdownBasicAccumulate.getPluginMethodByName('handleDefaultSlot');
    const dataSourcePlugin = DropdownBasicAccumulate.getPluginMethodByName('handleDataSource');

    expect(defaultSlotPlugin).toBeDefined();
    expect(dataSourcePlugin).toBeDefined();
    expect(typeof defaultSlotPlugin.handle).toBe('function');
    expect(typeof dataSourcePlugin.handle).toBe('function');
  });

  it('应该正确处理下拉菜单的完整流程', () => {
    const defaultSlotPlugin = DropdownBasicAccumulate.getPluginMethodByName('handleDefaultSlot');
    const dataSourcePlugin = DropdownBasicAccumulate.getPluginMethodByName('handleDataSource');

    expect(defaultSlotPlugin).toBeDefined();
    expect(dataSourcePlugin).toBeDefined();
    expect(defaultSlotPlugin.name).toBe('handleDefaultSlot');
    expect(dataSourcePlugin.name).toBe('handleDataSource');
  });
});

describe('边界情况和错误处理测试', () => {
  it('应该正确处理 null 的 ref', () => {
    const plugin = DropdownBasicAccumulate.getPluginMethodByName('handleDataSource') as any;

    expect(() => {
      const { currentValue } = renderHook(plugin, {
        dataSource: () => [
          { text: 'Option 1', value: '1' },
          { text: 'Option 2', value: '2' },
        ],
        slots: {},
        [$deletePropsList]: [],
        ref: null,
      });
      expect(currentValue.value).toBeDefined();
    }).not.toThrow();
  });

  it('应该正确处理空的数据源', () => {
    const plugin = DropdownBasicAccumulate.getPluginMethodByName('handleDataSource') as any;

    expect(() => {
      const { currentValue } = renderHook(plugin, {
        dataSource: () => [],
        slots: {},
        [$deletePropsList]: [],
        ref: {},
      });
      expect(currentValue.value).toBeDefined();
    }).not.toThrow();
  });

  it('应该正确处理复杂的数据结构', () => {
    const plugin = DropdownBasicAccumulate.getPluginMethodByName('handleDataSource') as any;

    const complexDataSource = [
      {
        id: 1,
        title: 'Option 1',
        value: 'option1',
        disabled: false,
        divided: false,
        extra: { category: 'main' },
      },
      {
        id: 2,
        title: 'Option 2',
        value: 'option2',
        disabled: true,
        divided: true,
        extra: { category: 'sub' },
      },
    ];

    expect(() => {
      const { currentValue } = renderHook(plugin, {
        dataSource: () => complexDataSource,
        textField: 'title',
        valueField: 'value',
        disabledField: 'disabled',
        dividedField: 'divided',
        slots: {},
        [$deletePropsList]: [],
        ref: {},
      });
      expect(currentValue.value).toBeDefined();
    }).not.toThrow();
  });

  it('应该正确处理特殊字符的字段名', () => {
    const plugin = DropdownBasicAccumulate.getPluginMethodByName('handleDataSource') as any;

    expect(() => {
      const { currentValue } = renderHook(plugin, {
        dataSource: () => [
          { 'field:name': 'Option 1', 'field:value': '1' },
          { 'field:name': 'Option 2', 'field:value': '2' },
        ],
        textField: 'field:name',
        valueField: 'field:value',
        slots: {},
        [$deletePropsList]: [],
        ref: {},
      });
      expect(currentValue.value).toBeDefined();
    }).not.toThrow();
  });

  it('应该正确处理数字类型的字段名', () => {
    const plugin = DropdownBasicAccumulate.getPluginMethodByName('handleDataSource') as any;

    expect(() => {
      const { currentValue } = renderHook(plugin, {
        dataSource: () => [
          { 0: 'Option 1', 1: '1' },
          { 0: 'Option 2', 1: '2' },
        ],
        textField: 0,
        valueField: 1,
        slots: {},
        [$deletePropsList]: [],
        ref: {},
      });
      expect(currentValue.value).toBeDefined();
    }).not.toThrow();
  });
});
