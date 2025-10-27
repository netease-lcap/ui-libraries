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

    it('应该处理 column <= 0 的情况', async () => {
      const plugins = listComponentsBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const emit = vi.fn();
      const props = {
        column: 0,
        emit,
        slots: {},
      };
      
      const { currentValue } = await renderHooks(plugins, props);

      
      expect(currentValue.value.style['--el-list-components-column']).toBe(5);
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
  });
});
