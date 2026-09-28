/**
 * el-upload 插件集成测试
 * 覆盖核心插件：handleTagName, handleResponse, handleRequestHeaders, handleEvent
 */
import { describe, it, expect, vi } from 'vitest';
import { renderHooks } from '@ep-test/test-utils/render-hook';
import UploadBasicAccumulate from '../plugins/basic-plugins';

describe('el-upload 插件集成测试', () => {
  describe('handleTagName', () => {
    it('应该设置正确的 tagName', async () => {
      const plugins = UploadBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {};

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.tagName).toBe('el-upload');
      expect(currentValue.value.formTagName).toBe('el-form-upload');
    });
  });

  describe('handleResponse - 文件列表和值处理', () => {
    it('应该处理 value 和 setValue', async () => {
      const plugins = UploadBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onUpdate = vi.fn();
      const props = {
        modelValue: '',
        'onUpdate:modelValue': onUpdate,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.value).toBe('');
      expect(currentValue.value.setValue).toBeDefined();
    });

    it('应该处理 fileList', async () => {
      const plugins = UploadBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: '',
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.fileList).toBeDefined();
      expect(Array.isArray(currentValue.value.fileList)).toBe(true);
    });

    it('应该提供 onChange 回调', async () => {
      const plugins = UploadBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onChange = vi.fn();
      const props = {
        modelValue: '',
        onChange,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.onChange).toBeDefined();
      expect(typeof currentValue.value.onChange).toBe('function');
    });

    it('应该提供 onRemove 回调', async () => {
      const plugins = UploadBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onRemove = vi.fn();
      const props = {
        modelValue: '',
        onRemove,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.onRemove).toBeDefined();
      expect(typeof currentValue.value.onRemove).toBe('function');
    });
  });

  describe('handleRequestHeaders - 请求头处理', () => {
    it('应该处理 headers 属性', async () => {
      const plugins = UploadBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        headers: { 'X-Custom-Header': 'value' },
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.headers).toBeDefined();
      expect(currentValue.value.headers['X-Custom-Header']).toBe('value');
    });

    it('应该处理 access 属性', async () => {
      const plugins = UploadBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        access: 'public',
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.headers['lcap-access']).toBe('public');
    });

    it('应该处理 ttl 和 ttlValue', async () => {
      const plugins = UploadBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        ttl: true,
        ttlValue: 3600,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.headers['lcap-ttl']).toBe(3600);
    });
  });

  describe('handleRequestData - 请求数据处理', () => {
    it('应该处理 data 属性', async () => {
      const plugins = UploadBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        data: { key: 'value' },
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.data.key).toBe('value');
    });

    it('应该处理 lcapIsCompress', async () => {
      const plugins = UploadBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        lcapIsCompress: true,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.data.lcapIsCompress).toBe(true);
    });

    it('应该处理 viaOriginURL', async () => {
      const plugins = UploadBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        viaOriginURL: true,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.data.viaOriginURL).toBe(true);
    });

    it('应该设置默认 action', async () => {
      const plugins = UploadBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {};

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.action).toBe('/upload');
    });
  });

  describe('handleEvent - 事件处理', () => {
    it('应该提供 beforeUpload 回调', async () => {
      const plugins = UploadBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onBeforeUpload = vi.fn().mockReturnValue(true);
      const props = {
        onBeforeUpload,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.beforeUpload).toBeDefined();
      expect(typeof currentValue.value.beforeUpload).toBe('function');
    });

    it('应该在文件大小超限时返回 false', async () => {
      const plugins = UploadBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        fileSizeLimit: 1, // 1MB
      };

      const { currentValue } = await renderHooks(plugins, props);

      const largeFile = { size: 2 * 1024 * 1024 }; // 2MB
      const result = currentValue.value.beforeUpload(largeFile);

      expect(result).toBe(false);
    });

    it('应该提供 onExceed 回调', async () => {
      const plugins = UploadBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onExceed = vi.fn();
      const props = {
        onExceed,
        limit: 3,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.onExceed).toBeDefined();
      expect(typeof currentValue.value.onExceed).toBe('function');
    });

    it('应该提供 beforeRemove 回调', async () => {
      const plugins = UploadBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onBeforeRemove = vi.fn();
      const props = {
        onBeforeRemove,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.beforeRemove).toBeDefined();
      expect(typeof currentValue.value.beforeRemove).toBe('function');
    });
  });

  describe('handleSlots - 插槽处理', () => {
    it('应该处理 triggerUploadText', async () => {
      const plugins = UploadBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        triggerUploadText: '点击上传',
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.triggerUploadText).toBe('点击上传');
    });

    it('应该使用默认 triggerUploadText', async () => {
      const plugins = UploadBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {};

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.triggerUploadText).toBe('上传到服务器');
    });

    it('应该处理 drag 模式', async () => {
      const plugins = UploadBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        drag: true,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.slots).toBeDefined();
    });

    it('应该处理 listType picture-card', async () => {
      const plugins = UploadBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        listType: 'picture-card',
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.slots).toBeDefined();
    });
  });

  describe('props 更新响应式测试', () => {
    it('应该响应 headers 的变化', async () => {
      const plugins = UploadBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        headers: { 'X-Test': 'v1' },
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.headers['X-Test']).toBe('v1');

      await setValue({ headers: { 'X-Test': 'v2' } });

      expect(currentValue.value.headers['X-Test']).toBe('v2');
    });

    it('应该响应 data 的变化', async () => {
      const plugins = UploadBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        data: { key: 'value1' },
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.data.key).toBe('value1');

      await setValue({ data: { key: 'value2' } });

      expect(currentValue.value.data.key).toBe('value2');
    });
  });

  describe('交叉测试：完整上传流程', () => {
    it('应该支持完整的文件上传流程', async () => {
      const plugins = UploadBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onBeforeUpload = vi.fn().mockReturnValue(true);
      const onChange = vi.fn();
      const onUpdate = vi.fn();
      const props = {
        modelValue: '',
        'onUpdate:modelValue': onUpdate,
        headers: { 'X-Token': 'test' },
        data: { folder: 'uploads' },
        fileSizeLimit: 10,
        onBeforeUpload,
        onChange,
      };

      const { currentValue } = await renderHooks(plugins, props);

      // 验证配置
      expect(currentValue.value.headers['X-Token']).toBe('test');
      expect(currentValue.value.data.folder).toBe('uploads');
      expect(currentValue.value.beforeUpload).toBeDefined();
      expect(currentValue.value.onChange).toBeDefined();

      // 模拟上传前验证
      const file = { size: 5 * 1024 * 1024 }; // 5MB
      const canUpload = currentValue.value.beforeUpload(file);
      expect(canUpload).toBe(true);
      expect(onBeforeUpload).toHaveBeenCalled();
    });
  });
});
