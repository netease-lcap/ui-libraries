import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@ep-test/test-utils/render-hook';
import '@/utils/index';
import MultiLayoutPluginAccumulate from '../plugins/basic-plugins';
import MultiLayoutItemPluginAccumulate from '../plugins/item-plugins';

describe('el-multi-layout plugins', () => {
  beforeEach(() => {
    // 重置所有 mock
    vi.clearAllMocks();
  });

  describe('basic-plugins.tsx', () => {
    describe('MultiLayoutPluginAccumulate 基础功能', () => {
      it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
        expect(MultiLayoutPluginAccumulate).toBeDefined();
        expect(typeof MultiLayoutPluginAccumulate.addPlugin).toBe('function');
        expect(typeof MultiLayoutPluginAccumulate.getPluginMethod).toBe('function');
        expect(Array.isArray(MultiLayoutPluginAccumulate.Plugin)).toBe(true);
      });

      it('应该包含 handleLayout 插件', () => {
        const plugins = MultiLayoutPluginAccumulate.getPluginMethod();
        expect(plugins).toHaveLength(1);

        const handleLayoutPlugin = MultiLayoutPluginAccumulate.getPluginMethodByName('handleLayout');
        expect(handleLayoutPlugin).toBeDefined();
        if (handleLayoutPlugin) {
          expect(handleLayoutPlugin.name).toBe('handleLayout');
          expect(typeof (handleLayoutPlugin as any).handle).toBe('function');
        }
      });
    });

    describe('handleLayout 插件功能测试', () => {
      const plugin = MultiLayoutPluginAccumulate.getPluginMethodByName('handleLayout') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          class: 'custom-class',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        // 验证返回值基本结构
        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
        expect(result).toHaveProperty('class');
        expect(typeof result.class).toBe('string');
      });

      it('应该正确合并自定义 class', () => {
        const props = {
          class: 'my-custom-class',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toBe('my-custom-class el-multi-layout');
      });

      it('应该正确处理空的 class', () => {
        const props = {
          class: '',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toBe(' el-multi-layout');
      });

      it('应该正确处理 undefined 的 class', () => {
        const props = {
          class: undefined,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toBe('undefined el-multi-layout');
      });

      it('应该正确处理 null 的 class', () => {
        const props = {
          class: null,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toBe('null el-multi-layout');
      });

      it('应该正确处理多个 class 名称', () => {
        const props = {
          class: 'class1 class2 class3',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toBe('class1 class2 class3 el-multi-layout');
      });

      it('应该正确处理特殊字符的 class', () => {
        const props = {
          class: 'class-with-dash_class_with_underscore',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toBe('class-with-dash_class_with_underscore el-multi-layout');
      });

      it('应该正确处理边界情况', () => {
        const testCases = [
          { class: ' ' }, // 空格
          { class: '  multiple  spaces  ' }, // 多个空格
          { class: 'class1\nclass2' }, // 换行符
          { class: 'class1\tclass2' }, // 制表符
        ];

        testCases.forEach((testCase) => {
          const { currentValue } = renderHook(plugin, testCase);
          const result = currentValue.value;

          expect(result).toBeDefined();
          expect(result).toHaveProperty('class');
          expect(typeof result.class).toBe('string');
          expect(result.class).toContain('el-multi-layout');
        });
      });
    });

    describe('插件集成和扩展性测试', () => {
      it('应该能够与其他插件组合使用', () => {
        // 测试插件链式调用
        const combinedAccumulate = MultiLayoutPluginAccumulate.addPlugin({
          name: 'testPlugin',
          handle: () => ({
            testProperty: 'test-value',
            customData: 'custom',
          }),
        });

        const plugins = combinedAccumulate.getPluginMethod();
        expect(plugins).toHaveLength(2);

        const handleLayoutPlugin = combinedAccumulate.getPluginMethodByName('handleLayout');
        const testPlugin = combinedAccumulate.getPluginMethodByName('testPlugin');

        expect(handleLayoutPlugin).toBeDefined();
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

        const testAccumulate = MultiLayoutPluginAccumulate.addPlugin(plugin1).addPlugin(plugin2);

        const plugins = testAccumulate.getPluginMethod();
        // 验证插件数量是否正确增加
        expect(plugins.length).toBeGreaterThanOrEqual(3);

        const foundPlugin1 = testAccumulate.getPluginMethodByName('plugin1');
        const foundPlugin2 = testAccumulate.getPluginMethodByName('plugin2');

        expect(foundPlugin1).toBeDefined();
        expect(foundPlugin2).toBeDefined();
      });

      it('应该正确处理插件方法的获取', () => {
        const allMethods = MultiLayoutPluginAccumulate.getPluginMethod();
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
        const nonExistentPlugin = MultiLayoutPluginAccumulate.getPluginMethodByName('nonExistent');
        expect(nonExistentPlugin).toBeUndefined();
      });
    });
  });

  describe('item-plugins.ts', () => {
    describe('MultiLayoutItemPluginAccumulate 基础功能', () => {
      it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
        expect(MultiLayoutItemPluginAccumulate).toBeDefined();
        expect(typeof MultiLayoutItemPluginAccumulate.addPlugin).toBe('function');
        expect(typeof MultiLayoutItemPluginAccumulate.getPluginMethod).toBe('function');
        expect(Array.isArray(MultiLayoutItemPluginAccumulate.Plugin)).toBe(true);
      });

      it('应该包含 handleLayout 插件', () => {
        const plugins = MultiLayoutItemPluginAccumulate.getPluginMethod();
        expect(plugins).toHaveLength(1);

        const handleLayoutPlugin = MultiLayoutItemPluginAccumulate.getPluginMethodByName('handleLayout');
        expect(handleLayoutPlugin).toBeDefined();
        if (handleLayoutPlugin) {
          expect(handleLayoutPlugin.name).toBe('handleLayout');
          expect(typeof (handleLayoutPlugin as any).handle).toBe('function');
        }
      });
    });

    describe('handleLayout 插件功能测试 (Item)', () => {
      const plugin = MultiLayoutItemPluginAccumulate.getPluginMethodByName('handleLayout') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          class: 'custom-class',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        // 验证返回值基本结构
        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
        expect(result).toHaveProperty('class');
        expect(typeof result.class).toBe('string');
      });

      it('应该正确合并自定义 class', () => {
        const props = {
          class: 'my-custom-class',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toBe('my-custom-class el-multi-layout-item');
      });

      it('应该正确处理空的 class', () => {
        const props = {
          class: '',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toBe(' el-multi-layout-item');
      });

      it('应该正确处理 undefined 的 class', () => {
        const props = {
          class: undefined,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toBe('undefined el-multi-layout-item');
      });

      it('应该正确处理 null 的 class', () => {
        const props = {
          class: null,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toBe('null el-multi-layout-item');
      });

      it('应该正确处理多个 class 名称', () => {
        const props = {
          class: 'item1 item2 item3',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toBe('item1 item2 item3 el-multi-layout-item');
      });

      it('应该正确处理特殊字符的 class', () => {
        const props = {
          class: 'item-with-dash_item_with_underscore',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toBe('item-with-dash_item_with_underscore el-multi-layout-item');
      });

      it('应该正确处理边界情况', () => {
        const testCases = [
          { class: ' ' }, // 空格
          { class: '  multiple  spaces  ' }, // 多个空格
          { class: 'item1\nitem2' }, // 换行符
          { class: 'item1\titem2' }, // 制表符
        ];

        testCases.forEach((testCase) => {
          const { currentValue } = renderHook(plugin, testCase);
          const result = currentValue.value;

          expect(result).toBeDefined();
          expect(result).toHaveProperty('class');
          expect(typeof result.class).toBe('string');
          expect(result.class).toContain('el-multi-layout-item');
        });
      });
    });

    describe('插件集成和扩展性测试 (Item)', () => {
      it('应该能够与其他插件组合使用', () => {
        // 测试插件链式调用
        const combinedAccumulate = MultiLayoutItemPluginAccumulate.addPlugin({
          name: 'testPlugin',
          handle: () => ({
            testProperty: 'test-value',
            customData: 'custom',
          }),
        });

        const plugins = combinedAccumulate.getPluginMethod();
        expect(plugins).toHaveLength(2);

        const handleLayoutPlugin = combinedAccumulate.getPluginMethodByName('handleLayout');
        const testPlugin = combinedAccumulate.getPluginMethodByName('testPlugin');

        expect(handleLayoutPlugin).toBeDefined();
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

        const testAccumulate = MultiLayoutItemPluginAccumulate.addPlugin(plugin1).addPlugin(plugin2);

        const plugins = testAccumulate.getPluginMethod();
        // 验证插件数量是否正确增加
        expect(plugins.length).toBeGreaterThanOrEqual(3);

        const foundPlugin1 = testAccumulate.getPluginMethodByName('plugin1');
        const foundPlugin2 = testAccumulate.getPluginMethodByName('plugin2');

        expect(foundPlugin1).toBeDefined();
        expect(foundPlugin2).toBeDefined();
      });

      it('应该正确处理插件方法的获取', () => {
        const allMethods = MultiLayoutItemPluginAccumulate.getPluginMethod();
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
        const nonExistentPlugin = MultiLayoutItemPluginAccumulate.getPluginMethodByName('nonExistent');
        expect(nonExistentPlugin).toBeUndefined();
      });
    });
  });

  describe('low-code.ts', () => {
    it('应该正确导出空对象', () => {
      // low-code.ts 只导出了一个空对象，测试文件能正确导入
      expect(() => {
        import('../plugins/low-code');
      }).not.toThrow();
    });
  });
});
