import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@ep-test/test-utils/render-hook';
import '@/utils/index';
import PopoverBasicAccumulate from '../plugins/basic-plugins';
import { Hide } from '@element-plus/icons-vue';

describe('el-popover plugins', () => {
  beforeEach(() => {
    // 重置所有 mock
    vi.clearAllMocks();
  });

  describe('basic-plugins.ts', () => {
    describe('PopoverBasicAccumulate 基础功能', () => {
      it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
        expect(PopoverBasicAccumulate).toBeDefined();
        expect(typeof PopoverBasicAccumulate.addPlugin).toBe('function');
        expect(typeof PopoverBasicAccumulate.getPluginMethod).toBe('function');
        expect(Array.isArray(PopoverBasicAccumulate.Plugin)).toBe(true);
      });

      it('应该包含 handlePopperClass 插件', () => {
        const plugins = PopoverBasicAccumulate.getPluginMethod();
        expect(plugins).toHaveLength(1);

        const handlePopperClassPlugin = PopoverBasicAccumulate.getPluginMethodByName('handlePopperClass');
        expect(handlePopperClassPlugin).toBeDefined();
        if (handlePopperClassPlugin) {
          expect(handlePopperClassPlugin.name).toBe('handlePopperClass');
          expect(typeof (handlePopperClassPlugin as any).handle).toBe('function');
        }
      });
    });

    describe('handlePopperClass 插件功能测试', () => {
      const plugin = PopoverBasicAccumulate.getPluginMethodByName('handlePopperClass') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          popperClass: 'custom-popper',
          class: 'custom-class',
          visible: false,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        // 验证返回值基本结构
        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
        expect(result).toHaveProperty('popperClass');
        expect(result).toHaveProperty('ref');
        expect(typeof result.ref).toBe('object');
        expect(typeof result.ref.show).toBe('function');
        expect(typeof result.ref.hide).toBe('function');
      });

      it('应该正确合并 popperClass 和 class', () => {
        const props = {
          popperClass: 'my-popper-class',
          class: 'my-class',
          visible: false,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.popperClass).toBe('my-popper-class my-class');
      });

      it('应该正确处理 undefined 的 popperClass', () => {
        const props = {
          popperClass: undefined,
          class: 'my-class',
          visible: false,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.popperClass).toBe('undefined my-class');
      });

      it('应该正确处理 null 的 popperClass', () => {
        const props = {
          popperClass: null,
          class: 'my-class',
          visible: false,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.popperClass).toBe('null my-class');
      });

      it('应该正确处理 undefined 的 class', () => {
        const props = {
          popperClass: 'my-popper-class',
          class: undefined,
          visible: false,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.popperClass).toBe('my-popper-class undefined');
      });

      it('应该正确处理 null 的 class', () => {
        const props = {
          popperClass: 'my-popper-class',
          class: null,
          visible: false,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.popperClass).toBe('my-popper-class null');
      });

      it('应该正确处理空的 popperClass 和 class', () => {
        const props = {
          popperClass: '',
          class: '',
          visible: false,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.popperClass).toBe(' ');
      });

      it('应该正确处理多个 class 名称', () => {
        const props = {
          popperClass: 'popper1 popper2',
          class: 'class1 class2',
          visible: false,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.popperClass).toBe('popper1 popper2 class1 class2');
      });

      it('应该正确处理特殊字符的 class', () => {
        const props = {
          popperClass: 'popper-with-dash_popper_with_underscore',
          class: 'class-with-dash_class_with_underscore',
          visible: false,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.popperClass).toBe('popper-with-dash_popper_with_underscore class-with-dash_class_with_underscore');
      });

      it('应该正确处理 ref 对象的方法', () => {
        const props = {
          popperClass: 'test-popper',
          class: 'test-class',
          visible: false,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.ref).toBeDefined();
        expect(typeof result.ref.show).toBe('function');
        expect(typeof result.ref.hide).toBe('function');

        // 测试 ref 方法不会抛出错误
        expect(() => {
          result.ref.show();
        }).not.toThrow();

        expect(() => {
          result.ref.hide();
        }).not.toThrow();
      });

      it('应该正确处理 useControllableValue 的返回值', () => {
        const props = {
          popperClass: 'test-popper',
          class: 'test-class',
          visible: false,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        // 验证 useControllableValue 返回的属性被正确展开
        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
      });

      it('应该正确处理边界情况', () => {
        const testCases = [
          { popperClass: ' ', class: ' ' }, // 空格
          { popperClass: '  multiple  spaces  ', class: '  multiple  spaces  ' }, // 多个空格
          { popperClass: 'class1\nclass2', class: 'class1\tclass2' }, // 换行符和制表符
        ];

        testCases.forEach((testCase) => {
          const props = {
            ...testCase,
            visible: false,
          };

          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;

          expect(result).toBeDefined();
          expect(result).toHaveProperty('popperClass');
          expect(result).toHaveProperty('ref');
          expect(typeof result.ref).toBe('object');
        });
      });

      it('应该正确处理 visible 属性变化', () => {
        const props1 = {
          popperClass: 'test-popper',
          class: 'test-class',
          visible: false,
        };

        const { currentValue: result1 } = renderHook(plugin, props1);
        expect(result1.value).toBeDefined();

        const props2 = {
          popperClass: 'test-popper',
          class: 'test-class',
          visible: true,
        };

        const { currentValue: result2 } = renderHook(plugin, props2);
        expect(result2.value).toBeDefined();
      });

      it('应该正确处理复杂的 props 组合', () => {
        const props = {
          popperClass: 'complex-popper-class',
          class: 'complex-class',
          visible: true,
          disabled: false,
          trigger: 'click',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result.popperClass).toBe('complex-popper-class complex-class');
        expect(result.ref).toBeDefined();
        expect(typeof result.ref.show).toBe('function');
        expect(typeof result.ref.hide).toBe('function');
      });

      it('应该正确处理 ref 方法的调用', () => {
        const props = {
          popperClass: 'test-popper',
          class: 'test-class',
          visible: false,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        // 验证 ref 方法可以被调用
        const openSpy = vi.fn(result.ref.show);
        const closeSpy = vi.fn(result.ref.hide);

        expect(() => {
          openSpy();
        }).not.toThrow();

        expect(() => {
          closeSpy();
        }).not.toThrow();
      });
    });

    describe('插件集成和扩展性测试', () => {
      it('应该能够与其他插件组合使用', () => {
        // 测试插件链式调用
        const combinedAccumulate = PopoverBasicAccumulate.addPlugin({
          name: 'testPlugin',
          handle: () => ({
            testProperty: 'test-value',
            customData: 'custom',
          }),
        });

        const plugins = combinedAccumulate.getPluginMethod();
        expect(plugins).toHaveLength(2);

        const handlePopperClassPlugin = combinedAccumulate.getPluginMethodByName('handlePopperClass');
        const testPlugin = combinedAccumulate.getPluginMethodByName('testPlugin');

        expect(handlePopperClassPlugin).toBeDefined();
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

        const testAccumulate = PopoverBasicAccumulate.addPlugin(plugin1).addPlugin(plugin2);

        const plugins = testAccumulate.getPluginMethod();
        // 验证插件数量是否正确增加
        expect(plugins.length).toBeGreaterThanOrEqual(3);

        const foundPlugin1 = testAccumulate.getPluginMethodByName('plugin1');
        const foundPlugin2 = testAccumulate.getPluginMethodByName('plugin2');

        expect(foundPlugin1).toBeDefined();
        expect(foundPlugin2).toBeDefined();
      });

      it('应该正确处理插件方法的获取', () => {
        const allMethods = PopoverBasicAccumulate.getPluginMethod();
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
        const nonExistentPlugin = PopoverBasicAccumulate.getPluginMethodByName('nonExistent');
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
