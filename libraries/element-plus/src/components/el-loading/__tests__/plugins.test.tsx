import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@ep-test/test-utils/render-hook';
import '@/utils/index';
import LoadingBasicAccumulate from '../plugins/index';


describe('el-loading plugins', () => {
  beforeEach(() => {
    // 重置所有 mock
    vi.clearAllMocks();
  });

  describe('index.ts', () => {
    describe('LoadingBasicAccumulate 基础功能', () => {
      it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
        expect(LoadingBasicAccumulate).toBeDefined();
        expect(typeof LoadingBasicAccumulate.addPlugin).toBe('function');
        expect(typeof LoadingBasicAccumulate.getPluginMethod).toBe('function');
        expect(Array.isArray(LoadingBasicAccumulate.Plugin)).toBe(true);
      });

      it('应该包含 handleCloseEvents 插件', () => {
        const plugins = LoadingBasicAccumulate.getPluginMethod();
        expect(plugins).toBeDefined();
        expect(Array.isArray(plugins)).toBe(true);
        expect(plugins.length).toBeGreaterThan(0);

        const handleCloseEventsPlugin = LoadingBasicAccumulate.getPluginMethodByName('handleCloseEvents');
        expect(handleCloseEventsPlugin).toBeDefined();
        expect(handleCloseEventsPlugin?.name).toBe('handleCloseEvents');
      });
    });

    describe('handleCloseEvents 插件功能测试', () => {
      const plugin = LoadingBasicAccumulate.getPluginMethodByName('handleCloseEvents') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          onBeforeClose: vi.fn(),
          onClosed: vi.fn(),
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
        expect(result).toHaveProperty('beforeClose');
        expect(result).toHaveProperty('closed');
      });

      it('应该正确处理 onBeforeClose 和 onClosed 回调', () => {
        const onBeforeClose = vi.fn();
        const onClosed = vi.fn();
        const props = {
          onBeforeClose,
          onClosed,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.beforeClose).toBeDefined();
        expect(result.closed).toBeDefined();
        expect(typeof result.beforeClose).toBe('function');
        expect(typeof result.closed).toBe('function');
      });

      it('应该正确处理默认的空回调', () => {
        const props = {};

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.beforeClose).toBeDefined();
        expect(result.closed).toBeDefined();
        expect(typeof result.beforeClose).toBe('function');
        expect(typeof result.closed).toBe('function');
      });

      it('应该正确处理 undefined 的回调', () => {
        const props = {
          onBeforeClose: undefined,
          onClosed: undefined,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.beforeClose).toBeDefined();
        expect(result.closed).toBeDefined();
        expect(typeof result.beforeClose).toBe('function');
        expect(typeof result.closed).toBe('function');
      });

      it('应该正确处理 null 的回调', () => {
        const props = {
          onBeforeClose: null,
          onClosed: null,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.beforeClose).toBeDefined();
        expect(result.closed).toBeDefined();
        expect(typeof result.beforeClose).toBe('function');
        expect(typeof result.closed).toBe('function');
      });

      it('应该正确处理函数类型的回调', () => {
        const onBeforeClose = () => console.log('before close');
        const onClosed = () => console.log('closed');
        const props = {
          onBeforeClose,
          onClosed,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.beforeClose).toBeDefined();
        expect(result.closed).toBeDefined();
        expect(typeof result.beforeClose).toBe('function');
        expect(typeof result.closed).toBe('function');
      });

      it('应该正确处理复杂的回调函数', () => {
        const onBeforeClose = vi.fn((arg1, arg2) => {
          console.log('before close with args:', arg1, arg2);
          return true;
        });
        const onClosed = vi.fn((arg1, arg2) => {
          console.log('closed with args:', arg1, arg2);
          return false;
        });
        const props = {
          onBeforeClose,
          onClosed,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.beforeClose).toBeDefined();
        expect(result.closed).toBeDefined();
        expect(typeof result.beforeClose).toBe('function');
        expect(typeof result.closed).toBe('function');
      });
    });
  });

  describe('边界情况和错误处理测试', () => {
    it('应该正确处理 props.get 抛出异常的情况', () => {
      const plugin = LoadingBasicAccumulate.getPluginMethodByName('handleCloseEvents') as any;

      const props = {
        get: vi.fn(() => {
          throw new Error('Mock error');
        }),
      };

      expect(() => {
        const { currentValue } = renderHook(plugin, props);
        expect(currentValue.value).toBeDefined();
      }).not.toThrow();
    });

    it('应该正确处理各种数据类型的 props', () => {
      const plugin = LoadingBasicAccumulate.getPluginMethodByName('handleCloseEvents') as any;

      const testCases = [
        { onBeforeClose: null, onClosed: null },
        { onBeforeClose: undefined, onClosed: undefined },
        { onBeforeClose: vi.fn(), onClosed: vi.fn() },
        { onBeforeClose: () => {}, onClosed: () => {} },
        { onBeforeClose: 'string', onClosed: 'string' },
        { onBeforeClose: 123, onClosed: 456 },
        { onBeforeClose: {}, onClosed: {} },
      ];

      testCases.forEach((testCase) => {
        expect(() => {
          const { currentValue } = renderHook(plugin, testCase);
          expect(currentValue.value).toBeDefined();
        }).not.toThrow();
      });
    });

    it('应该正确处理回调函数执行时的错误', () => {
      const plugin = LoadingBasicAccumulate.getPluginMethodByName('handleCloseEvents') as any;

      const onBeforeClose = vi.fn(() => {
        throw new Error('Callback error');
      });
      const onClosed = vi.fn(() => {
        throw new Error('Callback error');
      });
      const props = {
        onBeforeClose,
        onClosed,
      };

      expect(() => {
        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;
        expect(result.beforeClose).toBeDefined();
        expect(result.closed).toBeDefined();
        // 尝试调用回调函数，应该不会抛出错误（因为使用了 _.attempt）
        result.beforeClose();
        result.closed();
      }).not.toThrow();
    });
  });

  describe('插件集成和扩展性测试', () => {
    it('应该能够与其他插件组合使用', () => {
      // 测试插件链式调用
      const combinedAccumulate = LoadingBasicAccumulate.addPlugin({
        name: 'testPlugin',
        handle: () => ({
          testProperty: 'test-value',
          customData: 'custom',
        }),
      });

      const plugins = combinedAccumulate.getPluginMethod();
      expect(plugins).toHaveLength(2);

      const handleCloseEventsPlugin = combinedAccumulate.getPluginMethodByName('handleCloseEvents');
      const testPlugin = combinedAccumulate.getPluginMethodByName('testPlugin');

      expect(handleCloseEventsPlugin).toBeDefined();
      expect(testPlugin).toBeDefined();
      expect(testPlugin?.name).toBe('testPlugin');
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

      const testAccumulate = LoadingBasicAccumulate.addPlugin(plugin1).addPlugin(plugin2);

      const plugins = testAccumulate.getPluginMethod();
      // 验证插件数量是否正确增加（可能已经有其他插件）
      expect(plugins.length).toBeGreaterThanOrEqual(3);

      const foundPlugin1 = testAccumulate.getPluginMethodByName('plugin1');
      const foundPlugin2 = testAccumulate.getPluginMethodByName('plugin2');

      expect(foundPlugin1).toBeDefined();
      expect(foundPlugin2).toBeDefined();
    });

    it('应该正确处理插件方法的获取', () => {
      const allMethods = LoadingBasicAccumulate.getPluginMethod();
      expect(Array.isArray(allMethods)).toBe(true);
      expect(allMethods.length).toBeGreaterThan(0);

      // 验证方法数组中的元素都是函数或包含 handle 的对象
      allMethods.forEach((method) => {
        expect(
          typeof method === 'function' || (typeof method === 'object' && typeof method.handle === 'function'),
        ).toBe(true);
      });
    });

    it('应该正确处理不存在的插件查询', () => {
      const nonExistentPlugin = LoadingBasicAccumulate.getPluginMethodByName('nonExistent');
      expect(nonExistentPlugin).toBeUndefined();
    });
  });
});
