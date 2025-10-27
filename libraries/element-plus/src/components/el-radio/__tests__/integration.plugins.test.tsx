import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHooks } from '@ep-test/test-utils/render-hook';
import { $deletePropsList } from '@/plugins/constants';
import { $formProvide } from '@/components/el-form/constants';
import '@/utils/index';
import RadioAccumulate from '../plugins/index';

describe('el-radio 插件集成测试', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('第一部分：插件链式执行测试', () => {
    it('应该按顺序执行所有插件并合并状态', async () => {
      const plugins = RadioAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        dataSource: [
          { label: 'Option 1', value: 'opt1' },
          { label: 'Option 2', value: 'opt2' },
          { label: 'Option 3', value: 'opt3' },
        ],
        modelValue: 'opt1',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      const result = currentValue.value;

      expect(result).toBeDefined();
      expect(result.formTagName).toBe('el-form-radio-group');
      expect(result.tagName).toBe('el-radio-group');
      expect(result.data).toBeDefined();
      expect(result.slots.default).toBeDefined();
    });

    it('应该正确处理空 props 的情况', async () => {
      const plugins = RadioAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result).toBeDefined();
      expect(result.formTagName).toBe('el-form-radio-group');
      expect(result.tagName).toBe('el-radio-group');
    });
  });

  describe('第二部分：数据源处理完整测试', () => {
    it('应该正确处理静态数据源', async () => {
      const plugins = RadioAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
      ];
      const props = {
        dataSource,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
      expect(Array.isArray(currentValue.value.data)).toBe(true);
      expect(currentValue.value.slots.default).toBeDefined();
    });

    it('应该正确处理异步数据源', async () => {
      const plugins = RadioAccumulate.getPluginMethod({ isInDesigner: false });
      const asyncDataSource = vi.fn().mockResolvedValue([
        { label: 'Async 1', value: 'a1' },
        { label: 'Async 2', value: 'a2' },
      ]);
      const props = {
        dataSource: asyncDataSource,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(asyncDataSource).toHaveBeenCalled();
      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.loading).toBeDefined();
    });

    it('应该正确处理自定义字段映射', async () => {
      const plugins = RadioAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { name: 'Item 1', id: 'i1' },
        { name: 'Item 2', id: 'i2' },
      ];
      const props = {
        dataSource,
        textField: 'name',
        valueField: 'id',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
    });

    it('应该正确设置 ref.reload 和 ref.data', async () => {
      const plugins = RadioAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [{ label: 'Test', value: 'test' }];
      const props = {
        dataSource,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.ref).toBeDefined();
      expect(currentValue.value.ref.reload).toBeDefined();
      expect(typeof currentValue.value.ref.reload).toBe('function');
      expect(currentValue.value.ref.data).toBeDefined();
    });

    it('应该正确处理空数据源', async () => {
      const testCases = [{ dataSource: null }, { dataSource: undefined }, { dataSource: [] }];

      testCases.forEach(async (testCase) => {
        const plugins = RadioAccumulate.getPluginMethod({ isInDesigner: false });
        const props = {
          ...testCase,
          slots: {},
          ref: {},
          [$deletePropsList]: [],
        };

        const { currentValue } = await renderHooks(plugins, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
      });
    });

    it('应该正确处理自定义 item slot', async () => {
      const plugins = RadioAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Option A', value: 'a', extra: 'Extra Info A' },
      ];
      const itemSlot = vi.fn(({ item }) => `${item.label} - ${item.extra}`);
      const props = {
        dataSource,
        slots: {
          item: itemSlot,
        },
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.slots.default).toBeDefined();
    });
  });

  describe('第三部分：受控值处理测试', () => {
    it('应该正确处理受控模式', async () => {
      const plugins = RadioAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'A', value: 'a' },
        { label: 'B', value: 'b' },
      ];
      const props = {
        dataSource,
        modelValue: 'a',
        'onUpdate:modelValue': vi.fn(),
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.modelValue).toBe('a');
      expect(currentValue.value['onUpdate:modelValue']).toBeDefined();
    });

    it('应该正确设置 ref.resetField 方法', async () => {
      const plugins = RadioAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 'a',
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
  });

  describe('第四部分：type 处理测试', () => {
    it('应该正确处理 type="button"', async () => {
      const plugins = RadioAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Button 1', value: 'b1' },
        { label: 'Button 2', value: 'b2' },
      ];
      const props = {
        dataSource,
        type: 'button',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.slots.default).toBeDefined();
    });

    it('应该正确处理 type="border"', async () => {
      const plugins = RadioAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Border 1', value: 'br1' },
        { label: 'Border 2', value: 'br2' },
      ];
      const props = {
        dataSource,
        type: 'border',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.slots.default).toBeDefined();
    });

    it('应该正确处理默认 type', async () => {
      const plugins = RadioAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Normal 1', value: 'n1' },
      ];
      const props = {
        dataSource,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.slots.default).toBeDefined();
    });
  });

  describe('第五部分：direction 和 column 处理测试', () => {
    it('应该正确处理 direction="vertical"', async () => {
      const plugins = RadioAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Item 1', value: 'i1' },
        { label: 'Item 2', value: 'i2' },
      ];
      const props = {
        dataSource,
        direction: 'vertical',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.class).toContain('el-radio-group-vertical');
      expect(currentValue.value.style).toBeDefined();
    });

    it('应该正确处理 column 配置', async () => {
      const plugins = RadioAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Col 1', value: 'c1' },
        { label: 'Col 2', value: 'c2' },
        { label: 'Col 3', value: 'c3' },
      ];
      const props = {
        dataSource,
        column: 3,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.style).toBeDefined();
      expect(currentValue.value.style['grid-template-columns']).toBe('repeat(3, 1fr)');
      expect(currentValue.value.style['grid-auto-flow']).toBe('row');
    });

    it('应该处理未设置 column 的情况', async () => {
      const plugins = RadioAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [{ label: 'Item', value: 'item' }];
      const props = {
        dataSource,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.style).toBeDefined();
      expect(currentValue.value.style['grid-template-columns']).toBe('auto-fill');
      expect(currentValue.value.style['grid-auto-flow']).toBe('auto');
    });

    it('应该合并自定义 class 和 style', async () => {
      const plugins = RadioAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [{ label: 'Item', value: 'item' }];
      const props = {
        dataSource,
        class: 'custom-class',
        style: { color: 'red' },
        direction: 'vertical',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.class).toBeDefined();
      expect(currentValue.value.style).toBeDefined();
      expect(currentValue.value.style.color).toBe('red');
    });
  });

  describe('第六部分：预览模式测试', () => {
    it('应该正确生成预览文本', async () => {
      const plugins = RadioAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Option 1', value: 'o1' },
        { label: 'Option 2', value: 'o2' },
        { label: 'Option 3', value: 'o3' },
      ];
      const props = {
        dataSource,
        modelValue: 'o2',
        preview: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.render).toBeDefined();
    });

    it('应该在 IDE 环境显示默认预览文本', async () => {
      const plugins = RadioAccumulate.getPluginMethod({ isInDesigner: true });
      const dataSource = [{ label: 'Test', value: 'test' }];
      const props = {
        'data-nodepath': '/root/radio',
        dataSource,
        modelValue: 'test',
        preview: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.render).toBeDefined();
    });

    it('应该正确处理空选择的预览', async () => {
      const plugins = RadioAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [{ label: 'Test', value: 'test' }];
      const props = {
        dataSource,
        modelValue: null,
        preview: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.render).toBeDefined();
    });

    it('应该正确处理自定义字段的预览', async () => {
      const plugins = RadioAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { name: 'Item A', id: 'a' },
        { name: 'Item B', id: 'b' },
      ];
      const props = {
        dataSource,
        textField: 'name',
        valueField: 'id',
        modelValue: 'a',
        preview: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.render).toBeDefined();
    });
  });

  describe('第七部分：表单集成测试', () => {
    it('应该在表单环境中正确设置 formTagName', async () => {
      const plugins = RadioAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        'data-nodepath': '/root/form/radio',
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

      expect(result.formTagName).toBe('el-form-radio-group');
    });

    it('应该在表单环境中支持 resetField', async () => {
      const plugins = RadioAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [{ label: 'Test', value: 'test' }];
      const props = {
        'data-nodepath': '/root/form/radio',
        dataSource,
        modelValue: 'test',
        inject: {
          [$formProvide]: {
            isInForm: true,
          },
        },
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.ref.resetField).toBeDefined();
    });
  });

  describe('第八部分：插件交叉组合测试', () => {
    it('交叉组合：dataSource + type=button + direction=vertical', async () => {
      const plugins = RadioAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Option 1', value: 'o1' },
        { label: 'Option 2', value: 'o2' },
      ];
      const props = {
        dataSource,
        type: 'button',
        direction: 'vertical',
        modelValue: 'o1',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.slots.default).toBeDefined();
      expect(currentValue.value.class).toContain('el-radio-group-vertical');
    });

    it('交叉组合：异步数据源 + 预览 + 表单环境', async () => {
      const plugins = RadioAccumulate.getPluginMethod({ isInDesigner: false });
      const asyncDataSource = vi.fn().mockResolvedValue([
        { label: 'Async A', value: 'aa' },
        { label: 'Async B', value: 'ab' },
      ]);
      const props = {
        'data-nodepath': '/root/form/radio',
        dataSource: asyncDataSource,
        modelValue: 'aa',
        preview: true,
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

      expect(asyncDataSource).toHaveBeenCalled();
      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.render).toBeDefined();
      expect(currentValue.value.formTagName).toBe('el-form-radio-group');
    });

    it('交叉组合：type=border + column + 自定义字段', async () => {
      const plugins = RadioAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { name: 'Item 1', id: 'i1' },
        { name: 'Item 2', id: 'i2' },
        { name: 'Item 3', id: 'i3' },
        { name: 'Item 4', id: 'i4' },
      ];
      const props = {
        dataSource,
        textField: 'name',
        valueField: 'id',
        type: 'border',
        column: 2,
        modelValue: 'i1',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.slots.default).toBeDefined();
      expect(currentValue.value.style['grid-template-columns']).toBe('repeat(2, 1fr)');
    });

    it('交叉组合：自定义 item slot + type=button + 预览', async () => {
      const plugins = RadioAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Product A', value: 'pa', price: 100 },
        { label: 'Product B', value: 'pb', price: 200 },
      ];
      const itemSlot = vi.fn(({ item }) => `${item.label} - $${item.price}`);
      const props = {
        dataSource,
        type: 'button',
        modelValue: 'pa',
        preview: true,
        slots: {
          item: itemSlot,
        },
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.render).toBeDefined();
    });
  });

  describe('第九部分：边界和异常测试', () => {
    it('边界测试：大量选项', async () => {
      const plugins = RadioAccumulate.getPluginMethod({ isInDesigner: false });
      const largeDataSource = Array.from({ length: 100 }, (_, i) => ({
        label: `Option ${i}`,
        value: `opt-${i}`,
      }));
      const props = {
        dataSource: largeDataSource,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.data.length).toBe(100);
    });

    it('边界测试：空选择值', async () => {
      const plugins = RadioAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [{ label: 'Test', value: 'test' }];
      const emptyValues = [null, undefined, ''];

      for (const emptyValue of emptyValues) {
        const props = {
          dataSource,
          modelValue: emptyValue,
          slots: {},
          ref: {},
          [$deletePropsList]: [],
        };

        const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

        await waitForNextUpdate();

        expect(currentValue.value.data).toBeDefined();
      }
    });

    it('边界测试：不存在的选择值', async () => {
      const plugins = RadioAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Existing', value: 'exists' },
      ];
      const props = {
        dataSource,
        modelValue: 'nonexistent',
        preview: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.render).toBeDefined();
    });
  });

  describe('第十部分：props 更新响应式测试（使用 setValue）', () => {
    it('响应式测试：使用 setValue 更新 dataSource', async () => {
      const plugins = RadioAccumulate.getPluginMethod({ isInDesigner: false });
      const initialData = [
        { label: 'Old 1', value: 'o1' },
        { label: 'Old 2', value: 'o2' },
      ];
      const props = {
        dataSource: initialData,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.data.length).toBe(2);

      const newData = [
        { label: 'New 1', value: 'n1' },
        { label: 'New 2', value: 'n2' },
        { label: 'New 3', value: 'n3' },
      ];
      await setValue({ dataSource: newData });

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.data.length).toBe(3);
    });

    it('响应式测试：使用 setValue 更新 modelValue（不需要 waitForNextUpdate）', async () => {
      const plugins = RadioAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'A', value: 'a' },
        { label: 'B', value: 'b' },
        { label: 'C', value: 'c' },
      ];
      const props = {
        dataSource,
        modelValue: 'a',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.modelValue).toBe('a');

      await setValue({ modelValue: 'b' });

      expect(currentValue.value.modelValue).toBe('b');

      await setValue({ modelValue: 'c' });

      expect(currentValue.value.modelValue).toBe('c');
    });

    it('响应式测试：使用 setValue 切换 type', async () => {
      const plugins = RadioAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Item 1', value: 'i1' },
        { label: 'Item 2', value: 'i2' },
      ];
      const props = {
        dataSource,
        type: 'default',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      await setValue({ type: 'button' });

      expect(currentValue.value.slots.default).toBeDefined();

      await setValue({ type: 'border' });

      expect(currentValue.value.slots.default).toBeDefined();
    });

    it('响应式测试：使用 setValue 切换 direction', async () => {
      const plugins = RadioAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Item', value: 'item' },
      ];
      const props = {
        dataSource,
        direction: 'horizontal',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      await setValue({ direction: 'vertical' });

      expect(currentValue.value.class).toContain('el-radio-group-vertical');
    });

    it('响应式测试：使用 setValue 更新 column', async () => {
      const plugins = RadioAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Item 1', value: 'i1' },
        { label: 'Item 2', value: 'i2' },
      ];
      const props = {
        dataSource,
        column: 2,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.style['grid-template-columns']).toBe('repeat(2, 1fr)');

      await setValue({ column: 4 });

      expect(currentValue.value.style['grid-template-columns']).toBe('repeat(4, 1fr)');
    });

    it('响应式测试：使用 setValue 切换 preview', async () => {
      const plugins = RadioAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Test', value: 'test' },
      ];
      const props = {
        dataSource,
        modelValue: 'test',
        preview: false,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      await setValue({ preview: true });

      expect(currentValue.value.render).toBeDefined();
    });

    it('响应式测试：使用 setValue 更新字段映射', async () => {
      const plugins = RadioAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Item', name: 'Name', value: 'val', id: 'id' },
      ];
      const props = {
        dataSource,
        textField: 'label',
        valueField: 'value',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      await setValue({ textField: 'name', valueField: 'id' });


      expect(currentValue.value.data).toBeDefined();
    });

    it('响应式测试：使用 setValue 同时更新多个属性', async () => {
      const plugins = RadioAccumulate.getPluginMethod({ isInDesigner: false });
      const initialData = [
        { label: 'Old', value: 'old' },
      ];
      const props = {
        dataSource: initialData,
        modelValue: 'old',
        type: 'default',
        direction: 'horizontal',
        preview: false,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      const newData = [
        { label: 'New 1', value: 'n1' },
        { label: 'New 2', value: 'n2' },
      ];

      await setValue({
        dataSource: newData,
        modelValue: 'n1',
        type: 'button',
        direction: 'vertical',
        preview: true,
        column: 2,
      });

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.class).toContain('el-radio-group-vertical');
      expect(currentValue.value.style['grid-template-columns']).toBe('repeat(2, 1fr)');
      expect(currentValue.value.render).toBeDefined();
    });
  });

  describe('第十一部分：完整流程集成测试', () => {
    it('完整流程：异步加载 → 类型转换 → 选择值 → 预览', async () => {
      const plugins = RadioAccumulate.getPluginMethod({ isInDesigner: false });
      const asyncDataSource = vi.fn().mockResolvedValue([
        { label: 'Plan A', value: 'pa' },
        { label: 'Plan B', value: 'pb' },
        { label: 'Plan C', value: 'pc' },
      ]);

      const props = {
        dataSource: asyncDataSource,
        type: 'button',
        modelValue: 'pb',
        preview: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(asyncDataSource).toHaveBeenCalled();
      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.modelValue).toBe('pb');
      expect(currentValue.value.render).toBeDefined();
    });

    it('完整流程：表单环境 + border 类型 + 列布局', async () => {
      const plugins = RadioAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Option 1', value: 'o1' },
        { label: 'Option 2', value: 'o2' },
        { label: 'Option 3', value: 'o3' },
        { label: 'Option 4', value: 'o4' },
      ];
      const props = {
        'data-nodepath': '/form/radio',
        dataSource,
        type: 'border',
        column: 2,
        modelValue: 'o1',
        inject: {
          [$formProvide]: {
            isInForm: true,
            preview: false,
          },
        },
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.formTagName).toBe('el-form-radio-group');
      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.style['grid-template-columns']).toBe('repeat(2, 1fr)');
      expect(currentValue.value.ref.resetField).toBeDefined();
    });
  });
});

