/* 组件功能扩展插件 */
import _ from 'lodash';
import { type AnchorProps } from 'element-plus';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import { ElAnchorLink } from '@/components/el-anchor/index';
import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';
import { useMemo } from '@/plugins/hooks';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import { DataSourceCollectionType } from '@/types';

const AnchorAccumulate = new PluginAccumulateTypes<
  DataSourceCollectionType,
  nasl.ui.ElAnchorOptions<any, any>,
  AnchorProps
>();
export function handleDataSource(props) {
  const dataConfig = props.get('dataSource');
  const hrefField = props.get('hrefField') || 'href';
  const slots = props.get('slots');
  const deletePropsList = props.get($deletePropsList).concat($dataSourceDeleteField);
  const ref = props.get('ref');
  const { data, run: reload, loading } = useRequestDataSource(dataConfig);
  const dataSource = useHandleMapField({
    dataSource: useFormatDataSource(data),
    fieldsMap: {
      href: hrefField,
    },
  });
  const selfRef = useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);

  const dataSourceSlots = useMemo(
    () => (_.isNil(dataConfig)
        ? {}
        : {
            default: () => _.map(dataSource, (item) => (
              <ElAnchorLink
                {...item}
                href={_.get(item, hrefField, '')}
                v-slots={{
                    default: () => slots.content?.({ item }),
                  }}
              />
              )),
          }),
    [dataSource, slots, dataConfig],
  );

  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    loading,
    data: dataSource,
    slots: _.assign(slots, dataSourceSlots),
  };
}
export default AnchorAccumulate.addPlugin({
  name: 'handleDataSource',
  handle: (props, context) => {
    const dataConfig = props.get('dataSource');
    const hrefField = props.get('hrefField') || 'href';
    const slots = props.get('slots');
    const deletePropsList = props.get($deletePropsList).concat($dataSourceDeleteField);
    const ref = props.get('ref');
    const { data, run: reload, loading } = useRequestDataSource(dataConfig);
    const dataSource = useHandleMapField({
      dataSource: useFormatDataSource(data),
      fieldsMap: {
        href: hrefField,
      },
    });
    const selfRef = useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);

    const dataSourceSlots = useMemo(
      () => (_.isNil(dataConfig)
          ? {}
          : {
              default: () => _.map(dataSource, (item) => (
                <ElAnchorLink
                  {...item}
                  href={_.get(item, hrefField, '')}
                  v-slots={{
                      default: () => slots.content?.({ item } as any),
                    }}
                />
                )),
            }),
      [dataSource, slots, dataConfig],
    );

    return {
      [$deletePropsList]: deletePropsList,
      ref: selfRef,
      loading,
      data: dataSource,
      slots: _.assign(slots, dataSourceSlots),
    };
  },
});
