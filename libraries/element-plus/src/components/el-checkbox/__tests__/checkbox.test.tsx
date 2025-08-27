import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, test, afterEach } from 'vitest';
import type { CheckboxValueType } from 'element-plus';
import type { VNode } from 'vue';
import { ElFormItem } from '@/components/el-form';
import { ElCheckbox as Checkbox, ElCheckboxGroup as CheckboxGroup, ElCheckboxButton as CheckboxButton } from '../index';

const _mount = (render: () => VNode) =>
  mount(render, {
    attachTo: document.body,
  });

afterEach(() => {
  document.body.innerHTML = '';
});

describe('Checkbox', () => {
  test('create', async () => {
    const checked = ref(false);
    const wrapper = _mount(() => <Checkbox v-model={checked.value} label="a" />);

    expect(wrapper.classes()).toContain('el-checkbox');
    expect(wrapper.classes()).not.toContain('is-disabled');
    document.querySelectorAll('.el-checkbox')[0].click();
    await nextTick();
    expect(wrapper.classes()).toContain('is-checked');

    checked.value = false;
    await nextTick();
    expect(wrapper.classes('is-checked')).toBe(false);
  });

  test('label set to number 0', async () => {
    const wrapper = mount(() => <Checkbox label={0} />);
    expect(wrapper.find('.el-checkbox__label').text()).toBe('0');
  });

  describe('no v-model', () => {
    test('checkbox without label', async () => {
      const checked = ref(false);
      const wrapper = mount(() => <Checkbox checked={checked.value} />);

      expect(wrapper.classes('is-checked')).toBe(false);
    });

    test('checkbox with label attribute', async () => {
      const checked = ref(false);
      const wrapper = _mount(() => <Checkbox checked={checked.value} label="a" />);

      expect(wrapper.classes('is-checked')).toBe(false);
    });
  });

  describe('disabled', () => {
    test('checkbox without label', async () => {
      const checked = ref(false);
      const wrapper = mount(() => (
        <ElFormItem label="test">
          <Checkbox v-model={checked.value} disabled />
        </ElFormItem>
      ));

      const checkbox = wrapper.findComponent(Checkbox);
      expect(checkbox.classes()).toContain('is-disabled');
      expect(checked.value).toBe(false);
      await checkbox.trigger('click');
      await nextTick();
      expect(checkbox.classes()).toContain('is-disabled');
      expect(checked.value).toBe(false);
    });

    test('checkbox with label attribute', async () => {
      const checked = ref(false);
      const wrapper = mount(() => <Checkbox v-model={checked.value} disabled label="a" />);

      expect(wrapper.classes()).toContain('is-disabled');
      expect(checked.value).toBe(false);
      await wrapper.trigger('click');
      await nextTick();
      expect(wrapper.classes()).toContain('is-disabled');
      expect(checked.value).toBe(false);
    });
  });

  describe('change event', () => {
    test('checkbox without label', async () => {
      const checked = ref(false);
      const data = ref();
      const onChange = (val: CheckboxValueType) => (data.value = val);
      const wrapper = mount(() => (
        <ElFormItem label="test">
          <Checkbox v-model={checked.value} onChange={onChange} />
        </ElFormItem>
      ));

      await wrapper.findComponent(Checkbox).trigger('click');
      expect(data.value).toBe(true);
    });

    test('checkbox with label attribute', async () => {
      const checked = ref(false);
      const data = ref();
      const onChange = (val: CheckboxValueType) => (data.value = val);
      const wrapper = _mount(() => <Checkbox v-model={checked.value} onChange={onChange} label="Foobar" />);
      const checkbox = document.querySelectorAll('.el-checkbox')[0];
      checkbox?.click();
      await nextTick();
      expect(data.value).toBe(true);
    });

    test('checkbox with label as slot content', async () => {
      const checked = ref(false);
      const data = ref();
      const onChange = (val: CheckboxValueType) => (data.value = val);
      const wrapper = _mount(() => (
        <Checkbox v-model={checked.value} onChange={onChange}>
          Foobar
        </Checkbox>
      ));

      const checkbox = document.querySelectorAll('.el-checkbox')[0];
      checkbox?.click();
      await nextTick();
      expect(data.value).toBe(true);
    });

    test('checkbox is wrapped in label', async () => {
      const checked = ref(true);
      const data = ref();
      const onChange = (val: CheckboxValueType) => (data.value = val);
      const wrapper = _mount(() => (
        <ElFormItem label="test">
          <label>
            <Checkbox v-model={checked.value} onChange={onChange} />
          </label>
        </ElFormItem>
      ));
      const checkbox = document.querySelectorAll('.el-checkbox')[0];
      checkbox?.click();

      await nextTick();
      expect(data.value).toBe(false);
    });
  });

  test('checkbox group', async () => {
    const checkList = ref([]);

    const wrapper = _mount(() => (
      <CheckboxGroup v-model={checkList.value}>
        <Checkbox label="a" value="a" ref="a" />
        <Checkbox label="b" value="b" ref="b" />
        <Checkbox label="c" value="c" ref="c" />
        <Checkbox label="d" value="d" ref="d" />
      </CheckboxGroup>
    ));

    expect(checkList.value.length).toBe(0);

    document.querySelectorAll('.el-checkbox')[0].click();
    expect(checkList.value.length).toBe(1);
    expect(checkList.value).toContain('a');

    await nextTick();

    document.querySelectorAll('.el-checkbox')[1].click();
    expect(checkList.value.length).toBe(2);
    expect(checkList.value).toContain('a');
    expect(checkList.value).toContain('b');
  });

  test('checkbox group without modelValue', async () => {
    const checkList = ref([]);
    const wrapper = _mount({
      setup() {
        return () => (
          <CheckboxGroup v-model={checkList.value}>
            <Checkbox label="a" value="a" ref="a" />
            <Checkbox label="b" value="b" ref="b" />
            <Checkbox label="c" value="c" ref="c" />
            <Checkbox label="d" value="d" ref="d" />
          </CheckboxGroup>
        );
      },
    });

    // await wrapper.findComponent({ ref: 'a' }).trigger('click');

    document.querySelectorAll('.el-checkbox')[0].click();
    expect(checkList.value.length).toBe(1);
    expect(checkList.value).toContain('a');
  });

  test('checkbox group change', async () => {
    const checkList = ref([]);
    const data = ref<CheckboxValueType[]>([]);
    const onChange = (val: CheckboxValueType[]) => (data.value = val);
    const wrapper = _mount({
      setup() {
        return () => (
          <CheckboxGroup v-model={checkList.value} onChange={onChange}>
            <Checkbox label="a" value="a" ref="a" />
            <Checkbox label="b" value="b" ref="b" />
          </CheckboxGroup>
        );
      },
    });

    // await wrapper.findComponent({ ref: 'a' }).trigger('click');

    document.querySelectorAll('.el-checkbox')[0].click();
    await nextTick();
    expect(data.value.length).toBe(1);
    expect(data.value).toEqual(['a']);
  });

  test('nested group', async () => {
    const checkList = ref([]);
    const wrapper = _mount({
      setup() {
        return () => (
          <CheckboxGroup v-model={checkList.value}>
            <Checkbox label="a" value="a" ref="a" />
            <Checkbox label="b" value="b" ref="b" />
            <Checkbox label="c" value="c" ref="c" />
            <Checkbox label="d" value="d" ref="d" />
          </CheckboxGroup>
        );
      },
    });

    expect(checkList.value.length).toBe(0);
    // await wrapper.findComponent({ ref: 'a' }).trigger('click');
    document.querySelectorAll('.el-checkbox')[0].click();
    expect(checkList.value).toEqual(['a']);
  });

  describe('true false label', () => {
    test('without label', async () => {
      const checked = ref('a');
      const wrapper = _mount(() => (
        <ElFormItem label="test">
          <Checkbox true-value="a" false-value={3} v-model={checked.value} />
        </ElFormItem>
      ));

      document.querySelectorAll('.el-checkbox')[0].click();

      await nextTick();
      expect(checked.value).toBe(3);
      document.querySelectorAll('.el-checkbox')[0].click();
      await nextTick();
      expect(checked.value).toBe('a');
    });

    test('with label attribute', async () => {
      const checked = ref('a');
      const wrapper = _mount(() => <Checkbox label="Foobar" true-value="a" false-value={0} v-model={checked.value} />);

      document.querySelectorAll('.el-checkbox')[0].click();
      await nextTick();
      expect(checked.value).toBe(0);
      document.querySelectorAll('.el-checkbox')[0].click();
      await nextTick();
      expect(checked.value).toBe('a');
    });

    test('with label as slot content', async () => {
      const checked = ref('a');
      const wrapper = _mount(() => (
        <Checkbox true-value="a" false-value={0} v-model={checked.value}>
          Foobar
        </Checkbox>
      ));

      document.querySelectorAll('.el-checkbox')[0].click();
      await nextTick();
      expect(checked.value).toBe(0);
      document.querySelectorAll('.el-checkbox')[0].click();
      await nextTick();
      expect(checked.value).toBe('a');
    });
  });

  describe('true/false-value ', () => {
    test('without true/false-value attribute', async () => {
      const checked = ref(true);

      const wrapper = mount(() => (
        <ElFormItem label="test">
          <Checkbox v-model={checked.value} />
        </ElFormItem>
      ));

      const checkbox = wrapper.findComponent(Checkbox);
      await checkbox.trigger('click');
      await nextTick();
      expect(checked.value).toBe(false);
      await checkbox.trigger('click');
      await nextTick();
      expect(checked.value).toBe(true);
    });

    test('without true-value attribute', async () => {
      const checked = ref(true);

      const wrapper = mount(() => (
        <ElFormItem label="test">
          <Checkbox v-model={checked.value} falseValue="a" />
        </ElFormItem>
      ));

      const checkbox = wrapper.findComponent(Checkbox);
      await checkbox.trigger('click');
      await nextTick();
      expect(checked.value).toBe('a');
      await checkbox.trigger('click');
      await nextTick();
      expect(checked.value).toBe(true);
    });

    test('without false-value attribute', async () => {
      const checked = ref(true);

      const wrapper = mount(() => (
        <ElFormItem label="test">
          <Checkbox v-model={checked.value} trueValue="a" />
        </ElFormItem>
      ));

      const checkbox = wrapper.findComponent(Checkbox);
      await checkbox.trigger('click');
      await nextTick();
      expect(checked.value).toBe(false);
      await checkbox.trigger('click');
      await nextTick();
      expect(checked.value).toBe('a');
    });

    test('with true/false-value attribute', async () => {
      const checked = ref(true);

      const wrapper = mount(() => (
        <ElFormItem label="test">
          <Checkbox v-model={checked.value} trueValue="a" falseValue={1} />
        </ElFormItem>
      ));

      const checkbox = wrapper.findComponent(Checkbox);
      await checkbox.trigger('click');
      await nextTick();
      expect(checked.value).toBe(1);
      await checkbox.trigger('click');
      await nextTick();
      expect(checked.value).toBe('a');
    });
  });

  test('check', () => {
    const checked = ref(false);
    const checklist = ref([]);
    mount(() => (
      <div>
        <Checkbox v-model={checked.value} checked />
        <CheckboxGroup v-model={checklist.value}>
          <Checkbox checked label="a" value="a" />
        </CheckboxGroup>
      </div>
    ));

    expect(checked.value).toBe(true);
    expect(checklist.value).toEqual(['a']);
  });

  test('label', async () => {
    const checklist = ref([]);
    const wrapper = _mount(() => (
      <CheckboxGroup v-model={checklist.value}>
        <Checkbox label="" value="">
          all
        </Checkbox>
        <Checkbox label="a" value="a">
          a
        </Checkbox>
        <Checkbox label="b" value="b">
          b
        </Checkbox>
      </CheckboxGroup>
    ));

    document.querySelectorAll('.el-checkbox')[0].click();
    await nextTick();
    // const checkbox = wrapper.findComponent(Checkbox);
    // await checkbox.trigger('click');
    expect(checklist.value[0]).toEqual('');
  });

  test('value is object', async () => {
    const checklist = ref([]);
    const wrapper = _mount(() => (
      <CheckboxGroup v-model={checklist.value}>
        <Checkbox value={{ a: 1 }}>all</Checkbox>
        <Checkbox value={{ a: 2 }}>a</Checkbox>
        <Checkbox value={{ b: 1 }}>b</Checkbox>
      </CheckboxGroup>
    ));


    const checkbox = wrapper.find('.el-checkbox')
    document.querySelectorAll('.el-checkbox')[0].click();
    await nextTick();
    expect(checklist.value[0]).toEqual({ a: 1 });
    expect(checkbox.classes()).contains('is-checked');
  });
  test('value is object with initial values', async () => {
    const checklist = ref([{ a: 1 }]);
    const wrapper = _mount({
      setup() {
        return () => (
          <CheckboxGroup v-model={checklist.value}>
            <Checkbox value={{ a: 1 }} ref="a1">
              a1
            </Checkbox>
            <Checkbox value={{ a: 2 }} ref="a2">
              a2
            </Checkbox>
            <Checkbox value={{ b: 1 }} ref="b1">
              b1
            </Checkbox>
          </CheckboxGroup>
        );
      },
    });
    expect(checklist.value.length).toBe(1);
    const checkboxA1 = wrapper.findComponent({ ref: 'a1' });
    const checkboxA2 = wrapper.findComponent({ ref: 'a2' });
    document.querySelectorAll('.el-checkbox')[1].click();
    await nextTick();
    expect(checklist.value).toEqual([{ a: 1 }, { a: 2 }]);
    expect(checkboxA1.classes()).contains('is-checked');
    expect(checkboxA2.classes()).contains('is-checked');
    document.querySelectorAll('.el-checkbox')[0].click();
    await nextTick();
    expect(checklist.value).toEqual([{ a: 2 }]);
    expect(checkboxA1.classes()).not.contains('is-checked');
  });
});

describe('check-button', () => {
  test('create', async () => {
    const checked = ref(false);
    const wrapper = _mount(() => <CheckboxButton v-model={checked.value} label="a" value="a" />);

    // expect(wrapper.classes()).toContain('el-checkbox-button');
    
    document.querySelectorAll('.el-checkbox-button')[0].click();
    await nextTick();
    expect(wrapper.classes()).toContain('is-checked');
    document.querySelectorAll('.el-checkbox-button')[0].click();
    await nextTick();
    expect(wrapper.classes('is-checked')).toBe(false);
  });

  test('disabled', async () => {
    const checked = ref(false);
    const wrapper = mount(() => <CheckboxButton v-model={checked.value} disabled label="a" value="a" />);

    expect(wrapper.classes()).toContain('is-disabled');
    await wrapper.trigger('click');
    expect(wrapper.classes()).toContain('is-disabled');
  });

  test('change event', async () => {
    const checked = ref(false);
    const data = ref();
    const onChange = (val: CheckboxValueType) => (data.value = val);
    const wrapper = _mount(() => <CheckboxButton v-model={checked.value} onChange={onChange} />);

    document.querySelectorAll('.el-checkbox-button')[0].click();
    await nextTick();
    expect(data.value).toBe(true);
  });

  test('button group change', async () => {
    const checkList = ref([]);
    const data = ref<CheckboxValueType[]>([]);
    const onChange = (val: CheckboxValueType[]) => (data.value = val);
    const wrapper = _mount({
      setup() {
        return () => (
          <CheckboxGroup v-model={checkList.value} onChange={onChange}>
            <CheckboxButton label="a" value="a" ref="a" />
            <CheckboxButton label="b" value="b" ref="b" />
            <CheckboxButton label="c" value="c" ref="c" />
            <CheckboxButton label="d" value="d" ref="d" />
          </CheckboxGroup>
        );
      },
    });
    document.querySelectorAll('.el-checkbox-button')[0].click();
    await nextTick();
    expect(data.value).toEqual(['a']);
    document.querySelectorAll('.el-checkbox-button')[1].click();
    await nextTick();
    expect(data.value).toEqual(['a', 'b']);
  });

  test('button group props', () => {
    const checkList = ref(['a', 'b']);
    const wrapper = mount({
      setup() {
        return () => (
          <CheckboxGroup v-model={checkList.value} size="large" fill="#ff0000" text-color="#000">
            <CheckboxButton label="a" value="a" ref="a" />
            <CheckboxButton label="b" value="b" ref="b" />
            <CheckboxButton label="c" value="c" ref="c" />
            <CheckboxButton label="d" value="d" ref="d" />
          </CheckboxGroup>
        );
      },
    });

    const checkbox = wrapper.findComponent({ ref: 'a' });
    expect(checkList.value.length).toBe(2);
    expect(checkbox.classes()).contains('is-checked');
    expect(checkbox.find('.el-checkbox-button__inner').attributes('style')).contains('border-color: #ff0000;');
  });

  test('button group tag', () => {
    const checkList = ref(['a', 'b']);
    const wrapper = mount(() => (
      <CheckboxGroup v-model={checkList.value} tag="tr">
        <CheckboxButton label="a" value="a" ref="a" />
        <CheckboxButton label="b" value="b" ref="b" />
        <CheckboxButton label="c" value="c" ref="c" />
        <CheckboxButton label="d" value="d" ref="d" />
      </CheckboxGroup>
    ));

    expect(wrapper.find('tr').classes('el-checkbox-group')).toBeTruthy();
  });

  test('button group min and max', async () => {
    const checkList = ref(['a', 'b']);
    const wrapper = _mount({
      setup() {
        return () => (
          <CheckboxGroup v-model={checkList.value} min={2} max={3}>
            <CheckboxButton label="a" value="a" ref="a" class="a" />
            <CheckboxButton label="b" value="b" ref="b" class="b" />
            <CheckboxButton label="c" value="c" ref="c" class="c" />
            <CheckboxButton label="d" value="d" ref="d" class="d" />
            <CheckboxButton label="e" value="e" ref="e" class="e" />
          </CheckboxGroup>
        );
      },
    });

    expect(checkList.value.length).toBe(2);

    document.querySelectorAll('.el-checkbox-button')[0].click();
    await nextTick();
    expect(checkList.value.length).toBe(2);

    document.querySelectorAll('.el-checkbox-button')[2].click();
    await nextTick();
    expect(checkList.value.length).toBe(3);
    expect(checkList.value).toEqual(['a', 'b', 'c']);

    expect(wrapper.find('.d').classes()).contains('is-disabled');
    expect(wrapper.find('.e').classes()).contains('is-disabled');

    checkList.value = [];
    await nextTick();
    document.querySelectorAll('.el-checkbox-button')[0].click();
    await nextTick();
    document.querySelectorAll('.el-checkbox-button')[3].click();
    await nextTick();
    expect(checkList.value).toEqual(['a', 'd']);
    document.querySelectorAll('.el-checkbox-button')[0].click();
    await nextTick();
    expect(checkList.value).toEqual(['a', 'd']);
    expect(wrapper.find('.a').classes()).contains('is-disabled');
  });

  test('button group exceed max', async () => {
    const checkList = ref(['a', 'b', 'c', 'd']);
    const wrapper = _mount({
      setup() {
        return () => (
          <CheckboxGroup v-model={checkList.value} max={3}>
            <CheckboxButton label="a" value="a" ref="a" class="a" />
            <CheckboxButton label="b" value="b" ref="b" />
            <CheckboxButton label="c" value="c" ref="c" />
            <CheckboxButton label="d" value="d" ref="d" />
            <CheckboxButton label="e" value="e" ref="e" />
          </CheckboxGroup>
        );
      },
    });

    expect(checkList.value.length).toBe(4);

    document.querySelectorAll('.el-checkbox-button')[0].click();
    expect(checkList.value.length).toBe(3);

    await nextTick();
    document.querySelectorAll('.el-checkbox-button')[0].click();
    expect(checkList.value.length).toBe(3);
    expect(checkList.value).toEqual(['b', 'c', 'd']);
    await nextTick();

    expect(wrapper.find('.a').classes()).contains('is-disabled');
  });

  test('nested group', async () => {
    const checkList = ref([]);
    const wrapper = _mount({
      setup() {
        return () => (
          <CheckboxGroup v-model={checkList.value}>
            <CheckboxButton label="a" value="a" ref="a" />
            <CheckboxButton label="b" value="b" ref="b" />
            <CheckboxButton label="c" value="c" ref="c" />
            <CheckboxButton label="d" value="d" ref="d" />
          </CheckboxGroup>
        );
      },
    });

    expect(checkList.value.length).toBe(0);
    document.querySelectorAll('.el-checkbox-button')[0].click();
    await nextTick();
    expect(checkList.value).toEqual(['a']);
  });

  describe('checked prop', () => {
    test('check', () => {
      const checked = ref(false);
      const checklist = ref([]);
      mount(() => (
        <div>
          <Checkbox v-model={checked.value} checked />
          <CheckboxGroup v-model={checklist.value}>
            <CheckboxButton checked label="a" value="a" />
          </CheckboxGroup>
        </div>
      ));

      expect(checked.value).toBe(true);
      expect(checklist.value).toEqual(['a']);
    });

    test('checked', () => {
      const wrapper = mount(() => <Checkbox checked />);

      expect(wrapper.find('.el-checkbox').classes()).contains('is-checked');
    });
  });

  describe('form item accessibility integration', () => {
    test('checkbox, no label, automatic label attachment', async () => {
      const wrapper = mount(() => (
        <ElFormItem label="test">
          <Checkbox />
        </ElFormItem>
      ));

      const formItem = await wrapper.findComponent(ElFormItem);
      const checkbox = await wrapper.findComponent(Checkbox);
      const formItemLabel = formItem.find('.el-form-item__label');
      const checkboxInput = checkbox.find('.el-checkbox__original');
      expect(checkboxInput.attributes('id')).toBe(formItemLabel.attributes('for'));
    });

    test('checkbox with label, form item is group', async () => {
      const wrapper = mount(() => (
        <ElFormItem label="test">
          <Checkbox label="Foo" value="Foo" />
        </ElFormItem>
      ));

      const formItem = await wrapper.findComponent(ElFormItem);
      const checkbox = await wrapper.findComponent(Checkbox);
      const checkboxLabel = checkbox.find('.el-checkbox__label');
      const checkboxInput = checkbox.find('.el-checkbox__original');
      expect(checkboxLabel.element.textContent).toBe('Foo');
      expect(checkboxInput.attributes('id')).toBeFalsy();
      expect(formItem.attributes('role')).toBe('group');
    });

    test('single checkbox group in form item', async () => {
      const wrapper = mount(() => (
        <ElFormItem label="test">
          <CheckboxGroup>
            <Checkbox label="Foo" value="Foo" />
            <Checkbox label="Bar" value="Bar" />
          </CheckboxGroup>
        </ElFormItem>
      ));

      const formItem = await wrapper.findComponent(ElFormItem);
      const checkboxGroup = await wrapper.findComponent(CheckboxGroup);
      const formItemLabel = formItem.find('.el-form-item__label');
      expect(formItem.attributes('role')).toBeFalsy();
      expect(checkboxGroup.attributes('role')).toBe('group');
      expect(formItemLabel.attributes('for')).toBe(checkboxGroup.attributes('id'));
      expect(formItemLabel.attributes('id')).toBe(checkboxGroup.attributes('aria-labelledby'));
    });

    test('single checkbox group in form item, override label', async () => {
      const wrapper = mount(() => (
        <ElFormItem label="test">
          <CheckboxGroup aria-label="Foo">
            <Checkbox label="Foo" value="Foo" />
            <Checkbox label="Bar" value="Bar" />
          </CheckboxGroup>
        </ElFormItem>
      ));

      const formItem = await wrapper.findComponent(ElFormItem);
      const checkboxGroup = await wrapper.findComponent(CheckboxGroup);
      const formItemLabel = formItem.find('.el-form-item__label');
      expect(formItemLabel.attributes('for')).toBe(checkboxGroup.attributes('id'));
      expect(checkboxGroup.attributes('role')).toBe('group');
      expect(checkboxGroup.attributes()['aria-label']).toBe('Foo');
      expect(checkboxGroup.attributes()['aria-labelledby']).toBeFalsy();
    });

    test('multiple checkbox groups in form item', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <ElFormItem label="test">
              <CheckboxGroup aria-label="Foo" ref="checkboxGroup1">
                <Checkbox label="Foo" value="Foo" />
                <Checkbox label="Bar" value="Bar" />
              </CheckboxGroup>
              <CheckboxGroup aria-label="Bar" ref="checkboxGroup2">
                <Checkbox label="Foo" value="Foo" />
                <Checkbox label="Bar" value="Bar" />
              </CheckboxGroup>
            </ElFormItem>
          );
        },
      });

      const formItem = await wrapper.findComponent(ElFormItem);
      const checkboxGroup1 = await wrapper.findComponent({
        ref: 'checkboxGroup1',
      });
      const checkboxGroup2 = await wrapper.findComponent({
        ref: 'checkboxGroup2',
      });
      const formItemLabel = formItem.find('.el-form-item__label');
      expect(formItem.attributes('role')).toBe('group');
      expect(formItem.attributes()['aria-labelledby']).toBe(formItemLabel.attributes('id'));
      expect(checkboxGroup1.attributes('role')).toBe('group');
      expect(checkboxGroup1.attributes()['aria-label']).toBe('Foo');
      expect(checkboxGroup1.attributes()['aria-labelledby']).toBeFalsy();
      expect(checkboxGroup2.attributes('role')).toBe('group');
      expect(checkboxGroup2.attributes()['aria-label']).toBe('Bar');
      expect(checkboxGroup2.attributes()['aria-labelledby']).toBeFalsy();
    });
  });
});
