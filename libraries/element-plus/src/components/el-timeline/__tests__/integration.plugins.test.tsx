/**
 * el-timeline 插件集成测试
 */
import { describe, it, expect } from 'vitest';
import { renderHooks } from '@ep-test/test-utils/render-hook';
import ElTimelineBasicAccumulate from '../plugins/basic-plugins';

describe('el-timeline 插件集成测试', () => {
  describe('handleDataSource', () => {
    it('应该处理静态数据源', async () => {
      const plugins = ElTimelineBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        dataSource: [
          { timestamp: '2024-01-01', content: 'Event 1' },
          { timestamp: '2024-01-02', content: 'Event 2' },
        ],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);
      await waitForNextUpdate();

      expect(currentValue.value.slots.default).toBeDefined();
      expect(currentValue.value.ref.data).toBeDefined();
      expect(currentValue.value.data.length).toBe(2);
    });

    it('应该处理自定义字段', async () => {
      const plugins = ElTimelineBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        dataSource: [{ time: '2024-01-01', text: 'Event' }],
        timestampField: 'time',
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);
      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
    });

    it('应该响应 dataSource 的变化', async () => {
      const plugins = ElTimelineBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        dataSource: [{ timestamp: '2024-01-01', content: 'Event 1' }],
      };

      const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);
      await waitForNextUpdate();

      (props as any).dataSource = [
        { timestamp: '2024-01-01', content: 'Event 1' },
        { timestamp: '2024-01-02', content: 'Event 2' },
      ];
      await setValue({
        dataSource: [
          { timestamp: '2024-01-01', content: 'Event 1' },
          { timestamp: '2024-01-02', content: 'Event 2' },
        ],
      });
      await waitForNextUpdate();

      expect(currentValue.value.data.length).toBe(2);
    });
  });
});

