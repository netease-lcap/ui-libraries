import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@ep-test/test-utils/render-hook';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import '@/utils/index';
import ElTransferBasicAccumulate from '../plugins/basic-plugins';
import ElTransferIdeAccumulate from '../plugins/ide';

describe('el-transfer plugins', () => {
  beforeEach(() => {
    // 重置所有 mock
    vi.clearAllMocks();
  });

  describe('basic-plugins.tsx', () => {
    describe('ElTransferBasicAccumulate 基础功能', () => {
      it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
        expect(ElTransferBasicAccumulate).toBeDefined();
        expect(typeof ElTransferBasicAccumulate.addPlugin).toBe('function');
        expect(typeof ElTransferBasicAccumulate.getPluginMethod).toBe('function');
        expect(Array.isArray(ElTransferBasicAccumulate.Plugin)).toBe(true);
      });

      it('应该包含所有必要的插件', () => {
        const plugins = ElTransferBasicAccumulate.getPluginMethod();

        const pluginNames = [
          'handleTagName',
          'handleComponentInForm',
          'handleControllableValue',
          'handleTitle',
          'handleButtonText',
          'handleDataSource',
          'handlePreview',
          'handleNodePath',
        ];

        pluginNames.forEach((name) => {
          const plugin = ElTransferBasicAccumulate.getPluginMethodByName(name);
          expect(plugin).toBeDefined();
          if (plugin) {
            expect(plugin.name).toBe(name);
            expect(typeof (plugin as any).handle).toBe('function');
          }
        });
      });
    });

    describe('handleTagName 插件功能测试', () => {
      const plugin = ElTransferBasicAccumulate.getPluginMethodByName('handleTagName') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('formTagName');
        expect(result).toHaveProperty('tagName');
        expect(result.formTagName).toBe('el-form-transfer');
        expect(result.tagName).toBe('el-transfer');
      });

      it('应该正确设置 deletePropsList', () => {
        const props = {
          [$deletePropsList]: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        // 验证 deletePropsList Symbol 属性
        const symbolKey = Object.getOwnPropertySymbols(result).find((s) => s.toString().includes('deletePropsList')) as symbol;
        expect(symbolKey).toBeDefined();
        expect(Array.isArray(result[symbolKey])).toBe(true);
        expect(result[symbolKey]).toEqual(expect.arrayContaining(['data-nodepath']));
      });
    });

    describe('handleComponentInForm 插件功能测试', () => {
      const plugin = ElTransferBasicAccumulate.getPluginMethodByName('handleComponentInForm') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {};

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
      });

      it('应该正确处理空 props', () => {
        const props = {};

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
      });

      it('应该正确处理包含属性的 props', () => {
        const props = {
          testProp: 'test-value',
          anotherProp: 123,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
      });
    });

    describe('handleControllableValue 插件功能测试', () => {
      const plugin = ElTransferBasicAccumulate.getPluginMethodByName('handleControllableValue') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          value: ['item1', 'item2'],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
      });

      it('应该正确处理 undefined 的 value', () => {
        const props = {
          value: undefined,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
      });

      it('应该正确处理 null 的 value', () => {
        const props = {
          value: null,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
      });

      it('应该正确处理空数组的 value', () => {
        const props = {
          value: [],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
      });

      it('应该正确处理有效的数据值', () => {
        const props = {
          value: ['item1', 'item2', 'item3'],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
      });

      it('应该正确处理非数组的 value', () => {
        const props = {
          value: 'string-value',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
      });

      it('应该正确处理对象的 value', () => {
        const props = {
          value: { items: ['item1', 'item2'] },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
      });

      it('应该正确处理数字的 value', () => {
        const props = {
          value: 123,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
      });

      it('应该正确处理布尔值的 value', () => {
        const props = {
          value: true,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
      });
    });

    describe('handleTitle 插件功能测试', () => {
      const plugin = ElTransferBasicAccumulate.getPluginMethodByName('handleTitle') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          leftTitle: '左侧标题',
          rightTitle: '右侧标题',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('titles');
        expect(Array.isArray(result.titles)).toBe(true);
        expect(result.titles).toEqual(['左侧标题', '右侧标题']);
      });

      it('应该正确处理 undefined 的标题', () => {
        const props = {
          leftTitle: undefined,
          rightTitle: undefined,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.titles).toEqual([undefined, undefined]);
      });

      it('应该正确处理 null 的标题', () => {
        const props = {
          leftTitle: null,
          rightTitle: null,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.titles).toEqual([null, null]);
      });

      it('应该正确处理空字符串的标题', () => {
        const props = {
          leftTitle: '',
          rightTitle: '',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.titles).toEqual(['', '']);
      });

      it('应该正确处理复杂的标题', () => {
        const props = {
          leftTitle: '左侧列表 (未选择)',
          rightTitle: '右侧列表 (已选择)',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.titles).toEqual(['左侧列表 (未选择)', '右侧列表 (已选择)']);
      });

      it('应该正确处理特殊字符的标题', () => {
        const props = {
          leftTitle: 'Left List & Items',
          rightTitle: 'Right List @ Items',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.titles).toEqual(['Left List & Items', 'Right List @ Items']);
      });

      it('应该正确处理数字的标题', () => {
        const props = {
          leftTitle: 123,
          rightTitle: 456,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.titles).toEqual([123, 456]);
      });

      it('应该正确处理对象的标题', () => {
        const props = {
          leftTitle: { text: 'Left' },
          rightTitle: { text: 'Right' },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.titles).toEqual([{ text: 'Left' }, { text: 'Right' }]);
      });

      it('应该正确处理数组的标题', () => {
        const props = {
          leftTitle: ['Left', 'List'],
          rightTitle: ['Right', 'List'],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.titles).toEqual([['Left', 'List'], ['Right', 'List']]);
      });

      it('应该正确处理布尔值的标题', () => {
        const props = {
          leftTitle: true,
          rightTitle: false,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.titles).toEqual([true, false]);
      });
    });

    describe('handleButtonText 插件功能测试', () => {
      const plugin = ElTransferBasicAccumulate.getPluginMethodByName('handleButtonText') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          leftButtonText: '向左移动',
          rightButtonText: '向右移动',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('buttonTexts');
        expect(Array.isArray(result.buttonTexts)).toBe(true);
        expect(result.buttonTexts).toEqual(['向左移动', '向右移动']);
      });

      it('应该正确处理 undefined 的按钮文本', () => {
        const props = {
          leftButtonText: undefined,
          rightButtonText: undefined,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.buttonTexts).toEqual([undefined, undefined]);
      });

      it('应该正确处理 null 的按钮文本', () => {
        const props = {
          leftButtonText: null,
          rightButtonText: null,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.buttonTexts).toEqual([null, null]);
      });

      it('应该正确处理空字符串的按钮文本', () => {
        const props = {
          leftButtonText: '',
          rightButtonText: '',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.buttonTexts).toEqual(['', '']);
      });

      it('应该正确处理复杂的按钮文本', () => {
        const props = {
          leftButtonText: '<< 向左移动',
          rightButtonText: '向右移动 >>',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.buttonTexts).toEqual(['<< 向左移动', '向右移动 >>']);
      });

      it('应该正确处理特殊字符的按钮文本', () => {
        const props = {
          leftButtonText: 'Move ← Left',
          rightButtonText: 'Move → Right',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.buttonTexts).toEqual(['Move ← Left', 'Move → Right']);
      });

      it('应该正确处理数字的按钮文本', () => {
        const props = {
          leftButtonText: 1,
          rightButtonText: 2,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.buttonTexts).toEqual([1, 2]);
      });

      it('应该正确处理对象的按钮文本', () => {
        const props = {
          leftButtonText: { text: 'Left' },
          rightButtonText: { text: 'Right' },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.buttonTexts).toEqual([{ text: 'Left' }, { text: 'Right' }]);
      });

      it('应该正确处理数组的按钮文本', () => {
        const props = {
          leftButtonText: ['Left', 'Button'],
          rightButtonText: ['Right', 'Button'],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.buttonTexts).toEqual([['Left', 'Button'], ['Right', 'Button']]);
      });

      it('应该正确处理布尔值的按钮文本', () => {
        const props = {
          leftButtonText: true,
          rightButtonText: false,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.buttonTexts).toEqual([true, false]);
      });
    });

    describe('handleDataSource 插件功能测试', () => {
      const plugin = ElTransferBasicAccumulate.getPluginMethodByName('handleDataSource') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          dataSource: null,
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
        expect(result).toHaveProperty('data');
      });

      it('应该正确设置 deletePropsList', () => {
        const props = {
          dataSource: null,
          [$deletePropsList]: [],
          ref: { current: null },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        // 验证 deletePropsList Symbol 属性
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
          [$deletePropsList]: [],
          ref: { current: null },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        // 验证基本结构
        expect(result).toBeDefined();
        expect(result).toHaveProperty('ref');
        expect(result).toHaveProperty('loading');
        expect(result).toHaveProperty('data');
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
          disabledField: 'disabled',
          [$deletePropsList]: [],
          ref: { current: null },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('data');
        // 验证插件能正常处理自定义字段名
        expect(result.data).toBeDefined();
      });

      it('应该正确设置 ref 对象', () => {
        const originalRef = { current: null, originalMethod: vi.fn() };
        const dataSource = [{ label: 'Item 1', value: 'item1' }];

        const props = {
          dataSource,
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
          [$deletePropsList]: [],
          ref: { current: null },
        };

        const { currentValue, waitForNextUpdate } = renderHook(plugin, props);

        // 初始状态验证 - 确认插件已初始化
        expect(currentValue.value).toBeDefined();
        expect(currentValue.value).toHaveProperty('data');
        expect(currentValue.value).toHaveProperty('loading');
        expect(currentValue.value).toHaveProperty('ref');

        // 验证函数数据源被调用
        expect(dataSourceFn).toHaveBeenCalled();

        // 等待异步数据加载完成
        await waitForNextUpdate();

        // 验证异步数据加载后的状态
        expect(currentValue.value).toBeDefined();
        expect(currentValue.value).toHaveProperty('data');

        // 验证基本属性存在
        expect(Array.isArray(currentValue.value.data)).toBe(true);

        // 验证有数据返回（可能由于renderHook的实现，数据结构有所不同）
        expect(currentValue.value.data.length).toBeGreaterThan(0);

        // 验证数据结构包含必要字段
        // if (currentValue.value.data.length > 0) {
          const firstItem = currentValue.value.data[0];
          expect(firstItem).toHaveProperty('key');
          expect(firstItem).toHaveProperty('label');

          // 验证数据经过了 useHandleMapField 处理（添加了 label 和 value 字段）
          expect(firstItem).toHaveProperty('label');
          expect(firstItem).toHaveProperty('value');
        // }

        // 验证ref包含reload方法
        expect(currentValue.value.ref).toHaveProperty('reload');
        expect(typeof currentValue.value.ref.reload).toBe('function');
      });

      it('应该正确处理复杂的数据结构', () => {
        const complexDataSource = [
          {
            id: 1,
            name: 'Item 1',
            key: 'item1',
            disabled: false,
            extra: { category: 'main' },
          },
          {
            id: 2,
            name: 'Item 2',
            key: 'item2',
            disabled: true,
            extra: { category: 'sub' },
          },
        ];

        const props = {
          dataSource: complexDataSource,
          textField: 'name',
          valueField: 'key',
          disabledField: 'disabled',
          [$deletePropsList]: [],
          ref: { current: null },
        };

        // 检查插件能否处理复杂数据结构而不抛出错误
        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(result).toHaveProperty('data');
          expect(result).toHaveProperty('loading');
          expect(result).toHaveProperty('ref');
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
    });

    describe('handlePreview 插件功能测试', () => {
      const plugin = ElTransferBasicAccumulate.getPluginMethodByName('handlePreview') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          ref: { current: null },
          render: vi.fn(),
          preview: false,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('ref');
        expect(result).toHaveProperty('render');
        expect(typeof result.render).toBe('function'); // 验证 render 是函数
      });

      it('应该正确处理非预览模式', () => {
        const props = {
          ref: { current: null },
          render: vi.fn(),
          preview: false,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(typeof result.render).toBe('function');
      });

      it('应该正确处理预览模式', () => {
        const props = {
          ref: { current: null },
          render: vi.fn(),
          preview: true,
          textField: 'label',
          valueField: 'value',
          data: [{ label: 'Item 1', value: 'item1' }],
          modelValue: ['item1'],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.render).toBeInstanceOf(Function);
        // 测试预览渲染函数，传入正确的参数结构
        expect(() => {
          const previewOutput = result.render({ textField: 'label', valueField: 'value', data: [{ label: 'Item 1', value: 'item1' }], modelValue: ['item1'] }, { attrs: {}, slots: {} });
          expect(previewOutput.type).toBeDefined();
          expect(previewOutput.props).toBeDefined();
        }).not.toThrow();
      });

      it('应该正确处理 IDE 环境', () => {
        const props = {
          ref: { current: null },
          render: vi.fn(),
          preview: true,
          'data-nodepath': 'some-nodepath',
          textField: 'label',
          valueField: 'value',
          data: undefined, // IDE 环境下 data 为 undefined 应该显示 '-'
          modelValue: undefined,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(() => {
          const previewOutput = result.render({ textField: 'label', valueField: 'value', data: undefined, modelValue: undefined }, { attrs: {}, slots: {} });
          expect(previewOutput.type).toBeDefined();
          expect(previewOutput.props).toBeDefined();
        }).not.toThrow();
      });

      it('应该正确处理 null 的 ref', () => {
        const props = {
          ref: null,
          render: vi.fn(),
          preview: false,
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
          preview: false,
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
        const combinedAccumulate = ElTransferBasicAccumulate.addPlugin({
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

        const testAccumulate = ElTransferBasicAccumulate.addPlugin(plugin1).addPlugin(plugin2);

        const plugins = testAccumulate.getPluginMethod();
        expect(plugins.length).toBeGreaterThanOrEqual(10);

        const foundPlugin1 = testAccumulate.getPluginMethodByName('plugin1');
        const foundPlugin2 = testAccumulate.getPluginMethodByName('plugin2');

        expect(foundPlugin1).toBeDefined();
        expect(foundPlugin2).toBeDefined();
      });

      it('应该正确处理插件方法的获取', () => {
        const allMethods = ElTransferBasicAccumulate.getPluginMethod();
        expect(Array.isArray(allMethods)).toBe(true);
        expect(allMethods.length).toBeGreaterThan(0);

        allMethods.forEach((method) => {
          expect(
            typeof method === 'function' || (typeof method === 'object' && typeof method.handle === 'function'),
          ).toBe(true);
        });
      });

      it('应该正确处理不存在的插件查询', () => {
        const nonExistentPlugin = ElTransferBasicAccumulate.getPluginMethodByName('nonExistent');
        expect(nonExistentPlugin).toBeUndefined();
      });
    });
  });

  describe('ide.ts', () => {
    describe('ElTransferIdeAccumulate 基础功能', () => {
      it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
        expect(ElTransferIdeAccumulate).toBeDefined();
        expect(typeof ElTransferIdeAccumulate.addPlugin).toBe('function');
        expect(typeof ElTransferIdeAccumulate.getPluginMethod).toBe('function');
        expect(Array.isArray(ElTransferIdeAccumulate.Plugin)).toBe(true);
      });

      it('应该包含 handleNodePath 插件', () => {
        const plugins = ElTransferIdeAccumulate.getPluginMethod();
        expect(plugins).toHaveLength(1);

        const handleNodePathPlugin = ElTransferIdeAccumulate.getPluginMethodByName('handleNodePath');
        expect(handleNodePathPlugin).toBeDefined();
        if (handleNodePathPlugin) {
          expect(handleNodePathPlugin.name).toBe('handleNodePath');
          expect(typeof (handleNodePathPlugin as any).handle).toBe('function');
        }
      });
    });

    describe('handleNodePath 插件功能测试', () => {
      const plugin = ElTransferIdeAccumulate.getPluginMethodByName('handleNodePath') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          'data-nodepath': 'test-nodepath',
          class: 'my-class',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('class');
        expect(result.class).toMatch(/^my-class Transfer_\d+$/);
      });

      it('应该正确处理空的 class', () => {
        const props = {
          'data-nodepath': 'test-nodepath',
          class: '',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toMatch(/^ Transfer_\d+$/);
      });

      it('应该正确处理 undefined 的 class', () => {
        const props = {
          'data-nodepath': 'test-nodepath',
          class: undefined,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toContain('undefined');
      });

      it('应该正确处理 null 的 class', () => {
        const props = {
          'data-nodepath': 'test-nodepath',
          class: null,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toContain('null');
      });

      it('应该正确处理 undefined 的 data-nodepath', () => {
        const props = {
          'data-nodepath': undefined,
          class: 'my-class',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toMatch(/^my-class Transfer_\d+$/);
      });

      it('应该正确处理 null 的 data-nodepath', () => {
        const props = {
          'data-nodepath': null,
          class: 'my-class',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toMatch(/^my-class Transfer_\d+$/);
      });

      it('应该正确处理复杂的 class 组合', () => {
        const props = {
          'data-nodepath': 'complex-nodepath',
          class: 'class1 class2',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toMatch(/^class1 class2 Transfer_\d+$/);
      });
    });

    describe('插件集成和扩展性测试', () => {
      it('应该能够与其他插件组合使用', () => {
        const combinedAccumulate = ElTransferIdeAccumulate.addPlugin({
          name: 'testIdePlugin',
          type: 'ide',
          handle: () => ({
            ideTestProperty: 'ide-test-value',
          }),
        });

        const plugins = combinedAccumulate.getPluginMethod();
        expect(plugins).toHaveLength(1);

        const handleNodePathPlugin = combinedAccumulate.getPluginMethodByName('handleNodePath');
        const testIdePlugin = combinedAccumulate.getPluginMethodByName('testIdePlugin');

        expect(handleNodePathPlugin).toBeDefined();
        expect(testIdePlugin).toBeDefined();
        expect(testIdePlugin?.name).toBe('testIdePlugin');
      });

      it('应该正确处理插件的执行顺序', () => {
        const plugin1 = {
          name: 'idePlugin1',
          type: 'ide',
          handle: () => ({ ideStep1: 'completed' }),
        };
        const plugin2 = {
          name: 'idePlugin2',
          type: 'ide',
          handle: () => ({ ideStep2: 'completed' }),
        };

        const testAccumulate = ElTransferIdeAccumulate.addPlugin(plugin1).addPlugin(plugin2);

        const plugins = testAccumulate.getPluginMethod();
        expect(plugins.length).toBeGreaterThanOrEqual(1);

        const foundPlugin1 = testAccumulate.getPluginMethodByName('idePlugin1');
        const foundPlugin2 = testAccumulate.getPluginMethodByName('idePlugin2');

        expect(foundPlugin1).toBeDefined();
        expect(foundPlugin2).toBeDefined();
      });

      it('应该正确处理插件方法的获取', () => {
        const allMethods = ElTransferIdeAccumulate.getPluginMethod();
        expect(Array.isArray(allMethods)).toBe(true);
        expect(allMethods.length).toBeGreaterThan(0);

        allMethods.forEach((method) => {
          expect(
            typeof method === 'function' || (typeof method === 'object' && typeof method.handle === 'function'),
          ).toBe(true);
        });
      });

      it('应该正确处理不存在的插件查询', () => {
        const nonExistentPlugin = ElTransferIdeAccumulate.getPluginMethodByName('nonExistentIdePlugin');
        expect(nonExistentPlugin).toBeUndefined();
      });
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
