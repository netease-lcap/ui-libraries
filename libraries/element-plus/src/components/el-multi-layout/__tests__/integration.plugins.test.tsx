/**
 * el-multi-layout 插件集成测试
 */
import { describe, it, expect } from 'vitest';
import { renderHooks } from '@ep-test/test-utils/render-hook';
import MultiLayoutBasicAccumulate from '../plugins/basic-plugins';

describe('el-multi-layout 插件集成测试', () => {
  describe('基础功能', () => {
    it('应该正确执行插件', async () => {
      const plugins = MultiLayoutBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {};

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value).toBeDefined();
    });

    it('应该处理 props 变化', async () => {
      const plugins = MultiLayoutBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {};

      const { currentValue, setValue } = await renderHooks(plugins, props);

      await setValue({ test: 'value' });

      expect(currentValue.value).toBeDefined();
    });
  });
});
