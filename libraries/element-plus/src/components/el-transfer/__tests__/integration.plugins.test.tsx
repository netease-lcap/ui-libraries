import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHooks } from '@ep-test/test-utils/render-hook';
import { $deletePropsList } from '@/plugins/constants';
import { $formProvide } from '@/components/el-form/constants';
import '@/utils/index';
import ElTransferBasicAccumulate from '../plugins/basic-plugins';

describe('el-transfer 插件集成测试', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('第一部分：插件链式执行测试', () => {
    it('应该按顺序执行所有插件并合并状态', async () => {
      const plugins = ElTransferBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        dataSource: [
          { label: 'Option 1', value: 'opt1' },
          { label: 'Option 2', value: 'opt2' },
          { label: 'Option 3', value: 'opt3' },
        ],
        modelValue: ['opt1'],
        leftTitle: '待选',
        rightTitle: '已选',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      const result = currentValue.value;

      expect(result).toBeDefined();
      expect(result.formTagName).toBe('el-form-transfer');
      expect(result.tagName).toBe('el-transfer');
      expect(result.data).toBeDefined();
      expect(result.titles).toBeDefined();
    });

    it('应该正确处理空 props 的情况', async () => {
      const plugins = ElTransferBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result).toBeDefined();
      expect(result.formTagName).toBe('el-form-transfer');
      expect(result.tagName).toBe('el-transfer');
    });
  });

  describe('第二部分：数据源处理完整测试', () => {
    it('应该正确处理静态数据源', async () => {
      const plugins = ElTransferBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Item 1', value: 'i1' },
        { label: 'Item 2', value: 'i2' },
        { label: 'Item 3', value: 'i3' },
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
      expect(currentValue.value.data.length).toBe(3);
    });

    it('应该正确处理异步数据源', async () => {
      const plugins = ElTransferBasicAccumulate.getPluginMethod({ isInDesigner: false });
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
      const plugins = ElTransferBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { name: 'Item 1', id: 'i1', isDisabled: false },
        { name: 'Item 2', id: 'i2', isDisabled: true },
      ];
      const props = {
        dataSource,
        textField: 'name',
        valueField: 'id',
        disabledField: 'isDisabled',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.data.length).toBe(2);
    });

    it('应该正确设置 ref.reload 和 ref.data', async () => {
      const plugins = ElTransferBasicAccumulate.getPluginMethod({ isInDesigner: false });
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
        const plugins = ElTransferBasicAccumulate.getPluginMethod({ isInDesigner: false });
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
  });

  describe('第三部分：受控值处理测试', () => {
    it('应该正确处理受控模式', async () => {
      const plugins = ElTransferBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'A', value: 'a' },
        { label: 'B', value: 'b' },
      ];
      const props = {
        dataSource,
        modelValue: ['a'],
        'onUpdate:modelValue': vi.fn(),
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.modelValue).toEqual(['a']);
      expect(currentValue.value['onUpdate:modelValue']).toBeDefined();
    });

    it('应该正确处理多个选中值', async () => {
      const plugins = ElTransferBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'A', value: 'a' },
        { label: 'B', value: 'b' },
        { label: 'C', value: 'c' },
      ];
      const props = {
        dataSource,
        modelValue: ['a', 'b', 'c'],
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.modelValue).toEqual(['a', 'b', 'c']);
    });

    it('应该正确设置 ref.resetField 方法', async () => {
      const plugins = ElTransferBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: ['a'],
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

  describe('第四部分：title 处理测试', () => {
    it('应该正确处理左右标题', async () => {
      const plugins = ElTransferBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [{ label: 'Test', value: 'test' }];
      const props = {
        dataSource,
        leftTitle: '待选项',
        rightTitle: '已选项',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.titles).toBeDefined();
      expect(currentValue.value.titles).toEqual(['待选项', '已选项']);
    });

    it('应该处理未设置 title 的情况', async () => {
      const plugins = ElTransferBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.titles).toBeDefined();
      expect(result.titles).toEqual([undefined, undefined]);
    });
  });

  describe('第五部分：button text 处理测试', () => {
    it('应该正确处理左右按钮文本', async () => {
      const plugins = ElTransferBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [{ label: 'Test', value: 'test' }];
      const props = {
        dataSource,
        leftButtonText: '移除',
        rightButtonText: '添加',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.buttonTexts).toBeDefined();
      expect(currentValue.value.buttonTexts).toEqual(['移除', '添加']);
    });

    it('应该处理未设置按钮文本的情况', async () => {
      const plugins = ElTransferBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.buttonTexts).toBeDefined();
      expect(result.buttonTexts).toEqual([undefined, undefined]);
    });
  });

  describe('第六部分：预览模式测试', () => {
    it('应该正确生成预览文本', async () => {
      const plugins = ElTransferBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Cherry', value: 'cherry' },
      ];
      const props = {
        dataSource,
        modelValue: ['apple', 'cherry'],
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
      const plugins = ElTransferBasicAccumulate.getPluginMethod({ isInDesigner: true });
      const dataSource = [{ label: 'Test', value: 'test' }];
      const props = {
        'data-nodepath': '/root/transfer',
        dataSource,
        modelValue: ['test'],
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
      const plugins = ElTransferBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [{ label: 'Test', value: 'test' }];
      const props = {
        dataSource,
        modelValue: [],
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
      const plugins = ElTransferBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { name: 'Item A', id: 'a' },
        { name: 'Item B', id: 'b' },
      ];
      const props = {
        dataSource,
        textField: 'name',
        valueField: 'id',
        modelValue: ['a'],
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
      const plugins = ElTransferBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        'data-nodepath': '/root/form/transfer',
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

      expect(result.formTagName).toBe('el-form-transfer');
    });

    it('应该在表单环境中支持 resetField', async () => {
      const plugins = ElTransferBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [{ label: 'Test', value: 'test' }];
      const props = {
        'data-nodepath': '/root/form/transfer',
        dataSource,
        modelValue: ['test'],
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
    it('交叉组合：dataSource + titles + buttonTexts + 预览', async () => {
      const plugins = ElTransferBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Option 1', value: 'o1' },
        { label: 'Option 2', value: 'o2' },
        { label: 'Option 3', value: 'o3' },
      ];
      const props = {
        dataSource,
        leftTitle: '待选列表',
        rightTitle: '已选列表',
        leftButtonText: '移除选中',
        rightButtonText: '添加选中',
        modelValue: ['o1'],
        preview: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.titles).toEqual(['待选列表', '已选列表']);
      expect(currentValue.value.buttonTexts).toEqual(['移除选中', '添加选中']);
      expect(currentValue.value.render).toBeDefined();
    });

    it('交叉组合：异步数据源 + 表单环境 + 自定义字段', async () => {
      const plugins = ElTransferBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const asyncDataSource = vi.fn().mockResolvedValue([
        { name: 'Async A', id: 'aa', dis: false },
        { name: 'Async B', id: 'ab', dis: true },
      ]);
      const props = {
        'data-nodepath': '/root/form/transfer',
        dataSource: asyncDataSource,
        textField: 'name',
        valueField: 'id',
        disabledField: 'dis',
        modelValue: ['aa'],
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

      expect(asyncDataSource).toHaveBeenCalled();
      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.formTagName).toBe('el-form-transfer');
    });

    it('交叉组合：受控值 + titles + 预览', async () => {
      const plugins = ElTransferBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Item A', value: 'a' },
        { label: 'Item B', value: 'b' },
        { label: 'Item C', value: 'c' },
      ];
      const onUpdateModelValue = vi.fn();
      const props = {
        dataSource,
        modelValue: ['a', 'b'],
        'onUpdate:modelValue': onUpdateModelValue,
        leftTitle: '可选项',
        rightTitle: '已选项',
        preview: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.titles).toEqual(['可选项', '已选项']);
      expect(currentValue.value.render).toBeDefined();
    });
  });

  describe('第九部分：边界和异常测试', () => {
    it('边界测试：大量选项', async () => {
      const plugins = ElTransferBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const largeDataSource = Array.from({ length: 1000 }, (_, i) => ({
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
      expect(currentValue.value.data.length).toBe(1000);
    });

    it('边界测试：空选择值', async () => {
      const plugins = ElTransferBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [{ label: 'Test', value: 'test' }];
      const emptyValues = [null, undefined, []];

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
      const plugins = ElTransferBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [{ label: 'Existing', value: 'exists' }];
      const props = {
        dataSource,
        modelValue: ['nonexistent'],
        preview: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.render).toBeDefined();
    });

    it('边界测试：所有项都被禁用', async () => {
      const plugins = ElTransferBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Disabled 1', value: 'd1', disabled: true },
        { label: 'Disabled 2', value: 'd2', disabled: true },
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
      expect(currentValue.value.data.every((item) => item.disabled)).toBe(true);
    });
  });

  describe('第十部分：props 更新响应式测试（使用 setValue）', () => {
    it('响应式测试：使用 setValue 更新 dataSource', async () => {
      const plugins = ElTransferBasicAccumulate.getPluginMethod({ isInDesigner: false });
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

      expect(currentValue.value.data.length).toBe(2);

      const newData = [
        { label: 'New 1', value: 'n1' },
        { label: 'New 2', value: 'n2' },
        { label: 'New 3', value: 'n3' },
      ];
      await setValue({ dataSource: newData });

      await waitForNextUpdate();

      expect(currentValue.value.data.length).toBe(3);
    });

    it('响应式测试：使用 setValue 更新 modelValue（不需要 waitForNextUpdate）', async () => {
      const plugins = ElTransferBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'A', value: 'a' },
        { label: 'B', value: 'b' },
        { label: 'C', value: 'c' },
      ];
      const props = {
        dataSource,
        modelValue: ['a'],
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.modelValue).toEqual(['a']);

      await setValue({ modelValue: ['a', 'b'] });

      expect(currentValue.value.modelValue).toEqual(['a', 'b']);

      await setValue({ modelValue: ['c'] });

      expect(currentValue.value.modelValue).toEqual(['c']);
    });

    it('响应式测试：使用 setValue 更新 titles', async () => {
      const plugins = ElTransferBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        leftTitle: 'Left',
        rightTitle: 'Right',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.titles).toEqual(['Left', 'Right']);

      await setValue({ leftTitle: 'New Left', rightTitle: 'New Right' });

      expect(currentValue.value.titles).toEqual(['New Left', 'New Right']);
    });

    it('响应式测试：使用 setValue 更新 buttonTexts', async () => {
      const plugins = ElTransferBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        leftButtonText: 'Remove',
        rightButtonText: 'Add',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.buttonTexts).toEqual(['Remove', 'Add']);

      await setValue({ leftButtonText: 'Delete', rightButtonText: 'Insert' });

      expect(currentValue.value.buttonTexts).toEqual(['Delete', 'Insert']);
    });

    it('响应式测试：使用 setValue 切换 preview', async () => {
      const plugins = ElTransferBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [{ label: 'Test', value: 'test' }];
      const props = {
        dataSource,
        modelValue: ['test'],
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
      const plugins = ElTransferBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [{ label: 'Item', name: 'Name', value: 'val', id: 'i', disabled: false, dis: true }];
      const props = {
        dataSource,
        textField: 'label',
        valueField: 'value',
        disabledField: 'disabled',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      await setValue({ textField: 'name', valueField: 'id', disabledField: 'dis' });

      expect(currentValue.value.data).toBeDefined();
    });

    it('响应式测试：使用 setValue 同时更新多个属性', async () => {
      const plugins = ElTransferBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const initialData = [{ label: 'Old', value: 'old' }];
      const props = {
        dataSource: initialData,
        modelValue: ['old'],
        leftTitle: 'Old Left',
        rightTitle: 'Old Right',
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
        modelValue: ['n1', 'n2'],
        leftTitle: 'New Left',
        rightTitle: 'New Right',
        preview: true,
      });

      await waitForNextUpdate();

      expect(currentValue.value.data.length).toBe(2);
      expect(currentValue.value.titles).toEqual(['New Left', 'New Right']);
      expect(currentValue.value.render).toBeDefined();
    });
  });

  describe('第十一部分：完整流程集成测试', () => {
    it('完整流程：异步加载 → 字段映射 → 选择值 → 预览', async () => {
      const plugins = ElTransferBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const asyncDataSource = vi.fn().mockResolvedValue([
        { name: 'Feature A', id: 'fa', dis: false },
        { name: 'Feature B', id: 'fb', dis: false },
        { name: 'Feature C', id: 'fc', dis: true },
      ]);

      const props = {
        dataSource: asyncDataSource,
        textField: 'name',
        valueField: 'id',
        disabledField: 'dis',
        modelValue: ['fa', 'fb'],
        leftTitle: '可用功能',
        rightTitle: '已选功能',
        preview: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(asyncDataSource).toHaveBeenCalled();
      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.modelValue).toEqual(['fa', 'fb']);
      expect(currentValue.value.titles).toEqual(['可用功能', '已选功能']);
      expect(currentValue.value.render).toBeDefined();
    });

    it('完整流程：表单环境 + 自定义按钮 + 受控值', async () => {
      const plugins = ElTransferBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Option 1', value: 'o1' },
        { label: 'Option 2', value: 'o2' },
        { label: 'Option 3', value: 'o3' },
      ];
      const props = {
        'data-nodepath': '/form/transfer',
        dataSource,
        modelValue: ['o1'],
        leftButtonText: '<<',
        rightButtonText: '>>',
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

      expect(currentValue.value.formTagName).toBe('el-form-transfer');
      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.buttonTexts).toEqual(['<<', '>>']);
      expect(currentValue.value.ref.resetField).toBeDefined();
    });
  });
});
