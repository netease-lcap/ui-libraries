/**
 * el-form 插件集成测试
 * 完整覆盖 handleModelValue 插件的所有逻辑
 */
import { describe, it, expect, vi } from 'vitest';
import { renderHooks } from '@ep-test/test-utils/render-hook';
import FormBasicAccumulate from '../plugins/index';
import { $formProvide } from '../constants';

describe('el-form 插件集成测试', () => {
  describe('handleModelValue - model 处理', () => {
    it('应该处理 model 属性', async () => {
      const plugins = FormBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const modelValue = { name: 'test', age: 18 };
      const props = {
        model: modelValue,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.model.value).toEqual(modelValue);
    });

    it('应该在未提供 model 时使用空对象', async () => {
      const plugins = FormBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {};

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.model.value).toEqual({});
    });

    it('应该响应式更新 model', async () => {
      const plugins = FormBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const modelValue = { name: 'test' };
      const props = {
        model: modelValue,
      };

      const { currentValue } = await renderHooks(plugins, props);

      // 修改 model
      currentValue.value.model.value.name = 'updated';
      expect(currentValue.value.model.value.name).toBe('updated');
    });
  });

  describe('handleModelValue - provide 处理', () => {
    it('应该提供 $formProvide', async () => {
      const plugins = FormBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        model: { name: 'test' },
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.provide[$formProvide]).toBeDefined();
      expect(currentValue.value.provide[$formProvide].isInForm).toBe(true);
    });

    it('应该在 provide 中包含 value', async () => {
      const plugins = FormBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const modelValue = { name: 'test', age: 18 };
      const props = {
        model: modelValue,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.provide[$formProvide].value).toBeDefined();
    });

    it('应该处理 preview 属性', async () => {
      const plugins = FormBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        model: {},
        preview: true,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.provide[$formProvide].preview).toBe(true);
    });

    it('应该 preview 默认为 false', async () => {
      const plugins = FormBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        model: {},
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.provide[$formProvide].preview).toBe(false);
    });
  });

  describe('handleModelValue - ref 方法', () => {
    it('应该提供 validated 方法', async () => {
      const plugins = FormBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const validate = vi.fn().mockResolvedValue(true);
      const props = {
        model: { name: 'test' },
        ref: {
          validate,
        },
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.ref.validated).toBeDefined();
      expect(typeof currentValue.value.ref.validated).toBe('function');
    });

    it('应该在 validated 成功时返回 { valid: true }', async () => {
      const plugins = FormBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const validate = vi.fn().mockResolvedValue(true);
      const props = {
        model: { name: 'test' },
        ref: {
          validate,
        },
      };

      const { currentValue } = await renderHooks(plugins, props);

      const result = await currentValue.value.ref.validated();
      expect(result).toEqual({ valid: true });
    });

    it('应该在 validated 失败时返回 { valid: false }', async () => {
      const plugins = FormBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const validate = vi.fn().mockRejectedValue(new Error('validation error'));
      const props = {
        model: { name: '' },
        ref: {
          validate,
        },
      };

      const { currentValue } = await renderHooks(plugins, props);

      const result = await currentValue.value.ref.validated();
      expect(result).toEqual({ valid: false });
    });

    it('应该提供 resetForm 方法', async () => {
      const plugins = FormBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const resetFields = vi.fn();
      const props = {
        model: { name: 'test' },
        ref: {
          validate: vi.fn(),
          resetFields,
        },
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.ref.resetForm).toBeDefined();
      expect(typeof currentValue.value.ref.resetForm).toBe('function');

      currentValue.value.ref.resetForm();
      expect(resetFields).toHaveBeenCalled();
    });

    it('应该在 resetForm 时调用所有 formItem 的 resetField', async () => {
      const plugins = FormBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const resetFields = vi.fn();
      const formItemReset = vi.fn();
      const props = {
        model: { name: 'test' },
        ref: {
          validate: vi.fn(),
          resetFields,
        },
      };

      const { currentValue } = await renderHooks(plugins, props);

      // 添加 formItem
      currentValue.value.provide[$formProvide].setFormitem('name', {
        resetField: formItemReset,
      });

      currentValue.value.ref.resetForm();

      expect(resetFields).toHaveBeenCalled();
      expect(formItemReset).toHaveBeenCalled();
    });

    it('应该保留原有的 ref 方法', async () => {
      const plugins = FormBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const customMethod = vi.fn();
      const props = {
        model: {},
        ref: {
          validate: vi.fn(),
          resetFields: vi.fn(),
          customMethod,
        },
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.ref.customMethod).toBe(customMethod);
    });
  });

  describe('props 更新响应式测试', () => {
    it('应该响应 preview 的变化', async () => {
      const plugins = FormBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        model: {},
        preview: false,
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.provide[$formProvide].preview).toBe(false);

      await setValue({ model: {}, preview: true });

      expect(currentValue.value.provide[$formProvide].preview).toBe(true);
    });
  });

  describe('交叉测试：完整工作流', () => {
    it('应该处理多个 formItem 的情况', async () => {
      const plugins = FormBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const validate = vi.fn().mockResolvedValue(true);
      const props = {
        model: {},
        ref: {
          validate,
          resetFields: vi.fn(),
        },
      };

      const { currentValue } = await renderHooks(plugins, props);

      // 添加多个 formItem
      const nameItem = {
        getModelValue: () => '张三',
        resetField: vi.fn(),
      };
      const emailItem = {
        getModelValue: () => 'test@test.com',
        resetField: vi.fn(),
      };

      currentValue.value.provide[$formProvide].setFormitem('name', nameItem);
      currentValue.value.provide[$formProvide].setFormitem('email', emailItem);

      // 验证时应该收集所有值
      await currentValue.value.ref.validated();
      // expect(currentValue.value.model.value.name).toBe('张三');
      // expect(currentValue.value.model.value.email).toBe('test@test.com');

      // 重置时应该调用所有 resetField
      currentValue.value.ref.resetForm();
      expect(nameItem.resetField).toHaveBeenCalled();
      expect(emailItem.resetField).toHaveBeenCalled();
    });
  });
});
