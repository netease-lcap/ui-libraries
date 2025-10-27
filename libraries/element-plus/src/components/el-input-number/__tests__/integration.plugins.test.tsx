import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHooks } from '@ep-test/test-utils/render-hook';
import { $deletePropsList } from '@/plugins/constants';
import { $formProvide } from '@/components/el-form/constants';
import '@/utils/index';
import InputNumberBasicAccumulate from '../plugins/index';

describe('el-input-number 插件集成测试', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('第一部分：插件链式执行测试', () => {
    it('应该按顺序执行所有插件并合并状态', async () => {
      const plugins = InputNumberBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 100,
        min: 0,
        max: 1000,
        step: 10,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result).toBeDefined();
      expect(result.formTagName).toBe('el-form-input-number');
      expect(result.tagName).toBe('el-input-number');
      expect(result.modelValue).toBe(100);
    });

    it('应该正确处理空 props 的情况', async () => {
      const plugins = InputNumberBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result).toBeDefined();
      expect(result.formTagName).toBe('el-form-input-number');
      expect(result.tagName).toBe('el-input-number');
    });
  });

  describe('第二部分：tagName 处理测试', () => {
    it('应该正确设置 formTagName 和 tagName', async () => {
      const plugins = InputNumberBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.formTagName).toBe('el-form-input-number');
      expect(result.tagName).toBe('el-input-number');
    });
  });

  describe('第三部分：受控值处理测试', () => {
    it('应该正确处理整数值', async () => {
      const plugins = InputNumberBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 50,
        'onUpdate:modelValue': vi.fn(),
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.modelValue).toBe(50);
      expect(result['onUpdate:modelValue']).toBeDefined();
    });

    it('应该正确处理小数值', async () => {
      const plugins = InputNumberBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 3.14,
        step: 0.01,
        precision: 2,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.modelValue).toBe(3.14);
    });

    it('应该正确处理负数值', async () => {
      const plugins = InputNumberBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: -25,
        min: -100,
        max: 100,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.modelValue).toBe(-25);
    });

    it('应该正确处理 0 值', async () => {
      const plugins = InputNumberBasicAccumulate.getPluginMethod({ isInDesigner: false });
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
      const plugins = InputNumberBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 100,
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

  describe('第四部分：预览模式测试', () => {
    it('应该正确生成预览文本', async () => {
      const plugins = InputNumberBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 999,
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
      const plugins = InputNumberBasicAccumulate.getPluginMethod({ isInDesigner: true });
      const props = {
        'data-nodepath': '/root/input-number',
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
      const plugins = InputNumberBasicAccumulate.getPluginMethod({ isInDesigner: false });
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
      const plugins = InputNumberBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 123.456,
        preview: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.render).toBeDefined();
    });

    it('应该正确处理负数的预览', async () => {
      const plugins = InputNumberBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: -88,
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

  describe('第五部分：表单集成测试', () => {
    it('应该在表单环境中正确设置 formTagName', async () => {
      const plugins = InputNumberBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        'data-nodepath': '/root/form/input-number',
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

      expect(result.formTagName).toBe('el-form-input-number');
    });

    it('应该在表单环境中支持 resetField', async () => {
      const plugins = InputNumberBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        'data-nodepath': '/root/form/input-number',
        modelValue: 100,
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

  describe('第六部分：插件交叉组合测试', () => {
    it('交叉组合：受控值 + min/max/step + 预览', async () => {
      const plugins = InputNumberBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 50,
        min: 0,
        max: 100,
        step: 5,
        preview: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.modelValue).toBe(50);
      expect(result.render).toBeDefined();
    });

    it('交叉组合：表单环境 + precision + 小数步长', async () => {
      const plugins = InputNumberBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        'data-nodepath': '/root/form/input-number',
        modelValue: 9.99,
        step: 0.01,
        precision: 2,
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

      expect(result.modelValue).toBe(9.99);
      expect(result.formTagName).toBe('el-form-input-number');
    });
  });

  describe('第七部分：边界和异常测试', () => {
    it('边界测试：最小值', async () => {
      const plugins = InputNumberBasicAccumulate.getPluginMethod({ isInDesigner: false });
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
      const plugins = InputNumberBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 10000,
        min: 0,
        max: 10000,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.modelValue).toBe(10000);
    });

    it('边界测试：非常小的小数', async () => {
      const plugins = InputNumberBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 0.0001,
        step: 0.0001,
        precision: 4,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.modelValue).toBe(0.0001);
    });

    it('边界测试：非常大的数字', async () => {
      const plugins = InputNumberBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 999999999,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.modelValue).toBe(999999999);
    });

    it('边界测试：null 和 undefined', async () => {
      const testCases = [null, undefined];

      testCases.forEach((value) => {
        const plugins = InputNumberBasicAccumulate.getPluginMethod({ isInDesigner: false });
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

  describe('第八部分：props 更新响应式测试（使用 setValue）', () => {
    it('响应式测试：使用 setValue 更新 modelValue（不需要 waitForNextUpdate）', async () => {
      const plugins = InputNumberBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 10,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.modelValue).toBe(10);

      await setValue({ modelValue: 50 });

      expect(currentValue.value.modelValue).toBe(50);

      await setValue({ modelValue: 100 });

      expect(currentValue.value.modelValue).toBe(100);
    });

    it('响应式测试：使用 setValue 更新小数值', async () => {
      const plugins = InputNumberBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 1.5,
        step: 0.5,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.modelValue).toBe(1.5);

      await setValue({ modelValue: 2.5 });

      expect(currentValue.value.modelValue).toBe(2.5);
    });

    it('响应式测试：使用 setValue 切换 preview', async () => {
      const plugins = InputNumberBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 88,
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
      const plugins = InputNumberBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 50,
        min: 0,
        max: 100,
        preview: false,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      await setValue({
        modelValue: 75,
        min: 0,
        max: 200,
        step: 5,
        preview: true,
      });

      expect(currentValue.value.modelValue).toBe(75);
      expect(currentValue.value.render).toBeDefined();
    });
  });

  describe('第九部分：完整流程集成测试', () => {
    it('完整流程：受控值 → min/max/step → 预览', async () => {
      const plugins = InputNumberBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 500,
        min: 0,
        max: 1000,
        step: 50,
        'onUpdate:modelValue': vi.fn(),
        preview: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.modelValue).toBe(500);
      expect(result['onUpdate:modelValue']).toBeDefined();
      expect(result.render).toBeDefined();
    });

    it('完整流程：表单环境 + precision + resetField', async () => {
      const plugins = InputNumberBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        'data-nodepath': '/form/input-number',
        modelValue: 99.99,
        min: 0,
        max: 999.99,
        step: 0.01,
        precision: 2,
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

      expect(result.formTagName).toBe('el-form-input-number');
      expect(result.modelValue).toBe(99.99);
      expect(result.ref.resetField).toBeDefined();
    });
  });
});

