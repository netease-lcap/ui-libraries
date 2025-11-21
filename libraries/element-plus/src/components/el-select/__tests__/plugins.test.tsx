import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@ep-test/test-utils/render-hook';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import '@/utils/index';
import SelectBasicAccumulate from '../plugins/index';

describe('el-select plugins', () => {
  beforeEach(() => {
    // 重置所有 mock
    vi.clearAllMocks();
  });

  describe('index.tsx', () => {
    describe('SelectBasicAccumulate 基础功能', () => {
      it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
        expect(SelectBasicAccumulate).toBeDefined();
        expect(typeof SelectBasicAccumulate.addPlugin).toBe('function');
        expect(typeof SelectBasicAccumulate.getPluginMethod).toBe('function');
        expect(Array.isArray(SelectBasicAccumulate.Plugin)).toBe(true);
      });

      it('应该包含所有必要的插件', () => {
        const plugins = SelectBasicAccumulate.getPluginMethod();

        const pluginNames = [
          'handleTagName',
          'handleComponentInForm',
          'handleControllableValue',
          'handleDataSource',
          'handleVirtualize',
          'handlePreview',
        ];

        pluginNames.forEach((name) => {
          const plugin = SelectBasicAccumulate.getPluginMethodByName(name);
          expect(plugin).toBeDefined();
          if (plugin) {
            expect(plugin.name).toBe(name);
            expect(typeof (plugin as any).handle).toBe('function');
          }
        });
      });
    });

    describe('handleTagName 插件功能测试', () => {
      const plugin = SelectBasicAccumulate.getPluginMethodByName('handleTagName') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {};

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('formTagName');
        expect(result).toHaveProperty('tagName');
        expect(result.formTagName).toBe('el-form-select');
        expect(result.tagName).toBe('el-select');
      });
    });

    describe('handleComponentInForm 插件功能测试', () => {
      const plugin = SelectBasicAccumulate.getPluginMethodByName('handleComponentInForm') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {};

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
      });
    });

    describe('handleControllableValue 插件功能测试', () => {
      const plugin = SelectBasicAccumulate.getPluginMethodByName('handleControllableValue') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {};

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
      });
    });

    describe('handleDataSource 插件功能测试', () => {
      const plugin = SelectBasicAccumulate.getPluginMethodByName('handleDataSource') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          dataSource: null,
          textField: 'label',
          valueField: 'value',
          slots: {},
          [$deletePropsList]: [],
          ref: { current: null },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('ref');
        expect(result).toHaveProperty('loading');
        expect(result).toHaveProperty('slots');
        expect(result).toHaveProperty('data');
      });

      it('应该正确设置 deletePropsList', () => {
        const props = {
          dataSource: null,
          textField: 'label',
          valueField: 'value',
          slots: {},
          [$deletePropsList]: ['existing-prop'],
          ref: { current: null },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        const symbolKey = Object.getOwnPropertySymbols(result).find((s) => s.toString().includes('deletePropsList')) as symbol;
        expect(symbolKey).toBeDefined();
        expect(result[symbolKey]).toEqual(expect.arrayContaining([...$dataSourceDeleteField, 'formTagName', 'data']));
      });

      it('应该正确处理数组类型的数据源', () => {
        const dataSource = [
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
        ];

        const props = {
          dataSource,
          textField: 'label',
          valueField: 'value',
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
        expect(typeof result.ref).toBe('object');
      });

      it('应该正确处理自定义字段名', () => {
        const dataSource = [
          { name: 'Item 1', id: '1' },
          { name: 'Item 2', id: '2' },
        ];

        const props = {
          dataSource,
          textField: 'name',
          valueField: 'id',
          slots: {},
          [$deletePropsList]: [],
          ref: { current: null },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('data');
        expect(result.data).toBeDefined();
      });

      it('应该正确处理空数据源时的 slots', () => {
        const props = {
          dataSource: null,
          textField: 'label',
          valueField: 'value',
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
        const dataSource = [{ label: 'Option 1', value: '1' }];

        const props = {
          dataSource,
          textField: 'label',
          valueField: 'value',
          slots: {
            existing: vi.fn(),
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
        const dataSource = [{ label: 'Option 1', value: '1' }];

        const props = {
          dataSource,
          textField: 'label',
          valueField: 'value',
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
          { label: 'Async Option 1', value: 'async1' },
          { label: 'Async Option 2', value: 'async2' },
        ]);

        const props = {
          dataSource: dataSourceFn,
          textField: 'label',
          valueField: 'value',
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
            name: 'Option 1',
            value: 'opt1',
            disabled: false,
            extra: { category: 'main' },
          },
          {
            id: 2,
            name: 'Option 2',
            value: 'opt2',
            disabled: true,
            extra: { category: 'sub' },
          },
        ];

        const props = {
          dataSource: complexDataSource,
          textField: 'name',
          valueField: 'value',
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
        }).not.toThrow();
      });

      it('应该正确处理边界情况', () => {
        const testCases = [{ dataSource: [] }, { dataSource: undefined }, { dataSource: null }];

        testCases.forEach((testCase) => {
          const props = {
            ...testCase,
            textField: 'label',
            valueField: 'value',
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

    describe('handleVirtualize 插件功能测试', () => {
      const plugin = SelectBasicAccumulate.getPluginMethodByName('handleVirtualize') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          slots: {},
          virtualize: false,
          data: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
      });

      it('应该正确处理 virtualize 为 true 的情况', () => {
        const props = {
          slots: {
            default: vi.fn(),
            existing: vi.fn(),
          },
          virtualize: true,
          data: [
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
          ],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toHaveProperty('options');
        expect(result).toHaveProperty('render');
        expect(result).toHaveProperty('slots');
        expect(result.options).toEqual(props.data);
        expect(typeof result.render).toBe('function');
        expect(result.slots).toHaveProperty('existing');
        expect(result.slots).not.toHaveProperty('default');
      });

      it('应该正确处理 virtualize 为 false 的情况', () => {
        const props = {
          slots: {
            default: vi.fn(),
            existing: vi.fn(),
          },
          virtualize: false,
          data: [
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
          ],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toEqual({});
      });

      it('应该正确处理 undefined 的 virtualize', () => {
        const props = {
          slots: {},
          virtualize: undefined,
          data: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toEqual({});
      });

      it('应该正确处理 null 的 data', () => {
        const props = {
          slots: {},
          virtualize: true,
          data: null,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toHaveProperty('options');
        expect(result.options).toEqual([]);
      });

      it('应该正确处理 undefined 的 data', () => {
        const props = {
          slots: {},
          virtualize: true,
          data: undefined,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toHaveProperty('options');
        expect(result.options).toEqual([]);
      });
    });

    describe('handlePreview 插件功能测试', () => {
      const plugin = SelectBasicAccumulate.getPluginMethodByName('handlePreview') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          ref: { current: null },
          render: null,
          data: [],
          modelValue: 'value1',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('ref');
        expect(result).toHaveProperty('render');
        expect(result).toHaveProperty('previewText');
      });

      it('应该正确处理单个值的预览', () => {
        const props = {
          ref: { current: null },
          render: null,
          data: [
            { label: 'Option 1', value: 'value1' },
            { label: 'Option 2', value: 'value2' },
          ],
          modelValue: 'value1',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.previewText).toBe('Option 1');
      });

      it('应该正确处理数组值的预览', () => {
        const props = {
          ref: { current: null },
          render: null,
          data: [
            { label: 'Option 1', value: 'value1' },
            { label: 'Option 2', value: 'value2' },
            { label: 'Option 3', value: 'value3' },
          ],
          modelValue: ['value1', 'value3'],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.previewText).toBe('Option 1,Option 3');
      });

      it('应该正确处理找不到匹配值的情况', () => {
        const props = {
          ref: { current: null },
          render: null,
          data: [
            { label: 'Option 1', value: 'value1' },
            { label: 'Option 2', value: 'value2' },
          ],
          modelValue: 'nonexistent',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.previewText).toBe('');
      });

      it('应该正确处理空数据的情况', () => {
        const props = {
          ref: { current: null },
          render: null,
          data: [],
          modelValue: 'value1',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.previewText).toBe('');
      });

      it('应该正确处理 null 的 modelValue', () => {
        const props = {
          ref: { current: null },
          render: null,
          data: [{ label: 'Option 1', value: 'value1' }],
          modelValue: null,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.previewText).toBe('');
      });

      it('应该正确处理 undefined 的 modelValue', () => {
        const props = {
          ref: { current: null },
          render: null,
          data: [{ label: 'Option 1', value: 'value1' }],
          modelValue: undefined,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.previewText).toBe('');
      });

      it('应该正确处理 IDE 环境', () => {
        const props = {
          ref: { current: null },
          render: null,
          data: [{ label: 'Option 1', value: 'value1' }],
          modelValue: 'value1',
          'data-nodepath': '/some/path',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toHaveProperty('ref');
        expect(result).toHaveProperty('render');
        expect(result).toHaveProperty('previewText');
      });
    });

    describe('插件集成和扩展性测试', () => {
      it('应该能够与其他插件组合使用', () => {
        const combinedAccumulate = SelectBasicAccumulate.addPlugin({
          name: 'testPlugin',
          handle: () => ({
            testProperty: 'test-value',
            customData: 'custom',
          }),
        });

        const plugins = combinedAccumulate.getPluginMethod();

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

        const testAccumulate = SelectBasicAccumulate.addPlugin(plugin1).addPlugin(plugin2);

        const plugins = testAccumulate.getPluginMethod();
        expect(plugins.length).toBeGreaterThanOrEqual(8);

        const foundPlugin1 = testAccumulate.getPluginMethodByName('plugin1');
        const foundPlugin2 = testAccumulate.getPluginMethodByName('plugin2');

        expect(foundPlugin1).toBeDefined();
        expect(foundPlugin2).toBeDefined();
      });

      it('应该正确处理插件方法的获取', () => {
        const allMethods = SelectBasicAccumulate.getPluginMethod();
        expect(Array.isArray(allMethods)).toBe(true);
        expect(allMethods.length).toBeGreaterThan(0);

        allMethods.forEach((method) => {
          expect(
            typeof method === 'function' || (typeof method === 'object' && typeof method.handle === 'function'),
          ).toBe(true);
        });
      });

      it('应该正确处理不存在的插件查询', () => {
        const nonExistentPlugin = SelectBasicAccumulate.getPluginMethodByName('nonExistent');
        expect(nonExistentPlugin).toBeUndefined();
      });
    });
  });
});
