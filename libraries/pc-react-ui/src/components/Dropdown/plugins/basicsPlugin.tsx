import React from 'react';
import _ from 'lodash';
import { Space } from 'antd';
import { MenuItem, Icon } from '@/index';
import {
  useRequestDataSource, useHandleMapField, useFormatDataSource,
} from '@/plugins/common/dataSource';
import { useHandleLink } from '@/plugins/common/index';
import { RouterContext } from '@/components/Router';
import { $deletePropsList } from '@/plugins/constants';

export function useHandleDataSource(props) {
  const dataSourceProps = props.get('dataSource');
  const textField = props.get('textField', 'label');
  const valueField = props.get('valueField', 'value');
  const deletePropsList = props.get($deletePropsList, []).concat(['textField', 'valueField', 'dataSource']);
  const ref = props.get('ref');
  const { data, run: reload, loading } = useRequestDataSource(dataSourceProps);
  const dataSourceFormat = useFormatDataSource(data);
  const dataSource = useHandleMapField({ textField, valueField, dataSource: dataSourceFormat });
  const selfRef = React.useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);
  const dataSourceResult = _.isEmpty(dataSource) ? {} : { items: dataSource };
  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    loading,
    ...dataSourceResult,
  };
}

export function useMergeMenu(props) {
  const { useNavigate } = React.useContext(RouterContext);
  const navigate = useNavigate?.();
  const fragment = props.get('menuItem');
  const menuItem = React.Children.toArray(_.get(fragment, 'props.children', []));
  const handleLink = useHandleLink();
  const ItemsProps = _.filter(menuItem, (item) => React.isValidElement(item) && item.type === MenuItem)?.map((item) => {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const { icon } = item?.props;
    const onClickPorps = item.props?.onClick;

    return {
      key: item.props.destination ?? item.props.path,
      ..._.omit(item.props, 'children'),
      ..._.isNil(icon) ? {} : { icon: <Icon name={icon} /> },
      onClick: _.wrap(onClickPorps, (fn, arg) => {
        _.attempt(fn, arg);
        handleLink(arg.key, item.props?.target);
      }),
    };
  });
  const menu = props.get('menu');
  const items = props.get('items', ItemsProps);
  return {
    menu: {
      ...menu,
      items,
    },
  };
}
useMergeMenu.order = 6;
export function useHandleChildren(props) {
  const BaseComponent = props.get('render');
  const render = React.useCallback(React.forwardRef((localProps: any, ref) => {
    return (
      <BaseComponent {...localProps} ref={ref}>
        <Space>
          {localProps.children}
        </Space>
      </BaseComponent>
    );
  }), [BaseComponent]);
  return {
    render,
  };
}
