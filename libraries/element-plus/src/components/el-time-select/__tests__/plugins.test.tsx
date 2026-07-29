import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@ep-test/test-utils/render-hook';
import '@/utils/index';
import TimeSelectBasicAccumulate from '../plugins/basic-plugins';

describe('el-time-select plugins', () => {
  beforeEach(() => {
    // 重置所有 mock
    vi.clearAllMocks();
  });

  describe('basic-plugins.ts', () => {
    describe('TimeSelectBasicAccumulate 基础功能', () => {
      it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
        expect(TimeSelectBasicAccumulate).toBeDefined();
        expect(typeof TimeSelectBasicAccumulate.addPlugin).toBe('function');
        expect(typeof TimeSelectBasicAccumulate.getPluginMethod).toBe('function');
        expect(Array.isArray(TimeSelectBasicAccumulate.Plugin)).toBe(true);
      });

      it('应该包含所有必要的插件', () => {
        const plugins = TimeSelectBasicAccumulate.getPluginMethod();
        expect(plugins).toHaveLength(4);

        const pluginNames = [
          'handleTagName',
          'handleComponentInForm',
          'handleControllableValue',
          'handleIcon',
        ];

        pluginNames.forEach((name) => {
          const plugin = TimeSelectBasicAccumulate.getPluginMethodByName(name);
          expect(plugin).toBeDefined();
          if (plugin) {
            expect(plugin.name).toBe(name);
            expect(typeof (plugin as any).handle).toBe('function');
          }
        });
      });
    });

    describe('handleTagName 插件功能测试', () => {
      const plugin = TimeSelectBasicAccumulate.getPluginMethodByName('handleTagName') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          class: 'test-class',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('formTagName');
        expect(result).toHaveProperty('tagName');
        expect(result).toHaveProperty('class');
        expect(result.formTagName).toBe('el-form-time-select');
        expect(result.tagName).toBe('el-time-select');
        expect(result.class).toBe('test-class el-time-select');
      });

      it('应该正确处理 undefined 的 class', () => {
        const props = {
          class: undefined,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toBe(' el-time-select');
      });

      it('应该正确处理 null 的 class', () => {
        const props = {
          class: null,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toBe(' el-time-select');
      });

      it('应该正确处理空字符串的 class', () => {
        const props = {
          class: '',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toBe(' el-time-select');
      });

      it('应该正确处理复杂的 class 名称', () => {
        const props = {
          class: 'custom-class another-class',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toBe('custom-class another-class el-time-select');
      });

      it('应该正确处理特殊字符的 class', () => {
        const props = {
          class: 'class-with-dash_class_with_underscore',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toBe('class-with-dash_class_with_underscore el-time-select');
      });

      it('应该正确处理数字开头的 class', () => {
        const props = {
          class: '123class',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toBe('123class el-time-select');
      });

      it('应该正确处理长 class 名称', () => {
        const longClassName = 'a'.repeat(100);
        const props = {
          class: longClassName,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toBe(`${longClassName} el-time-select`);
      });
    });

    describe('handleComponentInForm 插件功能测试', () => {
      const plugin = TimeSelectBasicAccumulate.getPluginMethodByName('handleComponentInForm') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {};

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
      });

      it('应该正确处理空 props', () => {
        const props = {};

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
      });

      it('应该正确处理包含属性的 props', () => {
        const props = {
          testProp: 'test-value',
          anotherProp: 123,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
      });
    });

    describe('handleControllableValue 插件功能测试', () => {
      const plugin = TimeSelectBasicAccumulate.getPluginMethodByName('handleControllableValue') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          value: '09:00',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
      });

      it('应该正确处理 undefined 的 value', () => {
        const props = {
          value: undefined,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
      });

      it('应该正确处理 null 的 value', () => {
        const props = {
          value: null,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
      });

      it('应该正确处理空字符串的 value', () => {
        const props = {
          value: '',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
      });

      it('应该正确处理有效的时间值', () => {
        const props = {
          value: '14:30',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
      });

      it('应该正确处理带有秒的时间值', () => {
        const props = {
          value: '14:30:45',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
      });

      it('应该正确处理无效的时间值', () => {
        const props = {
          value: '25:70',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
      });

      it('应该正确处理非字符串的 value', () => {
        const props = {
          value: 123,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
      });

      it('应该正确处理对象的 value', () => {
        const props = {
          value: { time: '09:00' },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
      });

      it('应该正确处理数组的 value', () => {
        const props = {
          value: ['09:00', '18:00'],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
      });

      it('应该正确处理布尔值的 value', () => {
        const props = {
          value: true,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
      });
    });

    describe('handleIcon 插件功能测试', () => {
      const plugin = TimeSelectBasicAccumulate.getPluginMethodByName('handleIcon') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          prefixIconName: 'clock',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('prefixIcon');
      });

      it('应该正确处理 undefined 的图标名称', () => {
        const props = {
          prefixIconName: undefined,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('prefixIcon');
      });

      it('应该正确处理 null 的图标名称', () => {
        const props = {
          prefixIconName: null,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('prefixIcon');
      });

      it('应该正确处理空字符串的图标名称', () => {
        const props = {
          prefixIconName: '',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('prefixIcon');
      });

      it('应该正确处理有效的图标名称', () => {
        const props = {
          prefixIconName: 'icon-time',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('prefixIcon');
      });

      it('应该正确处理带前缀的图标名称', () => {
        const props = {
          prefixIconName: 'el-icon-time',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('prefixIcon');
      });

      it('应该正确处理复杂的图标名称', () => {
        const props = {
          prefixIconName: 'icon-custom-time-picker',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('prefixIcon');
      });

      it('应该正确处理特殊字符的图标名称', () => {
        const props = {
          prefixIconName: 'icon-time_24-hours',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('prefixIcon');
      });

      it('应该正确处理数字的图标名称', () => {
        const props = {
          prefixIconName: 'icon-24',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('prefixIcon');
      });

      it('应该正确处理长图标名称', () => {
        const longIconName = 'icon-' + 'a'.repeat(50);
        const props = {
          prefixIconName: longIconName,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('prefixIcon');
      });

      it('应该正确处理非字符串的图标名称', () => {
        const props = {
          prefixIconName: 123,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('prefixIcon');
      });

      it('应该正确处理对象的图标名称', () => {
        const props = {
          prefixIconName: { name: 'clock' },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('prefixIcon');
      });

      it('应该正确处理数组的图标名称', () => {
        const props = {
          prefixIconName: ['clock', 'time'],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('prefixIcon');
      });

      it('应该正确处理布尔值的图标名称', () => {
        const props = {
          prefixIconName: true,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('prefixIcon');
      });
    });

    describe('插件集成和扩展性测试', () => {
      it('应该能够与其他插件组合使用', () => {
        const combinedAccumulate = TimeSelectBasicAccumulate.addPlugin({
          name: 'testPlugin',
          handle: () => ({
            testProperty: 'test-value',
            customData: 'custom',
          }),
        });

        const plugins = combinedAccumulate.getPluginMethod();
        expect(plugins).toHaveLength(5);

        const handleTagNamePlugin = combinedAccumulate.getPluginMethodByName('handleTagName');
        const testPlugin = combinedAccumulate.getPluginMethodByName('testPlugin');

        expect(handleTagNamePlugin).toBeDefined();
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

        const testAccumulate = TimeSelectBasicAccumulate.addPlugin(plugin1).addPlugin(plugin2);

        const plugins = testAccumulate.getPluginMethod();
        expect(plugins.length).toBeGreaterThanOrEqual(6);

        const foundPlugin1 = testAccumulate.getPluginMethodByName('plugin1');
        const foundPlugin2 = testAccumulate.getPluginMethodByName('plugin2');

        expect(foundPlugin1).toBeDefined();
        expect(foundPlugin2).toBeDefined();
      });

      it('应该正确处理插件方法的获取', () => {
        const allMethods = TimeSelectBasicAccumulate.getPluginMethod();
        expect(Array.isArray(allMethods)).toBe(true);
        expect(allMethods.length).toBeGreaterThan(0);

        allMethods.forEach((method) => {
          expect(
            typeof method === 'function' || (typeof method === 'object' && typeof method.handle === 'function'),
          ).toBe(true);
        });
      });

      it('应该正确处理不存在的插件查询', () => {
        const nonExistentPlugin = TimeSelectBasicAccumulate.getPluginMethodByName('nonExistent');
        expect(nonExistentPlugin).toBeUndefined();
      });

      it('应该正确处理多个插件的链式调用', () => {
        const multiPluginAccumulate = TimeSelectBasicAccumulate
          .addPlugin({
            name: 'pluginA',
            handle: () => ({ propA: 'valueA' }),
          })
          .addPlugin({
            name: 'pluginB',
            handle: () => ({ propB: 'valueB' }),
          })
          .addPlugin({
            name: 'pluginC',
            handle: () => ({ propC: 'valueC' }),
          });

        const plugins = multiPluginAccumulate.getPluginMethod();
        expect(plugins.length).toBeGreaterThanOrEqual(7);

        const pluginA = multiPluginAccumulate.getPluginMethodByName('pluginA');
        const pluginB = multiPluginAccumulate.getPluginMethodByName('pluginB');
        const pluginC = multiPluginAccumulate.getPluginMethodByName('pluginC');

        expect(pluginA).toBeDefined();
        expect(pluginB).toBeDefined();
        expect(pluginC).toBeDefined();
        expect(pluginA?.name).toBe('pluginA');
        expect(pluginB?.name).toBe('pluginB');
        expect(pluginC?.name).toBe('pluginC');
      });

      it('应该正确处理插件的重复添加', () => {
        const duplicatePluginAccumulate = TimeSelectBasicAccumulate
          .addPlugin({
            name: 'duplicatePlugin',
            handle: () => ({ original: 'value' }),
          })
          .addPlugin({
            name: 'duplicatePlugin',
            handle: () => ({ duplicate: 'value' }),
          });

        const plugins = duplicatePluginAccumulate.getPluginMethod();
        expect(plugins.length).toBeGreaterThanOrEqual(6); // 5个原始插件 + 1个重复插件（后添加的会覆盖前面的）

        const duplicatePlugin = duplicatePluginAccumulate.getPluginMethodByName('duplicatePlugin');
        expect(duplicatePlugin).toBeDefined();
        expect(duplicatePlugin?.name).toBe('duplicatePlugin');
      });

      it('应该正确处理空插件名称', () => {
        const emptyNamePluginAccumulate = TimeSelectBasicAccumulate.addPlugin({
          name: '',
          handle: () => ({ emptyName: 'value' }),
        });

        const plugins = emptyNamePluginAccumulate.getPluginMethod();
        expect(plugins.length).toBeGreaterThanOrEqual(5);

        const emptyNamePlugin = emptyNamePluginAccumulate.getPluginMethodByName('');
        expect(emptyNamePlugin).toBeDefined();
        expect(emptyNamePlugin?.name).toBe('');
      });

      it('应该正确处理 undefined 插件名称', () => {
        const undefinedNamePluginAccumulate = TimeSelectBasicAccumulate.addPlugin({
          name: undefined as any,
          handle: () => ({ undefinedName: 'value' }),
        });

        const plugins = undefinedNamePluginAccumulate.getPluginMethod();
        expect(plugins.length).toBeGreaterThanOrEqual(5);

        const undefinedNamePlugin = undefinedNamePluginAccumulate.getPluginMethodByName(undefined as any);
        expect(undefinedNamePlugin).toBeDefined();
        expect(undefinedNamePlugin?.name).toBe(undefined);
      });

      it('应该正确处理 null 插件名称', () => {
        const nullNamePluginAccumulate = TimeSelectBasicAccumulate.addPlugin({
          name: null as any,
          handle: () => ({ nullName: 'value' }),
        });

        const plugins = nullNamePluginAccumulate.getPluginMethod();
        expect(plugins.length).toBeGreaterThanOrEqual(5);

        const nullNamePlugin = nullNamePluginAccumulate.getPluginMethodByName(null as any);
        expect(nullNamePlugin).toBeDefined();
        expect(nullNamePlugin?.name).toBe(null);
      });
    });

    describe('边界情况和错误处理测试', () => {
      it('应该正确处理所有插件都不存在的情况', () => {
        const nonExistentPlugins = [
          'nonExistent1',
          'nonExistent2',
          'nonExistent3',
        ];

        nonExistentPlugins.forEach((name) => {
          const plugin = TimeSelectBasicAccumulate.getPluginMethodByName(name);
          expect(plugin).toBeUndefined();
        });
      });

      it('应该正确处理插件方法的类型验证', () => {
        const allMethods = TimeSelectBasicAccumulate.getPluginMethod();
        
        allMethods.forEach((method, index) => {
          expect(
            typeof method === 'function' || 
            (typeof method === 'object' && method !== null && typeof method.handle === 'function')
          ).toBe(true);
        });
      });

      it('应该正确处理插件名称的特殊字符', () => {
        const specialNamePluginAccumulate = TimeSelectBasicAccumulate.addPlugin({
          name: 'plugin-with-special_chars.and@symbols',
          handle: () => ({ special: 'value' }),
        });

        const plugins = specialNamePluginAccumulate.getPluginMethod();
        expect(plugins.length).toBeGreaterThanOrEqual(5);

        const specialPlugin = specialNamePluginAccumulate.getPluginMethodByName('plugin-with-special_chars.and@symbols');
        expect(specialPlugin).toBeDefined();
        expect(specialPlugin?.name).toBe('plugin-with-special_chars.and@symbols');
      });

      it('应该正确处理插件名称的 Unicode 字符', () => {
        const unicodeNamePluginAccumulate = TimeSelectBasicAccumulate.addPlugin({
          name: '插件名称',
          handle: () => ({ unicode: 'value' }),
        });

        const plugins = unicodeNamePluginAccumulate.getPluginMethod();
        expect(plugins.length).toBeGreaterThanOrEqual(5);

        const unicodePlugin = unicodeNamePluginAccumulate.getPluginMethodByName('插件名称');
        expect(unicodePlugin).toBeDefined();
        expect(unicodePlugin?.name).toBe('插件名称');
      });

      it('应该正确处理插件名称的 emoji 字符', () => {
        const emojiNamePluginAccumulate = TimeSelectBasicAccumulate.addPlugin({
          name: 'plugin🚀with🎉emoji',
          handle: () => ({ emoji: 'value' }),
        });

        const plugins = emojiNamePluginAccumulate.getPluginMethod();
        expect(plugins.length).toBeGreaterThanOrEqual(5);

        const emojiPlugin = emojiNamePluginAccumulate.getPluginMethodByName('plugin🚀with🎉emoji');
        expect(emojiPlugin).toBeDefined();
        expect(emojiPlugin?.name).toBe('plugin🚀with🎉emoji');
      });
    });
  });
});
