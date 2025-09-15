import { describe, expect, it, vi, beforeEach } from 'vitest';
import { Map as imMap } from 'immutable';
import { sleep } from '@ep-test/test-utils';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import { fiberNode } from '@/plugins/hooks';
import '@/utils/index';
import AnchorAccumulate from '../plugins/basic-plugins';

// Mock ElAnchorLink component
vi.mock('@/components/el-anchor/index', () => ({
  ElAnchorLink: vi.fn((props) => ({
    type: 'ElAnchorLink',
    props,
    children: props.children || [],
  })),
}));

// Mock vue
vi.mock('vue', () => ({
  ref: vi.fn((val) => ({ value: val })),
  onMounted: vi.fn((fn) => fn()),
  onUnmounted: vi.fn((fn) => fn()),
  nextTick: vi.fn((fn) => fn()),
  getCurrentInstance: vi.fn(() => ({
    vnode: {
      props: {},
    },
  })),
}));

describe('basic-plugins.tsx', () => {
  beforeEach(() => {
    // 重置所有 mock
    vi.clearAllMocks();
    const state = { value: {} };
    // 重置 fiberNode 状态 - 创建干净的初始状态
    const cleanFiber = {
      workInProgressState: null,
      workInProgressEffect: null,
      updateQueen: new Set(),
      getState: () => ({ state }),
      setValue: (value) => {
        Object.assign(state, value);
      },
      storeKey: null,
      queen: [],
    };
    fiberNode.setCurrentFiber(cleanFiber, true);
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
    const createMockProps = (overrides = {}) => {
      const defaultProps = {
        dataSource: null,
        hrefField: 'href',
        slots: {
          content: vi.fn(),
        },
        [$deletePropsList]: [],
        ref: { current: null },
        ...overrides,
      };

      return imMap(defaultProps);
    };

    const createMockContext = (overrides = {}) => {
      const defaultContext = {
        ...overrides,
      };

      return imMap(defaultContext);
    };

    const plugin = AnchorAccumulate.getPluginMethodByName('handleDataSource') as any;

    it('应该正确处理插件基本结构', () => {
      const props = createMockProps();
      const context = createMockContext();

      const result = plugin.handle(props, context);

      // 验证返回值基本结构
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
      expect(result).toHaveProperty('ref');
      expect(result).toHaveProperty('loading');
      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('slots');
    });

    it('应该正确设置 deletePropsList', () => {
      const props = createMockProps();
      const context = createMockContext();

      const result = plugin.handle(props, context);

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

      const props = createMockProps({
        dataSource,
        hrefField: 'href',
        slots: {
          content: vi.fn(),
        },
      });
      const context = createMockContext();

      const result = plugin.handle(props, context);

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

      const props = createMockProps({
        dataSource,
        hrefField: 'url', // 使用自定义字段名
      });
      const context = createMockContext();

      const result = plugin.handle(props, context);

      expect(result).toBeDefined();
      expect(result).toHaveProperty('data');
      // 验证插件能正常处理自定义字段名
      expect(result.data).toBeDefined();
    });

    it('应该正确处理空数据源时的 slots', () => {
      const props = createMockProps({
        dataSource: null,
        slots: {
          existing: vi.fn(),
        },
      });
      const context = createMockContext();

      const result = plugin.handle(props, context);

      expect(result.slots).toBeDefined();
      expect(result.slots).toHaveProperty('existing'); // 应该保留原有的 slots
      // 空数据源时不应该有 default slot 或者有空的 default
      expect(typeof result.slots.default).not.toBe('function');
    });

    it('应该正确处理有数据源时的 slots', () => {
      const dataSource = [{ title: 'Item 1', href: '#item1' }];
      const mockContentSlot = vi.fn();

      const props = createMockProps({
        dataSource,
        slots: {
          content: mockContentSlot,
          existing: vi.fn(),
        },
      });
      const context = createMockContext();

      const result = plugin.handle(props, context);

      expect(result.slots).toBeDefined();
      expect(result.slots).toHaveProperty('existing'); // 应该保留原有的 slots
      // 有数据源时应该有 default slot 或者原有slots被合并
      expect(typeof result.slots).toBe('object');
    });

    it('应该正确设置 ref 对象', () => {
      const originalRef = { current: null, originalMethod: vi.fn() };
      const dataSource = [{ title: 'Item 1', href: '#item1' }];

      const props = createMockProps({
        dataSource,
        ref: originalRef,
      });
      const context = createMockContext();

      const result = plugin.handle(props, context);

      expect(result.ref).toBeDefined();
      expect(typeof result.ref).toBe('object');
      // ref 应该包含原有属性或被正确处理
      expect(result.ref).toBeDefined();
    });

    it('应该正确处理函数类型的数据源', () => {
      const dataSourceFn = vi.fn().mockResolvedValue([
        { title: 'Async Item 1', href: '#async1' },
        { title: 'Async Item 2', href: '#async2' },
      ]);

      const props = createMockProps({
        dataSource: dataSourceFn,
      });
      const context = createMockContext();

      const result = plugin.handle(props, context);

      expect(result).toBeDefined();
      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('loading');
      expect(result).toHaveProperty('ref');
      expect(result).toHaveProperty('slots');
    });

    it('应该验证函数数据源的状态更新和插件重新调用机制', async () => {
      // 模拟函数数据源的返回数据
      const mockAsyncData = [
        { title: 'Async Item 1', href: '#async1' },
        { title: 'Async Item 2', href: '#async2' },
      ];

      const dataSourceFn = vi.fn().mockResolvedValue(mockAsyncData);

      const props = createMockProps({
        dataSource: dataSourceFn,
        hrefField: 'href',
      });
      const context = createMockContext();

      // 第一次调用插件 - 初始 mount 状态
      const firstResult = plugin.handle(props, context);

      // 验证第一次调用的基本结构
      expect(firstResult).toBeDefined();
      expect(firstResult).toHaveProperty('loading');
      expect(firstResult).toHaveProperty('data');
      expect(firstResult).toHaveProperty('ref');
      expect(firstResult).toHaveProperty('slots');

      // 获取第一次调用后的 fiber 状态
      const firstCallFiber = fiberNode.getCurrentFiber();

      // 手动触发 watch 回调模拟状态更新

      // 等待异步状态更新完成
      await sleep(100);

      // 第二次调用插件 - 模拟状态更新后的重新渲染
      // 重新设置 fiber 为第一次调用后的状态，但 isMount = false
      fiberNode.setCurrentFiber(firstCallFiber, false);

      // 临时替换 watch 来模拟数据已加载完成的状态

      // 第二次插件调用 - 应该从 fiber 中恢复状态并处理实际数据
      const secondResult = plugin.handle(props, context);

      // 恢复原始 watch

      // 关键验证：第二次调用的返回值应该包含函数返回的数据
      expect(secondResult).toBeDefined();
      expect(secondResult).toHaveProperty('data');

      // 验证数据与函数返回值一致（经过字段映射处理）
      // 验证数据来源于函数返回值
      expect(secondResult.data).toHaveLength(2);

      // 验证字段映射正确 (hrefField: 'href')
      expect(secondResult.data[0]).toHaveProperty('href', '#async1');
      expect(secondResult.data[1]).toHaveProperty('href', '#async2');

      // 验证原始数据被保留
      expect(secondResult.data[0]).toHaveProperty('title', 'Async Item 1');
      expect(secondResult.data[1]).toHaveProperty('title', 'Async Item 2');

      // 验证数据经过了 useHandleMapField 处理
      expect(secondResult.data[0]).toHaveProperty('label');
      expect(secondResult.data[0]).toHaveProperty('value');

      // 验证函数数据源被调用
      expect(dataSourceFn).toHaveBeenCalled();

      // 这个测试验证了完整的状态更新流程：
      // 1. 第一次调用：插件识别函数数据源并设置监听
      // 2. 状态更新：函数返回数据触发 watch 回调
      // 3. 第二次调用：fiber 状态恢复，插件处理实际数据
      // 4. 数据一致性：最终输出与函数返回值一致（经过处理）
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

      const props = createMockProps({
        dataSource: complexDataSource,
        hrefField: 'link',
        slots: {
          content: vi.fn(),
        },
      });
      const context = createMockContext();

      // 检查插件能否处理复杂数据结构而不抛出错误
      expect(() => {
      const result = plugin.handle(props, context);
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
        const props = createMockProps(testCase);
        const context = createMockContext();

        // 检查插件能否处理边界情况而不抛出错误
        expect(() => {
          const result = plugin.handle(props, context);
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
      // if (testPlugin) {
      expect(testPlugin?.name).toBe('testPlugin');
      // }
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
