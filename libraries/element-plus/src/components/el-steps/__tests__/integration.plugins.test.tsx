import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHooks } from '@ep-test/test-utils/render-hook';
import { $deletePropsList } from '@/plugins/constants';
import '@/utils/index';
import StepsAccumulate from '../plugins/basic-plugins';

describe('el-steps 插件集成测试', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('第一部分：插件链式执行测试', () => {
    it('应该按顺序执行所有插件并合并状态', async () => {
      const plugins = StepsAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        dataSource: [
          { label: 'Step 1', value: 'step1', description: 'Description 1' },
          { label: 'Step 2', value: 'step2', description: 'Description 2' },
          { label: 'Step 3', value: 'step3', description: 'Description 3' },
        ],
        nameField: 'value',
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
      expect(result.stepNameList).toBeDefined();
      expect(result.active).toBeDefined();
      expect(result.ref).toBeDefined();
    });

    it('应该正确处理空 props 的情况', async () => {
      const plugins = StepsAccumulate.getPluginMethod({ isInDesigner: false });
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
      const plugins = StepsAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Login', value: 'login' },
        { label: 'Verify', value: 'verify' },
        { label: 'Complete', value: 'complete' },
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
      expect(currentValue.value.stepNameList).toEqual(['login', 'verify', 'complete']);
    });

    it('应该正确处理异步数据源', async () => {
      const plugins = StepsAccumulate.getPluginMethod({ isInDesigner: false });
      const asyncDataSource = vi.fn().mockResolvedValue([
        { label: 'Async Step 1', value: 'async1' },
        { label: 'Async Step 2', value: 'async2' },
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

    it('应该正确处理自定义 nameField', async () => {
      const plugins = StepsAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Step A', id: 'a' },
        { label: 'Step B', id: 'b' },
      ];
      const props = {
        dataSource,
        nameField: 'id',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.stepNameList).toEqual(['a', 'b']);
    });

    it('应该正确设置 ref.reload 和 ref.data', async () => {
      const plugins = StepsAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [{ label: 'Test Step', value: 'test' }];
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
        const plugins = StepsAccumulate.getPluginMethod({ isInDesigner: false });
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

    it('应该正确处理自定义 title 和 description slot', async () => {
      const plugins = StepsAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [{ label: 'Step 1', value: 's1', desc: 'Description 1' }];
      const titleSlot = vi.fn(({ item }) => `Title: ${item.label}`);
      const descriptionSlot = vi.fn(({ item }) => `Desc: ${item.desc}`);
      const props = {
        dataSource,
        slots: {
          title: titleSlot,
          description: descriptionSlot,
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

  describe('第三部分：步骤切换控制测试', () => {
    it('应该正确初始化 active 为默认值', async () => {
      const plugins = StepsAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Step 1', value: 's1' },
        { label: 'Step 2', value: 's2' },
        { label: 'Step 3', value: 's3' },
      ];
      const props = {
        dataSource,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();
      await waitForNextUpdate();

      expect(currentValue.value.active).toBe(1);
    });

    it('应该正确处理受控的 active 值', async () => {
      const plugins = StepsAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Step 1', value: 's1' },
        { label: 'Step 2', value: 's2' },
      ];
      const props = {
        dataSource,
        active: 2,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.active).toBe(2);
    });

    it('应该提供 ref.prev 和 ref.next 方法', async () => {
      const plugins = StepsAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Step 1', value: 's1' },
        { label: 'Step 2', value: 's2' },
        { label: 'Step 3', value: 's3' },
      ];
      const props = {
        dataSource,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.ref.prev).toBeDefined();
      expect(typeof currentValue.value.ref.prev).toBe('function');
      expect(currentValue.value.ref.next).toBeDefined();
      expect(typeof currentValue.value.ref.next).toBe('function');
    });

    it('应该根据 name 正确更新 active', async () => {
      const plugins = StepsAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Step 1', value: 's1' },
        { label: 'Step 2', value: 's2' },
        { label: 'Step 3', value: 's3' },
      ];
      const props = {
        dataSource,
        value: 's2',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();
      await waitForNextUpdate();

      expect(currentValue.value.active).toBe(1);
    });
  });

  describe('第四部分：插件交叉组合测试', () => {
    it('交叉组合：dataSource + active + 自定义 slots', async () => {
      const plugins = StepsAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Register', value: 'register', desc: 'Create account' },
        { label: 'Verify', value: 'verify', desc: 'Verify email' },
        { label: 'Complete', value: 'complete', desc: 'Setup profile' },
      ];
      const titleSlot = vi.fn(({ item }) => `🔹 ${item.label}`);
      const props = {
        dataSource,
        active: 2,
        slots: {
          title: titleSlot,
        },
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.active).toBe(2);
      expect(currentValue.value.slots.default).toBeDefined();
    });

    it('交叉组合：异步数据源 + nameField + 受控值', async () => {
      const plugins = StepsAccumulate.getPluginMethod({ isInDesigner: false });
      const asyncDataSource = vi.fn().mockResolvedValue([
        { title: 'Async A', id: 'aa' },
        { title: 'Async B', id: 'ab' },
        { title: 'Async C', id: 'ac' },
      ]);
      const props = {
        dataSource: asyncDataSource,
        nameField: 'id',
        value: 'ab',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();
      await waitForNextUpdate();

      expect(asyncDataSource).toHaveBeenCalled();
      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.stepNameList).toEqual(['aa', 'ab', 'ac']);
      expect(currentValue.value.active).toBe(1);
    });
  });

  describe('第五部分：边界和异常测试', () => {
    it('边界测试：大量步骤', async () => {
      const plugins = StepsAccumulate.getPluginMethod({ isInDesigner: false });
      const largeDataSource = Array.from({ length: 50 }, (_, i) => ({
        label: `Step ${i + 1}`,
        value: `step-${i + 1}`,
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
      expect(currentValue.value.data.length).toBe(50);
      expect(currentValue.value.stepNameList.length).toBe(50);
    });

    it('边界测试：空 label', async () => {
      const plugins = StepsAccumulate.getPluginMethod({ isInDesigner: false });
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

    it('边界测试：不存在的 name 值', async () => {
      const plugins = StepsAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Step 1', value: 's1' },
        { label: 'Step 2', value: 's2' },
      ];
      const props = {
        dataSource,
        value: 'nonexistent',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.active).toBe(0);
    });
  });

  describe('第六部分：props 更新响应式测试（使用 setValue）', () => {
    it('响应式测试：使用 setValue 更新 dataSource', async () => {
      const plugins = StepsAccumulate.getPluginMethod({ isInDesigner: false });
      const initialData = [
        { label: 'Old Step 1', value: 'os1' },
        { label: 'Old Step 2', value: 'os2' },
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
      expect(currentValue.value.stepNameList.length).toBe(2);

      const newData = [
        { label: 'New Step 1', value: 'ns1' },
        { label: 'New Step 2', value: 'ns2' },
        { label: 'New Step 3', value: 'ns3' },
      ];
      await setValue({ dataSource: newData });

      await waitForNextUpdate();

      expect(currentValue.value.data.length).toBe(3);
      expect(currentValue.value.stepNameList.length).toBe(3);
    });

    it('响应式测试：使用 setValue 更新 active（不需要 waitForNextUpdate）', async () => {
      const plugins = StepsAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Step 1', value: 's1' },
        { label: 'Step 2', value: 's2' },
        { label: 'Step 3', value: 's3' },
      ];
      const props = {
        dataSource,
        active: 1,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.active).toBe(1);

      await setValue({ active: 2 });

      expect(currentValue.value.active).toBe(2);

      await setValue({ active: 3 });

      expect(currentValue.value.active).toBe(3);
    });

    it('响应式测试：使用 setValue 更新 value（不需要 waitForNextUpdate）', async () => {
      const plugins = StepsAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Step A', value: 'a' },
        { label: 'Step B', value: 'b' },
        { label: 'Step C', value: 'c' },
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
      await waitForNextUpdate();

      expect(currentValue.value.active).toBe(1);

      await setValue({ modelValue: 'b' });
      await waitForNextUpdate();

      expect(currentValue.value.active).toBe(2);

      await setValue({ modelValue: 'c' });
      await waitForNextUpdate();

      expect(currentValue.value.active).toBe(3);
    });

    it('响应式测试：使用 setValue 更新 nameField', async () => {
      const plugins = StepsAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [{ label: 'Step', value: 'val', id: 'i' }];
      const props = {
        dataSource,
        nameField: 'value',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      expect(currentValue.value.stepNameList).toEqual(['val']);

      await setValue({ nameField: 'id' });

      expect(currentValue.value.stepNameList).toEqual(['i']);
    });

    it('响应式测试：使用 setValue 同时更新多个属性', async () => {
      const plugins = StepsAccumulate.getPluginMethod({ isInDesigner: false });
      const initialData = [{ label: 'Old', value: 'old' }];
      const props = {
        dataSource: initialData,
        active: 1,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate, setValue } = await renderHooks(plugins, props);

      await waitForNextUpdate();

      const newData = [
        { label: 'New 1', value: 'n1' },
        { label: 'New 2', value: 'n2' },
        { label: 'New 3', value: 'n3' },
      ];

      await setValue({
        dataSource: newData,
      });

      await waitForNextUpdate();

      expect(currentValue.value.data.length).toBe(3);
    });
  });

  describe('第七部分：完整流程集成测试', () => {
    it('完整流程：异步加载 → 字段映射 → 受控步骤 → 自定义 slots', async () => {
      const plugins = StepsAccumulate.getPluginMethod({ isInDesigner: false });
      const asyncDataSource = vi.fn().mockResolvedValue([
        { title: 'Order', id: 'order', desc: 'Place order' },
        { title: 'Payment', id: 'payment', desc: 'Complete payment' },
        { title: 'Shipping', id: 'shipping', desc: 'Ship items' },
        { title: 'Delivered', id: 'delivered', desc: 'Receive items' },
      ]);
      const titleSlot = vi.fn(({ item }) => `📦 ${item.label}`);
      const descriptionSlot = vi.fn(({ item }) => item.description);

      const props = {
        dataSource: asyncDataSource,
        nameField: 'id',
        value: 'payment',
        slots: {
          title: titleSlot,
          description: descriptionSlot,
        },
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();
      await waitForNextUpdate();

      expect(asyncDataSource).toHaveBeenCalled();
      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.stepNameList).toEqual(['order', 'payment', 'shipping', 'delivered']);
      expect(currentValue.value.active).toBe(1);
      expect(currentValue.value.ref.prev).toBeDefined();
      expect(currentValue.value.ref.next).toBeDefined();
    });

    it('完整流程：数据源 + prev/next 控制', async () => {
      const plugins = StepsAccumulate.getPluginMethod({ isInDesigner: false });
      const dataSource = [
        { label: 'Step 1', value: 's1' },
        { label: 'Step 2', value: 's2' },
        { label: 'Step 3', value: 's3' },
      ];
      const props = {
        dataSource,
        value: 's2',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, waitForNextUpdate } = await renderHooks(plugins, props);

      await waitForNextUpdate();
      await waitForNextUpdate();

      expect(currentValue.value.data).toBeDefined();
      expect(currentValue.value.active).toBe(1);
      expect(currentValue.value.ref.prev).toBeDefined();
      expect(currentValue.value.ref.next).toBeDefined();
    });
  });
});
