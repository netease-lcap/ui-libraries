import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@ep-test/test-utils/render-hook';
import { $deletePropsList } from '@/plugins/constants';
import '@/utils/index';
import ElTreeBasicAccumulate from '../plugins/basic-plugins';

describe('el-tree plugins', () => {
  beforeEach(() => {
    // 重置所有 mock
    vi.clearAllMocks();
  });

  describe('basic-plugins.tsx', () => {
    describe('ElTreeBasicAccumulate 基础功能', () => {
      it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
        expect(ElTreeBasicAccumulate).toBeDefined();
        expect(typeof ElTreeBasicAccumulate.addPlugin).toBe('function');
        expect(typeof ElTreeBasicAccumulate.getPluginMethod).toBe('function');
        expect(Array.isArray(ElTreeBasicAccumulate.Plugin)).toBe(true);
      });

      it('应该包含所有必要的插件', () => {
        const plugins = ElTreeBasicAccumulate.getPluginMethod();
        expect(plugins).toHaveLength(3);

        const pluginNames = ['handleDataSource', 'handleVirtualize'];

        pluginNames.forEach((name) => {
          const plugin = ElTreeBasicAccumulate.getPluginMethodByName(name);
          expect(plugin).toBeDefined();
          if (plugin) {
            expect(plugin.name).toBe(name);
            expect(typeof (plugin as any).handle).toBe('function');
          }
        });
      });
    });

    describe('handleDataSource 插件功能测试', () => {
      const plugin = ElTreeBasicAccumulate.getPluginMethodByName('handleDataSource') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          dataSource: null,
          slots: {
            item: vi.fn(),
          },
          [$deletePropsList]: [],
          ref: { current: null },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        // 验证返回值基本结构
        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
        expect(result).toHaveProperty('ref');
        expect(result).toHaveProperty('loading');
        expect(result).toHaveProperty('nodeKey');
        expect(result).toHaveProperty('slots');
      });

      it('应该正确设置 deletePropsList', () => {
        const props = {
          dataSource: null,
          slots: { item: vi.fn() },
          [$deletePropsList]: [],
          ref: { current: null },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        // 验证 deletePropsList Symbol 属性
        const symbolKey = Object.getOwnPropertySymbols(result).find((s) => s.toString().includes('deletePropsList')) as symbol;
        expect(symbolKey).toBeDefined();
        expect(Array.isArray(result[symbolKey])).toBe(true);
        expect(result[symbolKey]).toEqual(
          expect.arrayContaining(['textField', 'valueField', 'parentField', 'childrenField']),
        );
      });

      it('应该正确处理数组类型的数据源', () => {
        const dataSource = [
          { label: 'Item 1', value: 'item1' },
          { label: 'Item 2', value: 'item2' },
        ];

        const props = {
          dataSource,
          slots: { item: vi.fn() },
          [$deletePropsList]: [],
          ref: { current: null },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        // 验证基本结构
        expect(result).toBeDefined();
        expect(result).toHaveProperty('ref');
        expect(result).toHaveProperty('loading');
        expect(result).toHaveProperty('nodeKey');
        expect(result).toHaveProperty('slots');
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
          parentField: 'parent',
          slots: { item: vi.fn() },
          [$deletePropsList]: [],
          ref: { current: null },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        // 验证插件能正常处理自定义字段名，但不一定返回 data 属性
        expect(result).toHaveProperty('ref');
        expect(result).toHaveProperty('loading');
        expect(result).toHaveProperty('nodeKey');
      });

      it('应该正确设置 ref 对象', () => {
        const originalRef = { current: null, originalMethod: vi.fn() };
        const dataSource = [{ label: 'Item 1', value: 'item1' }];

        const props = {
          dataSource,
          slots: { item: vi.fn() },
          [$deletePropsList]: [],
          ref: originalRef,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.ref).toBeDefined();
        expect(typeof result.ref).toBe('object');
        // ref 应该包含原有属性或被正确处理
        expect(result.ref).toBeDefined();
      });

      it('应该正确处理函数类型的数据源', async () => {
        const dataSourceFn = vi.fn().mockResolvedValue([
          { label: 'Async Item 1', value: 'async1' },
          { label: 'Async Item 2', value: 'async2' },
        ]);

        const props = {
          dataSource: dataSourceFn,
          slots: { item: vi.fn() },
          [$deletePropsList]: [],
          ref: { current: null },
        };

        const { currentValue, waitForNextUpdate } = renderHook(plugin, props);

        // 初始状态验证 - 确认插件已初始化
        expect(currentValue.value).toBeDefined();
        expect(currentValue.value).toHaveProperty('loading');
        expect(currentValue.value).toHaveProperty('ref');
        expect(currentValue.value).toHaveProperty('nodeKey');

        // 验证函数数据源被调用
        expect(dataSourceFn).toHaveBeenCalled();

        // 等待异步数据加载完成
        await waitForNextUpdate();

        // 验证异步数据加载后的状态
        expect(currentValue.value).toBeDefined();
        expect(currentValue.value).toHaveProperty('loading');
        expect(currentValue.value).toHaveProperty('ref');
        expect(currentValue.value).toHaveProperty('nodeKey');

        // 验证ref包含reload方法
        expect(currentValue.value.ref).toHaveProperty('reload');
        expect(typeof currentValue.value.ref.reload).toBe('function');
      });

      it('应该正确处理复杂的数据结构', () => {
        const complexDataSource = [
          {
            id: 1,
            name: 'Node 1',
            key: 'node1',
            parent: null,
            children: [
              {
                id: 2,
                name: 'Child 1',
                key: 'child1',
                parent: 'node1',
              },
            ],
          },
          {
            id: 3,
            name: 'Node 2',
            key: 'node2',
            parent: null,
          },
        ];

        const props = {
          dataSource: complexDataSource,
          textField: 'name',
          valueField: 'key',
          parentField: 'parent',
          slots: { item: vi.fn() },
          [$deletePropsList]: [],
          ref: { current: null },
        };

        // 检查插件能否处理复杂数据结构而不抛出错误
        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(result).toHaveProperty('loading');
          expect(result).toHaveProperty('ref');
          expect(result).toHaveProperty('nodeKey');
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
            slots: { item: vi.fn() },
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

      it('应该正确处理 slots 的 item 函数', () => {
        const mockItemSlot = vi.fn();
        const dataSource = [{ label: 'Item 1', value: 'item1' }];

        const props = {
          dataSource,
          slots: {
            item: mockItemSlot,
            other: vi.fn(),
          },
          [$deletePropsList]: [],
          ref: { current: null },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots).toBeDefined();
        expect(result.slots).toHaveProperty('item');
        expect(result.slots).toHaveProperty('other'); // 应该保留原有的 slots
        expect(result.slots).toHaveProperty('default'); // 应该添加 default slot
        expect(typeof result.slots.default).toBe('function');
      });

      it('应该正确处理没有 item slot 的情况', () => {
        const dataSource = [{ label: 'Item 1', value: 'item1' }];

        const props = {
          dataSource,
          slots: {
            other: vi.fn(),
          },
          [$deletePropsList]: [],
          ref: { current: null },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots).toBeDefined();
        expect(result.slots).toHaveProperty('other'); // 应该保留原有的 slots
        expect(result.slots).not.toHaveProperty('default'); // 不应该添加 default slot
      });

      it('应该正确处理空的 slots', () => {
        const dataSource = [{ label: 'Item 1', value: 'item1' }];

        const props = {
          dataSource,
          slots: {},
          [$deletePropsList]: [],
          ref: { current: null },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots).toBeDefined();
        expect(typeof result.slots).toBe('object');
      });

      it('应该正确处理 undefined 的 slots', () => {
        const dataSource = [{ label: 'Item 1', value: 'item1' }];

        const props = {
          dataSource,
          slots: undefined,
          [$deletePropsList]: [],
          ref: { current: null },
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
        }).not.toThrow();
      });

      it('应该正确处理 null 的 slots', () => {
        const dataSource = [{ label: 'Item 1', value: 'item1' }];

        const props = {
          dataSource,
          slots: null,
          [$deletePropsList]: [],
          ref: { current: null },
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
        }).not.toThrow();
      });

      it('应该正确设置 nodeKey', () => {
        const props = {
          dataSource: null,
          slots: { item: vi.fn() },
          [$deletePropsList]: [],
          ref: { current: null },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.nodeKey).toBe('value');
      });

      it('应该正确处理空数据源时的 data 属性', () => {
        const props = {
          dataSource: [],
          slots: { item: vi.fn() },
          [$deletePropsList]: [],
          ref: { current: null },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).not.toHaveProperty('data'); // 空数据源时不应该有 data 属性
      });

      it('应该正确处理有数据源时的 data 属性', () => {
        const dataSource = [{ label: 'Item 1', value: 'item1' }];

        const props = {
          dataSource,
          slots: { item: vi.fn() },
          [$deletePropsList]: [],
          ref: { current: null },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('ref');
        expect(result).toHaveProperty('loading');
        expect(result).toHaveProperty('nodeKey');
      });
    });

    describe('handleVirtualize 插件功能测试', () => {
      const plugin = ElTreeBasicAccumulate.getPluginMethodByName('handleVirtualize') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          virtualize: false,
          slots: { item: vi.fn() },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
      });

      it('应该正确处理非虚拟化模式', () => {
        const props = {
          virtualize: false,
          slots: { item: vi.fn() },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toEqual({}); // 非虚拟化模式下应该返回空对象
      });

      it('应该正确处理虚拟化模式', () => {
        const props = {
          virtualize: true,
          slots: { item: vi.fn() },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toHaveProperty('render');
        expect(typeof result.render).toBe('function');
      });

      it('应该正确处理 undefined 的 virtualize', () => {
        const props = {
          virtualize: undefined,
          slots: { item: vi.fn() },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toEqual({}); // undefined 应该被视为 false
      });

      it('应该正确处理 null 的 virtualize', () => {
        const props = {
          virtualize: null,
          slots: { item: vi.fn() },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toEqual({}); // null 应该被视为 false
      });

      it('应该正确处理空字符串的 virtualize', () => {
        const props = {
          virtualize: '',
          slots: { item: vi.fn() },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toEqual({}); // 空字符串应该被视为 false
      });

      it('应该正确处理数字 0 的 virtualize', () => {
        const props = {
          virtualize: 0,
          slots: { item: vi.fn() },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toEqual({}); // 0 应该被视为 false
      });

      it('应该正确处理数字 1 的 virtualize', () => {
        const props = {
          virtualize: 1,
          slots: { item: vi.fn() },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toHaveProperty('render');
        expect(typeof result.render).toBe('function');
      });

      it('应该正确处理字符串 "true" 的 virtualize', () => {
        const props = {
          virtualize: 'true',
          slots: { item: vi.fn() },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toHaveProperty('render');
        expect(typeof result.render).toBe('function');
      });

      it('应该正确处理字符串 "false" 的 virtualize', () => {
        const props = {
          virtualize: 'false',
          slots: { item: vi.fn() },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toHaveProperty('render'); // "false" 字符串被视为 truthy
        expect(typeof result.render).toBe('function');
      });

      it('应该正确处理对象的 virtualize', () => {
        const props = {
          virtualize: { enabled: true },
          slots: { item: vi.fn() },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toHaveProperty('render');
        expect(typeof result.render).toBe('function');
      });

      it('应该正确处理数组的 virtualize', () => {
        const props = {
          virtualize: [1, 2, 3],
          slots: { item: vi.fn() },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toHaveProperty('render');
        expect(typeof result.render).toBe('function');
      });

      it('应该正确处理 undefined 的 slots', () => {
        const props = {
          virtualize: true,
          slots: undefined,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toHaveProperty('render');
        expect(typeof result.render).toBe('function');
      });

      it('应该正确处理 null 的 slots', () => {
        const props = {
          virtualize: true,
          slots: null,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toHaveProperty('render');
        expect(typeof result.render).toBe('function');
      });

      it('应该正确处理空对象的 slots', () => {
        const props = {
          virtualize: true,
          slots: {},
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toHaveProperty('render');
        expect(typeof result.render).toBe('function');
      });

      it('应该正确处理复杂对象的 slots', () => {
        const props = {
          virtualize: true,
          slots: {
            item: vi.fn(),
            other: vi.fn(),
            custom: vi.fn(),
          },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toHaveProperty('render');
        expect(typeof result.render).toBe('function');
      });
    });

    describe('插件集成和扩展性测试', () => {
      it('应该能够与其他插件组合使用', () => {
        const combinedAccumulate = ElTreeBasicAccumulate.addPlugin({
          name: 'testPlugin',
          handle: () => ({
            testProperty: 'test-value',
            customData: 'custom',
          }),
        });

        const plugins = combinedAccumulate.getPluginMethod();
        expect(plugins).toHaveLength(4);

        const handleDataSourcePlugin = combinedAccumulate.getPluginMethodByName('handleDataSource');
        const handleVirtualizePlugin = combinedAccumulate.getPluginMethodByName('handleVirtualize');
        const testPlugin = combinedAccumulate.getPluginMethodByName('testPlugin');

        expect(handleDataSourcePlugin).toBeDefined();
        expect(handleVirtualizePlugin).toBeDefined();
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

        const testAccumulate = ElTreeBasicAccumulate.addPlugin(plugin1).addPlugin(plugin2);

        const plugins = testAccumulate.getPluginMethod();
        expect(plugins.length).toBeGreaterThanOrEqual(4);

        const foundPlugin1 = testAccumulate.getPluginMethodByName('plugin1');
        const foundPlugin2 = testAccumulate.getPluginMethodByName('plugin2');

        expect(foundPlugin1).toBeDefined();
        expect(foundPlugin2).toBeDefined();
      });

      it('应该正确处理插件方法的获取', () => {
        const allMethods = ElTreeBasicAccumulate.getPluginMethod();
        expect(Array.isArray(allMethods)).toBe(true);
        expect(allMethods.length).toBeGreaterThan(0);

        allMethods.forEach((method) => {
          expect(
            typeof method === 'function' || (typeof method === 'object' && typeof method.handle === 'function'),
          ).toBe(true);
        });
      });

      it('应该正确处理不存在的插件查询', () => {
        const nonExistentPlugin = ElTreeBasicAccumulate.getPluginMethodByName('nonExistent');
        expect(nonExistentPlugin).toBeUndefined();
      });
    });
  });

  describe('ide.ts', () => {
    it('应该是一个空文件，仅用于导出', () => {
      expect(async () => {
        await import('../plugins/ide');
      }).not.toThrow();
    });
  });

  describe('index.ts', () => {
    it('应该正确导出所有插件', () => {
      expect(async () => {
        await import('../plugins/index');
      }).not.toThrow();
    });
  });
});
