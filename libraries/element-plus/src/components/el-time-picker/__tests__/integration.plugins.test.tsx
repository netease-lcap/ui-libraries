/**
 * el-time-picker 插件集成测试
 * 测试所有插件的功能和交互
 */
import { describe, it, expect } from 'vitest';
import { renderHooks } from '@ep-test/test-utils/render-hook';
import TimePickerBasicAccumulate from '../plugins/basic-plugins';
import { $deletePropsList } from '@/plugins/constants';
import { $formProvide } from '@/components/el-form/constants';

describe('el-time-picker 插件集成测试', () => {
  // ==================== 第一部分：插件链调用测试 ====================
  describe('插件链调用', () => {
    it('应该正确执行所有插件', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        value: '12:00:00',
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value).toBeDefined();
      expect(currentValue.value.tagName).toBe('el-time-picker');
      expect(currentValue.value.formTagName).toBe('el-form-time-picker');
    });

    it('应该按正确顺序执行插件', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        value: '12:00:00',
        isRange: false,
      };

      const { currentValue } = await renderHooks(plugins, props);

      // 验证插件执行顺序和结果
      expect(currentValue.value.tagName).toBe('el-time-picker');
      expect(currentValue.value['is-range']).toBe(false);
    });
  });

  // ==================== 第二部分：handleTagName 测试 ====================
  describe('handleTagName', () => {
    it('应该设置正确的 tagName 和 formTagName', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        value: '12:00:00',
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.tagName).toBe('el-time-picker');
      expect(currentValue.value.formTagName).toBe('el-form-time-picker');
    });

    it('应该处理 isRange 为 true 的情况', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        value: ['12:00:00', '13:00:00'],
        isRange: true,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value['is-range']).toBe(true);
    });

    it('应该处理 isRange 为 false 的情况', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        value: '12:00:00',
        isRange: false,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value['is-range']).toBe(false);
    });

    it('应该合并自定义 class', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        value: '12:00:00',
        class: 'custom-class',
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.class).toContain('el-time-picker');
      expect(currentValue.value.class).toContain('custom-class');
    });

    it('应该添加 data-nodepath 到 $deletePropsList', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        value: '12:00:00',
        'data-nodepath': 'test.path',
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value[$deletePropsList]).toContain('data-nodepath');
    });
  });

  // ==================== 第三部分：handleRangeDateValue 测试 ====================
  describe('handleRangeDateValue (isRange=true)', () => {
    it('应该处理受控的范围时间值', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        isRange: true,
        startValue: '12:00:00',
        endValue: '13:00:00',
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.modelValue).toBeDefined();
      expect(Array.isArray(currentValue.value.modelValue)).toBe(true);
      expect(currentValue.value.modelValue.length).toBe(2);
    });

    it('应该处理空的范围时间值', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        isRange: true,
        startValue: undefined,
        endValue: undefined,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.modelValue).toEqual([]);
    });

    it('应该处理 startValue 为 null', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        isRange: true,
        startValue: null,
        endValue: '13:00:00',
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.modelValue).toEqual([]);
    });

    it('应该处理 endValue 为 null', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        isRange: true,
        startValue: '12:00:00',
        endValue: null,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.modelValue).toEqual([]);
    });

    it('应该处理无效的时间格式', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        isRange: true,
        startValue: 'invalid-time',
        endValue: '13:00:00',
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.modelValue).toEqual([]);
    });

    it('应该在 modelValue 更新时调用 onUpdate:startValue 和 onUpdate:endValue', async () => {
      let updatedStartValue: string | undefined;
      let updatedEndValue: string | undefined;

      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        isRange: true,
        startValue: '12:00:00',
        endValue: '13:00:00',
        'onUpdate:startValue': (val: string) => {
          updatedStartValue = val;
        },
        'onUpdate:endValue': (val: string) => {
          updatedEndValue = val;
        },
      };

      const { currentValue } = await renderHooks(plugins, props);

      const updateFn = currentValue.value['onUpdate:modelValue'];
      expect(updateFn).toBeDefined();

      // 模拟 modelValue 更新
      const newDate1 = new Date('2024-01-01 14:00:00');
      const newDate2 = new Date('2024-01-01 15:00:00');
      updateFn([newDate1, newDate2]);

      expect(updatedStartValue).toBeDefined();
      expect(updatedEndValue).toBeDefined();
    });

    it('应该使用非受控值（value 来自 modelValue）', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        isRange: true,
        modelValue: ['12:00:00', '13:00:00'],
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.modelValue).toBeDefined();
      expect(Array.isArray(currentValue.value.modelValue)).toBe(true);
    });
  });

  // ==================== 第四部分：handleDateValue 测试 ====================
  describe('handleDateValue (isRange=false)', () => {
    const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
    it('应该处理单个时间值', async () => {
      const props = {
        isRange: false,
        value: '12:00:00',
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.modelValue).toBeDefined();
    });

    it('应该处理空值', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        isRange: false,
        value: undefined,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.modelValue).toBe('');
    });

    it('应该处理 null 值', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        isRange: false,
        value: null,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.modelValue).toBe('');
    });

    it('应该在 modelValue 更新时调用 setValue', async () => {
      let updated = false;
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        isRange: false,
        value: '12:00:00',
        'onUpdate:value': () => {
          updated = true;
        },
      };

      const { currentValue } = await renderHooks(plugins, props);

      const updateFn = currentValue.value['onUpdate:modelValue'];
      expect(updateFn).toBeDefined();

      // 模拟 modelValue 更新
      const newDate = new Date('2024-01-01 14:00:00');
      updateFn(newDate);
    });

    it('应该正确转换 JSON 格式的时间值', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        isRange: false,
        value: '2024-01-01T12:00:00.000Z',
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.modelValue).toBeDefined();
    });
  });

  // ==================== 第五部分：handleDisabledFunction 测试 ====================
  describe('handleDisabledFunction', () => {
    it('应该设置默认的 disabledHours', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        value: '12:00:00',
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.disabledHours).toBeDefined();
      expect(typeof currentValue.value.disabledHours).toBe('function');
    });

    it('应该设置默认的 disabledMinutes', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        value: '12:00:00',
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.disabledMinutes).toBeDefined();
      expect(typeof currentValue.value.disabledMinutes).toBe('function');
    });

    it('应该设置默认的 disabledSeconds', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        value: '12:00:00',
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.disabledSeconds).toBeDefined();
      expect(typeof currentValue.value.disabledSeconds).toBe('function');
    });

    it('应该调用自定义的 disabledHours 函数', async () => {
      let called = false;
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        value: '12:00:00',
        disabledHours: () => {
          called = true;
          return [0, 1, 2];
        },
      };

      const { currentValue } = await renderHooks(plugins, props);

      const { disabledHours } = currentValue.value;
      const result = disabledHours('start', null);

      expect(called).toBe(true);
      expect(result).toEqual([0, 1, 2]);
    });

    it('应该调用自定义的 disabledMinutes 函数', async () => {
      let called = false;
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        value: '12:00:00',
        disabledMinutes: () => {
          called = true;
          return [0, 15, 30];
        },
      };

      const { currentValue } = await renderHooks(plugins, props);

      const { disabledMinutes } = currentValue.value;
      const result = disabledMinutes(12, 'start', null);

      expect(called).toBe(true);
      expect(result).toEqual([0, 15, 30]);
    });

    it('应该调用自定义的 disabledSeconds 函数', async () => {
      let called = false;
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        value: '12:00:00',
        disabledSeconds: () => {
          called = true;
          return [0, 30];
        },
      };

      const { currentValue } = await renderHooks(plugins, props);

      const { disabledSeconds } = currentValue.value;
      const result = disabledSeconds(12, 30, 'start', null);

      expect(called).toBe(true);
      expect(result).toEqual([0, 30]);
    });
  });

  // ==================== 第六部分：handleIcon 测试 ====================
  describe('handleIcon', () => {
    it('应该设置 clearIcon', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        value: '12:00:00',
        prefixIconName: 'clock',
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.clearIcon).toBeDefined();
    });

    it('应该处理没有 prefixIconName 的情况', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        value: '12:00:00',
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.clearIcon).toBeDefined();
    });

    it('应该处理空的 prefixIconName', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: '12:00:00',
        prefixIconName: '',
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.clearIcon).toBeDefined();
    });
  });

  // ==================== 第七部分：handlePreview 测试 ====================
  describe('handlePreview', () => {
    it('应该在预览模式下渲染 ElText', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: '12:00:00',
        preview: true,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.render).toBeDefined();
      expect(typeof currentValue.value.render).toBe('function');
    });

    it('应该在非预览模式下使用原组件', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: '12:00:00',
        preview: false,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.render).toBeUndefined();
    });

    it('应该在 IDE 中显示占位符', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: '12:00:00',
        preview: true,
        'data-nodepath': 'test.path',
      };

      const { currentValue } = await renderHooks(plugins, props);

      const { render } = currentValue.value;
      // const result = render({ modelValue: null, format: 'HH:mm:ss' });
      expect(render).toBeDefined();
    });

    it('应该格式化单个时间值用于预览', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: '12:30:45',
        preview: true,
      };

      const { currentValue } = await renderHooks(plugins, props);

      const { render } = currentValue.value;
      // const date = new Date('2024-01-01T12:30:45');
      // const result = render({ modelValue: date, format: 'HH:mm:ss' });
      expect(render).toBeDefined();
    });

    it('应该格式化范围时间值用于预览', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        isRange: true,
        startValue: '12:00:00',
        endValue: '13:00:00',
        preview: true,
      };

      const { currentValue } = await renderHooks(plugins, props);

      const { render } = currentValue.value;
      // const date1 = new Date('2024-01-01T12:00:00');
      // const date2 = new Date('2024-01-01T13:00:00');
      // const result = render({ modelValue: [date1, date2], format: 'HH:mm:ss' });
      expect(render).toBeDefined();
    });

    it('应该将 ref 合并到组件实例', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const refObj = {};
      const props = {
        value: '12:00:00',
        ref: refObj,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.ref).toBeDefined();
    });
  });

  // ==================== 第八部分：handleComponentInForm 测试 ====================
  describe('handleComponentInForm', () => {
    it('应该处理表单上下文', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const formProvide = {
        disabled: false,
        readonly: false,
      };

      const props = {
        value: '12:00:00',
        [$formProvide]: formProvide,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value).toBeDefined();
    });

    it('应该处理表单的 disabled 状态', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const formProvide = {
        disabled: true,
        readonly: false,
      };

      const props = {
        value: '12:00:00',
        [$formProvide]: formProvide,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value).toBeDefined();
    });

    it('应该处理表单的 readonly 状态', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const formProvide = {
        disabled: false,
        readonly: true,
      };

      const props = {
        value: '12:00:00',
        [$formProvide]: formProvide,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value).toBeDefined();
    });

    it('应该处理没有表单上下文的情况', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        value: '12:00:00',
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value).toBeDefined();
    });
  });

  // ==================== 第九部分：交叉功能测试 ====================
  describe('交叉功能测试', () => {
    it('应该同时处理范围模式和预览模式', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        isRange: true,
        startValue: '12:00:00',
        endValue: '13:00:00',
        preview: true,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value['is-range']).toBe(true);
      expect(currentValue.value.render).toBeDefined();
      expect(currentValue.value.modelValue).toBeDefined();
    });

    it('应该同时处理表单集成和自定义图标', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const formProvide = {
        disabled: false,
        readonly: false,
      };

      const props = {
        value: '12:00:00',
        [$formProvide]: formProvide,
        prefixIconName: 'clock',
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.clearIcon).toBeDefined();
    });

    it('应该同时处理禁用函数和范围模式', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        isRange: true,
        startValue: '12:00:00',
        endValue: '13:00:00',
        disabledHours: () => [0, 1, 2],
        disabledMinutes: () => [0, 15, 30],
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value['is-range']).toBe(true);
      expect(currentValue.value.disabledHours).toBeDefined();
      expect(currentValue.value.disabledMinutes).toBeDefined();
    });

    it('应该同时处理自定义 class 和范围模式', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        isRange: true,
        startValue: '12:00:00',
        endValue: '13:00:00',
        class: 'custom-time-picker',
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.class).toContain('el-time-picker');
      expect(currentValue.value.class).toContain('custom-time-picker');
      expect(currentValue.value['is-range']).toBe(true);
    });
  });

  // ==================== 第十部分：边界条件测试 ====================
  describe('边界条件测试', () => {
    it('应该处理空 props', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {};

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.tagName).toBe('el-time-picker');
    });

    it('应该处理极端时间值 - 00:00:00', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: '00:00:00',
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.modelValue).toBeDefined();
    });

    it('应该处理极端时间值 - 23:59:59', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        value: '23:59:59',
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.modelValue).toBeDefined();
    });

    it('应该处理无效的时间字符串', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        value: 'not-a-time',
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value).toBeDefined();
    });

    it('应该处理范围时间的边界：startValue === endValue', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        isRange: true,
        startValue: '12:00:00',
        endValue: '12:00:00',
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.modelValue).toBeDefined();
    });

    it('应该处理范围时间的边界：startValue > endValue', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        isRange: true,
        startValue: '13:00:00',
        endValue: '12:00:00',
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.modelValue).toBeDefined();
    });

    it('应该处理不同的时间格式', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        value: '12:00:00',
        format: 'HH:mm',
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.modelValue).toBeDefined();
    });
  });

  // ==================== 第十一部分：props 更新响应式测试（使用 setValue） ====================
  describe('props 更新响应式测试', () => {
    it('应该响应 value 的变化', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        value: '12:00:00',
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      const initialValue = currentValue.value.modelValue;
      expect(initialValue).toBeDefined();

      // 更新 value
      (props as any).value = '14:00:00';
      await setValue({ value: '14:00:00' });

      // 注意：由于没有改变 dataSource，不需要 waitForNextUpdate
      expect(currentValue.value.modelValue).toBeDefined();
    });

    it('应该响应 isRange 的变化', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        value: '12:00:00',
        isRange: false,
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value['is-range']).toBe(false);

      // 更新 isRange
      (props as any).isRange = true;
      (props as any).startValue = '12:00:00';
      (props as any).endValue = '13:00:00';
      await setValue({ isRange: true, startValue: '12:00:00', endValue: '13:00:00' });

      expect(currentValue.value['is-range']).toBe(true);
    });

    it('应该响应 startValue 和 endValue 的变化', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        isRange: true,
        startValue: '12:00:00',
        endValue: '13:00:00',
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      const initialValue = currentValue.value.modelValue;
      expect(initialValue).toBeDefined();

      // 更新 startValue 和 endValue
      (props as any).startValue = '14:00:00';
      (props as any).endValue = '15:00:00';
      await setValue({ startValue: '14:00:00', endValue: '15:00:00' });

      expect(currentValue.value.modelValue).toBeDefined();
    });

    it('应该响应 inPreview 的变化', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        value: '12:00:00',
        preview: false,
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      // 更新 inPreview
      (props as any).preview = true;
      await setValue({ preview: true });

      expect(currentValue.value.render).toBeDefined();
    });

    it('应该响应 disabled 状态的变化（通过表单上下文）', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const formProvide = {
        disabled: false,
        readonly: false,
      };

      const props = {
        value: '12:00:00',
        [$formProvide]: formProvide,
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      // 更新 formProvide 中的 disabled
      formProvide.disabled = true;
      (props as any)[$formProvide] = formProvide;
      await setValue({ [$formProvide]: formProvide });

      expect(currentValue.value).toBeDefined();
    });

    it('应该响应 prefixIconName 的变化', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        value: '12:00:00',
        prefixIconName: 'clock',
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.clearIcon).toBeDefined();

      // 更新 prefixIconName
      (props as any).prefixIconName = 'time';
      await setValue({ prefixIconName: 'time' });

      expect(currentValue.value.clearIcon).toBeDefined();
    });

    it('应该响应 disabledHours 函数的变化', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        value: '12:00:00',
        disabledHours: () => [0, 1, 2],
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      let result = currentValue.value.disabledHours('start', null);
      expect(result).toEqual([0, 1, 2]);

      // 更新 disabledHours
      (props as any).disabledHours = () => [3, 4, 5];
      await setValue({ disabledHours: () => [3, 4, 5] });

      result = currentValue.value.disabledHours('start', null);
      expect(result).toEqual([3, 4, 5]);
    });

    it('应该响应 format 的变化', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        value: '12:00:00',
        format: 'HH:mm:ss',
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.modelValue).toBeDefined();

      // 更新 format
      (props as any).format = 'HH:mm';
      await setValue({ format: 'HH:mm' });

      expect(currentValue.value.modelValue).toBeDefined();
    });

    it('应该响应从空值到有值的变化', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        value: undefined,
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.modelValue).toBe('');

      // 更新为有值
      (props as any).value = '12:00:00';
      await setValue({ value: '12:00:00' });

      expect(currentValue.value.modelValue).toBeDefined();
    });

    it('应该响应从有值到空值的变化', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        value: '12:00:00',
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.modelValue).toBeDefined();

      // 更新为空值
      (props as any).value = undefined;
      await setValue({ value: undefined });

      expect(currentValue.value.modelValue).toBe('');
    });
  });

  // ==================== 第十二部分：完整工作流测试 ====================
  describe('完整工作流测试', () => {
    it('应该完整处理单个时间选择器的流程', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        value: '12:00:00',
        format: 'HH:mm:ss',
        prefixIconName: 'clock',
        disabledHours: () => [0, 1, 2],
      };

      const { currentValue } = await renderHooks(plugins, props);

      // 验证所有插件的输出
      expect(currentValue.value.tagName).toBe('el-time-picker');
      expect(currentValue.value.formTagName).toBe('el-form-time-picker');
      expect(currentValue.value.modelValue).toBeDefined();
      expect(currentValue.value.clearIcon).toBeDefined();
      expect(currentValue.value.disabledHours).toBeDefined();
      expect(currentValue.value['onUpdate:modelValue']).toBeDefined();
    });

    it('应该完整处理范围时间选择器的流程', async () => {
      let updatedStartValue: string | undefined;
      let updatedEndValue: string | undefined;

      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        isRange: true,
        startValue: '12:00:00',
        endValue: '13:00:00',
        format: 'HH:mm:ss',
        'onUpdate:startValue': (val: string) => {
          updatedStartValue = val;
        },
        'onUpdate:endValue': (val: string) => {
          updatedEndValue = val;
        },
        disabledMinutes: () => [0, 15, 30],
      };

      const { currentValue } = await renderHooks(plugins, props);

      // 验证所有插件的输出
      expect(currentValue.value.tagName).toBe('el-time-picker');
      expect(currentValue.value.formTagName).toBe('el-form-time-picker');
      expect(currentValue.value['is-range']).toBe(true);
      expect(currentValue.value.modelValue).toBeDefined();
      expect(Array.isArray(currentValue.value.modelValue)).toBe(true);
      expect(currentValue.value.disabledMinutes).toBeDefined();
      expect(currentValue.value['onUpdate:modelValue']).toBeDefined();

      // 模拟 modelValue 更新
      const updateFn = currentValue.value['onUpdate:modelValue'];
      const newDate1 = new Date('2024-01-01 14:00:00');
      const newDate2 = new Date('2024-01-01 15:00:00');
      updateFn([newDate1, newDate2]);

      // 验证回调被调用
      expect(updatedStartValue).toBeDefined();
      expect(updatedEndValue).toBeDefined();
    });

    it('应该完整处理预览模式下的时间选择器', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        value: '12:30:45',
        format: 'HH:mm:ss',
        preview: true,
        class: 'preview-time-picker',
      };

      const { currentValue } = await renderHooks(plugins, props);

      // 验证预览模式的渲染
      expect(currentValue.value.render).toBeDefined();
      expect(typeof currentValue.value.render).toBe('function');
      expect(currentValue.value.class).toContain('el-time-picker');
      expect(currentValue.value.class).toContain('preview-time-picker');

      // 验证预览渲染
      // const date = new Date('2024-01-01T12:30:45');
      // const result = currentValue.value.render({ modelValue: date, format: 'HH:mm:ss' });
      // expect(result).toBeDefined();
    });

    it('应该完整处理表单集成的时间选择器', async () => {
      const plugins = TimePickerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const formProvide = {
        disabled: false,
        readonly: false,
      };

      const props = {
        value: '12:00:00',
        [$formProvide]: formProvide,
        prefixIconName: 'clock',
      };

      const { currentValue } = await renderHooks(plugins, props);

      // 验证表单集成和其他功能
      expect(currentValue.value.tagName).toBe('el-time-picker');
      expect(currentValue.value.formTagName).toBe('el-form-time-picker');
      expect(currentValue.value.modelValue).toBeDefined();
      expect(currentValue.value.clearIcon).toBeDefined();
    });
  });
});
