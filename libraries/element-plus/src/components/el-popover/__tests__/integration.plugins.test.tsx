/**
 * el-popover 插件集成测试
 * 完整覆盖 handlePopperClass 插件的所有逻辑
 */
import { describe, it, expect, vi } from 'vitest';
import { renderHooks } from '@ep-test/test-utils/render-hook';
import PopoverBasicAccumulate from '../plugins/basic-plugins';

describe('el-popover 插件集成测试', () => {
  describe('handlePopperClass - popperClass 处理', () => {
    it('应该合并 popperClass 和 class', async () => {
      const plugins = PopoverBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        popperClass: 'custom-popper',
        class: 'custom-class',
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.popperClass).toBe('custom-popper custom-class');
    });

    it('应该只使用 popperClass 当 class 未提供时', async () => {
      const plugins = PopoverBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        popperClass: 'custom-popper',
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.popperClass).toBe('custom-popper undefined');
    });

    it('应该只使用 class 当 popperClass 未提供时', async () => {
      const plugins = PopoverBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        class: 'custom-class',
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.popperClass).toBe('undefined custom-class');
    });

    it('应该处理空字符串', async () => {
      const plugins = PopoverBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        popperClass: '',
        class: '',
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.popperClass).toBe(' ');
    });

    it('应该处理多个类名', async () => {
      const plugins = PopoverBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        popperClass: 'class1 class2',
        class: 'class3 class4',
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.popperClass).toBe('class1 class2 class3 class4');
    });
  });

  describe('handlePopperClass - controllable visible', () => {
    it('应该处理 visible 和 onUpdate:visible', async () => {
      const plugins = PopoverBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onUpdate = vi.fn();
      const props = {
        visible: false,
        'onUpdate:visible': onUpdate,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.visible).toBe(false);
    });

    it('应该提供 open 方法', async () => {
      const plugins = PopoverBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onUpdate = vi.fn();
      const props = {
        visible: false,
        'onUpdate:visible': onUpdate,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.ref.show).toBeDefined();
      expect(typeof currentValue.value.ref.show).toBe('function');

      currentValue.value.ref.show();
      expect(onUpdate).toHaveBeenCalledWith(true);
    });

    it('应该提供 close 方法', async () => {
      const plugins = PopoverBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onUpdate = vi.fn();
      const props = {
        visible: true,
        'onUpdate:visible': onUpdate,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.ref.hide).toBeDefined();
      expect(typeof currentValue.value.ref.hide).toBe('function');

      currentValue.value.ref.hide();
      expect(onUpdate).toHaveBeenCalledWith(false);
    });

    it('应该在没有 onUpdate:visible 时也能调用 open/close', async () => {
      const plugins = PopoverBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        visible: false,
      };

      const { currentValue } = await renderHooks(plugins, props);

      // 不应该抛出错误
      expect(() => currentValue.value.ref.show()).not.toThrow();
      expect(() => currentValue.value.ref.hide()).not.toThrow();
    });
  });

  describe('props 更新响应式测试', () => {
    it('应该响应 popperClass 的变化', async () => {
      const plugins = PopoverBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        popperClass: 'class1',
        class: 'class2',
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.popperClass).toBe('class1 class2');

      await setValue({ popperClass: 'new-class1', class: 'class2' });

      expect(currentValue.value.popperClass).toBe('new-class1 class2');
    });

    it('应该响应 class 的变化', async () => {
      const plugins = PopoverBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        popperClass: 'class1',
        class: 'class2',
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.popperClass).toBe('class1 class2');

      await setValue({ popperClass: 'class1', class: 'new-class2' });

      expect(currentValue.value.popperClass).toBe('class1 new-class2');
    });

    it('应该响应 visible 的变化', async () => {
      const plugins = PopoverBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onUpdate = vi.fn();
      const props = {
        visible: false,
        'onUpdate:visible': onUpdate,
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.visible).toBe(false);

      await setValue({ visible: true, 'onUpdate:visible': onUpdate });

      expect(currentValue.value.visible).toBe(true);
    });
  });

  describe('交叉测试：完整工作流', () => {
    it('应该同时处理 class 和 visible', async () => {
      const plugins = PopoverBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onUpdate = vi.fn();
      const props = {
        popperClass: 'popper-class',
        class: 'custom-class',
        visible: false,
        'onUpdate:visible': onUpdate,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.popperClass).toBe('popper-class custom-class');
      expect(currentValue.value.visible).toBe(false);
      expect(currentValue.value.ref.show).toBeDefined();
      expect(currentValue.value.ref.hide).toBeDefined();
    });

    it('应该支持完整的显示-隐藏流程', async () => {
      const plugins = PopoverBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onUpdate = vi.fn();
      const props = {
        popperClass: 'my-popover',
        visible: false,
        'onUpdate:visible': onUpdate,
      };

      const { currentValue } = await renderHooks(plugins, props);

      // 初始状态
      expect(currentValue.value.visible).toBe(false);

      // 打开
      currentValue.value.ref.show();
      expect(onUpdate).toHaveBeenCalledWith(true);

      // 关闭
      currentValue.value.ref.hide();
      expect(onUpdate).toHaveBeenCalledWith(false);
    });

    it('应该处理多次切换', async () => {
      const plugins = PopoverBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onUpdate = vi.fn();
      const props = {
        visible: false,
        'onUpdate:visible': onUpdate,
      };

      const { currentValue } = await renderHooks(plugins, props);

      currentValue.value.ref.show();
      expect(onUpdate).toHaveBeenNthCalledWith(1, true);

      currentValue.value.ref.hide();
      expect(onUpdate).toHaveBeenNthCalledWith(2, false);

      currentValue.value.ref.show();
      expect(onUpdate).toHaveBeenNthCalledWith(3, true);

      currentValue.value.ref.hide();
      expect(onUpdate).toHaveBeenNthCalledWith(4, false);
    });
  });

  describe('边界条件测试', () => {
    it('应该处理 null popperClass', async () => {
      const plugins = PopoverBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        popperClass: null,
        class: 'custom-class',
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.popperClass).toBe('null custom-class');
    });

    it('应该处理 undefined visible', async () => {
      const plugins = PopoverBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        visible: undefined,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.visible).toBeUndefined();
    });

    it('应该处理数字类型的 visible', async () => {
      const plugins = PopoverBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        visible: 1 as any,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.visible).toBe(1);
    });

    it('应该处理特殊字符的类名', async () => {
      const plugins = PopoverBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        popperClass: 'class-with-dash',
        class: 'class_with_underscore',
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.popperClass).toBe('class-with-dash class_with_underscore');
    });
  });
});
