import {
  describe,
  it,
  vi,
  expect,
} from 'vitest';
import { mount } from '@vue/test-utils';
import { UDatePicker } from '../index.js';

describe('u-date-picker.vue', () => {
  it('date range picker input', async () => {
    const onChange = vi.fn();
    const onToggle = vi.fn();
    const onUpdateStartDate = vi.fn();
    const onUpdateEndDate = vi.fn();
    const onInput = vi.fn();
    const wrapper = mount(UDatePicker, {
      propsData: {
        range: true,
        picker: 'date',
        startDate: '2023-03-10',
        endDate: '2023-03-20',
        appendTo: 'reference',
      },
      listeners: {
        change: onChange,
        toggle: onToggle,
        'update:startDate': onUpdateStartDate,
        'update:endDate': onUpdateEndDate,
        input: onInput,
      },
    });
    const startInput = wrapper.findAll('input').at(0);
    const endInput = wrapper.findAll('input').at(1);

    startInput.element.value = '2024-01-01';
    await startInput.trigger('input');
    await startInput.trigger('blur');

    expect(onInput).toBeCalled();
    expect(onUpdateStartDate).toBeCalled();
    expect(onUpdateEndDate).toBeCalled();
    expect(onInput.mock.calls[0][0]).toStrictEqual(['2023-03-20', '2024-01-01']);

    endInput.element.value = '2024-03-01';
    await endInput.trigger('input');
    await endInput.trigger('blur');
    expect(endInput.element.value).toBe('2024-03-01');
    expect(startInput.element.value).toBe('2023-03-20');

    startInput.element.value = '2024-01-01';
    await startInput.trigger('input');
    await startInput.trigger('blur');

    expect(endInput.element.value).toBe('2024-03-01');
    expect(startInput.element.value).toBe('2024-01-01');
  });
});
