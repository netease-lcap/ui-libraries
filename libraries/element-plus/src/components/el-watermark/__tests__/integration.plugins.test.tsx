/**
 * el-watermark 插件集成测试
 * 完整覆盖 useFont, useGap, useOffset 三个插件的所有逻辑
 */
import { describe, it, expect } from 'vitest';
import { renderHooks } from '@ep-test/test-utils/render-hook';
import WatermarkBasicAccumulate from '../plugins/basic-plugins';

describe('el-watermark 插件集成测试', () => {
  describe('useFont - font 处理', () => {
    it('应该处理对象形式的 font', async () => {
      const plugins = WatermarkBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const fontObj = { color: 'rgba(0,0,0,0.15)', fontSize: 16, fontFamily: 'sans-serif' };
      const props = {
        font: fontObj,
      };
      
      const { currentValue } = await renderHooks(plugins, props);

      
      expect(currentValue.value.font).toEqual(fontObj);
    });

    it('应该处理 JSON 字符串形式的 font', async () => {
      const plugins = WatermarkBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const fontObj = { color: 'rgba(0,0,0,0.15)', fontSize: 16 };
      const props = {
        font: JSON.stringify(fontObj),
      };
      
      const { currentValue } = await renderHooks(plugins, props);

      
      expect(currentValue.value.font).toEqual(fontObj);
    });

    it('应该在无效 JSON 字符串时返回空对象', async () => {
      const plugins = WatermarkBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        font: 'invalid json string',
      };
      
      const { currentValue } = await renderHooks(plugins, props);

      
      expect(currentValue.value.font).toEqual({});
    });

    it('应该在未提供 font 时使用空对象', async () => {
      const plugins = WatermarkBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {};
      
      const { currentValue } = await renderHooks(plugins, props);

      
      expect(currentValue.value.font).toEqual({});
    });

    it('应该处理空字符串 font', async () => {
      const plugins = WatermarkBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        font: '',
      };
      
      const { currentValue } = await renderHooks(plugins, props);

      
      expect(currentValue.value.font).toEqual({});
    });

    it('应该处理包含空格的 JSON 字符串', async () => {
      const plugins = WatermarkBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const fontObj = { color: '#000', size: 20 };
      const props = {
        font: JSON.stringify(fontObj, null, 2),
      };
      
      const { currentValue } = await renderHooks(plugins, props);

      
      expect(currentValue.value.font).toEqual(fontObj);
    });

    it('应该处理嵌套对象的 font', async () => {
      const plugins = WatermarkBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const fontObj = { 
        color: '#000', 
        style: { fontWeight: 'bold', fontStyle: 'italic' } 
      };
      const props = {
        font: JSON.stringify(fontObj),
      };
      
      const { currentValue } = await renderHooks(plugins, props);

      
      expect(currentValue.value.font).toEqual(fontObj);
    });
  });

  describe('useGap - gap 处理', () => {
    it('应该处理数组形式的 gap', async () => {
      const plugins = WatermarkBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        gap: [150, 200],
      };
      
      const { currentValue } = await renderHooks(plugins, props);

      
      expect(currentValue.value.gap).toEqual([150, 200]);
    });

    it('应该处理 JSON 字符串形式的 gap', async () => {
      const plugins = WatermarkBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        gap: '[120, 180]',
      };
      
      const { currentValue } = await renderHooks(plugins, props);

      
      expect(currentValue.value.gap).toEqual([120, 180]);
    });

    it('应该在无效 JSON 时返回默认值 [100, 100]', async () => {
      const plugins = WatermarkBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        gap: 'invalid json',
      };
      
      const { currentValue } = await renderHooks(plugins, props);

      
      expect(currentValue.value.gap).toEqual([100, 100]);
    });

    it('应该在未提供 gap 时使用默认值 [100, 100]', async () => {
      const plugins = WatermarkBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {};
      
      const { currentValue } = await renderHooks(plugins, props);

      
      expect(currentValue.value.gap).toEqual([100, 100]);
    });

    it('应该在空字符串时使用默认值 [100, 100]', async () => {
      const plugins = WatermarkBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        gap: '',
      };
      
      const { currentValue } = await renderHooks(plugins, props);

      
      expect(currentValue.value.gap).toEqual([100, 100]);
    });

    it('应该在数组长度不为 2 时使用默认值', async () => {
      const plugins = WatermarkBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        gap: '[100]' as any,
      };
      
      const { currentValue } = await renderHooks(plugins, props);

      
      expect(currentValue.value.gap).toEqual([100, 100]);
    });

    it('应该在数组包含超过 2 个元素时使用默认值', async () => {
      const plugins = WatermarkBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        gap: '[100, 200, 300]' as any,
      };
      
      const { currentValue } = await renderHooks(plugins, props);

      
      expect(currentValue.value.gap).toEqual([100, 100]);
    });

    it('应该处理包含 0 的 gap', async () => {
      const plugins = WatermarkBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        gap: [0, 0],
      };
      
      const { currentValue } = await renderHooks(plugins, props);

      
      expect(currentValue.value.gap).toEqual([0, 0]);
    });

    it('应该处理负数 gap', async () => {
      const plugins = WatermarkBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        gap: [-50, -80],
      };
      
      const { currentValue } = await renderHooks(plugins, props);

      
      expect(currentValue.value.gap).toEqual([-50, -80]);
    });

    it('应该处理大数值 gap', async () => {
      const plugins = WatermarkBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        gap: [999, 888],
      };
      
      const { currentValue } = await renderHooks(plugins, props);

      
      expect(currentValue.value.gap).toEqual([999, 888]);
    });
  });

  describe('useOffset - offset 处理', () => {
    it('应该使用 gap 的一半作为默认 offset', async () => {
      const plugins = WatermarkBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        gap: [200, 300],
      };
      
      const { currentValue } = await renderHooks(plugins, props);

      
      expect(currentValue.value.offset).toEqual([100, 150]);
    });

    it('应该处理 JSON 字符串形式的 offset', async () => {
      const plugins = WatermarkBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        gap: [200, 300],
        offset: '[50, 75]',
      };
      
      const { currentValue } = await renderHooks(plugins, props);

      
      expect(currentValue.value.offset).toEqual([50, 75]);
    });

    it('应该在无效 JSON 时使用 gap 的一半', async () => {
      const plugins = WatermarkBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        gap: [200, 300],
        offset: 'invalid json',
      };
      
      const { currentValue } = await renderHooks(plugins, props);

      
      expect(currentValue.value.offset).toEqual([100, 150]);
    });

    it('应该在空字符串时使用 gap 的一半', async () => {
      const plugins = WatermarkBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        gap: [200, 300],
        offset: '',
      };
      
      const { currentValue } = await renderHooks(plugins, props);

      
      expect(currentValue.value.offset).toEqual([100, 150]);
    });

    it('应该在数组长度不为 2 时使用 gap 的一半', async () => {
      const plugins = WatermarkBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        gap: [200, 300],
        offset: '[50]',
      };
      
      const { currentValue } = await renderHooks(plugins, props);

      
      expect(currentValue.value.offset).toEqual([100, 150]);
    });

    it('应该在未提供 gap 和 offset 时使用默认值', async () => {
      const plugins = WatermarkBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {};
      
      const { currentValue } = await renderHooks(plugins, props);

      
      // 默认 gap 是 [100, 100]，默认 offset 应该是 [50, 50]
      expect(currentValue.value.offset).toEqual([50, 50]);
    });

    it('应该处理 0 值的 offset', async () => {
      const plugins = WatermarkBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        gap: [200, 300],
        offset: '[0, 0]',
      };
      
      const { currentValue } = await renderHooks(plugins, props);

      
      expect(currentValue.value.offset).toEqual([0, 0]);
    });

    it('应该处理负数 offset', async () => {
      const plugins = WatermarkBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        gap: [200, 300],
        offset: '[-25, -50]',
      };
      
      const { currentValue } = await renderHooks(plugins, props);

      
      expect(currentValue.value.offset).toEqual([-25, -50]);
    });
  });

  describe('props 更新响应式测试', () => {
    it('应该响应 font 的变化', async () => {
      const plugins = WatermarkBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        font: '{"color": "#000"}',
      };
      
      const { currentValue, setValue } = await renderHooks(plugins, props);

      
      expect(currentValue.value.font).toEqual({ color: '#000' });
      
      await setValue({ font: '{"color": "#fff"}' });
      
      expect(currentValue.value.font).toEqual({ color: '#fff' });
    });

    it('应该响应 gap 的变化', async () => {
      const plugins = WatermarkBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        gap: [150, 200],
      };
      
      const { currentValue, setValue } = await renderHooks(plugins, props);

      
      expect(currentValue.value.gap).toEqual([150, 200]);
      
      await setValue({ gap: [180, 240] });
      
      expect(currentValue.value.gap).toEqual([180, 240]);
    });

    it('应该响应 offset 的变化', async () => {
      const plugins = WatermarkBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        gap: [200, 300],
        offset: '[50, 75]',
      };
      
      const { currentValue, setValue } = await renderHooks(plugins, props);

      
      expect(currentValue.value.offset).toEqual([50, 75]);
      
      await setValue({ gap: [200, 300], offset: '[60, 90]' });
      
      expect(currentValue.value.offset).toEqual([60, 90]);
    });

    it('应该在 gap 变化时更新默认 offset', async () => {
      const plugins = WatermarkBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        gap: [200, 300],
      };
      
      const { currentValue, setValue } = await renderHooks(plugins, props);

      
      expect(currentValue.value.offset).toEqual([100, 150]);
      
      await setValue({ gap: [400, 600] });
      
      expect(currentValue.value.offset).toEqual([200, 300]);
    });
  });

  describe('交叉测试：三个插件的协同工作', () => {
    it('应该同时处理 font, gap, offset', async () => {
      const plugins = WatermarkBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        font: '{"color": "#000", "fontSize": 16}',
        gap: [150, 200],
        offset: '[75, 100]',
      };
      
      const { currentValue } = await renderHooks(plugins, props);

      
      expect(currentValue.value.font).toEqual({ color: '#000', fontSize: 16 });
      expect(currentValue.value.gap).toEqual([150, 200]);
      expect(currentValue.value.offset).toEqual([75, 100]);
    });

    it('应该在 gap 变化时保持显式设置的 offset 不变', async () => {
      const plugins = WatermarkBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        gap: [200, 300],
        offset: '[50, 75]',
      };
      
      const { currentValue, setValue } = await renderHooks(plugins, props);

      
      expect(currentValue.value.offset).toEqual([50, 75]);
      
      await setValue({ gap: [400, 600], offset: '[50, 75]' });
      
      expect(currentValue.value.offset).toEqual([50, 75]);
    });

    it('应该处理全部参数都使用默认值的情况', async () => {
      const plugins = WatermarkBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {};
      
      const { currentValue } = await renderHooks(plugins, props);

      
      expect(currentValue.value.font).toEqual({});
      expect(currentValue.value.gap).toEqual([100, 100]);
      expect(currentValue.value.offset).toEqual([50, 50]);
    });

    it('应该处理全部参数都是非法值的情况', async () => {
      const plugins = WatermarkBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        font: 'invalid',
        gap: 'invalid',
        offset: 'invalid',
      };
      
      const { currentValue } = await renderHooks(plugins, props);

      
      expect(currentValue.value.font).toEqual({});
      expect(currentValue.value.gap).toEqual([100, 100]);
      expect(currentValue.value.offset).toEqual([50, 50]);
    });

    it('应该处理混合对象和 JSON 字符串的情况', async () => {
      const plugins = WatermarkBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        font: { color: '#000' },
        gap: '[150, 200]',
        offset: '[75, 100]',
      };
      
      const { currentValue } = await renderHooks(plugins, props);

      
      expect(currentValue.value.font).toEqual({ color: '#000' });
      expect(currentValue.value.gap).toEqual([150, 200]);
      expect(currentValue.value.offset).toEqual([75, 100]);
    });
  });
});
