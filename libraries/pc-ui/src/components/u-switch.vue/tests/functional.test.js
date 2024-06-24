import {
  describe,
  it,
  vi,
  expect,
} from 'vitest';
import { mount } from '@vue/test-utils';
import { USwitch } from '../index.js';

describe('u-switch.vue functional tests', () => {
  it('test switch toggle & value change', async () => {
    let storyValue = false;
    const handleInput = vi.fn((value) => {
      storyValue = value;
    });
    const wrapper = mount(USwitch, {
      propsData: {
        value: storyValue,
      },
      listeners: {
        input: handleInput,
        'update:value': handleInput,
      },
    });

    const handle = wrapper.find('label');

    handle.trigger('click');
    await wrapper.vm.$nextTick();
    expect(handleInput).toBeCalledTimes(2);
    expect(storyValue).toBe(true);
    // expect(wrapper.emittedByOrder().map((e) => e.name)).toEqual(['sync:value', 'before-toggle', 'input', 'update:value', 'on', 'toggle', 'sync:value', 'change']);
    handle.trigger('click');
    await wrapper.vm.$nextTick();
    expect(storyValue).toBe(false);
    expect(wrapper.emitted().off).toBeTruthy();

    await wrapper.setProps({ value: true });
    handle.trigger('click');
    await wrapper.vm.$nextTick();
    expect(storyValue).toBe(false);
    expect(wrapper.emitted().off).toBeTruthy();
  });
});
