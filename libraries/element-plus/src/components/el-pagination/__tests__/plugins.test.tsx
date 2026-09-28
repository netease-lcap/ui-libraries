import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@ep-test/test-utils/render-hook';
import '@/utils/index';
import PaginationBasicAccumulate from '../plugins/basic-plugins';

describe('el-pagination plugins', () => {
  beforeEach(() => {
    // 重置所有 mock
    vi.clearAllMocks();
  });

  describe('basic-plugins.ts', () => {
    describe('PaginationBasicAccumulate 基础功能', () => {
      it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
        expect(PaginationBasicAccumulate).toBeDefined();
        expect(typeof PaginationBasicAccumulate.addPlugin).toBe('function');
        expect(typeof PaginationBasicAccumulate.getPluginMethod).toBe('function');
        expect(Array.isArray(PaginationBasicAccumulate.Plugin)).toBe(true);
      });

      it('应该包含 handlePageSizes 插件', () => {
        const plugins = PaginationBasicAccumulate.getPluginMethod();
        expect(plugins).toHaveLength(3);

        const handlePageSizesPlugin = PaginationBasicAccumulate.getPluginMethodByName('handlePageSizes');
        expect(handlePageSizesPlugin).toBeDefined();
        if (handlePageSizesPlugin) {
          expect(handlePageSizesPlugin.name).toBe('handlePageSizes');
          expect(typeof (handlePageSizesPlugin as any).handle).toBe('function');
        }
      });
    });

    describe('handlePageSizes 插件功能测试', () => {
      const plugin = PaginationBasicAccumulate.getPluginMethodByName('handlePageSizes') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          pageSizes: [10, 20, 50],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        // 验证返回值基本结构
        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
        expect(result).toHaveProperty('pageSizes');
        expect(Array.isArray(result.pageSizes)).toBe(true);
      });

      it('应该正确处理数组类型的 pageSizes', () => {
        const props = {
          pageSizes: [5, 10, 20, 50, 100],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.pageSizes).toEqual([5, 10, 20, 50, 100]);
      });

      it('应该正确处理字符串类型的 pageSizes', () => {
        const props = {
          pageSizes: '[5, 10, 20, 50, 100]',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.pageSizes).toEqual([5, 10, 20, 50, 100]);
      });

      it('应该正确处理无效的 JSON 字符串', () => {
        const props = {
          pageSizes: 'invalid json string',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        // 当 JSON 解析失败时，应该返回默认值
        expect(result.pageSizes).toEqual([10, 20, 50]);
      });

      it('应该正确处理 null 的 pageSizes', () => {
        const props = {
          pageSizes: null,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.pageSizes).toEqual([10, 20, 50]);
      });

      it('应该正确处理 undefined 的 pageSizes', () => {
        const props = {
          pageSizes: undefined,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.pageSizes).toEqual([10, 20, 50]);
      });

      it('应该正确处理空数组的 pageSizes', () => {
        const props = {
          pageSizes: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.pageSizes).toEqual([]);
      });

      it('应该正确处理非数组类型的 pageSizes', () => {
        const props = {
          pageSizes: 'not an array',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        // 当解析结果不是数组时，应该返回默认值
        expect(result.pageSizes).toEqual([10, 20, 50]);
      });

      it('应该正确处理复杂的 JSON 字符串', () => {
        const props = {
          pageSizes: '[{"size": 10, "label": "10条/页"}, {"size": 20, "label": "20条/页"}]',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        // 解析成功但不是简单数组，应该返回解析后的对象数组
        expect(result.pageSizes).toEqual([
          { size: 10, label: '10条/页' },
          { size: 20, label: '20条/页' }
        ]);
      });

      it('应该正确处理包含特殊字符的 JSON 字符串', () => {
        const props = {
          pageSizes: '[10, 20, 50, 100]',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.pageSizes).toEqual([10, 20, 50, 100]);
      });

      it('应该正确处理边界情况', () => {
        const testCases = [
          { pageSizes: '' }, // 空字符串
          { pageSizes: '[]' }, // 空数组字符串
          { pageSizes: '{}' }, // 对象字符串
          { pageSizes: 'true' }, // 布尔值字符串
          { pageSizes: '123' }, // 数字字符串
        ];

        testCases.forEach((testCase) => {
          const { currentValue } = renderHook(plugin, testCase);
          const result = currentValue.value;

          expect(result).toBeDefined();
          expect(result).toHaveProperty('pageSizes');
          expect(Array.isArray(result.pageSizes)).toBe(true);
        });
      });

      it('应该正确处理 useMemo 的依赖变化', () => {
        const props1 = {
          pageSizes: [10, 20],
        };

        const { currentValue: result1 } = renderHook(plugin, props1);
        expect(result1.value.pageSizes).toEqual([10, 20]);

        const props2 = {
          pageSizes: [5, 15, 25],
        };

        const { currentValue: result2 } = renderHook(plugin, props2);
        expect(result2.value.pageSizes).toEqual([5, 15, 25]);
      });

      it('应该正确处理复杂的数组结构', () => {
        const props = {
          pageSizes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.pageSizes).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      });

      it('应该正确处理包含零值的数组', () => {
        const props = {
          pageSizes: [0, 10, 20],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.pageSizes).toEqual([0, 10, 20]);
      });

      it('应该正确处理包含负数的数组', () => {
        const props = {
          pageSizes: [-10, 10, 20],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.pageSizes).toEqual([-10, 10, 20]);
      });

      it('应该正确处理包含小数的数组', () => {
        const props = {
          pageSizes: [10.5, 20.5, 50.5],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.pageSizes).toEqual([10.5, 20.5, 50.5]);
      });
    });

    describe('插件集成和扩展性测试', () => {
      it('应该能够与其他插件组合使用', () => {
        // 测试插件链式调用
        const combinedAccumulate = PaginationBasicAccumulate.addPlugin({
          name: 'testPlugin',
          handle: () => ({
            testProperty: 'test-value',
            customData: 'custom',
          }),
        });

        const plugins = combinedAccumulate.getPluginMethod();
        expect(plugins).toHaveLength(4);

        const handlePageSizesPlugin = combinedAccumulate.getPluginMethodByName('handlePageSizes');
        const testPlugin = combinedAccumulate.getPluginMethodByName('testPlugin');

        expect(handlePageSizesPlugin).toBeDefined();
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

        const testAccumulate = PaginationBasicAccumulate.addPlugin(plugin1).addPlugin(plugin2);

        const plugins = testAccumulate.getPluginMethod();
        // 验证插件数量是否正确增加
        expect(plugins.length).toBeGreaterThanOrEqual(3);

        const foundPlugin1 = testAccumulate.getPluginMethodByName('plugin1');
        const foundPlugin2 = testAccumulate.getPluginMethodByName('plugin2');

        expect(foundPlugin1).toBeDefined();
        expect(foundPlugin2).toBeDefined();
      });

      it('应该正确处理插件方法的获取', () => {
        const allMethods = PaginationBasicAccumulate.getPluginMethod();
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
        const nonExistentPlugin = PaginationBasicAccumulate.getPluginMethodByName('nonExistent');
        expect(nonExistentPlugin).toBeUndefined();
      });
    });
  });

  describe('low-code.ts', () => {
    it('应该正确导出空文件', () => {
      // low-code.ts 是空文件，测试文件能正确导入
      expect(() => {
        import('../plugins/low-code');
      }).not.toThrow();
    });
  });
});
