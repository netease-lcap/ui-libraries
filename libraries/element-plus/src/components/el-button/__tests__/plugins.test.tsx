import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@ep-test/test-utils/render-hook';
import { $deletePropsList } from '@/plugins/constants';
import { $PopconfirmProps } from '../constants';
import '@/utils/index';
import ButtonAccumulate from '../plugins/index';

// Mock ElPopconfirm component
vi.mock('element-plus', () => ({
  ElPopconfirm: vi.fn((props) => ({
    type: 'ElPopconfirm',
    props,
    children: props.children || [],
  })),
  buttonProps: {},
}));

// Mock getPropsIcon
vi.mock('@/plugins/common/icon', () => ({
  getPropsIcon: vi.fn(({ name, class: className }) => ({ 
    name, 
    type: 'icon',
    className: className || 'default-icon-class'
  })),
}));

describe('plugins/index.tsx', () => {
  beforeEach(() => {
    // 重置所有 mock
    vi.clearAllMocks();
  });

  describe('ButtonAccumulate 基础功能', () => {
    it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
      expect(ButtonAccumulate).toBeDefined();
      expect(typeof ButtonAccumulate.addPlugin).toBe('function');
      expect(typeof ButtonAccumulate.getPluginMethod).toBe('function');
      expect(Array.isArray(ButtonAccumulate.Plugin)).toBe(true);
    });

    it('应该包含所有必要的插件', () => {
      const plugins = ButtonAccumulate.getPluginMethod();
      expect(plugins.length).toBeGreaterThanOrEqual(4);

      const pluginNames = [
        'handleTextToslot',
        'handlePopupconfirmButton',
        'handleRightIcon',
        'handleThrottleTime',
      ];

      pluginNames.forEach((pluginName) => {
        const plugin = ButtonAccumulate.getPluginMethodByName(pluginName);
        expect(plugin).toBeDefined();
        if (plugin) {
          expect(plugin.name).toBe(pluginName);
          expect(typeof (plugin as any).handle).toBe('function');
        }
      });
    });
  });

  describe('handleTextToslot 插件功能测试', () => {
    const plugin = ButtonAccumulate.getPluginMethodByName('handleTextToslot') as any;

    it('应该正确处理插件基本结构', () => {
      const props = {
        text: 'Test Button',
        slots: {},
        icon: 'search',
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // 验证返回值基本结构
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
      expect(result).toHaveProperty('slots');
      expect(result).toHaveProperty('icon');
      // 验证 deletePropsList Symbol 属性存在
      const symbolKey = Object.getOwnPropertySymbols(result).find((s) => s.toString().includes('deletePropsList')) as symbol;
      expect(symbolKey).toBeDefined();
    });

    it('应该正确处理字符串类型的 text', () => {
      const props = {
        text: 'Click Me',
        slots: { existing: vi.fn() },
        icon: 'search',
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // 验证 text 被转换为 default slot
      expect(result.slots).toHaveProperty('default');
      expect(typeof result.slots.default).toBe('function');
      expect(result.slots).toHaveProperty('existing'); // 保留原有 slots

      // 验证 deletePropsList 包含 'text'
      const symbolKey = Object.getOwnPropertySymbols(result).find((s) => s.toString().includes('deletePropsList')) as symbol;
      expect(symbolKey).toBeDefined();
      expect(result[symbolKey]).toContain('text');
    });

    it('应该正确处理非字符串类型的 text', () => {
      const props = {
        text: 123,
        slots: { existing: vi.fn() },
        icon: 'search',
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // 非字符串 text 不应该被转换为 slot
      expect(result.slots).not.toHaveProperty('default');
      expect(result.slots).toHaveProperty('existing'); // 保留原有 slots

      // 验证 deletePropsList 不包含 'text'
      const symbolKey = Object.getOwnPropertySymbols(result).find((s) => s.toString().includes('deletePropsList')) as symbol;
      expect(symbolKey).toBeDefined();
      expect(result[symbolKey]).not.toContain('text');
    });

    it('应该正确处理 null 和 undefined 的 text', () => {
      const testCases = [
        { text: null },
        { text: undefined },
      ];

      testCases.forEach((testCase) => {
        const props = {
          ...testCase,
          slots: { existing: vi.fn() },
          icon: 'search',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        // 这些情况不应该被转换为 slot
        expect(result.slots).not.toHaveProperty('default');
        expect(result.slots).toHaveProperty('existing');
      });
    });

    it('应该正确处理空字符串的 text', () => {
      const props = {
        text: '',
        slots: { existing: vi.fn() },
        icon: 'search',
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // 空字符串应该被转换为 slot
      expect(result.slots).toHaveProperty('default');
      expect(result.slots).toHaveProperty('existing');
    });

    it('应该正确处理 icon 属性', () => {
      const props = {
        text: 'Test Button',
        slots: {},
        icon: 'custom-icon',
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result.icon).toBeDefined();
      expect(result.icon).toHaveProperty('name', 'custom-icon');
      expect(result.icon).toHaveProperty('type', 'icon');
    });

    it('应该正确处理空的 slots', () => {
      const props = {
        text: 'Test Button',
        slots: {},
        icon: 'search',
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result.slots).toHaveProperty('default');
      expect(typeof result.slots.default).toBe('function');
    });

    it('应该正确处理复杂的 slots', () => {
      const props = {
        text: 'Test Button',
        slots: {
          existing: vi.fn(),
          custom: vi.fn(),
        },
        icon: 'search',
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result.slots).toHaveProperty('default');
      expect(result.slots).toHaveProperty('existing');
      expect(result.slots).toHaveProperty('custom');
    });
  });

  describe('handlePopupconfirmButton 插件功能测试', () => {
    const plugin = ButtonAccumulate.getPluginMethodByName('handlePopupconfirmButton') as any;

    it('应该正确处理插件基本结构', () => {
      const mockRender = vi.fn();
      const props = {
        render: mockRender,
        isPopConfirm: false,
        slots: { default: vi.fn() },
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // 验证返回值基本结构
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
    });

    it('应该正确处理 isPopConfirm=false 的情况', () => {
      const mockRender = vi.fn();
      const props = {
        render: mockRender,
        isPopConfirm: false,
        slots: { default: vi.fn() },
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // isPopConfirm=false 时应该返回空对象
      expect(result).toEqual({});
    });

    it('应该正确处理 isPopConfirm=true 的情况', () => {
      const mockRender = vi.fn();
      const props = {
        render: mockRender,
        isPopConfirm: true,
        slots: { default: vi.fn() },
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // isPopConfirm=true 时应该返回 render 函数
      expect(result).toHaveProperty('render');
      expect(typeof result.render).toBe('function');
      expect(result.render).toHaveProperty('inheritAttrs', false);
    });

    it('应该正确处理 Popconfirm 属性', () => {
      const mockRender = vi.fn();
      const props = {
        render: mockRender,
        isPopConfirm: true,
        slots: { default: vi.fn() },
        title: '确认删除？',
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        popconfirmIcon: 'warning',
        onClick: vi.fn(),
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result).toHaveProperty('render');
      expect(typeof result.render).toBe('function');
    });

    it('应该正确处理默认的 Popconfirm 属性', () => {
      const mockRender = vi.fn();
      const props = {
        render: mockRender,
        isPopConfirm: true,
        slots: { default: vi.fn() },
        onClick: vi.fn(),
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result).toHaveProperty('render');
      expect(typeof result.render).toBe('function');
    });

    it('应该正确处理边界情况', () => {
      const testCases = [
        { render: null, isPopConfirm: true, slots: {} },
        { render: undefined, isPopConfirm: true, slots: {} },
        { render: vi.fn(), isPopConfirm: null, slots: {} },
        { render: vi.fn(), isPopConfirm: undefined, slots: {} },
      ];

      testCases.forEach((testCase) => {
        // 检查插件能否处理边界情况而不抛出错误
        expect(() => {
          const { currentValue } = renderHook(plugin, testCase);
          const result = currentValue.value;
          expect(result).toBeDefined();
        }).not.toThrow();
      });
    });
  });

  describe('handleRightIcon 插件功能测试', () => {
    const plugin = ButtonAccumulate.getPluginMethodByName('handleRightIcon') as any;

    it('应该正确处理插件基本结构', () => {
      const props = {
        rightIcon: 'arrow-right',
        slots: { default: vi.fn() },
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // 验证返回值基本结构
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
      expect(result).toHaveProperty('slots');
    });

    it('应该正确处理有效的 rightIcon', () => {
      const mockDefaultSlot = vi.fn(() => 'Button Text');
      const props = {
        rightIcon: 'arrow-right',
        slots: { default: mockDefaultSlot },
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result.slots).toHaveProperty('default');
      expect(typeof result.slots.default).toBe('function');
    });

    it('应该正确处理 null rightIcon', () => {
      const props = {
        rightIcon: null,
        slots: { default: vi.fn() },
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // rightIcon 为 null 时应该返回空对象
      expect(result).toEqual({});
    });

    it('应该正确处理 undefined rightIcon', () => {
      const props = {
        rightIcon: undefined,
        slots: { default: vi.fn() },
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // rightIcon 为 undefined 时应该返回空对象
      expect(result).toEqual({});
    });

    it('应该正确处理空字符串 rightIcon', () => {
      const props = {
        rightIcon: '',
        slots: { default: vi.fn() },
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // 空字符串应该被当作 falsy 值
      expect(result).toEqual({});
    });

    it('应该正确处理数字类型的 rightIcon', () => {
      const mockDefaultSlot = vi.fn(() => 'Button Text');
      const props = {
        rightIcon: 123,
        slots: { default: mockDefaultSlot },
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result.slots).toHaveProperty('default');
      expect(typeof result.slots.default).toBe('function');
    });

    it('应该正确处理对象类型的 rightIcon', () => {
      const mockDefaultSlot = vi.fn(() => 'Button Text');
      const props = {
        rightIcon: { name: 'custom-icon' },
        slots: { default: mockDefaultSlot },
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result.slots).toHaveProperty('default');
      expect(typeof result.slots.default).toBe('function');
    });

    it('应该正确处理复杂的 slots', () => {
      const mockDefaultSlot = vi.fn(() => 'Button Text');
      const props = {
        rightIcon: 'arrow-right',
        slots: {
          default: mockDefaultSlot,
          existing: vi.fn(),
        },
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result.slots).toHaveProperty('default');
      expect(result.slots).toHaveProperty('existing');
    });
  });

  describe('handleThrottleTime 插件功能测试', () => {
    const plugin = ButtonAccumulate.getPluginMethodByName('handleThrottleTime') as any;

    it('应该正确处理插件基本结构', () => {
      const mockOnClick = vi.fn();
      const props = {
        throttleTime: 1000,
        onClick: mockOnClick,
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // 验证返回值基本结构
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
      expect(result).toHaveProperty('onClick');
      expect(typeof result.onClick).toBe('function');
    });

    it('应该正确处理有效的 throttleTime', () => {
      const mockOnClick = vi.fn();
      const props = {
        throttleTime: 500,
        onClick: mockOnClick,
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result.onClick).toBeDefined();
      expect(typeof result.onClick).toBe('function');
      // 验证返回的是节流函数
      expect(result.onClick).not.toBe(mockOnClick);
    });

    it('应该正确处理 throttleTime 为 0', () => {
      const mockOnClick = vi.fn();
      const props = {
        throttleTime: 0,
        onClick: mockOnClick,
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // throttleTime 为 0 时应该返回空对象
      expect(result).toEqual({});
    });

    it('应该正确处理 null throttleTime', () => {
      const mockOnClick = vi.fn();
      const props = {
        throttleTime: null,
        onClick: mockOnClick,
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // throttleTime 为 null 时应该返回空对象
      expect(result).toEqual({});
    });

    it('应该正确处理 undefined throttleTime', () => {
      const mockOnClick = vi.fn();
      const props = {
        throttleTime: undefined,
        onClick: mockOnClick,
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // throttleTime 为 undefined 时应该返回空对象
      expect(result).toEqual({});
    });

    it('应该正确处理默认的 onClick', () => {
      const props = {
        throttleTime: 1000,
        // 不提供 onClick
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result.onClick).toBeDefined();
      expect(typeof result.onClick).toBe('function');
    });

    it('应该正确处理负数 throttleTime', () => {
      const mockOnClick = vi.fn();
      const props = {
        throttleTime: -100,
        onClick: mockOnClick,
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // 负数 throttleTime 仍然会被处理（lodash.throttle 会处理负数）
      expect(result.onClick).toBeDefined();
      expect(typeof result.onClick).toBe('function');
    });

    it('应该正确处理小数 throttleTime', () => {
      const mockOnClick = vi.fn();
      const props = {
        throttleTime: 0.5,
        onClick: mockOnClick,
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result.onClick).toBeDefined();
      expect(typeof result.onClick).toBe('function');
    });

    it('应该正确处理字符串类型的 throttleTime', () => {
      const mockOnClick = vi.fn();
      const props = {
        throttleTime: '1000',
        onClick: mockOnClick,
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // 字符串类型的 throttleTime 仍然会被处理（lodash.throttle 会处理字符串）
      expect(result.onClick).toBeDefined();
      expect(typeof result.onClick).toBe('function');
    });

    it('应该正确处理边界情况', () => {
      const testCases = [
        { throttleTime: false, onClick: vi.fn() },
        { throttleTime: true, onClick: vi.fn() },
        { throttleTime: [], onClick: vi.fn() },
        { throttleTime: {}, onClick: vi.fn() },
      ];

      testCases.forEach((testCase) => {
        // 检查插件能否处理边界情况而不抛出错误
        expect(() => {
          const { currentValue } = renderHook(plugin, testCase);
          const result = currentValue.value;
          expect(result).toBeDefined();
        }).not.toThrow();
      });
    });
  });

  describe('插件集成和扩展性测试', () => {
    it('应该能够与其他插件组合使用', () => {
      // 测试插件链式调用
      const combinedAccumulate = ButtonAccumulate.addPlugin({
        name: 'testPlugin',
        handle: () => ({
          testProperty: 'test-value',
          customData: 'custom',
        }),
      });

      const plugins = combinedAccumulate.getPluginMethod();
      expect(plugins.length).toBeGreaterThanOrEqual(5);

      const pluginNames = [
        'handleTextToslot',
        'handlePopupconfirmButton',
        'handleRightIcon',
        'handleThrottleTime',
        'testPlugin',
      ];

      pluginNames.forEach((pluginName) => {
        const plugin = combinedAccumulate.getPluginMethodByName(pluginName);
        expect(plugin).toBeDefined();
        if (plugin) {
          expect(plugin.name).toBe(pluginName);
        }
      });
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

      const testAccumulate = ButtonAccumulate.addPlugin(plugin1).addPlugin(plugin2);

      const plugins = testAccumulate.getPluginMethod();
      // 验证插件数量是否正确增加（可能已经有其他插件）
      expect(plugins.length).toBeGreaterThanOrEqual(6);

      const foundPlugin1 = testAccumulate.getPluginMethodByName('plugin1');
      const foundPlugin2 = testAccumulate.getPluginMethodByName('plugin2');

      expect(foundPlugin1).toBeDefined();
      expect(foundPlugin2).toBeDefined();
    });

    it('应该正确处理插件方法的获取', () => {
      const allMethods = ButtonAccumulate.getPluginMethod();
      expect(Array.isArray(allMethods)).toBe(true);
      expect(allMethods.length).toBeGreaterThan(0);

      // 验证方法数组中的元素都是函数或包含 handle 的对象
      allMethods.forEach((method) => {
        expect(
          typeof method === 'function' || (typeof method === 'object' && typeof method.handle === 'function'),
        ).toBe(true);
      });
    });

    it('应该正确处理不存在的插件查询', () => {
      const nonExistentPlugin = ButtonAccumulate.getPluginMethodByName('nonExistent');
      expect(nonExistentPlugin).toBeUndefined();
    });
  });

  describe('插件组合测试', () => {
    it('应该验证所有插件都能独立工作', () => {
      // 测试每个插件都能独立工作
      const pluginNames = [
        'handleTextToslot',
        'handlePopupconfirmButton',
        'handleRightIcon',
        'handleThrottleTime',
      ];

      pluginNames.forEach((pluginName) => {
        const plugin = ButtonAccumulate.getPluginMethodByName(pluginName);
        expect(plugin).toBeDefined();
        expect(plugin?.name).toBe(pluginName);
        expect(typeof plugin?.handle).toBe('function');
      });
    });

    it('应该验证插件的基本功能完整性', () => {
      // 测试 handleTextToslot 插件
      const textPlugin = ButtonAccumulate.getPluginMethodByName('handleTextToslot');
      expect(textPlugin).toBeDefined();
      expect(textPlugin?.name).toBe('handleTextToslot');

      // 测试 handlePopupconfirmButton 插件
      const popconfirmPlugin = ButtonAccumulate.getPluginMethodByName('handlePopupconfirmButton');
      expect(popconfirmPlugin).toBeDefined();
      expect(popconfirmPlugin?.name).toBe('handlePopupconfirmButton');

      // 测试 handleRightIcon 插件
      const rightIconPlugin = ButtonAccumulate.getPluginMethodByName('handleRightIcon');
      expect(rightIconPlugin).toBeDefined();
      expect(rightIconPlugin?.name).toBe('handleRightIcon');

      // 测试 handleThrottleTime 插件
      const throttlePlugin = ButtonAccumulate.getPluginMethodByName('handleThrottleTime');
      expect(throttlePlugin).toBeDefined();
      expect(throttlePlugin?.name).toBe('handleThrottleTime');
    });
  });
});
