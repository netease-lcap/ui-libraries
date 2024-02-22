import {
  describe,
  it,
  vi as jest,
  expect,
} from 'vitest';
import { mount } from '@vue/test-utils';
import { UDateTimePicker } from '../index.js';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe('u-date-time-picker.vue', () => {
  it('date time picker', async () => {
    const onChange = jest.fn();
    const onUpdateValue = jest.fn();
    const onInput = jest.fn();
    const onUpdate = jest.fn();
    const wrapper = mount(UDateTimePicker, {
      propsData: {
        picker: 'date',
        date: '2023-03-10 18:18:59',
        appendTo: 'reference',
        converter: 'format',
      },
      listeners: {
        change: onChange,
        input: onInput,
        update: onUpdate,
        'update:date': onUpdateValue,
      },
    });
    // 输入框的值
    expect(wrapper.find('input').element.value).toBe('2023-03-10 18:18:59');
    expect(onUpdate.mock.calls[0][0]).toBe('2023-03-10 18:18:59');
    // 弹出选择框
    await wrapper.find('input').trigger('click');
    // 打一个快照，因为自动化快照有点问题，这个组件需要手动打
    await sleep(100);
    expect(wrapper.html()).toMatchSnapshot();
    // 选择日期
    await wrapper
      .findAll('[sindex="3"].daywrap')
      .at(2)
      .trigger('click');
    await wrapper
      .findAll('a[color="primary"]')
      .at(1)
      .trigger('click');
    expect(wrapper.find('input').element.value).toBe('2023-03-15 18:18:59');
    // 校验事件参数
    expect(onChange.mock.calls[0][0]).toHaveProperty('date', 1678875539000);
    expect(onUpdateValue.mock.calls[0][0]).toBe('2023-03-15 18:18:59');
    expect(onInput.mock.calls[0][0]).toBe('2023-03-15 18:18:59');
  });

  it('test date timer picker input', async () => {
    const onChange = jest.fn();
    const onUpdateValue = jest.fn();
    const onInput = jest.fn();
    const onUpdate = jest.fn();

    const wrapper = mount(UDateTimePicker, {
      propsData: {
        picker: 'date',
        date: '2023-03-10 18:18:59',
        appendTo: 'reference',
        converter: 'format',
      },
      listeners: {
        change: onChange,
        input: onInput,
        update: onUpdate,
        'update:date': onUpdateValue,
      },
    });

    expect(onUpdate).toBeCalled();
    const input = wrapper.find('input');

    input.element.value = '2023-21';
    await input.trigger('input');
    await input.trigger('blur');
    expect(input.element.value).toBe('2023-03-10 18:18:59');
    expect(onInput).toBeCalledTimes(0);

    input.element.value = '2023-04-10 18:30:00';
    await input.trigger('input');
    await input.trigger('blur');
    expect(input.element.value).toBe('2023-04-10 18:30:00');
    expect(onInput).toBeCalled();
    expect(onChange).toBeCalled();
    expect(onUpdate).toBeCalled();

    await input.trigger('click');
    await sleep(100);

    const dateInput = wrapper.findAll('input').at(1);
    const timeInput = wrapper.findAll('input').at(2);
    expect(dateInput.element.value).toBe('2023-04-10');
    expect(timeInput.element.value).toBe('18:30:00');

    dateInput.element.value = '2024-01-01';
    await dateInput.trigger('input');
    await dateInput.trigger('blur');
    await wrapper.findAll('[class^=daywrap]').at(6).trigger('click');
    // expect(dateInput.element.value).toBe('2024-01-06');

    timeInput.element.value = '18:00:00';
    await timeInput.trigger('input');
    await timeInput.trigger('blur');
    expect(timeInput.element.value).toBe('18:00:00');
  });

  it('date time range picker', async () => {
    const onChange = jest.fn();
    const onInput = jest.fn();
    const onUpdate = jest.fn();
    const onUpdateStartDate = jest.fn();
    const onUpdateEndDate = jest.fn();
    const wrapper = mount(UDateTimePicker, {
      propsData: {
        range: true,
        picker: 'date',
        startDate: '2023-03-10',
        endDate: '2023-03-20',
        appendTo: 'reference',
        converter: 'format',
      },
      listeners: {
        change: onChange,
        input: onInput,
        update: onUpdate,
        'update:startDate': onUpdateStartDate,
        'update:endDate': onUpdateEndDate,
      },
    });
    // 输入框的值
    expect(wrapper.findAll('input').at(0).element.value).toBe('2023-03-10 00:00:00');
    expect(wrapper.findAll('input').at(1).element.value).toBe('2023-03-20 00:00:00');
    expect(onUpdate.mock.calls[0][0]).toEqual(['2023-03-10 00:00:00', '2023-03-20 00:00:00']);
    // 弹出左边日历
    await wrapper
      .findAll('input')
      .at(0)
      .trigger('click');
    await sleep(100);
    expect(wrapper.html()).toMatchSnapshot();
    // 选择左边日期
    await wrapper
      .findAll('[sindex="3"].daywrap')
      .at(2)
      .trigger('click');
    await wrapper
      .findAll('a[color="primary"]')
      .at(1)
      .trigger('click');
    expect(wrapper.findAll('input').at(0).element.value).toBe('2023-03-15 00:00:00');
    // 校验事件参数
    expect(onUpdateStartDate).toHaveBeenLastCalledWith('2023-03-15 00:00:00');
    expect(onChange.mock.calls[0][0]).toHaveProperty('startDate', 1678809600000);
    expect(onInput.mock.calls[0][0]).toEqual(['2023-03-15 00:00:00', '2023-03-20 00:00:00']);
    // 弹出右边日历
    await wrapper
      .findAll('input')
      .at(1)
      .trigger('click');
    await sleep(100);
    expect(wrapper.html()).toMatchSnapshot();
    // 选择右边日期
    await wrapper
      .findAll('[sindex="6"].daywrap')
      .at(3)
      .trigger('click');
    await wrapper
      .findAll('a[color="primary"]')
      .at(1)
      .trigger('click');
    expect(wrapper.findAll('input').at(1).element.value).toBe('2023-03-25 00:00:00');
    // 校验事件参数
    expect(onUpdateEndDate).toHaveBeenLastCalledWith('2023-03-25 00:00:00');
    expect(onChange.mock.calls[1][0]).toHaveProperty('endDate', 1679673600000);
    expect(onInput.mock.calls[1][0]).toEqual(['2023-03-15 00:00:00', '2023-03-25 00:00:00']);
  });

  it('date time range picker input', async () => {
    const onChange = jest.fn();
    const onInput = jest.fn();
    const onUpdate = jest.fn();
    const onUpdateStartDate = jest.fn();
    const onUpdateEndDate = jest.fn();
    const wrapper = mount(UDateTimePicker, {
      propsData: {
        range: true,
        picker: 'date',
        startDate: '2023-03-10',
        endDate: '2024-03-20',
        appendTo: 'reference',
        converter: 'format',
      },
      listeners: {
        change: onChange,
        input: onInput,
        update: onUpdate,
        'update:startDate': onUpdateStartDate,
        'update:endDate': onUpdateEndDate,
      },
    });

    await wrapper.vm.$nextTick();

    const startInput = wrapper.findAll('input').at(0);
    const endInput = wrapper.findAll('input').at(1);

    startInput.element.value = '2333';
    await startInput.trigger('input');
    await startInput.trigger('blur');
    await wrapper.vm.$nextTick();

    startInput.element.value = '2024-01-01 18:00:00';
    await startInput.trigger('input');
    await startInput.trigger('blur');
    expect(onUpdateStartDate).toBeCalled();
    expect(startInput.element.value).toBe('2024-01-01 18:00:00');

    endInput.element.value = '2024-03-01 18:00:00';
    await endInput.trigger('input');
    await endInput.trigger('blur');
    expect(onUpdateEndDate).toBeCalled();
    expect(endInput.element.value).toBe('2024-03-01 18:00:00');
  });
});
