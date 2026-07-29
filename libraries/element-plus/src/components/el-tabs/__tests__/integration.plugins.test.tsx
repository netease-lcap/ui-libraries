import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHooks } from '@ep-test/test-utils/render-hook';
import { $deletePropsList } from '@/plugins/constants';
import '@/utils/index';
import TabsAccumulate from '../plugins/basic-plugins';

describe('el-tabs 插件集成测试', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('第一部分：插件链式执行测试', () => {
    it('应该按顺序执行所有插件并合并状态', async () => {
      const plugins = TabsAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        dataSource: [
          { label: 'Tab 1', value: 'tab1' },
          { label: 'Tab 2', value: 'tab2' },
          { label: 'Tab 3', value: 'tab3' },
        ],
        titleField: 'label',
        valueField: 'value',
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
      const plugins = TabsAccumulate.getPluginMethod({ isInDesigner: false });
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
      const plugins = TabsAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Home', value: 'home' },
        { label: 'Profile', value: 'profile' },
        { label: 'Settings', value: 'settings' },
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
      const plugins = TabsAccumulate.getPluginMethod({ isInDesigner: false });
      const asyncDataSource = vi.fn().mockResolvedValue([
        { label: 'Async Tab 1', value: 'async1' },
        { label: 'Async Tab 2', value: 'async2' },
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
      const plugins = TabsAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { title: 'Tab A', id: 'a' },
        { title: 'Tab B', id: 'b' },
      ];
      const props = {
        dataSource,
        titleField: 'title',
        valueField: 'id',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
    });

    it('应该正确设置 ref.reload 和 ref.data', async () => {
      const plugins = TabsAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [{ label: 'Test Tab', value: 'test' }];
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
        const plugins = TabsAccumulate.getPluginMethod({ isInDesigner: false });
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

    it('应该正确处理自定义 label 和 content slot', async () => {
      const plugins = TabsAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Tab 1', value: 't1', content: 'Content 1' },
        { label: 'Tab 2', value: 't2', content: 'Content 2' },
      ];
      const labelSlot = vi.fn(({ item }) => `🏷️ ${item.label}`);
      const contentSlot = vi.fn(({ item }) => `📄 ${item.content}`);
      const props = {
        dataSource,
        slots: {
          label: labelSlot,
          content: contentSlot,
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

  describe('第三部分：tab 点击处理测试', () => {
    it('应该正确处理 onTabClick 事件', async () => {
      const plugins = TabsAccumulate.getPluginMethod({ isInDesigner: false });
      const onTabClick = vi.fn();
      const dataSource = [
        { label: 'Tab 1', value: 't1' },
        { label: 'Tab 2', value: 't2' },
      ];
      const props = {
        dataSource,
        onTabClick,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.onTabClick).toBeDefined();
      expect(typeof currentValue.value.onTabClick).toBe('function');
    });

    it('应该处理未设置 onTabClick 的情况', async () => {
      const plugins = TabsAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [{ label: 'Tab', value: 'tab' }];
      const props = {
        dataSource,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.onTabClick).toBeDefined();
    });
  });

  describe('第四部分：addIcon 处理测试', () => {
    it('应该正确处理自定义 addIcon', async () => {
      const plugins = TabsAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        addIcon: 'plus',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.slots).toBeDefined();
      expect(result.slots['add-icon']).toBeDefined();
    });

    it('应该处理未设置 addIcon 的情况', async () => {
      const plugins = TabsAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.slots).toBeDefined();
    });
  });

  describe('第五部分：受控值处理测试', () => {
    it('应该正确处理受控值', async () => {
      const plugins = TabsAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Tab A', value: 'a' },
        { label: 'Tab B', value: 'b' },
      ];
      const props = {
        dataSource,
        modelValue: 'a',
        'onUpdate:modelValue': vi.fn(),
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.modelValue).toBeDefined();
      expect(currentValue.value['onUpdate:modelValue']).toBeDefined();
    });
  });

  describe('第六部分：插件交叉组合测试', () => {
    it('交叉组合：dataSource + addIcon + onTabClick', async () => {
      const plugins = TabsAccumulate.getPluginMethod({ isInDesigner: false });
      const onTabClick = vi.fn();
      const dataSource = [
        { label: 'Tab 1', value: 't1' },
        { label: 'Tab 2', value: 't2' },
        { label: 'Tab 3', value: 't3' },
      ];
      const props = {
        dataSource,
        addIcon: 'plus-circle',
        onTabClick,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.slots['add-icon']).toBeDefined();
      expect(currentValue.value.onTabClick).toBeDefined();
    });

    it('交叉组合：异步数据源 + 自定义字段 + slots', async () => {
      const plugins = TabsAccumulate.getPluginMethod({ isInDesigner: false });
      const asyncDataSource = vi.fn().mockResolvedValue([
        { title: 'Async A', id: 'aa', desc: 'Description A' },
        { title: 'Async B', id: 'ab', desc: 'Description B' },
      ]);
      const labelSlot = vi.fn(({ item }) => item.title);
      const contentSlot = vi.fn(({ item }) => item.desc);
      const props = {
        dataSource: asyncDataSource,
        titleField: 'title',
        valueField: 'id',
        slots: {
          label: labelSlot,
          content: contentSlot,
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

    it('交叉组合：受控值 + addIcon + 自定义 slots', async () => {
      const plugins = TabsAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Home', value: 'home' },
        { label: 'Profile', value: 'profile' },
      ];
      const onUpdateModelValue = vi.fn();
      const props = {
        dataSource,
        modelValue: 'home',
        'onUpdate:modelValue': onUpdateModelValue,
        addIcon: 'add',
        slots: {
          label: vi.fn(({ item }) => `Tab: ${item.label}`),
        },
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.modelValue).toBe('home');
      expect(currentValue.value.slots['add-icon']).toBeDefined();
    });
  });

  describe('第七部分：边界和异常测试', () => {
    it('边界测试：大量 tabs', async () => {
      const plugins = TabsAccumulate.getPluginMethod({ isInDesigner: false });
      const largeDataSource = Array.from({ length: 100 }, (_, i) => ({
        label: `Tab ${i}`,
        value: `tab-${i}`,
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
      const plugins = TabsAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: '', value: 'empty' },
        { label: null, value: 'null' },
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

    it('边界测试：重复的 value', async () => {
      const plugins = TabsAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Tab 1', value: 'duplicate' },
        { label: 'Tab 2', value: 'duplicate' },
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
  });

  describe('第八部分：props 更新响应式测试（使用 setValue）', () => {
    it('响应式测试：使用 setValue 更新 dataSource', async () => {
      const plugins = TabsAccumulate.getPluginMethod({ isInDesigner: false });
      const initialData = [
        { label: 'Old Tab 1', value: 'ot1' },
        { label: 'Old Tab 2', value: 'ot2' },
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
        { label: 'New Tab 1', value: 'nt1' },
        { label: 'New Tab 2', value: 'nt2' },
        { label: 'New Tab 3', value: 'nt3' },
      ];
      await setValue({ dataSource: newData });

      await waitForNextUpdate();

      expect(currentValue.value.data.length).toBe(3);
    });

    it('响应式测试：使用 setValue 更新 modelValue（不需要 waitForNextUpdate）', async () => {
      const plugins = TabsAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Tab A', value: 'a' },
        { label: 'Tab B', value: 'b' },
        { label: 'Tab C', value: 'c' },
      ];
      const props = {
        dataSource,
        modelValue: 'a',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.modelValue).toBe('a');

      await setValue({ modelValue: 'b' });

      expect(currentValue.value.modelValue).toBe('b');

      await setValue({ modelValue: 'c' });

      expect(currentValue.value.modelValue).toBe('c');
    });

    it('响应式测试：使用 setValue 更新 addIcon', async () => {
      const plugins = TabsAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        addIcon: 'plus',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.slots['add-icon']).toBeDefined();

      await setValue({ addIcon: 'add-circle' });

      expect(currentValue.value.slots['add-icon']).toBeDefined();
    });

    it('响应式测试：使用 setValue 更新字段映射', async () => {
      const plugins = TabsAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [{ label: 'Tab', title: 'Title', value: 'val', id: 'i' }];
      const props = {
        dataSource,
        titleField: 'label',
        valueField: 'value',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      await setValue({ titleField: 'title', valueField: 'id' });

      expect(currentValue.value.data).toBeDefined();
    });

    it('响应式测试：使用 setValue 同时更新多个属性', async () => {
      const plugins = TabsAccumulate.getPluginMethod({ isInDesigner: false });
      const initialData = [{ label: 'Old', value: 'old' }];
      const props = {
        dataSource: initialData,
        modelValue: 'old',
        addIcon: 'plus',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      const newData = [
        { label: 'New 1', value: 'n1' },
        { label: 'New 2', value: 'n2' },
      ];

      await setValue({
        dataSource: newData,
        modelValue: 'n1',
        addIcon: 'add-circle',
      });

      await waitForNextUpdate();

      expect(currentValue.value.data.length).toBe(2);
      expect(currentValue.value.modelValue).toBe('n1');
      expect(currentValue.value.slots['add-icon']).toBeDefined();
    });
  });

  describe('第九部分：完整流程集成测试', () => {
    it('完整流程：异步加载 → 字段映射 → 受控值 → 自定义 slots', async () => {
      const plugins = TabsAccumulate.getPluginMethod({ isInDesigner: false });
      const asyncDataSource = vi.fn().mockResolvedValue([
        { title: 'Dashboard', id: 'dashboard', content: 'Dashboard Content' },
        { title: 'Analytics', id: 'analytics', content: 'Analytics Content' },
        { title: 'Reports', id: 'reports', content: 'Reports Content' },
      ]);
      const labelSlot = vi.fn(({ item }) => `📊 ${item.label}`);
      const contentSlot = vi.fn(({ item }) => `Content: ${item.content}`);

      const props = {
        dataSource: asyncDataSource,
        titleField: 'title',
        valueField: 'id',
        modelValue: 'dashboard',
        slots: {
          label: labelSlot,
          content: contentSlot,
        },
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(asyncDataSource).toHaveBeenCalled();
      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.modelValue).toBe('dashboard');
      expect(currentValue.value.slots.default).toBeDefined();
    });

    it('完整流程：addIcon + onTabClick + 受控值', async () => {
      const plugins = TabsAccumulate.getPluginMethod({ isInDesigner: false });
      const onTabClick = vi.fn();
      const dataSource = [
        { label: 'Tab 1', value: 't1' },
        { label: 'Tab 2', value: 't2' },
        { label: 'Tab 3', value: 't3' },
      ];
      const props = {
        dataSource,
        modelValue: 't1',
        addIcon: 'plus',
        onTabClick,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.modelValue).toBe('t1');
      expect(currentValue.value.slots['add-icon']).toBeDefined();
      expect(currentValue.value.onTabClick).toBeDefined();
    });
  });
});
