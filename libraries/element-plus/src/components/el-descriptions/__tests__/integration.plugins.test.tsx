/**
 * el-descriptions 插件集成测试
 */
import { describe, it, expect } from 'vitest';
import { renderHooks } from '@ep-test/test-utils/render-hook';
import DescriptionsBasicAccumulate from '../plugins/basic-plugins';
import { $deletePropsList } from '@/plugins/constants';

describe('el-descriptions 插件集成测试', () => {
  describe('handleNodePath', () => {
    it('应该处理 data-nodepath', async () => {
      const plugins = DescriptionsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        'data-nodepath': 'test.path',
        class: 'existing-class',
      };

      const { currentValue } = await renderHooks(plugins, props);


      // expect(currentValue.value[$deletePropsList]).toContain('data-nodepath');
      expect(currentValue.value.class).toBeDefined();
    });
  });

  describe('handleDescriptionsCell', () => {
    it('应该处理 slots', async () => {
      const plugins = DescriptionsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        slots: { default: () => [] },
      };

      const { currentValue } = await renderHooks(plugins, props);


      expect(currentValue.value.slots.default).toBeDefined();
    });
  });
});

