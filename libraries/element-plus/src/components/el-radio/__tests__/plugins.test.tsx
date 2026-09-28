import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@ep-test/test-utils/render-hook';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import '@/utils/index';
import RadioAccumulate from '../plugins/index';
import RadioIdeAccumulate from '../plugins/ide';

describe('el-radio plugins', () => {
  beforeEach(() => {
    // 重置所有 mock
    vi.clearAllMocks();
  });

  describe('index.tsx', () => {
    describe('RadioAccumulate 基础功能', () => {
      it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
        expect(RadioAccumulate).toBeDefined();
        expect(typeof RadioAccumulate.addPlugin).toBe('function');
        expect(typeof RadioAccumulate.getPluginMethod).toBe('function');
        expect(Array.isArray(RadioAccumulate.Plugin)).toBe(true);
      });

      it('应该包含所有必要的插件', () => {
        const plugins = RadioAccumulate.getPluginMethod();
        expect(plugins.length).toBeGreaterThan(0);

        const pluginNames = [
          'handleNodePath',
          'handleTagName',
          'handleComponentInForm',
          'handleControllableValue',
          'handleDataSource',
          'handleItemType',
          'handlePreview',
          'handleDirection',
        ];

        pluginNames.forEach((name) => {
          const plugin = RadioAccumulate.getPluginMethodByName(name);
          expect(plugin).toBeDefined();
          if (plugin) {
            expect(plugin.name).toBe(name);
            expect(typeof (plugin as any).handle).toBe('function');
          }
        });
      });
    });

    describe('handleTagName 插件功能测试', () => {
      const plugin = RadioAccumulate.getPluginMethodByName('handleTagName') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {};

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('formTagName');
        expect(result).toHaveProperty('tagName');
        expect(result.formTagName).toBe('el-form-radio-group');
        expect(result.tagName).toBe('el-radio-group');
      });
    });

    describe('handleDataSource 插件功能测试', () => {
      const plugin = RadioAccumulate.getPluginMethodByName('handleDataSource') as any;

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
        expect(result).toHaveProperty('data');
        expect(result).toHaveProperty('slots');
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
        expect(Array.isArray(result[symbolKey])).toBe(true);
        expect(result[symbolKey]).toEqual(expect.arrayContaining([...$dataSourceDeleteField]));
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
          { name: 'Option 1', id: '1' },
          { name: 'Option 2', id: '2' },
        ];

        const props = {
          dataSource,
          textField: 'name',
          valueField: 'id',
          slots: {},
          [$deletePropsList]: [],
          ref: { current: null },
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(result).toHaveProperty('data');
        }).not.toThrow();
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
        const mockItemSlot = vi.fn();

        const props = {
          dataSource,
          textField: 'label',
          valueField: 'value',
          slots: {
            item: mockItemSlot,
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
          { label: 'Async Option 1', value: '1' },
          { label: 'Async Option 2', value: '2' },
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
        const testCases = [
          { dataSource: [] },
          { dataSource: undefined },
          { dataSource: null },
        ];

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

    describe('handleItemType 插件功能测试', () => {
      const plugin = RadioAccumulate.getPluginMethodByName('handleItemType') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          type: 'default',
          slots: {
            default: vi.fn(() => ['item1', 'item2']),
          },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('slots');
        expect(result.slots).toHaveProperty('default');
        expect(typeof result.slots.default).toBe('function');
      });

      it('应该正确处理 button 类型', () => {
        const props = {
          type: 'button',
          slots: {
            default: vi.fn(() => [
              { props: { value: '1' }, children: 'Option 1' },
              { props: { value: '2' }, children: 'Option 2' },
            ]),
          },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots.default).toBeDefined();
        expect(typeof result.slots.default).toBe('function');
      });

      it('应该正确处理 border 类型', () => {
        const props = {
          type: 'border',
          slots: {
            default: vi.fn(() => [
              { props: { value: '1' }, children: 'Option 1' },
              { props: { value: '2' }, children: 'Option 2' },
            ]),
          },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots.default).toBeDefined();
        expect(typeof result.slots.default).toBe('function');
      });

      it('应该正确处理默认类型', () => {
        const props = {
          type: 'default',
          slots: {
            default: vi.fn(() => ['item1', 'item2']),
          },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots.default).toBeDefined();
        expect(typeof result.slots.default).toBe('function');
      });

      it('应该正确处理 undefined 的 type', () => {
        const props = {
          type: undefined,
          slots: {
            default: vi.fn(() => ['item1', 'item2']),
          },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots.default).toBeDefined();
        expect(typeof result.slots.default).toBe('function');
      });

      it('应该正确处理 null 的 type', () => {
        const props = {
          type: null,
          slots: {
            default: vi.fn(() => ['item1', 'item2']),
          },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots.default).toBeDefined();
        expect(typeof result.slots.default).toBe('function');
      });
    });

    describe('handleDirection 插件功能测试', () => {
      const plugin = RadioAccumulate.getPluginMethodByName('handleDirection') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          direction: 'horizontal',
          class: 'custom-class',
          column: 2,
          style: { color: 'red' },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('class');
        expect(result).toHaveProperty('style');
      });

      it('应该正确处理垂直方向', () => {
        const props = {
          direction: 'vertical',
          class: 'custom-class',
          column: undefined,
          style: {},
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toContain('el-radio-group-vertical');
        expect(result.style).toHaveProperty('grid-template-columns');
        expect(result.style).toHaveProperty('grid-auto-flow');
      });

      it('应该正确处理水平方向', () => {
        const props = {
          direction: 'horizontal',
          class: 'custom-class',
          column: undefined,
          style: {},
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).not.toContain('el-radio-group-vertical');
        expect(result.style).toHaveProperty('grid-template-columns');
        expect(result.style).toHaveProperty('grid-auto-flow');
      });

      it('应该正确处理列数设置', () => {
        const props = {
          direction: 'horizontal',
          class: 'custom-class',
          column: 3,
          style: {},
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.style['grid-template-columns']).toBe('repeat(3, 1fr)');
        expect(result.style['grid-auto-flow']).toBe('row');
      });

      it('应该正确处理无列数设置', () => {
        const props = {
          direction: 'horizontal',
          class: 'custom-class',
          column: undefined,
          style: {},
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.style['grid-template-columns']).toBe('auto-fill');
        expect(result.style['grid-auto-flow']).toBe('auto');
      });

      it('应该正确处理自定义样式', () => {
        const customStyle = { color: 'red', fontSize: '14px' };
        const props = {
          direction: 'horizontal',
          class: 'custom-class',
          column: 2,
          style: customStyle,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.style).toHaveProperty('color', 'red');
        expect(result.style).toHaveProperty('fontSize', '14px');
        expect(result.style).toHaveProperty('grid-template-columns');
        expect(result.style).toHaveProperty('grid-auto-flow');
      });

      it('应该正确处理 undefined 的样式', () => {
        const props = {
          direction: 'horizontal',
          class: 'custom-class',
          column: 2,
          style: undefined,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.style).toHaveProperty('grid-template-columns');
        expect(result.style).toHaveProperty('grid-auto-flow');
      });

      it('应该正确处理 null 的样式', () => {
        const props = {
          direction: 'horizontal',
          class: 'custom-class',
          column: 2,
          style: null,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.style).toHaveProperty('grid-template-columns');
        expect(result.style).toHaveProperty('grid-auto-flow');
      });
    });

    describe('插件集成和扩展性测试', () => {
      it('应该能够与其他插件组合使用', () => {
        const combinedAccumulate = RadioAccumulate.addPlugin({
          name: 'testPlugin',
          handle: () => ({
            testProperty: 'test-value',
            customData: 'custom',
          }),
        });

        const plugins = combinedAccumulate.getPluginMethod();
        expect(plugins.length).toBeGreaterThan(0);

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

        const testAccumulate = RadioAccumulate.addPlugin(plugin1).addPlugin(plugin2);

        const plugins = testAccumulate.getPluginMethod();
        expect(plugins.length).toBeGreaterThan(0);

        const foundPlugin1 = testAccumulate.getPluginMethodByName('plugin1');
        const foundPlugin2 = testAccumulate.getPluginMethodByName('plugin2');

        expect(foundPlugin1).toBeDefined();
        expect(foundPlugin2).toBeDefined();
      });

      it('应该正确处理插件方法的获取', () => {
        const allMethods = RadioAccumulate.getPluginMethod();
        expect(Array.isArray(allMethods)).toBe(true);
        expect(allMethods.length).toBeGreaterThan(0);

        allMethods.forEach((method) => {
          expect(
            typeof method === 'function' || (typeof method === 'object' && typeof method.handle === 'function'),
          ).toBe(true);
        });
      });

      it('应该正确处理不存在的插件查询', () => {
        const nonExistentPlugin = RadioAccumulate.getPluginMethodByName('nonExistent');
        expect(nonExistentPlugin).toBeUndefined();
      });
    });
  });

  describe('ide.ts', () => {
    describe('RadioIdeAccumulate 基础功能', () => {
      it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
        expect(RadioIdeAccumulate).toBeDefined();
        expect(typeof RadioIdeAccumulate.addPlugin).toBe('function');
        expect(typeof RadioIdeAccumulate.getPluginMethod).toBe('function');
        expect(Array.isArray(RadioIdeAccumulate.Plugin)).toBe(true);
      });

      it('应该包含 handleNodePath 插件', () => {
        const plugins = RadioIdeAccumulate.getPluginMethod();
        expect(plugins).toHaveLength(0);

        const handleNodePathPlugin = RadioIdeAccumulate.getPluginMethodByName('handleNodePath');
        expect(handleNodePathPlugin).toBeDefined();
        if (handleNodePathPlugin) {
          expect(handleNodePathPlugin.name).toBe('handleNodePath');
          expect(typeof (handleNodePathPlugin as any).handle).toBe('function');
        }
      });
    });

    describe('handleNodePath 插件功能测试', () => {
      const plugin = RadioIdeAccumulate.getPluginMethodByName('handleNodePath') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          'data-nodepath': '/test/path',
          class: 'custom-class',
          [$deletePropsList]: ['existing-prop'],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('class');
        expect(result.class).toContain('custom-class');
        expect(result.class).toContain('RadioGroup_');
      });

      it('应该正确设置 deletePropsList', () => {
        const props = {
          'data-nodepath': '/test/path',
          class: 'custom-class',
          [$deletePropsList]: ['existing-prop'],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        const symbolKey = Object.getOwnPropertySymbols(result).find((s) => s.toString().includes('deletePropsList')) as symbol;
        expect(symbolKey).toBeDefined();
        expect(Array.isArray(result[symbolKey])).toBe(true);
        expect(result[symbolKey]).toContain('data-nodepath');
      });

      it('应该正确处理空的 class', () => {
        const props = {
          'data-nodepath': '/test/path',
          class: '',
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toContain('RadioGroup_');
      });

      it('应该正确处理 undefined 的 class', () => {
        const props = {
          'data-nodepath': '/test/path',
          class: undefined,
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toContain('RadioGroup_');
      });

      it('应该正确处理 null 的 class', () => {
        const props = {
          'data-nodepath': '/test/path',
          class: null,
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toContain('RadioGroup_');
      });

      it('应该正确处理空的 data-nodepath', () => {
        const props = {
          'data-nodepath': '',
          class: 'custom-class',
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toContain('custom-class');
        expect(result.class).toContain('RadioGroup_');
      });

      it('应该正确处理 undefined 的 data-nodepath', () => {
        const props = {
          'data-nodepath': undefined,
          class: 'custom-class',
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toContain('custom-class');
        expect(result.class).toContain('RadioGroup_');
      });

      it('应该正确处理 null 的 data-nodepath', () => {
        const props = {
          'data-nodepath': null,
          class: 'custom-class',
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toContain('custom-class');
        expect(result.class).toContain('RadioGroup_');
      });

      it('应该生成唯一的 nodeId', () => {
        const props1 = {
          'data-nodepath': '/test/path1',
          class: 'custom-class',
          [$deletePropsList]: [],
        };

        const props2 = {
          'data-nodepath': '/test/path2',
          class: 'custom-class',
          [$deletePropsList]: [],
        };

        const { currentValue: result1 } = renderHook(plugin, props1);
        const { currentValue: result2 } = renderHook(plugin, props2);

        expect(result1.value.class).not.toBe(result2.value.class);
        expect(result1.value.class).toContain('RadioGroup_');
        expect(result2.value.class).toContain('RadioGroup_');
      });
    });

    describe('插件集成和扩展性测试', () => {
      it('应该能够与其他插件组合使用', () => {
        const combinedAccumulate = RadioIdeAccumulate.addPlugin({
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

        const testAccumulate = RadioIdeAccumulate.addPlugin(plugin1).addPlugin(plugin2);

        const plugins = testAccumulate.getPluginMethod();
        expect(plugins.length).toBeGreaterThanOrEqual(3);

        const foundPlugin1 = testAccumulate.getPluginMethodByName('plugin1');
        const foundPlugin2 = testAccumulate.getPluginMethodByName('plugin2');

        expect(foundPlugin1).toBeDefined();
        expect(foundPlugin2).toBeDefined();
      });

      it('应该正确处理插件方法的获取', () => {
        const allMethods = RadioIdeAccumulate.getPluginMethod();
        expect(Array.isArray(allMethods)).toBe(true);
        expect(allMethods.length).toBeGreaterThan(0);

        allMethods.forEach((method) => {
          expect(
            typeof method === 'function' || (typeof method === 'object' && typeof method.handle === 'function'),
          ).toBe(true);
        });
      });

      it('应该正确处理不存在的插件查询', () => {
        const nonExistentPlugin = RadioIdeAccumulate.getPluginMethodByName('nonExistent');
        expect(nonExistentPlugin).toBeUndefined();
      });
    });
  });
});
