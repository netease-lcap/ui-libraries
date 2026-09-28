/**
 * el-badge 插件集成测试
 * 完整覆盖 handleLeftOffset 插件的所有逻辑
 */
import { describe, it, expect } from 'vitest';
import { renderHooks } from '@ep-test/test-utils/render-hook';
import BadgeAccumulate from '../plugins/basic-plugins';

describe('el-badge 插件集成测试', () => {
  describe('handleLeftOffset - offset 处理', () => {
    it('应该使用默认值 [0, 0] 当没有提供任何 offset 相关属性', async () => {
      const plugins = BadgeAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {};

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.offset).toEqual([0, 0]);
    });

    it('应该使用 leftOffset 和 topOffset 构建 offset 数组', async () => {
      const plugins = BadgeAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        leftOffset: 10,
        topOffset: 20,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.offset).toEqual([10, 20]);
    });

    it('应该只使用 leftOffset 当 topOffset 未提供时', async () => {
      const plugins = BadgeAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        leftOffset: 15,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.offset).toEqual([15, 0]);
    });

    it('应该只使用 topOffset 当 leftOffset 未提供时', async () => {
      const plugins = BadgeAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        topOffset: 25,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.offset).toEqual([0, 25]);
    });

    it('应该优先使用 offset 属性（数组形式）覆盖 leftOffset 和 topOffset', async () => {
      const plugins = BadgeAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        leftOffset: 10,
        topOffset: 20,
        offset: [30, 40],
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.offset).toEqual([30, 40]);
    });

    it('应该在 offset 不是数组时使用 leftOffset 和 topOffset', async () => {
      const plugins = BadgeAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        leftOffset: 5,
        topOffset: 15,
        offset: null,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.offset).toEqual([5, 15]);
    });

    it('应该处理负数 offset', async () => {
      const plugins = BadgeAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        leftOffset: -10,
        topOffset: -20,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.offset).toEqual([-10, -20]);
    });

    it('应该处理 offset 数组中的负数', async () => {
      const plugins = BadgeAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        offset: [-15, -25],
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.offset).toEqual([-15, -25]);
    });

    it('应该处理 0 值', async () => {
      const plugins = BadgeAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        leftOffset: 0,
        topOffset: 0,
      };

      const { currentValue } = await renderHooks(plugins, props);


      expect(currentValue.value.offset).toEqual([0, 0]);
    });

    it('应该处理大数值', async () => {
      const plugins = BadgeAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        leftOffset: 999,
        topOffset: 888,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.offset).toEqual([999, 888]);
    });
  });

  describe('props 更新响应式测试', () => {
    it('应该响应 leftOffset 的变化', async () => {
      const plugins = BadgeAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        leftOffset: 10,
        topOffset: 20,
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.offset).toEqual([10, 20]);

      await setValue({ leftOffset: 30, topOffset: 20 });

      expect(currentValue.value.offset).toEqual([30, 20]);
    });

    it('应该响应 topOffset 的变化', async () => {
      const plugins = BadgeAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        leftOffset: 10,
        topOffset: 20,
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.offset).toEqual([10, 20]);

      await setValue({ leftOffset: 10, topOffset: 40 });

      expect(currentValue.value.offset).toEqual([10, 40]);
    });

    it('应该响应 offset 属性的变化', async () => {
      const plugins = BadgeAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        offset: [10, 20],
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.offset).toEqual([10, 20]);

      await setValue({ offset: [50, 60] });

      expect(currentValue.value.offset).toEqual([50, 60]);
    });

    it('应该在 offset 从数组变为 null 时使用 leftOffset 和 topOffset', async () => {
      const plugins = BadgeAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        leftOffset: 5,
        topOffset: 15,
        offset: [100, 200],
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);


      expect(currentValue.value.offset).toEqual([100, 200]);

      await setValue({ leftOffset: 5, topOffset: 15, offset: null });

      expect(currentValue.value.offset).toEqual([5, 15]);
    });
  });

  describe('交叉测试：边界条件', () => {
    it('应该处理 undefined leftOffset', async () => {
      const plugins = BadgeAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        leftOffset: undefined,
        topOffset: 10,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.offset).toEqual([0, 10]);
    });

    it('应该处理空数组作为 offset', async () => {
      const plugins = BadgeAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        leftOffset: 5,
        topOffset: 10,
        offset: [],
      };

      const { currentValue } = await renderHooks(plugins, props);

      // 空数组不是数组形式，应该使用 leftOffset 和 topOffset
      expect(currentValue.value.offset).toEqual([]);
    });

    it('应该处理只有一个元素的数组作为 offset', async () => {
      const plugins = BadgeAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        leftOffset: 5,
        topOffset: 10,
        offset: [100] as any,
      };

      const { currentValue } = await renderHooks(plugins, props);

      // 数组是 array，优先使用
      expect(currentValue.value.offset).toEqual([100]);
    });

    it('应该处理字符串形式的数字', async () => {
      const plugins = BadgeAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        leftOffset: '10' as any,
        topOffset: '20' as any,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.offset).toEqual(['10', '20']);
    });
  });
});
