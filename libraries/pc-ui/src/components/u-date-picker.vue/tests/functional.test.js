import {
  describe,
  it,
  vi,
  expect,
} from 'vitest';
import { mount } from '@vue/test-utils';
import { UDatePicker } from '../index.js';

describe('u-date-picker.vue functional test js', () => {
  // 测试事件是否正常触发
  it('test event $emit', async () => {
    const handleInput = vi.fn();
    const handleChange = vi.fn();
    const handleSelect = vi.fn();
    const handleToggle = vi.fn();
    const handleBlur = vi.fn();

    const wrapper = mount(UDatePicker, {
      propsData: {
        value: '2024-01-29',
        converter: 'format',
      },
      listeners: {
        input: handleInput,
        'update:value': handleInput,
        change: handleChange,
        select: handleSelect,
        toggle: handleToggle,
        blur: handleBlur,
      },
    });

    await wrapper.vm.$nextTick();
    const input = wrapper.find('input');
    expect(input.element.value).toBe('2024-01-29');
    expect(handleInput).toBeCalledTimes(0);

    await input.trigger('click');
    await wrapper.vm.$nextTick();
    expect(handleToggle).toBeCalled();
    wrapper.findAll('[class^=daywrap]').at(6).trigger('click');
    await wrapper.vm.$nextTick();
    expect(handleInput).toBeCalled(true);
    expect(handleInput.mock.calls[0][0]).toBe('2024-01-06');
    expect(input.element.value).toBe('2024-01-06');
    expect(handleChange).toBeCalled(true);
    expect(handleSelect).toBeCalled(true);

    input.trigger('blur');
    expect(handleBlur).toBeCalled(true);

    // 测试输入不合法
    input.element.value = '233333';
    input.trigger('input');
    await wrapper.vm.$nextTick();
    expect(input.element.value).toBe('233333');
    input.trigger('blur');
    await wrapper.vm.$nextTick();
    expect(input.element.value).toBe('2024-01-06');

    input.element.value = '2024-01-19';
    input.trigger('blur');
    await wrapper.vm.$nextTick();
    expect(input.element.value).toBe('2024-01-19');
  });

  // 测试 minDate -> maxdate
  it('test minDate & maxDate', async () => {
    const wrapper = mount(UDatePicker, {
      propsData: {
        value: '2024-01-29',
        converter: 'format',
        minDate: '2024-01-01',
        maxDate: '2024-02-28',
      },
    });

    await wrapper.vm.$nextTick();
    const input = wrapper.find('input');

    expect(input.element.value).toBe('2024-01-29');

    input.element.value = '2025-03-17';
    await input.trigger('input');
    await input.trigger('blur');
    await wrapper.vm.$nextTick();
    expect(input.element.value).toBe('2024-01-29');

    input.element.value = '2023-12-31';
    await input.trigger('input');
    await input.trigger('blur');
    await wrapper.vm.$nextTick();
    expect(input.element.value).toBe('2024-01-29');

    await wrapper.setProps({
      minDate: '2023-12-03',
      maxDate: '2024-02-09',
      value: '2023-12-31',
    });

    await wrapper.vm.$nextTick();

    expect(input.element.value).toBe('2023-12-31');

    await input.trigger('click');
    await wrapper.findAll('[class^=daywrap]').at(6).trigger('click');

    expect(input.element.value).toBe('2023-12-31');
  });

  // 测试formatter convert
  it('test formatter & convert', async () => {
    const handleUpdate = vi.fn();
    const wrapper = mount(UDatePicker, {
      propsData: {
        value: '2024-01-29',
        showFormatter: 'YYYY年M月D日',
        converter: 'timestamp',
      },
      listeners: {
        update: handleUpdate,
      },
    });

    const input = wrapper.find('input');
    expect(input.element.value).toBe('2024年1月29日');
    expect(handleUpdate).toBeCalled();
    expect(handleUpdate.mock.calls[0][0]).toBe(1706457600000);
  });
});
