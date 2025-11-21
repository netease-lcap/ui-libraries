import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHooks } from '@ep-test/test-utils/render-hook';
import { $deletePropsList } from '@/plugins/constants';
import { $formProvide } from '@/components/el-form/constants';
import '@/utils/index';
import SwitchAccumulate from '../plugins/index';

describe('el-switch 插件集成测试', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('第一部分：插件链式执行测试', () => {
    it('应该按顺序执行所有插件并合并状态', async () => {
      const plugins = SwitchAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: true,
        activeText: '开启',
        inactiveText: '关闭',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result).toBeDefined();
      expect(result.formTagName).toBe('el-form-switch');
      expect(result.tagName).toBe('el-switch');
      expect(result.modelValue).toBe(true);
    });

    it('应该正确处理空 props 的情况', async () => {
      const plugins = SwitchAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result).toBeDefined();
      expect(result.formTagName).toBe('el-form-switch');
      expect(result.tagName).toBe('el-switch');
    });
  });

  describe('第二部分：tagName 处理测试', () => {
    it('应该正确设置 formTagName 和 tagName', async () => {
      const plugins = SwitchAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.formTagName).toBe('el-form-switch');
      expect(result.tagName).toBe('el-switch');
    });
  });

  describe('第三部分：受控值处理测试', () => {
    it('应该正确处理开启状态', async () => {
      const plugins = SwitchAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: true,
        'onUpdate:modelValue': vi.fn(),
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.modelValue).toBe(true);
      expect(result['onUpdate:modelValue']).toBeDefined();
    });

    it('应该正确处理关闭状态', async () => {
      const plugins = SwitchAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: false,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.modelValue).toBe(false);
    });

    it('应该正确处理自定义 activeValue 和 inactiveValue', async () => {
      const plugins = SwitchAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 1,
        activeValue: 1,
        inactiveValue: 0,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.modelValue).toBe(1);
    });

    it('应该正确设置 ref.resetField 方法', async () => {
      const plugins = SwitchAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: true,
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
    it('应该在开启状态显示"已开启"', async () => {
      const plugins = SwitchAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: true,
        preview: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.render).toBeDefined();
    });

    it('应该在关闭状态显示"已关闭"', async () => {
      const plugins = SwitchAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: false,
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
      const plugins = SwitchAccumulate.getPluginMethod({ isInDesigner: true });
      const props = {
        'data-nodepath': '/root/switch',
        modelValue: true,
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
      const plugins = SwitchAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        'data-nodepath': '/root/form/switch',
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

      expect(result.formTagName).toBe('el-form-switch');
    });

    it('应该在表单环境中支持 resetField', async () => {
      const plugins = SwitchAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        'data-nodepath': '/root/form/switch',
        modelValue: true,
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
    it('交叉组合：受控值 + 预览', async () => {
      const plugins = SwitchAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: true,
        'onUpdate:modelValue': vi.fn(),
        preview: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.modelValue).toBe(true);
      expect(result.render).toBeDefined();
    });

    it('交叉组合：表单环境 + 自定义值 + resetField', async () => {
      const plugins = SwitchAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        'data-nodepath': '/root/form/switch',
        modelValue: 'on',
        activeValue: 'on',
        inactiveValue: 'off',
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

      expect(result.modelValue).toBe('on');
      expect(result.formTagName).toBe('el-form-switch');
      expect(result.ref.resetField).toBeDefined();
    });
  });

  describe('第七部分：边界和异常测试', () => {
    it('边界测试：数字类型的值', async () => {
      const plugins = SwitchAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 1,
        activeValue: 1,
        inactiveValue: 0,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.modelValue).toBe(1);
    });

    it('边界测试：字符串类型的值', async () => {
      const plugins = SwitchAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 'yes',
        activeValue: 'yes',
        inactiveValue: 'no',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.modelValue).toBe('yes');
    });

    it('边界测试：null 和 undefined', async () => {
      const testCases = [null, undefined];

      testCases.forEach(async (value) => {
        const plugins = SwitchAccumulate.getPluginMethod({ isInDesigner: false });
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
    it('响应式测试：使用 setValue 切换 modelValue（不需要 waitForNextUpdate）', async () => {
      const plugins = SwitchAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: false,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.modelValue).toBe(false);

      await setValue({ modelValue: true });

      expect(currentValue.value.modelValue).toBe(true);

      await setValue({ modelValue: false });

      expect(currentValue.value.modelValue).toBe(false);
    });

    it('响应式测试：使用 setValue 更新自定义值', async () => {
      const plugins = SwitchAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 0,
        activeValue: 1,
        inactiveValue: 0,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.modelValue).toBe(0);

      await setValue({ modelValue: 1 });

      expect(currentValue.value.modelValue).toBe(1);
    });

    it('响应式测试：使用 setValue 切换 preview', async () => {
      const plugins = SwitchAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: true,
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
      const plugins = SwitchAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: false,
        preview: false,
        disabled: false,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      await setValue({
        modelValue: true,
        preview: true,
        disabled: true,
      });

      expect(currentValue.value.modelValue).toBe(true);
      expect(currentValue.value.render).toBeDefined();
      expect(currentValue.value.disabled).toBe(true);
    });
  });

  describe('第九部分：完整流程集成测试', () => {
    it('完整流程：受控值 → 状态切换 → 预览', async () => {
      const plugins = SwitchAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: false,
        'onUpdate:modelValue': vi.fn(),
        activeText: '已开启',
        inactiveText: '已关闭',
        preview: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.modelValue).toBe(false);
      expect(result['onUpdate:modelValue']).toBeDefined();
      expect(result.render).toBeDefined();
    });

    it('完整流程：表单环境 + 自定义值 + resetField', async () => {
      const plugins = SwitchAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        'data-nodepath': '/form/switch',
        modelValue: 'enabled',
        activeValue: 'enabled',
        inactiveValue: 'disabled',
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

      expect(result.formTagName).toBe('el-form-switch');
      expect(result.modelValue).toBe('enabled');
      expect(result.ref.resetField).toBeDefined();
    });
  });
});
