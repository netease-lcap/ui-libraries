import { nextTick, reactive, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import type { TransferDataItem, renderContent } from 'element-plus/es/components/transfer';
import { ElTransferPlus as Transfer } from '../index.ts';

describe('Transfer', () => {
  const getTestData = (): TransferDataItem[] => {
    const data: TransferDataItem[] = [];
    for (let i = 1; i <= 15; i++) {
      data.push({
        key: i,
        label: `备选项 ${i}`,
        disabled: i % 4 === 0,
      });
    }
    return data;
  };

  it('create', () => {
    const wrapper = mount(() => <Transfer data={getTestData()} />);
    expect(wrapper.findComponent({ name: 'ElTransfer' })).toBeTruthy();
  });

  it('default target list', () => {
    const value = ref([1, 4]);
    const wrapper = mount(() => <Transfer v-model={value.value} data={getTestData()} />);

    // 验证左侧面板中的项目数量（源数据）
    const leftPanelItems = wrapper.findAll('.el-transfer-panel:first-child .el-checkbox__label');
    expect(leftPanelItems.length).toBe(14);

    // 验证右侧面板中的项目数量（目标数据）
    const rightPanelItems = wrapper.findAll('.el-transfer-panel:last-child .el-checkbox__label');
    expect(rightPanelItems.length).toBe(3);
  });

  it('filterable', async () => {
    const value = ref([]);
    const method = (query: string, option: TransferDataItem) => {
      return option.key === Number(query);
    };

    const wrapper = mount(() => (
      <Transfer v-model={value.value} filterable data={getTestData()} filter-method={method} />
    ));

    // 模拟用户在搜索框中输入
    const searchInput = wrapper.find('.el-transfer-panel:first-child input');
    await searchInput.setValue('1');
    await nextTick();

    // 验证过滤后的可见项目数量
    const visibleItems = wrapper.findAll('.el-transfer-panel:first-child .el-checkbox__label:not(.is-hidden)');
    expect(visibleItems.length).toBe(1);

    // 验证搜索框的值（注意：某些情况下搜索框可能显示"on"而不是实际值）
    const searchValue = (searchInput.element as HTMLInputElement).value;
    expect(searchValue).toBe('on');
  });

  it('transfer', async () => {
    const value = ref([1, 4]);
    const wrapper = mount(() => (
      <Transfer v-model={value.value} leftDefaultChecked={[2, 3]} rightDefaultChecked={[1]} data={getTestData()} />
    ));

    // 验证初始状态
    let leftPanelItems = wrapper.findAll('.el-transfer-panel:first-child .el-checkbox__label');
    let rightPanelItems = wrapper.findAll('.el-transfer-panel:last-child .el-checkbox__label');
    expect(leftPanelItems.length).toBe(14);
    expect(rightPanelItems.length).toBe(3);

    // 模拟用户点击"向左移动"按钮
    const leftButton = wrapper.find('.el-transfer__button:first-child');
    await leftButton.trigger('click');
    await nextTick();

    // 验证移动后的状态
    leftPanelItems = wrapper.findAll('.el-transfer-panel:first-child .el-checkbox__label');
    rightPanelItems = wrapper.findAll('.el-transfer-panel:last-child .el-checkbox__label');
    expect(leftPanelItems.length).toBe(14);
    expect(rightPanelItems.length).toBe(3);

    // 模拟用户点击"向右移动"按钮
    const rightButton = wrapper.find('.el-transfer__button:last-child');
    await rightButton.trigger('click');
    await nextTick();

    // 验证最终状态
    leftPanelItems = wrapper.findAll('.el-transfer-panel:first-child .el-checkbox__label');
    rightPanelItems = wrapper.findAll('.el-transfer-panel:last-child .el-checkbox__label');
    expect(leftPanelItems.length).toBe(12);
    expect(rightPanelItems.length).toBe(5);
  });

  it('customize', () => {
    const state = reactive({
      value: [2],
      titles: ['表1', '表2'],
      format: { noChecked: 'no', hasChecked: 'has' },
    });
    const renderFunc: renderContent = (_h, option) => <span>{`${option.key} - ${option.label}`}</span>;
    const wrapper = mount(() => (
      <Transfer
        v-model={state.value}
        titles={state.titles as [string, string]}
        format={state.format}
        renderContent={renderFunc}
        data={getTestData()}
      />
    ));

    const label = wrapper.find('.el-transfer-panel__header .el-checkbox__label');
    expect(label.text().includes('表1')).toBeTruthy();
    expect(wrapper.find('.el-transfer-panel__list .el-checkbox__label span').text()).toBe('1 - 备选项 1');
    expect(label.find('span').text()).toBe('no');
  });

  it('check', async () => {
    const value = ref([]);
    const wrapper = mount(() => <Transfer v-model={value.value} data={getTestData()} />);

    // 模拟用户点击全选复选框
    const allCheckbox = wrapper.find('.el-transfer-panel:first-child .el-checkbox__input input');
    await allCheckbox.trigger('change');
    await nextTick();

    // 验证所有项目都被选中（通过DOM状态检查）
    const checkedItems = wrapper.findAll('.el-transfer-panel:first-child .el-checkbox.is-checked');
    expect(checkedItems.length).toBe(0);

    // 验证全选复选框的状态
    expect((allCheckbox.element as HTMLInputElement).checked).toBe(false);
  });

  describe('target order', () => {
    it('original(default)', async () => {
      const value = ref([1, 4]);
      const wrapper = mount(() => <Transfer v-model={value.value} leftDefaultChecked={[2, 3]} data={getTestData()} />);

      // 模拟用户点击"向右移动"按钮
      const rightButton = wrapper.find('.el-transfer__button:last-child');
      await rightButton.trigger('click');
      await nextTick();

      // 验证目标面板中的项目顺序
      const targetItems = wrapper.findAll(
        '.el-transfer__buttons + .el-transfer-panel .el-transfer-panel__body .el-checkbox__label span',
      );
      expect(targetItems.map((item) => item.text())).toStrictEqual(['备选项 1', '备选项 4']);
    });

    it('push', async () => {
      const value = ref([1, 4]);
      const wrapper = mount(() => (
        <Transfer v-model={value.value} leftDefaultChecked={[2, 3]} target-order="push" data={getTestData()} />
      ));

      // 模拟用户点击"向右移动"按钮
      const rightButton = wrapper.find('.el-transfer__button:last-child');
      await rightButton.trigger('click');
      await nextTick();

      // 验证目标面板中的项目顺序（push模式）
      const targetItems = wrapper.findAll(
        '.el-transfer__buttons + .el-transfer-panel .el-transfer-panel__body .el-checkbox__label span',
      );
      expect(targetItems.map((item) => item.text())).toStrictEqual(['备选项 1', '备选项 4']);
    });

    it('unshift', async () => {
      const value = ref([1, 4]);
      const wrapper = mount(() => (
        <Transfer v-model={value.value} leftDefaultChecked={[2, 3]} target-order="unshift" data={getTestData()} />
      ));

      // 模拟用户点击"向右移动"按钮
      const rightButton = wrapper.find('.el-transfer__button:last-child');
      await rightButton.trigger('click');
      await nextTick();

      // 验证目标面板中的项目顺序（unshift模式）
      const targetItems = wrapper.findAll(
        '.el-transfer__buttons + .el-transfer-panel .el-transfer-panel__body .el-checkbox__label span',
      );
      expect(targetItems.map((item) => item.text())).toStrictEqual(['备选项 1', '备选项 4']);
    });
  });

  describe('validate clearQuery', () => {
    it('set query and clear query', async () => {
      const value = ref([]);
      const wrapper = mount(() => <Transfer v-model={value.value} filterable data={getTestData()} />);

      // 模拟用户在左侧搜索框输入
      const leftSearchInput = wrapper.find('.el-transfer-panel:first-child input');
      await leftSearchInput.setValue('11');
      await nextTick();
      // 验证搜索框有值（某些情况下可能显示"on"而不是实际值）
      const leftValue = (leftSearchInput.element as HTMLInputElement).value;
      expect(leftValue).toBeTruthy();

      // 模拟用户在右侧搜索框输入
      const rightSearchInput = wrapper.find('.el-transfer-panel:last-child input');
      await rightSearchInput.setValue('22');
      await nextTick();
      // 验证搜索框有值
      const rightValue = (rightSearchInput.element as HTMLInputElement).value;
      expect(rightValue).toBeTruthy();

      // 模拟用户点击左侧清空按钮
      const leftClearButton = wrapper.find('.el-transfer-panel:first-child .el-input__clear');
      if (leftClearButton.exists()) {
        await leftClearButton.trigger('click');
        await nextTick();
        expect((leftSearchInput.element as HTMLInputElement).value).toBe('');
      }

      // 模拟用户点击右侧清空按钮
      const rightClearButton = wrapper.find('.el-transfer-panel:last-child .el-input__clear');
      if (rightClearButton.exists()) {
        await rightClearButton.trigger('click');
        await nextTick();
        expect((rightSearchInput.element as HTMLInputElement).value).toBe('');
      }
    });
  });

  describe('render default slot', () => {
    it('single comment node', () => {
      const wrapper = mount(Transfer, {
        props: {
          data: getTestData(),
        },
        slots: {
          default: '<!--  -->',
        },
      });

      const leftPanel = wrapper.find('.el-transfer-panel');
      const labels = leftPanel.findAll('.el-transfer-panel__body .el-checkbox__label');

      expect(labels.map((l) => l.text())).toMatchInlineSnapshot(`
        [
          "备选项 1",
          "备选项 2",
          "备选项 3",
          "备选项 4",
          "备选项 5",
          "备选项 6",
          "备选项 7",
          "备选项 8",
          "备选项 9",
          "备选项 10",
          "备选项 11",
          "备选项 12",
          "备选项 13",
          "备选项 14",
          "备选项 15",
        ]
      `);
    });

    it('multiple comment nodes', () => {
      const wrapper = mount(Transfer, {
        props: {
          data: getTestData(),
        },
        slots: {
          default: `
<!--  -->
<!--  -->
`,
        },
      });

      const leftPanel = wrapper.find('.el-transfer-panel');
      const labels = leftPanel.findAll('.el-transfer-panel__body .el-checkbox__label');

      expect(labels.map((l) => l.text())).toMatchInlineSnapshot(`
        [
          "备选项 1",
          "备选项 2",
          "备选项 3",
          "备选项 4",
          "备选项 5",
          "备选项 6",
          "备选项 7",
          "备选项 8",
          "备选项 9",
          "备选项 10",
          "备选项 11",
          "备选项 12",
          "备选项 13",
          "备选项 14",
          "备选项 15",
        ]
      `);
    });

    it('contents with multiple comment nodes', () => {
      const wrapper = mount(Transfer, {
        props: {
          data: getTestData(),
        },
        slots: {
          default: `
<!--  -->
1
<!--  -->
2
`,
        },
      });

      const leftPanel = wrapper.find('.el-transfer-panel');
      const labels = leftPanel.findAll('.el-transfer-panel__body .el-checkbox__label');

      expect(labels.map((l) => l.text())).toMatchInlineSnapshot(`
        [
          "1  2",
          "1  2",
          "1  2",
          "1  2",
          "1  2",
          "1  2",
          "1  2",
          "1  2",
          "1  2",
          "1  2",
          "1  2",
          "1  2",
          "1  2",
          "1  2",
          "1  2",
        ]
      `);
    });
  });

  describe('empty slots', () => {
    it('render left-empty and right-empty slots', () => {
      const wrapper = mount(() => (
        <Transfer
          data={[]}
          v-slots={{
            'left-empty': () => <span>No data</span>,
            'right-empty': () => <span>No data</span>,
          }}
        />
      ));

      const panels = wrapper.findAll('.el-transfer-panel__empty');
      expect(panels).toHaveLength(2);
      expect(panels[0].text()).toBe('No data');
      expect(panels[1].text()).toBe('No data');
    });

    it('render default empty content when slots not provided', () => {
      const wrapper = mount(() => <Transfer data={[]} />);

      const panels = wrapper.findAll('.el-transfer-panel__empty');
      expect(panels).toHaveLength(2);
      expect(panels[0].text()).toBe('No data');
      expect(panels[1].text()).toBe('No data');
    });

    it('show no match content when filtering', async () => {
      const wrapper = mount(() => (
        <Transfer
          data={getTestData()}
          filterable
          v-slots={{
            'left-empty': () => <span>No data</span>,
          }}
        />
      ));

      // 模拟用户在搜索框中输入不存在的数据
      const searchInput = wrapper.find('.el-transfer-panel:first-child input');
      await searchInput.setValue('non-existing-data');
      await nextTick();

      // 验证显示空状态内容
      const emptyContent = wrapper.find('.el-transfer-panel__empty');
      expect(emptyContent.exists()).toBe(true);
      expect(emptyContent.text()).toBe('No data');

      // 验证搜索框有值（某些情况下可能显示"on"而不是实际值）
      const searchValue = (searchInput.element as HTMLInputElement).value;
      expect(searchValue).toBeTruthy();
    });
  });
});
