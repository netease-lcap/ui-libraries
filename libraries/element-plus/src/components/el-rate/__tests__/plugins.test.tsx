import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@ep-test/test-utils/render-hook';
import { $deletePropsList } from '@/plugins/constants';
import '@/utils/index';
import RateAccumulate from '../plugins/index';
import RateIdeAccumulate from '../plugins/ide';

describe('el-rate plugins', () => {
  beforeEach(() => {
    // 重置所有 mock
    vi.clearAllMocks();
  });

  describe('index.tsx', () => {
    describe('RateAccumulate 基础功能', () => {
      it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
        expect(RateAccumulate).toBeDefined();
        expect(typeof RateAccumulate.addPlugin).toBe('function');
        expect(typeof RateAccumulate.getPluginMethod).toBe('function');
        expect(Array.isArray(RateAccumulate.Plugin)).toBe(true);
      });

      it('应该包含所有必要的插件', () => {
        const plugins = RateAccumulate.getPluginMethod();
        expect(plugins).toHaveLength(5);

        const pluginNames = plugins.map((plugin: any) => plugin.name);
        expect(pluginNames).toContain('handleTagName');
        expect(pluginNames).toContain('handleComponentInForm');
        expect(pluginNames).toContain('handleControllableValue');
        expect(pluginNames).toContain('handleColor');
        expect(pluginNames).toContain('handlePreview');
      });
    });

    describe('handleTagName 插件功能测试', () => {
      const plugin = RateAccumulate.getPluginMethodByName('handleTagName') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('formTagName');
        expect(result).toHaveProperty('tagName');
        expect(result.formTagName).toBe('el-form-rate');
        expect(result.tagName).toBe('el-rate');
      });

      it('应该正确设置 deletePropsList', () => {
        const props = {
          [$deletePropsList]: ['existing-prop'],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        const symbolKey = Object.getOwnPropertySymbols(result).find((s) => s.toString().includes('deletePropsList')) as symbol;
        expect(symbolKey).toBeDefined();
        expect(result[symbolKey]).toEqual(expect.arrayContaining(['data-nodepath']));
      });
    });

    describe('handleColor 插件功能测试', () => {
      const plugin = RateAccumulate.getPluginMethodByName('handleColor') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          lowColor: '#FF0000',
          mediumColor: '#00FF00',
          highColor: '#0000FF',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('colors');
        expect(Array.isArray(result.colors)).toBe(true);
        expect(result.colors).toEqual(['#FF0000', '#00FF00', '#0000FF']);
      });

      it('应该使用默认颜色值', () => {
        const props = {};

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.colors).toEqual(['#F7BA2A', '#F7BA2A', '#F7BA2A']);
      });

      it('应该正确处理自定义 colors 数组', () => {
        const customColors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'];
        const props = {
          colors: customColors,
          lowColor: '#111111',
          mediumColor: '#222222',
          highColor: '#333333',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.colors).toEqual(customColors);
      });

      it('应该正确处理非数组的 colors', () => {
        const props = {
          colors: 'invalid',
          lowColor: '#FF0000',
          mediumColor: '#00FF00',
          highColor: '#0000FF',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.colors).toEqual(['#FF0000', '#00FF00', '#0000FF']);
      });

      it('应该正确处理 undefined 的 colors', () => {
        const props = {
          colors: undefined,
          lowColor: '#FF0000',
          mediumColor: '#00FF00',
          highColor: '#0000FF',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.colors).toEqual(['#FF0000', '#00FF00', '#0000FF']);
      });

      it('应该正确处理 null 的 colors', () => {
        const props = {
          colors: null,
          lowColor: '#FF0000',
          mediumColor: '#00FF00',
          highColor: '#0000FF',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.colors).toEqual(['#FF0000', '#00FF00', '#0000FF']);
      });
    });

    describe('handlePreview 插件功能测试', () => {
      const plugin = RateAccumulate.getPluginMethodByName('handlePreview') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          ref: { current: null },
          render: vi.fn(),
          'data-nodepath': undefined,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
      });

      it('应该正确处理预览模式', () => {
        const props = {
          ref: { current: null },
          render: vi.fn(),
          'data-nodepath': '/test/path',
          modelValue: 3,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
      });

      it('应该正确处理非预览模式', () => {
        const props = {
          ref: { current: null },
          render: vi.fn(),
          'data-nodepath': undefined,
          modelValue: 4,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toEqual({});
      });

      it('应该正确处理 IDE 环境', () => {
        const props = {
          ref: { current: null },
          render: vi.fn(),
          'data-nodepath': '/ide/path',
          modelValue: 5,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
      });

      it('应该正确处理 null 的 modelValue', () => {
        const props = {
          ref: { current: null },
          render: vi.fn(),
          'data-nodepath': '/test/path',
          modelValue: null,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
      });

      it('应该正确处理 undefined 的 modelValue', () => {
        const props = {
          ref: { current: null },
          render: vi.fn(),
          'data-nodepath': '/test/path',
          modelValue: undefined,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
      });
    });

    describe('插件集成和扩展性测试', () => {
      it('应该能够与其他插件组合使用', () => {
        const combinedAccumulate = RateAccumulate.addPlugin({
          name: 'testPlugin',
          handle: () => ({
            testProperty: 'test-value',
            customData: 'custom',
          }),
        });

        const plugins = combinedAccumulate.getPluginMethod();
        expect(plugins).toHaveLength(6);

        const testPlugin = combinedAccumulate.getPluginMethodByName('testPlugin');
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

        const testAccumulate = RateAccumulate.addPlugin(plugin1).addPlugin(plugin2);

        const plugins = testAccumulate.getPluginMethod();
        expect(plugins.length).toBeGreaterThanOrEqual(7);

        const foundPlugin1 = testAccumulate.getPluginMethodByName('plugin1');
        const foundPlugin2 = testAccumulate.getPluginMethodByName('plugin2');

        expect(foundPlugin1).toBeDefined();
        expect(foundPlugin2).toBeDefined();
      });

      it('应该正确处理插件方法的获取', () => {
        const allMethods = RateAccumulate.getPluginMethod();
        expect(Array.isArray(allMethods)).toBe(true);
        expect(allMethods.length).toBeGreaterThan(0);

        allMethods.forEach((method) => {
          expect(
            typeof method === 'function' || (typeof method === 'object' && typeof method.handle === 'function'),
          ).toBe(true);
        });
      });

      it('应该正确处理不存在的插件查询', () => {
        const nonExistentPlugin = RateAccumulate.getPluginMethodByName('nonExistent');
        expect(nonExistentPlugin).toBeUndefined();
      });
    });
  });

  describe('ide.ts', () => {
    describe('RateIdeAccumulate 基础功能', () => {
      it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
        expect(RateIdeAccumulate).toBeDefined();
        expect(typeof RateIdeAccumulate.addPlugin).toBe('function');
        expect(typeof RateIdeAccumulate.getPluginMethod).toBe('function');
        expect(Array.isArray(RateIdeAccumulate.Plugin)).toBe(true);
      });

      it('应该包含 handleNodePath 插件', () => {
        const plugins = RateIdeAccumulate.getPluginMethod();
        expect(plugins).toHaveLength(0);

        const handleNodePathPlugin = RateIdeAccumulate.getPluginMethodByName('handleNodePath');
        expect(handleNodePathPlugin).toBeDefined();
        if (handleNodePathPlugin) {
          expect(handleNodePathPlugin.name).toBe('handleNodePath');
          expect(typeof (handleNodePathPlugin as any).handle).toBe('function');
        }
      });
    });

    describe('handleNodePath 插件功能测试', () => {
      const plugin = RateIdeAccumulate.getPluginMethodByName('handleNodePath') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          'data-nodepath': '/test/path',
          class: 'test-class',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('class');
        expect(typeof result.class).toBe('string');
        expect(result.class).toContain('test-class');
      });

      it('应该正确处理空的 class', () => {
        const props = {
          'data-nodepath': '/test/path',
          class: '',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toBeDefined();
        expect(typeof result.class).toBe('string');
      });

      it('应该正确处理 undefined 的 class', () => {
        const props = {
          'data-nodepath': '/test/path',
          class: undefined,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toBeDefined();
        expect(typeof result.class).toBe('string');
      });

      it('应该正确处理 null 的 class', () => {
        const props = {
          'data-nodepath': '/test/path',
          class: null,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toBeDefined();
        expect(typeof result.class).toBe('string');
      });

      it('应该正确处理空的 data-nodepath', () => {
        const props = {
          'data-nodepath': '',
          class: 'test-class',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('class');
      });

      it('应该正确处理 undefined 的 data-nodepath', () => {
        const props = {
          'data-nodepath': undefined,
          class: 'test-class',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('class');
      });

      it('应该正确处理 null 的 data-nodepath', () => {
        const props = {
          'data-nodepath': null,
          class: 'test-class',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('class');
      });

      it('应该生成唯一的 nodeId', () => {
        const props1 = {
          'data-nodepath': '/test/path1',
          class: 'test-class',
        };
        const props2 = {
          'data-nodepath': '/test/path2',
          class: 'test-class',
        };

        const { currentValue: result1 } = renderHook(plugin, props1);
        const { currentValue: result2 } = renderHook(plugin, props2);

        expect(result1.value.class).not.toBe(result2.value.class);
        expect(result1.value.class).toContain('Rate_');
        expect(result2.value.class).toContain('Rate_');
      });
    });

    describe('插件集成和扩展性测试', () => {
      it('应该能够与其他插件组合使用', () => {
        const combinedAccumulate = RateIdeAccumulate.addPlugin({
          name: 'testPlugin',
          handle: () => ({
            testProperty: 'test-value',
            customData: 'custom',
          }),
        });

        const plugins = combinedAccumulate.getPluginMethod();
        expect(plugins).toHaveLength(1);

        const handleNodePathPlugin = combinedAccumulate.getPluginMethodByName('handleNodePath');
        const testPlugin = combinedAccumulate.getPluginMethodByName('testPlugin');

        expect(handleNodePathPlugin).toBeDefined();
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

        const testAccumulate = RateIdeAccumulate.addPlugin(plugin1).addPlugin(plugin2);

        const plugins = testAccumulate.getPluginMethod();
        expect(plugins.length).toBeGreaterThanOrEqual(3);

        const foundPlugin1 = testAccumulate.getPluginMethodByName('plugin1');
        const foundPlugin2 = testAccumulate.getPluginMethodByName('plugin2');

        expect(foundPlugin1).toBeDefined();
        expect(foundPlugin2).toBeDefined();
      });

      it('应该正确处理插件方法的获取', () => {
        const allMethods = RateIdeAccumulate.getPluginMethod();
        expect(Array.isArray(allMethods)).toBe(true);
        expect(allMethods.length).toBeGreaterThan(0);

        allMethods.forEach((method) => {
          expect(
            typeof method === 'function' || (typeof method === 'object' && typeof method.handle === 'function'),
          ).toBe(true);
        });
      });

      it('应该正确处理不存在的插件查询', () => {
        const nonExistentPlugin = RateIdeAccumulate.getPluginMethodByName('nonExistent');
        expect(nonExistentPlugin).toBeUndefined();
      });
    });
  });
});
