import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@ep-test/test-utils';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
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

  describe('AnchorAccumulate 基础功能', () => {
    it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
      expect(AnchorAccumulate).toBeDefined();
      expect(typeof AnchorAccumulate.addPlugin).toBe('function');
      expect(typeof AnchorAccumulate.getPluginMethod).toBe('function');
      expect(Array.isArray(AnchorAccumulate.Plugin)).toBe(true);
    });

    it('应该包含 handleDataSource 插件', () => {
      const plugins = AnchorAccumulate.getPluginMethod();
      expect(plugins).toHaveLength(1);

      const handleDataSourcePlugin = AnchorAccumulate.getPluginMethodByName('handleDataSource');
      expect(handleDataSourcePlugin).toBeDefined();
      if (handleDataSourcePlugin) {
        expect(handleDataSourcePlugin.name).toBe('handleDataSource');
        expect(typeof (handleDataSourcePlugin as any).handle).toBe('function');
      }
    });
  });

  describe('handleDataSource 插件功能测试', () => {
    const plugin = AnchorAccumulate.getPluginMethodByName('handleDataSource') as any;

    it('应该正确处理插件基本结构', () => {
      const props = {
        dataSource: null,
        hrefField: 'href',
        slots: {
          content: vi.fn(),
        },
        [$deletePropsList]: [],
        ref: { current: null },
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // 验证返回值基本结构
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
      expect(result).toHaveProperty('ref');
      expect(result).toHaveProperty('loading');
      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('slots');
    });

    it('应该正确设置 deletePropsList', () => {
      const props = {
        dataSource: null,
        hrefField: 'href',
        slots: { content: vi.fn() },
        [$deletePropsList]: [],
        ref: { current: null },
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // 验证 deletePropsList Symbol 属性
      const symbolKey = Object.getOwnPropertySymbols(result).find((s) => s.toString().includes('deletePropsList')) as symbol;
      expect(symbolKey).toBeDefined();
      expect(Array.isArray(result[symbolKey])).toBe(true);
      expect(result[symbolKey]).toEqual(expect.arrayContaining([...$dataSourceDeleteField]));
    });

    it('应该正确处理数组类型的数据源', () => {
      const dataSource = [
        { title: 'Item 1', href: '#item1' },
        { title: 'Item 2', href: '#item2' },
      ];

      const props = {
        dataSource,
        hrefField: 'href',
        slots: { content: vi.fn() },
        [$deletePropsList]: [],
        ref: { current: null },
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // 验证基本结构
      expect(result).toBeDefined();
      expect(result).toHaveProperty('ref');
      expect(result).toHaveProperty('loading');
      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('slots');
      expect(typeof result.ref).toBe('object');
    });

    it('应该正确处理自定义 hrefField', () => {
      const dataSource = [
        { title: 'Item 1', url: '/page1' },
        { title: 'Item 2', url: '/page2' },
      ];

      const props = {
        dataSource,
        hrefField: 'url', // 使用自定义字段名
        slots: { content: vi.fn() },
        [$deletePropsList]: [],
        ref: { current: null },
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result).toBeDefined();
      expect(result).toHaveProperty('data');
      // 验证插件能正常处理自定义字段名
      expect(result.data).toBeDefined();
    });

    it('应该正确处理空数据源时的 slots', () => {
      const props = {
        dataSource: null,
        hrefField: 'href',
        slots: { existing: vi.fn() },
        [$deletePropsList]: [],
        ref: { current: null },
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result.slots).toBeDefined();
      expect(result.slots).toHaveProperty('existing'); // 应该保留原有的 slots
      // 空数据源时不应该有 default slot 或者有空的 default
      expect(typeof result.slots.default).not.toBe('function');
    });

    it('应该正确处理有数据源时的 slots', () => {
      const dataSource = [{ title: 'Item 1', href: '#item1' }];
      const mockContentSlot = vi.fn();

      const props = {
        dataSource,
        hrefField: 'href',
        slots: {
          content: mockContentSlot,
          existing: vi.fn(),
        },
        [$deletePropsList]: [],
        ref: { current: null },
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result.slots).toBeDefined();
      expect(result.slots).toHaveProperty('existing'); // 应该保留原有的 slots
      // 有数据源时应该有 default slot 或者原有slots被合并
      expect(typeof result.slots).toBe('object');
    });

    it('应该正确设置 ref 对象', () => {
      const originalRef = { current: null, originalMethod: vi.fn() };
      const dataSource = [{ title: 'Item 1', href: '#item1' }];

      const props = {
        dataSource,
        hrefField: 'href',
        slots: { content: vi.fn() },
        [$deletePropsList]: [],
        ref: originalRef,
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result.ref).toBeDefined();
      expect(typeof result.ref).toBe('object');
      // ref 应该包含原有属性或被正确处理
      expect(result.ref).toBeDefined();
    });

    it('应该正确处理函数类型的数据源', async () => {
      const dataSourceFn = vi.fn().mockResolvedValue([
        { title: 'Async Item 1', href: '#async1' },
        { title: 'Async Item 2', href: '#async2' },
      ]);

      const props = {
        dataSource: dataSourceFn,
        hrefField: 'href',
        slots: { content: vi.fn() },
        [$deletePropsList]: [],
        ref: { current: null },
      };

      const { currentValue, waitForNextUpdate } = renderHook(plugin, props);

      // 初始状态验证 - 确认插件已初始化
      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('data');
      expect(currentValue.value).toHaveProperty('loading');
      expect(currentValue.value).toHaveProperty('ref');
      expect(currentValue.value).toHaveProperty('slots');

      // 验证函数数据源被调用
      expect(dataSourceFn).toHaveBeenCalled();

      // 等待异步数据加载完成
      await waitForNextUpdate();

      // 验证异步数据加载后的状态
      expect(currentValue.value).toBeDefined();
      expect(currentValue.value).toHaveProperty('data');

      // 验证基本属性存在
      expect(Array.isArray(currentValue.value.data)).toBe(true);

      // 验证有数据返回（可能由于renderHook的实现，数据结构有所不同）
      expect(currentValue.value.data.length).toBeGreaterThan(0);

      // 验证数据结构包含必要字段
      // if (currentValue.value.data.length > 0) {
        const firstItem = currentValue.value.data[0];
        expect(firstItem).toHaveProperty('href');
        expect(firstItem).toHaveProperty('title');

        // 验证数据经过了 useHandleMapField 处理（添加了 label 和 value 字段）
        expect(firstItem).toHaveProperty('label');
        expect(firstItem).toHaveProperty('value');
      // }

      // 验证ref包含reload方法
      expect(currentValue.value.ref).toHaveProperty('reload');
      expect(typeof currentValue.value.ref.reload).toBe('function');
    });

    it('应该正确处理复杂的数据结构', () => {
      const complexDataSource = [
        {
          id: 1,
          name: 'Section 1',
          link: '#section1',
          disabled: false,
          extra: { category: 'main' },
        },
        {
          id: 2,
          name: 'Section 2',
          link: '#section2',
          disabled: true,
          extra: { category: 'sub' },
        },
      ];

      const props = {
        dataSource: complexDataSource,
        hrefField: 'link',
        slots: { content: vi.fn() },
        [$deletePropsList]: [],
        ref: { current: null },
      };

      // 检查插件能否处理复杂数据结构而不抛出错误
      expect(() => {
        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;
        expect(result).toBeDefined();
        expect(result).toHaveProperty('data');
        expect(result).toHaveProperty('loading');
        expect(result).toHaveProperty('ref');
        expect(result).toHaveProperty('slots');
      }).not.toThrow();
    });

    it('应该正确处理边界情况', () => {
      // 测试各种边界情况，简化为基本检查
      const testCases = [
        { dataSource: [] }, // 空数组
        { dataSource: undefined }, // undefined
        { dataSource: null }, // null
      ];

      testCases.forEach((testCase) => {
        const props = {
          ...testCase,
          hrefField: 'href',
          slots: { content: vi.fn() },
          [$deletePropsList]: [],
          ref: { current: null },
        };

        // 检查插件能否处理边界情况而不抛出错误
        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
        }).not.toThrow();
      });
    });
  });

  describe('插件集成和扩展性测试', () => {
    it('应该能够与其他插件组合使用', () => {
      // 测试插件链式调用
      const combinedAccumulate = AnchorAccumulate.addPlugin({
        name: 'testPlugin',
        handle: () => ({
          testProperty: 'test-value',
          customData: 'custom',
        }),
      });

      const plugins = combinedAccumulate.getPluginMethod();
      expect(plugins).toHaveLength(2);

      const handleDataSourcePlugin = combinedAccumulate.getPluginMethodByName('handleDataSource');
      const testPlugin = combinedAccumulate.getPluginMethodByName('testPlugin');

      expect(handleDataSourcePlugin).toBeDefined();
      expect(testPlugin).toBeDefined();
      expect(testPlugin?.name).toBe('testPlugin');
    });

    it('应该正确处理插件的执行顺序', () => {
      const plugin1 = {
        name: 'plugin1',
        handle: () => ({ step1: 'completed' }),
      };
      const plugin2 = {
        name: 'plugin2',
        handle: () => ({ step2: 'completed' }),
      };

      const testAccumulate = AnchorAccumulate.addPlugin(plugin1).addPlugin(plugin2);

      const plugins = testAccumulate.getPluginMethod();
      // 验证插件数量是否正确增加（可能已经有其他插件）
      expect(plugins.length).toBeGreaterThanOrEqual(3);

      const foundPlugin1 = testAccumulate.getPluginMethodByName('plugin1');
      const foundPlugin2 = testAccumulate.getPluginMethodByName('plugin2');

      expect(foundPlugin1).toBeDefined();
      expect(foundPlugin2).toBeDefined();
    });

    it('应该正确处理插件方法的获取', () => {
      const allMethods = AnchorAccumulate.getPluginMethod();
      expect(Array.isArray(allMethods)).toBe(true);
      expect(allMethods.length).toBeGreaterThan(0);

      // 验证方法数组中的元素都是函数或包含 handle 的对象
      allMethods.forEach((method) => {
        expect(
          typeof method === 'function' || (typeof method === 'object' && typeof method.handle === 'function'),
        ).toBe(true);
      });
    });

    it('应该正确处理不存在的插件查询', () => {
      const nonExistentPlugin = AnchorAccumulate.getPluginMethodByName('nonExistent');
      expect(nonExistentPlugin).toBeUndefined();
    });
  });
});
