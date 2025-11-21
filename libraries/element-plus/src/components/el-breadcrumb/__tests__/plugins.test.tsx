import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@ep-test/test-utils/render-hook';
import { $route, $router } from '@/plugins/constants';
import '@/utils/index';
import BreadcrumbAccumulate from '../plugins/basic-plugins';
import BreadcrumbItemAccumulate from '../plugins/item-plugins';

// Mock ElBreadcrumbItem component
vi.mock('@/components/el-breadcrumb/index', () => ({
  ElBreadcrumbItem: vi.fn((props) => ({
    type: 'ElBreadcrumbItem',
    props,
    children: props.children || [],
  })),
}));

// Mock getPropsIcon
vi.mock('@/plugins/common/icon', () => ({
  getPropsIcon: vi.fn(({ name }) => ({ name, type: 'icon' })),
}));

describe('basic-plugins.tsx', () => {
  beforeEach(() => {
    // 重置所有 mock
    vi.clearAllMocks();
  });

  describe('BreadcrumbAccumulate 基础功能', () => {
    it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
      expect(BreadcrumbAccumulate).toBeDefined();
      expect(typeof BreadcrumbAccumulate.addPlugin).toBe('function');
      expect(typeof BreadcrumbAccumulate.getPluginMethod).toBe('function');
      expect(Array.isArray(BreadcrumbAccumulate.Plugin)).toBe(true);
    });

    it('应该包含 handleAutoCrumbs 和 handleSeparatorIcon 插件', () => {
      const plugins = BreadcrumbAccumulate.getPluginMethod();
      expect(plugins.length).toBeGreaterThanOrEqual(2);

      const handleAutoCrumbsPlugin = BreadcrumbAccumulate.getPluginMethodByName('handleAutoCrumbs');
      const handleSeparatorIconPlugin = BreadcrumbAccumulate.getPluginMethodByName('handleSeparatorIcon');

      expect(handleAutoCrumbsPlugin).toBeDefined();
      expect(handleSeparatorIconPlugin).toBeDefined();

      if (handleAutoCrumbsPlugin) {
        expect(handleAutoCrumbsPlugin.name).toBe('handleAutoCrumbs');
        expect(typeof (handleAutoCrumbsPlugin as any).handle).toBe('function');
      }

      if (handleSeparatorIconPlugin) {
        expect(handleSeparatorIconPlugin.name).toBe('handleSeparatorIcon');
        expect(typeof (handleSeparatorIconPlugin as any).handle).toBe('function');
      }
    });
  });

  describe('handleAutoCrumbs 插件功能测试', () => {
    const plugin = BreadcrumbAccumulate.getPluginMethodByName('handleAutoCrumbs') as any;

    it('应该正确处理插件基本结构', () => {
      const props = {
        auto: false,
        showInDesigner: false,
        slots: {},
        route: null,
        router: null,
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // 验证返回值基本结构
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
    });

    it('应该正确处理 auto=false 的情况', () => {
      const props = {
        auto: false,
        showInDesigner: false,
        slots: { existing: vi.fn() },
        route: null,
        router: null,
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // auto=false 时应该返回空对象
      expect(result).toEqual({});
    });

    it('应该正确处理 showInDesigner=true 的情况', () => {
      const props = {
        auto: true,
        showInDesigner: true,
        slots: { existing: vi.fn() },
        route: null,
        router: null,
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // showInDesigner=true 时应该返回空对象
      expect(result).toEqual({});
    });

    it('应该正确处理 auto=true 且 showInDesigner=false 的情况', () => {
      const mockRoute = {
        path: '/test',
        matched: [
          {
            path: '/',
            name: 'Home',
            meta: { crumb: '首页' },
          },
          {
            path: '/test',
            name: 'Test',
            meta: { crumb: '测试页' },
          },
        ],
      };

      const props = {
        auto: true,
        showInDesigner: false,
        slots: { existing: vi.fn() },
        route: mockRoute,
        router: null,
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // 应该包含 slots 属性
      expect(result).toHaveProperty('slots');
      expect(result.slots).toHaveProperty('existing'); // 保留原有 slots
      expect(result.slots).toHaveProperty('default'); // 添加 default slot
      expect(typeof result.slots.default).toBe('function');
    });

    it('应该正确处理没有 route.path 的情况', () => {
      const props = {
        auto: true,
        showInDesigner: false,
        slots: {},
        route: { matched: [] },
        router: null,
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // 没有 path 时仍然会返回 slots，但 default slot 会是空数组
      expect(result).toHaveProperty('slots');
      expect(result.slots).toHaveProperty('default');
      expect(typeof result.slots.default).toBe('function');
    });

    it('应该正确处理空的 matched 数组', () => {
      const mockRoute = {
        path: '/test',
        matched: [],
      };

      const props = {
        auto: true,
        showInDesigner: false,
        slots: {},
        route: mockRoute,
        router: null,
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // 空的 matched 数组时仍然会返回 slots，但 default slot 会是空数组
      expect(result).toHaveProperty('slots');
      expect(result.slots).toHaveProperty('default');
      expect(typeof result.slots.default).toBe('function');
    });

    it('应该正确处理有 meta.crumb 的路由', () => {
      const mockRoute = {
        path: '/test',
        matched: [
          {
            path: '/',
            name: 'Home',
            meta: { crumb: '首页' },
          },
        ],
      };

      const props = {
        auto: true,
        showInDesigner: false,
        slots: {},
        route: mockRoute,
        router: null,
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result).toHaveProperty('slots');
      expect(result.slots).toHaveProperty('default');
      expect(typeof result.slots.default).toBe('function');
    });

    it('应该正确处理有 meta.name 的路由', () => {
      const mockRoute = {
        path: '/test',
        matched: [
          {
            path: '/',
            name: 'Home',
            meta: { name: '首页' },
          },
        ],
      };

      const props = {
        auto: true,
        showInDesigner: false,
        slots: {},
        route: mockRoute,
        router: null,
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result).toHaveProperty('slots');
      expect(result.slots).toHaveProperty('default');
      expect(typeof result.slots.default).toBe('function');
    });

    it('应该正确处理没有 meta.crumb 和 meta.name 的路由', () => {
      const mockRoute = {
        path: '/test',
        matched: [
          {
            path: '/',
            name: 'Home',
            meta: {},
          },
        ],
      };

      const props = {
        auto: true,
        showInDesigner: false,
        slots: {},
        route: mockRoute,
        router: null,
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // 没有 crumb 或 name 时仍然会返回 slots，但 default slot 会是空数组
      expect(result).toHaveProperty('slots');
      expect(result.slots).toHaveProperty('default');
      expect(typeof result.slots.default).toBe('function');
    });

    it('应该正确处理复杂的路由结构', () => {
      const mockRoute = {
        path: '/user/profile',
        matched: [
          {
            path: '/',
            name: 'Home',
            meta: { crumb: '首页' },
          },
          {
            path: '/user',
            name: 'User',
            meta: { crumb: '用户中心' },
          },
          {
            path: '/user/profile',
            name: 'Profile',
            meta: { crumb: '个人资料' },
          },
        ],
      };

      const props = {
        auto: true,
        showInDesigner: false,
        slots: { custom: vi.fn() },
        route: mockRoute,
        router: null,
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result).toHaveProperty('slots');
      expect(result.slots).toHaveProperty('custom'); // 保留原有 slots
      expect(result.slots).toHaveProperty('default'); // 添加 default slot
      expect(typeof result.slots.default).toBe('function');
    });

    it('应该正确处理 router.afterEach 回调', () => {
      const mockRouter = {
        afterEach: vi.fn(),
      };

      const props = {
        auto: true,
        showInDesigner: false,
        slots: {},
        [$route]: null,
        [$router]: mockRouter,
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // 验证 router.afterEach 被调用
      expect(mockRouter.afterEach).toHaveBeenCalledOnce();
      expect(typeof mockRouter.afterEach.mock.calls[0][0]).toBe('function');
    });

    it('应该正确处理边界情况', () => {
      const testCases = [
        { auto: null, showInDesigner: null, route: null, router: null },
        { auto: undefined, showInDesigner: undefined, route: undefined, router: undefined },
        { auto: '', showInDesigner: '', route: '', router: '' },
        { auto: 0, showInDesigner: 0, route: 0, router: 0 },
      ];

      testCases.forEach((testCase) => {
        const props = {
          ...testCase,
          slots: {},
        };

        // 检查插件能否处理边界情况而不抛出错误
        expect(() => {
          const { currentValue } = renderHook(plugin, props);
          const result = currentValue.value;
          expect(result).toBeDefined();
        }).not.toThrow();
      });
    });
  });

  describe('handleSeparatorIcon 插件功能测试', () => {
    const plugin = BreadcrumbAccumulate.getPluginMethodByName('handleSeparatorIcon') as any;

    it('应该正确处理插件基本结构', () => {
      const props = {
        separatorIcon: 'arrow-right',
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // 验证返回值基本结构
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
      expect(result).toHaveProperty('separatorIcon');
    });

    it('应该正确处理有效的 separatorIcon', () => {
      const props = {
        separatorIcon: 'arrow-right',
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result.separatorIcon).toBeDefined();
      expect(result.separatorIcon).toHaveProperty('name', 'arrow-right');
      expect(result.separatorIcon).toHaveProperty('type', 'icon');
    });

    it('应该正确处理 null separatorIcon', () => {
      const props = {
        separatorIcon: null,
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result.separatorIcon).toBeDefined();
      expect(result.separatorIcon).toHaveProperty('name', null);
      expect(result.separatorIcon).toHaveProperty('type', 'icon');
    });

    it('应该正确处理 undefined separatorIcon', () => {
      const props = {
        separatorIcon: undefined,
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result.separatorIcon).toBeDefined();
      expect(result.separatorIcon).toHaveProperty('name', undefined);
      expect(result.separatorIcon).toHaveProperty('type', 'icon');
    });

    it('应该正确处理空字符串 separatorIcon', () => {
      const props = {
        separatorIcon: '',
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result.separatorIcon).toBeDefined();
      expect(result.separatorIcon).toHaveProperty('name', '');
      expect(result.separatorIcon).toHaveProperty('type', 'icon');
    });

    it('应该正确处理数字类型的 separatorIcon', () => {
      const props = {
        separatorIcon: 123,
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result.separatorIcon).toBeDefined();
      expect(result.separatorIcon).toHaveProperty('name', 123);
      expect(result.separatorIcon).toHaveProperty('type', 'icon');
    });

    it('应该正确处理对象类型的 separatorIcon', () => {
      const props = {
        separatorIcon: { name: 'custom-icon' },
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result.separatorIcon).toBeDefined();
      expect(result.separatorIcon).toHaveProperty('name', { name: 'custom-icon' });
      expect(result.separatorIcon).toHaveProperty('type', 'icon');
    });

    it('应该验证 getPropsIcon 被正确调用', () => {
      const props = {
        separatorIcon: 'test-icon',
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // 验证 getPropsIcon 被调用（通过 mock 验证）
      expect(result.separatorIcon).toBeDefined();
      expect(result.separatorIcon).toHaveProperty('name', 'test-icon');
      expect(result.separatorIcon).toHaveProperty('type', 'icon');
    });
  });

  describe('插件集成和扩展性测试', () => {
    it('应该能够与其他插件组合使用', () => {
      // 测试插件链式调用
      const combinedAccumulate = BreadcrumbAccumulate.addPlugin({
        name: 'testPlugin',
        handle: () => ({
          testProperty: 'test-value',
          customData: 'custom',
        }),
      });

      const plugins = combinedAccumulate.getPluginMethod();
      expect(plugins.length).toBeGreaterThanOrEqual(3);

      const handleAutoCrumbsPlugin = combinedAccumulate.getPluginMethodByName('handleAutoCrumbs');
      const handleSeparatorIconPlugin = combinedAccumulate.getPluginMethodByName('handleSeparatorIcon');
      const testPlugin = combinedAccumulate.getPluginMethodByName('testPlugin');

      expect(handleAutoCrumbsPlugin).toBeDefined();
      expect(handleSeparatorIconPlugin).toBeDefined();
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

      const testAccumulate = BreadcrumbAccumulate.addPlugin(plugin1).addPlugin(plugin2);

      const plugins = testAccumulate.getPluginMethod();
      // 验证插件数量是否正确增加（可能已经有其他插件）
      expect(plugins.length).toBeGreaterThanOrEqual(4);

      const foundPlugin1 = testAccumulate.getPluginMethodByName('plugin1');
      const foundPlugin2 = testAccumulate.getPluginMethodByName('plugin2');

      expect(foundPlugin1).toBeDefined();
      expect(foundPlugin2).toBeDefined();
    });

    it('应该正确处理插件方法的获取', () => {
      const allMethods = BreadcrumbAccumulate.getPluginMethod();
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
      const nonExistentPlugin = BreadcrumbAccumulate.getPluginMethodByName('nonExistent');
      expect(nonExistentPlugin).toBeUndefined();
    });
  });
});

describe('item-plugins.ts', () => {
  beforeEach(() => {
    // 重置所有 mock
    vi.clearAllMocks();
  });

  describe('BreadcrumbItemAccumulate 基础功能', () => {
    it('应该是一个有效的 PluginAccumulateTypes 实例', () => {
      expect(BreadcrumbItemAccumulate).toBeDefined();
      expect(typeof BreadcrumbItemAccumulate.addPlugin).toBe('function');
      expect(typeof BreadcrumbItemAccumulate.getPluginMethod).toBe('function');
      expect(Array.isArray(BreadcrumbItemAccumulate.Plugin)).toBe(true);
    });

    it('应该包含 handle 插件', () => {
      const plugins = BreadcrumbItemAccumulate.getPluginMethod();
      expect(plugins).toHaveLength(1);

      const handlePlugin = BreadcrumbItemAccumulate.getPluginMethodByName('handle');
      expect(handlePlugin).toBeDefined();
      if (handlePlugin) {
        expect(handlePlugin.name).toBe('handle');
        expect(typeof (handlePlugin as any).handle).toBe('function');
      }
    });
  });

  describe('handle 插件功能测试', () => {
    const plugin = BreadcrumbItemAccumulate.getPluginMethodByName('handle') as any;

    it('应该正确处理插件基本结构', () => {
      const props = {
        destination: null,
        link: null,
        href: null,
        to: null,
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // 验证返回值基本结构
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
      expect(result).toHaveProperty('to');
    });

    it('应该正确处理 to 属性', () => {
      const props = {
        destination: null,
        link: null,
        href: null,
        to: '/test',
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result.to).toBe('/test');
    });

    it('应该正确处理 href 属性', () => {
      const props = {
        destination: null,
        link: null,
        href: '/href-test',
        to: null,
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result.to).toBe('/href-test');
    });

    it('应该正确处理 link 属性', () => {
      const props = {
        destination: null,
        link: '/link-test',
        href: null,
        to: null,
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result.to).toBe('/link-test');
    });

    it('应该正确处理 destination 属性', () => {
      const props = {
        destination: '/destination-test',
        link: null,
        href: null,
        to: null,
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result.to).toBe('/destination-test');
    });

    it('应该正确处理属性优先级：to > href > link > destination', () => {
      const props = {
        destination: '/destination',
        link: '/link',
        href: '/href',
        to: '/to',
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // to 优先级最高
      expect(result.to).toBe('/to');
    });

    it('应该正确处理 href > link > destination 的优先级', () => {
      const props = {
        destination: '/destination',
        link: '/link',
        href: '/href',
        to: null,
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // href 优先级高于 link
      expect(result.to).toBe('/href');
    });

    it('应该正确处理 link > destination 的优先级', () => {
      const props = {
        destination: '/destination',
        link: '/link',
        href: null,
        to: null,
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // link 优先级高于 destination
      expect(result.to).toBe('/link');
    });

    it('应该正确处理所有属性都为 null 的情况', () => {
      const props = {
        destination: null,
        link: null,
        href: null,
        to: null,
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result.to).toBeNull();
    });

    it('应该正确处理所有属性都为 undefined 的情况', () => {
      const props = {
        destination: undefined,
        link: undefined,
        href: undefined,
        to: undefined,
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result.to).toBeUndefined();
    });

    it('应该正确处理所有属性都为空字符串的情况', () => {
      const props = {
        destination: '',
        link: '',
        href: '',
        to: '',
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      expect(result.to).toBe('');
    });

    it('应该正确处理复杂的数据类型', () => {
      const props = {
        destination: { path: '/destination' },
        link: { path: '/link' },
        href: { path: '/href' },
        to: { path: '/to' },
      };

      const { currentValue } = renderHook(plugin, props);
      const result = currentValue.value;

      // to 优先级最高
      expect(result.to).toEqual({ path: '/to' });
    });

    it('应该正确处理边界情况', () => {
      const testCases = [
        { destination: 0, link: 0, href: 0, to: 0 },
        { destination: false, link: false, href: false, to: false },
        { destination: [], link: [], href: [], to: [] },
        { destination: {}, link: {}, href: {}, to: {} },
      ];

      testCases.forEach((testCase) => {
        // 检查插件能否处理边界情况而不抛出错误
        expect(() => {
          const { currentValue } = renderHook(plugin, testCase);
          const result = currentValue.value;
          expect(result).toBeDefined();
          expect(result).toHaveProperty('to');
        }).not.toThrow();
      });
    });
  });

  describe('BreadcrumbItemAccumulate 插件集成测试', () => {
    it('应该能够与其他插件组合使用', () => {
      // 测试插件链式调用
      const combinedAccumulate = BreadcrumbItemAccumulate.addPlugin({
        name: 'testPlugin',
        handle: () => ({
          testProperty: 'test-value',
          customData: 'custom',
        }),
      });

      const plugins = combinedAccumulate.getPluginMethod();
      expect(plugins).toHaveLength(2);

      const handlePlugin = combinedAccumulate.getPluginMethodByName('handle');
      const testPlugin = combinedAccumulate.getPluginMethodByName('testPlugin');

      expect(handlePlugin).toBeDefined();
      expect(testPlugin).toBeDefined();
      expect(testPlugin?.name).toBe('testPlugin');
    });

    it('应该正确处理插件方法的获取', () => {
      const allMethods = BreadcrumbItemAccumulate.getPluginMethod();
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
      const nonExistentPlugin = BreadcrumbItemAccumulate.getPluginMethodByName('nonExistent');
      expect(nonExistentPlugin).toBeUndefined();
    });
  });
});
