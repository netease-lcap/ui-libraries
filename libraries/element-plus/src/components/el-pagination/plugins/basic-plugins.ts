import _ from 'lodash';
import { PaginationProps } from 'element-plus';
import { useMemo } from '@/plugins/hooks';
import { PluginAccumulateTypes } from '@/plugins/accumulate';

const PaginationBasicAccumulate = new PluginAccumulateTypes<nasl.ui.ElPaginationOptions, PaginationProps>();
export default PaginationBasicAccumulate.addPlugin({
  name: 'handlePageSizes',
  handle(props) {
    const pageSizesProps = props.get('pageSizes');
    const pageSizes = useMemo(() => {
      const jsonPageSizes = _.isString(pageSizesProps) ? _.attempt(JSON.parse, pageSizesProps) : pageSizesProps;
      return _.isArray(jsonPageSizes) ? jsonPageSizes : [10, 20, 50];
    }, [pageSizesProps]);
    return {
      pageSizes,
    };
  },
})
  .addPlugin({
    name: 'handleOnChange',
    handle(props) {
      const onChange = props.get('onChange');
      return {
        onChange: (currentPage: number, pageSize: number) => onChange({ currentPage, pageSize }),
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
  });
