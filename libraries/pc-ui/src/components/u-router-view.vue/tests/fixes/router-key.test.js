import { describe, it, expect, beforeEach } from 'vitest';
import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import URouterView from '../../index.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);

let createdCount;

/** 生成一个可统计「实例创建次数」的路由页面组件 */
function createPage(name) {
  return {
    name: `page-${name}`,
    created() {
      createdCount[name] += 1;
    },
    render(h) {
      // 不把 key 渲染到 DOM 上，便于断言 key 不污染渲染结果
      return h('div', { class: `page-${name}` }, name);
    },
  };
}

function createRouter(path = '/a') {
  const router = new VueRouter({
    routes: [
      { path: '/a', component: createPage('a') },
      { path: '/b', component: createPage('b') },
    ],
  });
  router.push(path).catch(() => {});
  return router;
}

/**
 * 挂载被测组件。
 * 用一层带 router 选项的父组件承载，让 vue-router 正常注入 $route；
 * 属性通过父组件的 routerProps 传入，便于在用例里 setProps 触发更新。
 */
function mountRouterView(props = {}, path = '/a') {
  const router = createRouter(path);
  const wrapper = mount(
    {
      router,
      props: {
        routerProps: { type: Object, default: () => ({}) },
      },
      render(h) {
        return h(URouterView, { props: this.routerProps });
      },
    },
    { localVue, propsData: { routerProps: props } },
  );
  return {
    wrapper,
    router,
    updateProps: (next) => wrapper.setProps({ routerProps: next }),
  };
}

/**
 * 对照组：改动前的渲染方式（裸 <router-view>，没有任何 key）。
 * 用来证明不传 routerKey 时渲染结果与改动前一致。
 */
function mountLegacyRouterView(path = '/a') {
  const router = createRouter(path);
  const wrapper = mount(
    {
      router,
      render(h) {
        return h('router-view');
      },
    },
    { localVue },
  );
  return { wrapper, router };
}

const pageA = '<div class="page-a">a</div>';
const pageB = '<div class="page-b">b</div>';

beforeEach(() => {
  createdCount = { a: 0, b: 0 };
});

describe('u-router-view routerKey', () => {
  describe('不传 routerKey', () => {
    it('渲染结果与改动前的裸 router-view 完全一致', async () => {
      const current = mountRouterView();
      const legacy = mountLegacyRouterView();
      await localVue.nextTick();

      expect(current.wrapper.html()).toBe(pageA);
      // 与「改动前行为」逐字节对比
      expect(current.wrapper.html()).toBe(legacy.wrapper.html());
    });

    it('打开缓存分支（disableKeepAlive=false）时渲染结果也与改动前一致', async () => {
      const current = mountRouterView({ disableKeepAlive: false });
      const legacy = mountLegacyRouterView();
      await localVue.nextTick();

      expect(current.wrapper.html()).toBe(pageA);
      expect(current.wrapper.html()).toBe(legacy.wrapper.html());
    });

    it('无关属性变化不会重建子页面实例（等价于无 key）', async () => {
      const { wrapper, updateProps } = mountRouterView({ keepAliveMax: 5 });
      await localVue.nextTick();
      expect(createdCount.a).toBe(1);

      await updateProps({ keepAliveMax: 10 });

      expect(createdCount.a).toBe(1);
      expect(wrapper.html()).toBe(pageA);
    });

    it('同一路由内查询参数变化不会重建子页面实例（等价于无 key）', async () => {
      const { router, wrapper } = mountRouterView();
      await localVue.nextTick();
      expect(createdCount.a).toBe(1);

      await router.push('/a?x=1').catch(() => {});
      await localVue.nextTick();

      expect(createdCount.a).toBe(1);
      expect(wrapper.html()).toBe(pageA);
    });
  });

  describe('传了 routerKey', () => {
    it('key 不污染 DOM，首次渲染结果与不传时一致', async () => {
      const withKey = mountRouterView({ routerKey: 'v1' });
      await localVue.nextTick();

      expect(withKey.wrapper.html()).toBe(pageA);
    });

    it('routerKey 不变时复用实例，值变化时按 Vue key 语义重建组件', async () => {
      const { wrapper, updateProps } = mountRouterView({ routerKey: 'v1' });
      await localVue.nextTick();
      expect(createdCount.a).toBe(1);

      // 赋同样的值：不重建
      await updateProps({ routerKey: 'v1' });
      expect(createdCount.a).toBe(1);

      // 值变化：重建（旧实例销毁、新实例创建）
      await updateProps({ routerKey: 'v2' });
      expect(createdCount.a).toBe(2);
      expect(wrapper.html()).toBe(pageA);
    });

    it('打开缓存分支（disableKeepAlive=false）时同样生效', async () => {
      const { wrapper, updateProps } = mountRouterView({
        disableKeepAlive: false,
        routerKey: 'v1',
      });
      await localVue.nextTick();
      expect(wrapper.html()).toBe(pageA);
      expect(createdCount.a).toBe(1);

      await updateProps({ disableKeepAlive: false, routerKey: 'v2' });

      expect(createdCount.a).toBe(2);
      expect(wrapper.html()).toBe(pageA);
    });

    it('切路由后 key 仍然作用于当前子页面', async () => {
      const { wrapper, router, updateProps } = mountRouterView({ routerKey: 'v1' });
      await localVue.nextTick();
      expect(wrapper.html()).toBe(pageA);

      await router.push('/b').catch(() => {});
      await localVue.nextTick();
      expect(wrapper.html()).toBe(pageB);
      expect(createdCount.b).toBe(1);

      await updateProps({ routerKey: 'v2' });

      expect(wrapper.html()).toBe(pageB);
      expect(createdCount.b).toBe(2);
      expect(createdCount.a).toBe(1);
    });
  });
});
