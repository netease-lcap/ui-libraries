import { defineComponent, ref, watch, nextTick, onUnmounted } from 'vue';

function mapWidthToCols(w: number) {
  // if (w >= 1600) return 5;
  if (w >= 1200) return 4;
  if (w >= 992) return 3;
  return 2;
}

function getActionsContentWidth(actionEl: HTMLElement) {
  const { children } = actionEl;
  if (children.length === 0) return 0;
  let width = 0;
  for (let i = 0; i < children.length; i++) {
    width += (children[i] as HTMLElement).offsetWidth;
  }
  const actionGap = 8;
  return width + Math.max(0, children.length - 1) * actionGap;
}

export default defineComponent({
  name: 'ElFormQueryLayout',
  setup(_, { slots }) {
    const rootRef = ref<HTMLElement | null>(null);
    const queryColumns = ref(4);
    const actionsFullRow = ref(false);

    function updateActionsLayout() {
      const root = rootRef.value;
      if (!root) return;
      const actionEl = root.querySelector('.el-form-query__actions') as HTMLElement | null;
      if (!actionEl) {
        actionsFullRow.value = false;
        return;
      }
      const items = root.querySelectorAll('.el-form-item');
      const lastItem = items[items.length - 1] as HTMLElement | undefined;
      if (!lastItem) {
        actionsFullRow.value = false;
        return;
      }
      const aw = getActionsContentWidth(actionEl);
      const rootWidth = root.getBoundingClientRect().width;
      const gap = 16;
      const lastRight = lastItem.offsetLeft + lastItem.offsetWidth;
      const remaining = rootWidth - lastRight - gap;
      const sameRow = Math.abs(lastItem.offsetTop - actionEl.offsetTop) < 3;
      const needsFullRow = sameRow && aw > remaining + 1;
      const canShareRow = aw <= remaining + 1;
      if (actionsFullRow.value) {
        if (canShareRow) actionsFullRow.value = false;
      } else if (needsFullRow) {
        actionsFullRow.value = true;
      }
    }

    let ro: ResizeObserver | null = null;

    const stop = watch(
      rootRef,
      (el) => {
        ro?.disconnect();
        ro = null;
        if (!el) return;
        ro = new ResizeObserver(() => {
          const w = el.getBoundingClientRect().width;
          const n = mapWidthToCols(w);
          if (queryColumns.value !== n) queryColumns.value = n;
          nextTick(() => updateActionsLayout());
        });
        ro.observe(el);
        queryColumns.value = mapWidthToCols(el.getBoundingClientRect().width);
        nextTick(() => updateActionsLayout());
      },
      { flush: 'post', immediate: true },
    );

    watch(queryColumns, () => nextTick(() => updateActionsLayout()));

    onUnmounted(() => {
      ro?.disconnect();
      stop();
    });

    return () => (
      <div
        ref={rootRef}
        class="el-form-query"
        style={
          {
            '--el-form-query-cols': queryColumns.value,
          } as Record<string, string | number>
        }
        data-query-cols={queryColumns.value}>
        <div class="el-form-query__fields">{slots.default?.()}</div>
        <div class={['el-form-query__actions', actionsFullRow.value ? 'el-form-query__actions--full-row' : '']}>
          {slots.actions?.()}
        </div>
      </div>
    );
  },
});
