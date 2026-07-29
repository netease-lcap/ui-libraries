import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHooks } from '@ep-test/test-utils/render-hook';
import { $deletePropsList } from '@/plugins/constants';
import '@/utils/index';
import CollapseAccumulate from '../plugins/basic-plugins';

describe('el-collapse 插件集成测试', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('第一部分：插件链式执行测试', () => {
    it('应该按顺序执行所有插件并合并状态', async () => {
      const plugins = CollapseAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        dataSource: [
          { label: 'Section 1', name: 's1', disabled: false },
          { label: 'Section 2', name: 's2', disabled: false },
          { label: 'Section 3', name: 's3', disabled: true },
        ],
        nameField: 'name',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      const result = currentValue.value;

      expect(result).toBeDefined();
      expect(result.data).toBeDefined();
      expect(result.slots.default).toBeDefined();
      expect(result.ref).toBeDefined();
    });

    it('应该正确处理空 props 的情况', async () => {
      const plugins = CollapseAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result).toBeDefined();
    });
  });

  describe('第二部分：数据源处理完整测试', () => {
    it('应该正确处理静态数据源', async () => {
      const plugins = CollapseAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Panel 1', name: 'p1' },
        { label: 'Panel 2', name: 'p2' },
        { label: 'Panel 3', name: 'p3' },
      ];
      const props = {
        dataSource,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
      expect(Array.isArray(currentValue.value.data)).toBe(true);
      expect(currentValue.value.data.length).toBe(3);
    });

    it('应该正确处理异步数据源', async () => {
      const plugins = CollapseAccumulate.getPluginMethod({ isInDesigner: false });
      const asyncDataSource = vi.fn().mockResolvedValue([
        { label: 'Async Panel 1', name: 'async1' },
        { label: 'Async Panel 2', name: 'async2' },
      ]);
      const props = {
        dataSource: asyncDataSource,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(asyncDataSource).toHaveBeenCalled();
      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.loading).toBeDefined();
    });

    it('应该正确处理自定义字段映射', async () => {
      const plugins = CollapseAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { title: 'Section A', id: 'a', isDisabled: false },
        { title: 'Section B', id: 'b', isDisabled: true },
      ];
      const props = {
        dataSource,
        nameField: 'id',
        disabledField: 'isDisabled',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.data.length).toBe(2);
    });

    it('应该正确设置 ref.reload 和 ref.data', async () => {
      const plugins = CollapseAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [{ label: 'Test Panel', name: 'test' }];
      const props = {
        dataSource,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.ref).toBeDefined();
      expect(currentValue.value.ref.reload).toBeDefined();
      expect(typeof currentValue.value.ref.reload).toBe('function');
      expect(currentValue.value.ref.data).toBeDefined();
    });

    it('应该正确处理空数据源', async () => {
      const testCases = [{ dataSource: null }, { dataSource: undefined }, { dataSource: [] }];

      testCases.forEach(async (testCase) => {
        const plugins = CollapseAccumulate.getPluginMethod({ isInDesigner: false });
        const props = {
          ...testCase,
          slots: {},
          ref: {},
          [$deletePropsList]: [],
        };

        const { currentValue } = await renderHooks(plugins, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
      });
    });

    it('应该正确处理自定义 title、content 和 icon slot', async () => {
      const plugins = CollapseAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [{ label: 'Panel 1', name: 'p1', content: 'Content 1' }];
      const titleSlot = vi.fn(({ item, isActive }) => `${isActive ? '▼' : '▶'} ${item.label}`);
      const contentSlot = vi.fn(({ item }) => item.content);
      const iconSlot = vi.fn((isActive) => (isActive ? '[-]' : '[+]'));
      const props = {
        dataSource,
        slots: {
          title: titleSlot,
          content: contentSlot,
          icon: iconSlot,
        },
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.slots.default).toBeDefined();
    });
  });

  describe('第三部分：禁用状态处理测试', () => {
    it('应该正确处理 disabled 字段', async () => {
      const plugins = CollapseAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Enabled Panel', name: 'enabled', disabled: false },
        { label: 'Disabled Panel', name: 'disabled', disabled: true },
      ];
      const props = {
        dataSource,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.data[0].disabled).toBe(false);
      expect(currentValue.value.data[1].disabled).toBe(true);
    });

    it('应该正确处理自定义 disabledField', async () => {
      const plugins = CollapseAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [{ label: 'Panel A', name: 'a', isDisabled: true }];
      const props = {
        dataSource,
        disabledField: 'isDisabled',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.data[0].disabled).toBe(true);
    });
  });

  describe('第四部分：插件交叉组合测试', () => {
    it('交叉组合：dataSource + 自定义字段 + slots', async () => {
      const plugins = CollapseAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { title: 'FAQ 1', id: 'faq1', answer: 'Answer 1', locked: false },
        { title: 'FAQ 2', id: 'faq2', answer: 'Answer 2', locked: true },
      ];
      const titleSlot = vi.fn(({ item }) => `Q: ${item.label}`);
      const contentSlot = vi.fn(({ item }) => `A: ${item.answer}`);
      const props = {
        dataSource,
        nameField: 'id',
        disabledField: 'locked',
        slots: {
          title: titleSlot,
          content: contentSlot,
        },
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.data[0].disabled).toBe(false);
      expect(currentValue.value.data[1].disabled).toBe(true);
      expect(currentValue.value.slots.default).toBeDefined();
    });

    it('交叉组合：异步数据源 + nameField + icon slot', async () => {
      const plugins = CollapseAccumulate.getPluginMethod({ isInDesigner: false });
      const asyncDataSource = vi.fn().mockResolvedValue([
        { label: 'Async A', id: 'aa', disabled: false },
        { label: 'Async B', id: 'ab', disabled: false },
      ]);
      const iconSlot = vi.fn((isActive) => (isActive ? '🔽' : '▶️'));
      const props = {
        dataSource: asyncDataSource,
        nameField: 'id',
        slots: {
          icon: iconSlot,
        },
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(asyncDataSource).toHaveBeenCalled();
      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.slots.default).toBeDefined();
    });
  });

  describe('第五部分：边界和异常测试', () => {
    it('边界测试：大量面板', async () => {
      const plugins = CollapseAccumulate.getPluginMethod({ isInDesigner: false });
      const largeDataSource = Array.from({ length: 100 }, (_, i) => ({
        label: `Panel ${i + 1}`,
        name: `panel-${i + 1}`,
      }));
      const props = {
        dataSource: largeDataSource,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.data.length).toBe(100);
    });

    it('边界测试：空 label', async () => {
      const plugins = CollapseAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: '', name: 'empty' },
        { label: null, name: 'null' },
      ];
      const props = {
        dataSource,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
    });

    it('边界测试：重复的 name', async () => {
      const plugins = CollapseAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Panel 1', name: 'duplicate' },
        { label: 'Panel 2', name: 'duplicate' },
      ];
      const props = {
        dataSource,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
    });

    it('边界测试：所有面板都被禁用', async () => {
      const plugins = CollapseAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Disabled 1', name: 'd1', disabled: true },
        { label: 'Disabled 2', name: 'd2', disabled: true },
      ];
      const props = {
        dataSource,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.data.every((item) => item.disabled)).toBe(true);
    });
  });

  describe('第六部分：props 更新响应式测试（使用 setValue）', () => {
    it('响应式测试：使用 setValue 更新 dataSource', async () => {
      const plugins = CollapseAccumulate.getPluginMethod({ isInDesigner: false });
      const initialData = [
        { label: 'Old Panel 1', name: 'op1' },
        { label: 'Old Panel 2', name: 'op2' },
      ];
      const props = {
        dataSource: initialData,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data.length).toBe(2);

      const newData = [
        { label: 'New Panel 1', name: 'np1' },
        { label: 'New Panel 2', name: 'np2' },
        { label: 'New Panel 3', name: 'np3' },
      ];
      await setValue({ dataSource: newData });

      await waitForNextUpdate();

      expect(currentValue.value.data.length).toBe(3);
    });

    it('响应式测试：使用 setValue 更新 modelValue（不需要 waitForNextUpdate）', async () => {
      const plugins = CollapseAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Panel A', name: 'a' },
        { label: 'Panel B', name: 'b' },
        { label: 'Panel C', name: 'c' },
      ];
      const props = {
        dataSource,
        modelValue: ['a'],
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.modelValue).toEqual(['a']);

      await setValue({ modelValue: ['a', 'b'] });

      expect(currentValue.value.modelValue).toEqual(['a', 'b']);

      await setValue({ modelValue: ['c'] });

      expect(currentValue.value.modelValue).toEqual(['c']);
    });

    it('响应式测试：使用 setValue 更新字段映射', async () => {
      const plugins = CollapseAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [{ label: 'Panel', name: 'n', id: 'i', disabled: false, locked: true }];
      const props = {
        dataSource,
        nameField: 'name',
        disabledField: 'disabled',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data[0].name).toBe('n');

      await setValue({ nameField: 'id', disabledField: 'locked' });

      expect(currentValue.value.data[0].disabled).toBe(true);
    });

    it('响应式测试：使用 setValue 同时更新多个属性', async () => {
      const plugins = CollapseAccumulate.getPluginMethod({ isInDesigner: false });
      const initialData = [{ label: 'Old', name: 'old' }];
      const props = {
        dataSource: initialData,
        modelValue: ['old'],
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      const newData = [
        { label: 'New 1', name: 'n1' },
        { label: 'New 2', name: 'n2' },
      ];

      await setValue({
        dataSource: newData,
        modelValue: ['n1', 'n2'],
      });

      await waitForNextUpdate();

      expect(currentValue.value.data.length).toBe(2);
      expect(currentValue.value.modelValue).toEqual(['n1', 'n2']);
    });
  });

  describe('第七部分：完整流程集成测试', () => {
    it('完整流程：异步加载 → 字段映射 → 禁用控制 → 自定义 slots', async () => {
      const plugins = CollapseAccumulate.getPluginMethod({ isInDesigner: false });
      const asyncDataSource = vi.fn().mockResolvedValue([
        { title: 'Section 1', id: 's1', content: 'Content 1', locked: false },
        { title: 'Section 2', id: 's2', content: 'Content 2', locked: false },
        { title: 'Section 3', id: 's3', content: 'Content 3', locked: true },
      ]);
      const titleSlot = vi.fn(({ item, isActive }) => `${item.label} ${isActive ? '▼' : '▶'}`);
      const contentSlot = vi.fn(({ item }) => `📄 ${item.content}`);

      const props = {
        dataSource: asyncDataSource,
        nameField: 'id',
        disabledField: 'locked',
        slots: {
          title: titleSlot,
          content: contentSlot,
        },
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(asyncDataSource).toHaveBeenCalled();
      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.data.length).toBe(3);
      expect(currentValue.value.data[2].disabled).toBe(true);
      expect(currentValue.value.slots.default).toBeDefined();
    });

    it('完整流程：受控展开 + accordion 模式', async () => {
      const plugins = CollapseAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Panel 1', name: 'p1' },
        { label: 'Panel 2', name: 'p2' },
        { label: 'Panel 3', name: 'p3' },
      ];
      const props = {
        dataSource,
        modelValue: 'p2',
        accordion: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.modelValue).toBe('p2');
      expect(currentValue.value.accordion).toBe(true);
    });
  });
});
