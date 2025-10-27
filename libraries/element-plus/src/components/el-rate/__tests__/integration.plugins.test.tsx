import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHooks } from '@ep-test/test-utils/render-hook';
import { $deletePropsList } from '@/plugins/constants';
import { $formProvide } from '@/components/el-form/constants';
import '@/utils/index';
import RateAccumulate from '../plugins/index';

describe('el-rate 插件集成测试', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('第一部分：插件链式执行测试', () => {
    it('应该按顺序执行所有插件并合并状态', async () => {
      const plugins = RateAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 3.5,
        max: 5,
        lowColor: '#FF6B6B',
        mediumColor: '#FFA500',
        highColor: '#FFD700',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result).toBeDefined();
      expect(result.formTagName).toBe('el-form-rate');
      expect(result.tagName).toBe('el-rate');
      expect(result.colors).toBeDefined();
    });

    it('应该正确处理空 props 的情况', async () => {
      const plugins = RateAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result).toBeDefined();
      expect(result.formTagName).toBe('el-form-rate');
      expect(result.tagName).toBe('el-rate');
    });
  });

  describe('第二部分：tagName 处理测试', () => {
    it('应该正确设置 formTagName 和 tagName', async () => {
      const plugins = RateAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.formTagName).toBe('el-form-rate');
      expect(result.tagName).toBe('el-rate');
    });
  });

  describe('第三部分：受控值处理测试', () => {
    it('应该正确处理整数评分', async () => {
      const plugins = RateAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 4,
        'onUpdate:modelValue': vi.fn(),
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.modelValue).toBe(4);
      expect(result['onUpdate:modelValue']).toBeDefined();
    });

    it('应该正确处理小数评分', async () => {
      const plugins = RateAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 3.5,
        allowHalf: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.modelValue).toBe(3.5);
    });

    it('应该正确处理 0 分', async () => {
      const plugins = RateAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 0,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.modelValue).toBe(0);
    });

    it('应该正确设置 ref.resetField 方法', async () => {
      const plugins = RateAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 3,
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

  describe('第四部分：颜色处理测试', () => {
    it('应该使用默认颜色', async () => {
      const plugins = RateAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.colors).toBeDefined();
      expect(Array.isArray(result.colors)).toBe(true);
      expect(result.colors).toEqual(['#F7BA2A', '#F7BA2A', '#F7BA2A']);
    });

    it('应该正确处理自定义颜色', async () => {
      const plugins = RateAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        lowColor: '#FF0000',
        mediumColor: '#00FF00',
        highColor: '#0000FF',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.colors).toEqual(['#FF0000', '#00FF00', '#0000FF']);
    });

    it('应该正确处理 colors 数组', async () => {
      const plugins = RateAccumulate.getPluginMethod({ isInDesigner: false });
      const customColors = ['#E74C3C', '#F39C12', '#2ECC71'];
      const props = {
        colors: customColors,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.colors).toEqual(customColors);
    });

    it('colors 数组应该优先于单独的颜色属性', async () => {
      const plugins = RateAccumulate.getPluginMethod({ isInDesigner: false });
      const customColors = ['#111111', '#222222', '#333333'];
      const props = {
        lowColor: '#AAAAAA',
        mediumColor: '#BBBBBB',
        highColor: '#CCCCCC',
        colors: customColors,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.colors).toEqual(customColors);
    });
  });

  describe('第五部分：预览模式测试', () => {
    it('应该正确生成预览文本', async () => {
      const plugins = RateAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 4,
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
      const plugins = RateAccumulate.getPluginMethod({ isInDesigner: true });
      const props = {
        'data-nodepath': '/root/rate',
        modelValue: 3,
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
      const plugins = RateAccumulate.getPluginMethod({ isInDesigner: false });
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

    it('应该正确处理小数值的预览', async () => {
      const plugins = RateAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 4.5,
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
      const plugins = RateAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        'data-nodepath': '/root/form/rate',
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

      expect(result.formTagName).toBe('el-form-rate');
    });

    it('应该在表单环境中支持 resetField', async () => {
      const plugins = RateAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        'data-nodepath': '/root/form/rate',
        modelValue: 4,
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
    it('交叉组合：受控值 + 自定义颜色 + 预览', async () => {
      const plugins = RateAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 3.5,
        lowColor: '#FF6B6B',
        mediumColor: '#FFA500',
        highColor: '#4CAF50',
        preview: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.modelValue).toBe(3.5);
      expect(result.colors).toEqual(['#FF6B6B', '#FFA500', '#4CAF50']);
      expect(result.render).toBeDefined();
    });

    it('交叉组合：表单环境 + allowHalf + colors 数组', async () => {
      const plugins = RateAccumulate.getPluginMethod({ isInDesigner: false });
      const customColors = ['#E74C3C', '#F39C12', '#2ECC71'];
      const props = {
        'data-nodepath': '/root/form/rate',
        modelValue: 2.5,
        allowHalf: true,
        colors: customColors,
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

      expect(result.modelValue).toBe(2.5);
      expect(result.colors).toEqual(customColors);
      expect(result.formTagName).toBe('el-form-rate');
    });
  });

  describe('第八部分：边界和异常测试', () => {
    it('边界测试：最小值 0', async () => {
      const plugins = RateAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 0,
        max: 5,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.modelValue).toBe(0);
    });

    it('边界测试：最大值', async () => {
      const plugins = RateAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 10,
        max: 10,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.modelValue).toBe(10);
    });

    it('边界测试：精确小数值', async () => {
      const plugins = RateAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 3.33333,
        allowHalf: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.modelValue).toBe(3.33333);
    });

    it('边界测试：null 和 undefined', async () => {
      const testCases = [null, undefined];

      testCases.forEach((value) => {
        const plugins = RateAccumulate.getPluginMethod({ isInDesigner: false });
        const props = {
          modelValue: value,
          slots: {},
          ref: {},
          [$deletePropsList]: [],
        };

        const { currentValue } = await renderHooks(plugins, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
      });
    });
  });

  describe('第九部分：props 更新响应式测试（使用 setValue）', () => {
    it('响应式测试：使用 setValue 更新 modelValue（不需要 waitForNextUpdate）', async () => {
      const plugins = RateAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 2,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.modelValue).toBe(2);

      await setValue({ modelValue: 4 });

      expect(currentValue.value.modelValue).toBe(4);

      await setValue({ modelValue: 5 });

      expect(currentValue.value.modelValue).toBe(5);
    });

    it('响应式测试：使用 setValue 更新颜色', async () => {
      const plugins = RateAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        lowColor: '#FF0000',
        mediumColor: '#00FF00',
        highColor: '#0000FF',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.colors).toEqual(['#FF0000', '#00FF00', '#0000FF']);

      await setValue({ lowColor: '#111111', mediumColor: '#222222', highColor: '#333333' });

      expect(currentValue.value.colors).toEqual(['#111111', '#222222', '#333333']);
    });

    it('响应式测试：使用 setValue 切换 preview', async () => {
      const plugins = RateAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 3,
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
      const plugins = RateAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 2,
        lowColor: '#FF0000',
        preview: false,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      await setValue({
        modelValue: 4.5,
        lowColor: '#00FF00',
        mediumColor: '#0000FF',
        highColor: '#FF00FF',
        preview: true,
      });

      expect(currentValue.value.modelValue).toBe(4.5);
      expect(currentValue.value.colors).toEqual(['#00FF00', '#0000FF', '#FF00FF']);
      expect(currentValue.value.render).toBeDefined();
    });
  });

  describe('第十部分：完整流程集成测试', () => {
    it('完整流程：受控值 → 自定义颜色 → 预览', async () => {
      const plugins = RateAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 4,
        max: 5,
        lowColor: '#E74C3C',
        mediumColor: '#F39C12',
        highColor: '#27AE60',
        allowHalf: true,
        preview: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.modelValue).toBe(4);
      expect(result.colors).toEqual(['#E74C3C', '#F39C12', '#27AE60']);
      expect(result.render).toBeDefined();
    });

    it('完整流程：表单环境 + colors 数组 + resetField', async () => {
      const plugins = RateAccumulate.getPluginMethod({ isInDesigner: false });
      const customColors = ['#FF6B6B', '#FFA500', '#4CAF50', '#2196F3', '#9C27B0'];
      const props = {
        'data-nodepath': '/form/rate',
        modelValue: 3.5,
        max: 5,
        colors: customColors,
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

      expect(result.formTagName).toBe('el-form-rate');
      expect(result.modelValue).toBe(3.5);
      expect(result.colors).toEqual(customColors);
      expect(result.ref.resetField).toBeDefined();
    });
  });
});

