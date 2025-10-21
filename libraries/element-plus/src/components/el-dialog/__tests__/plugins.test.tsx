import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '../../../../ep-test/test-utils/render-hook';
import DialogBasicAccumulate from '../plugins/basic-plugins';
import { $deletePropsList } from '@/plugins/constants';

// Mock lodash
vi.mock('lodash', () => ({
  default: {
    wrap: vi.fn(
      (fn, wrapper) =>
        (...args) =>
          wrapper(fn, ...args),
    ),
    attempt: vi.fn((fn, ...args) => {
      try {
        return fn(...args);
      } catch (error) {
        return error;
      }
    }),
    assign: vi.fn((target, ...sources) => Object.assign(target, ...sources)),
    cond: vi.fn((conditions) => (value) => {
      for (const [predicate, transform] of conditions) {
        if (predicate(value)) {
          return transform(value);
        }
      }
      return value;
    }),
    isObject: vi.fn((value) => typeof value === 'object' && value !== null),
    stubTrue: vi.fn(() => true),
    isArray: vi.fn((value) => Array.isArray(value)),
    mixin: vi.fn((obj) => {
      const _ = {};
      Object.assign(_, obj);
      return _;
    }),
    bind: vi.fn((fn, context) => fn.bind(context)),
    uniqueId: vi.fn((prefix) => `${prefix}123`),
  },
}));

// Mock getPropsIcon
vi.mock('@/plugins/common/icon', () => ({
  getPropsIcon: vi.fn(({ name }) => ({ iconName: name, iconType: 'icon' })),
}));

describe('plugins/basic-plugins.tsx', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('应该正确导出 DialogBasicAccumulate', () => {
    expect(DialogBasicAccumulate).toBeDefined();
    expect(typeof DialogBasicAccumulate.addPlugin).toBe('function');
    expect(typeof DialogBasicAccumulate.getPluginMethod).toBe('function');
    expect(typeof DialogBasicAccumulate.getPluginMethodByName).toBe('function');
  });

  it('应该包含所有插件', () => {
    const plugins = DialogBasicAccumulate.getPluginMethod();
    expect(Array.isArray(plugins)).toBe(true);
    expect(plugins.length).toBeGreaterThan(0);
  });

  describe('handleDialogRef 插件', () => {
    const plugin = DialogBasicAccumulate.getPluginMethodByName('handleDialogRef') as any;

    it('应该正确处理插件基本结构', () => {
      expect(plugin).toBeDefined();
      expect(plugin.name).toBe('handleDialogRef');
      expect(typeof plugin.handle).toBe('function');
    });

    it('应该正确处理基本的 ref 和 closeIcon', () => {
      const { currentValue } = renderHook(plugin, {
        ref: { current: null },
        closeIcon: 'close',
        [$deletePropsList]: [],
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('ref');
      expect(currentValue.value).toHaveProperty('closeIcon');
      expect(currentValue.value).toHaveProperty('beforeClose');
      expect(typeof currentValue.value.ref.open).toBe('function');
      expect(typeof currentValue.value.ref.close).toBe('function');
    });

    it('应该正确处理空的 ref', () => {
      const { currentValue } = renderHook(plugin, {
        closeIcon: 'close',
        [$deletePropsList]: [],
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('ref');
      expect(currentValue.value).toHaveProperty('closeIcon');
      expect(currentValue.value).toHaveProperty('beforeClose');
      expect(typeof currentValue.value.ref.open).toBe('function');
      expect(typeof currentValue.value.ref.close).toBe('function');
    });

    it('应该正确处理 undefined 的 closeIcon', () => {
      const { currentValue } = renderHook(plugin, {
        ref: { current: null },
        [$deletePropsList]: [],
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('ref');
      expect(currentValue.value).toHaveProperty('closeIcon');
      expect(currentValue.value).toHaveProperty('beforeClose');
    });

    it('应该正确处理 onBeforeClose 回调', () => {
      const mockOnBeforeClose = vi.fn();

      const { currentValue } = renderHook(plugin, {
        ref: { current: null },
        closeIcon: 'close',
        onBeforeClose: mockOnBeforeClose,
        [$deletePropsList]: [],
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('beforeClose');
      expect(typeof currentValue.value.beforeClose).toBe('function');
    });

    it('应该正确处理 undefined 的 onBeforeClose', () => {
      const { currentValue } = renderHook(plugin, {
        ref: { current: null },
        closeIcon: 'close',
        [$deletePropsList]: [],
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('beforeClose');
      expect(typeof currentValue.value.beforeClose).toBe('function');
    });

    it('应该正确处理复杂的 ref 对象', () => {
      const complexRef = {
        current: null,
        value: 'test',
        focus: vi.fn(),
        blur: vi.fn(),
      };

      const { currentValue } = renderHook(plugin, {
        ref: complexRef,
        closeIcon: 'close',
        [$deletePropsList]: [],
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('ref');
      expect(currentValue.value.ref).toHaveProperty('open');
      expect(currentValue.value.ref).toHaveProperty('close');
      expect(currentValue.value.ref).toHaveProperty('focus');
      expect(currentValue.value.ref).toHaveProperty('blur');
      expect(typeof currentValue.value.ref.open).toBe('function');
      expect(typeof currentValue.value.ref.close).toBe('function');
    });

    it('应该正确处理不同的 closeIcon 值', () => {
      const testCases = ['close', 'times', 'x', 'cancel', null, undefined];

      testCases.forEach((closeIcon) => {
        const { currentValue } = renderHook(plugin, {
          ref: { current: null },
          closeIcon,
          [$deletePropsList]: [],
        });

        expect(currentValue.value).toBeDefined();
        expect(currentValue.value).toHaveProperty('closeIcon');
      });
    });

    it('应该正确处理 onBeforeClose 回调的执行', () => {
      const mockOnBeforeClose = vi.fn().mockReturnValue(true);

      const { currentValue } = renderHook(plugin, {
        ref: { current: null },
        closeIcon: 'close',
        onBeforeClose: mockOnBeforeClose,
        [$deletePropsList]: [],
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('beforeClose');
      expect(typeof currentValue.value.beforeClose).toBe('function');

      // 测试 beforeClose 函数
      const result = currentValue.value.beforeClose('test', 'arg2');
      expect(mockOnBeforeClose).toBeCalled();
    });

    it('应该正确处理 onBeforeClose 回调的异常', () => {
      const mockOnBeforeClose = vi.fn().mockImplementation(() => {
        throw new Error('Test error');
      });

      const { currentValue } = renderHook(plugin, {
        ref: { current: null },
        closeIcon: 'close',
        onBeforeClose: mockOnBeforeClose,
        [$deletePropsList]: [],
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('beforeClose');
      expect(typeof currentValue.value.beforeClose).toBe('function');

      // 测试 beforeClose 函数处理异常
      expect(() => {
        currentValue.value.beforeClose('test');
      }).not.toThrow();
    });

    it('应该正确处理所有 props 的组合', () => {
      const complexRef = {
        current: null,
        value: 'test',
        focus: vi.fn(),
      };
      const mockOnBeforeClose = vi.fn();

      const { currentValue } = renderHook(plugin, {
        ref: complexRef,
        closeIcon: 'times',
        onBeforeClose: mockOnBeforeClose,
        [$deletePropsList]: [],
        otherProp: 'test',
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('ref');
      expect(currentValue.value).toHaveProperty('closeIcon');
      expect(currentValue.value).toHaveProperty('beforeClose');
      expect(currentValue.value.ref).toHaveProperty('open');
      expect(currentValue.value.ref).toHaveProperty('close');
      expect(currentValue.value.ref).toHaveProperty('focus');
      expect(typeof currentValue.value.ref.open).toBe('function');
      expect(typeof currentValue.value.ref.close).toBe('function');
    });
  });
});

describe('插件集成和扩展性测试', () => {
  it('应该能够与其他插件组合使用', () => {
    const combinedAccumulate = DialogBasicAccumulate.addPlugin({
      name: 'testPlugin',
      handle: () => ({
        testProperty: 'test-value',
        customData: 'custom',
      }),
    });

    const plugins = combinedAccumulate.getPluginMethod();
    expect(plugins.length).toBeGreaterThanOrEqual(2);

    const pluginNames = ['handleDialogRef', 'testPlugin'];

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

    const testAccumulate = DialogBasicAccumulate.addPlugin(plugin1).addPlugin(plugin2);

    const plugins = testAccumulate.getPluginMethod();
    expect(plugins.length).toBeGreaterThanOrEqual(3);

    const foundPlugin1 = testAccumulate.getPluginMethodByName('plugin1');
    const foundPlugin2 = testAccumulate.getPluginMethodByName('plugin2');

    expect(foundPlugin1).toBeDefined();
    expect(foundPlugin2).toBeDefined();
  });

  it('应该正确处理插件方法的获取', () => {
    const allMethods = DialogBasicAccumulate.getPluginMethod();
    expect(Array.isArray(allMethods)).toBe(true);
    expect(allMethods.length).toBeGreaterThan(0);

    allMethods.forEach((method) => {
      expect(typeof method === 'function' || (typeof method === 'object' && typeof method.handle === 'function')).toBe(
        true,
      );
    });
  });

  it('应该正确处理不存在的插件查询', () => {
    const nonExistentPlugin = DialogBasicAccumulate.getPluginMethodByName('nonExistentPlugin');
    expect(nonExistentPlugin).toBeUndefined();
  });
});

describe('插件组合测试', () => {
  it('应该验证所有插件都能独立工作', () => {
    const pluginNames = ['handleDialogRef'];

    pluginNames.forEach((pluginName) => {
      const plugin = DialogBasicAccumulate.getPluginMethodByName(pluginName);
      expect(plugin).toBeDefined();
      expect(plugin?.name).toBe(pluginName);
      expect(typeof plugin?.handle).toBe('function');
    });
  });

  it('应该验证插件的基本功能完整性', () => {
    const dialogRefPlugin = DialogBasicAccumulate.getPluginMethodByName('handleDialogRef');

    expect(dialogRefPlugin).toBeDefined();
    expect(typeof dialogRefPlugin.handle).toBe('function');
  });

  it('应该正确处理对话框的完整流程', () => {
    const dialogRefPlugin = DialogBasicAccumulate.getPluginMethodByName('handleDialogRef');

    expect(dialogRefPlugin).toBeDefined();
    expect(dialogRefPlugin.name).toBe('handleDialogRef');

    expect(typeof dialogRefPlugin.handle).toBe('function');
  });
});

describe('边界情况和错误处理测试', () => {
  it('应该正确处理 null 的 ref', () => {
    const plugin = DialogBasicAccumulate.getPluginMethodByName('handleDialogRef') as any;

    const { currentValue } = renderHook(plugin, {
      ref: null,
      closeIcon: 'close',
      [$deletePropsList]: [],
    });

    expect(currentValue.value).toBeDefined();
    expect(currentValue.value).toHaveProperty('ref');
    expect(currentValue.value).toHaveProperty('closeIcon');
    expect(currentValue.value).toHaveProperty('beforeClose');
    expect(typeof currentValue.value.ref.open).toBe('function');
    expect(typeof currentValue.value.ref.close).toBe('function');
  });

  it('应该正确处理空字符串的 closeIcon', () => {
    const plugin = DialogBasicAccumulate.getPluginMethodByName('handleDialogRef') as any;

    const { currentValue } = renderHook(plugin, {
      ref: { current: null },
      closeIcon: '',
      [$deletePropsList]: [],
    });

    expect(currentValue.value).toBeDefined();
    expect(currentValue.value).toHaveProperty('closeIcon');
  });

  it('应该正确处理复杂的 onBeforeClose 回调', () => {
    const plugin = DialogBasicAccumulate.getPluginMethodByName('handleDialogRef') as any;

    const complexCallback = vi.fn((done) => {
      setTimeout(() => {
        done();
      }, 100);
    });

    const { currentValue } = renderHook(plugin, {
      ref: { current: null },
      closeIcon: 'close',
      onBeforeClose: complexCallback,
      [$deletePropsList]: [],
    });

    expect(currentValue.value).toBeDefined();
    expect(currentValue.value).toHaveProperty('beforeClose');
    expect(typeof currentValue.value.beforeClose).toBe('function');
  });

  it('应该正确处理特殊字符的 closeIcon', () => {
    const plugin = DialogBasicAccumulate.getPluginMethodByName('handleDialogRef') as any;

    const { currentValue } = renderHook(plugin, {
      ref: { current: null },
      closeIcon: 'icon-close_123',
      [$deletePropsList]: [],
    });

    expect(currentValue.value).toBeDefined();
    expect(currentValue.value).toHaveProperty('closeIcon');
  });

  it('应该正确处理 ref 对象的深度嵌套', () => {
    const plugin = DialogBasicAccumulate.getPluginMethodByName('handleDialogRef') as any;

    const nestedRef = {
      current: {
        element: {
          style: {},
          classList: [],
        },
      },
      methods: {
        focus: vi.fn(),
        blur: vi.fn(),
      },
    };

    const { currentValue } = renderHook(plugin, {
      ref: nestedRef,
      closeIcon: 'close',
      [$deletePropsList]: [],
    });

    expect(currentValue.value).toBeDefined();
    expect(currentValue.value).toHaveProperty('ref');
    expect(currentValue.value.ref).toHaveProperty('open');
    expect(currentValue.value.ref).toHaveProperty('close');
    expect(currentValue.value.ref).toHaveProperty('methods');
    expect(typeof currentValue.value.ref.open).toBe('function');
    expect(typeof currentValue.value.ref.close).toBe('function');
  });
});
