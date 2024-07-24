import { expect, describe, it } from 'vitest';
import Picker from '../../index';
import { mount, later } from '../../../../test';

const dataSource = [
  { text: '语文', value: '语文' },
  { text: '数学', value: '数学' },
  { text: '英语', value: '英语' },
];

describe('use converter', () => {
  it('use converter join:| and multiple is true', async () => {
    const wrapper = mount(Picker, {
      propsData: {
        value: [],
        showToolbar: true,
        dataSource,
        converter: 'join:|',
        multiple: true,
      },
    });

    const { vm: pickerVM } = wrapper;
    pickerVM.onClickField();
    await later(20);

    const pickerList = pickerVM.$refs.picker;
    pickerList.onSelect(dataSource[0].text, 0, dataSource[0]);
    pickerList.onSelect(dataSource[2].text, 2, dataSource[2]);

    pickerVM.onConfirm();
    await pickerVM.$nextTick();
    const emittedEvents = wrapper.emitted();
    expect(emittedEvents['update:value'][0][0]).toBe('语文|英语');
  });

  it('unuse converter but multiple is true', async () => {
    const wrapper = mount(Picker, {
      propsData: {
        value: [],
        showToolbar: true,
        dataSource,
        multiple: true,
        type: 'list',
      },
    });

    const { vm: pickerVM } = wrapper;
    pickerVM.onClickField();
    await later(16);

    const pickerList = pickerVM.$refs.picker;
    pickerList.onSelect(dataSource[0].text, 0, dataSource[0]);
    pickerList.onSelect(dataSource[2].text, 2, dataSource[2]);

    pickerVM.onConfirm();
    await pickerVM.$nextTick();
    const emittedEvents = wrapper.emitted();
    expect(emittedEvents['update:value'][0][0]).toEqual(['语文', '英语']);
  });
});
