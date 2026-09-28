import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@ep-test/test-utils/render-hook';
import { $deletePropsList } from '@/plugins/constants';
import '@/utils/index';
import SwitchAccumulate from '../plugins/index';
import SwitchIdeAccumulate from '../plugins/ide';

describe('el-switch plugins', () => {
  beforeEach(() => {
    // 重置所有 mock
    vi.clearAllMocks();
  });

  describe('index.tsx', () => {
    describe('SwitchAccumulate 基础功能', () => {
      it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
        expect(SwitchAccumulate).toBeDefined();
        expect(typeof SwitchAccumulate.addPlugin).toBe('function');
        expect(typeof SwitchAccumulate.getPluginMethod).toBe('function');
        expect(Array.isArray(SwitchAccumulate.Plugin)).toBe(true);
      });

      it('应该包含所有必要的插件', () => {
        const plugins = SwitchAccumulate.getPluginMethod();
        expect(plugins).toHaveLength(5);

        const pluginNames = [
          'handleTagName',
          'handleComponentInForm',
          'handleControllableValue',
          'handlePreview',
        ];

        pluginNames.forEach((name) => {
          const plugin = SwitchAccumulate.getPluginMethodByName(name);
          expect(plugin).toBeDefined();
          if (plugin) {
            expect(plugin.name).toBe(name);
            expect(typeof (plugin as any).handle).toBe('function');
          }
        });
      });
    });

    describe('handleTagName 插件功能测试', () => {
      const plugin = SwitchAccumulate.getPluginMethodByName('handleTagName') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('formTagName');
        expect(result).toHaveProperty('tagName');
        expect(result.formTagName).toBe('el-form-switch');
        expect(result.tagName).toBe('el-switch');
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

    describe('handleComponentInForm 插件功能测试', () => {
      const plugin = SwitchAccumulate.getPluginMethodByName('handleComponentInForm') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {};

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
      });
    });

    describe('handleControllableValue 插件功能测试', () => {
      const plugin = SwitchAccumulate.getPluginMethodByName('handleControllableValue') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {};

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
      });
    });

    describe('handlePreview 插件功能测试', () => {
      const plugin = SwitchAccumulate.getPluginMethodByName('handlePreview') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          ref: { current: null },
          render: null,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('ref');
        expect(result).toHaveProperty('render');
      });

      it('应该正确处理非预览模式', () => {
        const props = {
          ref: { current: null },
          render: null,
          'data-nodepath': undefined,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toHaveProperty('ref');
        expect(result).toHaveProperty('render');
      });

      it('应该正确处理预览模式', () => {
        const props = {
          ref: { current: null },
          render: null,
          'data-nodepath': '/some/path',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toHaveProperty('ref');
        expect(result).toHaveProperty('render');
      });

      it('应该正确处理 IDE 环境', () => {
        const props = {
          ref: { current: null },
          render: null,
          'data-nodepath': '/ide/path',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toHaveProperty('ref');
        expect(result).toHaveProperty('render');
      });

      it('应该正确处理 null 的 ref', () => {
        const props = {
          ref: null,
          render: null,
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
        }).not.toThrow();
      });

      it('应该正确处理 undefined 的 ref', () => {
        const props = {
          ref: undefined,
          render: null,
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
        }).not.toThrow();
      });
    });

    describe('插件集成和扩展性测试', () => {
      it('应该能够与其他插件组合使用', () => {
        const combinedAccumulate = SwitchAccumulate.addPlugin({
          name: 'testPlugin',
          handle: () => ({
            testProperty: 'test-value',
            customData: 'custom',
          }),
        });

        const plugins = combinedAccumulate.getPluginMethod();
        expect(plugins).toHaveLength(6);

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

        const testAccumulate = SwitchAccumulate.addPlugin(plugin1).addPlugin(plugin2);

        const plugins = testAccumulate.getPluginMethod();
        expect(plugins.length).toBeGreaterThanOrEqual(6);

        const foundPlugin1 = testAccumulate.getPluginMethodByName('plugin1');
        const foundPlugin2 = testAccumulate.getPluginMethodByName('plugin2');

        expect(foundPlugin1).toBeDefined();
        expect(foundPlugin2).toBeDefined();
      });

      it('应该正确处理插件方法的获取', () => {
        const allMethods = SwitchAccumulate.getPluginMethod();
        expect(Array.isArray(allMethods)).toBe(true);
        expect(allMethods.length).toBeGreaterThan(0);

        allMethods.forEach((method) => {
          expect(
            typeof method === 'function' || (typeof method === 'object' && typeof method.handle === 'function'),
          ).toBe(true);
        });
      });

      it('应该正确处理不存在的插件查询', () => {
        const nonExistentPlugin = SwitchAccumulate.getPluginMethodByName('nonExistent');
        expect(nonExistentPlugin).toBeUndefined();
      });
    });
  });

  describe('ide.ts', () => {
    describe('SwitchIdeAccumulate 基础功能', () => {
      it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
        expect(SwitchIdeAccumulate).toBeDefined();
        expect(typeof SwitchIdeAccumulate.addPlugin).toBe('function');
        expect(typeof SwitchIdeAccumulate.getPluginMethod).toBe('function');
        expect(Array.isArray(SwitchIdeAccumulate.Plugin)).toBe(true);
      });

      it('应该包含 handleNodePath 插件', () => {
        const plugins = SwitchIdeAccumulate.getPluginMethod();
        expect(plugins).toHaveLength(0);

        const handleNodePathPlugin = SwitchIdeAccumulate.getPluginMethodByName('handleNodePath');
        expect(handleNodePathPlugin).toBeDefined();
        if (handleNodePathPlugin) {
          expect(handleNodePathPlugin.name).toBe('handleNodePath');
          expect(typeof (handleNodePathPlugin as any).handle).toBe('function');
        }
      });
    });

    describe('handleNodePath 插件功能测试', () => {
      const plugin = SwitchIdeAccumulate.getPluginMethodByName('handleNodePath') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          'data-nodepath': '/test/path',
          class: 'existing-class',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('class');
        expect(typeof result.class).toBe('string');
        expect(result.class).toContain('existing-class');
        expect(result.class).toContain('Switch_');
      });

      it('应该正确处理空的 class', () => {
        const props = {
          'data-nodepath': '/test/path',
          class: '',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toContain('Switch_');
        expect(result.class.trim()).toMatch(/^Switch_\d+$/);
      });

      it('应该正确处理 undefined 的 class', () => {
        const props = {
          'data-nodepath': '/test/path',
          class: undefined,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toContain('Switch_');
        expect(result.class).toContain('undefined');
      });

      it('应该正确处理 null 的 class', () => {
        const props = {
          'data-nodepath': '/test/path',
          class: null,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toContain('Switch_');
        expect(result.class).toContain('null');
      });

      it('应该正确处理 undefined 的 data-nodepath', () => {
        const props = {
          'data-nodepath': undefined,
          class: 'test-class',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toHaveProperty('class');
        expect(result.class).toContain('test-class');
        expect(result.class).toContain('Switch_');
      });

      it('应该正确处理 null 的 data-nodepath', () => {
        const props = {
          'data-nodepath': null,
          class: 'test-class',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toHaveProperty('class');
        expect(result.class).toContain('test-class');
        expect(result.class).toContain('Switch_');
      });

      it('应该正确处理复杂的 class 组合', () => {
        const props = {
          'data-nodepath': '/complex/path',
          class: 'class1 class2 class3',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toContain('class1 class2 class3');
        expect(result.class).toContain('Switch_');
      });
    });

    describe('插件集成和扩展性测试', () => {
      it('应该能够与其他插件组合使用', () => {
        const combinedAccumulate = SwitchIdeAccumulate.addPlugin({
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

        const testAccumulate = SwitchIdeAccumulate.addPlugin(plugin1).addPlugin(plugin2);

        const plugins = testAccumulate.getPluginMethod();
        expect(plugins.length).toBeGreaterThanOrEqual(3);

        const foundPlugin1 = testAccumulate.getPluginMethodByName('plugin1');
        const foundPlugin2 = testAccumulate.getPluginMethodByName('plugin2');

        expect(foundPlugin1).toBeDefined();
        expect(foundPlugin2).toBeDefined();
      });

      it('应该正确处理插件方法的获取', () => {
        const allMethods = SwitchIdeAccumulate.getPluginMethod();
        expect(Array.isArray(allMethods)).toBe(true);
        expect(allMethods.length).toBeGreaterThan(0);

        allMethods.forEach((method) => {
          expect(
            typeof method === 'function' || (typeof method === 'object' && typeof method.handle === 'function'),
          ).toBe(true);
        });
      });

      it('应该正确处理不存在的插件查询', () => {
        const nonExistentPlugin = SwitchIdeAccumulate.getPluginMethodByName('nonExistent');
        expect(nonExistentPlugin).toBeUndefined();
      });
    });
  });
});
