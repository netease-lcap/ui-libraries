/**
 * el-drawer 插件集成测试
 * 完整覆盖 handleDrawerRef 插件的所有逻辑
 */
import { describe, it, expect, vi } from 'vitest';
import { renderHooks } from '@ep-test/test-utils/render-hook';
import DrawerBasicAccumulate from '../plugins/index';

describe('el-drawer 插件集成测试', () => {
  describe('handleDrawerRef - controllable value', () => {
    it('应该处理 modelValue 和 onUpdate:modelValue', async () => {
      const plugins = DrawerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onUpdate = vi.fn();
      const props = {
        modelValue: false,
        'onUpdate:modelValue': onUpdate,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.modelValue).toBe(false);
    });

    it('应该使用 value 作为 fallback', async () => {
      const plugins = DrawerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: true,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.modelValue).toBe(true);
    });

    it('应该 modelValue 优先于 value', async () => {
      const plugins = DrawerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: false,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.modelValue).toBe(false);
    });
  });

  describe('handleDrawerRef - ref methods', () => {
    it('应该提供 open 方法', async () => {
      const plugins = DrawerBasicAccumulate.getPluginMethod({ isInDesigner: false });
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
      const plugins = DrawerBasicAccumulate.getPluginMethod({ isInDesigner: false });
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
      const plugins = DrawerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const customMethod = vi.fn();
      const props = {
        modelValue: false,
        ref: {
          customMethod,
          customProp: 'value',
        },
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.ref.customMethod).toBe(customMethod);
      expect(currentValue.value.ref.customProp).toBe('value');
      expect(currentValue.value.ref.open).toBeDefined();
      expect(currentValue.value.ref.close).toBeDefined();
    });
  });

  describe('handleDrawerRef - beforeClose', () => {
    it('应该处理 onBeforeClose 回调', async () => {
      const plugins = DrawerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onBeforeClose = vi.fn();
      const props = {
        onBeforeClose,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.beforeClose).toBeDefined();
      expect(typeof currentValue.value.beforeClose).toBe('function');
    });

    it('应该调用 onBeforeClose', async () => {
      const plugins = DrawerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onBeforeClose = vi.fn();
      const done = vi.fn();
      const props = {
        onBeforeClose,
      };

      const { currentValue } = await renderHooks(plugins, props);

      currentValue.value.beforeClose(done);

      expect(onBeforeClose).toHaveBeenCalledWith(done);
    });

    it('应该在没有 onBeforeClose 时使用默认行为', async () => {
      const plugins = DrawerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const done = vi.fn();
      const props = {};

      const { currentValue } = await renderHooks(plugins, props);

      currentValue.value.beforeClose(done);

      expect(done).toHaveBeenCalled();
    });

    it('应该处理多个参数传递给 beforeClose', async () => {
      const plugins = DrawerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onBeforeClose = vi.fn();
      const done = vi.fn();
      const arg1 = 'test';
      const arg2 = 123;
      const props = {
        onBeforeClose,
      };

      const { currentValue } = await renderHooks(plugins, props);

      currentValue.value.beforeClose(done, arg1, arg2);

      expect(onBeforeClose).toHaveBeenCalledWith(done, arg1, arg2);
    });

    it('应该处理 onBeforeClose 抛出错误的情况', async () => {
      const plugins = DrawerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onBeforeClose = vi.fn(() => {
        throw new Error('test error');
      });
      const done = vi.fn();
      const props = {
        onBeforeClose,
      };

      const { currentValue } = await renderHooks(plugins, props);

      // 不应该抛出错误
      expect(() => currentValue.value.beforeClose(done)).not.toThrow();
    });
  });

  describe('props 更新响应式测试', () => {
    it('应该响应 modelValue 的变化', async () => {
      const plugins = DrawerBasicAccumulate.getPluginMethod({ isInDesigner: false });
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

    it('应该响应 onBeforeClose 的变化', async () => {
      const plugins = DrawerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onBeforeClose1 = vi.fn();
      const onBeforeClose2 = vi.fn();
      const done = vi.fn();
      const props = {
        onBeforeClose: onBeforeClose1,
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      currentValue.value.beforeClose(done);
      expect(onBeforeClose1).toHaveBeenCalled();

      await setValue({ onBeforeClose: onBeforeClose2 });

      currentValue.value.beforeClose(done);
      expect(onBeforeClose2).toHaveBeenCalled();
    });
  });

  describe('交叉测试：完整工作流', () => {
    it('应该支持完整的打开-关闭流程', async () => {
      const plugins = DrawerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onUpdate = vi.fn();
      const onBeforeClose = vi.fn();
      const props = {
        modelValue: false,
        'onUpdate:modelValue': onUpdate,
        onBeforeClose,
        ref: {},
      };

      const { currentValue } = await renderHooks(plugins, props);

      // 1. 初始状态
      expect(currentValue.value.modelValue).toBe(false);

      // 2. 打开抽屉
      currentValue.value.ref.open();
      expect(onUpdate).toHaveBeenCalledWith(true);

      // 3. 关闭抽屉
      const done = vi.fn();
      currentValue.value.beforeClose(done);
      expect(onBeforeClose).toHaveBeenCalled();

      // 4. 通过 ref 关闭
      currentValue.value.ref.close();
      expect(onUpdate).toHaveBeenCalledWith(false);
    });

    it('应该处理从关闭到打开再到关闭的完整循环', async () => {
      const plugins = DrawerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onUpdate = vi.fn();
      const props = {
        modelValue: false,
        'onUpdate:modelValue': onUpdate,
        ref: {},
      };

      const { currentValue } = await renderHooks(plugins, props);

      // 打开
      currentValue.value.ref.open();
      expect(onUpdate).toHaveBeenNthCalledWith(1, true);

      // 关闭
      currentValue.value.ref.close();
      expect(onUpdate).toHaveBeenNthCalledWith(2, false);

      // 再次打开
      currentValue.value.ref.open();
      expect(onUpdate).toHaveBeenNthCalledWith(3, true);

      // 再次关闭
      currentValue.value.ref.close();
      expect(onUpdate).toHaveBeenNthCalledWith(4, false);
    });

    it('应该处理所有属性同时存在的情况', async () => {
      const plugins = DrawerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onUpdate = vi.fn();
      const onBeforeClose = vi.fn();
      const customMethod = vi.fn();
      const props = {
        modelValue: true,
        value: false,
        'onUpdate:modelValue': onUpdate,
        onBeforeClose,
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
      expect(currentValue.value.beforeClose).toBeDefined();
    });
  });

  describe('边界条件测试', () => {
    it('应该处理 undefined modelValue', async () => {
      const plugins = DrawerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: undefined,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.modelValue).toBeUndefined();
    });

    it('应该处理 null modelValue', async () => {
      const plugins = DrawerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: null,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.modelValue).toBeNull();
    });

    it('应该处理没有 ref 的情况', async () => {
      const plugins = DrawerBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onUpdate = vi.fn();
      const props = {
        modelValue: false,
        'onUpdate:modelValue': onUpdate,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.ref).toBeDefined();
      expect(currentValue.value.ref.open).toBeDefined();
      expect(currentValue.value.ref.close).toBeDefined();
    });
  });
});
