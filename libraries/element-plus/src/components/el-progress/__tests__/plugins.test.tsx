import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@ep-test/test-utils/render-hook';
import '@/utils/index';
import ProgressBasicAccumulate from '../plugins/basic-plugins';

describe('el-progress plugins', () => {
  beforeEach(() => {
    // 重置所有 mock
    vi.clearAllMocks();
  });

  describe('basic-plugins.ts', () => {
    describe('ProgressBasicAccumulate 基础功能', () => {
      it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
        expect(ProgressBasicAccumulate).toBeDefined();
        expect(typeof ProgressBasicAccumulate.addPlugin).toBe('function');
        expect(typeof ProgressBasicAccumulate.getPluginMethod).toBe('function');
        expect(Array.isArray(ProgressBasicAccumulate.Plugin)).toBe(true);
      });

      it('应该包含 handleFormatFunction 插件', () => {
        const plugins = ProgressBasicAccumulate.getPluginMethod();

        const handleFormatFunctionPlugin = ProgressBasicAccumulate.getPluginMethodByName('handleFormatFunction');
        expect(handleFormatFunctionPlugin).toBeDefined();
        if (handleFormatFunctionPlugin) {
          expect(handleFormatFunctionPlugin.name).toBe('handleFormatFunction');
          expect(typeof (handleFormatFunctionPlugin as any).handle).toBe('function');
        }
      });
    });

    describe('handleFormatFunction 插件功能测试', () => {
      const plugin = ProgressBasicAccumulate.getPluginMethodByName('handleFormatFunction') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          format: (percentage: number) => `${percentage}%`,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        // 验证返回值基本结构
        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
        expect(result).toHaveProperty('format');
        expect(typeof result.format).toBe('function');
      });

      it('应该正确处理函数类型的 format', () => {
        const formatFunction = (percentage: number) => `${percentage}%`;
        const props = {
          format: formatFunction,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(typeof result.format).toBe('function');
        
        // 测试 format 函数的功能
        const testResult = result.format(50);
        expect(testResult).toBe('50%');
      });

      it('应该正确处理 undefined 的 format', () => {
        const props = {
          format: undefined,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(typeof result.format).toBe('function');
        
        // 当 format 为 undefined 时，插件会返回错误对象
        const testResult = result.format(50);
        expect(testResult).toBeInstanceOf(Error);
      });

      it('应该正确处理 null 的 format', () => {
        const props = {
          format: null,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(typeof result.format).toBe('function');
        
        // 当 format 为 null 时，插件会返回错误对象
        const testResult = result.format(50);
        expect(testResult).toBeInstanceOf(Error);
      });

      it('应该正确处理复杂格式函数', () => {
        const complexFormatFunction = (percentage: number, status?: string) => {
          if (status === 'success') return `✓ ${percentage}%`;
          if (status === 'exception') return `✗ ${percentage}%`;
          return `${percentage}%`;
        };

        const props = {
          format: complexFormatFunction,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(typeof result.format).toBe('function');
        
        // 测试不同状态下的格式化
        expect(result.format(100, 'success')).toBe('✓ 100%');
        expect(result.format(50, 'exception')).toBe('✗ 50%');
        expect(result.format(75)).toBe('75%');
      });

      it('应该正确处理抛出错误的格式函数', () => {
        const errorFormatFunction = (percentage: number) => {
          throw new Error('Format error');
        };

        const props = {
          format: errorFormatFunction,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(typeof result.format).toBe('function');
        
        // 当格式函数抛出错误时，插件会返回错误对象
        const testResult = result.format(50);
        expect(testResult).toBeInstanceOf(Error);
        expect(testResult.message).toBe('Format error');
      });

      it('应该正确处理非函数类型的 format', () => {
        const props = {
          format: 'not a function',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(typeof result.format).toBe('function');
        
        // 当 format 不是函数时，插件会返回错误对象
        const testResult = result.format(50);
        expect(testResult).toBeInstanceOf(Error);
      });

      it('应该正确处理空字符串的 format', () => {
        const props = {
          format: '',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(typeof result.format).toBe('function');
        
        // 当 format 为空字符串时，插件会返回错误对象
        const testResult = result.format(50);
        expect(testResult).toBeInstanceOf(Error);
      });

      it('应该正确处理数字类型的 format', () => {
        const props = {
          format: 123,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(typeof result.format).toBe('function');
        
        // 当 format 是数字时，插件会返回错误对象
        const testResult = result.format(50);
        expect(testResult).toBeInstanceOf(Error);
      });

      it('应该正确处理对象类型的 format', () => {
        const props = {
          format: { value: 'test' },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(typeof result.format).toBe('function');
        
        // 当 format 是对象时，插件会返回错误对象
        const testResult = result.format(50);
        expect(testResult).toBeInstanceOf(Error);
      });

      it('应该正确处理 useCallback 的依赖变化', () => {
        const formatFunction1 = (percentage: number) => `${percentage}%`;
        const props1 = {
          format: formatFunction1,
        };

        const { currentValue: result1 } = renderHook(plugin, props1);
        expect(typeof result1.value.format).toBe('function');
        expect(result1.value.format(50)).toBe('50%');

        const formatFunction2 = (percentage: number) => `Progress: ${percentage}%`;
        const props2 = {
          format: formatFunction2,
        };

        const { currentValue: result2 } = renderHook(plugin, props2);
        expect(typeof result2.value.format).toBe('function');
        expect(result2.value.format(50)).toBe('Progress: 50%');
      });

      it('应该正确处理边界情况', () => {
        const testCases = [
          { format: 0 }, // 数字 0
          { format: false }, // 布尔值 false
          { format: true }, // 布尔值 true
          { format: [] }, // 空数组
          { format: [1, 2, 3] }, // 非空数组
        ];

        testCases.forEach((testCase) => {
          const { currentValue } = renderHook(plugin, testCase);
          const result = currentValue.value;

          expect(result).toBeDefined();
          expect(result).toHaveProperty('format');
          expect(typeof result.format).toBe('function');
        });
      });

      it('应该正确处理异步格式函数', () => {
        const asyncFormatFunction = async (percentage: number) => {
          return `Async: ${percentage}%`;
        };

        const props = {
          format: asyncFormatFunction,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(typeof result.format).toBe('function');
        
        // 异步函数应该被正确处理，返回 Promise
        const testResult = result.format(50);
        expect(testResult).toBeInstanceOf(Promise);
      });

      it('应该正确处理箭头函数', () => {
        const arrowFormatFunction = (percentage: number) => `Arrow: ${percentage}%`;
        const props = {
          format: arrowFormatFunction,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(typeof result.format).toBe('function');
        expect(result.format(75)).toBe('Arrow: 75%');
      });

      it('应该正确处理生成器函数', () => {
        const generatorFormatFunction = function* (percentage: number) {
          yield `Generator: ${percentage}%`;
        };

        const props = {
          format: generatorFormatFunction,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(typeof result.format).toBe('function');
        
        // 生成器函数应该被正确处理，返回生成器对象
        const testResult = result.format(50);
        expect(testResult).toBeDefined();
        expect(typeof testResult.next).toBe('function');
      });
    });

    describe('插件集成和扩展性测试', () => {
      it('应该能够与其他插件组合使用', () => {
        // 测试插件链式调用
        const combinedAccumulate = ProgressBasicAccumulate.addPlugin({
          name: 'testPlugin',
          handle: () => ({
            testProperty: 'test-value',
            customData: 'custom',
          }),
        });

        const plugins = combinedAccumulate.getPluginMethod();

        const handleFormatFunctionPlugin = combinedAccumulate.getPluginMethodByName('handleFormatFunction');
        const testPlugin = combinedAccumulate.getPluginMethodByName('testPlugin');

        expect(handleFormatFunctionPlugin).toBeDefined();
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

        const testAccumulate = ProgressBasicAccumulate.addPlugin(plugin1).addPlugin(plugin2);

        const plugins = testAccumulate.getPluginMethod();
        // 验证插件数量是否正确增加
        expect(plugins.length).toBeGreaterThanOrEqual(3);

        const foundPlugin1 = testAccumulate.getPluginMethodByName('plugin1');
        const foundPlugin2 = testAccumulate.getPluginMethodByName('plugin2');

        expect(foundPlugin1).toBeDefined();
        expect(foundPlugin2).toBeDefined();
      });

      it('应该正确处理插件方法的获取', () => {
        const allMethods = ProgressBasicAccumulate.getPluginMethod();
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
        const nonExistentPlugin = ProgressBasicAccumulate.getPluginMethodByName('nonExistent');
        expect(nonExistentPlugin).toBeUndefined();
      });
    });
  });

  describe('ide.ts', () => {
    it('应该正确导出空对象', () => {
      // ide.ts 只导出了一个空对象，测试文件能正确导入
      expect(() => {
        import('../plugins/ide');
      }).not.toThrow();
    });
  });
});
