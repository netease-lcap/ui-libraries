import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHooks } from '@ep-test/test-utils/render-hook';
import { $deletePropsList } from '@/plugins/constants';
import '@/utils/index';
import TableAccumulate from '../plugins/index';

describe('el-table 插件集成测试', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('第一部分：插件链式执行测试', () => {
    it('应该按顺序执行所有插件并合并状态', async () => {
      const plugins = TableAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        dataSource: [
          { id: 1, name: 'Item 1', age: 20 },
          { id: 2, name: 'Item 2', age: 25 },
          { id: 3, name: 'Item 3', age: 30 },
        ],
        rowKey: 'id',
        pagination: false,
        slots: {},
        ref: {},
        emit: vi.fn(),
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      const result = currentValue.value;

      expect(result).toBeDefined();
      expect(result.data).toBeDefined();
      expect(result.ref).toBeDefined();
      expect(result.ref.reload).toBeDefined();
    });

    it('应该正确处理最小配置', async () => {
      const plugins = TableAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        slots: {},
        ref: {},
        emit: vi.fn(),
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result).toBeDefined();
    });
  });

  describe('第二部分：排序状态处理测试', () => {
    it('应该正确初始化排序状态', async () => {
      const plugins = TableAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const props = {
        field: 'name',
        order: 'ascending',
        slots: {},
        ref: {},
        emit,
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.sort).toBeDefined();
      expect(result.order).toBeDefined();
      expect(result.defaultSort).toBeDefined();
      expect(result.defaultSort.prop).toBe('name');
      expect(result.defaultSort.order).toBe('ascending');
    });

    it('应该正确处理默认排序字段', async () => {
      const plugins = TableAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        defaultField: 'age',
        defaultOrder: 'descending',
        slots: {},
        ref: {},
        emit: vi.fn(),
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.sort).toBe('age');
      expect(result.order).toBe('descending');
    });

    it('应该提供 setSort 和 setOrder 方法', async () => {
      const plugins = TableAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        slots: {},
        ref: {},
        emit: vi.fn(),
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.setSort).toBeDefined();
      expect(typeof result.setSort).toBe('function');
      expect(result.setOrder).toBeDefined();
      expect(typeof result.setOrder).toBe('function');
    });
  });

  describe('第三部分：分页状态处理测试', () => {
    it('应该正确初始化分页状态', async () => {
      const plugins = TableAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        currentPage: 2,
        pageSize: 20,
        slots: {},
        ref: {},
        emit: vi.fn(),
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.currentPage).toBe(2);
      expect(result.pageSize).toBe(20);
      expect(result.pageProps).toBeDefined();
    });

    it('应该正确处理默认分页值', async () => {
      const plugins = TableAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        defaultCurrentPage: 3,
        defaultPageSize: 50,
        slots: {},
        ref: {},
        emit: vi.fn(),
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.currentPage).toBe(3);
      expect(result.pageSize).toBe(50);
    });

    it('应该正确解析 pageSizes JSON 字符串', async () => {
      const plugins = TableAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        pageSizes: '[5, 10, 20, 50]',
        slots: {},
        ref: {},
        emit: vi.fn(),
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.pageSizes).toEqual([5, 10, 20, 50]);
    });

    it('应该正确处理 pageSizes 数组', async () => {
      const plugins = TableAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        pageSizes: [15, 30, 45],
        slots: {},
        ref: {},
        emit: vi.fn(),
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.pageSizes).toEqual([15, 30, 45]);
    });

    it('应该使用默认 pageSizes 当格式无效时', async () => {
      const plugins = TableAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        pageSizes: 'invalid',
        slots: {},
        ref: {},
        emit: vi.fn(),
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.pageSizes).toEqual([10, 20, 50]);
    });
  });

  describe('第四部分：分页配置处理测试', () => {
    it('应该正确配置分页布局（包含 total 和 jumper）', async () => {
      const plugins = TableAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        pagination: true,
        total: 100,
        showTotal: true,
        showJumper: true,
        slots: {},
        ref: {},
        emit: vi.fn(),
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);

      const result = currentValue.value;

      expect(result.pagination).toBe(true);
      expect(result.pageProps.layout).toContain('total');
      expect(result.pageProps.layout).toContain('jumper');
    });

    it('应该正确配置分页布局（不含 total 和 jumper）', async () => {
      const plugins = TableAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        pagination: true,
        showTotal: false,
        showJumper: false,
        slots: {},
        ref: {},
        emit: vi.fn(),
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.pageProps.layout).not.toContain('total');
      expect(result.pageProps.layout).not.toContain('jumper');
    });
  });

  describe('第五部分：粘性定位处理测试', () => {
    it('应该正确处理 sticky 模式', async () => {
      const plugins = TableAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        sticky: true,
        slots: {},
        ref: {},
        emit: vi.fn(),
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.class).toContain('sticky-table');
      expect(result.style).toBeDefined();
      expect(result.tableStyle['--el-table-sticky-offset']).toBe('8px');
    });

    it('应该正确处理自定义 stickyOffset', async () => {
      const plugins = TableAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        sticky: true,
        stickyOffset: 20,
        slots: {},
        ref: {},
        emit: vi.fn(),
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);

      const result = currentValue.value;

      expect(result.tableStyle['--el-table-sticky-offset']).toBe('20px');
    });

    it('应该合并自定义 class 和 style', async () => {
      const plugins = TableAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        sticky: true,
        class: 'custom-class',
        style: { backgroundColor: 'red' },
        slots: {},
        ref: {},
        emit: vi.fn(),
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);

      const result = currentValue.value;

      expect(result.class).toContain('sticky-table');
      expect(result.class).toContain('custom-class');
      expect(result.tableStyle.backgroundColor).toBe('red');
    });
  });

  describe('第六部分：文本对齐处理测试', () => {
    it('应该正确处理文本对齐样式', async () => {
      const plugins = TableAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        style: { 'text-align': 'center' },
        slots: {},
        ref: {},
        emit: vi.fn(),
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.tableStyle['--cw-style-text-align']).toBe('center');
    });

    it('应该使用默认的 left 对齐', async () => {
      const plugins = TableAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        slots: {},
        ref: {},
        emit: vi.fn(),
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.tableStyle['--cw-style-text-align']).toBe('left');
    });
  });

  describe('第七部分：数据源处理测试', () => {
    it('应该正确处理静态数据源', async () => {
      const plugins = TableAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { id: 1, name: 'Alice', age: 25 },
        { id: 2, name: 'Bob', age: 30 },
      ];
      const props = {
        dataSource,
        rowKey: 'id',
        pagination: false,
        slots: {},
        ref: {},
        emit: vi.fn(),
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.data.length).toBe(2);
      expect(currentValue.value.pageProps.total).toBe(2);
    });

    it('应该正确处理异步数据源', async () => {
      const plugins = TableAccumulate.getPluginMethod({ isInDesigner: false });
      const asyncDataSource = vi.fn().mockResolvedValue({
        list: [
          { id: 1, name: 'Item 1' },
          { id: 2, name: 'Item 2' },
        ],
        total: 10,
      });
      const props = {
        dataSource: asyncDataSource,
        rowKey: 'id',
        pagination: true,
        slots: {},
        ref: {},
        emit: vi.fn(),
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(asyncDataSource).toHaveBeenCalled();
      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.pageProps.total).toBe(10);
      expect(currentValue.value.loading).toBeDefined();
    });

    it('应该正确设置 ref.reload 方法', async () => {
      const plugins = TableAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [{ id: 1, name: 'Test' }];
      const props = {
        dataSource,
        rowKey: 'id',
        slots: {},
        ref: {},
        emit: vi.fn(),
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.ref.reload).toBeDefined();
      expect(typeof currentValue.value.ref.reload).toBe('function');
    });

    it('应该正确处理树形数据（使用 parentField）', async () => {
      const plugins = TableAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { id: 1, name: 'Root', parent: null },
        { id: 2, name: 'Child 1', parent: 1 },
        { id: 3, name: 'Child 2', parent: 1 },
      ];
      const props = {
        dataSource,
        rowKey: 'id',
        parentField: 'parent',
        slots: {},
        ref: {},
        emit: vi.fn(),
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
    });

    it('应该调用 onBefore 和 onSuccess 回调', async () => {
      const plugins = TableAccumulate.getPluginMethod({ isInDesigner: false });
      const onBefore = vi.fn();
      const onSuccess = vi.fn();
      const asyncDataSource = vi.fn().mockResolvedValue([{ id: 1, name: 'Item 1' }]);
      const props = {
        dataSource: asyncDataSource,
        rowKey: 'id',
        onBefore,
        onSuccess,
        slots: {},
        ref: {},
        emit: vi.fn(),
        [$deletePropsList]: [],
      };

      const { waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(onBefore).toHaveBeenCalled();
      expect(onSuccess).toHaveBeenCalled();
    });

    it('应该正确处理空数据源', async () => {
      const testCases = [{ dataSource: null }, { dataSource: undefined }, { dataSource: [] }];

      testCases.forEach(async (testCase) => {
        const plugins = TableAccumulate.getPluginMethod({ isInDesigner: false });
        const props = {
          ...testCase,
          slots: {},
          ref: {},
          emit: vi.fn(),
          [$deletePropsList]: [],
        };

        const { currentValue } = await renderHooks(plugins, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
      });
    });
  });

  describe('第八部分：高度配置测试', () => {
    it('应该正确处理 height 属性', async () => {
      const plugins = TableAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        height: 400,
        slots: {},
        ref: {},
        emit: vi.fn(),
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.height).toBe(400);
    });

    it('应该正确处理 maxHeight 属性', async () => {
      const plugins = TableAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        maxHeight: 600,
        slots: {},
        ref: {},
        emit: vi.fn(),
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.maxHeight).toBe(600);
    });

    it('应该从 style 中读取 height', async () => {
      const plugins = TableAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        style: { height: '500px' },
        slots: {},
        ref: {},
        emit: vi.fn(),
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.height).toBe('500px');
    });
  });

  describe('第九部分：选中值处理测试', () => {
    it('应该正确处理单选 selectedValue', async () => {
      const plugins = TableAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        selectedValue: 1,
        rowKey: 'id',
        slots: {},
        ref: {
          store: {
            setCurrentRowKey: vi.fn(),
          },
        },
        emit: vi.fn(),
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.onCurrentChange).toBeDefined();
    });

    it('应该正确处理多选 selectedValues', async () => {
      const plugins = TableAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
      ];
      const props = {
        dataSource,
        selectedValues: [1, 2],
        rowKey: 'id',
        slots: {},
        ref: {
          clearSelection: vi.fn(),
          toggleRowSelection: vi.fn(),
        },
        emit: vi.fn(),
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.onSelect).toBeDefined();
    });
  });

  describe('第十部分：插件交叉组合测试', () => {
    it('交叉组合：dataSource + pagination + sort', async () => {
      const plugins = TableAccumulate.getPluginMethod({ isInDesigner: false });
      const asyncDataSource = vi.fn().mockResolvedValue({
        list: Array.from({ length: 5 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` })),
        total: 50,
      });
      const props = {
        dataSource: asyncDataSource,
        pagination: true,
        currentPage: 2,
        pageSize: 10,
        field: 'name',
        order: 'ascending',
        rowKey: 'id',
        slots: {},
        ref: {},
        emit: vi.fn(),
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(asyncDataSource).toHaveBeenCalled();
      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.pagination).toBe(true);
      expect(currentValue.value.currentPage).toBe(2);
      expect(currentValue.value.sort).toBe('name');
    });

    it('交叉组合：sticky + height + textAlign', async () => {
      const plugins = TableAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        sticky: true,
        height: 500,
        style: { 'text-align': 'center' },
        slots: {},
        ref: {},
        emit: vi.fn(),
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.class).toContain('sticky-table');
      expect(result.height).toBe(500);
      expect(result.tableStyle['--cw-style-text-align']).toBe('center');
    });

    it('交叉组合：树形数据 + 分页 + 选中', async () => {
      const plugins = TableAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { id: 1, name: 'Root', parent: null },
        { id: 2, name: 'Child 1', parent: 1 },
        { id: 3, name: 'Child 2', parent: 1 },
      ];
      const props = {
        dataSource,
        rowKey: 'id',
        parentField: 'parent',
        pagination: true,
        selectedValues: [1],
        slots: {},
        ref: {
          clearSelection: vi.fn(),
          toggleRowSelection: vi.fn(),
        },
        emit: vi.fn(),
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.pagination).toBe(true);
    });
  });

  describe('第十一部分：边界和异常测试', () => {
    it('边界测试：大量数据', async () => {
      const plugins = TableAccumulate.getPluginMethod({ isInDesigner: false });
      const largeDataSource = Array.from({ length: 1000 }, (_, i) => ({
        id: i + 1,
        name: `Item ${i + 1}`,
      }));
      const props = {
        dataSource: largeDataSource,
        rowKey: 'id',
        pagination: true,
        pageSize: 50,
        slots: {},
        ref: {},
        emit: vi.fn(),
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.pageProps.total).toBe(1000);
    });

    it('边界测试：无效的 pageSizes 格式', async () => {
      const invalidFormats = ['invalid json', '{not: "array"}', null, undefined];

      invalidFormats.forEach(async (format) => {
        const plugins = TableAccumulate.getPluginMethod({ isInDesigner: false });
        const props = {
          pageSizes: format,
          slots: {},
          ref: {},
          emit: vi.fn(),
          [$deletePropsList]: [],
        };

        const { currentValue } = await renderHooks(plugins, props);
        const result = currentValue.value;

        expect(result.pageSizes).toEqual([10, 20, 50]);
      });
    });

    it('边界测试：数据源返回格式错误', async () => {
      const plugins = TableAccumulate.getPluginMethod({ isInDesigner: false });
      const asyncDataSource = vi.fn().mockResolvedValue(null);
      const props = {
        dataSource: asyncDataSource,
        rowKey: 'id',
        slots: {},
        ref: {},
        emit: vi.fn(),
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value).toBeDefined();
    });
  });

  describe('第十二部分：props 更新响应式测试（使用 setValue）', () => {
    it('响应式测试：使用 setValue 更新 dataSource', async () => {
      const plugins = TableAccumulate.getPluginMethod({ isInDesigner: false });
      const initialData = [
        { id: 1, name: 'Old Item 1' },
        { id: 2, name: 'Old Item 2' },
      ];
      const props = {
        dataSource: initialData,
        rowKey: 'id',
        slots: {},
        ref: {},
        emit: vi.fn(),
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data.length).toBe(2);

      const newData = [
        { id: 3, name: 'New Item 1' },
        { id: 4, name: 'New Item 2' },
        { id: 5, name: 'New Item 3' },
      ];
      await setValue({ dataSource: newData });

      await waitForNextUpdate();

      expect(currentValue.value.data.length).toBe(3);
    });

    it('响应式测试：使用 setValue 更新分页（不需要 waitForNextUpdate）', async () => {
      const plugins = TableAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        currentPage: 1,
        pageSize: 10,
        slots: {},
        ref: {},
        emit: vi.fn(),
        [$deletePropsList]: [],
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.currentPage).toBe(1);

      await setValue({ currentPage: 3 });

      expect(currentValue.value.currentPage).toBe(3);

      await setValue({ pageSize: 20 });

      expect(currentValue.value.pageSize).toBe(20);
    });

    it('响应式测试：使用 setValue 更新排序字段', async () => {
      const plugins = TableAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        field: 'name',
        order: 'ascending',
        slots: {},
        ref: {},
        emit: vi.fn(),
        [$deletePropsList]: [],
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.sort).toBe('name');

      await setValue({ field: 'age' });

      expect(currentValue.value.sort).toBe('age');

      await setValue({ order: 'descending' });

      expect(currentValue.value.order).toBe('descending');
    });

    it('响应式测试：使用 setValue 切换 sticky', async () => {
      const plugins = TableAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        sticky: false,
        slots: {},
        ref: {},
        emit: vi.fn(),
        [$deletePropsList]: [],
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.class).not.toContain('sticky-table');

      await setValue({ sticky: true });

      expect(currentValue.value.class).toContain('sticky-table');
    });

    it('响应式测试：使用 setValue 更新 height', async () => {
      const plugins = TableAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        height: 300,
        slots: {},
        ref: {},
        emit: vi.fn(),
        [$deletePropsList]: [],
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.height).toBe(300);

      await setValue({ height: 500 });

      expect(currentValue.value.height).toBe(500);
    });

    it('响应式测试：使用 setValue 切换 pagination', async () => {
      const plugins = TableAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        pagination: false,
        slots: {},
        ref: {},
        emit: vi.fn(),
        [$deletePropsList]: [],
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.pagination).toBe(false);

      await setValue({ pagination: true });

      expect(currentValue.value.pagination).toBe(true);
    });

    it('响应式测试：使用 setValue 同时更新多个属性', async () => {
      const plugins = TableAccumulate.getPluginMethod({ isInDesigner: false });
      const initialData = [{ id: 1, name: 'Old' }];
      const props = {
        dataSource: initialData,
        rowKey: 'id',
        currentPage: 1,
        pageSize: 10,
        sticky: false,
        height: 300,
        slots: {},
        ref: {},
        emit: vi.fn(),
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      const newData = [
        { id: 2, name: 'New 1' },
        { id: 3, name: 'New 2' },
      ];

      await setValue({
        dataSource: newData,
        currentPage: 2,
        pageSize: 20,
        sticky: true,
        height: 500,
      });

      await waitForNextUpdate();

      expect(currentValue.value.data.length).toBe(2);
      expect(currentValue.value.currentPage).toBe(2);
      expect(currentValue.value.pageSize).toBe(20);
      expect(currentValue.value.class).toContain('sticky-table');
      expect(currentValue.value.height).toBe(500);
    });
  });

  describe('第十三部分：完整流程集成测试', () => {
    it('完整流程：异步加载 → 分页 → 排序 → 选择', async () => {
      const plugins = TableAccumulate.getPluginMethod({ isInDesigner: false });
      const asyncDataSource = vi.fn().mockResolvedValue({
        list: Array.from({ length: 10 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}`, age: 20 + i })),
        total: 100,
      });

      const props = {
        dataSource: asyncDataSource,
        rowKey: 'id',
        pagination: true,
        currentPage: 1,
        pageSize: 10,
        field: 'age',
        order: 'ascending',
        selectedValues: [1, 3],
        slots: {},
        ref: {
          clearSelection: vi.fn(),
          toggleRowSelection: vi.fn(),
        },
        emit: vi.fn(),
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(asyncDataSource).toHaveBeenCalled();
      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.pageProps.total).toBe(100);
      expect(currentValue.value.sort).toBe('age');
      expect(currentValue.value.onSelect).toBeDefined();
    });

    it('完整流程：树形数据 + 分页 + 粘性定位 + 高度限制', async () => {
      const plugins = TableAccumulate.getPluginMethod({ isInDesigner: false });
      const treeData = [
        { id: 1, name: 'Root 1', parent: null },
        { id: 2, name: 'Child 1-1', parent: 1 },
        { id: 3, name: 'Root 2', parent: null },
        { id: 4, name: 'Child 2-1', parent: 3 },
      ];

      const props = {
        dataSource: treeData,
        rowKey: 'id',
        parentField: 'parent',
        pagination: true,
        sticky: true,
        height: 600,
        showTotal: true,
        showJumper: true,
        slots: {},
        ref: {},
        emit: vi.fn(),
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.pagination).toBe(true);
      expect(currentValue.value.class).toContain('sticky-table');
      expect(currentValue.value.height).toBe(600);
    });
  });
});
