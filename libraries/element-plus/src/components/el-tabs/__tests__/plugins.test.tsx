import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@ep-test/test-utils/render-hook';
import { $deletePropsList, $dataSourceDeleteField, $router, $route } from '@/plugins/constants';
import '@/utils/index';
import TabsAccumulate from '../plugins/basic-plugins';

describe('el-tabs plugins', () => {
  beforeEach(() => {
    // 重置所有 mock
    vi.clearAllMocks();
  });

  describe('basic-plugins.tsx', () => {
    describe('TabsAccumulate 基础功能', () => {
      it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
        expect(TabsAccumulate).toBeDefined();
        expect(typeof TabsAccumulate.addPlugin).toBe('function');
        expect(typeof TabsAccumulate.getPluginMethod).toBe('function');
        expect(Array.isArray(TabsAccumulate.Plugin)).toBe(true);
      });

      it('应该包含所有必要的插件', () => {
        const plugins = TabsAccumulate.getPluginMethod();
        // expect(plugins).toHaveLength(2);

        const pluginNames = [
          'handleDataSource',
          'handleValue',
          'handleRouteLinkage',
          'handleAddIcon',
        ];

        pluginNames.forEach((name) => {
          const plugin = TabsAccumulate.getPluginMethodByName(name);
          expect(plugin).toBeDefined();
          if (plugin) {
            expect(plugin.name).toBe(name);
            expect(typeof (plugin as any).handle).toBe('function');
          }
        });
      });
    });

    describe('handleDataSource 插件功能测试', () => {
      const plugin = TabsAccumulate.getPluginMethodByName('handleDataSource') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          dataSource: null,
          titleField: 'label',
          valueField: 'value',
          slots: {},
          [$deletePropsList]: [],
          ref: { current: null },
          onTabClick: () => {},
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('ref');
        expect(result).toHaveProperty('loading');
        expect(result).toHaveProperty('data');
        expect(result).toHaveProperty('slots');
        expect(result).toHaveProperty('onTabClick');
      });

      it('应该正确设置 deletePropsList', () => {
        const props = {
          dataSource: null,
          titleField: 'label',
          valueField: 'value',
          slots: {},
          [$deletePropsList]: ['existing-prop'],
          ref: { current: null },
          onTabClick: () => {},
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        const symbolKey = Object.getOwnPropertySymbols(result).find((s) => s.toString().includes('deletePropsList')) as symbol;
        expect(symbolKey).toBeDefined();
        expect(result[symbolKey]).toEqual(expect.arrayContaining([...$dataSourceDeleteField]));
      });

      it('应该正确处理数组类型的数据源', () => {
        const dataSource = [
          { label: 'Tab 1', value: 'tab1' },
          { label: 'Tab 2', value: 'tab2' },
        ];

        const props = {
          dataSource,
          titleField: 'label',
          valueField: 'value',
          slots: {},
          [$deletePropsList]: [],
          ref: { current: null },
          onTabClick: () => {},
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('ref');
        expect(result).toHaveProperty('loading');
        expect(result).toHaveProperty('data');
        expect(result).toHaveProperty('slots');
        expect(result).toHaveProperty('onTabClick');
        expect(typeof result.ref).toBe('object');
      });

      it('应该正确处理自定义字段名', () => {
        const dataSource = [
          { title: 'Tab 1', id: 'tab1' },
          { title: 'Tab 2', id: 'tab2' },
        ];

        const props = {
          dataSource,
          titleField: 'title',
          valueField: 'id',
          slots: {},
          [$deletePropsList]: [],
          ref: { current: null },
          onTabClick: () => {},
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
        }).not.toThrow();
      });

      it('应该正确处理空数据源时的 slots', () => {
        const props = {
          dataSource: null,
          titleField: 'label',
          valueField: 'value',
          slots: { existing: vi.fn() },
          [$deletePropsList]: [],
          ref: { current: null },
          onTabClick: () => {},
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots).toBeDefined();
        expect(result.slots).toHaveProperty('existing');
        expect(typeof result.slots.default).not.toBe('function');
      });

      it('应该正确处理有数据源时的 slots', () => {
        const dataSource = [{ label: 'Tab 1', value: 'tab1' }];

        const props = {
          dataSource,
          titleField: 'label',
          valueField: 'value',
          slots: {
            existing: vi.fn(),
            label: vi.fn(),
            content: vi.fn(),
          },
          [$deletePropsList]: [],
          ref: { current: null },
          onTabClick: () => {},
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots).toBeDefined();
        expect(result.slots).toHaveProperty('existing');
        expect(typeof result.slots).toBe('object');
      });

      it('应该正确设置 ref 对象', () => {
        const originalRef = { current: null, originalMethod: vi.fn() };
        const dataSource = [{ label: 'Tab 1', value: 'tab1' }];

        const props = {
          dataSource,
          titleField: 'label',
          valueField: 'value',
          slots: {},
          [$deletePropsList]: [],
          ref: originalRef,
          onTabClick: () => {},
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.ref).toBeDefined();
        expect(typeof result.ref).toBe('object');
        expect(result.ref).toBeDefined();
      });

      it('应该正确处理函数类型的数据源', async () => {
        const dataSourceFn = vi.fn().mockResolvedValue([
          { label: 'Async Tab 1', value: 'async-tab1' },
          { label: 'Async Tab 2', value: 'async-tab2' },
        ]);

        const props = {
          dataSource: dataSourceFn,
          titleField: 'label',
          valueField: 'value',
          slots: {},
          [$deletePropsList]: [],
          ref: { current: null },
          onTabClick: () => {},
        };

        const { currentValue, waitForNextUpdate } = renderHook(plugin, props);

        expect(currentValue.value).toBeDefined();
        expect(currentValue.value).toHaveProperty('data');
        expect(currentValue.value).toHaveProperty('loading');
        expect(currentValue.value).toHaveProperty('ref');
        expect(currentValue.value).toHaveProperty('slots');
        expect(currentValue.value).toHaveProperty('onTabClick');

        expect(dataSourceFn).toHaveBeenCalled();

        await waitForNextUpdate();

        expect(currentValue.value).toBeDefined();
        expect(currentValue.value).toHaveProperty('data');
        expect(Array.isArray(currentValue.value.data)).toBe(true);
        expect(currentValue.value.data.length).toBeGreaterThan(0);

        const firstItem = currentValue.value.data[0];
        expect(firstItem).toHaveProperty('value');
        expect(firstItem).toHaveProperty('label');

        expect(currentValue.value.ref).toHaveProperty('reload');
        expect(typeof currentValue.value.ref.reload).toBe('function');
      });

      it('应该正确处理复杂的数据结构', () => {
        const complexDataSource = [
          {
            id: 1,
            title: 'Tab 1',
            value: 'tab1',
            disabled: false,
            extra: { category: 'main' },
          },
          {
            id: 2,
            title: 'Tab 2',
            value: 'tab2',
            disabled: true,
            extra: { category: 'sub' },
          },
        ];

        const props = {
          dataSource: complexDataSource,
          titleField: 'title',
          valueField: 'value',
          slots: {},
          [$deletePropsList]: [],
          ref: { current: null },
          onTabClick: () => {},
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(result).toHaveProperty('data');
          expect(result).toHaveProperty('loading');
          expect(result).toHaveProperty('ref');
          expect(result).toHaveProperty('slots');
          expect(result).toHaveProperty('onTabClick');
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
            titleField: 'label',
            valueField: 'value',
            slots: {},
            [$deletePropsList]: [],
            ref: { current: null },
            onTabClick: () => {},
          };

          expect(() => {
            const { currentValue } = renderHook(plugin, props);
            const result = currentValue.value;
            expect(result).toBeDefined();
          }).not.toThrow();
        });
      });

      it('应该正确处理 onTabClick 回调', () => {
        const mockOnTabClick = vi.fn();
        const props = {
          dataSource: null,
          titleField: 'label',
          valueField: 'value',
          slots: {},
          [$deletePropsList]: [],
          ref: { current: null },
          onTabClick: mockOnTabClick,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toHaveProperty('onTabClick');
        expect(typeof result.onTabClick).toBe('function');
      });

      it('应该正确处理 undefined 的 onTabClick', () => {
        const props = {
          dataSource: null,
          titleField: 'label',
          valueField: 'value',
          slots: {},
          [$deletePropsList]: [],
          ref: { current: null },
          onTabClick: undefined,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toHaveProperty('onTabClick');
        expect(typeof result.onTabClick).toBe('function');
      });
    });

    describe('handleAddIcon 插件功能测试', () => {
      const plugin = TabsAccumulate.getPluginMethodByName('handleAddIcon') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          addIcon: 'plus',
          slots: {},
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('slots');
        expect(result.slots).toHaveProperty('add-icon');
        expect(typeof result.slots['add-icon']).toBe('function');
      });

      it('应该正确处理有图标的情况', () => {
        const props = {
          addIcon: 'plus',
          slots: {
            existing: vi.fn(),
          },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots).toHaveProperty('existing');
        expect(result.slots).toHaveProperty('add-icon');
        expect(typeof result.slots['add-icon']).toBe('function');
      });

      it('应该正确处理无图标的情况', () => {
        const props = {
          addIcon: null,
          slots: {
            existing: vi.fn(),
          },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots).toHaveProperty('existing');
        expect(result.slots).toHaveProperty('add-icon');
        expect(typeof result.slots['add-icon']).toBe('function');
      });

      it('应该正确处理 undefined 图标的情况', () => {
        const props = {
          addIcon: undefined,
          slots: {
            existing: vi.fn(),
          },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots).toHaveProperty('existing');
        expect(result.slots).toHaveProperty('add-icon');
        expect(typeof result.slots['add-icon']).toBe('function');
      });

      it('应该正确处理空字符串图标的情况', () => {
        const props = {
          addIcon: '',
          slots: {
            existing: vi.fn(),
          },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots).toHaveProperty('existing');
        expect(result.slots).toHaveProperty('add-icon');
        expect(typeof result.slots['add-icon']).toBe('function');
      });

      it('应该正确处理 undefined 的 slots', () => {
        const props = {
          addIcon: 'plus',
          slots: undefined,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('slots');
        expect(result.slots).toHaveProperty('add-icon');
      });

      it('应该正确处理 null 的 slots', () => {
        const props = {
          addIcon: 'plus',
          slots: null,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('slots');
        expect(result.slots).toHaveProperty('add-icon');
      });

      it('应该正确处理复杂的图标名称', () => {
        const props = {
          addIcon: 'el-icon-plus',
          slots: {},
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('slots');
        expect(result.slots).toHaveProperty('add-icon');
        expect(typeof result.slots['add-icon']).toBe('function');
      });
    });

    describe('插件集成和扩展性测试', () => {
      it('应该能够与其他插件组合使用', () => {
        const combinedAccumulate = TabsAccumulate.addPlugin({
          name: 'testPlugin',
          handle: () => ({
            testProperty: 'test-value',
            customData: 'custom',
          }),
        });

        const plugins = combinedAccumulate.getPluginMethod();
        // expect(plugins).toHaveLength(3);

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

        const testAccumulate = TabsAccumulate.addPlugin(plugin1).addPlugin(plugin2);

        const plugins = testAccumulate.getPluginMethod();
        expect(plugins.length).toBeGreaterThanOrEqual(4);

        const foundPlugin1 = testAccumulate.getPluginMethodByName('plugin1');
        const foundPlugin2 = testAccumulate.getPluginMethodByName('plugin2');

        expect(foundPlugin1).toBeDefined();
        expect(foundPlugin2).toBeDefined();
      });

      it('应该正确处理插件方法的获取', () => {
        const allMethods = TabsAccumulate.getPluginMethod();
        expect(Array.isArray(allMethods)).toBe(true);
        expect(allMethods.length).toBeGreaterThan(0);

        allMethods.forEach((method) => {
          expect(
            typeof method === 'function' || (typeof method === 'object' && typeof method.handle === 'function'),
          ).toBe(true);
        });
      });

      it('应该正确处理不存在的插件查询', () => {
        const nonExistentPlugin = TabsAccumulate.getPluginMethodByName('nonExistent');
        expect(nonExistentPlugin).toBeUndefined();
      });
    });

    describe('handleRouteLinkage 插件功能测试', () => {
      const plugin = TabsAccumulate.getPluginMethodByName('handleRouteLinkage') as any;

      it('未开启路由联动时应返回空对象', () => {
        const props = {
          routeLinkage: false,
          slots: {},
          class: '',
          [$deletePropsList]: [],
        };
        const { currentValue } = renderHook(plugin, props);
        expect(currentValue.value).toEqual({});
      });

      it('开启路由联动后应根据当前路由生成 Tab', () => {
        const afterEach = vi.fn(() => () => {});
        const push = vi.fn();
        const mockRoute = {
          path: '/user/profile',
          fullPath: '/user/profile',
          name: 'Profile',
          matched: [
            {
              path: '/user',
              name: 'User',
              meta: { crumb: '用户中心' },
              components: { default: { name: 'UserLayout' } },
            },
            {
              path: '/user/profile',
              name: 'Profile',
              meta: { crumb: '个人资料' },
              components: { default: { name: 'ProfilePage' } },
            },
          ],
        };

        const props = {
          routeLinkage: true,
          maxTabCount: 10,
          closable: true,
          showInDesigner: false,
          slots: {},
          class: '',
          [$deletePropsList]: [],
          [$router]: { afterEach, push },
          [$route]: mockRoute,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toContain('el-tabs--route-linkage');
        expect(result.closable).toBe(true);
        expect(result.addable).toBe(false);
        expect(result.editable).toBe(false);
        expect(typeof result.slots.default).toBe('function');

        const panes = result.slots.default();
        expect(panes).toHaveLength(1);
        expect(panes[0].props.name).toBe('/user/profile');
        expect(panes[0].props.label).toBe('个人资料');
        expect(afterEach).toHaveBeenCalled();
      });

      it('点击 Tab 时应触发路由跳转', () => {
        const push = vi.fn();
        const mockRoute = {
          path: '/a',
          fullPath: '/a',
          matched: [{ path: '/a', name: 'A', meta: { crumb: '页面A' }, components: { default: { name: 'A' } } }],
        };
        const props = {
          routeLinkage: true,
          showInDesigner: false,
          slots: {},
          class: '',
          [$deletePropsList]: [],
          [$router]: { afterEach: vi.fn(() => () => {}), push },
          [$route]: mockRoute,
          onTabChange: vi.fn(),
        };

        const { currentValue } = renderHook(plugin, props);
        expect(typeof currentValue.value.onTabChange).toBe('function');
        currentValue.value.onTabChange('/b');
        expect(push).toHaveBeenCalledWith('/b');
      });
    });
  });
});
