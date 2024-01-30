import {
  describe,
  it,
  vi as jest,
  expect,
} from 'vitest';
import { mount } from '@vue/test-utils';
import { UInput } from '../../index.js';

describe('u-input.vue events test', () => {
  it('should $emit input', () => {
    const handleInput = jest.fn();
    const wrapper = mount(UInput, {
      listeners: {
        input: handleInput,
        'update:value': handleInput,
      },
    });

    const inputText = '123';

    const input = wrapper.find('input');
    input.element.value = inputText;
    input.trigger('input');

    expect(wrapper.emitted('input')[0][0]).toEqual(inputText);
    expect(wrapper.emitted('update:value')[0][0]).toEqual(inputText);
    expect(handleInput).toBeCalledTimes(2);
  });

  it('should $emit before input', () => {
    const handleInput = jest.fn();
    const handleBeforeInput = jest.fn(({ oldValue, value, preventDefault }) => {
      preventDefault();
    });
    const wrapper = mount(UInput, {
      propsData: {
        value: '123',
      },
      listeners: {
        input: handleInput,
        'update:value': handleInput,
        'before-input': handleBeforeInput,
      },
    });

    const inputText = '233';

    const input = wrapper.find('input');
    input.element.value = inputText;
    input.trigger('input');

    expect(handleInput).toBeCalledTimes(0);
    expect(handleBeforeInput).toBeCalled();
    expect(wrapper.emitted('before-input')[0][0].oldValue).toBe('123');
    expect(wrapper.emitted('before-input')[0][0].value).toBe(inputText);
  });

  it('should $emit change', () => {
    const handleChange = jest.fn();
    const handleInput = jest.fn();
    const inputText = '123';
    const wrapper = mount(UInput, {
      props: {
        value: inputText,
      },
      listeners: {
        change: handleChange,
        input: handleInput,
      },
    });

    const input = wrapper.find('input');
    input.element.value = inputText;
    input.trigger('input');

    expect(handleChange).toBeCalledTimes(0);
    expect(handleInput).toBeCalled();
    expect(handleInput).toBeCalledTimes(1);
  });

  it('should focus or blur', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    const wrapper = mount(UInput, {
      props: {
        value: '123',
        autofocus: true,
      },
      listeners: {
        focus: handleFocus,
        blur: handleBlur,
      },
    });

    const input = wrapper.find('input');
    wrapper.vm.blur();
    wrapper.vm.focus();
    // jsdom focus 有bug 手动调一下
    wrapper.vm.onFocus();
    expect(handleFocus).toBeCalled();

    input.trigger('blur');
    expect(handleBlur).toBeCalledTimes(1);
  });

  it('should clearable', async () => {
    const handleChange = jest.fn();
    const handleInput = jest.fn();
    const inputText = '123';
    const wrapper = mount(UInput, {
      props: {
        clearable: true,
        value: inputText,
      },
      listeners: {
        change: handleChange,
        input: handleInput,
      },
    });

    wrapper.vm.clear();

    await wrapper.vm.$nextTick();

    expect(handleChange).toBeCalled();
    expect(handleInput).toBeCalled();
    expect(wrapper.emitted().clear).toBeTruthy();
  });

  it('should $emit keyboard events', async () => {
    const handleKeydown = jest.fn();
    const handleKeyup = jest.fn();

    const wrapper = mount(UInput, {
      props: {},
      listeners: {
        keydown: handleKeydown,
        keyup: handleKeyup,
      },
    });

    const input = wrapper.find('input');
    input.element.value = '123';
    input.trigger('keydown.enter');
    input.trigger('keydown', {
      keyCode: 13,
      code: 13,
    });
    input.trigger('keyup');

    expect(handleKeydown).toBeCalled();
    expect(handleKeyup).toBeCalled();
  });

  it('should change password', async () => {
    const wrapper = mount(UInput, {
      props: {
        password: true,
        type: 'password',
      },
    });

    wrapper.vm.togglePassword();
    expect(wrapper.vm.curType).toBe('text');
    wrapper.vm.togglePassword();
    expect(wrapper.vm.curType).toBe('password');
  });
});
