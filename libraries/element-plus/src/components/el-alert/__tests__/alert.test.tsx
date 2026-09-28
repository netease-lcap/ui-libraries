import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import { TypeComponentsMap } from '../../../../ep-test/ep-utils/index';
import Alert from '@/components/el-alert/index';

const AXIOM = 'Rem is the best girl';

describe('Alert.vue', () => {
  test('render test & class', () => {
    const wrapper = mount(() => <Alert title={AXIOM} showIcon />);
    expect(wrapper.find('.el-alert__title').text()).toEqual(AXIOM);
    expect(wrapper.find('.el-alert').classes()).toContain('el-alert--info');
  });

  test('type', () => {
    const wrapper = mount(() => <Alert title="test" showIcon type="success" />);
    expect(wrapper.find('.el-alert').classes()).toContain('el-alert--success');
    expect(wrapper.find('.el-alert__icon').classes()).toContain('el-icon');
    expect(wrapper.findComponent(TypeComponentsMap.success).exists()).toBe(true);
  });

  test('description', () => {
    const wrapper = mount(() => <Alert title="Dorne" showIcon description={AXIOM} />);
    expect(wrapper.find('.el-alert__description').text()).toEqual(AXIOM);
  });

  test('theme', () => {
    const wrapper = mount(() => <Alert title="test" effect="dark" />);
    expect(wrapper.find('.el-alert').classes()).toContain('is-dark');
  });

  test('title slot', () => {
    const wrapper = mount(Alert, {
      slots: {
        title: AXIOM,
      },
    });
    expect(wrapper.find('.el-alert__title').text()).toEqual(AXIOM);
  });

  test('close', async () => {
    const wrapper = mount(() => <Alert closeText="close" />);
    const closeBtn = wrapper.find('.el-alert__close-btn');
    expect(closeBtn.exists()).toBe(true);

    await closeBtn.trigger('click');
    expect(wrapper.emitted()).toBeDefined();
  });
});
