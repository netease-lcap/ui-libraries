import {
  describe,
  it,
  expect,
} from 'vitest';
import { mount } from '@vue/test-utils';
import { UTextarea } from '../index.js';

const sleep = (ms) => new Promise((resolve) => { setTimeout(() => resolve(true), ms); });

describe('u-textarea.vue functional tests', () => {
  const initHeight = '200px';
  it('test adjustSize', async () => {
    const wrapper = mount(UTextarea, {
      propsData: {
        autosize: true,
        initHeight,
        value: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
        style: { width: 100 },
      },
    });

    const textarea = wrapper.find('textarea');

    textarea.element.value = '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈';
    textarea.trigger('input');

    await sleep(16);
    expect(wrapper.vm.height).toBe(initHeight);

    wrapper.vm.onDragStart();
    expect(wrapper.vm.startWidth).toBe(0);
    wrapper.vm.onDrag({ dragY: 20 });
    expect(wrapper.vm.height).toBe('20px');

    await wrapper.setProps({
      resize: 'horizontal',
    });

    wrapper.vm.onDrag({ dragX: 40 });
    expect(wrapper.vm.width).toBe('40px');
  });
});
