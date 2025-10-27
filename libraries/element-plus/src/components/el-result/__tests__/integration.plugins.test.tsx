/**
 * el-result 插件集成测试
 * 完整覆盖 handleSlots 插件的所有逻辑
 */
import { describe, it, expect } from 'vitest';
import { renderHooks } from '@ep-test/test-utils/render-hook';
import ResultBasicAccumulate from '../plugins/basic-plugins';

describe('el-result 插件集成测试', () => {
  describe('handleSlots - slots 映射', () => {
    it('应该将 subTitle slot 映射到 sub-title', async () => {
      const plugins = ResultBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const subTitleSlot = () => '副标题内容';
      const props = {
        slots: {
          subTitle: subTitleSlot,
        },
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.slots['sub-title']).toBe(subTitleSlot);
    });

    it('应该保留原有的 sub-title slot', async () => {
      const plugins = ResultBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const subTitleSlot = () => '副标题';
      const props = {
        slots: {
          'sub-title': subTitleSlot,
        },
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.slots['sub-title']).toBe(subTitleSlot);
    });

    it('应该 subTitle 优先级低于 sub-title', async () => {
      const plugins = ResultBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const subTitleSlot1 = () => '副标题1';
      const subTitleSlot2 = () => '副标题2';
      const props = {
        slots: {
          subTitle: subTitleSlot1,
          'sub-title': subTitleSlot2,
        },
      };

      const { currentValue } = await renderHooks(plugins, props);

      // sub-title 应该被保留
      expect(currentValue.value.slots['sub-title']).toEqual(subTitleSlot1);
    });

    it('应该保留其他 slots', async () => {
      const plugins = ResultBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const titleSlot = () => '标题';
      const iconSlot = () => '图标';
      const extraSlot = () => '额外内容';
      const subTitleSlot = () => '副标题';
      const props = {
        slots: {
          title: titleSlot,
          icon: iconSlot,
          extra: extraSlot,
          subTitle: subTitleSlot,
        },
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.slots.title).toBe(titleSlot);
      expect(currentValue.value.slots.icon).toBe(iconSlot);
      expect(currentValue.value.slots.extra).toBe(extraSlot);
      expect(currentValue.value.slots['sub-title']).toBe(subTitleSlot);
    });

    it('应该处理空 slots', async () => {
      const plugins = ResultBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        slots: {},
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.slots['sub-title']).toBeUndefined();
    });

    it('应该处理 null slots', async () => {
      const plugins = ResultBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        slots: null,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.slots).toBeDefined();
    });

    it('应该处理 undefined slots', async () => {
      const plugins = ResultBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {};

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.slots).toBeDefined();
    });
  });

  describe('props 更新响应式测试', () => {
    it('应该响应 subTitle slot 的变化', async () => {
      const plugins = ResultBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const subTitleSlot1 = () => '副标题1';
      const subTitleSlot2 = () => '副标题2';
      const props = {
        slots: {
          subTitle: subTitleSlot1,
        },
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.slots['sub-title']).toBe(subTitleSlot1);

      await setValue({ slots: { subTitle: subTitleSlot2 } });

      expect(currentValue.value.slots['sub-title']).toBe(subTitleSlot2);
    });

    it('应该响应从 subTitle 到 sub-title 的变化', async () => {
      const plugins = ResultBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const subTitleSlot1 = () => '副标题1';
      const subTitleSlot2 = () => '副标题2';
      const props = {
        slots: {
          subTitle: subTitleSlot1,
        },
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.slots['sub-title']).toBe(subTitleSlot1);

      await setValue({ slots: { 'sub-title': subTitleSlot2 } });

      expect(currentValue.value.slots['sub-title']).toBe(subTitleSlot2);
    });

    it('应该响应 slots 的完全替换', async () => {
      const plugins = ResultBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const titleSlot = () => '标题';
      const subTitleSlot = () => '副标题';
      const props = {
        slots: {
          title: titleSlot,
        },
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.slots.title).toBe(titleSlot);

      await setValue({ slots: { subTitle: subTitleSlot } });

      expect(currentValue.value.slots['sub-title']).toBe(subTitleSlot);
    });
  });

  describe('交叉测试：各种 slot 组合', () => {
    it('应该处理所有 slots 同时存在', async () => {
      const plugins = ResultBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const titleSlot = () => '标题';
      const subTitleSlot = () => '副标题';
      const iconSlot = () => '图标';
      const extraSlot = () => '额外';
      const props = {
        slots: {
          title: titleSlot,
          subTitle: subTitleSlot,
          icon: iconSlot,
          extra: extraSlot,
        },
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.slots.title).toBe(titleSlot);
      expect(currentValue.value.slots['sub-title']).toBe(subTitleSlot);
      expect(currentValue.value.slots.icon).toBe(iconSlot);
      expect(currentValue.value.slots.extra).toBe(extraSlot);
    });

    it('应该处理 subTitle 和 sub-title 同时存在的优先级', async () => {
      const plugins = ResultBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const subTitleSlot = () => 'subTitle';
      const subTitleSlotDash = () => 'sub-title';
      const props = {
        slots: {
          subTitle: subTitleSlot,
          'sub-title': subTitleSlotDash,
        },
      };

      const { currentValue } = await renderHooks(plugins, props);

      // sub-title 优先
      expect(currentValue.value.slots['sub-title']).toBe(subTitleSlot);
    });

    it('应该在只有 subTitle 时正确映射', async () => {
      const plugins = ResultBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const subTitleSlot = () => '只有 subTitle';
      const props = {
        slots: {
          subTitle: subTitleSlot,
        },
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.slots['sub-title']).toBe(subTitleSlot);
      expect(currentValue.value.slots.subTitle).toBe(subTitleSlot);
    });
  });

  describe('边界条件测试', () => {
    it('应该处理函数类型的 subTitle', async () => {
      const plugins = ResultBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const complexSlot = (props) => `副标题: ${props.text}`;
      const props = {
        slots: {
          subTitle: complexSlot,
        },
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.slots['sub-title']).toBe(complexSlot);
    });

    it('应该处理 undefined subTitle', async () => {
      const plugins = ResultBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        slots: {
          subTitle: undefined,
        },
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.slots['sub-title']).toBeUndefined();
    });

    it('应该处理 null subTitle', async () => {
      const plugins = ResultBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        slots: {
          subTitle: null,
        },
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.slots['sub-title']).toBeUndefined();
    });
  });
});
