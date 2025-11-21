import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHooks } from '@ep-test/test-utils/render-hook';
import { $deletePropsList } from '@/plugins/constants';
import { $formProvide } from '@/components/el-form/constants';
import '@/utils/index';
import InputBasicAccumulate from '../plugins/index';

describe('el-input 插件集成测试', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('第一部分：插件链式执行测试', () => {
    it('应该按顺序执行所有插件并合并状态', async () => {
      const plugins = InputBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 'test input',
        placeholder: '请输入',
        suffixIcon: 'search',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result).toBeDefined();
      expect(result.formTagName).toBe('el-form-input');
      expect(result.tagName).toBe('el-input');
      expect(result.placeholder).toBe('请输入');
      expect(result.rows).toBe(3);
    });

    it('应该正确处理空 props 的情况', async () => {
      const plugins = InputBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result).toBeDefined();
      expect(result.formTagName).toBe('el-form-input');
      expect(result.tagName).toBe('el-input');
      expect(result.placeholder).toBe('请输入内容');
    });
  });

  describe('第二部分：默认属性处理测试', () => {
    it('应该使用默认 placeholder', async () => {
      const plugins = InputBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.placeholder).toBe('请输入内容');
    });

    it('应该使用自定义 placeholder', async () => {
      const plugins = InputBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        placeholder: '请输入用户名',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.placeholder).toBe('请输入用户名');
    });

    it('应该设置默认 rows 为 3', async () => {
      const plugins = InputBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.rows).toBe(3);
    });
  });

  describe('第三部分：受控值处理测试', () => {
    it('应该正确处理受控模式', async () => {
      const plugins = InputBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 'hello',
        'onUpdate:modelValue': vi.fn(),
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.modelValue).toBe('hello');
      expect(result['onUpdate:modelValue']).toBeDefined();
    });

    it('应该正确设置 ref.resetField 方法', async () => {
      const plugins = InputBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 'test',
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

  describe('第四部分：icon 处理测试', () => {
    it('应该正确处理 suffixIcon', async () => {
      const plugins = InputBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        suffixIcon: 'search',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.suffixIcon).toBeDefined();
    });

    it('应该正确处理 prefixIcon', async () => {
      const plugins = InputBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        prefixIcon: 'user',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.prefixIcon).toBeDefined();
    });

    it('应该同时处理 prefixIcon 和 suffixIcon', async () => {
      const plugins = InputBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        prefixIcon: 'user',
        suffixIcon: 'search',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.prefixIcon).toBeDefined();
      expect(result.suffixIcon).toBeDefined();
    });
  });

  describe('第五部分：append/prepend 处理测试', () => {
    it('应该正确处理 showAppend', async () => {
      const plugins = InputBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const appendSlot = vi.fn(() => 'Append Content');
      const props = {
        showAppend: true,
        slots: {
          append: appendSlot,
        },
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.slots.append).toBeDefined();
    });

    it('应该正确处理 showPrepend', async () => {
      const plugins = InputBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const prependSlot = vi.fn(() => 'Prepend Content');
      const props = {
        showPrepend: true,
        slots: {
          prepend: prependSlot,
        },
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.slots.prepend).toBeDefined();
    });

    it('应该同时处理 showAppend 和 showPrepend', async () => {
      const plugins = InputBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const appendSlot = vi.fn(() => 'Append');
      const prependSlot = vi.fn(() => 'Prepend');
      const props = {
        showAppend: true,
        showPrepend: true,
        slots: {
          append: appendSlot,
          prepend: prependSlot,
        },
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.slots.append).toBeDefined();
      expect(result.slots.prepend).toBeDefined();
    });

    it('应该在 showAppend=false 时不显示 append', async () => {
      const plugins = InputBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const appendSlot = vi.fn(() => 'Append');
      const props = {
        showAppend: false,
        slots: {
          append: appendSlot,
        },
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.slots.append).toBeUndefined();
    });
  });

  describe('第六部分：预览模式测试', () => {
    it('应该正确生成预览文本', async () => {
      const plugins = InputBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 'Preview Text',
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
      const plugins = InputBasicAccumulate.getPluginMethod({ isInDesigner: true });
      const props = {
        'data-nodepath': '/root/input',
        modelValue: 'Test',
        preview: true,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.render).toBeDefined();
    });

    it('应该正确处理空值的预览', async () => {
      const plugins = InputBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: '',
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

  describe('第七部分：表单集成测试', () => {
    it('应该在表单环境中正确设置 formTagName', async () => {
      const plugins = InputBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        'data-nodepath': '/root/form/input',
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

      expect(result.formTagName).toBe('el-form-input');
    });

    it('应该在表单环境中支持 resetField', async () => {
      const plugins = InputBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        'data-nodepath': '/root/form/input',
        modelValue: 'test',
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

  describe('第八部分：插件交叉组合测试', () => {
    it('交叉组合：placeholder + icons + append/prepend', async () => {
      const plugins = InputBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        placeholder: '请输入搜索内容',
        prefixIcon: 'search',
        suffixIcon: 'close',
        showAppend: true,
        showPrepend: true,
        slots: {
          append: vi.fn(() => '搜索'),
          prepend: vi.fn(() => 'https://'),
        },
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.placeholder).toBe('请输入搜索内容');
      expect(result.prefixIcon).toBeDefined();
      expect(result.suffixIcon).toBeDefined();
      expect(result.slots.append).toBeDefined();
      expect(result.slots.prepend).toBeDefined();
    });

    it('交叉组合：受控值 + 预览 + 表单环境', async () => {
      const plugins = InputBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        'data-nodepath': '/root/form/input',
        modelValue: 'test value',
        'onUpdate:modelValue': vi.fn(),
        preview: true,
        inject: {
          [$formProvide]: {
            isInForm: true,
            preview: true,
          },
        },
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.modelValue).toBe('test value');
      expect(result.render).toBeDefined();
      expect(result.formTagName).toBe('el-form-input');
    });
  });

  describe('第九部分：边界和异常测试', () => {
    it('边界测试：空字符串 modelValue', async () => {
      const plugins = InputBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: '',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.modelValue).toBe('');
    });

    it('边界测试：非常长的文本', async () => {
      const plugins = InputBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const longText = 'a'.repeat(10000);
      const props = {
        modelValue: longText,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.modelValue).toBe(longText);
    });

    it('边界测试：null 和 undefined 值', async () => {
      const testCases = [null, undefined];

      testCases.forEach(async (value) => {
        const plugins = InputBasicAccumulate.getPluginMethod({ isInDesigner: false });
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

  describe('第十部分：props 更新响应式测试（使用 setValue）', () => {
    it('响应式测试：使用 setValue 更新 modelValue（不需要 waitForNextUpdate）', async () => {
      const plugins = InputBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 'initial',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.modelValue).toBe('initial');

      await setValue({ modelValue: 'updated' });

      expect(currentValue.value.modelValue).toBe('updated');

      await setValue({ modelValue: 'final' });

      expect(currentValue.value.modelValue).toBe('final');
    });

    it('响应式测试：使用 setValue 更新 placeholder', async () => {
      const plugins = InputBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        placeholder: 'Old placeholder',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.placeholder).toBe('Old placeholder');

      await setValue({ placeholder: 'New placeholder' });

      expect(currentValue.value.placeholder).toBe('New placeholder');
    });

    it('响应式测试：使用 setValue 切换 icons', async () => {
      const plugins = InputBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        prefixIcon: 'user',
        suffixIcon: 'search',
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.prefixIcon).toBeDefined();
      expect(currentValue.value.suffixIcon).toBeDefined();

      await setValue({ prefixIcon: 'email', suffixIcon: 'close' });

      expect(currentValue.value.prefixIcon).toBeDefined();
      expect(currentValue.value.suffixIcon).toBeDefined();
    });

    it('响应式测试：使用 setValue 切换 showAppend/showPrepend', async () => {
      const plugins = InputBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        showAppend: false,
        showPrepend: false,
        slots: {
          append: vi.fn(() => 'Append'),
          prepend: vi.fn(() => 'Prepend'),
        },
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      expect(currentValue.value.slots.append).toBeUndefined();
      expect(currentValue.value.slots.prepend).toBeUndefined();

      await setValue({ showAppend: true, showPrepend: true });

      expect(currentValue.value.slots.append).toBeDefined();
      expect(currentValue.value.slots.prepend).toBeDefined();
    });

    it('响应式测试：使用 setValue 切换 preview', async () => {
      const plugins = InputBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 'test',
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
      const plugins = InputBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 'old',
        placeholder: 'Old',
        prefixIcon: 'user',
        preview: false,
        slots: {},
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue, setValue } = await renderHooks(plugins, props);

      await setValue({
        modelValue: 'new',
        placeholder: 'New',
        prefixIcon: 'email',
        preview: true,
      });

      expect(currentValue.value.modelValue).toBe('new');
      expect(currentValue.value.placeholder).toBe('New');
      expect(currentValue.value.prefixIcon).toBeDefined();
      expect(currentValue.value.render).toBeDefined();
    });
  });

  describe('第十一部分：完整流程集成测试', () => {
    it('完整流程：受控值 → icons → append/prepend → 预览', async () => {
      const plugins = InputBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        modelValue: 'https://example.com',
        placeholder: '请输入网址',
        prefixIcon: 'link',
        suffixIcon: 'check',
        showAppend: true,
        showPrepend: true,
        preview: true,
        slots: {
          append: vi.fn(() => '.com'),
          prepend: vi.fn(() => 'https://'),
        },
        ref: {},
        [$deletePropsList]: [],
      };

      const { currentValue } = await renderHooks(plugins, props);
      const result = currentValue.value;

      expect(result.modelValue).toBe('https://example.com');
      expect(result.placeholder).toBe('请输入网址');
      expect(result.prefixIcon).toBeDefined();
      expect(result.suffixIcon).toBeDefined();
      expect(result.slots.append).toBeDefined();
      expect(result.slots.prepend).toBeDefined();
      expect(result.render).toBeDefined();
    });

    it('完整流程：表单环境 + 受控值 + resetField', async () => {
      const plugins = InputBasicAccumulate.getPluginMethod({ isInDesigner: false });
      const props = {
        'data-nodepath': '/form/input',
        modelValue: 'test value',
        'onUpdate:modelValue': vi.fn(),
        placeholder: '请输入',
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

      expect(result.formTagName).toBe('el-form-input');
      expect(result.modelValue).toBe('test value');
      expect(result.ref.resetField).toBeDefined();
    });
  });
});

