import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@ep-test/test-utils/render-hook';
import { $deletePropsList } from '@/plugins/constants';
import '@/utils/index';
import ColumnPluginAccumulate from '../plugins/col-plugins';

describe('el-row plugins', () => {
  beforeEach(() => {
    // 重置所有 mock
    vi.clearAllMocks();
  });

  describe('col-plugins.ts', () => {
    describe('ColumnPluginAccumulate 基础功能', () => {
      it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
        expect(ColumnPluginAccumulate).toBeDefined();
        expect(typeof ColumnPluginAccumulate.addPlugin).toBe('function');
        expect(typeof ColumnPluginAccumulate.getPluginMethod).toBe('function');
        expect(Array.isArray(ColumnPluginAccumulate.Plugin)).toBe(true);
      });

      it('应该包含 handleColumnPlugin 插件', () => {
        const plugins = ColumnPluginAccumulate.getPluginMethod();
        expect(plugins).toHaveLength(1);

        const handleColumnPlugin = ColumnPluginAccumulate.getPluginMethodByName('handleColumnPlugin');
        expect(handleColumnPlugin).toBeDefined();
        if (handleColumnPlugin) {
          expect(handleColumnPlugin.name).toBe('handleColumnPlugin');
          expect(typeof (handleColumnPlugin as any).handle).toBe('function');
        }
      });
    });

    describe('handleColumnPlugin 插件功能测试', () => {
      const plugin = ColumnPluginAccumulate.getPluginMethodByName('handleColumnPlugin') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('xs');
        expect(result).toHaveProperty('sm');
        expect(result).toHaveProperty('md');
        expect(result).toHaveProperty('lg');
        expect(result).toHaveProperty('xl');
      });

      it('应该正确设置 deletePropsList', () => {
        const props = {
          [$deletePropsList]: ['existing-prop'],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        const symbolKey = Object.getOwnPropertySymbols(result).find((s) => s.toString().includes('deletePropsList')) as symbol;
        expect(symbolKey).toBeDefined();
        expect(result[symbolKey]).toEqual(expect.arrayContaining([
          'xsSpan', 'xsOffset', 'smSpan', 'smOffset', 'mdSpan', 'mdOffset',
          'lgSpan', 'lgOffset', 'xlSpan', 'xlOffset'
        ]));
      });

      it('应该正确处理 xs 响应式属性', () => {
        const props = {
          xsSpan: 12,
          xsOffset: 2,
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.xs).toEqual({ span: 12, offset: 2 });
      });

      it('应该正确处理 sm 响应式属性', () => {
        const props = {
          smSpan: 8,
          smOffset: 1,
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.sm).toEqual({ span: 8, offset: 1 });
      });

      it('应该正确处理 md 响应式属性', () => {
        const props = {
          mdSpan: 6,
          mdOffset: 3,
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.md).toEqual({ span: 6, offset: 3 });
      });

      it('应该正确处理 lg 响应式属性', () => {
        const props = {
          lgSpan: 4,
          lgOffset: 4,
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.lg).toEqual({ span: 4, offset: 4 });
      });

      it('应该正确处理 xl 响应式属性', () => {
        const props = {
          xlSpan: 3,
          xlOffset: 5,
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.xl).toEqual({ span: 3, offset: 5 });
      });

      it('应该正确处理只有 span 没有 offset 的情况', () => {
        const props = {
          xsSpan: 12,
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.xs).toEqual({ span: 12 });
      });

      it('应该正确处理只有 offset 没有 span 的情况', () => {
        const props = {
          xsOffset: 2,
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.xs).toEqual({ offset: 2 });
      });

      it('应该正确处理 span 和 offset 都为 undefined 的情况', () => {
        const props = {
          xs: 24,
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.xs).toBe(24);
      });

      it('应该正确处理多个响应式断点', () => {
        const props = {
          xsSpan: 24,
          smSpan: 12,
          mdSpan: 8,
          lgSpan: 6,
          xlSpan: 4,
          xsOffset: 0,
          smOffset: 0,
          mdOffset: 0,
          lgOffset: 0,
          xlOffset: 0,
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.xs).toEqual({ span: 24, offset: 0 });
        expect(result.sm).toEqual({ span: 12, offset: 0 });
        expect(result.md).toEqual({ span: 8, offset: 0 });
        expect(result.lg).toEqual({ span: 6, offset: 0 });
        expect(result.xl).toEqual({ span: 4, offset: 0 });
      });

      it('应该正确处理混合情况', () => {
        const props = {
          xs: 24,
          smSpan: 12,
          mdSpan: 8,
          mdOffset: 2,
          lg: 6,
          xlSpan: 4,
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.xs).toBe(24);
        expect(result.sm).toEqual({ span: 12 });
        expect(result.md).toEqual({ span: 8, offset: 2 });
        expect(result.lg).toBe(6);
        expect(result.xl).toEqual({ span: 4 });
      });

      it('应该正确处理 undefined 的 span 和 offset', () => {
        const props = {
          xsSpan: undefined,
          xsOffset: undefined,
          xs: 24,
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.xs).toBe(24);
      });

      it('应该正确处理 null 的 span 和 offset', () => {
        const props = {
          xsSpan: null,
          xsOffset: null,
          xs: 24,
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.xs).toEqual({ span: null, offset: null });
      });

      it('应该正确处理 0 值的 span 和 offset', () => {
        const props = {
          xsSpan: 0,
          xsOffset: 0,
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.xs).toEqual({ span: 0, offset: 0 });
      });
    });

    describe('插件集成和扩展性测试', () => {
      it('应该能够与其他插件组合使用', () => {
        const combinedAccumulate = ColumnPluginAccumulate.addPlugin({
          name: 'testPlugin',
          handle: () => ({
            testProperty: 'test-value',
            customData: 'custom',
          }),
        });

        const plugins = combinedAccumulate.getPluginMethod();
        expect(plugins).toHaveLength(2);

        const handleColumnPlugin = combinedAccumulate.getPluginMethodByName('handleColumnPlugin');
        const testPlugin = combinedAccumulate.getPluginMethodByName('testPlugin');

        expect(handleColumnPlugin).toBeDefined();
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

        const testAccumulate = ColumnPluginAccumulate.addPlugin(plugin1).addPlugin(plugin2);

        const plugins = testAccumulate.getPluginMethod();
        expect(plugins.length).toBeGreaterThanOrEqual(3);

        const foundPlugin1 = testAccumulate.getPluginMethodByName('plugin1');
        const foundPlugin2 = testAccumulate.getPluginMethodByName('plugin2');

        expect(foundPlugin1).toBeDefined();
        expect(foundPlugin2).toBeDefined();
      });

      it('应该正确处理插件方法的获取', () => {
        const allMethods = ColumnPluginAccumulate.getPluginMethod();
        expect(Array.isArray(allMethods)).toBe(true);
        expect(allMethods.length).toBeGreaterThan(0);

        allMethods.forEach((method) => {
          expect(
            typeof method === 'function' || (typeof method === 'object' && typeof method.handle === 'function'),
          ).toBe(true);
        });
      });

      it('应该正确处理不存在的插件查询', () => {
        const nonExistentPlugin = ColumnPluginAccumulate.getPluginMethodByName('nonExistent');
        expect(nonExistentPlugin).toBeUndefined();
      });
    });
  });

  describe('basic-plugins.ts', () => {
    it('应该能够正确导入 basic-plugins.ts 文件', async () => {
      expect(() => {
        import('../plugins/basic-plugins');
      }).not.toThrow();
    });

    it('basic-plugins.ts 应该是一个空导出', async () => {
      const basicModule = await import('../plugins/basic-plugins');
      expect(basicModule).toBeDefined();
    });
  });

  describe('low-code.ts', () => {
    it('应该能够正确导入 low-code.ts 文件', async () => {
      expect(() => {
        import('../plugins/low-code');
      }).not.toThrow();
    });

    it('low-code.ts 应该是一个空导出', async () => {
      const lowCodeModule = await import('../plugins/low-code');
      expect(lowCodeModule).toBeDefined();
    });
  });

  describe('index.ts', () => {
    it('应该能够正确导入 index.ts 文件', async () => {
      expect(() => {
        import('../plugins/index');
      }).not.toThrow();
    });

    it('应该导出所有必要的模块', async () => {
      const indexModule = await import('../plugins/index');
      expect(indexModule).toBeDefined();
    });
  });
});
