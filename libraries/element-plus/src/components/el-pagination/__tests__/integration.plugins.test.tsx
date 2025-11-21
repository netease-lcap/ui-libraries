/**
 * el-pagination 插件集成测试
 * 完整覆盖 handlePageSizes 插件的所有逻辑
 */
import { describe, it, expect } from 'vitest';
import { renderHooks } from '@ep-test/test-utils/render-hook';
import PaginationBasicAccumulate from '../plugins/basic-plugins';

describe('el-pagination 插件集成测试', () => {
  describe('handlePageSizes - pageSizes 处理', () => {
    it('应该处理数组形式的 pageSizes', async () => {
      const plugins = PaginationBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        pageSizes: [10, 20, 30, 40, 50],
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.pageSizes).toEqual([10, 20, 30, 40, 50]);
    });

    it('应该处理 JSON 字符串形式的 pageSizes', async () => {
      const plugins = PaginationBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        pageSizes: '[15, 30, 50, 100]',
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.pageSizes).toEqual([15, 30, 50, 100]);
    });

    it('应该在无效 JSON 时返回默认值 [10, 20, 50]', async () => {
      const plugins = PaginationBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        pageSizes: 'invalid json',
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.pageSizes).toEqual([10, 20, 50]);
    });

    it('应该在未提供 pageSizes 时使用默认值 [10, 20, 50]', async () => {
      const plugins = PaginationBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {};

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.pageSizes).toEqual([10, 20, 50]);
    });

    it('应该在空字符串时使用默认值', async () => {
      const plugins = PaginationBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        pageSizes: '',
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.pageSizes).toEqual([10, 20, 50]);
    });

    it('应该在 JSON 解析结果不是数组时使用默认值', async () => {
      const plugins = PaginationBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        pageSizes: '{"a": 10}',
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.pageSizes).toEqual([10, 20, 50]);
    });

    it('应该处理包含 0 的 pageSizes', async () => {
      const plugins = PaginationBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        pageSizes: [0, 10, 20],
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.pageSizes).toEqual([0, 10, 20]);
    });

    it('应该处理负数 pageSizes', async () => {
      const plugins = PaginationBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        pageSizes: [-10, 20, 30],
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.pageSizes).toEqual([-10, 20, 30]);
    });

    it('应该处理大数值 pageSizes', async () => {
      const plugins = PaginationBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        pageSizes: [100, 500, 1000, 5000],
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.pageSizes).toEqual([100, 500, 1000, 5000]);
    });

    it('应该处理单个元素的数组', async () => {
      const plugins = PaginationBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        pageSizes: [50],
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.pageSizes).toEqual([50]);
    });

    it('应该处理空数组', async () => {
      const plugins = PaginationBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        pageSizes: [],
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.pageSizes).toEqual([]);
    });

    it('应该处理包含非数字的数组', async () => {
      const plugins = PaginationBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        pageSizes: [10, '20', 30, null, undefined] as any,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.pageSizes).toEqual([10, '20', 30, null, undefined]);
    });

    it('应该处理包含空格的 JSON 字符串', async () => {
      const plugins = PaginationBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        pageSizes: '[ 10 , 20 , 30 ]',
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.pageSizes).toEqual([10, 20, 30]);
    });
  });

  describe('props 更新响应式测试', () => {
    it('应该响应 pageSizes 的变化（数组形式）', async () => {
      const plugins = PaginationBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        pageSizes: [10, 20, 30],
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.pageSizes).toEqual([10, 20, 30]);

      await setValue({ pageSizes: [20, 40, 60] });

      expect(currentValue.value.pageSizes).toEqual([20, 40, 60]);
    });

    it('应该响应 pageSizes 的变化（JSON 字符串形式）', async () => {
      const plugins = PaginationBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        pageSizes: '[10, 20, 30]',
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.pageSizes).toEqual([10, 20, 30]);

      await setValue({ pageSizes: '[50, 100, 150]' });

      expect(currentValue.value.pageSizes).toEqual([50, 100, 150]);
    });

    it('应该响应从数组到 JSON 字符串的变化', async () => {
      const plugins = PaginationBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        pageSizes: [10, 20, 30],
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.pageSizes).toEqual([10, 20, 30]);

      await setValue({ pageSizes: '[40, 50, 60]' });

      expect(currentValue.value.pageSizes).toEqual([40, 50, 60]);
    });

    it('应该响应从有效值到无效值的变化', async () => {
      const plugins = PaginationBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        pageSizes: [10, 20, 30],
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.pageSizes).toEqual([10, 20, 30]);

      await setValue({ pageSizes: 'invalid' });

      expect(currentValue.value.pageSizes).toEqual([10, 20, 50]);
    });

    it('应该响应从无效值到有效值的变化', async () => {
      const plugins = PaginationBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        pageSizes: 'invalid',
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.pageSizes).toEqual([10, 20, 50]);

      await setValue({ pageSizes: [25, 50, 75] });

      expect(currentValue.value.pageSizes).toEqual([25, 50, 75]);
    });
  });

  describe('交叉测试：各种格式的 pageSizes', () => {
    it('应该处理不同长度的数组', async () => {
      const plugins = PaginationBasicAccumulate.getPluginMethod({ isInDesigner: false });

      // 2个元素
      const props1 = { pageSizes: [10, 20] };
      const result1 = await renderHooks(plugins, props1);
      expect(result1.currentValue.value.pageSizes).toEqual([10, 20]);

      // 5个元素
      const props2 = { pageSizes: [10, 20, 30, 40, 50] };
      const result2 = await renderHooks(plugins, props2);
      expect(result2.currentValue.value.pageSizes).toEqual([10, 20, 30, 40, 50]);

      // 10个元素
      const props3 = { pageSizes: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50] };
      const result3 = await renderHooks(plugins, props3);
      expect(result3.currentValue.value.pageSizes).toEqual([5, 10, 15, 20, 25, 30, 35, 40, 45, 50]);
    });

    it('应该处理各种非标准的 JSON 格式', async () => {
      const plugins = PaginationBasicAccumulate.getPluginMethod({ isInDesigner: false });

      // 带换行
      const props1 = { pageSizes: '[\n  10,\n  20,\n  30\n]' };
      const result1 = await renderHooks(plugins, props1);
      expect(result1.currentValue.value.pageSizes).toEqual([10, 20, 30]);

      // 没有空格
      const props2 = { pageSizes: '[10,20,30]' };
      const result2 = await renderHooks(plugins, props2);
      expect(result2.currentValue.value.pageSizes).toEqual([10, 20, 30]);
    });

    it('应该处理边界值组合', async () => {
      const plugins = PaginationBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        pageSizes: [0, 1, 10, 100, 1000, 10000],
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.pageSizes).toEqual([0, 1, 10, 100, 1000, 10000]);
    });
  });

  describe('边界条件测试', () => {
    it('应该处理 null pageSizes', async () => {
      const plugins = PaginationBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        pageSizes: null,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.pageSizes).toEqual([10, 20, 50]);
    });

    it('应该处理 undefined pageSizes', async () => {
      const plugins = PaginationBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        pageSizes: undefined,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.pageSizes).toEqual([10, 20, 50]);
    });

    it('应该处理数字类型的 pageSizes', async () => {
      const plugins = PaginationBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        pageSizes: 123 as any,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.pageSizes).toEqual([10, 20, 50]);
    });

    it('应该处理布尔类型的 pageSizes', async () => {
      const plugins = PaginationBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        pageSizes: true as any,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.pageSizes).toEqual([10, 20, 50]);
    });

    it('应该处理对象类型的 pageSizes', async () => {
      const plugins = PaginationBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        pageSizes: { a: 10, b: 20 } as any,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.pageSizes).toEqual([10, 20, 50]);
    });
  });
});
