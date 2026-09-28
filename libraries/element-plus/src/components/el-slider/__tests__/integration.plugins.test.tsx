import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHooks } from '@ep-test/test-utils/render-hook';
import { $deletePropsList } from '@/plugins/constants';
import { $formProvide } from '@/components/el-form/constants';
import '@/utils/index';
import SliderAccumulate from '../plugins/index';

describe('el-slider 插件集成测试', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('第一部分：插件链式执行测试', () => {
    it('应该按顺序执行所有插件并合并状态', async () => {
      const plugins = SliderAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 50,
        min: 0,
        max: 100,
        height: 300,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result).toBeDefined();
      expect(result.formTagName).toBe('el-form-slider');
      expect(result.tagName).toBe('el-slider');
      expect(result.height).toBe('300px');
    });

    it('应该正确处理空 props 的情况', async () => {
      const plugins = SliderAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result).toBeDefined();
      expect(result.formTagName).toBe('el-form-slider');
      expect(result.tagName).toBe('el-slider');
    });
  });

  describe('第二部分：tagName 处理测试', () => {
    it('应该正确设置 formTagName 和 tagName', async () => {
      const plugins = SliderAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.formTagName).toBe('el-form-slider');
      expect(result.tagName).toBe('el-slider');
    });
  });

  describe('第三部分：受控值处理测试', () => {
    it('应该正确处理单值模式', async () => {
      const plugins = SliderAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 60,
        'onUpdate:modelValue': vi.fn(),
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.modelValue).toBe(60);
      expect(result['onUpdate:modelValue']).toBeDefined();
    });

    it('应该正确处理范围模式', async () => {
      const plugins = SliderAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: [20, 80],
        range: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.modelValue).toEqual([20, 80]);
    });

    it('应该正确设置 ref.resetField 方法', async () => {
      const plugins = SliderAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 50,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.ref).toBeDefined();
      expect(result.ref.resetField).toBeDefined();
      expect(typeof result.ref.resetField).toBe('function');
    });
  });

  describe('第四部分：height 处理测试', () => {
    it('应该正确处理数字类型的 height', async () => {
      const plugins = SliderAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        height: 200,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.height).toBe('200px');
    });

    it('应该处理未设置 height 的情况', async () => {
      const plugins = SliderAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.height).toBe('');
    });

    it('应该处理非数字类型的 height', async () => {
      const plugins = SliderAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        height: '300px',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.height).toBe('');
    });
  });

  describe('第五部分：预览模式测试', () => {
    it('应该正确生成预览文本', async () => {
      const plugins = SliderAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 75,
        preview: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.render).toBeDefined();
    });

    it('应该在 IDE 环境显示默认预览文本', async () => {
      const plugins = SliderAccumulate.getPluginMethod({ isInDesigner: true });
      const props = {
        'data-nodepath': '/root/slider',
        modelValue: 50,
        preview: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.render).toBeDefined();
    });

    it('应该正确处理 null 值的预览', async () => {
      const plugins = SliderAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: null,
        preview: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.render).toBeDefined();
    });

    it('应该正确处理范围模式的预览', async () => {
      const plugins = SliderAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: [30, 70],
        range: true,
        preview: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.render).toBeDefined();
    });
  });

  describe('第六部分：表单集成测试', () => {
    it('应该在表单环境中正确设置 formTagName', async () => {
      const plugins = SliderAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        'data-nodepath': '/root/form/slider',
        inject: {
          [$formProvide]: {
            isInForm: true,
          },
        },
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.formTagName).toBe('el-form-slider');
    });

    it('应该在表单环境中支持 resetField', async () => {
      const plugins = SliderAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        'data-nodepath': '/root/form/slider',
        modelValue: 50,
        inject: {
          [$formProvide]: {
            isInForm: true,
          },
        },
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.ref.resetField).toBeDefined();
    });
  });

  describe('第七部分：插件交叉组合测试', () => {
    it('交叉组合：受控值 + height + 预览', async () => {
      const plugins = SliderAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 65,
        height: 250,
        preview: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.modelValue).toBe(65);
      expect(result.height).toBe('250px');
      expect(result.render).toBeDefined();
    });

    it('交叉组合：范围模式 + 表单环境 + height', async () => {
      const plugins = SliderAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        'data-nodepath': '/root/form/slider',
        modelValue: [25, 75],
        range: true,
        height: 300,
        inject: {
          [$formProvide]: {
            isInForm: true,
          },
        },
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.modelValue).toEqual([25, 75]);
      expect(result.height).toBe('300px');
      expect(result.formTagName).toBe('el-form-slider');
    });
  });

  describe('第八部分：边界和异常测试', () => {
    it('边界测试：最小值', async () => {
      const plugins = SliderAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 0,
        min: 0,
        max: 100,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.modelValue).toBe(0);
    });

    it('边界测试：最大值', async () => {
      const plugins = SliderAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 100,
        min: 0,
        max: 100,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.modelValue).toBe(100);
    });

    it('边界测试：负数值', async () => {
      const plugins = SliderAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: -50,
        min: -100,
        max: 0,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.modelValue).toBe(-50);
    });

    it('边界测试：小数值', async () => {
      const plugins = SliderAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 33.5,
        step: 0.5,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.modelValue).toBe(33.5);
    });

    it('边界测试：空范围数组', async () => {
      const plugins = SliderAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: [],
        range: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.modelValue).toEqual([]);
    });
  });

  describe('第九部分：props 更新响应式测试（使用 setValue）', () => {
    it('响应式测试：使用 setValue 更新 modelValue（不需要 waitForNextUpdate）', async () => {
      const plugins = SliderAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 30,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.modelValue).toBe(30);

      await setValue({ modelValue: 50 });

      expect(currentValue.value.modelValue).toBe(50);

      await setValue({ modelValue: 80 });

      expect(currentValue.value.modelValue).toBe(80);
    });

    it('响应式测试：使用 setValue 更新范围值', async () => {
      const plugins = SliderAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: [20, 60],
        range: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.modelValue).toEqual([20, 60]);

      await setValue({ modelValue: [30, 70] });

      expect(currentValue.value.modelValue).toEqual([30, 70]);
    });

    it('响应式测试：使用 setValue 更新 height', async () => {
      const plugins = SliderAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        height: 200,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.height).toBe('200px');

      await setValue({ height: 400 });

      expect(currentValue.value.height).toBe('400px');
    });

    it('响应式测试：使用 setValue 切换 preview', async () => {
      const plugins = SliderAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 50,
        preview: false,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.render).toBeUndefined();

      await setValue({ preview: true });

      expect(currentValue.value.render).toBeDefined();
    });

    it('响应式测试：使用 setValue 同时更新多个属性', async () => {
      const plugins = SliderAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 40,
        height: 200,
        preview: false,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      await setValue({
        modelValue: 70,
        height: 350,
        preview: true,
      });

      expect(currentValue.value.modelValue).toBe(70);
      expect(currentValue.value.height).toBe('350px');
      expect(currentValue.value.render).toBeDefined();
    });
  });

  describe('第十部分：完整流程集成测试', () => {
    it('完整流程：受控值 → height → 预览', async () => {
      const plugins = SliderAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 55,
        min: 0,
        max: 100,
        step: 5,
        height: 280,
        preview: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.modelValue).toBe(55);
      expect(result.height).toBe('280px');
      expect(result.render).toBeDefined();
    });

    it('完整流程：表单环境 + 范围模式 + resetField', async () => {
      const plugins = SliderAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        'data-nodepath': '/form/slider',
        modelValue: [30, 70],
        range: true,
        'onUpdate:modelValue': vi.fn(),
        inject: {
          [$formProvide]: {
            isInForm: true,
          },
        },
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.formTagName).toBe('el-form-slider');
      expect(result.modelValue).toEqual([30, 70]);
      expect(result.ref.resetField).toBeDefined();
    });
  });
});

