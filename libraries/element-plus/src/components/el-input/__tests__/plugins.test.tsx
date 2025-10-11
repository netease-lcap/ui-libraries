import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@ep-test/test-utils/render-hook';
import { $deletePropsList } from '@/plugins/constants';
import '@/utils/index';
import InputBasicAccumulate from '../plugins/index';
import InputIdeAccumulate from '../plugins/ide';

// Mock element-plus

// Mock @/index
vi.mock('@/index', () => ({
  ElPreview: vi.fn((props) => ({
    type: 'ElPreview',
    props,
  })),
}));

// Mock @/plugins/common/icon
vi.mock('@/plugins/common/icon', () => ({
  getPropsIcon: vi.fn(({ name }) => (name ? `icon-${name}` : undefined)),
}));

// Mock @/plugins/common/preview
vi.mock('@/plugins/common/preview', () => ({
  getIsPreview: vi.fn(() => false),
  getRender: vi.fn((Component, previewRender, isPreview) => ({
    render: Component || previewRender,
    insRef: { value: { reload: vi.fn(), data: [] } },
  })),
}));

describe('el-input plugins', () => {
  beforeEach(() => {
    // 重置所有 mock
    vi.clearAllMocks();
  });

  describe('index.tsx', () => {
    describe('InputBasicAccumulate 基础功能', () => {
      it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
        expect(InputBasicAccumulate).toBeDefined();
        expect(typeof InputBasicAccumulate.addPlugin).toBe('function');
        expect(typeof InputBasicAccumulate.getPluginMethod).toBe('function');
        expect(Array.isArray(InputBasicAccumulate.Plugin)).toBe(true);
      });

      it('应该包含多个插件', () => {
        const plugins = InputBasicAccumulate.getPluginMethod();
        expect(plugins.length).toBeGreaterThan(0);

        const pluginNames = [
          'handleDefaultPrps',
          'handleComponentInForm',
          'handleControllableValue',
          'handleSuffixIcon',
          'handleAppend',
          'handlePreview',
        ];
        pluginNames.forEach((name) => {
          const plugin = InputBasicAccumulate.getPluginMethodByName(name);
          expect(plugin).toBeDefined();
          if (plugin) {
            expect(plugin.name).toBe(name);
            expect(typeof (plugin as any).handle).toBe('function');
          }
        });
      });
    });

    describe('handleDefaultPrps 插件功能测试', () => {
      const plugin = InputBasicAccumulate.getPluginMethodByName('handleDefaultPrps') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          get: vi.fn((key) => {
            if (key === 'placeholder') return '测试占位符';
            if (key === $deletePropsList) return ['existing-prop'];
            return undefined;
          }),
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
        expect(result).toHaveProperty('placeholder');
        expect(result).toHaveProperty('rows');
        expect(result).toHaveProperty('formTagName');
        expect(result).toHaveProperty('tagName');
      });

      it('应该正确处理默认 placeholder', () => {
        const props = {
          get: vi.fn((key) => {
            if (key === 'placeholder') return undefined;
            if (key === $deletePropsList) return [];
            return undefined;
          }),
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.placeholder).toBe('请输入内容');
      });

      it('应该正确处理自定义 placeholder', () => {
        const props = {
          placeholder: '自定义占位符',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.placeholder).toBe('自定义占位符');
      });

      it('应该正确设置 deletePropsList', () => {
        const props = {
          placeholder: '测试',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        const symbolKey = Object.getOwnPropertySymbols(result).find((s) => s.toString().includes('deletePropsList')) as symbol;
        expect(symbolKey).toBeDefined();
        expect(Array.isArray(result[symbolKey])).toBe(true);
        expect(result[symbolKey]).toEqual(expect.arrayContaining(['data-nodepath']));
      });

      it('应该正确设置固定属性', () => {
        const props = {
          get: vi.fn((key) => {
            if (key === 'placeholder') return '测试';
            if (key === $deletePropsList) return [];
            return undefined;
          }),
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.rows).toBe(3);
        expect(result.formTagName).toBe('el-form-input');
        expect(result.tagName).toBe('el-input');
      });
    });

    describe('handleSuffixIcon 插件功能测试', () => {
      const plugin = InputBasicAccumulate.getPluginMethodByName('handleSuffixIcon') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          get: vi.fn((key) => {
            if (key === 'suffixIcon') return 'search';
            if (key === 'prefixIcon') return 'user';
            return undefined;
          }),
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
        expect(result).toHaveProperty('suffixIcon');
        expect(result).toHaveProperty('prefixIcon');
      });

      it('应该正确处理 suffixIcon', () => {
        const props = {
          suffixIcon: 'search',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.suffixIcon).toBe('icon-search');
        expect(result.prefixIcon).toBeUndefined();
      });

      it('应该正确处理 prefixIcon', () => {
        const props = {
          prefixIcon: 'user',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.suffixIcon).toBeUndefined();
        expect(result.prefixIcon).toBe('icon-user');
      });

      it('应该正确处理两个图标', () => {
        const props = {
          suffixIcon: 'search',
          prefixIcon: 'user',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.suffixIcon).toBe('icon-search');
        expect(result.prefixIcon).toBe('icon-user');
      });

      it('应该正确处理 undefined 图标', () => {
        const props = {
          get: vi.fn((key) => {
            if (key === 'suffixIcon') return undefined;
            if (key === 'prefixIcon') return undefined;
            return undefined;
          }),
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.suffixIcon).toBeUndefined();
        expect(result.prefixIcon).toBeUndefined();
      });
    });

    describe('handleAppend 插件功能测试', () => {
      const plugin = InputBasicAccumulate.getPluginMethodByName('handleAppend') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          slots: { append: vi.fn(() => 'append'), prepend: vi.fn(() => 'prepend') },
          showAppend: true,
          showPrepend: true,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
        expect(() => {
          expect(result).toHaveProperty('slots');
        }).not.toThrow();
      });

      it('应该正确处理 showAppend 为 true', () => {
        const mockAppendSlot = vi.fn(() => 'append content');
        const props = {
          slots: { append: mockAppendSlot },
          showAppend: true,
          showPrepend: false,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots).toBeDefined();
        expect(result.slots.append).toBe('append content');
        expect(result.slots.prepend).toBeUndefined();
      });

      it('应该正确处理 showPrepend 为 true', () => {
        const mockPrependSlot = vi.fn(() => 'prepend content');
        const props = {
          slots: { prepend: mockPrependSlot },
          showAppend: false,
          showPrepend: true,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots).toBeDefined();
        expect(result.slots.append).toBeUndefined();
        expect(result.slots.prepend).toBe('prepend content');
      });

      it('应该正确处理两个都为 true', () => {
        const mockAppendSlot = vi.fn(() => 'append content');
        const mockPrependSlot = vi.fn(() => 'prepend content');
        const props = {
          slots: { append: mockAppendSlot, prepend: mockPrependSlot },
          showAppend: true,
          showPrepend: true,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots).toBeDefined();
        expect(result.slots.append).toBe('append content');
        expect(result.slots.prepend).toBe('prepend content');
      });

      it('应该正确处理两个都为 false', () => {
        const props = {
          slots: { other: vi.fn() },
          showAppend: false,
          showPrepend: false,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots).toBeDefined();
        expect(result.slots.append).toBeUndefined();
        expect(result.slots.prepend).toBeUndefined();
      });

      it('应该正确处理空的 slots', () => {
        const props = {
          slots: {},
          showAppend: true,
          showPrepend: true,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots).toBeDefined();
        expect(result.slots.append).toBeUndefined();
        expect(result.slots.prepend).toBeUndefined();
      });
    });

    describe('handlePreview 插件功能测试', () => {
      const plugin = InputBasicAccumulate.getPluginMethodByName('handlePreview') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          get: vi.fn((key) => {
            if (key === 'ref') return { current: null };
            if (key === 'render') return vi.fn();
            if (key === 'data-nodepath') return 'test-path';
            return undefined;
          }),
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
        expect(result).toHaveProperty('ref');
        expect(result).toHaveProperty('render');
      });

      it('应该正确处理 ref 对象', () => {
        const originalRef = { current: null, originalMethod: vi.fn() };
        const props = {
          get: vi.fn((key) => {
            if (key === 'ref') return originalRef;
            if (key === 'render') return vi.fn();
            if (key === 'data-nodepath') return 'test-path';
            return undefined;
          }),
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.ref).toBeDefined();
        expect(typeof result.ref).toBe('object');
      });

      it('应该正确处理 IDE 模式', () => {
        const props = {
          get: vi.fn((key) => {
            if (key === 'ref') return { current: null };
            if (key === 'render') return vi.fn();
            if (key === 'data-nodepath') return 'test-path';
            return undefined;
          }),
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result.render).toBeDefined();
      });

      it('应该正确处理非 IDE 模式', () => {
        const props = {
          get: vi.fn((key) => {
            if (key === 'ref') return { current: null };
            if (key === 'render') return vi.fn();
            if (key === 'data-nodepath') return undefined;
            return undefined;
          }),
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(result.render).toBeDefined();
      });
    });
  });

  describe('ide.ts', () => {
    describe('InputIdeAccumulate 基础功能', () => {
      it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
        expect(InputIdeAccumulate).toBeDefined();
        expect(typeof InputIdeAccumulate.addPlugin).toBe('function');
        expect(typeof InputIdeAccumulate.getPluginMethod).toBe('function');
        expect(Array.isArray(InputIdeAccumulate.Plugin)).toBe(true);
      });

      it('应该包含 handleNodePath 插件', () => {
        const plugins = InputIdeAccumulate.getPluginMethod();
        expect(plugins).toHaveLength(0);

        const handleNodePathPlugin = InputIdeAccumulate.getPluginMethodByName('handleNodePath');
        expect(handleNodePathPlugin).toBeDefined();
        if (handleNodePathPlugin) {
          expect(handleNodePathPlugin.name).toBe('handleNodePath');
          expect(typeof (handleNodePathPlugin as any).handle).toBe('function');
        }
      });
    });

    describe('handleNodePath 插件功能测试', () => {
      const plugin = InputIdeAccumulate.getPluginMethodByName('handleNodePath') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          get: vi.fn((key) => {
            if (key === 'data-nodepath') return 'test-path';
            if (key === 'class') return 'existing-class';
            return undefined;
          }),
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
        expect(result).toHaveProperty('class');
      });

      it('应该正确处理 nodePath', () => {
        const props = {
          'data-nodepath': 'test-path',
          class: 'existing-class',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toContain('existing-class');
      });

      it('应该正确处理复杂的 class', () => {
        const props = {
          'data-nodepath': 'test-path',
          class: 'class1 class2 class3',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.class).toContain('class1 class2 class3');
      });
    });
  });

  describe('边界情况和错误处理测试', () => {
    it('应该正确处理各种数据类型的 props', () => {
      const plugin = InputBasicAccumulate.getPluginMethodByName('handleDefaultPrps') as any;
      const testCases = [
        { placeholder: 'string' },
        { placeholder: null },
        { placeholder: undefined },
        { placeholder: 123 },
        { placeholder: {} },
      ];

      testCases.forEach((testCase) => {
        const props = {
          get: vi.fn((key) => testCase[key]),
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          expect(currentValue.value).toBeDefined();
        }).not.toThrow();
      });
    });

    it('应该正确处理 handleSuffixIcon 的各种数据类型', () => {
      const plugin = InputBasicAccumulate.getPluginMethodByName('handleSuffixIcon') as any;
      const testCases = [
        { suffixIcon: 'search', prefixIcon: 'user' },
        { suffixIcon: null, prefixIcon: null },
        { suffixIcon: undefined, prefixIcon: undefined },
        { suffixIcon: 123, prefixIcon: 456 },
        { suffixIcon: {}, prefixIcon: {} },
      ];

      testCases.forEach((testCase) => {
        const props = {
          get: vi.fn((key) => testCase[key]),
        };

        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          expect(currentValue.value).toBeDefined();
        }).not.toThrow();
      });
    });
  });
});
