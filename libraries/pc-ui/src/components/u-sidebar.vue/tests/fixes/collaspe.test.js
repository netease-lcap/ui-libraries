import {
  test,
  expect,
} from 'vitest';
import { mount } from '@vue/test-utils';

test('测试side bar收缩', async () => {
  const wrapper = mount({
    template: `<div style="width: 500px"><u-sidebar class="sidebar-test" enable-collapse value="3" :router="false">
    <u-sidebar-item icon="calendar" value="1" text="导航一"></u-sidebar-item>
    <u-sidebar-item value="2" text="导航二"></u-sidebar-item>
    <u-sidebar-item value="3" text="导航三"></u-sidebar-item>
</u-sidebar></div>`,
  });

  await wrapper.vm.$nextTick();

  const sidebar = wrapper.find('.sidebar-test');
  wrapper.find('[vusion-click-enabled]').trigger('click');
  await wrapper.vm.$nextTick();
  expect(sidebar.vm.$el.style.width).toBe('56px');

  wrapper.find('[vusion-click-enabled]').trigger('click');
  await wrapper.vm.$nextTick();
  expect(sidebar.vm.$el.style.width).toBe('');
});

test('测试side bar toggle all', async () => {
  const wrapper = mount({
    template: `<div style="width: 500px"><u-sidebar collapsible ref="sidebar">
    <u-sidebar-group title="导航一">
        <u-sidebar-item text="选项一"></u-sidebar-item>
            <u-sidebar-group title="导航二">
                <u-sidebar-item id="option1" text="选项一"></u-sidebar-item>
            </u-sidebar-group>
    </u-sidebar-group>
    <u-sidebar-group title="导航二">
        <u-sidebar-item text="选项一"></u-sidebar-item>
    </u-sidebar-group>
</u-sidebar>div>`,
  });

  await wrapper.vm.$nextTick();
  await wrapper.vm.$refs.sidebar.toggleAll(true);
  await wrapper.vm.$nextTick();

  const sidebar = wrapper.find('#option1');
  expect(sidebar.isVisible()).toBe(true);
});
