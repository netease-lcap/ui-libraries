import { FIT_CONTENT_COLUMN_CLASS } from './column';

/** 测量时为内容宽度预留的余量（避免亚像素裁切） */
const FIT_CONTENT_WIDTH_BUFFER = 2;

function measureCellContentWidth(cell: Element): number {
  const inner = cell.querySelector('.cell') as HTMLElement | null;
  if (!inner) return 0;

  const prevDisplay = inner.style.display;
  const prevWidth = inner.style.width;
  const prevWhiteSpace = inner.style.whiteSpace;
  const prevMaxWidth = inner.style.maxWidth;

  inner.style.display = 'inline-block';
  inner.style.width = 'auto';
  inner.style.maxWidth = 'none';
  inner.style.whiteSpace = 'nowrap';

  const width = Math.ceil(inner.getBoundingClientRect().width);

  inner.style.display = prevDisplay;
  inner.style.width = prevWidth;
  inner.style.whiteSpace = prevWhiteSpace;
  inner.style.maxWidth = prevMaxWidth;

  return width;
}

function resolveTableEl(tableRef: any, refId?: string): HTMLElement | null {
  const fromRef = tableRef?.$el as HTMLElement | undefined;
  if (fromRef?.querySelector) return fromRef;
  if (!refId || typeof document === 'undefined') return null;
  return document.querySelector(`[data-ref-id="${refId}"]`) as HTMLElement | null;
}

/**
 * 对标记了 fit-content 的列按表头/单元格内容测宽，写回 store 的 minWidth（非固定 width）。
 * - 内容总宽 ≤ 表格宽：仍作为 flex 列参与 fit，撑满容器
 * - 内容总宽 > 表格宽：以测得 minWidth 为下限，出现横向滚动
 * @returns 是否发生了列宽变更
 */
export function applyFitContentColumnWidths(tableRef: any, refId?: string): boolean {
  const tableEl = resolveTableEl(tableRef, refId);
  const store = tableRef?.store;
  const columns: any[] = store?.states?.columns?.value ?? store?.states?.columns ?? [];
  if (!tableEl || !columns.length) return false;

  const cells = tableEl.querySelectorAll(
    `th.${FIT_CONTENT_COLUMN_CLASS}, td.${FIT_CONTENT_COLUMN_CLASS}`,
  );
  if (!cells.length) return false;

  const widthByColId = new Map<string, number>();
  cells.forEach((cell) => {
    const colId = columns.find((col) => cell.classList.contains(col.id))?.id;
    if (!colId) return;
    const measured = measureCellContentWidth(cell);
    const prev = widthByColId.get(colId) ?? 0;
    if (measured > prev) widthByColId.set(colId, measured);
  });

  let changed = false;
  columns.forEach((col) => {
    const className = String(col.className ?? '');
    if (!className.includes(FIT_CONTENT_COLUMN_CLASS)) return;
    const measured = widthByColId.get(col.id);
    if (!measured) return;
    const nextMinWidth = measured + FIT_CONTENT_WIDTH_BUFFER;
    const widthCleared = col.width === '' || col.width == null;
    if (widthCleared && Number(col.minWidth) === nextMinWidth && Number(col.realMinWidth) === nextMinWidth) {
      return;
    }
    // 用 minWidth 而非 width：保留 flex 列身份，不足时由 EP fit 撑满，超出时横向滚动
    Object.assign(col, {
      width: '',
      realWidth: null,
      minWidth: nextMinWidth,
      realMinWidth: nextMinWidth,
    });
    changed = true;
  });

  if (changed) {
    tableRef?.doLayout?.();
  }
  return changed;
}
