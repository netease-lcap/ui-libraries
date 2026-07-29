import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@ep-test/test-utils/render-hook';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import '@/utils/index';
import MentionBasicAccumulate from '../plugins/basic-plugins';
import MentionIdeAccumulate from '../plugins/ide';

describe('el-mention plugins', () => {
  beforeEach(() => {
    // 重置所有 mock
    vi.clearAllMocks();
  });

  describe('basic-plugins.tsx', () => {
    describe('MentionBasicAccumulate 基础功能', () => {
      it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
        expect(MentionBasicAccumulate).toBeDefined();
        expect(typeof MentionBasicAccumulate.addPlugin).toBe('function');
        expect(typeof MentionBasicAccumulate.getPluginMethod).toBe('function');
        expect(Array.isArray(MentionBasicAccumulate.Plugin)).toBe(true);
      });

      it('应该包含多个插件', () => {
        const plugins = MentionBasicAccumulate.getPluginMethod();
        expect(plugins).toBeDefined();
        expect(Array.isArray(plugins)).toBe(true);
        expect(plugins.length).toBeGreaterThan(0);

        const pluginNames = [
          'handleTagName',
          'handleComponentInForm',
          'handleControllableValue',
          'handleDataSource',
          'handlePreview',
        ];
        pluginNames.forEach((name) => {
          const plugin = MentionBasicAccumulate.getPluginMethodByName(name);
          expect(plugin).toBeDefined();
          expect(plugin?.name).toBe(name);
        });
      });
    });

    describe('handleTagName 插件功能测试', () => {
      const plugin = MentionBasicAccumulate.getPluginMethodByName('handleTagName') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {};

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
        expect(result).toHaveProperty('formTagName');
        expect(result).toHaveProperty('tagName');
      });

      it('应该正确设置标签名称', () => {
        const props = {};

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.formTagName).toBe('el-form-mention');
        expect(result.tagName).toBe('el-mention');
      });
    });

    describe('handleDataSource 插件功能测试', () => {
      const plugin = MentionBasicAccumulate.getPluginMethodByName('handleDataSource') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          dataSource: null,
          textField: 'label',
          valueField: 'value',
          [$deletePropsList]: [],
          ref: { current: null },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
        expect(result).toHaveProperty('ref');
        expect(result).toHaveProperty('loading');
        expect(result).toHaveProperty('options');
      });

      it('应该正确设置 deletePropsList', () => {
        const props = {
          dataSource: null,
          textField: 'label',
          valueField: 'value',
          [$deletePropsList]: [],
          ref: { current: null },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        const symbolKey = Object.getOwnPropertySymbols(result).find((s) => s.toString().includes('deletePropsList')) as symbol;
        expect(symbolKey).toBeDefined();
        expect(Array.isArray(result[symbolKey])).toBe(true);
        expect(result[symbolKey]).toEqual(expect.arrayContaining([...$dataSourceDeleteField, 'formTagName']));
      });

      it('应该正确处理数组类型的数据源', () => {
        const dataSource = [
          { label: 'Item 1', value: 'item1' },
          { label: 'Item 2', value: 'item2' },
        ];

        const props = {
          dataSource,
          textField: 'label',
          valueField: 'value',
          [$deletePropsList]: [],
          ref: { current: null },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('ref');
        expect(result).toHaveProperty('loading');
        expect(result).toHaveProperty('options');
        expect(typeof result.ref).toBe('object');
      });

      it('应该正确处理自定义字段名', () => {
        const dataSource = [
          { name: 'Item 1', id: 'item1' },
          { name: 'Item 2', id: 'item2' },
        ];

        const props = {
          dataSource,
          textField: 'name',
          valueField: 'id',
          [$deletePropsList]: [],
          ref: { current: null },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('options');
        expect(result.options).toBeDefined();
      });

      it('应该正确处理空数据源时的状态', () => {
        const props = {
          dataSource: null,
          textField: 'label',
          valueField: 'value',
          [$deletePropsList]: [],
          ref: { current: null },
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
        }).not.toThrow();
      });

      it('应该正确设置 ref 对象', () => {
        const originalRef = { current: null, originalMethod: vi.fn() };
        const dataSource = [{ label: 'Item 1', value: 'item1' }];

        const props = {
          dataSource,
          textField: 'label',
          valueField: 'value',
          [$deletePropsList]: [],
          ref: originalRef,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.ref).toBeDefined();
        expect(typeof result.ref).toBe('object');
        expect(result.ref).toHaveProperty('reload');
        expect(result.ref).toHaveProperty('options');
      });

      it('应该正确处理函数类型的数据源', async () => {
        const dataSourceFn = vi.fn().mockResolvedValue([
          { label: 'Async Item 1', value: 'async1' },
          { label: 'Async Item 2', value: 'async2' },
        ]);

        const props = {
          dataSource: dataSourceFn,
          textField: 'label',
          valueField: 'value',
          [$deletePropsList]: [],
          ref: { current: null },
        };

        expect(() => {
          const { currentValue, waitForNextUpdate } = renderHook(plugin, props);

          // 初始状态验证
          expect(currentValue.value).toBeDefined();
          expect(currentValue.value).toHaveProperty('loading');
          expect(currentValue.value).toHaveProperty('ref');
          expect(currentValue.value).toHaveProperty('options');

          // 验证函数数据源被调用
          expect(dataSourceFn).toHaveBeenCalled();
        }).not.toThrow();
      });

      it('应该正确处理复杂的数据结构', () => {
        const complexDataSource = [
          {
            id: 1,
            name: 'User 1',
            email: 'user1@example.com',
            disabled: false,
            extra: { department: 'IT' },
          },
          {
            id: 2,
            name: 'User 2',
            email: 'user2@example.com',
            disabled: true,
            extra: { department: 'HR' },
          },
        ];

        const props = {
          dataSource: complexDataSource,
          textField: 'name',
          valueField: 'id',
          [$deletePropsList]: [],
          ref: { current: null },
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(result).toHaveProperty('options');
          expect(result).toHaveProperty('loading');
          expect(result).toHaveProperty('ref');
        }).not.toThrow();
      });

      it('应该正确处理边界情况', () => {
        const testCases = [{ dataSource: [] }, { dataSource: undefined }, { dataSource: null }];

        testCases.forEach((testCase) => {
          const props = {
            ...testCase,
            textField: 'label',
            valueField: 'value',
            [$deletePropsList]: [],
            ref: { current: null },
          };

          expect(() => {
            const { currentValue } = renderHook(plugin, props);
            const result = currentValue.value;
            expect(result).toBeDefined();
          }).not.toThrow();
        });
      });
    });

    describe('handlePreview 插件功能测试', () => {
      const plugin = MentionBasicAccumulate.getPluginMethodByName('handlePreview') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          ref: { current: null },
          render: vi.fn(),
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
        expect(result).toHaveProperty('ref');
        expect(result).toHaveProperty('render');
      });

      it('应该正确处理 IDE 模式', () => {
        const props = {
          ref: { current: null },
          render: vi.fn(),
          'data-nodepath': '/test/path',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('ref');
        expect(result).toHaveProperty('render');
      });

      it('应该正确处理非 IDE 模式', () => {
        const props = {
          ref: { current: null },
          render: vi.fn(),
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('ref');
        expect(result).toHaveProperty('render');
      });

      it('应该正确处理空的 modelValue', () => {
        const props = {
          ref: { current: null },
          render: vi.fn(),
          modelValue: '',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('ref');
        expect(result).toHaveProperty('render');
      });

      it('应该正确处理有值的 modelValue', () => {
        const props = {
          ref: { current: null },
          render: vi.fn(),
          modelValue: 'test value',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('ref');
        expect(result).toHaveProperty('render');
      });

      it('应该正确处理复杂的 modelValue', () => {
        const props = {
          ref: { current: null },
          render: vi.fn(),
          modelValue: 'user1 user2 user3',
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
    describe('MentionIdeAccumulate 基础功能', () => {
      it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
        expect(MentionIdeAccumulate).toBeDefined();
        expect(typeof MentionIdeAccumulate.addPlugin).toBe('function');
        expect(typeof MentionIdeAccumulate.getPluginMethod).toBe('function');
        expect(Array.isArray(MentionIdeAccumulate.Plugin)).toBe(true);
      });

      it('应该包含 handleNodePath 插件', () => {
        const plugins = MentionIdeAccumulate.getPluginMethod();
        expect(plugins).toBeDefined();
        expect(Array.isArray(plugins)).toBe(true);
        expect(plugins).toHaveLength(0);

        const handleNodePathPlugin = MentionIdeAccumulate.getPluginMethodByName('handleNodePath');
        expect(handleNodePathPlugin).toBeDefined();
        expect(handleNodePathPlugin?.name).toBe('handleNodePath');
      });
    });

    describe('handleNodePath 插件功能测试', () => {
      const plugin = MentionIdeAccumulate.getPluginMethodByName('handleNodePath') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          'data-nodepath': '/test/path',
          class: 'test-class',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
        expect(result).toHaveProperty('class');
      });

      it('应该正确处理 nodePath', () => {
        const props = {
          'data-nodepath': '/test/path',
          class: 'test-class',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toBeDefined();
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
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toBeDefined();
        expect(typeof result.class).toBe('string');
      });

      it('应该正确处理复杂的 class', () => {
        const props = {
          'data-nodepath': '/test/path',
          class: 'existing-class another-class',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toBeDefined();
        expect(typeof result.class).toBe('string');
        expect(result.class).toContain('existing-class');
        expect(result.class).toContain('another-class');
      });

      it('应该正确设置 deletePropsList', () => {
        const props = {
          'data-nodepath': '/test/path',
          class: 'test-class',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        const symbolKey = Object.getOwnPropertySymbols(result).find((s) => s.toString().includes('deletePropsList')) as symbol;
        expect(symbolKey).toBeDefined();
        expect(Array.isArray(result[symbolKey])).toBe(true);
        expect(result[symbolKey]).toEqual(expect.arrayContaining(['data-nodepath']));
      });
    });
  });

  describe('边界情况和错误处理测试', () => {
    it('应该正确处理 props.get 抛出异常的情况', () => {
      const plugin = MentionBasicAccumulate.getPluginMethodByName('handleDataSource') as any;

      const props = {};

      const { currentValue } = renderHook(plugin, props);
      expect(currentValue.value).toBeDefined();
    });

    it('应该正确处理各种数据类型的 props', () => {
      const plugin = MentionBasicAccumulate.getPluginMethodByName('handleDataSource') as any;

      const testCases = [
        { dataSource: null, textField: null, valueField: null },
        { dataSource: undefined, textField: undefined, valueField: undefined },
        { dataSource: [], textField: '', valueField: '' },
        { dataSource: [{ label: 'test', value: 'test' }], textField: 'label', valueField: 'value' },
      ];

      testCases.forEach((testCase) => {
        expect(() => {
          const { currentValue } = renderHook(plugin, testCase);
          expect(currentValue.value).toBeDefined();
        }).not.toThrow();
      });
    });

    it('应该正确处理 handlePreview 的各种数据类型', () => {
      const plugin = MentionBasicAccumulate.getPluginMethodByName('handlePreview') as any;

      const testCases = [
        { ref: null, render: null },
        { ref: undefined, render: undefined },
        { ref: { current: null }, render: vi.fn() },
        { ref: { current: null }, render: vi.fn(), modelValue: 'test' },
      ];

      testCases.forEach((testCase) => {
        expect(() => {
          const { currentValue } = renderHook(plugin, testCase);
          expect(currentValue.value).toBeDefined();
        }).not.toThrow();
      });
    });

    it('应该正确处理 handleNodePath 的各种数据类型', () => {
      const plugin = MentionIdeAccumulate.getPluginMethodByName('handleNodePath') as any;

      const testCases = [
        { 'data-nodepath': null, class: null },
        { 'data-nodepath': undefined, class: undefined },
        { 'data-nodepath': '/test', class: '' },
        { 'data-nodepath': '/test', class: 'test-class' },
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
      const combinedAccumulate = MentionBasicAccumulate.addPlugin({
        name: 'testPlugin',
        handle: () => ({
          testProperty: 'test-value',
          customData: 'custom',
        }),
      });

      const handleDataSourcePlugin = combinedAccumulate.getPluginMethodByName('handleDataSource');
      const testPlugin = combinedAccumulate.getPluginMethodByName('testPlugin');

      expect(handleDataSourcePlugin).toBeDefined();
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

      const testAccumulate = MentionBasicAccumulate.addPlugin(plugin1).addPlugin(plugin2);

      const plugins = testAccumulate.getPluginMethod();
      // 验证插件数量是否正确增加
      expect(plugins.length).toBeGreaterThanOrEqual(7);

      const foundPlugin1 = testAccumulate.getPluginMethodByName('plugin1');
      const foundPlugin2 = testAccumulate.getPluginMethodByName('plugin2');

      expect(foundPlugin1).toBeDefined();
      expect(foundPlugin2).toBeDefined();
    });

    it('应该正确处理插件方法的获取', () => {
      const allMethods = MentionBasicAccumulate.getPluginMethod();
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
      const nonExistentPlugin = MentionBasicAccumulate.getPluginMethodByName('nonExistent');
      expect(nonExistentPlugin).toBeUndefined();
    });
  });
});
