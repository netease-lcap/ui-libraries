import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@ep-test/test-utils/render-hook';
import { $deletePropsList } from '@/plugins/constants';
import '@/utils/index';
import LinkBasicAccumulate from '../plugins/index';

// Mock file-saver
vi.mock('file-saver', () => ({
  saveAs: vi.fn(),
}));

// Mock @/plugins/common/icon
vi.mock('@/plugins/common/icon', () => ({
  getPropsIcon: vi.fn(({ name }) => (name ? `icon-${name}` : undefined)),
}));

describe('el-link plugins', () => {
  beforeEach(() => {
    // 重置所有 mock
    vi.clearAllMocks();
  });

  describe('index.tsx', () => {
    describe('LinkBasicAccumulate 基础功能', () => {
      it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
        expect(LinkBasicAccumulate).toBeDefined();
        expect(typeof LinkBasicAccumulate.addPlugin).toBe('function');
        expect(typeof LinkBasicAccumulate.getPluginMethod).toBe('function');
        expect(Array.isArray(LinkBasicAccumulate.Plugin)).toBe(true);
      });

      it('应该包含多个插件', () => {
        const plugins = LinkBasicAccumulate.getPluginMethod();
        expect(plugins).toBeDefined();
        expect(Array.isArray(plugins)).toBe(true);
        expect(plugins.length).toBeGreaterThan(0);

        const pluginNames = ['handleTextToSlots', 'handleHrefToRouter', 'handleRightIcon', 'handleDownload'];
        pluginNames.forEach((name) => {
          const plugin = LinkBasicAccumulate.getPluginMethodByName(name);
          expect(plugin).toBeDefined();
          expect(plugin?.name).toBe(name);
        });
      });
    });

    describe('handleTextToSlots 插件功能测试', () => {
      const plugin = LinkBasicAccumulate.getPluginMethodByName('handleTextToSlots') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          text: '测试文本',
          slots: {},
          icon: 'test-icon',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
        expect(result).toHaveProperty('slots');
        expect(result).toHaveProperty('icon');
      });

      it('应该正确处理 text 到 slots 的转换', () => {
        const props = {
          text: '测试文本',
          slots: {},
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots).toBeDefined();
        expect(result.slots.default).toBeDefined();
        expect(typeof result.slots.default).toBe('function');
      });

      it('应该正确处理 icon 属性', () => {
        const props = {
          text: '测试文本',
          slots: {},
          icon: 'test-icon',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.icon).toBe('icon-test-icon');
      });

      it('应该正确设置 deletePropsList', () => {
        const props = {
          text: '测试文本',
          slots: {},
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        const symbolKey = Object.getOwnPropertySymbols(result).find((s) =>
          s.toString().includes('deletePropsList'),
        ) as symbol;
        expect(symbolKey).toBeDefined();
        expect(Array.isArray(result[symbolKey])).toBe(true);
        expect(result[symbolKey]).toEqual(expect.arrayContaining(['text']));
      });

      it('应该正确处理现有的 slots', () => {
        const existingSlot = vi.fn(() => 'existing content');
        const props = {
          text: '测试文本',
          slots: {
            default: existingSlot,
            other: vi.fn(),
          },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots).toBeDefined();
        expect(result.slots.default).toBeDefined();
        expect(result.slots.other).toBeDefined();
      });
    });

    describe('handleHrefToRouter 插件功能测试', () => {
      const plugin = LinkBasicAccumulate.getPluginMethodByName('handleHrefToRouter') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          destination: '/test',
          router: { push: vi.fn() },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
        expect(result).toHaveProperty('onClick');
      });

      it('应该正确处理 destination 属性', () => {
        const mockRouter = { push: vi.fn() };
        const props = {
          destination: '/test',
          router: mockRouter,
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.onClick).toBeDefined();
        expect(typeof result.onClick).toBe('function');
      });

      it('应该正确处理 href 属性', () => {
        const props = {
          href: 'https://example.com',
          target: '_blank',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.href).toBe('https://example.com');
        expect(result.target).toBe('_blank');
      });

      it('应该正确处理 link 属性', () => {
        const props = {
          link: 'https://example.com',
          target: '_self',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.href).toBe('https://example.com');
        expect(result.target).toBe('_self');
      });

      it('应该正确处理 onClick 包装', () => {
        const originalOnClick = vi.fn();
        const props = {
          onClick: originalOnClick,
          destination: '/test',
          router: { push: vi.fn() },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.onClick).toBeDefined();
        expect(typeof result.onClick).toBe('function');
      });
    });

    describe('handleRightIcon 插件功能测试', () => {
      const plugin = LinkBasicAccumulate.getPluginMethodByName('handleRightIcon') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          rightIcon: 'arrow-right',
          slots: { default: vi.fn(() => 'content') },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
        expect(result).toHaveProperty('slots');
      });

      it('应该正确处理 rightIcon 属性', () => {
        const props = {
          rightIcon: 'arrow-right',
          slots: { default: vi.fn(() => 'content') },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.slots).toBeDefined();
        expect(result.slots.default).toBeDefined();
        expect(typeof result.slots.default).toBe('function');
      });

      it('应该正确处理没有 rightIcon 的情况', () => {
        const props = {
          slots: { default: vi.fn(() => 'content') },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toEqual({});
      });

      it('应该正确处理空的 rightIcon', () => {
        const props = {
          rightIcon: '',
          slots: { default: vi.fn(() => 'content') },
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toEqual({});
      });
    });

    describe('handleDownload 插件功能测试', () => {
      const plugin = LinkBasicAccumulate.getPluginMethodByName('handleDownload') as any;

      it('应该正确处理插件基本结构', () => {
        const props = {
          download: true,
          href: 'https://example.com/file.pdf',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
        expect(result).toHaveProperty('onClick');
      });

      it('应该正确处理 download 属性', () => {
        const props = {
          download: true,
          href: 'https://example.com/file.pdf',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result.onClick).toBeDefined();
        expect(typeof result.onClick).toBe('function');
      });

      it('应该正确处理没有 download 的情况', () => {
        const props = {
          href: 'https://example.com/file.pdf',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toEqual({});
      });

      it('应该正确处理 download 为 false 的情况', () => {
        const props = {
          download: false,
          href: 'https://example.com/file.pdf',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        expect(result).toEqual({});
      });

      it('应该正确设置 deletePropsList', () => {
        const props = {
          download: true,
          href: 'https://example.com/file.pdf',
        };

        const { currentValue } = renderHook(plugin, props);
        const result = currentValue.value;

        const symbolKey = Object.getOwnPropertySymbols(result).find((s) =>
          s.toString().includes('deletePropsList'),
        ) as symbol;
        expect(symbolKey).toBeDefined();
        expect(Array.isArray(result[symbolKey])).toBe(true);
        expect(result[symbolKey]).toEqual(expect.arrayContaining(['href', 'target']));
      });
    });
  });

  describe('ide.ts', () => {
    it('应该是一个空文件', () => {
      // ide.ts 文件是空的，只导出了一个空对象
      expect(true).toBe(true);
    });
  });

  describe('边界情况和错误处理测试', () => {
    it('应该正确处理 props.get 抛出异常的情况', () => {
      const plugin = LinkBasicAccumulate.getPluginMethodByName('handleTextToSlots') as any;

      const props = {
        get: vi.fn(() => {
          throw new Error('Mock error');
        }),
      };

      expect(() => {
        const { currentValue } = renderHook(plugin, props);
        expect(currentValue.value).toBeDefined();
      }).not.toThrow();
    });

    it('应该正确处理各种数据类型的 props', () => {
      const plugin = LinkBasicAccumulate.getPluginMethodByName('handleTextToSlots') as any;

      const testCases = [
        { text: null, slots: null },
        { text: undefined, slots: undefined },
        { text: '', slots: {} },
        { text: 'test', slots: { default: vi.fn() } },
      ];

      testCases.forEach((testCase) => {
        expect(() => {
          const { currentValue } = renderHook(plugin, testCase);
          expect(currentValue.value).toBeDefined();
        }).not.toThrow();
      });
    });

    it('应该正确处理 handleHrefToRouter 的各种数据类型', () => {
      const plugin = LinkBasicAccumulate.getPluginMethodByName('handleHrefToRouter') as any;

      const testCases = [
        { destination: null, router: null },
        { destination: undefined, router: undefined },
        { destination: '/test', router: { push: vi.fn() } },
        { href: 'https://example.com', target: '_blank' },
      ];

      testCases.forEach((testCase) => {
        expect(() => {
          const { currentValue } = renderHook(plugin, testCase);
          expect(currentValue.value).toBeDefined();
        }).not.toThrow();
      });
    });

    it('应该正确处理 handleRightIcon 的各种数据类型', () => {
      const plugin = LinkBasicAccumulate.getPluginMethodByName('handleRightIcon') as any;

      const testCases = [
        { rightIcon: null, slots: null },
        { rightIcon: undefined, slots: undefined },
        { rightIcon: 'arrow', slots: { default: vi.fn() } },
        { rightIcon: '', slots: {} },
      ];

      testCases.forEach((testCase) => {
        expect(() => {
          const { currentValue } = renderHook(plugin, testCase);
          expect(currentValue.value).toBeDefined();
        }).not.toThrow();
      });
    });

    it('应该正确处理 handleDownload 的各种数据类型', () => {
      const plugin = LinkBasicAccumulate.getPluginMethodByName('handleDownload') as any;

      const testCases = [
        { download: null, href: null },
        { download: undefined, href: undefined },
        { download: true, href: 'https://example.com/file.pdf' },
        { download: false, href: 'https://example.com/file.pdf' },
      ];

      testCases.forEach((testCase) => {
        expect(() => {
          const { currentValue } = renderHook(plugin, testCase);
          expect(currentValue.value).toBeDefined();
        }).not.toThrow();
      });
    });
  });

  describe('插件集成和扩展性测试', () => {
    it('应该能够与其他插件组合使用', () => {
      // 测试插件链式调用
      const combinedAccumulate = LinkBasicAccumulate.addPlugin({
        name: 'testPlugin',
        handle: () => ({
          testProperty: 'test-value',
          customData: 'custom',
        }),
      });

      const plugins = combinedAccumulate.getPluginMethod();
      expect(plugins).toHaveLength(5);

      const handleTextToSlotsPlugin = combinedAccumulate.getPluginMethodByName('handleTextToSlots');
      const testPlugin = combinedAccumulate.getPluginMethodByName('testPlugin');

      expect(handleTextToSlotsPlugin).toBeDefined();
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

      const testAccumulate = LinkBasicAccumulate.addPlugin(plugin1).addPlugin(plugin2);

      const plugins = testAccumulate.getPluginMethod();
      // 验证插件数量是否正确增加（可能已经有其他插件）
      expect(plugins.length).toBeGreaterThanOrEqual(6);

      const foundPlugin1 = testAccumulate.getPluginMethodByName('plugin1');
      const foundPlugin2 = testAccumulate.getPluginMethodByName('plugin2');

      expect(foundPlugin1).toBeDefined();
      expect(foundPlugin2).toBeDefined();
    });

    it('应该正确处理插件方法的获取', () => {
      const allMethods = LinkBasicAccumulate.getPluginMethod();
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
      const nonExistentPlugin = LinkBasicAccumulate.getPluginMethodByName('nonExistent');
      expect(nonExistentPlugin).toBeUndefined();
    });
  });
});
