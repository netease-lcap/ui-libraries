import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@ep-test/test-utils';
import '@/utils/index';
import AnchorAccumulate from '../plugins/basic-plugins';

vi.mock('@/components/el-anchor/index', () => ({
  ElAnchorLink: vi.fn((props) => ({
    type: 'ElAnchorLink',
    props,
    children: props.children || [],
  })),
}));

describe('basic-plugins.tsx', () => {
  beforeEach(() => {
    // 重置所有 mock
    vi.clearAllMocks();
  });
  describe('handleDataSource 插件功能测试', async () => {
    const plugin = AnchorAccumulate.getPluginMethodByName('handleDataSource') as any;
    it('应该正确处理函数类型的数据源', async () => {
      const dataSourceFn = vi.fn().mockResolvedValue([
        { title: 'Async Item 1', href: '#async1' },
        { title: 'Async Item 2', href: '#async2' },
      ]);
      const props = {
        dataSource: dataSourceFn,
      };
      const { currentValue, waitForNextUpdate } = renderHook(plugin, props);
      expect(currentValue.value).toHaveProperty('loading');
      expect(currentValue.value).toHaveProperty('data');
      await waitForNextUpdate();
      // 关键验证：第二次调用的返回值应该包含函数返回的数据
      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('data');

      // 验证数据与函数返回值一致（经过字段映射处理）
      // 验证数据来源于函数返回值
      expect(currentValue.value.data).toHaveLength(2);

      // 验证字段映射正确 (hrefField: 'href')
      expect(currentValue.value.data[0]).toHaveProperty('href', '#async1');
      expect(currentValue.value.data[1]).toHaveProperty('href', '#async2');

      // 验证原始数据被保留
      expect(currentValue.value.data[0]).toHaveProperty('title', 'Async Item 1');
      expect(currentValue.value.data[1]).toHaveProperty('title', 'Async Item 2');

      // 验证数据经过了 useHandleMapField 处理
      expect(currentValue.value.data[0]).toHaveProperty('label');
      expect(currentValue.value.data[0]).toHaveProperty('value');

      // 验证函数数据源被调用
      expect(dataSourceFn).toHaveBeenCalled();
    });
  });
});
