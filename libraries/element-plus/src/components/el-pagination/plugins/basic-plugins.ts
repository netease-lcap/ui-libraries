import _ from 'lodash';
import { PaginationProps } from 'element-plus';
import { useEffect, useMemo, useControllableValue } from '@/plugins/hooks';
import { PluginAccumulateTypes } from '@/plugins/accumulate';

const PaginationBasicAccumulate = new PluginAccumulateTypes<nasl.ui.ElPaginationOptions, PaginationProps>();
export default PaginationBasicAccumulate.addPlugin({
  name: 'handlePageSizes',
  handle(props) {
    const pageSizesProps = props.get('pageSizes');
    const [, , valueProps] = useControllableValue(props, {
      valuePropName: 'currentPage',
    });
    const pageSizes = useMemo(() => {
      const jsonPageSizes = _.isString(pageSizesProps) ? _.attempt(JSON.parse, pageSizesProps) : pageSizesProps;
      return _.isArray(jsonPageSizes) ? jsonPageSizes : [10, 20, 50];
    }, [pageSizesProps]);
    return {
      ...valueProps,
      pageSizes,
    };
  },
})
  .addPlugin({
    name: 'handleOnChange',
    handle(props) {
      const onChange = props.get('onChange', () => {});
      return {
        onChange: (currentPage: number, pageSize: number) => _.attempt(onChange, { currentPage, pageSize }),
      };
    },
  })
  .addPlugin({
    name: 'handleTotal',
    type: 'ide',
    handle(props) {
      return {
        total: 50,
      };
    },
  })
  .addPlugin({
    name: 'handleSyncState',
    handle(props) {
      console.log(props.toJS(),'tojs==');
      const emit = props.get('emit');
      const total = props.get('total');
      const pageSize = props.get('pageSize');
      const currentPage = props.get('currentPage');
      const disabled = props.get('disabled');
      useEffect(() => {
        emit('sync:state', 'total', total);
        emit('sync:state', 'pageSize', pageSize);
        emit('sync:state', 'currentPage', currentPage);
        emit('sync:state', 'disabled', disabled);
      }, [total, pageSize, currentPage, disabled]);
      return {};
    },
  });
