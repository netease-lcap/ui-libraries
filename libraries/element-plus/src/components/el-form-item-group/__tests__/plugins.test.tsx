import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@ep-test/test-utils/render-hook';
import { $deletePropsList } from '@/plugins/constants';
import '@/utils/index';
import FormItemGroupAccumulate from '../plugins/index';

vi.mock('@lcap/validator', () => {
  class MockValidator {
    rules: any;
    constructor(_a: any, _b: any, rules: any) {
      this.rules = rules;
    }
    validate(value: any) {
      const ruleList = Array.isArray(this.rules) ? this.rules : [this.rules];
      const isRequired = ruleList.some(
        (r) => r === 'required' || r?.required || r?.validate === 'required' || r?.validate === 'filled',
      );
      if (isRequired && (value === undefined || value === null || value === '')) {
        return Promise.reject('表单项不得为空');
      }
      if (typeof this.rules === 'string' && this.rules.includes('required') && !value) {
        return Promise.reject('必填');
      }
      return Promise.resolve(true);
    }
  }
  return {
    default: MockValidator,
    localizeRules: {},
  };
});

describe('el-form-item-group plugins', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('应包含布局、prop 与校验插件', () => {
    const layout = FormItemGroupAccumulate.getPluginMethodByName('handleFormItemGroupLayout');
    const propName = FormItemGroupAccumulate.getPluginMethodByName('handlePropName');
    const validate = FormItemGroupAccumulate.getPluginMethodByName('handleGroupValidation');
    expect(layout?.name).toBe('handleFormItemGroupLayout');
    expect(propName?.name).toBe('handlePropName');
    expect(validate?.name).toBe('handleGroupValidation');
  });

  it('默认 1 列，isRequired 仅控制必填星号', () => {
    const plugin = FormItemGroupAccumulate.getPluginMethodByName('handleFormItemGroupLayout') as any;
    const { currentValue } = renderHook(plugin, {
      columns: undefined,
      class: '',
      style: {},
      slots: { default: () => null },
      [$deletePropsList]: [],
    });

    expect(currentValue.value.class).toContain('el-form-item-group');
    expect(currentValue.value.style['--el-form-item-group-columns']).toBe(1);
    expect(currentValue.value.required).toBe(false);
    expect(currentValue.value[$deletePropsList]).toEqual(expect.arrayContaining(['columns', 'isRequired']));
    expect(currentValue.value[$deletePropsList]).not.toEqual(expect.arrayContaining(['prop']));
  });

  it('isRequired 仅控制必填 * 号展示，不产生校验规则', () => {
    const plugin = FormItemGroupAccumulate.getPluginMethodByName('handleFormItemGroupLayout') as any;
    const { currentValue } = renderHook(plugin, {
      isRequired: true,
      columns: 1,
      class: '',
      style: {},
      slots: { default: () => null },
      [$deletePropsList]: [],
    });

    expect(currentValue.value.required).toBe(true);
  });

  it('支持 2、3 列', () => {
    const plugin = FormItemGroupAccumulate.getPluginMethodByName('handleFormItemGroupLayout') as any;

    const two = renderHook(plugin, {
      columns: 2,
      class: '',
      style: {},
      slots: { default: () => null },
      [$deletePropsList]: [],
    });
    expect(two.currentValue.value.style['--el-form-item-group-columns']).toBe(2);

    const three = renderHook(plugin, {
      columns: 3,
      class: '',
      style: {},
      slots: { default: () => null },
      [$deletePropsList]: [],
    });
    expect(three.currentValue.value.style['--el-form-item-group-columns']).toBe(3);
  });

  it('非法列数回退为 1', () => {
    const plugin = FormItemGroupAccumulate.getPluginMethodByName('handleFormItemGroupLayout') as any;
    const { currentValue } = renderHook(plugin, {
      columns: 4,
      class: '',
      style: {},
      slots: { default: () => null },
      [$deletePropsList]: [],
    });
    expect(currentValue.value.style['--el-form-item-group-columns']).toBe(1);
  });

  describe('handleGroupValidation', () => {
    const plugin = FormItemGroupAccumulate.getPluginMethodByName('handleGroupValidation') as any;

    it('应暴露 validated，并把 NASL rules 转成 EP 原生 rules', () => {
      const { currentValue } = renderHook(plugin, {
        rules: 'required',
        validatingValue: '',
        ref: {},
        emit: vi.fn(),
        [$deletePropsList]: [],
      });

      expect(typeof currentValue.value.prop).toBe('string');
      expect(Array.isArray(currentValue.value.rules)).toBe(true);
      expect(currentValue.value.rules.length).toBeGreaterThan(0);
      expect(typeof currentValue.value.rules[0].validator).toBe('function');
      expect(typeof currentValue.value.ref.validated).toBe('function');
      expect(currentValue.value[$deletePropsList]).toEqual(
        expect.arrayContaining(['validatingValue', 'validatingProcess', 'errorTipType', 'ignoreValidation']),
      );
      expect(currentValue.value[$deletePropsList]).not.toEqual(expect.arrayContaining(['rules']));
    });

    it('validated 应以 validatingValue 校验失败（默认文字与错误状态）', async () => {
      const emit = vi.fn();
      const { currentValue, waitForNextUpdate } = renderHook(plugin, {
        rules: 'required',
        validatingValue: '',
        ref: {},
        emit,
        class: 'el-form-item-group',
        slots: { default: () => null },
        [$deletePropsList]: [],
      });

      const result = await currentValue.value.ref.validated();
      await waitForNextUpdate();
      expect(result).toEqual({ valid: false });
      expect(currentValue.value.validateStatus).toBe('error');
      expect(currentValue.value.error).toBeTruthy();
      expect(emit).toHaveBeenCalledWith('sync:state', 'valid', false);
    });

    it('validated 应以 validatingValue 校验成功', async () => {
      const emit = vi.fn();
      const { currentValue, waitForNextUpdate } = renderHook(plugin, {
        rules: 'required',
        validatingValue: 'ok',
        ref: {},
        emit,
        class: 'el-form-item-group',
        slots: { default: () => null },
        [$deletePropsList]: [],
      });

      const result = await currentValue.value.ref.validated();
      await waitForNextUpdate();
      expect(result).toEqual({ valid: true });
      expect(currentValue.value.error).toBeUndefined();
      expect(emit).toHaveBeenCalledWith('sync:state', 'valid', true);
    });

    it('校验前应调用 validatingProcess', async () => {
      const validatingProcess = vi.fn((v) => `x-${v}`);
      const { currentValue } = renderHook(plugin, {
        rules: 'required',
        validatingValue: 'a',
        validatingProcess,
        ref: {},
        emit: vi.fn(),
        class: 'el-form-item-group',
        slots: { default: () => null },
        [$deletePropsList]: [],
      });

      await currentValue.value.ref.validated();
      expect(validatingProcess).toHaveBeenCalledWith('a');
    });

    it('ignoreValidation 时应跳过校验并返回 valid', async () => {
      const { currentValue, waitForNextUpdate } = renderHook(plugin, {
        rules: 'required',
        validatingValue: '',
        ignoreValidation: true,
        ref: {},
        emit: vi.fn(),
        class: 'el-form-item-group',
        slots: { default: () => null },
        [$deletePropsList]: [],
      });

      const result = await currentValue.value.ref.validated();
      await waitForNextUpdate();
      expect(result).toEqual({ valid: true });
      expect(currentValue.value.error).toBeUndefined();
    });

    it('statusOnly：不提示文字，透传错误状态', async () => {
      const { currentValue, waitForNextUpdate } = renderHook(plugin, {
        rules: 'required',
        validatingValue: '',
        errorTipType: 'statusOnly',
        ref: {},
        emit: vi.fn(),
        class: 'el-form-item-group',
        slots: { default: () => null },
        [$deletePropsList]: [],
      });

      await currentValue.value.ref.validated();
      await waitForNextUpdate();
      expect(currentValue.value.validateStatus).toBe('error');
      expect(currentValue.value.error).toBeUndefined();
      expect(String(currentValue.value.class ?? '')).not.toContain('el-form-item-group--error-border');
    });

    it('textAndBorder：提示文字、不透传状态、显示分组错误边框', async () => {
      const { currentValue, waitForNextUpdate } = renderHook(plugin, {
        rules: 'required',
        validatingValue: '',
        errorTipType: 'textAndBorder',
        ref: {},
        emit: vi.fn(),
        class: 'el-form-item-group',
        slots: { default: () => null },
        [$deletePropsList]: [],
      });

      await currentValue.value.ref.validated();
      await waitForNextUpdate();
      expect(currentValue.value.validateStatus).toBeUndefined();
      expect(currentValue.value.error).toBeTruthy();
      expect(currentValue.value.class).toContain('el-form-item-group--error-border');
    });
  });
});
