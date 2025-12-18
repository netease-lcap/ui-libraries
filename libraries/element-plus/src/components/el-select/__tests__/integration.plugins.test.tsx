import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHooks } from '@ep-test/test-utils/render-hook';
import { $deletePropsList } from '@/plugins/constants';
import { $formProvide } from '@/components/el-form/constants';
import '@/utils/index';
import SelectBasicAccumulate from '../plugins/index';

describe('el-select 插件集成测试', () => {
  beforeEach(() => {
    // 重置所有 mock
    vi.clearAllMocks();
  });

  describe('第一部分：插件链式执行测试', () => {
    it('应该按顺序执行所有插件并合并状态', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        dataSource: [
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
        ],
        textField: 'label',
        valueField: 'value',
        modelValue: '1',
        virtualize: false,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      const result = currentValue.value;

      // 验证各个插件的输出都被合并
      expect(result).toBeDefined();
      expect(result.formTagName).toBe('el-form-select');
      expect(result.tagName).toBe('el-select');
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
    });

    it('应该正确处理空 props 的情况', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result).toBeDefined();
      expect(result.formTagName).toBe('el-form-select');
      expect(result.tagName).toBe('el-select');
    });

    it('应该正确传递和合并 ref 对象', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const originalRef = { customMethod: vi.fn() };
      const props = {
        dataSource: [{ label: 'Test', value: 'test' }],
        ref: originalRef,
        slots: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      const result = currentValue.value;

      expect(result.ref).toBeDefined();
      expect(typeof result.ref).toBe('object');
    });

    it('应该正确合并 slots', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const customSlot = vi.fn();
      const props = {
        dataSource: [{ label: 'Test', value: 'test' }],
        slots: { custom: customSlot },
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      const result = currentValue.value;

      expect(result.slots).toBeDefined();
      expect(result.slots.custom).toBe(customSlot);
    });

    it('应该在 Designer 环境正确执行', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: true });
      const props = {
        'data-nodepath': '/root/select',
        dataSource: [{ label: 'Test', value: 'test' }],
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      const result = currentValue.value;

      expect(result).toBeDefined();
      expect(result.formTagName).toBe('el-form-select');
      expect(result.tagName).toBe('el-select');
    });

    it('应该正确处理 $deletePropsList 的累加', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        dataSource: [{ label: 'Test', value: 'test' }],
        slots: {},
        ref: {},
        [$deletePropsList]: ['existingProp'],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      const result = currentValue.value;

      expect(result[$deletePropsList]).toBeDefined();
      expect(Array.isArray(result[$deletePropsList])).toBe(true);
    });
  });

  describe('第二部分：数据源处理完整测试', () => {
    it('应该正确处理静态数组数据源', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        { label: 'Option 3', value: '3' },
      ];
      const props = {
        dataSource,
        textField: 'label',
        valueField: 'value',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);
      await waitForNextUpdate();
      const result = currentValue.value;

      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toBe(3);
      expect(result.loading).toBeDefined();
    });

    it('应该正确处理异步函数数据源', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const asyncDataSource = vi.fn().mockResolvedValue([
        { label: 'Async 1', value: 'a1' },
        { label: 'Async 2', value: 'a2' },
      ]);
      const props = {
        dataSource: asyncDataSource,
        textField: 'label',
        valueField: 'value',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.loading).toBeDefined();
      expect(asyncDataSource).toHaveBeenCalled();

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
      expect(Array.isArray(currentValue.value.data)).toBe(true);
      expect(currentValue.value.data.length).toBeGreaterThan(0);
    });

    it('应该正确处理自定义字段映射', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { name: 'Item 1', id: 'i1', desc: 'Description 1' },
        { name: 'Item 2', id: 'i2', desc: 'Description 2' },
      ];
      const props = {
        dataSource,
        textField: 'name',
        valueField: 'id',
        descriptionField: 'desc',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      const result = currentValue.value;

      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
    });

    it('应该正确生成 descriptionField 的 slots', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Item 1', value: 'i1', description: 'Desc 1' },
        { label: 'Item 2', value: 'i2', description: 'Desc 2' },
      ];
      const props = {
        dataSource,
        textField: 'label',
        valueField: 'value',
        descriptionField: 'description',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      const result = currentValue.value;

      expect(result.slots).toBeDefined();
      expect(result.slots.default).toBeDefined();
      expect(typeof result.slots.default).toBe('function');
    });

    it('应该正确处理空数据源', async () => {
      const testCases = [{ dataSource: null }, { dataSource: undefined }, { dataSource: [] }];

      testCases.forEach(async (testCase) => {
        const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
        const props = {
          ...testCase,
          textField: 'label',
          valueField: 'value',
          slots: {},
          ref: {},
          [$deletePropsList]: [],
        };

        const { currentValue } = await renderHooks(plugins, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result.data).toBeDefined();
      });
    });

    it('应该正确设置 ref.reload 方法', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [{ label: 'Test', value: 'test' }];
      const props = {
        dataSource,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      const result = currentValue.value;

      expect(result.ref).toBeDefined();
      expect(result.ref.reload).toBeDefined();
      expect(typeof result.ref.reload).toBe('function');
    });

    it('应该正确设置 ref.data 属性', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
      ];
      const props = {
        dataSource,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      const result = currentValue.value;

      expect(result.ref).toBeDefined();
      expect(result.ref.data).toBeDefined();
    });

    it('应该正确处理 loading 状态', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const asyncDataSource = vi.fn().mockResolvedValue([{ label: 'Test', value: 'test' }]);
      const props = {
        dataSource: asyncDataSource,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      expect(currentValue.value.loading).toBeDefined();

      await waitForNextUpdate();

      expect(currentValue.value.loading).toBeDefined();
    });

    it('应该在 dataSource 为 null 时不生成 default slot', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        dataSource: null,
        slots: { custom: vi.fn() },
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();
      const result = currentValue.value;

      expect(result.slots).toBeDefined();
      expect(result.slots.custom).toBeDefined();
      expect(result.slots.default).toBeUndefined();
    });

    it('应该正确处理 $deletePropsList 包含数据源相关字段', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        dataSource: [{ label: 'Test', value: 'test' }],
        textField: 'label',
        valueField: 'value',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      const result = currentValue.value;

      expect(result[$deletePropsList]).toBeDefined();
      expect(result[$deletePropsList]).toEqual(
        expect.arrayContaining(['dataSource', 'textField', 'valueField', 'formTagName', 'data']),
      );
    });
  });

  describe('第三部分：受控值完整测试', () => {
    it('应该正确处理受控模式', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 'value1',
        'onUpdate:modelValue': vi.fn(),
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result).toBeDefined();
      expect(result.modelValue).toBeDefined();
    });

    it('应该正确处理非受控模式', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        defaultValue: 'defaultValue1',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result).toBeDefined();
    });

    it('应该正确设置 onUpdate:modelValue 回调', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onUpdateModelValue = vi.fn();
      const props = {
        modelValue: 'value1',
        'onUpdate:modelValue': onUpdateModelValue,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result['onUpdate:modelValue']).toBeDefined();
      expect(typeof result['onUpdate:modelValue']).toBe('function');
    });

    it('应该正确设置 ref.resetField 方法', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 'value1',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.ref).toBeDefined();
      expect(result.ref.resetField).toBeDefined();
      expect(typeof result.ref.resetField).toBe('function');
    });

    it('应该正确处理 modelValue 为 null 的情况', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: null,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result).toBeDefined();
    });

    it('应该正确处理 modelValue 为 undefined 的情况', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: undefined,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result).toBeDefined();
    });

    it('应该正确处理数组类型的 modelValue（多选）', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: ['value1', 'value2', 'value3'],
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result).toBeDefined();
      expect(result.modelValue).toBeDefined();
    });

    it('应该正确处理空字符串的 modelValue', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: '',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result).toBeDefined();
    });
  });

  describe('第四部分：虚拟化功能测试', () => {
    it('应该在 virtualize=true 时生成 options', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const data = [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        { label: 'Option 3', value: '3' },
      ];
      const props = {
        dataSource: data,
        virtualize: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      const result = currentValue.value;

      expect(result.options).toBeDefined();
      expect(Array.isArray(result.options)).toBe(true);
    });

    it('应该在 virtualize=true 时切换 render 组件', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        dataSource: [{ label: 'Test', value: 'test' }],
        virtualize: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();
      const result = currentValue.value;

      expect(result.render).toBeDefined();
      expect(typeof result.render).toBe('function');
    });

    it('应该在 virtualize=true 时移除 slots.default', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const defaultSlot = vi.fn();
      const customSlot = vi.fn();
      const props = {
        dataSource: [{ label: 'Test', value: 'test' }],
        virtualize: true,
        slots: {
          default: defaultSlot,
          custom: customSlot,
        },
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();
      const result = currentValue.value;

      expect(result.slots).toBeDefined();
      expect(result.slots.default).toBeUndefined();
      expect(result.slots.custom).toBe(customSlot);
    });

    it('应该在 virtualize=false 时不做虚拟化处理', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        dataSource: [{ label: 'Test', value: 'test' }],
        virtualize: false,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();
      const result = currentValue.value;

      expect(result.options).toBeUndefined();
    });

    it('应该正确处理 data 为 null 时的虚拟化', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        dataSource: null,
        virtualize: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();
      const result = currentValue.value;

      expect(result.options).toBeDefined();
      expect(Array.isArray(result.options)).toBe(true);
    });

    it('应该正确处理大数据量的虚拟化', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const largeDataSource = Array.from({ length: 1000 }, (_, i) => ({
        label: `Option ${i}`,
        value: `${i}`,
      }));
      const props = {
        dataSource: largeDataSource,
        virtualize: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();
      const result = currentValue.value;

      expect(result.options).toBeDefined();
      expect(result.options.length).toBe(1000);
      expect(result.render).toBeDefined();
    });
  });

  describe('第五部分：预览模式测试', () => {
    // it('应该正确生成单值预览文本', async () => {
    //   const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
    //   const data = [
    //     { label: 'Option 1', value: '1' },
    //     { label: 'Option 2', value: '2' },
    //   ];
    //   const props = {
    //     dataSource: data,
    //     modelValue: '1',
    //     preview: true,
    //     slots: {},
    //     ref: {},
    //     [$deletePropsList]: [],
    //   };

    //   const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

    //   await waitForNextUpdate();
    //   const result = currentValue.value;

    //   expect(result.previewText).toBeDefined();
    //   expect(result.previewText).toBe('Option 1');
    // });

    // it('应该正确生成多值预览文本', async () => {
    //   const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
    //   const data = [
    //     { label: 'Option 1', value: '1' },
    //     { label: 'Option 2', value: '2' },
    //     { label: 'Option 3', value: '3' },
    //   ];
    //   const props = {
    //     dataSource: data,
    //     modelValue: ['1', '3'],
    //     preview: true,
    //     slots: {},
    //     ref: {},
    //     [$deletePropsList]: [],
    //   };

    //   const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

    //   await waitForNextUpdate();
    //   const result = currentValue.value;

    //   expect(result.previewText).toBeDefined();
    //   expect(result.previewText).toBe('Option 1,Option 3');
    // });

    // it('应该在值不存在时返回空字符串', async () => {
    //   const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
    //   const data = [
    //     { label: 'Option 1', value: '1' },
    //     { label: 'Option 2', value: '2' },
    //   ];
    //   const props = {
    //     dataSource: data,
    //     modelValue: 'nonexistent',
    //     preview: true,
    //     slots: {},
    //     ref: {},
    //     [$deletePropsList]: [],
    //   };

    //   const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

    //   await waitForNextUpdate();
    //   const result = currentValue.value;

    //   expect(result.previewText).toBeDefined();
    //   expect(result.previewText).toBe('');
    // });

    // it('应该在空 data 时返回空字符串', async () => {
    //   const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
    //   const props = {
    //     dataSource: [],
    //     modelValue: 'value1',
    //     preview: true,
    //     slots: {},
    //     ref: {},
    //     [$deletePropsList]: [],
    //   };

    //   const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

    //   await waitForNextUpdate();
    //   const result = currentValue.value;

    //   expect(result.previewText).toBeDefined();
    //   expect(result.previewText).toBe('');
    // });

    // it('应该在 preview=false 时不切换 render', async () => {
    //   const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
    //   const props = {
    //     dataSource: [{ label: 'Test', value: 'test' }],
    //     modelValue: 'test',
    //     preview: false,
    //     slots: {},
    //     ref: {},
    //     [$deletePropsList]: [],
    //   };

    //   const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

    //   await waitForNextUpdate();
    //   const result = currentValue.value;

    //   expect(result.previewText).toBeDefined();
    // });

    // it('应该从 inject[$formProvide] 继承 preview 状态', async () => {
    //   const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
    //   const props = {
    //     dataSource: [{ label: 'Test', value: 'test' }],
    //     modelValue: 'test',
    //     inject: {
    //       [$formProvide]: {
    //         preview: true,
    //       },
    //     },
    //     slots: {},
    //     ref: {},
    //     [$deletePropsList]: [],
    //   };

    //   const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

    //   await waitForNextUpdate();
    //   const result = currentValue.value;

    //   expect(result.previewText).toBeDefined();
    // });

    // it('应该在 IDE 环境（data-nodepath）正确处理预览', async () => {
    //   const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: true });
    //   const props = {
    //     'data-nodepath': '/root/select',
    //     dataSource: [{ label: 'Test', value: 'test' }],
    //     modelValue: 'test',
    //     preview: true,
    //     slots: {},
    //     ref: {},
    //     [$deletePropsList]: [],
    //   };

    //   const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

    //   await waitForNextUpdate();
    //   const result = currentValue.value;

    //   expect(result.previewText).toBeDefined();
    // });

    it('应该正确合并 ref 对象（排除 reload 和 data）', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const originalRef = {
        customMethod: vi.fn(),
        reload: vi.fn(),
        data: [],
      };
      const props = {
        dataSource: [{ label: 'Test', value: 'test' }],
        modelValue: 'test',
        preview: true,
        ref: originalRef,
        slots: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();
      const result = currentValue.value;

      expect(result.ref).toBeDefined();
      expect(result.ref.customMethod).toBeDefined();
    });

    // it('应该正确处理 modelValue 为 null 的预览', async () => {
    //   const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
    //   const props = {
    //     dataSource: [{ label: 'Test', value: 'test' }],
    //     modelValue: null,
    //     preview: true,
    //     slots: {},
    //     ref: {},
    //     [$deletePropsList]: [],
    //   };

    //   const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

    //   await waitForNextUpdate();
    //   const result = currentValue.value;

    //   // expect(result.previewText).toBeDefined();
    //   expect(result.previewText).toBe('');
    // });
  });

  describe('第六部分：selectedValuesData 合并测试', () => {
    it('应该正确合并 selectedValuesData 与 data', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
      ];
      const selectedValuesData = [
        { label: 'Selected 1', value: 's1' },
        { label: 'Selected 2', value: 's2' },
      ];
      const props = {
        dataSource,
        selectedValuesData,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);
      await waitForNextUpdate();
      const result = currentValue.value;

      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toBeGreaterThanOrEqual(dataSource.length);
    });

    it('应该按 value 字段去重', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
      ];
      const selectedValuesData = [
        { label: 'Option 1 Updated', value: '1' },
        { label: 'Option 3', value: '3' },
      ];
      const props = {
        dataSource,
        selectedValuesData,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);
      await waitForNextUpdate();
      const result = currentValue.value;

      expect(result.data).toBeDefined();
      const values = result.data.map((item) => item.value);
      const uniqueValues = [...new Set(values)];
      expect(values.length).toBe(uniqueValues.length);
    });

    it('应该在 selectedValuesData 为空时不做处理', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
      ];
      const props = {
        dataSource,
        selectedValuesData: [],
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);
      await waitForNextUpdate();
      const result = currentValue.value;

      expect(result.data).toBeDefined();
      expect(result.data.length).toBe(dataSource.length);
    });

    it('应该在 data 为空时不做处理', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const selectedValuesData = [{ label: 'Selected', value: 's1' }];
      const props = {
        dataSource: [],
        selectedValuesData,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();
      const result = currentValue.value;

      expect(result.data).toBeDefined();
    });

    it('应该正确处理复杂的合并场景', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'A', value: 'a', extra: 'data1' },
        { label: 'B', value: 'b', extra: 'data2' },
      ];
      const selectedValuesData = [
        { label: 'B', value: 'b', extra: 'selected' },
        { label: 'C', value: 'c', extra: 'selected' },
      ];
      const props = {
        dataSource,
        selectedValuesData,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
    });
  });

  describe('第七部分：表单集成测试', () => {
    it('应该在 isInForm=true 时设置 formTagName', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        'data-nodepath': '/root/form/select',
        inject: {
          [$formProvide]: {
            isInForm: true,
          },
        },
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.formTagName).toBe('el-form-select');
    });

    it('应该在 isInForm=false 时设置 tagName', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        'data-nodepath': '/root/select',
        inject: {
          [$formProvide]: {
            isInForm: false,
          },
        },
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.tagName).toBe('el-select');
    });

    it('应该正确处理 data-nodepath 属性', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: true });
      const props = {
        'data-nodepath': '/root/page/select',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result).toBeDefined();
    });

    it('应该在没有 data-nodepath 时不执行 DOM 操作', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        inject: {
          [$formProvide]: {
            isInForm: true,
          },
        },
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result).toBeDefined();
    });

    it('应该正确处理 inject[$formProvide] 为空的情况', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        'data-nodepath': '/root/select',
        inject: {},
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result).toBeDefined();
    });

    it('应该正确处理完整的表单环境配置', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        'data-nodepath': '/root/form/select',
        inject: {
          [$formProvide]: {
            isInForm: true,
            preview: false,
            setValue: vi.fn(),
            value: {},
          },
        },
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result).toBeDefined();
      expect(result.formTagName).toBe('el-form-select');
      expect(result.tagName).toBe('el-select');
    });
  });

  describe('第八部分：插件交叉组合测试', () => {
    it('交叉组合：dataSource + virtualize', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = Array.from({ length: 100 }, (_, i) => ({
        label: `Option ${i}`,
        value: `${i}`,
      }));
      const props = {
        dataSource,
        virtualize: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);
      await waitForNextUpdate();
      const result = currentValue.value;

      expect(result.data).toBeDefined();
      expect(result.options).toBeDefined();
      expect(result.render).toBeDefined();
      expect(result.options.length).toBe(100);
    });

    it('交叉组合：dataSource + preview + modelValue', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Orange', value: 'orange' },
      ];
      const props = {
        dataSource,
        modelValue: 'banana',
        preview: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);
      await waitForNextUpdate();
      const result = currentValue.value;

      expect(result.data).toBeDefined();
      expect(result.modelValue).toBe('banana');
    });

    it('交叉组合：dataSource + selectedValuesData + virtualize', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
      ];
      const selectedValuesData = [
        { label: 'Selected 1', value: 's1' },
        { label: 'Selected 2', value: 's2' },
      ];
      const props = {
        dataSource,
        selectedValuesData,
        virtualize: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.data).toBeDefined();
      expect(result.options).toBeDefined();
      expect(result.render).toBeDefined();
    });

    it('交叉组合：dataSource(async) + virtualize + preview', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const asyncDataSource = vi.fn().mockResolvedValue([
        { label: 'Async 1', value: 'a1' },
        { label: 'Async 2', value: 'a2' },
        { label: 'Async 3', value: 'a3' },
      ]);
      const props = {
        dataSource: asyncDataSource,
        virtualize: true,
        preview: true,
        modelValue: 'a2',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      expect(currentValue.value.loading).toBeDefined();
      expect(asyncDataSource).toHaveBeenCalled();

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.options).toBeDefined();
    });

    it('交叉组合：modelValue + preview + data', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Red', value: 'red' },
        { label: 'Green', value: 'green' },
        { label: 'Blue', value: 'blue' },
      ];
      const props = {
        dataSource,
        modelValue: ['red', 'blue'],
        preview: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);
      await waitForNextUpdate();
      const result = currentValue.value;

      expect(result.data).toBeDefined();
      expect(result.modelValue).toEqual(['red', 'blue']);
    });

    it('交叉组合：inject[$formProvide] + preview + data-nodepath', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        'data-nodepath': '/root/form/select',
        dataSource: [{ label: 'Test', value: 'test' }],
        modelValue: 'test',
        inject: {
          [$formProvide]: {
            isInForm: true,
            preview: true,
          },
        },
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();
      const result = currentValue.value;

      expect(result.formTagName).toBe('el-form-select');
      expect(result.data).toBeDefined();
    });

    it('交叉组合：textField + valueField + descriptionField + slots', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { name: 'Item 1', id: 'i1', desc: 'Description 1' },
        { name: 'Item 2', id: 'i2', desc: 'Description 2' },
      ];
      const customSlot = vi.fn();
      const props = {
        dataSource,
        textField: 'name',
        valueField: 'id',
        descriptionField: 'desc',
        slots: { custom: customSlot },
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.data).toBeDefined();
      expect(result.slots).toBeDefined();
      expect(result.slots.custom).toBe(customSlot);
      expect(result.slots.default).toBeDefined();
    });

    it('交叉组合：所有属性完整组合', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const asyncDataSource = vi.fn().mockResolvedValue([
        { name: 'A', id: 'a', desc: 'Desc A' },
        { name: 'B', id: 'b', desc: 'Desc B' },
      ]);
      const selectedValuesData = [{ name: 'C', id: 'c', desc: 'Desc C' }];
      const props = {
        dataSource: asyncDataSource,
        textField: 'name',
        valueField: 'id',
        descriptionField: 'desc',
        selectedValuesData,
        modelValue: 'b',
        virtualize: true,
        preview: false,
        'data-nodepath': '/root/form/select',
        inject: {
          [$formProvide]: {
            isInForm: true,
            preview: false,
          },
        },
        slots: { custom: vi.fn() },
        ref: { customMethod: vi.fn() },
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      const result = currentValue.value;
      expect(result.data).toBeDefined();
      expect(result.options).toBeDefined();
      expect(result.render).toBeDefined();
      expect(result.modelValue).toBe('b');
      expect(result.formTagName).toBe('el-form-select');
    });

    it('交叉组合：defaultValue + dataSource + preview', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Default', value: 'default' },
        { label: 'Other', value: 'other' },
      ];
      const props = {
        dataSource,
        defaultValue: 'default',
        preview: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.data).toBeDefined();
    });

    it('交叉组合：modelValue 受控 + dataSource(async) + virtualize', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const asyncDataSource = vi.fn().mockResolvedValue([
        { label: 'Item 1', value: 'i1' },
        { label: 'Item 2', value: 'i2' },
      ]);
      const onUpdateModelValue = vi.fn();
      const props = {
        dataSource: asyncDataSource,
        modelValue: 'i1',
        'onUpdate:modelValue': onUpdateModelValue,
        virtualize: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      const result = currentValue.value;
      expect(result.data).toBeDefined();
      expect(result.options).toBeDefined();
      expect(result.modelValue).toBe('i1');
      expect(result['onUpdate:modelValue']).toBeDefined();
    });

    it('交叉组合：表单环境 + 数据源 + 预览 + 虚拟化', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = Array.from({ length: 50 }, (_, i) => ({
        label: `Item ${i}`,
        value: `i${i}`,
      }));
      const props = {
        'data-nodepath': '/root/form/select',
        dataSource,
        modelValue: 'i10',
        virtualize: true,
        inject: {
          [$formProvide]: {
            isInForm: true,
            preview: true,
          },
        },
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);
      await waitForNextUpdate();
      const result = currentValue.value;

      expect(result.formTagName).toBe('el-form-select');
      expect(result.data).toBeDefined();
      expect(result.options).toBeDefined();
    });
  });

  describe('第九部分：边界和异常测试', () => {
    it('边界测试：所有 props 为空对象', async () => {
      const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      // expect(async () => {
      const { currentValue } = await renderHooks(plugins, props);
      expect(currentValue.value).toBeDefined();
      // }).not.toThrow();
    });

    //   it('边界测试：props 只包含必需字段', async () => {
    //     const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
    //     const props = {
    //       slots: {},
    //       ref: {},
    //       [$deletePropsList]: [],
    //     };

    //     const { currentValue } = await renderHooks(plugins, props);
    //     const result = currentValue.value;

    //     expect(result).toBeDefined();
    //     expect(result.formTagName).toBe('el-form-select');
    //     expect(result.tagName).toBe('el-select');
    //   });

    //   it('边界测试：dataSource 异步加载失败', async () => {
    //     const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
    //     const failedDataSource = vi.fn().mockRejectedValue(new Error('Load failed'));
    //     const props = {
    //       dataSource: failedDataSource,
    //       slots: {},
    //       ref: {},
    //       [$deletePropsList]: [],
    //     };

    //     const { currentValue } = await renderHooks(plugins, props);

    //     expect(currentValue.value).toBeDefined();
    //     expect(failedDataSource).toHaveBeenCalled();
    //   });

    //   it('边界测试：字段映射到不存在的路径', async () => {
    //     const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
    //     const dataSource = [{ label: 'Test', value: 'test' }];
    //     const props = {
    //       dataSource,
    //       textField: 'nonexistent.field',
    //       valueField: 'another.nonexistent',
    //       slots: {},
    //       ref: {},
    //       [$deletePropsList]: [],
    //     };

    //     expect(async () => {
    //       const { currentValue } = await renderHooks(plugins, props);
    //       expect(currentValue.value.data).toBeDefined();
    //     }).not.toThrow();
    //   });

    //   it('边界测试：slots 包含 null 和 undefined', async () => {
    //     const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
    //     const props = {
    //       dataSource: [{ label: 'Test', value: 'test' }],
    //       slots: {
    //         valid: vi.fn(),
    //         nullSlot: null,
    //         undefinedSlot: undefined,
    //       },
    //       ref: {},
    //       [$deletePropsList]: [],
    //     };

    //     expect(async () => {
    //       const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);
    //       await waitForNextUpdate();
    //       expect(currentValue.value.slots).toBeDefined();
    //     }).not.toThrow();
    //   });

    //   it('边界测试：ref 对象包含循环引用', async () => {
    //     const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
    //     const circularRef: any = { method: vi.fn() };
    //     circularRef.self = circularRef;
    //     const props = {
    //       dataSource: [{ label: 'Test', value: 'test' }],
    //       ref: circularRef,
    //       slots: {},
    //       [$deletePropsList]: [],
    //     };

    //     expect(async () => {
    //       const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);
    //       await waitForNextUpdate();
    //       expect(currentValue.value).toBeDefined();
    //     }).not.toThrow();
    //   });

    //   // it('边界测试：超大数据量（10000+ 条）', async () => {
    //   //   const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
    //   //   const largeDataSource = Array.from({ length: 10000 }, (_, i) => ({
    //   //     label: `Item ${i}`,
    //   //     value: `i${i}`,
    //   //   }));
    //   //   const props = {
    //   //     dataSource: largeDataSource,
    //   //     virtualize: true,
    //   //     slots: {},
    //   //     ref: {},
    //   //     [$deletePropsList]: [],
    //   //   };

    //   //   const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

    //   //   await waitForNextUpdate();
    //   //   const result = currentValue.value;

    //   //   expect(result.data).toBeDefined();
    //   //   expect(result.data.length).toBe(10000);
    //   //   expect(result.options).toBeDefined();
    //   // });

    //   // it('边界测试：特殊字符和 Unicode 处理', async () => {
    //   //   const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
    //   //   const dataSource = [
    //   //     { label: '中文标签', value: 'chinese' },
    //   //     { label: 'Émojis 🎉', value: 'emoji' },
    //   //     { label: '<script>alert("xss")</script>', value: 'xss' },
    //   //     { label: 'Line\nBreak', value: 'linebreak' },
    //   //   ];
    //   //   const props = {
    //   //     dataSource,
    //   //     modelValue: 'emoji',
    //   //     preview: true,
    //   //     slots: {},
    //   //     ref: {},
    //   //     [$deletePropsList]: [],
    //   //   };

    //   //   const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);
    //   //   await waitForNextUpdate();
    //   //   const result = currentValue.value;

    //   //   expect(result.data).toBeDefined();
    //   //   expect(result.previewText).toBe('Émojis 🎉');
    //   // });
  });

  // describe('第十部分：完整流程集成测试', () => {
  // it('完整流程：静态数据 → 选择值 → 预览', async () => {
  //   const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
  //   const dataSource = [
  //     { label: 'Red', value: 'red' },
  //     { label: 'Green', value: 'green' },
  //     { label: 'Blue', value: 'blue' },
  //   ];

  //   // 步骤1：加载数据
  //   const props1 = {
  //     dataSource,
  //     slots: {},
  //     ref: {},
  //     [$deletePropsList]: [],
  //   };
  //   const { currentValue: result1, waitForNextUpdate } = await renderHooks(plugins, props1);
  //   await waitForNextUpdate();
  //   expect(result1.value.data).toBeDefined();
  //   expect(result1.value.data.length).toBe(3);

  //   // 步骤2：选择值
  //   const props2 = {
  //     dataSource,
  //     modelValue: 'green',
  //     slots: {},
  //     ref: {},
  //     [$deletePropsList]: [],
  //   };
  //   const { currentValue: result2, waitForNextUpdate: waitForNextUpdate2 } = await renderHooks(plugins, props2);
  //   await waitForNextUpdate2();
  //   expect(result2.value.modelValue).toBe('green');

  //   // 步骤3：预览
  //   const props3 = {
  //     dataSource,
  //     modelValue: 'green',
  //     preview: true,
  //     slots: {},
  //     ref: {},
  //     [$deletePropsList]: [],
  //   };
  //   const { currentValue: result3, waitForNextUpdate: waitForNextUpdate3 } = await renderHooks(plugins, props3);
  //   await waitForNextUpdate3();
  //   expect(result3.value.previewText).toBe('Green');
  // });

  // it('完整流程：异步加载 → 虚拟化 → 值选择', async () => {
  //   const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
  //   const asyncDataSource = vi.fn().mockResolvedValue(
  //     Array.from({ length: 200 }, (_, i) => ({
  //       label: `Item ${i}`,
  //       value: `i${i}`,
  //     })),
  //   );

  //   // 步骤1：开始加载
  //   const props = {
  //     dataSource: asyncDataSource,
  //     virtualize: true,
  //     modelValue: 'i50',
  //     slots: {},
  //     ref: {},
  //     [$deletePropsList]: [],
  //   };
  //   const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

  //   expect(currentValue.value.loading).toBeDefined();

  //   // 步骤2：等待数据加载完成
  //   await waitForNextUpdate();

  //   // 步骤3：验证虚拟化和值
  //   expect(currentValue.value.data).toBeDefined();
  //   expect(currentValue.value.data.length).toBe(200);
  //   expect(currentValue.value.options).toBeDefined();
  //   expect(currentValue.value.render).toBeDefined();
  //   expect(currentValue.value.modelValue).toBe('i50');
  // });

  // it('完整流程：表单环境 → 数据源 → 受控值 → 预览', async () => {
  //   const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
  //   const dataSource = [
  //     { label: 'Option A', value: 'a' },
  //     { label: 'Option B', value: 'b' },
  //   ];
  //   const onUpdateModelValue = vi.fn();

  //   const props = {
  //     'data-nodepath': '/root/form/select',
  //     dataSource,
  //     modelValue: 'a',
  //     'onUpdate:modelValue': onUpdateModelValue,
  //     inject: {
  //       [$formProvide]: {
  //         isInForm: true,
  //         preview: true,
  //       },
  //     },
  //     slots: {},
  //     ref: {},
  //     [$deletePropsList]: [],
  //   };

  //   const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);
  //   await waitForNextUpdate();
  //   const result = currentValue.value;

  //   // 验证表单环境
  //   expect(result.formTagName).toBe('el-form-select');
  //   // 验证数据源
  //   expect(result.data).toBeDefined();
  //   // 验证受控值
  //   expect(result.modelValue).toBe('a');
  //   expect(result['onUpdate:modelValue']).toBeDefined();
  //   // 验证预览
  //   expect(result.previewText).toBe('Option A');
  // });

  // it('完整流程：reload 重新加载数据 → 值更新', async () => {
  //   const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
  //   let callCount = 0;
  //   const asyncDataSource = vi.fn().mockImplementation(async () => {
  //     callCount++;
  //     return [
  //       { label: `Load ${callCount} - Item 1`, value: 'i1' },
  //       { label: `Load ${callCount} - Item 2`, value: 'i2' },
  //     ];
  //   });

  //   const props = {
  //     dataSource: asyncDataSource,
  //     slots: {},
  //     ref: {},
  //     [$deletePropsList]: [],
  //   };

  //   const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

  //   // 第一次加载
  //   await waitForNextUpdate();
  //   expect(currentValue.value.data).toBeDefined();
  //   expect(currentValue.value.ref.reload).toBeDefined();

  //   // 调用 reload
  //   const reloadFn = currentValue.value.ref.reload;
  //   expect(typeof reloadFn).toBe('function');
  // });

  // it('完整流程：props 更新触发插件重新执行', async () => {
  //   const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });

  //   // 初始 props
  //   const initialProps = {
  //     dataSource: [{ label: 'Initial', value: 'init' }],
  //     modelValue: 'init',
  //     slots: {},
  //     ref: {},
  //     [$deletePropsList]: [],
  //   };

  //   const { currentValue } = await renderHooks(plugins, initialProps);

  //   expect(currentValue.value.data).toBeDefined();
  //   expect(currentValue.value.modelValue).toBe('init');

  //   // 注意：renderHooks 会在 props 更新时自动触发重新执行
  //   // 这里我们验证初始状态即可
  //   expect(currentValue.value).toBeDefined();
  // });

  // it('完整流程：所有功能协同工作', async () => {
  //   const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });

  //   // 模拟完整的真实场景
  //   const asyncDataSource = vi.fn().mockResolvedValue([
  //     { name: 'Apple', id: 'apple', info: 'A red fruit' },
  //     { name: 'Banana', id: 'banana', info: 'A yellow fruit' },
  //     { name: 'Cherry', id: 'cherry', info: 'A small red fruit' },
  //   ]);
  //   const selectedValuesData = [{ name: 'Durian', id: 'durian', info: 'A spiky fruit' }];
  //   const onUpdateModelValue = vi.fn();

  //   const props = {
  //     'data-nodepath': '/app/fruits/selector',
  //     dataSource: asyncDataSource,
  //     textField: 'name',
  //     valueField: 'id',
  //     descriptionField: 'info',
  //     selectedValuesData,
  //     modelValue: ['banana', 'durian'],
  //     'onUpdate:modelValue': onUpdateModelValue,
  //     virtualize: true,
  //     inject: {
  //       [$formProvide]: {
  //         isInForm: true,
  //         preview: false,
  //       },
  //     },
  //     slots: { prefix: vi.fn() },
  //     ref: { customMethod: vi.fn() },
  //     [$deletePropsList]: [],
  //   };

  //   const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

  //   // 等待异步数据加载
  //   await waitForNextUpdate();

  //   const result = currentValue.value;

  //   // 验证所有功能
  //   expect(result.formTagName).toBe('el-form-select');
  //   expect(result.tagName).toBe('el-select');
  //   expect(result.data).toBeDefined();
  //   expect(result.data.length).toBeGreaterThan(3); // 包含 selectedValuesData
  //   expect(result.options).toBeDefined();
  //   expect(result.render).toBeDefined();
  //   expect(result.modelValue).toEqual(['banana', 'durian']);
  //   expect(result['onUpdate:modelValue']).toBeDefined();
  //   expect(result.ref.reload).toBeDefined();
  //   expect(result.ref.resetField).toBeDefined();
  //   expect(result.slots).toBeDefined();
  //   expect(result.slots.prefix).toBeDefined();
  //   expect(result[$deletePropsList]).toBeDefined();
  // });
  // });

  // describe('第十一部分：props 更新响应式测试（使用 setValue）', () => {
  // it('响应式测试：使用 setValue 更新 dataSource 后数据应该更新', async () => {
  //   const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
  //   const initialDataSource = [
  //     { label: 'Initial 1', value: 'i1' },
  //     { label: 'Initial 2', value: 'i2' },
  //   ];
  //   const props = {
  //     dataSource: initialDataSource,
  //     slots: {},
  //     ref: {},
  //     [$deletePropsList]: [],
  //   };

  //   const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

  //   await waitForNextUpdate();

  //   // 验证初始数据
  //   expect(currentValue.value.data).toBeDefined();
  //   expect(currentValue.value.data.length).toBe(2);
  //   expect(currentValue.value.data[0].label).toBe('Initial 1');

  //   // 使用 setValue 更新 dataSource
  //   const newDataSource = [
  //     { label: 'Updated 1', value: 'u1' },
  //     { label: 'Updated 2', value: 'u2' },
  //     { label: 'Updated 3', value: 'u3' },
  //   ];
  //   await setValue({ dataSource: newDataSource });

  //   await waitForNextUpdate();

  //   // 验证更新后的数据
  //   expect(currentValue.value.data).toBeDefined();
  //   expect(currentValue.value.data.length).toBe(3);
  //   expect(currentValue.value.data[0].label).toBe('Updated 1');
  // });

  // it('响应式测试：使用 setValue 更新 modelValue 后应该反映新值', async () => {
  //   const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
  //   const dataSource = [
  //     { label: 'Option A', value: 'a' },
  //     { label: 'Option B', value: 'b' },
  //     { label: 'Option C', value: 'c' },
  //   ];
  //   const props = {
  //     dataSource,
  //     modelValue: 'a',
  //     slots: {},
  //     ref: {},
  //     [$deletePropsList]: [],
  //   };

  //   const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

  //   await waitForNextUpdate();

  //   // 验证初始值
  //   expect(currentValue.value.modelValue).toBe('a');

  //   // 使用 setValue 更新 modelValue
  //   await setValue({ modelValue: 'b' });

  //   // 验证更新后的值
  //   expect(currentValue.value.modelValue).toBe('b');

  //   // 再次更新到 'c'
  //   await setValue({ modelValue: 'c' });

  //   // 验证最新的值
  //   expect(currentValue.value.modelValue).toBe('c');
  // });

  // it('响应式测试：使用 setValue 切换 virtualize 后应该更新 render 和 options', async () => {
  //   const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
  //   const dataSource = Array.from({ length: 50 }, (_, i) => ({
  //     label: `Item ${i}`,
  //     value: `i${i}`,
  //   }));
  //   const props = {
  //     dataSource,
  //     virtualize: false,
  //     slots: {},
  //     ref: {},
  //     [$deletePropsList]: [],
  //   };

  //   const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

  //   await waitForNextUpdate();

  //   // 验证 virtualize=false 时没有 options
  //   expect(currentValue.value.options).toBeUndefined();

  //   // 使用 setValue 切换为 virtualize=true
  //   await setValue({ virtualize: true });

  //   // 验证 virtualize=true 后有 options 和 render
  //   expect(currentValue.value.options).toBeDefined();
  //   expect(currentValue.value.options.length).toBe(50);
  //   expect(currentValue.value.render).toBeDefined();
  //   expect(typeof currentValue.value.render).toBe('function');
  // });

  // it('响应式测试：使用 setValue 切换 preview 模式后应该更新预览文本', async () => {
  //   const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
  //   const dataSource = [
  //     { label: 'Red', value: 'red' },
  //     { label: 'Blue', value: 'blue' },
  //     { label: 'Green', value: 'green' },
  //   ];
  //   const props = {
  //     dataSource,
  //     modelValue: 'red',
  //     preview: false,
  //     slots: {},
  //     ref: {},
  //     [$deletePropsList]: [],
  //   };

  //   const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

  //   await waitForNextUpdate();

  //   // 验证 preview=false 时的状态
  //   expect(currentValue.value.previewText).toBeDefined();

  //   // 使用 setValue 切换为 preview=true
  //   await setValue({ preview: true });

  //   // 验证 preview=true 后的预览文本
  //   expect(currentValue.value.previewText).toBe('Red');

  //   // 同时更新 modelValue 和验证预览文本
  //   await setValue({ modelValue: 'blue' });

  //   expect(currentValue.value.previewText).toBe('Blue');
  // });

  // it('响应式测试：使用 setValue 更新字段映射后应该重新映射数据', async () => {
  //   const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
  //   const dataSource = [
  //     { name: 'Item 1', id: 'i1', title: 'Title 1' },
  //     { name: 'Item 2', id: 'i2', title: 'Title 2' },
  //   ];
  //   const props = {
  //     dataSource,
  //     textField: 'name',
  //     valueField: 'id',
  //     slots: {},
  //     ref: {},
  //     [$deletePropsList]: [],
  //   };

  //   const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

  //   await waitForNextUpdate();

  //   // 验证初始字段映射
  //   expect(currentValue.value.data).toBeDefined();
  //   expect(currentValue.value.data.length).toBe(2);

  //   // 使用 setValue 更新字段映射
  //   await setValue({ textField: 'title' });

  //   // 验证字段映射更新后的数据
  //   expect(currentValue.value.data).toBeDefined();
  //   expect(currentValue.value.data.length).toBe(2);
  // });

  // it('响应式测试：使用 setValue 添加 selectedValuesData 后应该合并到数据中', async () => {
  //   const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
  //   const dataSource = [
  //     { label: 'Option 1', value: '1' },
  //     { label: 'Option 2', value: '2' },
  //   ];
  //   const props = {
  //     dataSource,
  //     slots: {},
  //     ref: {},
  //     [$deletePropsList]: [],
  //   };

  //   const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

  //   await waitForNextUpdate();

  //   // 验证初始数据长度
  //   const initialLength = currentValue.value.data.length;
  //   expect(initialLength).toBe(2);

  //   // 使用 setValue 添加 selectedValuesData
  //   await setValue({
  //     selectedValuesData: [
  //       { label: 'Selected 1', value: 's1' },
  //       { label: 'Selected 2', value: 's2' },
  //     ],
  //   });

  //   // 验证数据已合并
  //   expect(currentValue.value.data).toBeDefined();
  //   expect(currentValue.value.data.length).toBeGreaterThan(initialLength);
  // });

  // it('响应式测试：使用 setValue 从静态数据源切换为异步数据源', async () => {
  //   const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
  //   const staticDataSource = [
  //     { label: 'Static 1', value: 's1' },
  //     { label: 'Static 2', value: 's2' },
  //   ];
  //   const props = {
  //     dataSource: staticDataSource,
  //     slots: {},
  //     ref: {},
  //     [$deletePropsList]: [],
  //   };

  //   const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

  //   await waitForNextUpdate();

  //   // 验证静态数据
  //   expect(currentValue.value.data.length).toBe(2);
  //   expect(currentValue.value.data[0].label).toBe('Static 1');

  //   // 使用 setValue 切换为异步数据源
  //   const asyncDataSource = vi.fn().mockResolvedValue([
  //     { label: 'Async 1', value: 'a1' },
  //     { label: 'Async 2', value: 'a2' },
  //     { label: 'Async 3', value: 'a3' },
  //   ]);
  //   await setValue({ dataSource: asyncDataSource });

  //   await waitForNextUpdate();

  //   // 验证异步数据已加载
  //   expect(asyncDataSource).toHaveBeenCalled();
  //   expect(currentValue.value.data).toBeDefined();
  //   expect(currentValue.value.data.length).toBe(3);
  //   expect(currentValue.value.data[0].label).toBe('Async 1');
  // });

  // it('响应式测试：使用 setValue 同时更新多个属性', async () => {
  //   const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
  //   const dataSource = [
  //     { label: 'Item 1', value: '1' },
  //     { label: 'Item 2', value: '2' },
  //   ];
  //   const props = {
  //     dataSource,
  //     modelValue: '1',
  //     virtualize: false,
  //     preview: false,
  //     slots: {},
  //     ref: {},
  //     [$deletePropsList]: [],
  //   };

  //   const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

  //   await waitForNextUpdate();

  //   // 验证初始状态
  //   expect(currentValue.value.modelValue).toBe('1');
  //   expect(currentValue.value.options).toBeUndefined();

  //   // 使用 setValue 同时更新多个属性
  //   await setValue({
  //     modelValue: '2',
  //     virtualize: true,
  //     preview: true,
  //   });

  //   // 验证所有属性都已更新
  //   expect(currentValue.value.modelValue).toBe('2');
  //   expect(currentValue.value.options).toBeDefined();
  //   expect(currentValue.value.previewText).toBeDefined();
  //   expect(currentValue.value.previewText).toBe('Item 2');
  // });

  // it('响应式测试：使用 setValue 更新数组类型 modelValue', async () => {
  //   const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
  //   const dataSource = [
  //     { label: 'A', value: 'a' },
  //     { label: 'B', value: 'b' },
  //     { label: 'C', value: 'c' },
  //   ];
  //   const props = {
  //     dataSource,
  //     modelValue: ['a'],
  //     preview: true,
  //     slots: {},
  //     ref: {},
  //     [$deletePropsList]: [],
  //   };

  //   const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

  //   await waitForNextUpdate();

  //   // 验证初始多选值
  //   expect(currentValue.value.modelValue).toEqual(['a']);
  //   expect(currentValue.value.previewText).toBe('A');

  //   // 使用 setValue 更新为多个值
  //   await setValue({ modelValue: ['a', 'b', 'c'] });

  //   // 验证更新后的多选值和预览文本
  //   expect(currentValue.value.modelValue).toEqual(['a', 'b', 'c']);
  //   expect(currentValue.value.previewText).toBe('A,B,C');

  //   // 再次更新为单个值
  //   await setValue({ modelValue: ['b'] });

  //   expect(currentValue.value.modelValue).toEqual(['b']);
  //   expect(currentValue.value.previewText).toBe('B');
  // });

  // it('响应式测试：使用 setValue 从有值更新为空值', async () => {
  //   const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
  //   const dataSource = [
  //     { label: 'Option 1', value: '1' },
  //     { label: 'Option 2', value: '2' },
  //   ];
  //   const props = {
  //     dataSource,
  //     modelValue: '1',
  //     slots: {},
  //     ref: {},
  //     [$deletePropsList]: [],
  //   };

  //   const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

  //   await waitForNextUpdate();

  //   // 验证初始值
  //   expect(currentValue.value.modelValue).toBe('1');

  //   // 使用 setValue 更新为 null
  //   await setValue({ modelValue: null });

  //   // 验证空值
  //   expect(currentValue.value.modelValue).toBeNull();

  //   // 使用 setValue 更新为 undefined
  //   await setValue({ modelValue: undefined });

  //   // 验证 undefined
  //   expect(currentValue.value.modelValue).toBeUndefined();

  //   // 使用 setValue 更新为空字符串
  //   await setValue({ modelValue: '' });

  //   expect(currentValue.value.modelValue).toBe('');
  // });

  // it('响应式测试：使用 setValue 更新 descriptionField 后 slots 应该重新生成', async () => {
  //   const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
  //   const dataSource = [
  //     { label: 'Item 1', value: 'i1', desc1: 'Description 1', desc2: 'Alt Desc 1' },
  //     { label: 'Item 2', value: 'i2', desc1: 'Description 2', desc2: 'Alt Desc 2' },
  //   ];
  //   const props = {
  //     dataSource,
  //     descriptionField: 'desc1',
  //     slots: {},
  //     ref: {},
  //     [$deletePropsList]: [],
  //   };

  //   const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

  //   await waitForNextUpdate();

  //   // 验证初始 slots
  //   expect(currentValue.value.slots).toBeDefined();
  //   expect(currentValue.value.slots.default).toBeDefined();

  //   // 使用 setValue 更新 descriptionField
  //   await setValue({ descriptionField: 'desc2' });

  //   // 验证 slots 已重新生成
  //   expect(currentValue.value.slots).toBeDefined();
  //   expect(currentValue.value.slots.default).toBeDefined();
  // });

  // it('响应式测试：使用 setValue 清空 dataSource 后数据应该为空', async () => {
  //   const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
  //   const dataSource = [
  //     { label: 'Item 1', value: '1' },
  //     { label: 'Item 2', value: '2' },
  //     { label: 'Item 3', value: '3' },
  //   ];
  //   const props = {
  //     dataSource,
  //     slots: {},
  //     ref: {},
  //     [$deletePropsList]: [],
  //   };

  //   const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

  //   await waitForNextUpdate();

  //   // 验证初始数据
  //   expect(currentValue.value.data.length).toBe(3);

  //   // 使用 setValue 清空 dataSource
  //   await setValue({ dataSource: [] });

  //   await waitForNextUpdate();

  //   // 验证数据已清空
  //   expect(currentValue.value.data).toBeDefined();
  //   expect(currentValue.value.data.length).toBe(0);

  //   // 使用 setValue 设置为 null
  //   await setValue({ dataSource: null });

  //   await waitForNextUpdate();

  //   expect(currentValue.value.data).toBeDefined();
  // });

  // it('响应式测试：使用 setValue 快速连续更新多次应该正确处理', async () => {
  //   const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
  //   const props = {
  //     dataSource: [{ label: 'Initial', value: 'init' }],
  //     modelValue: 'init',
  //     slots: {},
  //     ref: {},
  //     [$deletePropsList]: [],
  //   };

  //   const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

  //   await waitForNextUpdate();

  //   // 验证初始状态
  //   expect(currentValue.value.modelValue).toBe('init');

  //   // 快速连续更新
  //   await setValue({ modelValue: 'value1' });
  //   expect(currentValue.value.modelValue).toBe('value1');

  //   await setValue({ modelValue: 'value2' });
  //   expect(currentValue.value.modelValue).toBe('value2');

  //   await setValue({ modelValue: 'value3' });
  //   expect(currentValue.value.modelValue).toBe('value3');
  // });

  // it('响应式测试：使用 setValue 更新 dataSource 和 modelValue 的组合场景', async () => {
  //   const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
  //   const initialDataSource = [
  //     { label: 'Old 1', value: 'o1' },
  //     { label: 'Old 2', value: 'o2' },
  //   ];
  //   const props = {
  //     dataSource: initialDataSource,
  //     modelValue: 'o1',
  //     preview: true,
  //     slots: {},
  //     ref: {},
  //     [$deletePropsList]: [],
  //   };

  //   const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

  //   await waitForNextUpdate();

  //   // 验证初始状态
  //   expect(currentValue.value.data.length).toBe(2);
  //   expect(currentValue.value.modelValue).toBe('o1');
  //   expect(currentValue.value.previewText).toBe('Old 1');

  //   // 使用 setValue 同时更新 dataSource 和 modelValue
  //   const newDataSource = [
  //     { label: 'New 1', value: 'n1' },
  //     { label: 'New 2', value: 'n2' },
  //     { label: 'New 3', value: 'n3' },
  //   ];
  //   await setValue({
  //     dataSource: newDataSource,
  //     modelValue: 'n2',
  //   });

  //   await waitForNextUpdate();

  //   // 验证更新后的状态
  //   expect(currentValue.value.data.length).toBe(3);
  //   expect(currentValue.value.modelValue).toBe('n2');
  //   expect(currentValue.value.previewText).toBe('New 2');
  // });

  // it('响应式测试：使用 setValue 在虚拟化场景下更新数据和配置', async () => {
  //   const plugins = SelectBasicAccumulate.getPluginMethod({ isInDesigner: false });
  //   const initialData = Array.from({ length: 10 }, (_, i) => ({
  //     label: `Item ${i}`,
  //     value: `i${i}`,
  //   }));
  //   const props = {
  //     dataSource: initialData,
  //     virtualize: false,
  //     slots: {},
  //     ref: {},
  //     [$deletePropsList]: [],
  //   };

  //   const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

  //   await waitForNextUpdate();

  //   // 验证初始状态
  //   expect(currentValue.value.data.length).toBe(10);
  //   expect(currentValue.value.options).toBeUndefined();

  //   // 使用 setValue 切换为虚拟化并增加数据
  //   const largeData = Array.from({ length: 100 }, (_, i) => ({
  //     label: `Large Item ${i}`,
  //     value: `l${i}`,
  //   }));
  //   await setValue({
  //     dataSource: largeData,
  //     virtualize: true,
  //   });

  //   await waitForNextUpdate();

  //   // 验证虚拟化生效
  //   expect(currentValue.value.data.length).toBe(100);
  //   expect(currentValue.value.options).toBeDefined();
  //   expect(currentValue.value.options.length).toBe(100);
  //   expect(currentValue.value.render).toBeDefined();
  // });
  // });
});
