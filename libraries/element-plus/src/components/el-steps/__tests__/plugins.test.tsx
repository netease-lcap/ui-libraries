import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@ep-test/test-utils/render-hook';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import '@/utils/index';
import StepsAccumulate from '../plugins/basic-plugins';
import ElStepAccumulate from '../plugins/item-plugins';

describe('el-steps plugins', () => {
  beforeEach(() => {
    // 重置所有 mock
    vi.clearAllMocks();
  });

  describe('basic-plugins.tsx', () => {
    describe('StepsAccumulate 基础功能', () => {
      it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
        expect(StepsAccumulate).toBeDefined();
        expect(typeof StepsAccumulate.addPlugin).toBe('function');
        expect(typeof StepsAccumulate.getPluginMethod).toBe('function');
        expect(Array.isArray(StepsAccumulate.Plugin)).toBe(true);
      });

      it('应该包含所有必要的插件', () => {
        const plugins = StepsAccumulate.getPluginMethod();
        expect(plugins).toHaveLength(2);

        const pluginNames = [
          'handleDataSource',
          'handleSwitchStep',
        ];

        pluginNames.forEach((name) => {
          const plugin = StepsAccumulate.getPluginMethodByName(name);
          expect(plugin).toBeDefined();
          if (plugin) {
            expect(plugin.name).toBe(name);
            expect(typeof (plugin as any).handle).toBe('function');
          }
        });
      });
    });

    describe('handleDataSource 插件功能测试', () => {
      const plugin = StepsAccumulate.getPluginMethodByName('handleDataSource') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          dataSource: null,
          nameField: 'value',
          slots: {},
          [$deletePropsList]: [],
          ref: { current: null },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('ref');
        expect(result).toHaveProperty('loading');
        expect(result).toHaveProperty('data');
        expect(result).toHaveProperty('slots');
        expect(result).toHaveProperty('stepNameList');
      });

      it('应该正确设置 deletePropsList', () => {
        const props = {
          dataSource: null,
          nameField: 'value',
          slots: {},
          [$deletePropsList]: ['existing-prop'],
          ref: { current: null },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        const symbolKey = Object.getOwnPropertySymbols(result).find((s) => s.toString().includes('deletePropsList')) as symbol;
        expect(symbolKey).toBeDefined();
        expect(result[symbolKey]).toEqual(expect.arrayContaining([...$dataSourceDeleteField]));
      });

      it('应该正确处理数组类型的数据源', () => {
        const dataSource = [
          { value: 'step1', title: 'Step 1' },
          { value: 'step2', title: 'Step 2' },
        ];

        const props = {
          dataSource,
          nameField: 'value',
          slots: {},
          [$deletePropsList]: [],
          ref: { current: null },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('ref');
        expect(result).toHaveProperty('loading');
        expect(result).toHaveProperty('data');
        expect(result).toHaveProperty('slots');
        expect(result).toHaveProperty('stepNameList');
        expect(typeof result.ref).toBe('object');
      });

      it('应该正确处理自定义字段名', () => {
        const dataSource = [
          { id: '1', name: 'Step 1' },
          { id: '2', name: 'Step 2' },
        ];

        const props = {
          dataSource,
          nameField: 'id',
          slots: {},
          [$deletePropsList]: [],
          ref: { current: null },
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
          nameField: 'value',
          slots: { existing: vi.fn() },
          [$deletePropsList]: [],
          ref: { current: null },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots).toBeDefined();
        expect(result.slots).toHaveProperty('existing');
        expect(typeof result.slots.default).not.toBe('function');
      });

      it('应该正确处理有数据源时的 slots', () => {
        const dataSource = [{ value: 'step1', title: 'Step 1' }];

        const props = {
          dataSource,
          nameField: 'value',
          slots: {
            existing: vi.fn(),
            title: vi.fn(),
            description: vi.fn(),
          },
          [$deletePropsList]: [],
          ref: { current: null },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots).toBeDefined();
        expect(result.slots).toHaveProperty('existing');
        expect(typeof result.slots).toBe('object');
      });

      it('应该正确设置 ref 对象', () => {
        const originalRef = { current: null, originalMethod: vi.fn() };
        const dataSource = [{ value: 'step1', title: 'Step 1' }];

        const props = {
          dataSource,
          nameField: 'value',
          slots: {},
          [$deletePropsList]: [],
          ref: originalRef,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.ref).toBeDefined();
        expect(typeof result.ref).toBe('object');
        expect(result.ref).toBeDefined();
      });

      it('应该正确处理函数类型的数据源', async () => {
        const dataSourceFn = vi.fn().mockResolvedValue([
          { value: 'async-step1', title: 'Async Step 1' },
          { value: 'async-step2', title: 'Async Step 2' },
        ]);

        const props = {
          dataSource: dataSourceFn,
          nameField: 'value',
          slots: {},
          [$deletePropsList]: [],
          ref: { current: null },
        };

        const { currentValue, waitForNextUpdate } = renderHook(plugin, props);

        expect(currentValue.value).toBeDefined();
        expect(currentValue.value).toHaveProperty('data');
        expect(currentValue.value).toHaveProperty('loading');
        expect(currentValue.value).toHaveProperty('ref');
        expect(currentValue.value).toHaveProperty('slots');
        expect(currentValue.value).toHaveProperty('stepNameList');

        expect(dataSourceFn).toHaveBeenCalled();

        await waitForNextUpdate();

        expect(currentValue.value).toBeDefined();
        expect(currentValue.value).toHaveProperty('data');
        expect(Array.isArray(currentValue.value.data)).toBe(true);
        expect(currentValue.value.data.length).toBeGreaterThan(0);

        const firstItem = currentValue.value.data[0];
        expect(firstItem).toHaveProperty('value');
        expect(firstItem).toHaveProperty('title');

        expect(currentValue.value.ref).toHaveProperty('reload');
        expect(typeof currentValue.value.ref.reload).toBe('function');
      });

      it('应该正确处理复杂的数据结构', () => {
        const complexDataSource = [
          {
            id: 1,
            name: 'Step 1',
            value: 'step1',
            disabled: false,
            extra: { category: 'main' },
          },
          {
            id: 2,
            name: 'Step 2',
            value: 'step2',
            disabled: true,
            extra: { category: 'sub' },
          },
        ];

        const props = {
          dataSource: complexDataSource,
          nameField: 'value',
          slots: {},
          [$deletePropsList]: [],
          ref: { current: null },
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(result).toHaveProperty('data');
          expect(result).toHaveProperty('loading');
          expect(result).toHaveProperty('ref');
          expect(result).toHaveProperty('slots');
          expect(result).toHaveProperty('stepNameList');
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
            nameField: 'value',
            slots: {},
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

    describe('handleSwitchStep 插件功能测试', () => {
      const plugin = StepsAccumulate.getPluginMethodByName('handleSwitchStep') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          ref: { current: null },
          stepNameList: ['step1', 'step2', 'step3'],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('active');
        expect(result).toHaveProperty('ref');
        expect(typeof result.active).toBe('number');
        expect(typeof result.ref).toBe('object');
      });

      it('应该正确处理默认 active 值', () => {
        const props = {
          ref: { current: null },
          stepNameList: ['step1', 'step2', 'step3'],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.active).toBe(0);
      });

      it('应该正确处理自定义 active 值', () => {
        const props = {
          ref: { current: null },
          stepNameList: ['step1', 'step2', 'step3'],
          active: 2,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.active).toBe(2);
      });

      it('应该正确处理 name 属性', () => {
        const props = {
          ref: { current: null },
          stepNameList: ['step1', 'step2', 'step3'],
          name: 'step2',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('active');
        expect(result).toHaveProperty('ref');
      });

      it('应该正确处理空的 stepNameList', () => {
        const props = {
          ref: { current: null },
          stepNameList: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('active');
        expect(result).toHaveProperty('ref');
      });

      it('应该正确处理 undefined 的 stepNameList', () => {
        const props = {
          ref: { current: null },
          stepNameList: undefined,
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
        }).not.toThrow();
      });

      it('应该正确处理 null 的 stepNameList', () => {
        const props = {
          ref: { current: null },
          stepNameList: null,
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
        }).not.toThrow();
      });

      it('应该正确处理 ref 对象', () => {
        const originalRef = { current: null, originalMethod: vi.fn() };
        const props = {
          ref: originalRef,
          stepNameList: ['step1', 'step2', 'step3'],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.ref).toBeDefined();
        expect(typeof result.ref).toBe('object');
        expect(result.ref).toHaveProperty('prev');
        expect(result.ref).toHaveProperty('next');
        expect(typeof result.ref.prev).toBe('function');
        expect(typeof result.ref.next).toBe('function');
      });

      it('应该正确处理 null 的 ref', () => {
        const props = {
          ref: null,
          stepNameList: ['step1', 'step2', 'step3'],
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
          stepNameList: ['step1', 'step2', 'step3'],
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
        const combinedAccumulate = StepsAccumulate.addPlugin({
          name: 'testPlugin',
          handle: () => ({
            testProperty: 'test-value',
            customData: 'custom',
          }),
        });

        const plugins = combinedAccumulate.getPluginMethod();
        expect(plugins).toHaveLength(3);

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

        const testAccumulate = StepsAccumulate.addPlugin(plugin1).addPlugin(plugin2);

        const plugins = testAccumulate.getPluginMethod();
        expect(plugins.length).toBeGreaterThanOrEqual(4);

        const foundPlugin1 = testAccumulate.getPluginMethodByName('plugin1');
        const foundPlugin2 = testAccumulate.getPluginMethodByName('plugin2');

        expect(foundPlugin1).toBeDefined();
        expect(foundPlugin2).toBeDefined();
      });

      it('应该正确处理插件方法的获取', () => {
        const allMethods = StepsAccumulate.getPluginMethod();
        expect(Array.isArray(allMethods)).toBe(true);
        expect(allMethods.length).toBeGreaterThan(0);

        allMethods.forEach((method) => {
          expect(
            typeof method === 'function' || (typeof method === 'object' && typeof method.handle === 'function'),
          ).toBe(true);
        });
      });

      it('应该正确处理不存在的插件查询', () => {
        const nonExistentPlugin = StepsAccumulate.getPluginMethodByName('nonExistent');
        expect(nonExistentPlugin).toBeUndefined();
      });
    });
  });

  describe('item-plugins.tsx', () => {
    describe('ElStepAccumulate 基础功能', () => {
      it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
        expect(ElStepAccumulate).toBeDefined();
        expect(typeof ElStepAccumulate.addPlugin).toBe('function');
        expect(typeof ElStepAccumulate.getPluginMethod).toBe('function');
        expect(Array.isArray(ElStepAccumulate.Plugin)).toBe(true);
      });

      it('应该包含 handleIcon 插件', () => {
        const plugins = ElStepAccumulate.getPluginMethod();
        expect(plugins).toHaveLength(1);

        const handleIconPlugin = ElStepAccumulate.getPluginMethodByName('handleIcon');
        expect(handleIconPlugin).toBeDefined();
        if (handleIconPlugin) {
          expect(handleIconPlugin.name).toBe('handleIcon');
          expect(typeof (handleIconPlugin as any).handle).toBe('function');
        }
      });
    });

    describe('handleIcon 插件功能测试', () => {
      const plugin = ElStepAccumulate.getPluginMethodByName('handleIcon') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          icon: 'check',
          slots: {},
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('slots');
        expect(result.slots).toHaveProperty('icon');
        expect(typeof result.slots.icon).toBe('function');
      });

      it('应该正确处理有图标的情况', () => {
        const props = {
          icon: 'check',
          slots: {
            existing: vi.fn(),
          },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots).toHaveProperty('existing');
        expect(result.slots).toHaveProperty('icon');
        expect(typeof result.slots.icon).toBe('function');
      });

      it('应该正确处理无图标的情况', () => {
        const props = {
          icon: null,
          slots: {
            existing: vi.fn(),
          },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toEqual({});
      });

      it('应该正确处理 undefined 图标的情况', () => {
        const props = {
          icon: undefined,
          slots: {
            existing: vi.fn(),
          },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toEqual({});
      });

      it('应该正确处理空字符串图标的情况', () => {
        const props = {
          icon: '',
          slots: {
            existing: vi.fn(),
          },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toEqual({});
      });

      it('应该正确处理 undefined 的 slots', () => {
        const props = {
          icon: 'check',
          slots: undefined,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('slots');
        expect(result.slots).toHaveProperty('icon');
      });

      it('应该正确处理 null 的 slots', () => {
        const props = {
          icon: 'check',
          slots: null,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('slots');
        expect(result.slots).toHaveProperty('icon');
      });

      it('应该正确处理复杂的图标名称', () => {
        const props = {
          icon: 'el-icon-check',
          slots: {},
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('slots');
        expect(result.slots).toHaveProperty('icon');
        expect(typeof result.slots.icon).toBe('function');
      });
    });

    describe('插件集成和扩展性测试', () => {
      it('应该能够与其他插件组合使用', () => {
        const combinedAccumulate = ElStepAccumulate.addPlugin({
          name: 'testPlugin',
          handle: () => ({
            testProperty: 'test-value',
            customData: 'custom',
          }),
        });

        const plugins = combinedAccumulate.getPluginMethod();
        expect(plugins).toHaveLength(2);

        const handleIconPlugin = combinedAccumulate.getPluginMethodByName('handleIcon');
        const testPlugin = combinedAccumulate.getPluginMethodByName('testPlugin');

        expect(handleIconPlugin).toBeDefined();
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

        const testAccumulate = ElStepAccumulate.addPlugin(plugin1).addPlugin(plugin2);

        const plugins = testAccumulate.getPluginMethod();
        expect(plugins.length).toBeGreaterThanOrEqual(3);

        const foundPlugin1 = testAccumulate.getPluginMethodByName('plugin1');
        const foundPlugin2 = testAccumulate.getPluginMethodByName('plugin2');

        expect(foundPlugin1).toBeDefined();
        expect(foundPlugin2).toBeDefined();
      });

      it('应该正确处理插件方法的获取', () => {
        const allMethods = ElStepAccumulate.getPluginMethod();
        expect(Array.isArray(allMethods)).toBe(true);
        expect(allMethods.length).toBeGreaterThan(0);

        allMethods.forEach((method) => {
          expect(
            typeof method === 'function' || (typeof method === 'object' && typeof method.handle === 'function'),
          ).toBe(true);
        });
      });

      it('应该正确处理不存在的插件查询', () => {
        const nonExistentPlugin = ElStepAccumulate.getPluginMethodByName('nonExistent');
        expect(nonExistentPlugin).toBeUndefined();
      });
    });
  });
});
