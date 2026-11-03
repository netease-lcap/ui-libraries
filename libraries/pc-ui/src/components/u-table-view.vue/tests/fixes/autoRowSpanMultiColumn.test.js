import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

// 直接用 cases demo，走「展示列」面板的真实交互：点开面板 → 勾选/取消 → 确定
import AutoRowSpanMultiColumnDemo from '../../demos/cases/CasesDemo54.vue';

const sleep = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});
const ALL_FIELDS = ['property1', 'property2', 'property3', 'property4', 'property5', 'property6', 'property7'];

// 按 DOM 还原成二维表：grid[row][columnIndex]，并算出每列的合并段与每行实际单元格数
function readTable(wrapper) {
  const headers = wrapper.findAll('th').wrappers.map((th) => th.text().trim());
  const trs = wrapper.findAll('tbody tr').wrappers.filter((tr) => tr.find('td').exists());
  const grid = [];
  const merges = {};
  const cellCounts = [];
  trs.forEach((tr, rowIndex) => {
    grid[rowIndex] = grid[rowIndex] || [];
    let columnIndex = 0;
    const tds = tr.findAll('td').wrappers;
    cellCounts.push(tds.length);
    tds.forEach((td) => {
      while (grid[rowIndex][columnIndex] !== undefined)
        columnIndex++;
      const rowspan = Number(td.attributes('rowspan') || 1);
      const text = td.text().trim();
      grid[rowIndex][columnIndex] = { text, rowspan };
      for (let i = 1; i < rowspan; i++) {
        grid[rowIndex + i] = grid[rowIndex + i] || [];
        grid[rowIndex + i][columnIndex] = { text, rowspan: 0 };
      }
      if (rowspan > 1) {
        const field = headers[columnIndex];
        merges[field] = merges[field] || [];
        merges[field].push({ row: rowIndex, rowspan });
      }
      columnIndex++;
    });
  });
  const values = {};
  headers.forEach((field, columnIndex) => {
    values[field] = grid.map((rowCells) => (rowCells[columnIndex] ? rowCells[columnIndex].text : undefined));
  });
  return { headers, cellCounts, merges, values };
}

// 通过「展示列」面板把勾选结果改成 fieldList：逐个点列表项，再点确定
async function applyVisibleColumns(wrapper, fieldList) {
  const configVM = wrapper.findComponent({ name: 'u-table-view-column-config' });
  const popper = configVM.vm.$refs.filterPopper;
  popper.open();
  await wrapper.vm.$nextTick();
  await sleep(30);
  const current = popper.currentValue.slice();
  const toToggle = [...new Set([
    ...current.filter((field) => !fieldList.includes(field)),
    ...fieldList.filter((field) => !current.includes(field)),
  ])];
  for (const field of toToggle) {
    const item = wrapper.findAllComponents({ name: 'u-table-view-filter' }).wrappers
      .find((filterItem) => filterItem.props('value') === field);
    await item.trigger('click');
    await wrapper.vm.$nextTick();
    await sleep(10);
  }
  const confirmLink = wrapper.findAllComponents({ name: 'u-link' }).wrappers.find((link) => link.text() === '确定');
  await confirmLink.trigger('click');
  await wrapper.vm.$nextTick();
  await sleep(50);
}

const withoutFields = (...fields) => ALL_FIELDS.filter((field) => !fields.includes(field));

describe('u-table-view.vue', () => {
  it('多列自动合并时，逐列隐藏不互相干扰', async () => {
    const wrapper = mount(AutoRowSpanMultiColumnDemo, { attachTo: document.body });
    await wrapper.vm.$nextTick();
    await sleep(50);

    // 初始：三列各自合并，且合并段错开（property6 第1~2行、property4 第2~3行、property7 第3~5行）
    const initial = readTable(wrapper);
    expect(initial.merges).toEqual({
      property6: [{ row: 0, rowspan: 2 }],
      property4: [{ row: 1, rowspan: 2 }],
      property7: [{ row: 2, rowspan: 3 }],
    });
    expect(initial.cellCounts).toEqual([7, 6, 6, 6, 6]);

    // 逐列隐藏合并列：只有自己消失，其它列的合并段与数据完全不变
    const hideCases = [
      { hide: 'property4', expectedMerges: { property6: [{ row: 0, rowspan: 2 }], property7: [{ row: 2, rowspan: 3 }] }, expectedCells: [6, 5, 6, 5, 5] },
      { hide: 'property6', expectedMerges: { property4: [{ row: 1, rowspan: 2 }], property7: [{ row: 2, rowspan: 3 }] }, expectedCells: [6, 6, 5, 5, 5] },
      { hide: 'property7', expectedMerges: { property6: [{ row: 0, rowspan: 2 }], property4: [{ row: 1, rowspan: 2 }] }, expectedCells: [6, 5, 5, 6, 6] },
    ];
    for (const { hide, expectedMerges, expectedCells } of hideCases) {
      await applyVisibleColumns(wrapper, withoutFields(hide));
      const result = readTable(wrapper);
      expect(result.merges).toEqual(expectedMerges);
      expect(result.cellCounts).toEqual(expectedCells);
      // 剩下的列，每一行的数据都和初始一致（没有数据被合并吞掉）
      Object.keys(expectedMerges).forEach((field) => {
        expect(result.values[field]).toEqual(initial.values[field]);
      });
      await applyVisibleColumns(wrapper, ALL_FIELDS);
      expect(readTable(wrapper)).toEqual(initial);
    }

    // 连续隐藏两列
    await applyVisibleColumns(wrapper, withoutFields('property4', 'property6'));
    const hideTwo = readTable(wrapper);
    expect(hideTwo.merges).toEqual({ property7: [{ row: 2, rowspan: 3 }] });
    expect(hideTwo.cellCounts).toEqual([5, 5, 5, 4, 4]);
    await applyVisibleColumns(wrapper, ALL_FIELDS);
    expect(readTable(wrapper)).toEqual(initial);

    // 隐藏不合并的普通列，各合并列不受影响
    await applyVisibleColumns(wrapper, withoutFields('property5'));
    const hidePlainColumn = readTable(wrapper);
    expect(hidePlainColumn.merges).toEqual(initial.merges);
    expect(hidePlainColumn.cellCounts).toEqual([6, 5, 5, 5, 5]);
    await applyVisibleColumns(wrapper, ALL_FIELDS);
    expect(readTable(wrapper)).toEqual(initial);

    // 隐藏合并列期间刷新数据，再恢复显示
    await applyVisibleColumns(wrapper, withoutFields('property4'));
    wrapper.vm.data = wrapper.vm.data.slice();
    await wrapper.vm.$nextTick();
    await sleep(50);
    expect(readTable(wrapper).merges).toEqual({ property6: [{ row: 0, rowspan: 2 }], property7: [{ row: 2, rowspan: 3 }] });
    await applyVisibleColumns(wrapper, ALL_FIELDS);
    expect(readTable(wrapper)).toEqual(initial);
  });
});
