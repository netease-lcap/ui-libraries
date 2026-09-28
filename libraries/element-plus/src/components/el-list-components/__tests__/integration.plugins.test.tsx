/**
 * el-list-components 插件集成测试
 * 覆盖核心插件：handlePageState, handleSelect, handleDataSource, handleColumn
 */
import { describe, it, expect, vi } from 'vitest';
import { renderHooks } from '@ep-test/test-utils/render-hook';
import listComponentsBasicAccumulate from '../plugins/index';

describe('el-list-components 插件集成测试', () => {
  describe('handlePageState - 分页状态', () => {
    it('应该处理 currentPage 和 pageSize', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const props = {
        currentPage: 1,
        pageSize: 10,
        emit,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.currentPage).toBe(1);
      expect(currentValue.value.pageSize).toBe(10);
    });

    it('应该使用默认值', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const props = { emit };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.currentPage).toBe(1);
      expect(currentValue.value.pageSize).toBe(10);
    });

    it('应该处理 pageSizes', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const props = {
        pageSizes: [20, 40, 60],
        emit,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.pageSizes).toEqual([20, 40, 60]);
    });

    it('应该处理 JSON 字符串的 pageSizes', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const props = {
        pageSizes: '[15, 30, 50]',
        emit,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.pageSizes).toEqual([15, 30, 50]);
    });
  });

  describe('handleSelect - 选择功能', () => {
    it('应该处理 single 选择模式', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const props = {
        selection: 'single',
        modelValue: null,
        emit,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.clickFn).toBeDefined();
      expect(typeof currentValue.value.clickFn).toBe('function');
    });

    it('应该处理 multiple 选择模式', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const props = {
        selection: 'multiple',
        modelValue: [],
        emit,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.value).toEqual([]);
    });

    it('应该处理 clearable', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const props = {
        selection: 'single',
        clearable: true,
        emit,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.clickFn).toBeDefined();
    });
  });

  describe('handleDataSource - 数据源', () => {
    it('应该处理静态数据源', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const props = {
        dataSource: [
          { label: 'Item 1', value: '1' },
          { label: 'Item 2', value: '2' },
        ],
        emit,
        pagination: 'none',
        slots: {},
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);
      await waitForNextUpdate();

      expect(currentValue.value.ref.data).toBeDefined();
      expect(currentValue.value.ref.reload).toBeDefined();
    });

    it('应该提供 reload 方法', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const props = {
        dataSource: [],
        emit,
        slots: {},
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);
      await waitForNextUpdate();

      expect(typeof currentValue.value.ref.reload).toBe('function');
    });
  });

  describe('handleColumn - 列布局', () => {
    it('应该处理 column 属性', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const props = {
        column: 3,
        rowGap: 10,
        columnGap: 20,
        emit,
        slots: {},
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.style['--el-list-components-column']).toBe(3);
      expect(currentValue.value.style['--row-gap']).toBe('10px');
      expect(currentValue.value.style['--column-gap']).toBe('20px');
    });

    it('应该处理 equalWidth', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const props = {
        column: 4,
        equalWidth: true,
        emit,
        slots: {},
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.class).toContain('isEqualWidth');
    });

    it('noWrapper 时不应添加布局 class 与列相关 style', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const props = {
        noWrapper: true,
        column: 3,
        equalWidth: true,
        rowGap: 10,
        columnGap: 20,
        emit,
        slots: {},
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.class).toBeUndefined();
      expect(currentValue.value.style).toBeUndefined();
      expect(currentValue.value.noWrapper).toBe(true);
    });

    it('应该处理 column <= 0 的情况', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const props = {
        column: 0,
        emit,
        slots: {},
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.style['--el-list-components-column']).toBe(0);
    });

    it('应该在 column=0 且均分宽度时添加 isEqualWidthByMax', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const props = {
        column: 0,
        equalWidth: true,
        emit,
        slots: {},
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.class).toContain('isEqualWidthByMax');
      expect(currentValue.value.class).toContain('isAutoWrap');
      expect(currentValue.value.class).not.toContain('isColumn');
    });

    it('应该在 column=0 时应用 rowGap 和 columnGap', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const props = {
        column: 0,
        rowGap: 12,
        columnGap: 24,
        emit,
        slots: {},
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.class).toContain('isAutoWrap');
      expect(currentValue.value.style['--row-gap']).toBe('12px');
      expect(currentValue.value.style['--column-gap']).toBe('24px');
      expect(currentValue.value.style.rowGap).toBe('12px');
      expect(currentValue.value.style.columnGap).toBe('24px');
      expect(currentValue.value.style.gap).toBe('12px 24px');
    });
  });

  describe('props 更新响应式测试', () => {
    it('应该响应 currentPage 的变化', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const props = {
        currentPage: 1,
        emit,
        slots: {},
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.currentPage).toBe(1);

      await setValue({ currentPage: 2, emit, slots: {} });

      expect(currentValue.value.currentPage).toBe(2);
    });

    it('应该响应 dataSource 的变化', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const props = {
        dataSource: [{ label: 'Item 1', value: '1' }],
        emit,
        slots: {},
      };

      const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);
      await waitForNextUpdate();

      await setValue({
        dataSource: [
          { label: 'Item 1', value: '1' },
          { label: 'Item 2', value: '2' },
        ],
        emit,
        slots: {},
      });
      await waitForNextUpdate();

      expect(currentValue.value.ref.data).toBeDefined();
    });
  });

  describe('handleSelect - 选择功能高级场景', () => {
    it('应该处理 single + clearable 的取消选择', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const props = {
        selection: 'single',
        clearable: true,
        modelValue: 'item1',
        emit,
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.value).toBe('item1');
      expect(currentValue.value.clickFn).toBeDefined();

      // 点击已选中的项应该取消选择
      await setValue({ selection: 'single', clearable: true, modelValue: undefined, emit });
      expect(currentValue.value.value).toBeUndefined();
    });

    it('应该处理 multiple + clearable 的取消选择', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const props = {
        selection: 'multiple',
        clearable: true,
        modelValue: ['item1', 'item2'],
        emit,
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.value).toEqual(['item1', 'item2']);

      // 取消选择 item1
      await setValue({ selection: 'multiple', clearable: true, modelValue: ['item2'], emit });
      expect(currentValue.value.value).toEqual(['item2']);
    });

    it('应该处理 multiple 模式添加新选项', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const props = {
        selection: 'multiple',
        modelValue: ['item1'],
        emit,
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      // 添加新选项
      await setValue({ selection: 'multiple', modelValue: ['item1', 'item2'], emit });
      expect(currentValue.value.value).toEqual(['item1', 'item2']);
    });

    it('应该处理 selection=none 的情况', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const props = {
        selectionMode: 'none',
        emit,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.class).not.toContain('selection');
    });
  });

  describe('handlePaginationProps - 分页属性', () => {
    it('应该处理 showTotal 和 showJumper', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const props = {
        showTotal: true,
        showJumper: true,
        currentPage: 1,
        pageSize: 10,
        emit,
        slots: {},
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.pageProps.layout).toContain('total');
      expect(currentValue.value.pageProps.layout).toContain('jumper');
    });

    it('应该处理不显示 total 和 jumper', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const props = {
        showTotal: false,
        showJumper: false,
        currentPage: 1,
        pageSize: 10,
        emit,
        slots: {},
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.pageProps.layout).not.toContain('total');
      expect(currentValue.value.pageProps.layout).not.toContain('jumper');
    });

    it('应该处理 onPageChange 回调', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const onPageChange = vi.fn();
      const props = {
        onPageChange,
        emit,
        slots: {},
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.pageProps.onPageChange).toBe(onPageChange);
    });
  });

  describe('handleDataSource - 数据源高级场景', () => {
    it('应该处理自定义 idField 和 textField', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const props = {
        dataSource: [
          { name: 'Option A', id: 'a' },
          { name: 'Option B', id: 'b' },
        ],
        idField: 'id',
        textField: 'name',
        emit,
        slots: {},
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);
      await waitForNextUpdate();

      expect(currentValue.value.ref.data).toBeDefined();
      expect(currentValue.value.ref.data.length).toBe(2);
    });

    it('应该处理 pagination=page 模式', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const props = {
        dataSource: [
          { label: 'Item 1', value: '1' },
          { label: 'Item 2', value: '2' },
          { label: 'Item 3', value: '3' },
        ],
        pagination: 'page',
        currentPage: 1,
        pageSize: 2,
        emit,
        slots: {},
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);
      await waitForNextUpdate();

      expect(currentValue.value.pagination).toBe('page');
      expect(currentValue.value.pageProps.total).toBe(3);
    });

    it('应该处理 pagination=autoMore 模式', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const props = {
        dataSource: [
          { label: 'Item 1', value: '1' },
          { label: 'Item 2', value: '2' },
        ],
        pagination: 'autoMore',
        emit,
        slots: {},
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);
      await waitForNextUpdate();

      expect(currentValue.value.class).toContain('el-list-components-infinite-scroll');
    });

    it('应该处理异步数据源', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const asyncDataSource = vi.fn().mockResolvedValue([
        { label: 'Async Item 1', value: 'a1' },
        { label: 'Async Item 2', value: 'a2' },
      ]);
      const props = {
        dataSource: asyncDataSource,
        emit,
        slots: {},
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);
      await waitForNextUpdate();

      expect(asyncDataSource).toHaveBeenCalled();
      expect(currentValue.value.ref.reload).toBeDefined();
    });

    it('应该处理异步数据源返回对象格式', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const asyncDataSource = vi.fn().mockResolvedValue({
        list: [
          { label: 'Item 1', value: '1' },
          { label: 'Item 2', value: '2' },
        ],
        total: 10,
      });
      const props = {
        dataSource: asyncDataSource,
        emit,
        slots: {},
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);
      await waitForNextUpdate();

      expect(currentValue.value.pageProps.total).toBe(10);
    });
  });

  describe('handlePageState - 分页状态高级场景', () => {
    it('应该处理 defaultCurrentPage 和 defaultPageSize', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const props = {
        defaultCurrentPage: 2,
        defaultPageSize: 20,
        emit,
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.currentPage).toBe(2);
      expect(currentValue.value.pageSize).toBe(20);
    });

    it('应该在 pageSize 变化时重置 currentPage 为 1', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const props = {
        currentPage: 3,
        pageSize: 10,
        emit,
        slots: {},
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.currentPage).toBe(3);

      // 改变 pageSize
      await setValue({ currentPage: 3, pageSize: 20, emit, slots: {} });

      expect(currentValue.value.currentPage).toBe(3);
      expect(currentValue.value.pageSize).toBe(20);
    });

    it('应该处理无效的 JSON 格式 pageSizes', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const props = {
        pageSizes: 'invalid json',
        emit,
      };

      const { currentValue } = await renderHooks(plugins, props);

      // 应该回退到默认值
      expect(currentValue.value.pageSizes).toEqual([10, 20, 50]);
    });

    it('应该发送 sync:state 事件', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const props = {
        currentPage: 1,
        pageSize: 10,
        emit,
      };

      await renderHooks(plugins, props);

      expect(emit).toHaveBeenCalledWith('sync:state', 'currentPage', 1);
      expect(emit).toHaveBeenCalledWith('sync:state', 'pageSize', 10);
    });
  });

  describe('handleColumn - 列布局高级场景', () => {
    it('应该处理 rowGap=0 和 columnGap=0', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const props = {
        column: 3,
        rowGap: 0,
        columnGap: 0,
        emit,
        slots: {},
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.style['--row-gap']).toBe('0px');
      expect(currentValue.value.style['--column-gap']).toBe('0px');
    });

    it('应该处理 column 为负数', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const props = {
        column: -1,
        emit,
        slots: {},
      };

      const { currentValue } = await renderHooks(plugins, props);

      // 负数与 0 一样，按自适应布局处理
      expect(currentValue.value.style['--el-list-components-column']).toBe(0);
    });

    it('应该添加基础类名', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const props = {
        column: 3,
        emit,
        slots: {},
      };

      const { currentValue } = await renderHooks(plugins, props);

      expect(currentValue.value.class).toContain('el-list-components-plus');
    });
  });

  describe('交叉测试：完整工作流', () => {
    it('应该同时处理分页、选择和数据源', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const props = {
        currentPage: 1,
        pageSize: 10,
        selection: 'single',
        dataSource: [
          { label: 'Item 1', value: '1' },
          { label: 'Item 2', value: '2' },
        ],
        column: 2,
        emit,
        slots: {},
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);
      await waitForNextUpdate();

      expect(currentValue.value.currentPage).toBe(1);
      expect(currentValue.value.pageSize).toBe(10);
      expect(currentValue.value.clickFn).toBeDefined();
      expect(currentValue.value.ref.data).toBeDefined();
      expect(currentValue.value.style['--el-list-components-column']).toBe(2);
    });

    it('应该处理完整的分页场景：page 模式 + showTotal + showJumper', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const onPageChange = vi.fn();
      const props = {
        dataSource: Array.from({ length: 100 }, (_, i) => ({
          label: `Item ${i + 1}`,
          value: `${i + 1}`,
        })),
        pagination: 'page',
        currentPage: 1,
        pageSize: 10,
        showTotal: true,
        showJumper: true,
        onPageChange,
        emit,
        slots: {},
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);
      await waitForNextUpdate();

      expect(currentValue.value.pagination).toBe('page');
      expect(currentValue.value.pageProps.total).toBe(100);
      expect(currentValue.value.pageProps.layout).toContain('total');
      expect(currentValue.value.pageProps.layout).toContain('jumper');
      expect(currentValue.value.pageProps.onPageChange).toBe(onPageChange);
    });

    it('应该处理 multiple 选择 + autoMore 分页 + 自定义字段', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const props = {
        dataSource: [
          { name: 'Option A', id: 'a' },
          { name: 'Option B', id: 'b' },
          { name: 'Option C', id: 'c' },
        ],
        idField: 'id',
        textField: 'name',
        selection: 'multiple',
        clearable: true,
        modelValue: ['a'],
        pagination: 'autoMore',
        column: 3,
        rowGap: 15,
        columnGap: 15,
        equalWidth: true,
        emit,
        slots: {},
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);
      await waitForNextUpdate();

      expect(currentValue.value.value).toEqual(['a']);
      expect(currentValue.value.class).toContain('el-list-components-infinite-scroll');
      expect(currentValue.value.class).toContain('isEqualWidth');
      expect(currentValue.value.style['--el-list-components-column']).toBe(3);
      expect(currentValue.value.style['--row-gap']).toBe('15px');
      expect(currentValue.value.style['--column-gap']).toBe('15px');
      expect(currentValue.value.ref.data.length).toBe(3);
    });

    it('应该处理 single + clearable + 自定义 pageSizes', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const props = {
        dataSource: [
          { label: 'Item 1', value: '1' },
          { label: 'Item 2', value: '2' },
          { label: 'Item 3', value: '3' },
        ],
        selection: 'single',
        clearable: true,
        modelValue: '1',
        pageSizes: [5, 10, 15, 20],
        currentPage: 1,
        pageSize: 5,
        emit,
        slots: {},
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);
      await waitForNextUpdate();

      expect(currentValue.value.value).toBe('1');
      expect(currentValue.value.pageSizes).toEqual([5, 10, 15, 20]);
      expect(currentValue.value.ref.reload).toBeDefined();
      expect(currentValue.value.clickFn).toBeDefined();
    });

    it('应该处理异步数据源 + page 分页 + reload', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const asyncDataSource = vi.fn().mockResolvedValue({
        list: [
          { label: 'Async 1', value: 'a1' },
          { label: 'Async 2', value: 'a2' },
        ],
        total: 50,
      });
      const props = {
        dataSource: asyncDataSource,
        pagination: 'page',
        currentPage: 1,
        pageSize: 10,
        showTotal: true,
        emit,
        slots: {},
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);
      await waitForNextUpdate();

      expect(asyncDataSource).toHaveBeenCalledWith(
        expect.objectContaining({
          currentPage: 1,
          pageSize: 10,
          pagination: true,
        }),
      );
      expect(currentValue.value.pageProps.total).toBe(50);

      // 测试 reload
      currentValue.value.ref.reload({ currentPage: 2 });
      expect(asyncDataSource).toHaveBeenCalledWith(
        expect.objectContaining({
          currentPage: 2,
          pageSize: 10,
        }),
      );
    });

    it('应该处理空数据源的各种场景', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const props = {
        dataSource: [],
        selection: 'multiple',
        pagination: 'page',
        column: 4,
        emit,
        slots: {},
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);
      await waitForNextUpdate();

      expect(currentValue.value.ref.data).toEqual([]);
      expect(currentValue.value.pageProps.total).toBe(0);
    });

    it('应该处理所有功能组合的极限场景', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const onPageChange = vi.fn();
      const customSlot = vi.fn((props) => (
        <div>
          Custom:
          {' '}
          {props.item.label}
        </div>
      ));
      const props = {
        dataSource: Array.from({ length: 30 }, (_, i) => ({
          label: `Item ${i + 1}`,
          value: `${i + 1}`,
        })),
        selection: 'multiple',
        clearable: true,
        modelValue: ['1', '2', '3'],
        pagination: 'page',
        defaultCurrentPage: 1,
        defaultPageSize: 10,
        pageSizes: '[10, 20, 30, 40]',
        showTotal: true,
        showJumper: true,
        onPageChange,
        column: 4,
        rowGap: 20,
        columnGap: 20,
        equalWidth: true,
        emit,
        slots: { default: customSlot },
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);
      await waitForNextUpdate();

      // 验证分页
      expect(currentValue.value.currentPage).toBe(1);
      expect(currentValue.value.pageSize).toBe(10);
      expect(currentValue.value.pageSizes).toEqual([10, 20, 30, 40]);
      expect(currentValue.value.pageProps.layout).toContain('total');
      expect(currentValue.value.pageProps.layout).toContain('jumper');

      // 验证选择
      expect(currentValue.value.value).toEqual(['1', '2', '3']);
      expect(currentValue.value.class).toContain('selection');

      // 验证数据源（分页模式下只显示当前页数据）
      expect(currentValue.value.ref.data.length).toBeGreaterThan(0);
      expect(currentValue.value.pageProps.total).toBe(30);

      // 验证列布局
      expect(currentValue.value.style['--el-list-components-column']).toBe(4);
      expect(currentValue.value.style['--row-gap']).toBe('20px');
      expect(currentValue.value.style['--column-gap']).toBe('20px');
      expect(currentValue.value.class).toContain('isEqualWidth');

      // 验证 render
      expect(currentValue.value.render).toBeDefined();
      expect(currentValue.value.pagination).toBe('page');
    });
  });
});
