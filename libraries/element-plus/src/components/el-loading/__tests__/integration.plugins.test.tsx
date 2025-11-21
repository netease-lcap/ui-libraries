/**
 * el-loading 插件集成测试
 * 完整覆盖 handleCloseEvents 插件的所有逻辑
 */
import { describe, it, expect, vi } from 'vitest';
import { renderHooks } from '@ep-test/test-utils/render-hook';
import LoadingBasicAccumulate from '../plugins/index';

describe('el-loading 插件集成测试', () => {
  describe('handleCloseEvents - beforeClose 处理', () => {
    it('应该处理 onBeforeClose 回调', async () => {
      const plugins = LoadingBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onBeforeClose = vi.fn();
      const props = {
        onBeforeClose,
      };
      
      const { currentValue } = await renderHooks(plugins, props);

      
      expect(currentValue.value.beforeClose).toBeDefined();
      expect(typeof currentValue.value.beforeClose).toBe('function');
    });

    it('应该调用 onBeforeClose 并传递参数', async () => {
      const plugins = LoadingBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onBeforeClose = vi.fn();
      const arg1 = 'test';
      const arg2 = 123;
      const props = {
        onBeforeClose,
      };
      
      const { currentValue } = await renderHooks(plugins, props);

      
      currentValue.value.beforeClose(arg1, arg2);
      
      expect(onBeforeClose).toHaveBeenCalledWith(arg1, arg2);
    });

    it('应该在没有 onBeforeClose 时使用默认函数', async () => {
      const plugins = LoadingBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {};
      
      const { currentValue } = await renderHooks(plugins, props);

      
      expect(currentValue.value.beforeClose).toBeDefined();
      // 不应该抛出错误
      expect(() => currentValue.value.beforeClose()).not.toThrow();
    });

    it('应该处理 onBeforeClose 抛出错误的情况', async () => {
      const plugins = LoadingBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onBeforeClose = vi.fn(() => {
        throw new Error('test error');
      });
      const props = {
        onBeforeClose,
      };
      
      const { currentValue } = await renderHooks(plugins, props);

      
      // 不应该抛出错误
      expect(() => currentValue.value.beforeClose()).not.toThrow();
    });

    it('应该处理多个参数', async () => {
      const plugins = LoadingBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onBeforeClose = vi.fn();
      const props = {
        onBeforeClose,
      };
      
      const { currentValue } = await renderHooks(plugins, props);

      
      currentValue.value.beforeClose('a', 'b', 'c', 123, true);
      
      expect(onBeforeClose).toHaveBeenCalledWith('a', 'b', 'c', 123, true);
    });
  });

  describe('handleCloseEvents - closed 处理', () => {
    it('应该处理 onClosed 回调', async () => {
      const plugins = LoadingBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onClosed = vi.fn();
      const props = {
        onClosed,
      };
      
      const { currentValue } = await renderHooks(plugins, props);

      
      expect(currentValue.value.closed).toBeDefined();
      expect(typeof currentValue.value.closed).toBe('function');
    });

    it('应该调用 onClosed 并传递参数', async () => {
      const plugins = LoadingBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onClosed = vi.fn();
      const arg1 = 'closed';
      const arg2 = 456;
      const props = {
        onClosed,
      };
      
      const { currentValue } = await renderHooks(plugins, props);

      
      currentValue.value.closed(arg1, arg2);
      
      expect(onClosed).toHaveBeenCalledWith(arg1, arg2);
    });

    it('应该在没有 onClosed 时使用默认函数', async () => {
      const plugins = LoadingBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {};
      
      const { currentValue } = await renderHooks(plugins, props);

      
      expect(currentValue.value.closed).toBeDefined();
      // 不应该抛出错误
      expect(() => currentValue.value.closed()).not.toThrow();
    });

    it('应该处理 onClosed 抛出错误的情况', async () => {
      const plugins = LoadingBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onClosed = vi.fn(() => {
        throw new Error('test error');
      });
      const props = {
        onClosed,
      };
      
      const { currentValue } = await renderHooks(plugins, props);

      
      // 不应该抛出错误
      expect(() => currentValue.value.closed()).not.toThrow();
    });
  });

  describe('props 更新响应式测试', () => {
    it('应该响应 onBeforeClose 的变化', async () => {
      const plugins = LoadingBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onBeforeClose1 = vi.fn();
      const onBeforeClose2 = vi.fn();
      const props = {
        onBeforeClose: onBeforeClose1,
      };
      
      const { currentValue, setValue } = await renderHooks(plugins, props);

      
      currentValue.value.beforeClose();
      expect(onBeforeClose1).toHaveBeenCalled();
      
      await setValue({ onBeforeClose: onBeforeClose2 });
      
      currentValue.value.beforeClose();
      expect(onBeforeClose2).toHaveBeenCalled();
    });

    it('应该响应 onClosed 的变化', async () => {
      const plugins = LoadingBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onClosed1 = vi.fn();
      const onClosed2 = vi.fn();
      const props = {
        onClosed: onClosed1,
      };
      
      const { currentValue, setValue } = await renderHooks(plugins, props);

      
      currentValue.value.closed();
      expect(onClosed1).toHaveBeenCalled();
      
      await setValue({ onClosed: onClosed2 });
      
      currentValue.value.closed();
      expect(onClosed2).toHaveBeenCalled();
    });
  });

  describe('交叉测试：beforeClose 和 closed 同时使用', () => {
    it('应该同时处理 beforeClose 和 closed', async () => {
      const plugins = LoadingBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onBeforeClose = vi.fn();
      const onClosed = vi.fn();
      const props = {
        onBeforeClose,
        onClosed,
      };
      
      const { currentValue } = await renderHooks(plugins, props);

      
      expect(currentValue.value.beforeClose).toBeDefined();
      expect(currentValue.value.closed).toBeDefined();
      
      currentValue.value.beforeClose('test1');
      expect(onBeforeClose).toHaveBeenCalledWith('test1');
      
      currentValue.value.closed('test2');
      expect(onClosed).toHaveBeenCalledWith('test2');
    });

    it('应该支持完整的关闭流程', async () => {
      const plugins = LoadingBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onBeforeClose = vi.fn();
      const onClosed = vi.fn();
      const props = {
        onBeforeClose,
        onClosed,
      };
      
      const { currentValue } = await renderHooks(plugins, props);

      
      // 1. 开始关闭
      currentValue.value.beforeClose();
      expect(onBeforeClose).toHaveBeenCalled();
      
      // 2. 关闭完成
      currentValue.value.closed();
      expect(onClosed).toHaveBeenCalled();
    });

    it('应该在两个回调中传递不同的参数', async () => {
      const plugins = LoadingBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onBeforeClose = vi.fn();
      const onClosed = vi.fn();
      const props = {
        onBeforeClose,
        onClosed,
      };
      
      const { currentValue } = await renderHooks(plugins, props);

      
      currentValue.value.beforeClose('before', 1);
      expect(onBeforeClose).toHaveBeenCalledWith('before', 1);
      
      currentValue.value.closed('after', 2);
      expect(onClosed).toHaveBeenCalledWith('after', 2);
    });
  });

  describe('边界条件测试', () => {
    it('应该处理 null 作为 onBeforeClose', async () => {
      const plugins = LoadingBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        onBeforeClose: null,
      };
      
      const { currentValue } = await renderHooks(plugins, props);

      
      expect(() => currentValue.value.beforeClose()).not.toThrow();
    });

    it('应该处理 undefined 作为 onClosed', async () => {
      const plugins = LoadingBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        onClosed: undefined,
      };
      
      const { currentValue } = await renderHooks(plugins, props);

      
      expect(() => currentValue.value.closed()).not.toThrow();
    });

    it('应该处理非函数类型的回调', async () => {
      const plugins = LoadingBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        onBeforeClose: 'not a function' as any,
        onClosed: 123 as any,
      };
      
      const { currentValue } = await renderHooks(plugins, props);

      
      expect(() => currentValue.value.beforeClose()).not.toThrow();
      expect(() => currentValue.value.closed()).not.toThrow();
    });

    it('应该处理异步回调', async () => {
      const plugins = LoadingBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const onBeforeClose = vi.fn().mockResolvedValue('done');
      const props = {
        onBeforeClose,
      };
      
      const { currentValue } = await renderHooks(plugins, props);

      
      await currentValue.value.beforeClose();
      expect(onBeforeClose).toHaveBeenCalled();
    });
  });
});
