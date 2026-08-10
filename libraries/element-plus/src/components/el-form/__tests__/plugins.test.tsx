import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '../../../../ep-test/test-utils/render-hook';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import { $formProvide } from '@/components/el-form/constants';
import FormBasicAccumulate from '../plugins/index';
import FormItemPluginAccumulate from '../plugins/form-item-plugin';
import { handleComponentInForm } from '../plugins/form-item';
import { useControllableValue, useEffect, useMemo, useRef, useCallback } from '@/plugins/hooks';

vi.mock('@lcap/validator', () => ({
  default: vi.fn().mockImplementation(() => ({
    validate: vi.fn().mockResolvedValue(true),
  })),
  localizeRules: {},
}));

// Mock Vue hooks
vi.mock('vue', () => ({
  ref: vi.fn((value) => ({ value })),
  watch: vi.fn(),
  inject: vi.fn(() => ({ value: {} })),
  getCurrentInstance: vi.fn(() => ({ vnode: { props: {} } })),
  computed: vi.fn((fn) => ({ value: fn() })),
  onMounted: vi.fn(),
  onUnmounted: vi.fn(),
  nextTick: vi.fn((fn) => fn()),
}));

// Mock Element Plus components
vi.mock('element-plus', () => ({
  FormProps: {},
  FormItemProps: {},
  ElFormItem: {
    props: {},
  },
  ElForm: vi.fn(),
  ElFormItemWrap: vi.fn(),
}));

// Mock utils
vi.mock('@/utils', () => ({
  categoryStyles: vi.fn((style) => ({ style, innerStyle: style })),
}));

// Mock plugins
// vi.mock('@/plugins/hooks', () => ({
//   useRef: vi.fn((value) => ({ value })),
//   useMemo: vi.fn((fn) => fn()),

//   useEffect: vi.fn(),
//   fiberNode: {
//     setCurrentFiber: vi.fn(),
//   },
// }));

// Mock constants
vi.mock('@/components/el-form/constants', () => ({
  $formProvide: '__LCAP_UI_EL_FORM_PROVIDE__',
}));

vi.mock('@/plugins/constants', () => ({
  $deletePropsList: Symbol('deletePropsList'),
  $dataSourceDeleteField: ['dataSource', 'textField', 'valueField'],
  $provide: Symbol('provide'),
  $formTagName: Symbol('formTagName'),
  $mergeRef: Symbol('mergeRef'),
  $tagName: Symbol('tagName'),
}));

describe('plugins/index.tsx', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('FormBasicAccumulate 基础功能', () => {
    it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
      expect(FormBasicAccumulate).toBeDefined();
      expect(typeof FormBasicAccumulate.addPlugin).toBe('function');
      expect(typeof FormBasicAccumulate.getPluginMethod).toBe('function');
      expect(Array.isArray(FormBasicAccumulate.Plugin)).toBe(true);
    });

    it('应该包含 handleModelValue 插件', () => {
      const handleModelValuePlugin = FormBasicAccumulate.getPluginMethodByName('handleModelValue');
      expect(handleModelValuePlugin).toBeDefined();
      if (handleModelValuePlugin) {
        expect(handleModelValuePlugin.name).toBe('handleModelValue');
        expect(typeof (handleModelValuePlugin as any).handle).toBe('function');
      }
    });
  });

  describe('handleModelValue 插件功能测试', () => {
    const plugin = FormBasicAccumulate.getPluginMethodByName('handleModelValue') as any;

    it('应该正确处理插件基本结构', () => {
      const props = {
        model: { test: 'value' },
        provide: {},
        ref: { validate: vi.fn(), resetFields: vi.fn() },
        preview: false,
        get: vi.fn((key) => {
          if (key === 'model') return { test: 'value' };
          if (key === 'provide') return {};
          if (key === 'ref') return { validate: vi.fn(), resetFields: vi.fn() };
          if (key === 'preview') return false;
          return undefined;
        }),
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // 验证返回值基本结构
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
      expect(result).toHaveProperty('model');
      expect(result).toHaveProperty('provide');
      expect(result).toHaveProperty('ref');
    });

    it('应该正确处理 model 属性', () => {
      const modelValue = { name: 'test', age: 25 };
      const props = {
        model: modelValue,
        provide: {},
        ref: { validate: vi.fn(), resetFields: vi.fn() },
        preview: false,
        get: vi.fn((key) => {
          if (key === 'model') return modelValue;
          if (key === 'provide') return {};
          if (key === 'ref') return { validate: vi.fn(), resetFields: vi.fn() };
          if (key === 'preview') return false;
          return undefined;
        }),
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result.model).toBeDefined();
      expect(result.model.value).toEqual(modelValue);
    });

    it('应该正确处理空的 model', () => {
      const props = {
        model: null,
        provide: {},
        ref: { validate: vi.fn(), resetFields: vi.fn() },
        preview: false,
        get: vi.fn((key) => {
          if (key === 'model') return null;
          if (key === 'provide') return {};
          if (key === 'ref') return { validate: vi.fn(), resetFields: vi.fn() };
          if (key === 'preview') return false;
          return undefined;
        }),
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result.model).toBeDefined();
      expect(result.model.value).toEqual({});
    });

    it('应该正确处理 provide 属性', () => {
      const provideValue = { existing: 'value' };
      const props = {
        model: { test: 'value' },
        provide: provideValue,
        ref: { validate: vi.fn(), resetFields: vi.fn() },
        preview: false,
        get: vi.fn((key) => {
          if (key === 'model') return { test: 'value' };
          if (key === 'provide') return provideValue;
          if (key === 'ref') return { validate: vi.fn(), resetFields: vi.fn() };
          if (key === 'preview') return false;
          return undefined;
        }),
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result.provide).toBeDefined();
      expect(result.provide).toHaveProperty('existing');
      expect(result.provide[$formProvide]).toBeDefined();
      expect(result.provide[$formProvide].isInForm).toBe(true);
      expect(result.provide[$formProvide].preview).toBe(false);
    });

    it('应该正确处理 ref 属性', () => {
      const refValue = { validate: vi.fn(), resetFields: vi.fn() };
      const props = {
        model: { test: 'value' },
        provide: {},
        ref: refValue,
        preview: false,
        get: vi.fn((key) => {
          if (key === 'model') return { test: 'value' };
          if (key === 'provide') return {};
          if (key === 'ref') return refValue;
          if (key === 'preview') return false;
          return undefined;
        }),
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result.ref).toBeDefined();
      expect(result.ref).toHaveProperty('validated');
      expect(result.ref).toHaveProperty('resetForm');
      expect(typeof result.ref.validated).toBe('function');
      expect(typeof result.ref.resetForm).toBe('function');
    });

    it('应该正确处理 preview 属性', () => {
      const props = {
        model: { test: 'value' },
        provide: {},
        ref: { validate: vi.fn(), resetFields: vi.fn() },
        preview: true,
        get: vi.fn((key) => {
          if (key === 'model') return { test: 'value' };
          if (key === 'provide') return {};
          if (key === 'ref') return { validate: vi.fn(), resetFields: vi.fn() };
          if (key === 'preview') return true;
          return undefined;
        }),
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result.provide[$formProvide].preview).toBe(true);
    });

    it('应该正确处理 undefined 的 preview', () => {
      const props = {
        model: { test: 'value' },
        provide: {},
        ref: { validate: vi.fn(), resetFields: vi.fn() },
        preview: undefined,
        get: vi.fn((key) => {
          if (key === 'model') return { test: 'value' };
          if (key === 'provide') return {};
          if (key === 'ref') return { validate: vi.fn(), resetFields: vi.fn() };
          if (key === 'preview') return undefined;
          return undefined;
        }),
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result.provide[$formProvide].preview).toBe(false);
    });

    it('应该正确处理复杂的 model 结构', () => {
      const complexModel = {
        user: { name: 'John', age: 30 },
        settings: { theme: 'dark', language: 'en' },
        permissions: ['read', 'write'],
      };

      const props = {
        model: complexModel,
        provide: {},
        ref: { validate: vi.fn(), resetFields: vi.fn() },
        preview: false,
        get: vi.fn((key) => {
          if (key === 'model') return complexModel;
          if (key === 'provide') return {};
          if (key === 'ref') return { validate: vi.fn(), resetFields: vi.fn() };
          if (key === 'preview') return false;
          return undefined;
        }),
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result.model.value).toEqual(complexModel);
    });

    it('应该正确处理空的 provide', () => {
      const props = {
        model: { test: 'value' },
        provide: null,
        ref: { validate: vi.fn(), resetFields: vi.fn() },
        preview: false,
        get: vi.fn((key) => {
          if (key === 'model') return { test: 'value' };
          if (key === 'provide') return null;
          if (key === 'ref') return { validate: vi.fn(), resetFields: vi.fn() };
          if (key === 'preview') return false;
          return undefined;
        }),
      };

      expect(() => {
        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;
        expect(result).toBeDefined();
      }).not.toThrow();
    });

    it('应该正确处理空的 ref', () => {
      const props = {
        model: { test: 'value' },
        provide: {},
        ref: null,
        preview: false,
        get: vi.fn((key) => {
          if (key === 'model') return { test: 'value' };
          if (key === 'provide') return {};
          if (key === 'ref') return null;
          if (key === 'preview') return false;
          return undefined;
        }),
      };

      expect(() => {
        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;
        expect(result).toBeDefined();
      }).not.toThrow();
    });
  });

  describe('插件集成和扩展性测试', () => {
    it('应该能够与其他插件组合使用', () => {
      const combinedAccumulate = FormBasicAccumulate.addPlugin({
        name: 'testPlugin',
        handle: () => ({
          testProperty: 'test-value',
          customData: 'custom',
        }),
      });

      const handleModelValuePlugin = combinedAccumulate.getPluginMethodByName('handleModelValue');
      const testPlugin = combinedAccumulate.getPluginMethodByName('testPlugin');

      expect(handleModelValuePlugin).toBeDefined();
      expect(testPlugin).toBeDefined();
      expect(testPlugin?.name).toBe('testPlugin');
    });

    it('应该正确处理插件的执行顺序', () => {
      const plugin1 = {
        name: 'plugin1',
        handle: () => ({ step1: 'completed' }),
      };
      const plugin2 = {
        name: 'plugin2',
        handle: () => ({ step2: 'completed' }),
      };

      const testAccumulate = FormBasicAccumulate.addPlugin(plugin1).addPlugin(plugin2);

      const plugins = testAccumulate.getPluginMethod();
      expect(plugins.length).toBeGreaterThanOrEqual(3);

      const foundPlugin1 = testAccumulate.getPluginMethodByName('plugin1');
      const foundPlugin2 = testAccumulate.getPluginMethodByName('plugin2');

      expect(foundPlugin1).toBeDefined();
      expect(foundPlugin2).toBeDefined();
    });
  });
});

describe('plugins/form-item-plugin.tsx', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('FormItemPluginAccumulate 基础功能', () => {
    it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
      expect(FormItemPluginAccumulate).toBeDefined();
      expect(typeof FormItemPluginAccumulate.addPlugin).toBe('function');
      expect(typeof FormItemPluginAccumulate.getPluginMethod).toBe('function');
      expect(Array.isArray(FormItemPluginAccumulate.Plugin)).toBe(true);
    });

    it('应该包含 handlePropName、handleRules 和 handleColSpan 插件', () => {
      const plugins = FormItemPluginAccumulate.getPluginMethod();
      expect(plugins).toHaveLength(3);

      const handlePropNamePlugin = FormItemPluginAccumulate.getPluginMethodByName('handlePropName');
      const handleRulesPlugin = FormItemPluginAccumulate.getPluginMethodByName('handleRules');
      const handleColSpanPlugin = FormItemPluginAccumulate.getPluginMethodByName('handleColSpan');

      expect(handlePropNamePlugin).toBeDefined();
      expect(handleRulesPlugin).toBeDefined();
      expect(handleColSpanPlugin).toBeDefined();

      if (handlePropNamePlugin) {
        expect(handlePropNamePlugin.name).toBe('handlePropName');
        expect(typeof (handlePropNamePlugin as any).handle).toBe('function');
      }

      if (handleRulesPlugin) {
        expect(handleRulesPlugin.name).toBe('handleRules');
        expect(typeof (handleRulesPlugin as any).handle).toBe('function');
      }

      if (handleColSpanPlugin) {
        expect(handleColSpanPlugin.name).toBe('handleColSpan');
        expect(typeof (handleColSpanPlugin as any).handle).toBe('function');
      }
    });
  });

  describe('handleColSpan 插件功能测试', () => {
    const plugin = FormItemPluginAccumulate.getPluginMethodByName('handleColSpan') as any;

    it('应该按 colSpan 设置跨列 CSS 变量', () => {
      const props = {
        colSpan: 2,
        style: {},
        inject: { [$formProvide]: { columns: 4, layout: 'grid' } },
      };

      const { currentValue } = renderHook(plugin, props);
      expect(currentValue.value.style['--el-form-item-col-span']).toBe(2);
    });

    it('跨列数超过表单总列数时应钳制为总列数以撑满整行', () => {
      const props = {
        colSpan: 6,
        style: {},
        inject: { [$formProvide]: { columns: 3, layout: 'grid' } },
      };

      const { currentValue } = renderHook(plugin, props);
      expect(currentValue.value.style['--el-form-item-col-span']).toBe(3);
    });

    it('colSpan 缺省时应为 1', () => {
      const props = {
        style: {},
        inject: { [$formProvide]: { columns: 4, layout: 'grid' } },
      };

      const { currentValue } = renderHook(plugin, props);
      expect(currentValue.value.style['--el-form-item-col-span']).toBe(1);
    });
  });

  describe('handlePropName 插件功能测试', () => {
    const plugin = FormItemPluginAccumulate.getPluginMethodByName('handlePropName') as any;

    it('应该正确处理插件基本结构', () => {
      const props = {
        prop: 'testProp',
        get: vi.fn((key) => {
          if (key === 'prop') return 'testProp';
          return undefined;
        }),
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result).toBeDefined();
      expect(result).toHaveProperty('prop');
      expect(result.prop).toBe('testProp');
    });

    it('应该正确处理 undefined 的 prop', () => {
      const props = {
        prop: undefined,
        get: vi.fn((key) => {
          if (key === 'prop') return undefined;
          return undefined;
        }),
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result.prop).toBeDefined();
      expect(typeof result.prop).toBe('string');
    });

    it('应该正确处理 null 的 prop', () => {
      const props = {
        prop: null,
        get: vi.fn((key) => {
          if (key === 'prop') return null;
          return undefined;
        }),
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result.prop).toBeDefined();
      expect(typeof result.prop).toBe('string');
    });

    it('应该正确处理空字符串的 prop', () => {
      const props = {
        prop: '',
        get: vi.fn((key) => {
          if (key === 'prop') return '';
          return undefined;
        }),
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result.prop).toBe('');
    });
  });

  describe('handleRules 插件功能测试', () => {
    const plugin = FormItemPluginAccumulate.getPluginMethodByName('handleRules') as any;

    it('应该正确处理插件基本结构', () => {
      const props = {
        rules: [],
        isRequired: false,
        get: vi.fn((key) => {
          if (key === 'rules') return [];
          if (key === 'isRequired') return false;
          return undefined;
        }),
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result).toBeDefined();
      expect(result).toHaveProperty('rules');
      expect(Array.isArray(result.rules)).toBe(true);
    });

    it('应该正确处理空的 rules', () => {
      const props = {
        rules: null,
        isRequired: false,
        get: vi.fn((key) => {
          if (key === 'rules') return null;
          if (key === 'isRequired') return false;
          return undefined;
        }),
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result.rules).toBeDefined();
      expect(Array.isArray(result.rules)).toBe(true);
    });

    it('应该正确处理 isRequired 为 true', () => {
      const props = {
        rules: [],
        isRequired: true,
        get: vi.fn((key) => {
          if (key === 'rules') return [];
          if (key === 'isRequired') return true;
          return undefined;
        }),
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result.rules).toBeDefined();
      expect(Array.isArray(result.rules)).toBe(true);
    });

    it('应该正确处理复杂的 rules', () => {
      const complexRules = [
        { message: 'Required field', required: true },
        { message: 'Invalid email', required: false },
      ];

      const props = {
        rules: complexRules,
        isRequired: true,
        get: vi.fn((key) => {
          if (key === 'rules') return complexRules;
          if (key === 'isRequired') return true;
          return undefined;
        }),
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(Array.isArray(result.rules)).toBe(true);
    });

    it('应该正确处理 undefined 的 isRequired', () => {
      const props = {
        rules: [],
        isRequired: undefined,
        get: vi.fn((key) => {
          if (key === 'rules') return [];
          if (key === 'isRequired') return undefined;
          return undefined;
        }),
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result.rules).toBeDefined();
      expect(Array.isArray(result.rules)).toBe(true);
    });
  });
});

describe('plugins/form-item.tsx', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('handleComponentInForm 函数功能测试', () => {
    it('应该正确处理插件基本结构', () => {
      const props = {
        'data-nodepath': 'test-path',
        formTagName: 'el-form-input',
        tagName: 'el-input',
        inject: {
          [$formProvide]: {
            isInForm: true,
          },
        },
        get: vi.fn((key) => {
          if (key === 'data-nodepath') return 'test-path';
          if (key === 'formTagName') return 'el-form-input';
          if (key === 'tagName') return 'el-input';
          if (key === 'inject') {
            return {
              [$formProvide]: {
                isInForm: true,
              },
            };
          }
          return undefined;
        }),
      };

      const result = handleComponentInForm(props);

      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
    });

    it('应该正确处理 isInForm 为 true 的情况', () => {
      const props = {
        'data-nodepath': 'test-path',
        formTagName: 'el-form-input',
        tagName: 'el-input',
        inject: {
          [$formProvide]: {
            isInForm: true,
          },
        },
        get: vi.fn((key) => {
          if (key === 'data-nodepath') return 'test-path';
          if (key === 'formTagName') return 'el-form-input';
          if (key === 'tagName') return 'el-input';
          if (key === 'inject') {
            return {
              [$formProvide]: {
                isInForm: true,
              },
            };
          }
          return undefined;
        }),
      };

      const result = handleComponentInForm(props);

      expect(result).toBeDefined();
    });

    it('应该正确处理 isInForm 为 false 的情况', () => {
      const props = {
        'data-nodepath': 'test-path',
        formTagName: 'el-form-input',
        tagName: 'el-input',
        inject: {
          [$formProvide]: {
            isInForm: false,
          },
        },
        get: vi.fn((key) => {
          if (key === 'data-nodepath') return 'test-path';
          if (key === 'formTagName') return 'el-form-input';
          if (key === 'tagName') return 'el-input';
          if (key === 'inject') {
            return {
              [$formProvide]: {
                isInForm: false,
              },
            };
          }
          return undefined;
        }),
      };

      const result = handleComponentInForm(props);

      expect(result).toBeDefined();
    });

    it('应该正确处理空的 nodePath', () => {
      const props = {
        'data-nodepath': null,
        formTagName: 'el-form-input',
        tagName: 'el-input',
        inject: {
          [$formProvide]: {
            isInForm: true,
          },
        },
        get: vi.fn((key) => {
          if (key === 'data-nodepath') return null;
          if (key === 'formTagName') return 'el-form-input';
          if (key === 'tagName') return 'el-input';
          if (key === 'inject') {
            return {
              [$formProvide]: {
                isInForm: true,
              },
            };
          }
          return undefined;
        }),
      };

      const result = handleComponentInForm(props);

      expect(result).toBeDefined();
    });

    it('应该正确处理空的 inject', () => {
      const props = {
        'data-nodepath': 'test-path',
        formTagName: 'el-form-input',
        tagName: 'el-input',
        inject: null,
        get: vi.fn((key) => {
          if (key === 'data-nodepath') return 'test-path';
          if (key === 'formTagName') return 'el-form-input';
          if (key === 'tagName') return 'el-input';
          if (key === 'inject') return null;
          return undefined;
        }),
      };

      const result = handleComponentInForm(props);

      expect(result).toBeDefined();
    });

    it('应该正确处理复杂的 props 结构', () => {
      const props = {
        'data-nodepath': 'complex-path-123',
        formTagName: 'el-form-complex-input',
        tagName: 'el-complex-input',
        inject: {
          [$formProvide]: {
            isInForm: true,
            value: { test: 'value' },
            setValue: vi.fn(),
            setFormitem: vi.fn(),
            deleteFormitem: vi.fn(),
            preview: false,
          },
        },
        get: vi.fn((key) => {
          if (key === 'data-nodepath') return 'complex-path-123';
          if (key === 'formTagName') return 'el-form-complex-input';
          if (key === 'tagName') return 'el-complex-input';
          if (key === 'inject') {
            return {
              [$formProvide]: {
                isInForm: true,
                value: { test: 'value' },
                setValue: vi.fn(),
                setFormitem: vi.fn(),
                deleteFormitem: vi.fn(),
                preview: false,
              },
            };
          }
          return undefined;
        }),
      };

      const result = handleComponentInForm(props);

      expect(result).toBeDefined();
    });
  });

  describe('边界情况和错误处理测试', () => {
    it('应该正确处理 props.get 抛出异常的情况', () => {
      const props = {
        get: vi.fn(() => {
          throw new Error('Test error');
        }),
      };

      expect(() => {
        const result = handleComponentInForm(props);
        expect(result).toBeDefined();
      }).toThrow('Test error');
    });

    it('应该正确处理各种数据类型的 props', () => {
      const testCases = [
        { 'data-nodepath': 'string-path' },
        { 'data-nodepath': 123 },
        { 'data-nodepath': true },
        { 'data-nodepath': null },
        { 'data-nodepath': undefined },
      ];

      testCases.forEach((testCase) => {
        const props = {
          ...testCase,
          formTagName: 'el-form-input',
          tagName: 'el-input',
          inject: {
            [$formProvide]: {
              isInForm: true,
            },
          },
          get: vi.fn((key) => {
            if (key === 'data-nodepath') return testCase['data-nodepath'];
            if (key === 'formTagName') return 'el-form-input';
            if (key === 'tagName') return 'el-input';
            if (key === 'inject') {
              return {
                [$formProvide]: {
                  isInForm: true,
                },
              };
            }
            return undefined;
          }),
        };

        expect(() => {
          const result = handleComponentInForm(props);
          expect(result).toBeDefined();
        }).not.toThrow();
      });
    });
  });
});
