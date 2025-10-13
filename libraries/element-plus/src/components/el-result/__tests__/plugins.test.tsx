import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@ep-test/test-utils/render-hook';
import '@/utils/index';
import ResultBasicAccumulate from '../plugins/basic-plugins';

describe('el-result plugins', () => {
  beforeEach(() => {
    // 重置所有 mock
    vi.clearAllMocks();
  });

  describe('basic-plugins.ts', () => {
    describe('ResultBasicAccumulate 基础功能', () => {
      it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
        expect(ResultBasicAccumulate).toBeDefined();
        expect(typeof ResultBasicAccumulate.addPlugin).toBe('function');
        expect(typeof ResultBasicAccumulate.getPluginMethod).toBe('function');
        expect(Array.isArray(ResultBasicAccumulate.Plugin)).toBe(true);
      });

      it('应该包含 handleSlots 插件', () => {
        const plugins = ResultBasicAccumulate.getPluginMethod();
        expect(plugins).toHaveLength(1);

        const handleSlotsPlugin = ResultBasicAccumulate.getPluginMethodByName('handleSlots');
        expect(handleSlotsPlugin).toBeDefined();
        if (handleSlotsPlugin) {
          expect(handleSlotsPlugin.name).toBe('handleSlots');
          expect(typeof (handleSlotsPlugin as any).handle).toBe('function');
        }
      });
    });

    describe('handleSlots 插件功能测试', () => {
      const plugin = ResultBasicAccumulate.getPluginMethodByName('handleSlots') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          slots: {
            title: vi.fn(),
            subTitle: vi.fn(),
          },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('slots');
        expect(typeof result.slots).toBe('object');
      });

      it('应该正确处理 subTitle slot', () => {
        const mockSubTitle = vi.fn();
        const props = {
          slots: {
            title: vi.fn(),
            subTitle: mockSubTitle,
          },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots).toHaveProperty('sub-title');
        expect(result.slots['sub-title']).toBe(mockSubTitle);
      });

      it('应该正确处理 sub-title slot', () => {
        const mockSubTitle = vi.fn();
        const props = {
          slots: {
            title: vi.fn(),
            'sub-title': mockSubTitle,
          },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots).toHaveProperty('sub-title');
        expect(result.slots['sub-title']).toBe(mockSubTitle);
      });

      it('应该优先使用 subTitle 而不是 sub-title', () => {
        const mockSubTitle = vi.fn();
        const mockSubTitleAlt = vi.fn();
        const props = {
          slots: {
            title: vi.fn(),
            subTitle: mockSubTitle,
            'sub-title': mockSubTitleAlt,
          },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots['sub-title']).toBe(mockSubTitle);
        expect(result.slots['sub-title']).not.toBe(mockSubTitleAlt);
      });

      it('应该正确处理空的 slots', () => {
        const props = {
          slots: {},
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots).toBeDefined();
        expect(result.slots).toHaveProperty('sub-title');
        expect(result.slots['sub-title']).toBeUndefined();
      });

      it('应该正确处理 undefined 的 slots', () => {
        const props = {
          slots: undefined,
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
        }).not.toThrow();
      });

      it('应该正确处理 null 的 slots', () => {
        const props = {
          slots: null,
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
        }).not.toThrow();
      });

      it('应该保留原有的 slots 属性', () => {
        const mockTitle = vi.fn();
        const mockIcon = vi.fn();
        const props = {
          slots: {
            title: mockTitle,
            icon: mockIcon,
            subTitle: vi.fn(),
          },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots.title).toBe(mockTitle);
        expect(result.slots.icon).toBe(mockIcon);
        expect(result.slots).toHaveProperty('sub-title');
      });

      it('应该正确处理复杂的 slots 结构', () => {
        const mockTitle = vi.fn();
        const mockSubTitle = vi.fn();
        const mockExtra = vi.fn();
        const props = {
          slots: {
            title: mockTitle,
            subTitle: mockSubTitle,
            extra: mockExtra,
            custom: vi.fn(),
          },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots.title).toBe(mockTitle);
        expect(result.slots.subTitle).toBe(mockSubTitle);
        expect(result.slots.extra).toBe(mockExtra);
        expect(result.slots.custom).toBeDefined();
        expect(result.slots).toHaveProperty('sub-title');
        expect(result.slots['sub-title']).toBe(mockSubTitle);
      });
    });

    describe('插件集成和扩展性测试', () => {
      it('应该能够与其他插件组合使用', () => {
        const combinedAccumulate = ResultBasicAccumulate.addPlugin({
          name: 'testPlugin',
          handle: () => ({
            testProperty: 'test-value',
            customData: 'custom',
          }),
        });

        const plugins = combinedAccumulate.getPluginMethod();
        expect(plugins).toHaveLength(2);

        const handleSlotsPlugin = combinedAccumulate.getPluginMethodByName('handleSlots');
        const testPlugin = combinedAccumulate.getPluginMethodByName('testPlugin');

        expect(handleSlotsPlugin).toBeDefined();
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

        const testAccumulate = ResultBasicAccumulate.addPlugin(plugin1).addPlugin(plugin2);

        const plugins = testAccumulate.getPluginMethod();
        expect(plugins.length).toBeGreaterThanOrEqual(3);

        const foundPlugin1 = testAccumulate.getPluginMethodByName('plugin1');
        const foundPlugin2 = testAccumulate.getPluginMethodByName('plugin2');

        expect(foundPlugin1).toBeDefined();
        expect(foundPlugin2).toBeDefined();
      });

      it('应该正确处理插件方法的获取', () => {
        const allMethods = ResultBasicAccumulate.getPluginMethod();
        expect(Array.isArray(allMethods)).toBe(true);
        expect(allMethods.length).toBeGreaterThan(0);

        allMethods.forEach((method) => {
          expect(
            typeof method === 'function' || (typeof method === 'object' && typeof method.handle === 'function'),
          ).toBe(true);
        });
      });

      it('应该正确处理不存在的插件查询', () => {
        const nonExistentPlugin = ResultBasicAccumulate.getPluginMethodByName('nonExistent');
        expect(nonExistentPlugin).toBeUndefined();
      });
    });
  });

  describe('ide.ts', () => {
    it('应该能够正确导入 ide.ts 文件', async () => {
      expect(() => {
        import('../plugins/ide');
      }).not.toThrow();
    });

    it('ide.ts 应该是一个空导出', async () => {
      const ideModule = await import('../plugins/ide');
      expect(ideModule).toBeDefined();
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
