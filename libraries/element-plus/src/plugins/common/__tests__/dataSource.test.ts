import { describe, expect, it, vi, beforeEach } from 'vitest';
import { fiberNode } from '../../hooks';
import { useHandleMapField, useRequestDataSource, useFormatDataSource, useDataSourceToTree } from '../dataSource';

// Mock vue-hooks-plus
vi.mock('vue-hooks-plus', () => ({
  useRequest: vi.fn((fn) => {
    const result = fn();
    return {
      data: result,
      loading: false,
      run: vi.fn(),
    };
  }),
}));

// Mock vue
vi.mock('vue', () => ({
  watch: vi.fn((source, callback) => callback(source.value)),
  ref: vi.fn((val) => ({ value: val })),
  onMounted: vi.fn((fn) => fn()),
  onUnmounted: vi.fn(),
  getCurrentInstance: vi.fn(),
}));

describe('dataSource.tsx', () => {
  beforeEach(() => {
    // 重置 fiber node 状态
    fiberNode.setCurrentFiber(
      {
        workInProgressState: null,
        workInProgressEffect: null,
        updateQueen: new Set(),
        getState: () => ({}),
        setValue: (value: any) => value,
        storeKey: null,
        queen: [],
      },
      true,
    );
  });

  describe('useHandleMapField', () => {
    it('应该正确映射简单数组数据源', () => {
      const dataSource = ['item1', 'item2'];
      const result = useHandleMapField({ dataSource });

      expect(result).toEqual([
        { label: 'item1', value: 'item1', disabled: false, divided: false },
        { label: 'item2', value: 'item2', disabled: false, divided: false },
      ]);
    });

    it('应该正确映射对象数组数据源', () => {
      const dataSource = [
        { label: 'Label 1', value: 'value1', disabled: true },
        { label: 'Label 2', value: 'value2', divided: true },
      ];
      const result = useHandleMapField({ dataSource });

      expect(result).toEqual([
        { label: 'Label 1', value: 'value1', disabled: true, divided: false },
        { label: 'Label 2', value: 'value2', disabled: false, divided: true },
      ]);
    });

    it('应该支持自定义字段映射', () => {
      const dataSource = [
        { text: 'Text 1', id: '1', isDisabled: true },
        { text: 'Text 2', id: '2', isDivided: true },
      ];
      const result = useHandleMapField({
        dataSource,
        textField: 'text',
        valueField: 'id',
        disabledField: 'isDisabled',
        dividedField: 'isDivided',
      });

      expect(result).toEqual([
        { label: 'Text 1', value: '1', disabled: true, divided: false, text: 'Text 1', id: '1', isDisabled: true },
        { label: 'Text 2', value: '2', disabled: false, divided: true, text: 'Text 2', id: '2', isDivided: true },
      ]);
    });
  });

  describe('useRequestDataSource', () => {
    it('应该处理数组数据源', async () => {
      const dataSource = ['item1', 'item2'];
      const { data, loading } = useRequestDataSource(dataSource);

      expect(data).toEqual(['item1', 'item2']);
      expect(loading).toBe(false);
    });

    it('应该处理分页数据', async () => {
      const dataSource = ['item1', 'item2', 'item3', 'item4'];
      const { data } = useRequestDataSource(dataSource);
      const params = { currentPage: 1, pageSize: 2, pagination: true };

      expect(data).toEqual({
        list: ['item1', 'item2'],
        total: 4,
      });
    });

    it('应该处理函数数据源', async () => {
      const mockData = ['item1', 'item2'];
      const dataSourceFn = vi.fn().mockResolvedValue(mockData);
      const { data } = useRequestDataSource(dataSourceFn);

      expect(data).toEqual(mockData);
    });
  });

  describe('useFormatDataSource', () => {
    it('应该处理普通数组', () => {
      const dataSource = ['item1', 'item2'];
      const result = useFormatDataSource(dataSource);
      expect(result).toEqual(['item1', 'item2']);
    });

    it('应该从对象中提取list属性', () => {
      const dataSource = { list: ['item1', 'item2'] };
      const result = useFormatDataSource(dataSource as any);
      expect(result).toEqual(['item1', 'item2']);
    });

    it('应该在无效输入时返回空数组', () => {
      const dataSource = null;
      const result = useFormatDataSource(dataSource as any);
      expect(result).toEqual([]);
    });
  });

  describe('useDataSourceToTree', () => {
    it('应该将扁平数组转换为树形结构', () => {
      const dataSource = [
        { value: '1', label: 'Parent' },
        { value: '2', label: 'Child', parentId: '1' },
        { value: '3', label: 'Grandchild', parentId: '2' },
      ];

      const result = useDataSourceToTree(dataSource, 'parentId');

      expect(result).toEqual([
        {
          value: '1',
          label: 'Parent',
          children: [
            {
              value: '2',
              label: 'Child',
              parentId: '1',
              children: [
                {
                  value: '3',
                  label: 'Grandchild',
                  parentId: '2',
                },
              ],
            },
          ],
        },
      ]);
    });

    it('当没有parentField时应该返回原始数组', () => {
      const dataSource = [
        { value: '1', label: 'Item 1' },
        { value: '2', label: 'Item 2' },
      ];

      const result = useDataSourceToTree(dataSource, null as any);
      expect(result).toEqual(dataSource);
    });
  });
});
