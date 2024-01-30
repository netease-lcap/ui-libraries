import {
  describe,
  it,
  vi,
  expect,
} from 'vitest';
import { mount } from '@vue/test-utils';
import { UNumberInput } from '../index.js';

describe('u-number-input.vue functional tests', () => {
  it('test input & add & subtract', async () => {
    let storeValue = 0;
    const handleInput = vi.fn((value) => {
      storeValue = value;
    });
    const wrapper = mount(UNumberInput, {
      propsData: {
        value: 0,
        min: 0,
        max: 10,
        step: 5,
      },
      listeners: {
        input: handleInput,
      },
    });
    const upBtn = wrapper.find('[role="up"]');
    const downBtn = wrapper.find('[role="down"]');
    const input = wrapper.find('input');

    upBtn.trigger('mousedown');
    await wrapper.vm.$nextTick();
    expect(handleInput).toBeCalled();
    expect(storeValue).toBe(5);
    upBtn.trigger('mousedown');
    upBtn.trigger('mousedown');
    upBtn.trigger('mousedown');
    expect(storeValue).toBe(10);
    downBtn.trigger('mousedown');
    expect(storeValue).toBe(5);
    downBtn.trigger('mousedown');
    downBtn.trigger('mousedown');
    downBtn.trigger('mousedown');
    expect(storeValue).toBe(0);

    input.element.value = 7;
    input.trigger('input');
    wrapper.vm.onEnter();
    expect(storeValue).toBe(7);
  });

  it('test compute currenvalue on value change', async () => {
    let storeValue = 0;
    const handleInput = vi.fn((value) => {
      storeValue = value;
    });
    const wrapper = mount(UNumberInput, {
      propsData: {
        value: 0,
        min: 0,
        max: 10,
        step: 5,
      },
      listeners: {
        input: handleInput,
      },
    });

    await wrapper.setProps({
      value: 7,
    });

    expect(storeValue).toBe(7);

    await wrapper.setProps({
      value: 100,
    });

    expect(storeValue).toBe(10);

    await wrapper.setProps({
      value: 7,
    });
    await wrapper.setProps({
      min: 10,
      max: 100,
    });
    expect(wrapper.vm.currentValue).toBe(10);
  });
});
