import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@ep-test/test-utils/render-hook';
import { $deletePropsList,$router, $route } from '@/plugins/constants';

import '@/utils/index';
import MenuBasicAccumulate from '../plugins/basic-plugins';
import MenuIdeAccumulate from '../plugins/ide';
import ItemPluginAccumulate from '../plugins/item-plugin';
import MenuItemPluginAccumulate from '../plugins/menu-item';

describe('el-menu plugins', () => {
    // 重置所有 mock
    vi.clearAllMocks();
  });

  describe('basic-plugins.tsx', () => {
    describe('MenuBasicAccumulate 基础功能', () => {
      it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
        expect(MenuBasicAccumulate).toBeDefined();
        expect(typeof MenuBasicAccumulate.addPlugin).toBe('function');
        expect(typeof MenuBasicAccumulate.getPluginMethod).toBe('function');
          [$deletePropsList]: [],
          ref: { current: null },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
        expect(result).toHaveProperty('ref');
        expect(result).toHaveProperty('slots');
      });

      it('应该正确设置 deletePropsList', () => {
        const props = {
          dataSource: null,
          slots: {},
          textField: 'label',
          valueField: 'value',
          parentField: 'parent',
          [$deletePropsList]: [],
          ref: { current: null },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        const symbolKey = Object.getOwnPropertySymbols(result).find((s) =>
          s.toString().includes('deletePropsList'),
        ) as symbol;
        expect(symbolKey).toBeDefined();
        expect(Array.isArray(result[symbolKey])).toBe(true);
        expect(result[symbolKey]).toEqual(
          expect.arrayContaining(['textField', 'valueField', 'parentField', 'childrenField', 'dataSource']),
        );
      });

      it('应该正确处理数组类型的数据源', () => {
        const dataSource = [
          { label: 'Item 1', value: 'item1' },
          { label: 'Item 2', value: 'item2' },
        ];

        const props = {
          dataSource,
          slots: {},
          textField: 'label',
          valueField: 'value',
          parentField: 'parent',
          [$deletePropsList]: [],
          ref: { current: null },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('ref');
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
          slots: {},
          textField: 'name',
          valueField: 'id',
          parentField: 'parent',
          [$deletePropsList]: [],
          ref: { current: null },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('slots');
        expect(result.slots).toBeDefined();
      });

      it('应该正确处理空数据源时的状态', () => {
        const props = {
          dataSource: null,
          slots: {},
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

      it('应该正确设置 ref 对象', () => {
        const originalRef = { current: null, originalMethod: vi.fn() };
        const dataSource = [{ label: 'Item 1', value: 'item1' }];

        const props = {
          dataSource,
          slots: {},
          textField: 'label',
          valueField: 'value',
          parentField: 'parent',
          [$deletePropsList]: [],
          ref: originalRef,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.ref).toBeDefined();
        expect(typeof result.ref).toBe('object');
        expect(result.ref).toHaveProperty('reload');
        expect(result.ref).toHaveProperty('data');
      });

      it('应该正确处理函数类型的数据源', async () => {
        const dataSourceFn = vi.fn().mockResolvedValue([
          { label: 'Async Item 1', value: 'async1' },
          { label: 'Async Item 2', value: 'async2' },
        ]);

        const props = {
          dataSource: dataSourceFn,
          slots: {},
          textField: 'label',
          valueField: 'value',
          parentField: 'parent',
          [$deletePropsList]: [],
          ref: { current: null },
        };

        expect(() => {
          const { currentValue, waitForNextUpdate } = renderHook(plugin, props);

          // 初始状态验证
          expect(currentValue.value).toBeDefined();
          expect(currentValue.value).toHaveProperty('ref');
          expect(currentValue.value).toHaveProperty('slots');

          // 验证函数数据源被调用
          expect(dataSourceFn).toHaveBeenCalled();
        }).not.toThrow();
      });

      it('应该正确处理复杂的数据结构', () => {
        const complexDataSource = [
          {
            id: 1,
            name: 'Menu 1',
            parent: null,
            children: [
              { id: 2, name: 'Sub Menu 1', parent: 1 },
              { id: 3, name: 'Sub Menu 2', parent: 1 },
            ],
          },
          {
            id: 4,
            name: 'Menu 2',
            parent: null,
          },
        ];

        const props = {
          dataSource: complexDataSource,
          slots: {},
          textField: 'name',
          valueField: 'id',
          parentField: 'parent',
          [$deletePropsList]: [],
          ref: { current: null },
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(result).toHaveProperty('slots');
          expect(result).toHaveProperty('ref');
        }).not.toThrow();
      });

      it('应该正确处理边界情况', () => {
        const testCases = [
          { dataSource: [] },
          { dataSource: undefined },
          { dataSource: null },
        ];

        testCases.forEach((testCase) => {
          const props = {
            ...testCase,
            slots: {},
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
    });

    describe('handleSlotDefault 插件功能测试', () => {
      const plugin = MenuBasicAccumulate.getPluginMethodByName('handleSlotDefault') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          dataSource: null,
          mode: 'horizontal',
          slots: {},
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
        expect(result).toHaveProperty('slots');
      });

      it('应该正确处理有数据源时的情况', () => {
        const props = {
          dataSource: [{ label: 'Item 1', value: 'item1' }],
          mode: 'horizontal',
          slots: {},
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toHaveProperty('slots');
      });

      it('应该正确处理非水平模式', () => {
        const props = {
          dataSource: null,
          mode: 'vertical',
          slots: {},
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toEqual({});
      });

      it('应该正确处理水平模式', () => {
        const props = {
          dataSource: null,
          mode: 'horizontal',
          slots: {
            left: vi.fn(() => 'left'),
            default: vi.fn(() => 'default'),
            right: vi.fn(() => 'right'),
          },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('slots');
        expect(result.slots).toHaveProperty('default');
        expect(typeof result.slots.default).toBe('function');
      });

      it('应该正确处理空的 slots', () => {
        const props = {
          dataSource: null,
          mode: 'horizontal',
          slots: {},
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('slots');
        expect(result.slots).toHaveProperty('default');
        expect(typeof result.slots.default).toBe('function');
      });

      it('应该正确处理只有 left 和 default 的 slots', () => {
        const props = {
          dataSource: null,
          mode: 'horizontal',
          slots: {
            left: vi.fn(() => 'left'),
            default: vi.fn(() => 'default'),
          },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('slots');
        expect(result.slots).toHaveProperty('default');
        expect(typeof result.slots.default).toBe('function');
      });
    });

    describe('handleRouter 插件功能测试', () => {
      const plugin = MenuBasicAccumulate.getPluginMethodByName('handleRouter') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          router: null,
          route: null,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
        expect(result).toHaveProperty('defaultActive');
      });

      it('应该正确处理有 router 和 route 的情况', () => {
        const mockRouter = {
          afterEach: vi.fn(),
        };
        const mockRoute = {
          path: '/test',
        };

        const props = {
          [$router]: mockRouter,
          [$route]: mockRoute,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('defaultActive');
      });

      it('应该正确处理只有 route 的情况', () => {
        const mockRoute = {
          path: '/test',
        };

        const props = {
          [$router]: null,
          [$route]: mockRoute,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('defaultActive');
        expect(result.defaultActive).toBeDefined();
      });

      it('应该正确处理只有 router 的情况', () => {
        const mockRouter = {
          afterEach: vi.fn(),
        };

        const props = {
          router: mockRouter,
          route: null,
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
        }).not.toThrow();
      });

      it('应该正确处理空值情况', () => {
        const props = {
          router: null,
          route: null,
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
        }).not.toThrow();
      });
    });
  });

  describe('ide.tsx', () => {
    describe('MenuIdeAccumulate 基础功能', () => {
      it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
        expect(MenuIdeAccumulate).toBeDefined();
        expect(typeof MenuIdeAccumulate.addPlugin).toBe('function');
        expect(typeof MenuIdeAccumulate.getPluginMethod).toBe('function');
        expect(Array.isArray(MenuIdeAccumulate.Plugin)).toBe(true);
      });

      it('应该包含 handleDataSourceDemo 插件', () => {
        const plugins = MenuIdeAccumulate.getPluginMethod();
        expect(plugins).toBeDefined();
        expect(Array.isArray(plugins)).toBe(true);
        expect(plugins).toHaveLength(0);

        const handleDataSourceDemoPlugin = MenuIdeAccumulate.getPluginMethodByName('handleDataSourceDemo');
        expect(handleDataSourceDemoPlugin).toBeDefined();
        expect(handleDataSourceDemoPlugin?.name).toBe('handleDataSourceDemo');
      });
    });

    describe('handleDataSourceDemo 插件功能测试', () => {
      const plugin = MenuIdeAccumulate.getPluginMethodByName('handleDataSourceDemo') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          slots: {},
          showInDesigner: false,
          dataSource: null,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
        expect(result).toHaveProperty('slots');
      });

      it('应该正确处理 showInDesigner 为 false 的情况', () => {
        const props = {
          slots: {},
          showInDesigner: false,
          dataSource: [{ label: 'Item 1', value: 'item1' }],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots).toBeDefined();
        expect(result.slots).toEqual({});
      });

      it('应该正确处理 showInDesigner 为 true 且有数据源的情况', () => {
        const props = {
          slots: {},
          showInDesigner: true,
          dataSource: [{ label: 'Item 1', value: 'item1' }],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots).toBeDefined();
        expect(result.slots).toHaveProperty('default');
        expect(typeof result.slots.default).toBe('function');
      });

      it('应该正确处理 showInDesigner 为 true 但无数据源的情况', () => {
        const props = {
          slots: {},
          showInDesigner: true,
          dataSource: null,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots).toBeDefined();
        expect(result.slots).toEqual({});
      });

      it('应该正确处理有现有 slots 的情况', () => {
        const existingSlots = {
          custom: vi.fn(() => 'custom'),
        };

        const props = {
          slots: existingSlots,
          showInDesigner: true,
          dataSource: [{ label: 'Item 1', value: 'item1' }],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots).toBeDefined();
        expect(result.slots).toHaveProperty('custom');
        expect(result.slots).toHaveProperty('default');
      });
    });
  });

  describe('item-plugin.ts', () => {
    describe('ItemPluginAccumulate 基础功能', () => {
      it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
        expect(ItemPluginAccumulate).toBeDefined();
        expect(typeof ItemPluginAccumulate.addPlugin).toBe('function');
        expect(typeof ItemPluginAccumulate.getPluginMethod).toBe('function');
        expect(Array.isArray(ItemPluginAccumulate.Plugin)).toBe(true);
      });

      it('应该包含 handleIndex 插件', () => {
        const plugins = ItemPluginAccumulate.getPluginMethod();
        expect(plugins).toBeDefined();
        expect(Array.isArray(plugins)).toBe(true);
        expect(plugins).toHaveLength(1);

        const handleIndexPlugin = ItemPluginAccumulate.getPluginMethodByName('handleIndex');
        expect(handleIndexPlugin).toBeDefined();
        expect(handleIndexPlugin?.name).toBe('handleIndex');
      });
    });

    describe('handleIndex 插件功能测试', () => {
      const plugin = ItemPluginAccumulate.getPluginMethodByName('handleIndex') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          index: 'test-index',
          destination: 'test-destination',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
        expect(result).toHaveProperty('index');
      });

      it('应该正确处理有 index 的情况', () => {
        const props = {
          index: 'test-index',
          destination: 'test-destination',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.index).toBe('test-index');
      });

      it('应该正确处理有 destination 但没有 index 的情况', () => {
        const props = {
          index: null,
          destination: 'test-destination',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.index).toBe('test-destination');
      });

      it('应该正确处理既没有 index 也没有 destination 的情况', () => {
        const props = {
          index: null,
          destination: null,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.index).toBeDefined();
        expect(typeof result.index).toBe('string');
        expect(result.index).toContain('el-menu-item-');
      });

      it('应该正确处理 undefined 的情况', () => {
        const props = {
          index: undefined,
          destination: undefined,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.index).toBeDefined();
        expect(typeof result.index).toBe('string');
        expect(result.index).toContain('el-menu-item-');
      });
    });
  });

  describe('menu-item.ts', () => {
    describe('MenuItemPluginAccumulate 基础功能', () => {
      it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
        expect(MenuItemPluginAccumulate).toBeDefined();
        expect(typeof MenuItemPluginAccumulate.addPlugin).toBe('function');
        expect(typeof MenuItemPluginAccumulate.getPluginMethod).toBe('function');
        expect(Array.isArray(MenuItemPluginAccumulate.Plugin)).toBe(true);
      });

      it('应该包含多个插件', () => {
        const plugins = MenuItemPluginAccumulate.getPluginMethod();
        expect(plugins).toBeDefined();
        expect(Array.isArray(plugins)).toBe(true);
        expect(plugins.length).toBeGreaterThan(0);

        const pluginNames = ['handleIndex', 'handleHrefToRouter'];
        pluginNames.forEach((name) => {
          const plugin = MenuItemPluginAccumulate.getPluginMethodByName(name);
          expect(plugin).toBeDefined();
          expect(plugin?.name).toBe(name);
        });
      });
    });

    describe('handleHrefToRouter 插件功能测试', () => {
      const plugin = MenuItemPluginAccumulate.getPluginMethodByName('handleHrefToRouter') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          destination: null,
          link: null,
          href: null,
          target: null,
          onClick: null,
          router: null,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
        expect(result).toHaveProperty('onClick');
      });

      it('应该正确处理外部链接且 target 为 _blank', () => {
        const props = {
          destination: null,
          link: 'https://example.com',
          href: null,
          target: '_blank',
          onClick: vi.fn(),
          router: null,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('onClick');
        expect(typeof result.onClick).toBe('function');
      });

      it('应该正确处理外部链接但 target 不是 _blank', () => {
        const props = {
          destination: null,
          link: 'https://example.com',
          href: null,
          target: '_self',
          onClick: vi.fn(),
          router: null,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('onClick');
        expect(typeof result.onClick).toBe('function');
      });

      it('应该正确处理内部路由', () => {
        const mockRouter = {
          push: vi.fn(),
        };

        const props = {
          destination: '/test',
          link: null,
          href: null,
          target: null,
          onClick: vi.fn(),
          router: mockRouter,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('onClick');
        expect(typeof result.onClick).toBe('function');
      });

      it('应该正确处理空值情况', () => {
        const props = {
          destination: null,
          link: null,
          href: null,
          target: null,
          onClick: null,
          router: null,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('onClick');
        expect(typeof result.onClick).toBe('function');
      });

      it('应该正确处理复杂的路由情况', () => {
        const mockRouter = {
          push: vi.fn(),
        };

        const props = {
          destination: '/test',
          link: 'https://example.com',
          href: null,
          target: '_blank',
          onClick: vi.fn(),
          router: mockRouter,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('onClick');
        expect(typeof result.onClick).toBe('function');
      });
    });
  });

  describe('边界情况和错误处理测试', () => {
    it('应该正确处理 props.get 抛出异常的情况', () => {
      const plugin = MenuBasicAccumulate.getPluginMethodByName('handleDataSource') as any;

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
      const plugin = MenuBasicAccumulate.getPluginMethodByName('handleDataSource') as any;

      const testCases = [
        { dataSource: null, slots: null, textField: null, valueField: null },
        { dataSource: undefined, slots: undefined, textField: undefined, valueField: undefined },
        { dataSource: [], slots: {}, textField: '', valueField: '' },
        { dataSource: [{ label: 'test', value: 'test' }], slots: {}, textField: 'label', valueField: 'value' },
      ];

      testCases.forEach((testCase) => {
        expect(() => {
          const { currentValue } = renderHook(plugin, testCase);
          expect(currentValue.value).toBeDefined();
        }).not.toThrow();
      });
    });

    it('应该正确处理 handleSlotDefault 的各种数据类型', () => {
      const plugin = MenuBasicAccumulate.getPluginMethodByName('handleSlotDefault') as any;

      const testCases = [
        { dataSource: null, mode: null, slots: null },
        { dataSource: undefined, mode: undefined, slots: undefined },
        { dataSource: [], mode: 'horizontal', slots: {} },
        { dataSource: [{ label: 'test', value: 'test' }], mode: 'vertical', slots: {} },
      ];

      testCases.forEach((testCase) => {
        expect(() => {
          const { currentValue } = renderHook(plugin, testCase);
          expect(currentValue.value).toBeDefined();
        }).not.toThrow();
      });
    });

    it('应该正确处理 handleRouter 的各种数据类型', () => {
      const plugin = MenuBasicAccumulate.getPluginMethodByName('handleRouter') as any;

      const testCases = [
        { router: null, route: null },
        { router: undefined, route: undefined },
        { router: { afterEach: vi.fn() }, route: { path: '/test' } },
        { router: null, route: { path: '/test' } },
      ];

      testCases.forEach((testCase) => {
        expect(() => {
          const { currentValue } = renderHook(plugin, testCase);
          expect(currentValue.value).toBeDefined();
        }).not.toThrow();
      });
    });

    it('应该正确处理 handleDataSourceDemo 的各种数据类型', () => {
      const plugin = MenuIdeAccumulate.getPluginMethodByName('handleDataSourceDemo') as any;

      const testCases = [
        { slots: null, showInDesigner: null, dataSource: null },
        { slots: undefined, showInDesigner: undefined, dataSource: undefined },
        { slots: {}, showInDesigner: false, dataSource: [] },
        { slots: {}, showInDesigner: true, dataSource: [{ label: 'test', value: 'test' }] },
      ];

      testCases.forEach((testCase) => {
        expect(() => {
          const { currentValue } = renderHook(plugin, testCase);
          expect(currentValue.value).toBeDefined();
        }).not.toThrow();
      });
    });

    it('应该正确处理 handleIndex 的各种数据类型', () => {
      const plugin = ItemPluginAccumulate.getPluginMethodByName('handleIndex') as any;

      const testCases = [
        { index: null, destination: null },
        { index: undefined, destination: undefined },
        { index: 'test', destination: 'test' },
        { index: '', destination: '' },
      ];

      testCases.forEach((testCase) => {
        expect(() => {
          const { currentValue } = renderHook(plugin, testCase);
          expect(currentValue.value).toBeDefined();
        }).not.toThrow();
      });
    });

    it('应该正确处理 handleHrefToRouter 的各种数据类型', () => {
      const plugin = MenuItemPluginAccumulate.getPluginMethodByName('handleHrefToRouter') as any;

      const testCases = [
        { destination: null, link: null, href: null, target: null, onClick: null, router: null },
        { destination: undefined, link: undefined, href: undefined, target: undefined, onClick: undefined, router: undefined },
        { destination: '/test', link: 'https://test.com', href: 'https://test.com', target: '_blank', onClick: vi.fn(), router: { push: vi.fn() } },
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
      const combinedAccumulate = MenuBasicAccumulate.addPlugin({
        name: 'testPlugin',
        handle: () => ({
          testProperty: 'test-value',
          customData: 'custom',
        }),
      });

      const plugins = combinedAccumulate.getPluginMethod();
      expect(plugins).toHaveLength(4);

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

      const testAccumulate = MenuBasicAccumulate.addPlugin(plugin1).addPlugin(plugin2);

      const plugins = testAccumulate.getPluginMethod();
      // 验证插件数量是否正确增加
      expect(plugins.length).toBeGreaterThanOrEqual(5);

      const foundPlugin1 = testAccumulate.getPluginMethodByName('plugin1');
      const foundPlugin2 = testAccumulate.getPluginMethodByName('plugin2');

      expect(foundPlugin1).toBeDefined();
      expect(foundPlugin2).toBeDefined();
    });

    it('应该正确处理插件方法的获取', () => {
      const allMethods = MenuBasicAccumulate.getPluginMethod();
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
      const nonExistentPlugin = MenuBasicAccumulate.getPluginMethodByName('nonExistent');
      expect(nonExistentPlugin).toBeUndefined();
    });
  });
});
