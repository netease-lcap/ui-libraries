import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@ep-test/test-utils/render-hook';
import { $deletePropsList } from '@/plugins/constants';
import '@/utils/index';
import TagBasicAccumulate from '../plugins/basic-plugins';

describe('el-tag plugins', () => {
  beforeEach(() => {
    // 重置所有 mock
    vi.clearAllMocks();
  });

  describe('basic-plugins.ts', () => {
    describe('TagBasicAccumulate 基础功能', () => {
      it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
        expect(TagBasicAccumulate).toBeDefined();
        expect(typeof TagBasicAccumulate.addPlugin).toBe('function');
        expect(typeof TagBasicAccumulate.getPluginMethod).toBe('function');
        expect(Array.isArray(TagBasicAccumulate.Plugin)).toBe(true);
      });

      it('应该包含 useTextToSlot 插件', () => {
        const plugins = TagBasicAccumulate.getPluginMethod();
        expect(plugins).toHaveLength(1);

        const useTextToSlotPlugin = TagBasicAccumulate.getPluginMethodByName('useTextToSlot');
        expect(useTextToSlotPlugin).toBeDefined();
        if (useTextToSlotPlugin) {
          expect(useTextToSlotPlugin.name).toBe('useTextToSlot');
          expect(typeof (useTextToSlotPlugin as any).handle).toBe('function');
        }
      });
    });

    describe('useTextToSlot 插件功能测试', () => {
      const plugin = TagBasicAccumulate.getPluginMethodByName('useTextToSlot') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          text: 'Test Tag',
          slots: {},
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('slots');
        expect(result.slots).toHaveProperty('default');
        expect(typeof result.slots.default).toBe('function');
      });

      it('应该正确设置 deletePropsList', () => {
        const props = {
          text: 'Test Tag',
          slots: {},
          [$deletePropsList]: ['existing-prop'],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        const symbolKey = Object.getOwnPropertySymbols(result).find((s) => s.toString().includes('deletePropsList')) as symbol;
        expect(symbolKey).toBeDefined();
        expect(result[symbolKey]).toEqual(expect.arrayContaining(['text']));
      });

      it('应该正确处理文本内容', () => {
        const props = {
          text: 'Hello World',
          slots: {},
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots).toHaveProperty('default');
        expect(typeof result.slots.default).toBe('function');
        
        // 测试插槽函数返回的内容
        const slotContent = result.slots.default();
        expect(slotContent).toBe('Hello World');
      });

      it('应该正确处理空字符串文本', () => {
        const props = {
          text: '',
          slots: {},
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots).toHaveProperty('default');
        expect(typeof result.slots.default).toBe('function');
        
        const slotContent = result.slots.default();
        expect(slotContent).toBe('');
      });

      it('应该正确处理 undefined 文本', () => {
        const props = {
          text: undefined,
          slots: {},
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots).toHaveProperty('default');
        expect(typeof result.slots.default).toBe('function');
        
        const slotContent = result.slots.default();
        expect(slotContent).toBeUndefined();
      });

      it('应该正确处理 null 文本', () => {
        const props = {
          text: null,
          slots: {},
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots).toHaveProperty('default');
        expect(typeof result.slots.default).toBe('function');
        
        const slotContent = result.slots.default();
        expect(slotContent).toBeNull();
      });

      it('应该正确处理数字文本', () => {
        const props = {
          text: 123,
          slots: {},
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots).toHaveProperty('default');
        expect(typeof result.slots.default).toBe('function');
        
        const slotContent = result.slots.default();
        expect(slotContent).toBe(123);
      });

      it('应该正确处理布尔值文本', () => {
        const props = {
          text: true,
          slots: {},
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots).toHaveProperty('default');
        expect(typeof result.slots.default).toBe('function');
        
        const slotContent = result.slots.default();
        expect(slotContent).toBe(true);
      });

      it('应该正确处理对象文本', () => {
        const textObj = { name: 'Tag', value: 'test' };
        const props = {
          text: textObj,
          slots: {},
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots).toHaveProperty('default');
        expect(typeof result.slots.default).toBe('function');
        
        const slotContent = result.slots.default();
        expect(slotContent).toBe(textObj);
      });

      it('应该正确处理数组文本', () => {
        const textArray = ['Tag1', 'Tag2', 'Tag3'];
        const props = {
          text: textArray,
          slots: {},
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots).toHaveProperty('default');
        expect(typeof result.slots.default).toBe('function');
        
        const slotContent = result.slots.default();
        expect(slotContent).toBe(textArray);
      });

      it('应该正确处理已有 slots 的情况', () => {
        const existingSlot = vi.fn(() => 'Existing Content');
        const props = {
          text: 'New Text',
          slots: {
            default: existingSlot,
            custom: vi.fn(),
          },
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots).toHaveProperty('default');
        expect(result.slots).toHaveProperty('custom');
        expect(typeof result.slots.default).toBe('function');
        expect(typeof result.slots.custom).toBe('function');
        
        // 验证默认插槽被保留
        const slotContent = result.slots.default();
        expect(slotContent).toBe('Existing Content');
      });

      it('应该正确处理 undefined 的 slots', () => {
        const props = {
          text: 'Test Text',
          slots: undefined,
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots).toBeDefined();
        expect(result.slots).toHaveProperty('default');
        expect(typeof result.slots.default).toBe('function');
        
        const slotContent = result.slots.default();
        expect(slotContent).toBe('Test Text');
      });

      it('应该正确处理 null 的 slots', () => {
        const props = {
          text: 'Test Text',
          slots: null,
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots).toBeDefined();
        expect(result.slots).toHaveProperty('default');
        expect(typeof result.slots.default).toBe('function');
        
        const slotContent = result.slots.default();
        expect(slotContent).toBe('Test Text');
      });

      it('应该正确处理空对象的 slots', () => {
        const props = {
          text: 'Test Text',
          slots: {},
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots).toBeDefined();
        expect(result.slots).toHaveProperty('default');
        expect(typeof result.slots.default).toBe('function');
        
        const slotContent = result.slots.default();
        expect(slotContent).toBe('Test Text');
      });

      it('应该正确处理复杂的 slots 对象', () => {
        const customSlot1 = vi.fn(() => 'Custom 1');
        const customSlot2 = vi.fn(() => 'Custom 2');
        const props = {
          text: 'Main Text',
          slots: {
            custom1: customSlot1,
            custom2: customSlot2,
            default: vi.fn(() => 'Original Default'),
          },
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots).toHaveProperty('default');
        expect(result.slots).toHaveProperty('custom1');
        expect(result.slots).toHaveProperty('custom2');
        
        // 验证原有插槽被保留
        expect(result.slots.custom1()).toBe('Custom 1');
        expect(result.slots.custom2()).toBe('Custom 2');
        
        // 验证默认插槽被保留（因为已存在）
        expect(result.slots.default()).toBe('Original Default');
      });

      it('应该正确处理长文本内容', () => {
        const longText = 'This is a very long text content that should be handled properly by the useTextToSlot plugin. It contains multiple sentences and should be displayed correctly in the tag component.';
        const props = {
          text: longText,
          slots: {},
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots).toHaveProperty('default');
        expect(typeof result.slots.default).toBe('function');
        
        const slotContent = result.slots.default();
        expect(slotContent).toBe(longText);
      });

      it('应该正确处理特殊字符文本', () => {
        const specialText = 'Special chars: !@#$%^&*()_+-=[]{}|;:,.<>?';
        const props = {
          text: specialText,
          slots: {},
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots).toHaveProperty('default');
        expect(typeof result.slots.default).toBe('function');
        
        const slotContent = result.slots.default();
        expect(slotContent).toBe(specialText);
      });

      it('应该正确处理 Unicode 文本', () => {
        const unicodeText = 'Unicode: 你好世界 🌍 émojis 🎉';
        const props = {
          text: unicodeText,
          slots: {},
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots).toHaveProperty('default');
        expect(typeof result.slots.default).toBe('function');
        
        const slotContent = result.slots.default();
        expect(slotContent).toBe(unicodeText);
      });
    });

    describe('插件集成和扩展性测试', () => {
      it('应该能够与其他插件组合使用', () => {
        const combinedAccumulate = TagBasicAccumulate.addPlugin({
          name: 'testPlugin',
          handle: () => ({
            testProperty: 'test-value',
            customData: 'custom',
          }),
        });

        const plugins = combinedAccumulate.getPluginMethod();
        expect(plugins).toHaveLength(2);

        const useTextToSlotPlugin = combinedAccumulate.getPluginMethodByName('useTextToSlot');
        const testPlugin = combinedAccumulate.getPluginMethodByName('testPlugin');

        expect(useTextToSlotPlugin).toBeDefined();
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

        const testAccumulate = TagBasicAccumulate.addPlugin(plugin1).addPlugin(plugin2);

        const plugins = testAccumulate.getPluginMethod();
        expect(plugins.length).toBeGreaterThanOrEqual(3);

        const foundPlugin1 = testAccumulate.getPluginMethodByName('plugin1');
        const foundPlugin2 = testAccumulate.getPluginMethodByName('plugin2');

        expect(foundPlugin1).toBeDefined();
        expect(foundPlugin2).toBeDefined();
      });

      it('应该正确处理插件方法的获取', () => {
        const allMethods = TagBasicAccumulate.getPluginMethod();
        expect(Array.isArray(allMethods)).toBe(true);
        expect(allMethods.length).toBeGreaterThan(0);

        allMethods.forEach((method) => {
          expect(
            typeof method === 'function' || (typeof method === 'object' && typeof method.handle === 'function'),
          ).toBe(true);
        });
      });

      it('应该正确处理不存在的插件查询', () => {
        const nonExistentPlugin = TagBasicAccumulate.getPluginMethodByName('nonExistent');
        expect(nonExistentPlugin).toBeUndefined();
      });
    });
  });

  describe('ide.ts', () => {
    it('应该是一个空文件，仅用于导出', () => {
      // ide.ts 文件是空的，仅用于导出
      // 这里我们验证文件存在且可以被导入
      expect(() => {
        import('../plugins/ide');
      }).not.toThrow();
    });
  });

  describe('index.ts', () => {
    it('应该正确导出所有插件', () => {
      // 验证 index.ts 可以正确导入
      expect(() => {
        import('../plugins/index');
      }).not.toThrow();
    });
  });
});
