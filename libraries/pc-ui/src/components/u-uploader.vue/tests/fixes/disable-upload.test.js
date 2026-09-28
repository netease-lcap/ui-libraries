import {
  describe,
  test,
  expect,
  vi,
  afterEach,
} from 'vitest';
import Vue from 'vue';
import { mount } from '@vue/test-utils';
import Uploader from '../../index.vue';

const createFile = (name = 'test.txt') => new File(['content'], name, { type: 'text/plain' });

const mountUploader = (propsData = {}) => mount(Uploader, {
  propsData: {
    url: '/gateway/lowcode/api/v1/app/upload',
    draggable: true,
    pastable: true,
    ...propsData,
  },
});

describe('u-uploader 禁用文件上传', () => {
  afterEach(() => {
    Vue.prototype.$env.VUE_APP_DESIGNER = false;
  });

  test('disableUpload 开启后，拖拽不会触发上传', () => {
    const wrapper = mountUploader({ disableUpload: true });
    const uploadFiles = vi.spyOn(wrapper.vm, 'uploadFiles');

    wrapper.vm.onDrop({ dataTransfer: { files: [createFile()] } });

    expect(uploadFiles).not.toHaveBeenCalled();
    expect(wrapper.vm.currentValue.length).toBe(0);
  });

  test('disableUpload 开启后，粘贴不会触发上传', () => {
    const wrapper = mountUploader({ disableUpload: true });
    const uploadFiles = vi.spyOn(wrapper.vm, 'uploadFiles');

    wrapper.vm.onPaste({ clipboardData: { files: [createFile()] } });

    expect(uploadFiles).not.toHaveBeenCalled();
    expect(wrapper.vm.currentValue.length).toBe(0);
  });

  test('disableUpload 开启后，拖拽不展示拖拽激活态', () => {
    const wrapper = mountUploader({ disableUpload: true });

    wrapper.vm.onDragover();

    expect(wrapper.vm.dragover).toBe(false);
  });

  test('disableUpload 关闭时，拖拽与粘贴仍可上传', () => {
    const wrapper = mountUploader({ disableUpload: false });
    const uploadFiles = vi.spyOn(wrapper.vm, 'uploadFiles');

    wrapper.vm.onDragover();
    expect(wrapper.vm.dragover).toBe(true);

    wrapper.vm.onDrop({ dataTransfer: { files: [createFile()] } });
    expect(wrapper.vm.dragover).toBe(false);
    expect(uploadFiles).toHaveBeenCalledTimes(1);

    wrapper.vm.onPaste({ clipboardData: { files: [createFile('pasted.txt')] } });
    expect(uploadFiles).toHaveBeenCalledTimes(2);
  });
});
