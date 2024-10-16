import { computed, toRefs } from '@vue/composition-api';
import { ElBaseTableProps } from '../type';
import { ClassName, Styles } from '../../common';
import useClassName from './useClassName';
import useCommonClassName from '../../hooks/useCommonClassName';
import { useConfig } from '../../config-provider/useConfig';

export function formatCSSUnit(unit: string | number) {
  if (!unit) return unit;
  return isNaN(Number(unit)) ? unit : `${unit}px`;
}

export default function useStyle(props: ElBaseTableProps) {
  const {
    bordered, stripe, hover, verticalAlign, height, maxHeight, tableContentWidth,
  } = toRefs(props);

  const { tableBaseClass, tableAlignClasses } = useClassName();
  const { sizeClassNames } = useCommonClassName();
  const { global } = useConfig('table', props.locale);
  const tableSize = computed(() => props.size ?? global.value.size);

  const tableClasses = computed<ClassName>(() => [
    tableBaseClass.table,
    {
      [sizeClassNames[tableSize.value]]: tableSize.value !== 'medium',
      [tableBaseClass.bordered]: bordered.value,
      [tableBaseClass.striped]: stripe.value,
      [tableBaseClass.hover]: hover.value,
      [tableBaseClass.loading]: props.loading,
      [tableBaseClass.affixedHeader]: props.headerAffixedTop,
      [tableBaseClass.rowspanAndColspan]: props.rowspanAndColspan,
      [tableBaseClass.horizontalBarAffixed]: props.horizontalScrollAffixedBottom,
      [tableBaseClass.footerAffixed]: props.footerAffixedBottom,
      [tableAlignClasses[verticalAlign.value]]: verticalAlign.value !== 'middle',
    },
  ]);

  const tableContentStyles = computed<Styles>(() => ({
    height: formatCSSUnit(height.value),
    maxHeight: formatCSSUnit(maxHeight.value),
  }));

  const tableElementStyles = computed<Styles>(() => ({
    width: formatCSSUnit(tableContentWidth.value),
  }));

  return {
    sizeClassNames,
    tableClasses,
    tableElementStyles,
    tableContentStyles,
  };
}
