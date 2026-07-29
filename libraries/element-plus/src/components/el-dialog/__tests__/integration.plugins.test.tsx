/**
 * el-dialog 插件集成测试
 * 完整覆盖 handleDialogRef 插件的所有逻辑
 */
import { describe, it, expect, vi } from 'vitest';
import { renderHooks } from '@ep-test/test-utils/render-hook';
import DialogBasicAccumulate from '../plugins/basic-plugins';

describe('el-dialog 插件集成测试', () => {
  describe('handleDialogRef - controllable value', () => {
    it('应该处理 modelValue 和 onUpdate:modelValue', async () => {
      const plugins = DialogBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onUpdate = vi.fn();
      const props = {
        modelValue: false,
        'onUpdate:modelValue': onUpdate,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.modelValue).toBe(false);
    });

    it('应该使用 value 作为 fallback', async () => {
      const plugins = DialogBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: true,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.modelValue).toBe(true);
    });

    it('应该 modelValue 优先于 value', async () => {
      const plugins = DialogBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: false,
        value: true,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.modelValue).toBe(false);
    });
  });

  describe('handleDialogRef - ref methods', () => {
    it('应该提供 open 方法', async () => {
      const plugins = DialogBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onUpdate = vi.fn();
      const props = {
        modelValue: false,
        'onUpdate:modelValue': onUpdate,
        ref: {},
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.ref.open).toBeDefined();
      expect(typeof currentValue.value.ref.open).toBe('function');

      currentValue.value.ref.open();
      expect(onUpdate).toHaveBeenCalledWith(true);
    });

    it('应该提供 close 方法', async () => {
      const plugins = DialogBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onUpdate = vi.fn();
      const props = {
        modelValue: true,
        'onUpdate:modelValue': onUpdate,
        ref: {},
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.ref.close).toBeDefined();
      expect(typeof currentValue.value.ref.close).toBe('function');

      currentValue.value.ref.close();
      expect(onUpdate).toHaveBeenCalledWith(false);
    });

    it('应该保留原有的 ref 属性', async () => {
      const plugins = DialogBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const customMethod = vi.fn();
      const props = {
        modelValue: false,
        ref: {
          customMethod,
        },
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.ref.customMethod).toBe(customMethod);
      expect(currentValue.value.ref.open).toBeDefined();
      expect(currentValue.value.ref.close).toBeDefined();
    });

    it('应该在没有 onUpdate:modelValue 时也能调用 open/close', async () => {
      const plugins = DialogBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: false,
        ref: {},
      };

      const { currentValue } = await renderHooks(plugins, props);

      // 不应该抛出错误
      expect(() => currentValue.value.ref.open()).not.toThrow();
      expect(() => currentValue.value.ref.close()).not.toThrow();
    });
  });

  describe('handleDialogRef - closeIcon', () => {
    it('应该处理 closeIcon', async () => {
      const plugins = DialogBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        closeIcon: 'Close',
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.closeIcon).toBeDefined();
    });

    it('应该在没有 closeIcon 时返回默认处理', async () => {
      const plugins = DialogBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {};

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.closeIcon).toBeDefined();
    });

    it('应该处理空字符串 closeIcon', async () => {
      const plugins = DialogBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        closeIcon: '',
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.closeIcon).toBeDefined();
    });
  });

  describe('handleDialogRef - beforeClose', () => {
    it('应该处理 onBeforeClose 回调', async () => {
      const plugins = DialogBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onBeforeClose = vi.fn();
      const props = {
        onBeforeClose,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.beforeClose).toBeDefined();
      expect(typeof currentValue.value.beforeClose).toBe('function');
    });

    it('应该调用 onBeforeClose 和 done 函数', async () => {
      const plugins = DialogBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onBeforeClose = vi.fn();
      const done = vi.fn();
      const props = {
        onBeforeClose,
      };

      const { currentValue } = await renderHooks(plugins, props);

      currentValue.value.beforeClose(done);

      expect(onBeforeClose).toHaveBeenCalled();
      expect(done).toHaveBeenCalled();
    });

    it('应该在没有 onBeforeClose 时使用默认行为', async () => {
      const plugins = DialogBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const done = vi.fn();
      const props = {};

      const { currentValue } = await renderHooks(plugins, props);

      currentValue.value.beforeClose(done);

      expect(done).toHaveBeenCalled();
    });

    it('应该处理 onBeforeClose 抛出错误的情况', async () => {
      const plugins = DialogBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onBeforeClose = vi.fn(() => {
        throw new Error('test error');
      });
      const done = vi.fn();
      const props = {
        onBeforeClose,
      };

      const { currentValue } = await renderHooks(plugins, props);

      // 不应该抛出错误，done 仍应被调用
      expect(() => currentValue.value.beforeClose(done)).not.toThrow();
      expect(done).toHaveBeenCalled();
    });
  });

  describe('props 更新响应式测试', () => {
    it('应该响应 modelValue 的变化', async () => {
      const plugins = DialogBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onUpdate = vi.fn();
      const props = {
        modelValue: false,
        'onUpdate:modelValue': onUpdate,
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.modelValue).toBe(false);

      await setValue({ modelValue: true, 'onUpdate:modelValue': onUpdate });

      expect(currentValue.value.modelValue).toBe(true);
    });

    it('应该响应 closeIcon 的变化', async () => {
      const plugins = DialogBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        closeIcon: 'Close',
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      const originalIcon = currentValue.value.closeIcon;

      await setValue({ closeIcon: 'X' });

      expect(currentValue.value.closeIcon).not.toBe(originalIcon);
    });

    it('应该响应 onBeforeClose 的变化', async () => {
      const plugins = DialogBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onBeforeClose1 = vi.fn();
      const onBeforeClose2 = vi.fn();
      const props = {
        onBeforeClose: onBeforeClose1,
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      const done = vi.fn();
      currentValue.value.beforeClose(done);
      expect(onBeforeClose1).toHaveBeenCalled();

      await setValue({ onBeforeClose: onBeforeClose2 });

      currentValue.value.beforeClose(done);
      expect(onBeforeClose2).toHaveBeenCalled();
    });
  });

  describe('交叉测试：完整工作流', () => {
    it('应该支持完整的打开-关闭流程', async () => {
      const plugins = DialogBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onUpdate = vi.fn();
      const onBeforeClose = vi.fn();
      const props = {
        modelValue: false,
        'onUpdate:modelValue': onUpdate,
        onBeforeClose,
        closeIcon: 'Close',
        ref: {},
      };

      const { currentValue } = await renderHooks(plugins, props);

      // 1. 初始状态
      expect(currentValue.value.modelValue).toBe(false);

      // 2. 打开对话框
      currentValue.value.ref.open();
      expect(onUpdate).toHaveBeenCalledWith(true);

      // 3. 关闭对话框
      const done = vi.fn();
      currentValue.value.beforeClose(done);
      expect(onBeforeClose).toHaveBeenCalled();
      expect(done).toHaveBeenCalled();

      // 4. 通过 ref 关闭
      currentValue.value.ref.close();
      expect(onUpdate).toHaveBeenCalledWith(false);
    });

    it('应该处理所有属性同时存在的情况', async () => {
      const plugins = DialogBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onUpdate = vi.fn();
      const onBeforeClose = vi.fn();
      const customMethod = vi.fn();
      const props = {
        modelValue: true,
        value: false,
        'onUpdate:modelValue': onUpdate,
        onBeforeClose,
        closeIcon: 'Close',
        ref: {
          customMethod,
          existingProp: 'value',
        },
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.modelValue).toBe(true);
      expect(currentValue.value.ref.open).toBeDefined();
      expect(currentValue.value.ref.close).toBeDefined();
      expect(currentValue.value.ref.customMethod).toBe(customMethod);
      expect(currentValue.value.ref.existingProp).toBe('value');
      expect(currentValue.value.closeIcon).toBeDefined();
      expect(currentValue.value.beforeClose).toBeDefined();
    });
  });
});
