/**
 * el-tag 插件集成测试
 * 完整覆盖 useTextToSlot 插件的所有逻辑
 */
import { describe, it, expect } from 'vitest';
import { renderHooks } from '@ep-test/test-utils/render-hook';
import TagBasicAccumulate from '../plugins/basic-plugins';
import { $deletePropsList } from '@/plugins/constants';

describe('el-tag 插件集成测试', () => {
  describe('useTextToSlot - text 转 slot', () => {
    it('应该将 text 属性转换为 default slot', async () => {
      const plugins = TagBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        text: '标签文本',
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.slots.default).toBeDefined();
      expect(typeof currentValue.value.slots.default).toBe('function');
      expect(currentValue.value.slots.default()).toBe('标签文本');
    });

    it('应该在没有 text 时也创建 default slot', async () => {
      const plugins = TagBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.slots.default).toBeDefined();
      expect(currentValue.value.slots.default()).toBeUndefined();
    });

    it('应该不覆盖已存在的 default slot', async () => {
      const plugins = TagBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const existingSlot = () => '自定义内容';
      const props = {
        text: '标签文本',
        slots: {
          default: existingSlot,
        },
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.slots.default).toBe(existingSlot);
      expect(currentValue.value.slots.default()).toBe('自定义内容');
    });

    it('应该处理空字符串 text', async () => {
      const plugins = TagBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        text: '',
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.slots.default()).toBe('');
    });

    it('应该处理数字类型的 text', async () => {
      const plugins = TagBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        text: 123 as any,
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.slots.default()).toBe(123);
    });

    it('应该处理布尔类型的 text', async () => {
      const plugins = TagBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        text: true as any,
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.slots.default()).toBe(true);
    });
  });

  describe('$deletePropsList 处理', () => {
    it('应该将 text 添加到 deletePropsList', async () => {
      const plugins = TagBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        text: '标签文本',
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value[$deletePropsList]).toContain('text');
    });

    it('应该保留原有的 deletePropsList 并添加 text', async () => {
      const plugins = TagBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        text: '标签文本',
        [$deletePropsList]: ['prop1', 'prop2'],
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value[$deletePropsList]).toContain('prop1');
      expect(currentValue.value[$deletePropsList]).toContain('prop2');
      expect(currentValue.value[$deletePropsList]).toContain('text');
      expect(currentValue.value[$deletePropsList].length).toBe(3);
    });

    it('应该在没有 text 时也添加到 deletePropsList', async () => {
      const plugins = TagBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value[$deletePropsList]).toContain('text');
    });
  });

  describe('slots 处理', () => {
    it('应该保留其他 slots', async () => {
      const plugins = TagBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const closeSlot = () => '关闭';
      const props = {
        text: '标签文本',
        slots: {
          close: closeSlot,
        },
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.slots.close).toBe(closeSlot);
      expect(currentValue.value.slots.default).toBeDefined();
    });

    it('应该处理 null slots', async () => {
      const plugins = TagBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        text: '标签文本',
        slots: null,
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.slots.default).toBeDefined();
    });

    it('应该处理 undefined slots', async () => {
      const plugins = TagBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        text: '标签文本',
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.slots.default).toBeDefined();
    });
  });

  describe('props 更新响应式测试', () => {
    it('应该响应 text 的变化', async () => {
      const plugins = TagBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        text: '初始文本',
        [$deletePropsList]: [],
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.slots.default()).toBe('初始文本');

      await setValue({ text: '更新文本', [$deletePropsList]: [] });

      expect(currentValue.value.slots.default()).toBe('更新文本');
    });

    it('应该响应从无 text 到有 text 的变化', async () => {
      const plugins = TagBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        [$deletePropsList]: [],
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.slots.default()).toBeUndefined();

      await setValue({ text: '新增文本', [$deletePropsList]: [] });

      expect(currentValue.value.slots.default()).toBe('新增文本');
    });

    it('应该响应从有 text 到无 text 的变化', async () => {
      const plugins = TagBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        text: '初始文本',
        [$deletePropsList]: [],
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.slots.default()).toBe('初始文本');

      await setValue({ text: undefined, [$deletePropsList]: [] });

      expect(currentValue.value.slots.default()).toBeUndefined();
    });
  });

  describe('交叉测试：text 和 slots 的优先级', () => {
    it('应该在有自定义 slot 时保留自定义 slot', async () => {
      const plugins = TagBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const customSlot = () => <span>自定义</span>;
      const props = {
        text: '标签文本',
        slots: {
          default: customSlot,
        },
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.slots.default).toBe(customSlot);
    });

    it('应该处理复杂文本内容', async () => {
      const plugins = TagBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const complexText = '标签\n换行\t制表符 特殊字符!@#$%^&*()';
      const props = {
        text: complexText,
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.slots.default()).toBe(complexText);
    });

    it('应该处理 HTML 字符串作为 text', async () => {
      const plugins = TagBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const htmlText = '<b>粗体</b>';
      const props = {
        text: htmlText,
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.slots.default()).toBe(htmlText);
    });
  });
});
