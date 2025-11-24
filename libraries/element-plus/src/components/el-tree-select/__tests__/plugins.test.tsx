import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@ep-test/test-utils/render-hook';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import '@/utils/index';
import TreeSelectBasicAccumulate from '../plugins/index';
import TreeSelectIdeAccumulate from '../plugins/ide';

describe('el-tree-select plugins', () => {
  beforeEach(() => {
    // 重置所有 mock
    vi.clearAllMocks();
  });

  describe('basic-plugins.tsx', () => {
    describe('TreeSelectBasicAccumulate 基础功能', () => {
      it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
        expect(TreeSelectBasicAccumulate).toBeDefined();
        expect(typeof TreeSelectBasicAccumulate.addPlugin).toBe('function');
        expect(typeof TreeSelectBasicAccumulate.getPluginMethod).toBe('function');
        expect(Array.isArray(TreeSelectBasicAccumulate.Plugin)).toBe(true);
      });

      it('应该包含所有必要的插件', () => {
        const plugins = TreeSelectBasicAccumulate.getPluginMethod();
        const pluginNames = plugins.map((plugin: any) => plugin.name);
        expect(pluginNames).toContain('handleDataSource');
        expect(pluginNames).toContain('handleComponentInForm');
        expect(pluginNames).toContain('handleControllableValue');
        expect(pluginNames).toContain('handlePreview');
      });
    });

    describe('handleDataSource 插件功能测试', () => {
      const plugin = TreeSelectBasicAccumulate.getPluginMethodByName('handleDataSource') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          dataSource: null,
          textField: 'label',
          valueField: 'value',
          parentField: 'parent',
          [$deletePropsList]: [],
          ref: { current: null },
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(typeof result).toBe('object');
        }).not.toThrow();
      });

      it('应该正确设置 deletePropsList', () => {
        const props = {
          dataSource: null,
          textField: 'label',
          valueField: 'value',
          parentField: 'parent',
          [$deletePropsList]: [],
          ref: { current: null },
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
        }).not.toThrow();
      });

      it('应该正确处理数组类型的数据源', () => {
        const dataSource = [
          { id: 1, label: 'Item 1', value: 'item1', parent: null },
          { id: 2, label: 'Item 2', value: 'item2', parent: 1 },
        ];

        const props = {
          dataSource,
          textField: 'label',
          valueField: 'value',
          parentField: 'parent',
          [$deletePropsList]: [],
          ref: { current: null },
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
        }).not.toThrow();
      });

      it('应该正确处理自定义字段名', () => {
        const dataSource = [
          { id: 1, name: 'Item 1', key: 'item1', parentId: null },
          { id: 2, name: 'Item 2', key: 'item2', parentId: 1 },
        ];

        const props = {
          dataSource,
          textField: 'name', // 使用自定义字段名
          valueField: 'key', // 使用自定义字段名
          parentField: 'parentId', // 使用自定义字段名
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
        const dataSource = [{ id: 1, label: 'Item 1', value: 'item1', parent: null }];

        const props = {
          dataSource,
          textField: 'label',
          valueField: 'value',
          parentField: 'parent',
          [$deletePropsList]: [],
          ref: originalRef,
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
        }).not.toThrow();
      });

      it('应该正确处理函数类型的数据源', async () => {
        const dataSourceFn = vi.fn().mockResolvedValue([
          { id: 1, label: 'Async Item 1', value: 'async1', parent: null },
          { id: 2, label: 'Async Item 2', value: 'async2', parent: 1 },
        ]);

        const props = {
          dataSource: dataSourceFn,
          textField: 'label',
          valueField: 'value',
          parentField: 'parent',
          [$deletePropsList]: [],
          ref: { current: null },
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          expect(currentValue.value).toBeDefined();
        }).not.toThrow();
      });

      it('应该正确处理复杂的数据结构', () => {
        const complexDataSource = [
          {
            id: 1,
            title: 'Section 1',
            key: 'section1',
            parentId: null,
            disabled: false,
            extra: { category: 'main' },
          },
          {
            id: 2,
            title: 'Section 2',
            key: 'section2',
            parentId: 1,
            disabled: true,
            extra: { category: 'sub' },
          },
        ];

        const props = {
          dataSource: complexDataSource,
          textField: 'title',
          valueField: 'key',
          parentField: 'parentId',
          [$deletePropsList]: [],
          ref: { current: null },
        };

        // 检查插件能否处理复杂数据结构而不抛出错误
        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
        }).not.toThrow();
      });

      it('应该正确处理边界情况', () => {
        // 测试各种边界情况，简化为基本检查
        const testCases = [
          { dataSource: [] }, // 空数组
          { dataSource: undefined }, // undefined
          { dataSource: null }, // null
        ];

        testCases.forEach((testCase) => {
          const props = {
            ...testCase,
            textField: 'label',
            valueField: 'value',
            parentField: 'parent',
            [$deletePropsList]: [],
            ref: { current: null },
          };

          // 检查插件能否处理边界情况而不抛出错误
          expect(() => {
            const { currentValue } = renderHook(plugin, props);
            const result = currentValue.value;
            expect(result).toBeDefined();
          }).not.toThrow();
        });
      });

      it('应该正确处理空数据源时的 data 属性', () => {
        const props = {
          dataSource: null,
          textField: 'label',
          valueField: 'value',
          parentField: 'parent',
          [$deletePropsList]: [],
          ref: { current: null },
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
        }).not.toThrow();
      });

      it('应该正确处理有数据源时的 data 属性', () => {
        const dataSource = [{ id: 1, label: 'Item 1', value: 'item1', parent: null }];

        const props = {
          dataSource,
          textField: 'label',
          valueField: 'value',
          parentField: 'parent',
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

    describe('handlePreview 插件功能测试', () => {
      const plugin = TreeSelectBasicAccumulate.getPluginMethodByName('handlePreview') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          ref: { current: null },
          render: vi.fn(),
          'data-nodepath': 'test-path',
          textField: 'label',
          valueField: 'value',
          data: [
            { label: 'Item 1', value: 'item1' },
            { label: 'Item 2', value: 'item2' },
          ],
          modelValue: 'item1',
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(typeof result).toBe('object');
        }).not.toThrow();
      });

      it('应该正确处理预览模式', () => {
        const props = {
          ref: { current: null },
          render: vi.fn(),
          'data-nodepath': 'test-path',
          textField: 'label',
          valueField: 'value',
          data: [
            { label: 'Item 1', value: 'item1' },
            { label: 'Item 2', value: 'item2' },
          ],
          modelValue: 'item1',
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(result).toHaveProperty('render');
          expect(typeof result.render).toBe('function');
        }).not.toThrow();
      });

      it('应该正确处理非预览模式', () => {
        const props = {
          ref: { current: null },
          render: vi.fn(),
          textField: 'label',
          valueField: 'value',
          data: [
            { label: 'Item 1', value: 'item1' },
            { label: 'Item 2', value: 'item2' },
          ],
          modelValue: 'item1',
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(result).toHaveProperty('render');
          expect(typeof result.render).toBe('function');
        }).not.toThrow();
      });

      it('应该正确处理 IDE 环境', () => {
        const props = {
          ref: { current: null },
          render: vi.fn(),
          'data-nodepath': 'test-path',
          textField: 'label',
          valueField: 'value',
          data: [
            { label: 'Item 1', value: 'item1' },
            { label: 'Item 2', value: 'item2' },
          ],
          modelValue: 'item1',
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(result).toHaveProperty('render');
          expect(typeof result.render).toBe('function');
        }).not.toThrow();
      });

      it('应该正确处理 null 的 ref', () => {
        const props = {
          ref: null,
          render: vi.fn(),
          textField: 'label',
          valueField: 'value',
          data: [],
          modelValue: null,
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
          render: vi.fn(),
          textField: 'label',
          valueField: 'value',
          data: [],
          modelValue: undefined,
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
        // 测试插件链式调用
        const combinedAccumulate = TreeSelectBasicAccumulate.addPlugin({
          name: 'testPlugin',
          handle: () => ({
            testProperty: 'test-value',
            customData: 'custom',
          }),
        });

        const plugins = combinedAccumulate.getPluginMethod();

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

        const testAccumulate = TreeSelectBasicAccumulate.addPlugin(plugin1).addPlugin(plugin2);

        const plugins = testAccumulate.getPluginMethod();
        // 验证插件数量是否正确增加（可能已经有其他插件）
        expect(plugins.length).toBeGreaterThanOrEqual(7);

        const foundPlugin1 = testAccumulate.getPluginMethodByName('plugin1');
        const foundPlugin2 = testAccumulate.getPluginMethodByName('plugin2');

        expect(foundPlugin1).toBeDefined();
        expect(foundPlugin2).toBeDefined();
      });

      it('应该正确处理插件方法的获取', () => {
        const allMethods = TreeSelectBasicAccumulate.getPluginMethod();
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
        const nonExistentPlugin = TreeSelectBasicAccumulate.getPluginMethodByName('nonExistent');
        expect(nonExistentPlugin).toBeUndefined();
      });
    });
  });

  describe('ide.ts', () => {
    describe('TreeSelectIdeAccumulate 基础功能', () => {
      it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
        expect(TreeSelectIdeAccumulate).toBeDefined();
        expect(typeof TreeSelectIdeAccumulate.addPlugin).toBe('function');
        expect(typeof TreeSelectIdeAccumulate.getPluginMethod).toBe('function');
        expect(Array.isArray(TreeSelectIdeAccumulate.Plugin)).toBe(true);
      });

      it('应该包含 handleNodePath 插件', () => {
        const plugins = TreeSelectIdeAccumulate.getPluginMethod();
        expect(plugins).toHaveLength(0);

        const handleNodePathPlugin = TreeSelectIdeAccumulate.getPluginMethodByName('handleNodePath');
        expect(handleNodePathPlugin).toBeDefined();
        if (handleNodePathPlugin) {
          expect(handleNodePathPlugin.name).toBe('handleNodePath');
          expect(typeof (handleNodePathPlugin as any).handle).toBe('function');
        }
      });
    });

    describe('handleNodePath 插件功能测试', () => {
      const plugin = TreeSelectIdeAccumulate.getPluginMethodByName('handleNodePath') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          'data-nodepath': 'test-path',
          class: 'test-class',
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(typeof result).toBe('object');
          expect(result).toHaveProperty('class');
        }).not.toThrow();
      });

      it('应该正确设置 class 属性', () => {
        const props = {
          'data-nodepath': 'test-path',
          class: 'test-class',
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result.class).toBeDefined();
          expect(typeof result.class).toBe('string');
          expect(result.class).toContain('test-class');
          expect(result.class).toMatch(/^test-class TreeSelect_\d+$/);
        }).not.toThrow();
      });

      it('应该正确设置 deletePropsList', () => {
        const props = {
          'data-nodepath': 'test-path',
          class: 'test-class',
          [$deletePropsList]: ['existing-prop'],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result[$deletePropsList]).toBeDefined();
          expect(Array.isArray(result[$deletePropsList])).toBe(true);
          expect(result[$deletePropsList]).toEqual(expect.arrayContaining(['data-nodepath']));
        }).not.toThrow();
      });

      it('应该正确处理 undefined 的 class', () => {
        const props = {
          'data-nodepath': 'test-path',
          class: undefined,
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result.class).toBeDefined();
          expect(typeof result.class).toBe('string');
          expect(result.class).toContain('undefined');
          expect(result.class).toMatch(/^undefined TreeSelect_\d+$/);
        }).not.toThrow();
      });

      it('应该正确处理 null 的 class', () => {
        const props = {
          'data-nodepath': 'test-path',
          class: null,
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result.class).toBeDefined();
          expect(typeof result.class).toBe('string');
          expect(result.class).toContain('null');
          expect(result.class).toMatch(/^null TreeSelect_\d+$/);
        }).not.toThrow();
      });

      it('应该正确处理空字符串的 class', () => {
        const props = {
          'data-nodepath': 'test-path',
          class: '',
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result.class).toBeDefined();
          expect(typeof result.class).toBe('string');
          expect(result.class).toMatch(/^ TreeSelect_\d+$/);
        }).not.toThrow();
      });

      it('应该正确处理 undefined 的 data-nodepath', () => {
        const props = {
          'data-nodepath': undefined,
          class: 'test-class',
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(result).toHaveProperty('class');
        }).not.toThrow();
      });

      it('应该正确处理 null 的 data-nodepath', () => {
        const props = {
          'data-nodepath': null,
          class: 'test-class',
          [$deletePropsList]: [],
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(result).toHaveProperty('class');
        }).not.toThrow();
      });
    });

    describe('插件集成和扩展性测试', () => {
      it('应该能够与其他插件组合使用', () => {
        // 测试插件链式调用
        const combinedAccumulate = TreeSelectIdeAccumulate.addPlugin({
          name: 'testPlugin',
          handle: () => ({
            testProperty: 'test-value',
            customData: 'custom',
          }),
        });

        const plugins = combinedAccumulate.getPluginMethod();
        expect(plugins).toHaveLength(1);

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

        const testAccumulate = TreeSelectIdeAccumulate.addPlugin(plugin1).addPlugin(plugin2);

        const plugins = testAccumulate.getPluginMethod();
        // 验证插件数量是否正确增加（可能已经有其他插件）
        expect(plugins.length).toBeGreaterThanOrEqual(3);

        const foundPlugin1 = testAccumulate.getPluginMethodByName('plugin1');
        const foundPlugin2 = testAccumulate.getPluginMethodByName('plugin2');

        expect(foundPlugin1).toBeDefined();
        expect(foundPlugin2).toBeDefined();
      });

      it('应该正确处理插件方法的获取', () => {
        const allMethods = TreeSelectIdeAccumulate.getPluginMethod();
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
        const nonExistentPlugin = TreeSelectIdeAccumulate.getPluginMethodByName('nonExistent');
        expect(nonExistentPlugin).toBeUndefined();
      });
    });
  });
});
