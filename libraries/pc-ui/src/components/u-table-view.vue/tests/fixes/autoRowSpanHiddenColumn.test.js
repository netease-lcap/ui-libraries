import {
  describe,
  it,
  expect,
} from 'vitest';
import { mount } from '@vue/test-utils';

import AutoRowSpanHiddenColumnDemo from './__demos__/autoRowSpanHiddenColumn.vue';

const sleep = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

// 取表头文字与数据行的单元格文字
function getTableContent(wrapper) {
  const headers = wrapper.findAll('th').wrappers.map((th) => th.text());
  const rows = wrapper.findAll('tbody tr').wrappers
    .filter((tr) => tr.find('td').exists())
    .map((tr) => tr.findAll('td').wrappers.map((td) => td.text()));
  return { headers, rows };
}

// 带 rowspan 属性的单元格（= 被合并的单元格）
function getMergedCells(wrapper) {
  return wrapper.findAll('td').wrappers.filter((td) => td.attributes('rowspan'));
}

function getColumnTexts(wrapper, title) {
  const { headers, rows } = getTableContent(wrapper);
  const columnIndex = headers.indexOf(title);
  return {
    columnIndex,
    values: rows.map((cells) => cells[columnIndex]),
  };
}

describe('u-table-view.vue', () => {
  it('隐藏自动合并列后，合并不会迁移到后面的列', async () => {
    const wrapper = mount(AutoRowSpanHiddenColumnDemo);
    await wrapper.vm.$nextTick();
    await sleep(16);

    // 隐藏前：property4 的两行相同数据合并成一个单元格
    const mergedCellsBefore = getMergedCells(wrapper);
    expect(mergedCellsBefore.length).toBe(1);
    expect(mergedCellsBefore[0].attributes('rowspan')).toBe('2');
    expect(mergedCellsBefore[0].text()).toBe('32131');

    const contentBeforeHidden = getTableContent(wrapper);
    expect(contentBeforeHidden.headers).toEqual(['property1', 'property2', 'property3', 'property4', 'property5']);
    // 前 3 行是 5 个单元格，第 4 行的 property4 被合并吞掉
    expect(contentBeforeHidden.rows.map((cells) => cells.length)).toEqual([5, 5, 5, 4]);
    expect(contentBeforeHidden.rows[3]).toEqual(['p1-4', 'p2-4', 'p3-4', '1e22e21']);

    // 隐藏 property4 后，property5 是新的第 4 列（下标 3）
    wrapper.vm.hideColumn('property4');
    await wrapper.vm.$nextTick();
    await sleep(16);

    const contentAfterHidden = getTableContent(wrapper);
    expect(contentAfterHidden.headers).toEqual(['property1', 'property2', 'property3', 'property5']);
    // 合并列被隐藏后，不应该有任何列出现合并
    expect(getMergedCells(wrapper).length).toBe(0);
    // property5 的数据一行都不能少，不能被合并吞掉
    expect(contentAfterHidden.rows.map((cells) => cells.length)).toEqual([4, 4, 4, 4]);
    expect(getColumnTexts(wrapper, 'property5').values).toEqual(['12edq1', '12rf123', 'e132', '1e22e21']);

    // 重新展示 property4，合并恢复在 property4 自己身上
    wrapper.vm.showColumn('property4');
    await wrapper.vm.$nextTick();
    await sleep(16);

    const mergedCellsRestored = getMergedCells(wrapper);
    expect(mergedCellsRestored.length).toBe(1);
    expect(mergedCellsRestored[0].attributes('rowspan')).toBe('2');
    expect(mergedCellsRestored[0].text()).toBe('32131');
    const contentRestored = getTableContent(wrapper);
    expect(contentRestored.headers).toEqual(['property1', 'property2', 'property3', 'property4', 'property5']);
    expect(contentRestored.rows[3]).toEqual(['p1-4', 'p2-4', 'p3-4', '1e22e21']);
  });
});
