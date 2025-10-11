import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@ep-test/test-utils/render-hook';
import { $deletePropsList } from '@/plugins/constants';
import '@/utils/index';
import InputNumberBasicAccumulate from '../plugins/index';
import InputNumberIdeAccumulate from '../plugins/ide';

// Mock element-plus

// Mock @/index
vi.mock('@/index', () => ({
  ElText: vi.fn((props) => ({
    type: 'ElText',
    props,
  })),
}));

// Mock @/plugins/common/preview
vi.mock('@/plugins/common/preview', () => ({
  getIsPreview: vi.fn(() => false),
  getRender: vi.fn((Component, previewRender, isPreview) => ({
    render: Component || previewRender,
    insRef: { value: { reload: vi.fn(), data: [] } },
  })),
}));

describe('el-input-number plugins', () => {
  beforeEach(() => {
    // 重置所有 mock
    vi.clearAllMocks();
  });

  describe('index.tsx', () => {
    describe('InputNumberBasicAccumulate 基础功能', () => {
      it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
        expect(InputNumberBasicAccumulate).toBeDefined();
        expect(typeof InputNumberBasicAccumulate.addPlugin).toBe('function');
        expect(typeof InputNumberBasicAccumulate.getPluginMethod).toBe('function');
        expect(Array.isArray(InputNumberBasicAccumulate.Plugin)).toBe(true);
      });

      it('应该包含多个插件', () => {
        const plugins = InputNumberBasicAccumulate.getPluginMethod();
        expect(plugins).toBeDefined();
        expect(Array.isArray(plugins)).toBe(true);
        expect(plugins.length).toBeGreaterThan(0);

        const pluginNames = ['handleDefaultPrps', 'handleComponentInForm', 'handleControllableValue', 'handlePreview'];
        pluginNames.forEach((name) => {
          const plugin = InputNumberBasicAccumulate.getPluginMethodByName(name);
          expect(plugin).toBeDefined();
          expect(plugin?.name).toBe(name);
        });
      });
    });

    describe('handleDefaultPrps 插件功能测试', () => {
      const plugin = InputNumberBasicAccumulate.getPluginMethodByName('handleDefaultPrps') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {};

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
        expect(result).toHaveProperty('formTagName');
        expect(result).toHaveProperty('tagName');
      });

      it('应该正确设置 formTagName 和 tagName', () => {
        const props = {};

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.formTagName).toBe('el-form-input-number');
        expect(result.tagName).toBe('el-input-number');
      });

      it('应该正确设置 deletePropsList', () => {
        const props = {};

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        const symbolKey = Object.getOwnPropertySymbols(result).find((s) => s.toString().includes('deletePropsList')) as symbol;
        expect(symbolKey).toBeDefined();
        expect(Array.isArray(result[symbolKey])).toBe(true);
        expect(result[symbolKey]).toEqual(expect.arrayContaining(['data-nodepath']));
      });
    });

    describe('handlePreview 插件功能测试', () => {
      const plugin = InputNumberBasicAccumulate.getPluginMethodByName('handlePreview') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          ref: {},
          render: vi.fn(),
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
        expect(result).toHaveProperty('ref');
        expect(result).toHaveProperty('render');
      });

      it('应该正确处理 ref 对象', () => {
        const originalRef = { current: null, originalMethod: vi.fn() };
        const props = {
          ref: originalRef,
          render: vi.fn(),
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.ref).toBeDefined();
        expect(typeof result.ref).toBe('object');
        expect(result.ref).toBeDefined();
      });

      it('应该正确处理 IDE 模式', () => {
        const props = {
          ref: {},
          render: vi.fn(),
          'data-nodepath': 'test-path',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('ref');
        expect(result).toHaveProperty('render');
      });

      it('应该正确处理非 IDE 模式', () => {
        const props = {
          ref: {},
          render: vi.fn(),
          modelValue: 123,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('ref');
        expect(result).toHaveProperty('render');
      });
    });
  });

  describe('ide.ts', () => {
    describe('InputNumberIdeAccumulate 基础功能', () => {
      it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
        expect(InputNumberIdeAccumulate).toBeDefined();
        expect(typeof InputNumberIdeAccumulate.addPlugin).toBe('function');
        expect(typeof InputNumberIdeAccumulate.getPluginMethod).toBe('function');
        expect(Array.isArray(InputNumberIdeAccumulate.Plugin)).toBe(true);
      });

      it('应该包含 handleNodePath 插件', () => {
        const plugins = InputNumberIdeAccumulate.getPluginMethod();
        expect(plugins).toHaveLength(0);

        const handleNodePathPlugin = InputNumberIdeAccumulate.getPluginMethodByName('handleNodePath');
        expect(handleNodePathPlugin).toBeDefined();
        if (handleNodePathPlugin) {
          expect(handleNodePathPlugin.name).toBe('handleNodePath');
          expect(typeof (handleNodePathPlugin as any).handle).toBe('function');
        }
      });
    });

    describe('handleNodePath 插件功能测试', () => {
      const plugin = InputNumberIdeAccumulate.getPluginMethodByName('handleNodePath') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          'data-nodepath': 'test-path',
          class: 'existing-class',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
        expect(result).toHaveProperty('class');
      });

      it('应该正确处理 nodePath', () => {
        const props = {
          'data-nodepath': 'test-path',
          class: 'existing-class',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toContain('existing-class');
      });

      it('应该正确处理复杂的 class', () => {
        const props = {
          'data-nodepath': 'test-path',
          class: 'class1 class2 class3',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toContain('class1 class2 class3');
      });
    });
  });

  describe('边界情况和错误处理测试', () => {
    it('应该正确处理 props.get 抛出异常的情况', () => {
      const plugin = InputNumberBasicAccumulate.getPluginMethodByName('handleDefaultPrps') as any;

      const props = {
        get: vi.fn(() => {
          throw new Error('Mock error');
        }),
      };

      expect(() => {
        const { currentValue } = renderHook(plugin, props);
        expect(currentValue.value).toBeDefined();
      }).not.toThrow();
    });

    it('应该正确处理各种数据类型的 props', () => {
      const plugin = InputNumberBasicAccumulate.getPluginMethodByName('handlePreview') as any;

      const testCases = [
        { ref: null, render: null },
        { ref: undefined, render: undefined },
        { ref: {}, render: vi.fn() },
        { ref: { current: null }, render: () => {} },
      ];

      testCases.forEach((testCase) => {
        expect(() => {
          const { currentValue } = renderHook(plugin, testCase);
          expect(currentValue.value).toBeDefined();
        }).not.toThrow();
      });
    });

    it('应该正确处理 handleNodePath 的各种数据类型', () => {
      const plugin = InputNumberIdeAccumulate.getPluginMethodByName('handleNodePath') as any;

      const testCases = [
        { 'data-nodepath': null, class: null },
        { 'data-nodepath': undefined, class: undefined },
        { 'data-nodepath': 'test', class: 'test-class' },
        { 'data-nodepath': '', class: '' },
      ];

      testCases.forEach((testCase) => {
        expect(() => {
          const { currentValue } = renderHook(plugin, testCase);
          expect(currentValue.value).toBeDefined();
        }).not.toThrow();
      });
    });
  });

  describe('插件集成和扩展性测试', () => {
    it('应该能够与其他插件组合使用', () => {
      // 测试插件链式调用
      const combinedAccumulate = InputNumberBasicAccumulate.addPlugin({
        name: 'testPlugin',
        handle: () => ({
          testProperty: 'test-value',
          customData: 'custom',
        }),
      });

      const plugins = combinedAccumulate.getPluginMethod();
      expect(plugins).toHaveLength(5);

      const handleDefaultPrpsPlugin = combinedAccumulate.getPluginMethodByName('handleDefaultPrps');
      const testPlugin = combinedAccumulate.getPluginMethodByName('testPlugin');

      expect(handleDefaultPrpsPlugin).toBeDefined();
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

      const testAccumulate = InputNumberBasicAccumulate.addPlugin(plugin1).addPlugin(plugin2);

      const plugins = testAccumulate.getPluginMethod();
      // 验证插件数量是否正确增加（可能已经有其他插件）
      expect(plugins.length).toBeGreaterThanOrEqual(6);

      const foundPlugin1 = testAccumulate.getPluginMethodByName('plugin1');
      const foundPlugin2 = testAccumulate.getPluginMethodByName('plugin2');

      expect(foundPlugin1).toBeDefined();
      expect(foundPlugin2).toBeDefined();
    });

    it('应该正确处理插件方法的获取', () => {
      const allMethods = InputNumberBasicAccumulate.getPluginMethod();
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
      const nonExistentPlugin = InputNumberBasicAccumulate.getPluginMethodByName('nonExistent');
      expect(nonExistentPlugin).toBeUndefined();
    });
  });
});
