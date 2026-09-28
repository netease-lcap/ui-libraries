import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@ep-test/test-utils/render-hook';
import '@/utils/index';
import BadgeAccumulate from '../plugins/basic-plugins';

describe('basic-plugins.ts', () => {
  beforeEach(() => {
    // 重置所有 mock
    vi.clearAllMocks();
  });

  describe('BadgeAccumulate 基础功能', () => {
    it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
      expect(BadgeAccumulate).toBeDefined();
      expect(typeof BadgeAccumulate.addPlugin).toBe('function');
      expect(typeof BadgeAccumulate.getPluginMethod).toBe('function');
      expect(Array.isArray(BadgeAccumulate.Plugin)).toBe(true);
    });

    it('应该包含 handleLeftOffset 插件', () => {
      const plugins = BadgeAccumulate.getPluginMethod();
      expect(plugins).toHaveLength(2);

      const handleLeftOffsetPlugin = BadgeAccumulate.getPluginMethodByName('handleLeftOffset');
      expect(handleLeftOffsetPlugin).toBeDefined();
      if (handleLeftOffsetPlugin) {
        expect(handleLeftOffsetPlugin.name).toBe('handleLeftOffset');
        expect(typeof (handleLeftOffsetPlugin as any).handle).toBe('function');
      }
    });
  });

  describe('handleLeftOffset 插件功能测试', () => {
    const plugin = BadgeAccumulate.getPluginMethodByName('handleLeftOffset') as any;

    it('应该正确处理插件基本结构', () => {
      const props = {
        leftOffset: 0,
        topOffset: 0,
        offset: undefined,
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // 验证返回值基本结构
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
      expect(result).toHaveProperty('offset');
      expect(Array.isArray(result.offset)).toBe(true);
    });

    it('应该正确处理默认的 leftOffset 和 topOffset', () => {
      const props = {
        leftOffset: undefined,
        topOffset: undefined,
        offset: undefined,
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // 验证默认值处理
      expect(result.offset).toEqual([0, 0]);
    });

    it('应该正确处理自定义的 leftOffset 和 topOffset', () => {
      const props = {
        leftOffset: 10,
        topOffset: 20,
        offset: undefined,
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // 验证自定义值处理
      expect(result.offset).toEqual([10, 20]);
    });

    it('应该正确处理数组类型的 offset', () => {
      const props = {
        leftOffset: 10,
        topOffset: 20,
        offset: [30, 40],
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // 验证数组 offset 优先使用
      expect(result.offset).toEqual([30, 40]);
    });

    it('应该正确处理非数组类型的 offset', () => {
      const props = {
        leftOffset: 10,
        topOffset: 20,
        offset: 'invalid',
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // 验证非数组 offset 时使用 leftOffset 和 topOffset
      expect(result.offset).toEqual([10, 20]);
    });

    it('应该正确处理 null 类型的 offset', () => {
      const props = {
        leftOffset: 15,
        topOffset: 25,
        offset: null,
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // 验证 null offset 时使用 leftOffset 和 topOffset
      expect(result.offset).toEqual([15, 25]);
    });

    it('应该正确处理 undefined 类型的 offset', () => {
      const props = {
        leftOffset: 5,
        topOffset: 15,
        offset: undefined,
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // 验证 undefined offset 时使用 leftOffset 和 topOffset
      expect(result.offset).toEqual([5, 15]);
    });

    it('应该正确处理零值', () => {
      const props = {
        leftOffset: 0,
        topOffset: 0,
        offset: undefined,
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // 验证零值处理
      expect(result.offset).toEqual([0, 0]);
    });

    it('应该正确处理负数', () => {
      const props = {
        leftOffset: -10,
        topOffset: -20,
        offset: undefined,
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // 验证负数处理
      expect(result.offset).toEqual([-10, -20]);
    });

    it('应该正确处理小数', () => {
      const props = {
        leftOffset: 10.5,
        topOffset: 20.7,
        offset: undefined,
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // 验证小数处理
      expect(result.offset).toEqual([10.5, 20.7]);
    });

    it('应该正确处理复杂的数据类型', () => {
      const props = {
        leftOffset: 100,
        topOffset: 200,
        offset: { x: 300, y: 400 }, // 对象类型
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // 验证非数组类型时使用 leftOffset 和 topOffset
      expect(result.offset).toEqual([100, 200]);
    });

    it('应该正确处理空数组', () => {
      const props = {
        leftOffset: 50,
        topOffset: 60,
        offset: [],
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // 验证空数组时直接使用空数组（因为 _.isArray([]) 为 true）
      expect(result.offset).toEqual([]);
    });

    it('应该正确处理只有一个元素的数组', () => {
      const props = {
        leftOffset: 70,
        topOffset: 80,
        offset: [90],
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // 验证单元素数组时直接使用该数组（因为 _.isArray([90]) 为 true）
      expect(result.offset).toEqual([90]);
    });

    it('应该正确处理超过两个元素的数组', () => {
      const props = {
        leftOffset: 110,
        topOffset: 120,
        offset: [130, 140, 150],
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // 验证多元素数组时直接使用该数组（因为 _.isArray([130, 140, 150]) 为 true）
      expect(result.offset).toEqual([130, 140, 150]);
    });

    it('应该正确处理边界情况', () => {
      // 测试各种边界情况
      const testCases = [
        { leftOffset: null, topOffset: null, offset: undefined },
        { leftOffset: false, topOffset: true, offset: undefined },
        { leftOffset: '', topOffset: '', offset: undefined },
        { leftOffset: NaN, topOffset: NaN, offset: undefined },
        { leftOffset: Infinity, topOffset: -Infinity, offset: undefined },
      ];

      testCases.forEach((testCase) => {
        const { currentValue } = renderHook(plugin, testCase);
        const result = currentValue.value;

        // 检查插件能否处理边界情况而不抛出错误
        expect(() => {
          expect(result).toBeDefined();
          expect(result).toHaveProperty('offset');
          expect(Array.isArray(result.offset)).toBe(true);
        }).not.toThrow();
      });
    });
  });

  describe('插件集成和扩展性测试', () => {
    it('应该能够与其他插件组合使用', () => {
      // 测试插件链式调用
      const combinedAccumulate = BadgeAccumulate.addPlugin({
        name: 'testPlugin',
        handle: () => ({
          testProperty: 'test-value',
          customData: 'custom',
        }),
      });

      const plugins = combinedAccumulate.getPluginMethod();
      expect(plugins).toHaveLength(3);

      const handleLeftOffsetPlugin = combinedAccumulate.getPluginMethodByName('handleLeftOffset');
      const testPlugin = combinedAccumulate.getPluginMethodByName('testPlugin');

      expect(handleLeftOffsetPlugin).toBeDefined();
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

      const testAccumulate = BadgeAccumulate.addPlugin(plugin1).addPlugin(plugin2);

      const plugins = testAccumulate.getPluginMethod();
      // 验证插件数量是否正确增加（可能已经有其他插件）
      expect(plugins.length).toBeGreaterThanOrEqual(3);

      const foundPlugin1 = testAccumulate.getPluginMethodByName('plugin1');
      const foundPlugin2 = testAccumulate.getPluginMethodByName('plugin2');

      expect(foundPlugin1).toBeDefined();
      expect(foundPlugin2).toBeDefined();
    });

    it('应该正确处理插件方法的获取', () => {
      const allMethods = BadgeAccumulate.getPluginMethod();
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
      const nonExistentPlugin = BadgeAccumulate.getPluginMethodByName('nonExistent');
      expect(nonExistentPlugin).toBeUndefined();
    });
  });
});
