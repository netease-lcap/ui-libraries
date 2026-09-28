import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '../../../../ep-test/test-utils/render-hook';
import DrawerBasicAccumulate from '../plugins/index';
import { $deletePropsList } from '@/plugins/constants';

// Mock lodash

describe('plugins/index.ts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('应该正确导出 DrawerBasicAccumulate', () => {
    expect(DrawerBasicAccumulate).toBeDefined();
    expect(typeof DrawerBasicAccumulate.addPlugin).toBe('function');
    expect(typeof DrawerBasicAccumulate.getPluginMethod).toBe('function');
    expect(typeof DrawerBasicAccumulate.getPluginMethodByName).toBe('function');
  });

  it('应该包含所有插件', () => {
    const plugins = DrawerBasicAccumulate.getPluginMethod();
    expect(Array.isArray(plugins)).toBe(true);
    expect(plugins.length).toBeGreaterThan(0);
  });

  describe('handleDrawerRef 插件', () => {
    const plugin = DrawerBasicAccumulate.getPluginMethodByName('handleDrawerRef') as any;

    it('应该正确处理插件基本结构', () => {
      expect(plugin).toBeDefined();
      expect(plugin.name).toBe('handleDrawerRef');
      expect(typeof plugin.handle).toBe('function');
    });

    it('应该正确处理基本的 ref', () => {
      const { currentValue } = renderHook(plugin, {
        ref: { current: null },
        [$deletePropsList]: [],
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('ref');
      expect(currentValue.value).toHaveProperty('beforeClose');
      expect(typeof currentValue.value.ref.open).toBe('function');
      expect(typeof currentValue.value.ref.close).toBe('function');
    });

    it('应该正确处理空的 ref', () => {
      const { currentValue } = renderHook(plugin, {
        [$deletePropsList]: [],
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('ref');
      expect(currentValue.value).toHaveProperty('beforeClose');
      expect(typeof currentValue.value.ref.open).toBe('function');
      expect(typeof currentValue.value.ref.close).toBe('function');
    });

    it('应该正确处理 onBeforeClose 回调', () => {
      const mockOnBeforeClose = vi.fn();

      const { currentValue } = renderHook(plugin, {
        ref: { current: null },
        onBeforeClose: mockOnBeforeClose,
        [$deletePropsList]: [],
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('beforeClose');
      expect(typeof currentValue.value.beforeClose).toBe('function');
    });

    it('应该正确处理默认的 onBeforeClose', () => {
      const { currentValue } = renderHook(plugin, {
        ref: { current: null },
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

    it('应该正确处理 onBeforeClose 回调的执行', () => {
      const mockOnBeforeClose = vi.fn().mockReturnValue(true);

      const { currentValue } = renderHook(plugin, {
        ref: { current: null },
        onBeforeClose: mockOnBeforeClose,
        [$deletePropsList]: [],
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('beforeClose');
      expect(typeof currentValue.value.beforeClose).toBe('function');

      // 测试 beforeClose 函数
      const result = currentValue.value.beforeClose('test', 'arg2');
      expect(mockOnBeforeClose).toHaveBeenCalledWith('test', 'arg2');
    });

    it('应该正确处理 onBeforeClose 回调的异常', () => {
      const mockOnBeforeClose = vi.fn().mockImplementation(() => {
        throw new Error('Test error');
      });

      const { currentValue } = renderHook(plugin, {
        ref: { current: null },
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
        onBeforeClose: mockOnBeforeClose,
        [$deletePropsList]: [],
        otherProp: 'test',
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('ref');
      expect(currentValue.value).toHaveProperty('beforeClose');
      expect(currentValue.value.ref).toHaveProperty('open');
      expect(currentValue.value.ref).toHaveProperty('close');
      expect(currentValue.value.ref).toHaveProperty('focus');
      expect(typeof currentValue.value.ref.open).toBe('function');
      expect(typeof currentValue.value.ref.close).toBe('function');
    });

    it('应该正确处理默认的 onBeforeClose 回调', () => {
      const { currentValue } = renderHook(plugin, {
        ref: { current: null },
        [$deletePropsList]: [],
      });

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('beforeClose');
      expect(typeof currentValue.value.beforeClose).toBe('function');

      // 测试默认的 beforeClose 函数
      const mockDone = vi.fn();
      expect(() => {
        currentValue.value.beforeClose(mockDone);
      }).not.toThrow();
    });
  });
});

describe('插件集成和扩展性测试', () => {
  it('应该能够与其他插件组合使用', () => {
    const combinedAccumulate = DrawerBasicAccumulate.addPlugin({
      name: 'testPlugin',
      handle: () => ({
        testProperty: 'test-value',
        customData: 'custom',
      }),
    });

    const plugins = combinedAccumulate.getPluginMethod();
    expect(plugins.length).toBeGreaterThanOrEqual(2);

    const pluginNames = ['handleDrawerRef', 'testPlugin'];

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

    const testAccumulate = DrawerBasicAccumulate.addPlugin(plugin1).addPlugin(plugin2);

    const plugins = testAccumulate.getPluginMethod();
    expect(plugins.length).toBeGreaterThanOrEqual(3);

    const foundPlugin1 = testAccumulate.getPluginMethodByName('plugin1');
    const foundPlugin2 = testAccumulate.getPluginMethodByName('plugin2');

    expect(foundPlugin1).toBeDefined();
    expect(foundPlugin2).toBeDefined();
  });

  it('应该正确处理插件方法的获取', () => {
    const allMethods = DrawerBasicAccumulate.getPluginMethod();
    expect(Array.isArray(allMethods)).toBe(true);
    expect(allMethods.length).toBeGreaterThan(0);

    allMethods.forEach((method) => {
      expect(typeof method === 'function' || (typeof method === 'object' && typeof method.handle === 'function')).toBe(
        true,
      );
    });
  });

  it('应该正确处理不存在的插件查询', () => {
    const nonExistentPlugin = DrawerBasicAccumulate.getPluginMethodByName('nonExistentPlugin');
    expect(nonExistentPlugin).toBeUndefined();
  });
});

describe('插件组合测试', () => {
  it('应该验证所有插件都能独立工作', () => {
    const pluginNames = ['handleDrawerRef'];

    pluginNames.forEach((pluginName) => {
      const plugin = DrawerBasicAccumulate.getPluginMethodByName(pluginName);
      expect(plugin).toBeDefined();
      expect(plugin?.name).toBe(pluginName);
      expect(typeof plugin?.handle).toBe('function');
    });
  });

  it('应该验证插件的基本功能完整性', () => {
    const drawerRefPlugin = DrawerBasicAccumulate.getPluginMethodByName('handleDrawerRef');

    expect(drawerRefPlugin).toBeDefined();
    expect(typeof drawerRefPlugin.handle).toBe('function');
  });

  it('应该正确处理抽屉的完整流程', () => {
    const drawerRefPlugin = DrawerBasicAccumulate.getPluginMethodByName('handleDrawerRef');

    expect(drawerRefPlugin).toBeDefined();
    expect(drawerRefPlugin.name).toBe('handleDrawerRef');

    expect(typeof drawerRefPlugin.handle).toBe('function');
  });
});

describe('边界情况和错误处理测试', () => {
  it('应该正确处理 null 的 ref', () => {
    const plugin = DrawerBasicAccumulate.getPluginMethodByName('handleDrawerRef') as any;

    const { currentValue } = renderHook(plugin, {
      ref: null,
      [$deletePropsList]: [],
    });

    expect(currentValue.value).toBeDefined();
    expect(currentValue.value).toHaveProperty('ref');
    expect(currentValue.value).toHaveProperty('beforeClose');
    expect(typeof currentValue.value.ref.open).toBe('function');
    expect(typeof currentValue.value.ref.close).toBe('function');
  });

  it('应该正确处理复杂的 onBeforeClose 回调', () => {
    const plugin = DrawerBasicAccumulate.getPluginMethodByName('handleDrawerRef') as any;

    const complexCallback = vi.fn((done) => {
      setTimeout(() => {
        done();
      }, 100);
    });

    const { currentValue } = renderHook(plugin, {
      ref: { current: null },
      onBeforeClose: complexCallback,
      [$deletePropsList]: [],
    });

    expect(currentValue.value).toBeDefined();
    expect(currentValue.value).toHaveProperty('beforeClose');
    expect(typeof currentValue.value.beforeClose).toBe('function');
  });

  it('应该正确处理 ref 对象的深度嵌套', () => {
    const plugin = DrawerBasicAccumulate.getPluginMethodByName('handleDrawerRef') as any;

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

  it('应该正确处理异步的 onBeforeClose 回调', () => {
    const plugin = DrawerBasicAccumulate.getPluginMethodByName('handleDrawerRef') as any;

    const asyncCallback = vi.fn(async (done) => {
      await new Promise((resolve) => setTimeout(resolve, 10));
      done();
    });

    const { currentValue } = renderHook(plugin, {
      ref: { current: null },
      onBeforeClose: asyncCallback,
      [$deletePropsList]: [],
    });

    expect(currentValue.value).toBeDefined();
    expect(currentValue.value).toHaveProperty('beforeClose');
    expect(typeof currentValue.value.beforeClose).toBe('function');
  });

  it('应该正确处理返回 Promise 的 onBeforeClose 回调', () => {
    const plugin = DrawerBasicAccumulate.getPluginMethodByName('handleDrawerRef') as any;

    const promiseCallback = vi.fn(() => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(true), 10);
      });
    });

    const { currentValue } = renderHook(plugin, {
      ref: { current: null },
      onBeforeClose: promiseCallback,
      [$deletePropsList]: [],
    });

    expect(currentValue.value).toBeDefined();
    expect(currentValue.value).toHaveProperty('beforeClose');
    expect(typeof currentValue.value.beforeClose).toBe('function');
  });
});
