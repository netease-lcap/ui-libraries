import { mount } from '@vue/test-utils';
import { describe, expect, test,vi } from 'vitest';
import { ElTag as Tag } from '../index';

const AXIOM = 'Rem is the best girl';

describe('Tag.vue', () => {
  test('render text & class', () => {
    const wrapper = mount(() => (
      <Tag
        v-slots={{
          default: () => AXIOM,
        }}
      />
    ));
    expect(wrapper.text()).toEqual(AXIOM);

    const vm = wrapper.vm.$el.querySelector('.el-tag');

    expect(vm.classList.contains('el-tag')).toEqual(true);
    expect(vm.classList.contains('el-tag__close')).toEqual(false);
    expect(vm.classList.contains('is-hit')).toEqual(false);
    expect(vm.classList.contains('md-fade-center')).toEqual(false);
  });

  test('type', () => {
    const wrapper = mount(() => <Tag type="success" />);

    const vm = wrapper.vm.$el.querySelector('.el-tag');
    expect(vm.classList.contains('el-tag--success')).toEqual(true);
    expect(vm.classList.contains('el-tag--primary')).toEqual(false);
    expect(vm.classList.contains('el-tag--danger')).toEqual(false);
    expect(vm.classList.contains('el-tag--info')).toEqual(false);
    expect(vm.classList.contains('el-tag--warning')).toEqual(false);
  });

  test('hit', () => {
    const wrapper = mount(() => <Tag hit />);

    const vm = wrapper.vm.$el.querySelector('.el-tag');
    expect(vm.classList.contains('is-hit')).toEqual(true);
  });

  test('closable', async () => {
    const close=vi.fn();
    const wrapper = mount(() => <Tag closable onClose={close} />);
    const comp = wrapper.getComponent(Tag);
    const closeBtn = comp.find('.el-tag .el-tag__close');
    expect(closeBtn.exists()).toBe(true);

    await closeBtn.trigger('click');
    expect(close).toHaveBeenCalled();
  });

  test('disableTransitions', () => {
    const wrapper = mount(() => <Tag disableTransitions />);
    const { vm } = wrapper;
    // FIXME: This check actually is useless as there is no the class `md-fade-center` in the code.
    expect(vm.$el.classList.contains('md-fade-center')).toEqual(false);
  });

  test('color', () => {
    const wrapper = mount(() => <Tag color="rgb(0, 0, 0)" />);
    const vm = wrapper.vm.$el.querySelector('.el-tag');
    expect(vm.style.backgroundColor).toEqual('rgb(0, 0, 0)');
  });

  test('theme', () => {
    const wrapper = mount(() => <Tag effect="dark" />);
    const el = wrapper.vm.$el.querySelector('.el-tag');
    expect(el.className.includes('el-tag--dark')).toEqual(true);
    expect(el.className.includes('el-tag--light')).toEqual(false);
    expect(el.className.includes('el-tag--plain')).toEqual(false);
  });

  // should also support large size
  test('size', () => {
    const wrapper = mount(() => <Tag size="large" />);

    const el = wrapper.vm.$el.querySelector('.el-tag');
    expect(el.className.includes('el-tag--large')).toEqual(true);
    expect(el.className.includes('el-tag--default')).toEqual(false);
    expect(el.className.includes('el-tag--small')).toEqual(false);
  });
});
