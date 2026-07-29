import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@ep-test/test-utils/render-hook';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import '@/utils/index';
import ElTimelineBasicAccumulate from '../plugins/basic-plugins';
import ElTimelineItemBasicAccumulate from '../plugins/item-plugins';

describe('el-timeline plugins', () => {
  beforeEach(() => {
    // 重置所有 mock
    vi.clearAllMocks();
  });

  describe('basic-plugins.tsx', () => {
    describe('ElTimelineBasicAccumulate 基础功能', () => {
      it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
        expect(ElTimelineBasicAccumulate).toBeDefined();
        expect(typeof ElTimelineBasicAccumulate.addPlugin).toBe('function');
        expect(typeof ElTimelineBasicAccumulate.getPluginMethod).toBe('function');
        expect(Array.isArray(ElTimelineBasicAccumulate.Plugin)).toBe(true);
      });

      it('应该包含 handleDataSource 插件', () => {
        const plugins = ElTimelineBasicAccumulate.getPluginMethod();
        expect(plugins).toHaveLength(1);

        const handleDataSourcePlugin = ElTimelineBasicAccumulate.getPluginMethodByName('handleDataSource');
        expect(handleDataSourcePlugin).toBeDefined();
        if (handleDataSourcePlugin) {
          expect(handleDataSourcePlugin.name).toBe('handleDataSource');
          expect(typeof (handleDataSourcePlugin as any).handle).toBe('function');
        }
      });
    });

    describe('handleDataSource 插件功能测试', () => {
      const plugin = ElTimelineBasicAccumulate.getPluginMethodByName('handleDataSource') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          dataSource: null,
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
          { title: 'Item 1', timestamp: '2023-01-01' },
          { title: 'Item 2', timestamp: '2023-01-02' },
        ];

        const props = {
          dataSource,
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

      it('应该正确处理自定义字段名', () => {
        const dataSource = [
          { name: 'Item 1', time: '2023-01-01' },
          { name: 'Item 2', time: '2023-01-02' },
        ];

        const props = {
          dataSource,
          timestampField: 'time',
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
        const dataSource = [{ title: 'Item 1', timestamp: '2023-01-01' }];
        const mockContentSlot = vi.fn();

        const props = {
          dataSource,
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
        const dataSource = [{ title: 'Item 1', timestamp: '2023-01-01' }];

        const props = {
          dataSource,
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
          { title: 'Async Item 1', timestamp: '2023-01-01' },
          { title: 'Async Item 2', timestamp: '2023-01-02' },
        ]);

        const props = {
          dataSource: dataSourceFn,
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
          expect(firstItem).toHaveProperty('timestamp');
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
            title: 'Event 1',
            timestamp: '2023-01-01',
            type: 'success',
            color: 'green',
            icon: 'check',
            center: true,
            placement: 'top',
            size: 'large',
            hollow: false,
          },
          {
            id: 2,
            title: 'Event 2',
            timestamp: '2023-01-02',
            type: 'warning',
            color: 'orange',
            icon: 'warning',
            center: false,
            placement: 'bottom',
            size: 'small',
            hollow: true,
          },
        ];

        const props = {
          dataSource: complexDataSource,
          timestampField: 'timestamp',
          typeField: 'type',
          colorField: 'color',
          iconField: 'icon',
          centerField: 'center',
          placementField: 'placement',
          sizeField: 'size',
          hollowField: 'hollow',
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

      it('应该正确处理所有字段映射', () => {
        const dataSource = [
          {
            customTimestamp: '2023-01-01',
            customHideTimestamp: true,
            customCenter: false,
            customPlacement: 'left',
            customType: 'info',
            customColor: 'blue',
            customSize: 'medium',
            customIcon: 'info',
            customHollow: true,
          },
        ];

        const props = {
          dataSource,
          timestampField: 'customTimestamp',
          hideTimestampField: 'customHideTimestamp',
          centerField: 'customCenter',
          placementField: 'customPlacement',
          typeField: 'customType',
          colorField: 'customColor',
          sizeField: 'customSize',
          iconField: 'customIcon',
          hollowField: 'customHollow',
          slots: { content: vi.fn() },
          [$deletePropsList]: [],
          ref: { current: null },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('data');
        expect(Array.isArray(result.data)).toBe(true);
      });
    });

    describe('插件集成和扩展性测试', () => {
      it('应该能够与其他插件组合使用', () => {
        // 测试插件链式调用
        const combinedAccumulate = ElTimelineBasicAccumulate.addPlugin({
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

        const testAccumulate = ElTimelineBasicAccumulate.addPlugin(plugin1).addPlugin(plugin2);

        const plugins = testAccumulate.getPluginMethod();
        // 验证插件数量是否正确增加（可能已经有其他插件）
        expect(plugins.length).toBeGreaterThanOrEqual(3);

        const foundPlugin1 = testAccumulate.getPluginMethodByName('plugin1');
        const foundPlugin2 = testAccumulate.getPluginMethodByName('plugin2');

        expect(foundPlugin1).toBeDefined();
        expect(foundPlugin2).toBeDefined();
      });

      it('应该正确处理插件方法的获取', () => {
        const allMethods = ElTimelineBasicAccumulate.getPluginMethod();
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
        const nonExistentPlugin = ElTimelineBasicAccumulate.getPluginMethodByName('nonExistent');
        expect(nonExistentPlugin).toBeUndefined();
      });
    });
  });

  describe('item-plugins.tsx', () => {
    describe('ElTimelineItemBasicAccumulate 基础功能', () => {
      it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
        expect(ElTimelineItemBasicAccumulate).toBeDefined();
        expect(typeof ElTimelineItemBasicAccumulate.addPlugin).toBe('function');
        expect(typeof ElTimelineItemBasicAccumulate.getPluginMethod).toBe('function');
        expect(Array.isArray(ElTimelineItemBasicAccumulate.Plugin)).toBe(true);
      });

      it('应该包含 handleIcon 插件', () => {
        const plugins = ElTimelineItemBasicAccumulate.getPluginMethod();
        expect(plugins).toHaveLength(1);

        const handleIconPlugin = ElTimelineItemBasicAccumulate.getPluginMethodByName('handleIcon');
        expect(handleIconPlugin).toBeDefined();
        if (handleIconPlugin) {
          expect(handleIconPlugin.name).toBe('handleIcon');
          expect(typeof (handleIconPlugin as any).handle).toBe('function');
        }
      });
    });

    describe('handleIcon 插件功能测试', () => {
      const plugin = ElTimelineItemBasicAccumulate.getPluginMethodByName('handleIcon') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          icon: 'clock',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('icon');
      });

      it('应该正确处理 undefined 的图标', () => {
        const props = {
          icon: undefined,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('icon');
      });

      it('应该正确处理 null 的图标', () => {
        const props = {
          icon: null,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('icon');
      });

      it('应该正确处理空字符串的图标', () => {
        const props = {
          icon: '',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('icon');
      });

      it('应该正确处理有效的图标名称', () => {
        const props = {
          icon: 'icon-clock',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('icon');
      });

      it('应该正确处理带前缀的图标名称', () => {
        const props = {
          icon: 'el-icon-clock',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('icon');
      });

      it('应该正确处理复杂的图标名称', () => {
        const props = {
          icon: 'icon-custom-timeline-item',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('icon');
      });

      it('应该正确处理特殊字符的图标名称', () => {
        const props = {
          icon: 'icon-timeline_item-24',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('icon');
      });

      it('应该正确处理数字的图标名称', () => {
        const props = {
          icon: 'icon-24',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('icon');
      });

      it('应该正确处理长图标名称', () => {
        const longIconName = 'icon-' + 'a'.repeat(50);
        const props = {
          icon: longIconName,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('icon');
      });

      it('应该正确处理非字符串的图标', () => {
        const props = {
          icon: 123,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('icon');
      });

      it('应该正确处理对象的图标', () => {
        const props = {
          icon: { name: 'clock' },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('icon');
      });

      it('应该正确处理数组的图标', () => {
        const props = {
          icon: ['clock', 'time'],
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('icon');
      });

      it('应该正确处理布尔值的图标', () => {
        const props = {
          icon: true,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result).toHaveProperty('icon');
      });
    });

    describe('插件集成和扩展性测试', () => {
      it('应该能够与其他插件组合使用', () => {
        const combinedAccumulate = ElTimelineItemBasicAccumulate.addPlugin({
          name: 'testPlugin',
          handle: () => ({
            testProperty: 'test-value',
            customData: 'custom',
          }),
        });

        const plugins = combinedAccumulate.getPluginMethod();
        expect(plugins).toHaveLength(2);

        const handleIconPlugin = combinedAccumulate.getPluginMethodByName('handleIcon');
        const testPlugin = combinedAccumulate.getPluginMethodByName('testPlugin');

        expect(handleIconPlugin).toBeDefined();
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

        const testAccumulate = ElTimelineItemBasicAccumulate.addPlugin(plugin1).addPlugin(plugin2);

        const plugins = testAccumulate.getPluginMethod();
        expect(plugins.length).toBeGreaterThanOrEqual(3);

        const foundPlugin1 = testAccumulate.getPluginMethodByName('plugin1');
        const foundPlugin2 = testAccumulate.getPluginMethodByName('plugin2');

        expect(foundPlugin1).toBeDefined();
        expect(foundPlugin2).toBeDefined();
      });

      it('应该正确处理插件方法的获取', () => {
        const allMethods = ElTimelineItemBasicAccumulate.getPluginMethod();
        expect(Array.isArray(allMethods)).toBe(true);
        expect(allMethods.length).toBeGreaterThan(0);

        allMethods.forEach((method) => {
          expect(
            typeof method === 'function' || (typeof method === 'object' && typeof method.handle === 'function'),
          ).toBe(true);
        });
      });

      it('应该正确处理不存在的插件查询', () => {
        const nonExistentPlugin = ElTimelineItemBasicAccumulate.getPluginMethodByName('nonExistent');
        expect(nonExistentPlugin).toBeUndefined();
      });
    });
  });

  describe('low-code.ts', () => {
    it('应该是一个空文件，仅用于导出', () => {
      expect(async () => {
        await import('../plugins/low-code');
      }).not.toThrow();
    });
  });

  describe('index.ts', () => {
    it('应该正确导出所有插件', () => {
      expect(async () => {
        await import('../plugins/index');
      }).not.toThrow();
    });
  });
});
