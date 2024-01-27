import {
  describe,
  it,
  expect,
  vi as jest,
} from 'vitest';
import { mount } from '@vue/test-utils';
import { UDrawer } from '../../index.js';

describe('u-drawer.vue events test', () => {
  it('should $emit once open', async () => {
    const handleOpen = jest.fn();
    const wrapper = mount(UDrawer, {
      listeners: {
        open: handleOpen,
      },
    });

    wrapper.vm.open();
    expect(handleOpen).toBeCalledTimes(1);
  });
});
