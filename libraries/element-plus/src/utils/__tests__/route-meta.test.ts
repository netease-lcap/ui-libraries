import { describe, expect, it } from 'vitest';
import { getRouteTabTitle, getRouteTitleItems } from '@/utils/route-meta';

describe('route-meta utils', () => {
  it('应按面包屑相同规则解析标题链路', () => {
    const route = {
      path: '/user/profile',
      matched: [
        {
          path: '/',
          name: 'Root',
          meta: {},
          components: { default: {} },
        },
        {
          path: '/user',
          name: 'User',
          meta: { crumb: '用户中心' },
          components: { default: { name: 'UserLayout' } },
        },
        {
          path: '/user/profile',
          name: 'Profile',
          meta: { name: '个人资料页' },
          components: { default: { name: 'ProfilePage', meta: {} } },
        },
      ],
    };

    const items = getRouteTitleItems(route);
    expect(items).toEqual([
      { title: '用户中心', to: '/user' },
      { title: 'Profile', to: '/user/profile' },
    ]);
    expect(getRouteTabTitle(route)).toBe('Profile');
  });

  it('无路由 path 时应返回空', () => {
    expect(getRouteTitleItems(undefined)).toEqual([]);
    expect(getRouteTabTitle(undefined)).toBe('');
  });
});
