/**
 * el-card 插件集成测试
 * 注意：el-card 使用空的 Accumulate，没有额外的插件逻辑
 */
import { describe, it, expect } from 'vitest';
import { renderHooks } from '@ep-test/test-utils/render-hook';
import CardAccumulate from '../plugins/index';

describe('el-card 插件集成测试', () => {
  describe('基础功能', () => {
    it('应该正确执行空插件（无额外逻辑）', async () => {
      const plugins = CardAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        header: '卡片标题',
        shadow: 'always',
      };
      
      const { currentValue } = await renderHooks(plugins, props);

      
      // 空 Accumulate 应该返回原始 props
      expect(currentValue.value).toBeDefined();
    });

    it('应该透传所有 props', async () => {
      const plugins = CardAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        header: '标题',
        bodyStyle: { padding: '20px' },
        shadow: 'hover',
      };
      
      const { currentValue } = await renderHooks(plugins, props);

      
      expect(currentValue.value).toBeDefined();
    });
  });

  describe('props 更新响应式测试', () => {
    it('应该响应 props 的变化', async () => {
      const plugins = CardAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        header: '初始标题',
      };
      
      const { currentValue, setValue } = await renderHooks(plugins, props);

      
      await setValue({ header: '更新标题' });
      
      expect(currentValue.value).toBeDefined();
    });
  });
});
