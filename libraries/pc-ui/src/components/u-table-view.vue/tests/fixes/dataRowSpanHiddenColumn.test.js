import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

// 数据里手写 rowSpan（不是列属性的 auto-row-span），走「展示列」面板的真实交互
import DataRowSpanDemo from '../../demos/cases/CasesDemo55.vue';

const sleep = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});
const ALL_FIELDS = ['property1', 'property2', 'property3', 'property4', 'property5'];

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
      grid[rowIndex][columnIndex] = { text };
      for (let i = 1; i < rowspan; i++) {
        grid[rowIndex + i] = grid[rowIndex + i] || [];
        grid[rowIndex + i][columnIndex] = { text };
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
  it('数据级 rowSpan 配置的列被隐藏后，合并不生效也不迁移', async () => {
    const wrapper = mount(DataRowSpanDemo, { attachTo: document.body });
    await wrapper.vm.$nextTick();
    await sleep(50);

    // 初始：property3 合并第 1~2 行（rowSpan [[2, 2]]），property4 合并第 3~4 行（rowSpan [[3, 2]]）
    const initial = readTable(wrapper);
    expect(initial.merges).toEqual({
      property3: [{ row: 0, rowspan: 2 }],
      property4: [{ row: 2, rowspan: 2 }],
    });
    expect(initial.cellCounts).toEqual([5, 4, 5, 4, 5]);

    // 隐藏配置列之前的列：两条配置的合并位置都不能变（改前会整体前移一位）
    await applyVisibleColumns(wrapper, withoutFields('property1'));
    const hideBefore = readTable(wrapper);
    expect(hideBefore.merges).toEqual(initial.merges);
    expect(hideBefore.cellCounts).toEqual([4, 3, 4, 3, 4]);
    Object.keys(initial.merges).forEach((field) => {
      expect(hideBefore.values[field]).toEqual(initial.values[field]);
    });
    await applyVisibleColumns(wrapper, ALL_FIELDS);
    expect(readTable(wrapper)).toEqual(initial);

    // 隐藏 property3：只有它的合并不生效，property4 的合并不受影响、数据不丢
    await applyVisibleColumns(wrapper, withoutFields('property3'));
    const hideP3 = readTable(wrapper);
    expect(hideP3.merges).toEqual({ property4: [{ row: 2, rowspan: 2 }] });
    expect(hideP3.cellCounts).toEqual([4, 4, 4, 3, 4]);
    expect(hideP3.values.property4).toEqual(initial.values.property4);
    expect(hideP3.values.property5).toEqual(initial.values.property5);
    await applyVisibleColumns(wrapper, ALL_FIELDS);
    expect(readTable(wrapper)).toEqual(initial);

    // 隐藏 property4：只有它的合并不生效，property3 的合并不受影响
    await applyVisibleColumns(wrapper, withoutFields('property4'));
    const hideP4 = readTable(wrapper);
    expect(hideP4.merges).toEqual({ property3: [{ row: 0, rowspan: 2 }] });
    expect(hideP4.cellCounts).toEqual([4, 3, 4, 4, 4]);
    expect(hideP4.values.property3).toEqual(initial.values.property3);
    await applyVisibleColumns(wrapper, ALL_FIELDS);
    expect(readTable(wrapper)).toEqual(initial);

    // 两个配置列同时隐藏：都没有合并，其它列数据完整
    await applyVisibleColumns(wrapper, withoutFields('property3', 'property4'));
    const hideBoth = readTable(wrapper);
    expect(hideBoth.merges).toEqual({});
    expect(hideBoth.cellCounts).toEqual([3, 3, 3, 3, 3]);
    expect(hideBoth.values.property5).toEqual(initial.values.property5);
    await applyVisibleColumns(wrapper, ALL_FIELDS);
    expect(readTable(wrapper)).toEqual(initial);
  });
});
