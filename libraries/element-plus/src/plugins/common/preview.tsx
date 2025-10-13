import _ from 'lodash';
import dayjs from 'dayjs';
import { useCallback, useMemo, useRef } from '@/plugins/hooks';
import { $formProvide } from '@/components/el-form/constants';

export function getIsPreview(props) {
  const inject = props.get('inject');
  const { preview: injectPreview = false } = inject?.[$formProvide] ?? {};
  const propPreview = props.get('preview');
  const preview = useMemo(() => propPreview ?? injectPreview, [injectPreview, propPreview]);
  return preview;
}

export function getRender(Component, previewRender, isPreview) {
  const insRef = useRef({});
  const IsPreviewRender = isPreview && _.isFunction(previewRender);
  const render = useCallback((insProps, { attrs, slots }) => {
    return previewRender(insProps, { attrs, slots });
  }, []);

  return {
    render: IsPreviewRender ? render : Component,
    insRef,
  };
}

export function getListPreviewText(
  textField = 'label',
  valueField = 'value',
  dataSource = [],
  list = [] as any,
  gap = ', ',
) {
  if (!_.isArray(list) || !_.isArray(dataSource) || !list.length || !dataSource.length) {
    return '-';
  }
  return _.map(list, (item) => _.get(
      _.find(dataSource, (dataItem) => _.get(dataItem, valueField) === item),
      textField,
      '-',
    )).join(gap);
}

export function getTreePreviewText(
  textField = 'label',
  valueField = 'value',
  dataSource = [],
  list = [] as any,
  gap = ', ',
) {
  if (!_.isArray(list) || !_.isArray(dataSource) || !list.length || !dataSource.length) {
    return '-';
  }
  const valueMap = new Map();
  const buildMap = (nodes) => nodes.forEach((node) => {
      // valueMap.set(_.get(node, valueField), _.get(node, textField));
      valueMap.set(node.value, node.label);
      node.children && buildMap(node.children);
    });
  buildMap(dataSource);

  return (
    list
      .map((v) => valueMap.get(v) ?? v)
      .filter(Boolean)
      .join(gap) || '-'
  );
}

export function getFormatDateOrTime(val, format) {
  return _.isNil(val) ? '_' : dayjs(val).format(format);
}
