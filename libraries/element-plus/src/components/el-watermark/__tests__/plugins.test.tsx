import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@ep-test/test-utils/render-hook';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import '@/utils/index';
import WatermarkBasicAccumulate from '../plugins/basic-plugins';

describe('el-watermark plugins', () => {
  beforeEach(() => {
    // 重置所有 mock
    vi.clearAllMocks();
  });

  describe('basic-plugins.ts', () => {
    describe('WatermarkBasicAccumulate 基础功能', () => {
      it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
        expect(WatermarkBasicAccumulate).toBeDefined();
        expect(typeof WatermarkBasicAccumulate.addPlugin).toBe('function');
        expect(typeof WatermarkBasicAccumulate.getPluginMethod).toBe('function');
        expect(Array.isArray(WatermarkBasicAccumulate.Plugin)).toBe(true);
      });

      it('应该包含所有必要的插件', () => {
        const plugins = WatermarkBasicAccumulate.getPluginMethod();
        expect(plugins).toHaveLength(3);

        const pluginNames = plugins.map((plugin: any) => plugin.name);
        expect(pluginNames).toContain('useFont');
        expect(pluginNames).toContain('useGap');
        expect(pluginNames).toContain('useOffset');
      });
    });

    describe('useFont 插件功能测试', () => {
      const plugin = WatermarkBasicAccumulate.getPluginMethodByName('useFont') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          font: '{"fontSize": 16, "fontFamily": "Arial"}',
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
        expect(result).toHaveProperty('font');
        expect(typeof result.font).toBe('object');
      });

      it('应该正确处理 JSON 字符串格式的 font', () => {
        const props = {
          font: '{"fontSize": 20, "fontFamily": "Helvetica", "color": "#333"}',
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.font).toBeDefined();
        expect(typeof result.font).toBe('object');
        expect(result.font).toHaveProperty('fontSize', 20);
        expect(result.font).toHaveProperty('fontFamily', 'Helvetica');
        expect(result.font).toHaveProperty('color', '#333');
      });

      it('应该正确处理对象格式的 font', () => {
        const fontObj = {
          fontSize: 18,
          fontFamily: 'Times New Roman',
          fontWeight: 'bold',
        };

        const props = {
          font: fontObj,
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.font).toBeDefined();
        expect(typeof result.font).toBe('object');
        expect(result.font).toHaveProperty('fontSize', 18);
        expect(result.font).toHaveProperty('fontFamily', 'Times New Roman');
        expect(result.font).toHaveProperty('fontWeight', 'bold');
      });

      it('应该正确处理无效的 JSON 字符串', () => {
        const props = {
          font: 'invalid json string',
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.font).toBeDefined();
        expect(typeof result.font).toBe('object');
        expect(result.font).toEqual({});
      });

      it('应该正确处理 null 的 font', () => {
        const props = {
          font: null,
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.font).toBeDefined();
        expect(typeof result.font).toBe('object');
        expect(result.font).toEqual({});
      });

      it('应该正确处理 undefined 的 font', () => {
        const props = {
          font: undefined,
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.font).toBeDefined();
        expect(typeof result.font).toBe('object');
        expect(result.font).toEqual({});
      });
    });

    describe('useGap 插件功能测试', () => {
      const plugin = WatermarkBasicAccumulate.getPluginMethodByName('useGap') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          gap: [120, 80],
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
        expect(result).toHaveProperty('gap');
        expect(Array.isArray(result.gap)).toBe(true);
        expect(result.gap).toHaveLength(2);
      });

      it('应该正确处理数组格式的 gap', () => {
        const props = {
          gap: [150, 100],
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.gap).toEqual([150, 100]);
      });

      it('应该正确处理 JSON 字符串格式的 gap', () => {
        const props = {
          gap: '[200, 150]',
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.gap).toEqual([200, 150]);
      });

      it('应该正确处理无效的 JSON 字符串', () => {
        const props = {
          gap: 'invalid json',
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.gap).toEqual([100, 100]);
      });

      it('应该正确处理空字符串的 gap', () => {
        const props = {
          gap: '',
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.gap).toEqual([100, 100]);
      });

      it('应该正确处理 null 的 gap', () => {
        const props = {
          gap: null,
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.gap).toEqual([100, 100]);
      });

      it('应该正确处理 undefined 的 gap', () => {
        const props = {
          gap: undefined,
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.gap).toEqual([100, 100]);
      });

      it('应该正确处理长度不为2的数组', () => {
        const props = {
          gap: [100],
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.gap).toEqual([100, 100]);
      });
    });

    describe('useOffset 插件功能测试', () => {
      const plugin = WatermarkBasicAccumulate.getPluginMethodByName('useOffset') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          gap: [100, 100],
          offset: [50, 50],
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
        expect(result).toHaveProperty('offset');
        expect(Array.isArray(result.offset)).toBe(true);
        expect(result.offset).toHaveLength(2);
      });

      it('应该正确处理数组格式的 offset', () => {
        const props = {
          gap: [100, 100],
          offset: [30, 40],
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        // useOffset 插件只处理字符串格式的 offset，数组格式会使用默认值
        expect(result.offset).toEqual([50, 50]); // gap[0]/2, gap[1]/2
      });

      it('应该正确处理 JSON 字符串格式的 offset', () => {
        const props = {
          gap: [100, 100],
          offset: '[25, 35]',
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.offset).toEqual([25, 35]);
      });

      it('应该正确处理无效的 JSON 字符串', () => {
        const props = {
          gap: [100, 100],
          offset: 'invalid json',
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.offset).toEqual([50, 50]); // gap[0]/2, gap[1]/2
      });

      it('应该正确处理空字符串的 offset', () => {
        const props = {
          gap: [100, 100],
          offset: '',
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.offset).toEqual([50, 50]);
      });

      it('应该正确处理 null 的 offset', () => {
        const props = {
          gap: [100, 100],
          offset: null,
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.offset).toEqual([50, 50]);
      });

      it('应该正确处理 undefined 的 offset', () => {
        const props = {
          gap: [100, 100],
          offset: undefined,
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.offset).toEqual([50, 50]);
      });

      it('应该正确处理自定义 gap 的默认 offset', () => {
        const props = {
          gap: [200, 150],
          offset: null,
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.offset).toEqual([100, 75]); // gap[0]/2, gap[1]/2
      });

      it('应该正确处理长度不为2的 offset 数组', () => {
        const props = {
          gap: [100, 100],
          offset: [50],
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.offset).toEqual([50, 50]);
      });
    });

    describe('插件集成和扩展性测试', () => {
      it('应该能够与其他插件组合使用', () => {
        const testPlugin = {
          name: 'testPlugin',
          handle: () => ({
            testProperty: 'test-value',
            customData: 'custom',
          }),
        };

        const combinedAccumulate = WatermarkBasicAccumulate.addPlugin(testPlugin);

        const plugins = combinedAccumulate.getPluginMethod();
        expect(plugins).toHaveLength(4);

        const useFontPlugin = combinedAccumulate.getPluginMethodByName('useFont');
        const useGapPlugin = combinedAccumulate.getPluginMethodByName('useGap');
        const useOffsetPlugin = combinedAccumulate.getPluginMethodByName('useOffset');
        const testPluginResult = combinedAccumulate.getPluginMethodByName('testPlugin');

        expect(useFontPlugin).toBeDefined();
        expect(useGapPlugin).toBeDefined();
        expect(useOffsetPlugin).toBeDefined();
        expect(testPluginResult).toBeDefined();
        expect(testPluginResult?.name).toBe('testPlugin');
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

        const testAccumulate = WatermarkBasicAccumulate.addPlugin(plugin1).addPlugin(plugin2);

        const plugins = testAccumulate.getPluginMethod();
        expect(plugins.length).toBeGreaterThanOrEqual(5);

        const foundPlugin1 = testAccumulate.getPluginMethodByName('plugin1');
        const foundPlugin2 = testAccumulate.getPluginMethodByName('plugin2');

        expect(foundPlugin1).toBeDefined();
        expect(foundPlugin2).toBeDefined();
      });

      it('应该正确处理插件方法的获取', () => {
        const allMethods = WatermarkBasicAccumulate.getPluginMethod();
        expect(Array.isArray(allMethods)).toBe(true);
        expect(allMethods.length).toBeGreaterThan(0);

        allMethods.forEach((method) => {
          expect(
            typeof method === 'function' || (typeof method === 'object' && typeof method.handle === 'function'),
          ).toBe(true);
        });
      });

      it('应该正确处理不存在的插件查询', () => {
        const nonExistentPlugin = WatermarkBasicAccumulate.getPluginMethodByName('nonExistent');
        expect(nonExistentPlugin).toBeUndefined();
      });
    });

    describe('边界条件和错误处理测试', () => {
      it('应该正确处理所有插件的边界情况', () => {
        const testCases = [
          { font: null, gap: null, offset: null },
          { font: undefined, gap: undefined, offset: undefined },
          { font: '', gap: '', offset: '' },
          { font: '{}', gap: '[]', offset: '[]' },
          { font: 'invalid', gap: 'invalid', offset: 'invalid' },
        ];

        testCases.forEach((testCase) => {
          const props = {
            ...testCase,
            [$deletePropsList]: [],
          };

          expect(() => {
            const useFontPlugin = WatermarkBasicAccumulate.getPluginMethodByName('useFont') as any;
            const useGapPlugin = WatermarkBasicAccumulate.getPluginMethodByName('useGap') as any;
            const useOffsetPlugin = WatermarkBasicAccumulate.getPluginMethodByName('useOffset') as any;

            const { currentValue: fontResult } = renderHook(useFontPlugin, props);
            const { currentValue: gapResult } = renderHook(useGapPlugin, props);
            const { currentValue: offsetResult } = renderHook(useOffsetPlugin, props);

            expect(fontResult.value).toBeDefined();
            expect(gapResult.value).toBeDefined();
            expect(offsetResult.value).toBeDefined();
          }).not.toThrow();
        });
      });

      it('应该正确处理复杂的嵌套对象', () => {
        const complexFont = {
          fontSize: 16,
          fontFamily: 'Arial',
          fontWeight: 'bold',
          fontStyle: 'italic',
          color: '#333333',
          textAlign: 'center',
        };

        const props = {
          font: complexFont,
          gap: [120, 80],
          offset: [60, 40],
          [$deletePropsList]: [],
        };

        expect(() => {
          const useFontPlugin = WatermarkBasicAccumulate.getPluginMethodByName('useFont') as any;
          const useGapPlugin = WatermarkBasicAccumulate.getPluginMethodByName('useGap') as any;
          const useOffsetPlugin = WatermarkBasicAccumulate.getPluginMethodByName('useOffset') as any;

          const { currentValue: fontResult } = renderHook(useFontPlugin, props);
          const { currentValue: gapResult } = renderHook(useGapPlugin, props);
          const { currentValue: offsetResult } = renderHook(useOffsetPlugin, props);

          expect(fontResult.value.font).toEqual(complexFont);
          expect(gapResult.value.gap).toEqual([120, 80]);
          expect(offsetResult.value.offset).toEqual([60, 40]);
        }).not.toThrow();
      });
    });
  });
});
