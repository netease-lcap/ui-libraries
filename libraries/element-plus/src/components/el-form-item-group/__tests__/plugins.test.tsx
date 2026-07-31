import { describe, expect, it } from 'vitest';
import { renderHook } from '@ep-test/test-utils/render-hook';
import { $deletePropsList } from '@/plugins/constants';
import '@/utils/index';
import FormItemGroupAccumulate from '../plugins/index';

describe('el-form-item-group plugins', () => {
  it('应包含布局插件', () => {
    const plugin = FormItemGroupAccumulate.getPluginMethodByName('handleFormItemGroupLayout');
    expect(plugin).toBeDefined();
    expect(plugin?.name).toBe('handleFormItemGroupLayout');
  });

  it('默认 1 列，并剥离数据/校验属性', () => {
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
    expect(currentValue.value.rules).toEqual([]);
    expect(currentValue.value.required).toBe(false);
    expect(currentValue.value[$deletePropsList]).toEqual(
      expect.arrayContaining(['columns', 'prop', 'rules', 'ignoreRules', 'trigger', 'isRequired']),
    );
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
    expect(currentValue.value.rules).toEqual([]);
    expect(currentValue.value.prop).toBeUndefined();
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
});
