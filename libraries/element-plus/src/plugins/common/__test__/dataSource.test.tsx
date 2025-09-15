import { describe, expect, it, vi, beforeEach } from 'vitest';
import { useHandleMapField, useRequestDataSource, useFormatDataSource, useDataSourceToTree } from '../dataSource';
import { fiberNode } from '@/plugins/hooks';

// Mock vue-hooks-plus
vi.mock('vue-hooks-plus', () => ({
  useRequest: vi.fn(() => ({
    data: null,
    run: vi.fn(),
    loading: false,
  })),
}));

// Mock vue
vi.mock('vue', () => ({
  ref: vi.fn((val) => ({ value: val })),
  onMounted: vi.fn((fn) => fn()),
  onUnmounted: vi.fn((fn) => fn()),
  getCurrentInstance: vi.fn(() => ({
    vnode: {
      props: {},
    },
  })),
  watch: vi.fn((source, callback, options) => {
    // 立即执行回调如果设置了 immediate
    if (options?.immediate) {
      callback(source.value || source);
    }
    return vi.fn(); // 返回停止监听的函数
  }),
}));

describe('dataSource.tsx', () => {
  beforeEach(() => {
    // 重置所有 mock
    vi.clearAllMocks();
    // 重置 fiberNode 状态
    fiberNode.setCurrentFiber(
      {
        workInProgressState: null,
        workInProgressEffect: null,
        updateQueen: new Set(),
        getState: () => ({ state: {} }),
        setValue: vi.fn(),
        storeKey: null,
        queen: [],
      },
      true,
    );
  });

  describe('useHandleMapField', () => {
    it('应该正确处理基本的字段映射', () => {
      const dataSource = [
        { name: 'Item 1', id: 1, status: false },
        { name: 'Item 2', id: 2, status: true },
      ] as any;

      const result = useHandleMapField({
        dataSource,
        textField: 'name',
        valueField: 'id',
        disabledField: 'status',
      });

      expect(result).toEqual([
        {
          name: 'Item 1',
          id: 1,
          status: false,
          label: 'Item 1',
          value: 1,
          disabled: false,
          divided: false,
        },
        {
          name: 'Item 2',
          id: 2,
          status: true,
          label: 'Item 2',
          value: 2,
          disabled: true,
          divided: false,
        },
      ]);
    });

    it('应该正确处理原始类型数据源', () => {
      const dataSource = ['apple', 'banana', 'orange'] as any;

      const result = useHandleMapField({
        dataSource,
      });

      expect(result).toEqual([
        {
          label: 'apple',
          value: 'apple',
          disabled: false,
          divided: false,
        },
        {
          label: 'banana',
          value: 'banana',
          disabled: false,
          divided: false,
        },
        {
          label: 'orange',
          value: 'orange',
          disabled: false,
          divided: false,
        },
      ]);
    });

    it('应该正确处理自定义字段名称', () => {
      const dataSource = [
        { title: 'Title 1', key: 'key1', inactive: true, separator: true },
        { title: 'Title 2', key: 'key2', inactive: false, separator: false },
      ] as any;

      const result = useHandleMapField({
        dataSource,
        label: 'customLabel',
        value: 'customValue',
        disabled: 'customDisabled',
        divided: 'customDivided',
        textField: 'title',
        valueField: 'key',
        disabledField: 'inactive',
        dividedField: 'separator',
      });

      expect(result).toEqual([
        {
          title: 'Title 1',
          key: 'key1',
          inactive: true,
          separator: true,
          customLabel: 'Title 1',
          customValue: 'key1',
          customDisabled: true,
          customDivided: true,
        },
        {
          title: 'Title 2',
          key: 'key2',
          inactive: false,
          separator: false,
          customLabel: 'Title 2',
          customValue: 'key2',
          customDisabled: false,
          customDivided: false,
        },
      ]);
    });

    it('应该正确处理fieldsMap映射', () => {
      const dataSource = [
        {
          info: { name: 'John', age: 25 },
          meta: { id: 1, category: 'user' },
          nested: { deep: { value: 'hidden' } },
        },
        {
          info: { name: 'Jane', age: 30 },
          meta: { id: 2, category: 'admin' },
          nested: { deep: { value: 'secret' } },
        },
      ] as any;

      const result = useHandleMapField({
        dataSource,
        textField: 'info.name',
        valueField: 'meta.id',
        fieldsMap: {
          userName: 'info.name',
          userAge: 'info.age',
          categoryType: 'meta.category',
          deepValue: 'nested.deep.value',
          nonExistent: 'path.not.exist',
        },
      });

      expect(result).toEqual([
        {
          info: { name: 'John', age: 25 },
          meta: { id: 1, category: 'user' },
          nested: { deep: { value: 'hidden' } },
          userName: 'John',
          userAge: 25,
          categoryType: 'user',
          deepValue: 'hidden',
          nonExistent: undefined,
          label: 'John',
          value: 1,
          disabled: false,
          divided: false,
        },
        {
          info: { name: 'Jane', age: 30 },
          meta: { id: 2, category: 'admin' },
          nested: { deep: { value: 'secret' } },
          userName: 'Jane',
          userAge: 30,
          categoryType: 'admin',
          deepValue: 'secret',
          nonExistent: undefined,
          label: 'Jane',
          value: 2,
          disabled: false,
          divided: false,
        },
      ]);
    });

    it('应该正确处理缺失字段的默认值', () => {
      const dataSource = [
        { name: 'Item 1' }, // 缺少 id, disabled 等字段
        { id: 2 }, // 缺少 name 字段
        {}, // 空对象
      ] as any;

      const result = useHandleMapField({
        dataSource,
        textField: 'name',
        valueField: 'id',
      });

      expect(result).toEqual([
        {
          name: 'Item 1',
          label: 'Item 1',
          value: '',
          disabled: false,
          divided: false,
        },
        {
          id: 2,
          label: '',
          value: 2,
          disabled: false,
          divided: false,
        },
        {
          label: '',
          value: '',
          disabled: false,
          divided: false,
        },
      ]);
    });

    it('应该正确处理空数据源', () => {
      const result = useHandleMapField({
        dataSource: [] as any,
      });

      expect(result).toEqual([]);
    });

    it('应该在依赖项变化时重新计算', () => {
      let dataSource = [{ name: 'Item 1', id: 1 }] as any;

      // 第一次调用
      const result1 = useHandleMapField({
        dataSource,
        textField: 'name',
        valueField: 'id',
      });

      expect(result1).toEqual([
        {
          name: 'Item 1',
          id: 1,
          label: 'Item 1',
          value: 1,
          disabled: false,
          divided: false,
        },
      ]);

      // 模拟非挂载状态（后续调用）
      fiberNode.setCurrentFiber(fiberNode.getCurrentFiber(), false);

      // 改变数据源
      dataSource = [{ name: 'Item 2', id: 2 }] as any;

      const result2 = useHandleMapField({
        dataSource,
        textField: 'name',
        valueField: 'id',
      });

      expect(result2).toEqual([
        {
          name: 'Item 2',
          id: 2,
          label: 'Item 2',
          value: 2,
          disabled: false,
          divided: false,
        },
      ]);
    });
  });

  describe('useRequestDataSource', () => {
    it('应该正确处理数组类型的数据源', () => {
      const dataSource = [
        { label: 'Item 1', value: 1 },
        { label: 'Item 2', value: 2 },
      ] as any;

      const result = useRequestDataSource(dataSource);

      // 基本结构验证
      // expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('run');
      // expect(result).toHaveProperty('loading');
    });

    it('应该正确处理函数类型的数据源', () => {
      const mockDataSourceFn = vi.fn().mockResolvedValue([
        { label: 'Async Item 1', value: 1 },
        { label: 'Async Item 2', value: 2 },
      ]) as any;

      const result = useRequestDataSource(mockDataSourceFn);

      // 基本结构验证
      // expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('run');
      // expect(result).toHaveProperty('loading');
    });

    it('应该正确处理分页参数', () => {
      const dataSource = Array.from({ length: 25 }, (_, i) => ({
        label: `Item ${i + 1}`,
        value: i + 1,
      })) as any;

      const result = useRequestDataSource(dataSource, {
        defaultParams: [{ currentPage: 2, pageSize: 10, pagination: true }],
      });

      expect(result).toBeDefined();
      // expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('run');
      // expect(result).toHaveProperty('loading');
    });

    it('应该正确传递options参数', () => {
      const options = {
        manual: true,
        defaultParams: [{ page: 1 }],
        refreshDeps: ['test'],
      };

      const result = useRequestDataSource([] as any, options);

      expect(result).toBeDefined();
      // expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('run');
      // expect(result).toHaveProperty('loading');
    });

    it('应该在数据源变化时更新', () => {
      let dataSource = [{ label: 'Item 1', value: 1 }] as any;

      // 第一次调用
      const result1 = useRequestDataSource(dataSource);

      // 模拟非挂载状态
      fiberNode.setCurrentFiber(fiberNode.getCurrentFiber(), false);

      // 改变数据源
      dataSource = [{ label: 'Item 2', value: 2 }] as any;

      // 再次调用应该触发重新请求
      const result2 = useRequestDataSource(dataSource);

      expect(result1).toBeDefined();
      expect(result2).toBeDefined();
    });
  });

  describe('useFormatDataSource', () => {
    it('应该直接返回数组类型的数据源', () => {
      const dataSource = [
        { label: 'Item 1', value: 1 },
        { label: 'Item 2', value: 2 },
      ];

      const result = useFormatDataSource(dataSource as any);
      expect(result).toEqual(dataSource);
    });

    it('应该从包含list属性的对象中提取数组', () => {
      const dataSource = {
        list: [
          { label: 'Item 1', value: 1 },
          { label: 'Item 2', value: 2 },
        ],
        total: 2,
        page: 1,
      };

      const result = useFormatDataSource(dataSource as any);
      expect(result).toEqual([
        { label: 'Item 1', value: 1 },
        { label: 'Item 2', value: 2 },
      ]);
    });

    it('应该处理undefined输入', () => {
      const result = useFormatDataSource(undefined);
      expect(result).toEqual([]);
    });

    it('应该处理null输入', () => {
      const result = useFormatDataSource(null as any);
      expect(result).toEqual([]);
    });

    it('应该处理空对象输入', () => {
      const result = useFormatDataSource({} as any);
      expect(result).toEqual([]);
    });

    it('应该处理不包含list属性的对象', () => {
      const dataSource = {
        data: [{ label: 'Item 1', value: 1 }],
        total: 1,
      };

      const result = useFormatDataSource(dataSource as any);
      expect(result).toEqual([]);
    });

    it('应该处理list属性不是数组的情况', () => {
      const dataSource = {
        list: 'not an array',
        total: 0,
      };

      const result = useFormatDataSource(dataSource as any);
      expect(result).toEqual([]);
    });

    it('应该处理原始类型输入', () => {
      const result1 = useFormatDataSource('string' as any);
      const result2 = useFormatDataSource(123 as any);
      const result3 = useFormatDataSource(true as any);

      expect(result1).toEqual([]);
      expect(result2).toEqual([]);
      expect(result3).toEqual([]);
    });

    it('应该正确处理嵌套的对象结构', () => {
      const dataSource = {
        response: {
          list: [
            { label: 'Nested Item 1', value: 1 },
            { label: 'Nested Item 2', value: 2 },
          ],
        },
      };

      // 这种情况下应该返回空数组，因为list不在顶层
      const result = useFormatDataSource(dataSource as any);
      expect(result).toEqual([]);
    });
  });

  describe('useDataSourceToTree', () => {
    it('应该正确构建基础树结构', () => {
      const dataSource = [
        { id: 1, name: 'Root 1', parent: null, value: 1 },
        { id: 2, name: 'Child 1-1', parent: 1, value: 2 },
        { id: 3, name: 'Child 1-2', parent: 1, value: 3 },
        { id: 4, name: 'Root 2', parent: null, value: 4 },
        { id: 5, name: 'Child 2-1', parent: 4, value: 5 },
      ] as any;

      const result = useDataSourceToTree(dataSource, 'parent', 'value');

      expect(result).toHaveLength(2); // 两个根节点

      // 检查第一个根节点
      const root1 = result.find((item) => item.value === 1);
      expect(root1).toBeDefined();
      expect(root1?.children).toHaveLength(2);
      expect(root1?.children?.map((child) => child.value)).toEqual([2, 3]);

      // 检查第二个根节点
      const root2 = result.find((item) => item.value === 4);
      expect(root2).toBeDefined();
      expect(root2?.children).toHaveLength(1);
      expect(root2?.children?.[0]?.value).toBe(5);
    });

    it('应该处理多层嵌套的树结构', () => {
      const dataSource = [
        { id: 1, name: 'Root', parent: null, value: 1 },
        { id: 2, name: 'Level 1', parent: 1, value: 2 },
        { id: 3, name: 'Level 2', parent: 2, value: 3 },
        { id: 4, name: 'Level 3', parent: 3, value: 4 },
      ] as any;

      const result = useDataSourceToTree(dataSource, 'parent', 'value');

      expect(result).toHaveLength(1);
      const root = result[0];
      expect(root.value).toBe(1);
      expect(root.children).toHaveLength(1);

      const level1 = root.children![0];
      expect(level1.value).toBe(2);
      expect(level1.children).toHaveLength(1);

      const level2 = level1.children![0];
      expect(level2.value).toBe(3);
      expect(level2.children).toHaveLength(1);

      const level3 = level2.children![0];
      expect(level3.value).toBe(4);
    });

    it('应该正确处理没有父子关系的平铺数据', () => {
      const dataSource = [
        { id: 1, name: 'Item 1', value: 1 },
        { id: 2, name: 'Item 2', value: 2 },
        { id: 3, name: 'Item 3', value: 3 },
      ] as any;

      const result = useDataSourceToTree(dataSource, 'parent', 'value');

      expect(result).toHaveLength(3);
      expect(result.map((item) => item.value)).toEqual([1, 2, 3]);
      result.forEach((item) => {
        expect(item.children).toBeUndefined();
      });
    });

    it('应该处理parentField为null或undefined的情况', () => {
      const dataSource = [
        { id: 1, name: 'Item 1', value: 1 },
        { id: 2, name: 'Item 2', value: 2 },
      ] as any;

      const result1 = useDataSourceToTree(dataSource, null as any, 'value');
      const result2 = useDataSourceToTree(dataSource, undefined as any, 'value');

      expect(result1).toStrictEqual(dataSource);
      expect(result2).toStrictEqual(dataSource);
    });

    it('应该正确处理自定义valueField', () => {
      const dataSource = [
        { id: 1, name: 'Root', parent: null, customKey: 'root' },
        { id: 2, name: 'Child', parent: 'root', customKey: 'child' },
      ] as any;

      const result = useDataSourceToTree(dataSource, 'parent', 'customKey');

      expect(result).toHaveLength(1);
      const root = result[0];
      expect(root.customKey).toBe('root');
      expect(root.children).toHaveLength(1);
      expect(root.children![0].customKey).toBe('child');
    });

    it('应该正确处理循环引用', () => {
      const dataSource = [
        { id: 1, name: 'Item 1', parent: 2, value: 1 },
        { id: 2, name: 'Item 2', parent: 1, value: 2 },
      ] as any;

      // 这种情况下应该不会产生无限循环，而是根据当前逻辑处理
      const result = useDataSourceToTree(dataSource, 'parent', 'value');

      // 两个节点都有父节点，所以都不会成为根节点
      expect(result).toHaveLength(0);
    });

    it('应该正确处理重复的parent值', () => {
      const dataSource = [
        { id: 1, name: 'Root', parent: null, value: 1 },
        { id: 2, name: 'Child 1', parent: 1, value: 2 },
        { id: 3, name: 'Child 2', parent: 1, value: 3 },
        { id: 4, name: 'Child 3', parent: 1, value: 4 },
      ] as any;

      const result = useDataSourceToTree(dataSource, 'parent', 'value');

      expect(result).toHaveLength(1);
      const root = result[0];
      expect(root.children).toHaveLength(3);
      expect(root.children!.map((child) => child.value)).toEqual([2, 3, 4]);
    });

    it('应该正确处理空数据源', () => {
      const result = useDataSourceToTree([] as any, 'parent', 'value');
      expect(result).toEqual([]);
    });

    it('应该正确处理缺少关键字段的数据项', () => {
      const dataSource = [
        { id: 1, name: 'Root', value: 1 }, // 缺少parent字段
        { id: 2, name: 'Child', parent: 1 }, // 缺少value字段
        { id: 3, parent: 1, value: 3 }, // 缺少name字段
      ] as any;

      const result = useDataSourceToTree(dataSource, 'parent', 'value');

      // 第一个项目没有parent，应该成为根节点
      expect(result).toHaveLength(1);
      expect(result[0].value).toBe(1);

      // 第二个项目缺少value，用 item 做关联
      // 第三个项目可以正确关联到parent
      expect(result[0].children).toHaveLength(2);
      expect(result[0].children![1].value).toBe(3);
    });

    it('应该使用默认valueField', () => {
      const dataSource = [
        { id: 1, name: 'Root', parent: null },
        { id: 2, name: 'Child', parent: 1 },
      ] as any;

      // 不提供valueField，应该使用默认值'value'
      const result = useDataSourceToTree(dataSource, 'parent');

      // 由于没有value字段，应该使用整个item作为值
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({ id: 1, name: 'Root', parent: null });
    });
  });
});
