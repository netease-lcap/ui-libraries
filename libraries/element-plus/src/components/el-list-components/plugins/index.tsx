/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import _ from 'lodash';
import { type Ref } from 'vue';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import { useControllableValue, useMemo, useCallback, useRef, useEffect,useRender } from '@/plugins/hooks';
import { ElPagination } from '@/index';
import { useRequestDataSource, useHandleMapField } from '@/plugins/common/dataSource';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import { addClass } from '@/utils';

const formatResult = _.cond([
  [Array.isArray, (list) => ({ list, total: list.length, pageLocal: true })],
  [_.conforms({ list: _.isArray }), _.identity],
  [_.stubTrue, _.constant({ list: [], total: 0, pageLocal: true })],
]) as (Target: { list: unknown }) => {
  list: any;
  total: number;
  pageLocal?: boolean;
};
const loadMoreFormatResult = (pagination: 'autoMore' | 'page' | 'none') => {
  return _.match(pagination)
    .with('autoMore', () => (data, resultData) => {
      return {
        list: [..._.get(resultData, 'list', []), ..._.get(data, 'list', [])],
        total: data.total,
        pageLocal: true,
      };
    })
    .with('page', () => (data) => data)
    .otherwise(() => (data) => data);
};
const listComponentsBasicAccumulate = new PluginAccumulateTypes<
  nasl.ui.ElListComponentsOptions<any, any, any, any, any>,
  object
>();

export default listComponentsBasicAccumulate
  .addPlugin({
    name: 'handleInitRender',
    handle: (props) => {
      const target = useRef(null);
      const model = useRef(props.get('model'));
      const deletePropsList = props
        .get($deletePropsList)
        .concat(
          $dataSourceDeleteField,
          'setValue',
          'clickFn',
          'setCurrentPage',
          'setPageSize',
          'pageProps',
          'target',
        );
      const formMode = props.get('formMode');
      const render = useRender(
        (props, { attrs, slots }) => {
          return formMode ? (
            <el-form style={{ width: '100%' }} model={model.value}>
              <div ref={target} {...attrs} {...props}>
                {slots.default?.()}
              </div>
            </el-form>
          ) : (
            <div ref={target} {...attrs} {...props}>
              {slots.default?.()}
            </div>
          );
        },
        [formMode],
      );
      return {
        render,
        model,
        target,
        [$deletePropsList]: deletePropsList,
      };
    },
  })
  .addPlugin({
    name: 'handlePageState',
    handle: (props) => {
      const emit = props.get('emit');
      const ref = props.get('ref');
      const [currentPage, setCurrentPage, currentPageProps] = useControllableValue(props, {
        defaultValuePropName: 'defaultCurrentPage',
        defaultValue: 1,
        valuePropName: 'currentPage',
        onChange: (currentPage, pageSize = {}) => {
          emit('sync:state', 'currentPage', currentPage);
          _.attempt(ref?.reload, { currentPage, ...pageSize });
        },
      });
      const [pageSize, setPageSize, pageSizeProps] = useControllableValue(props, {
        defaultValuePropName: 'defaultPageSize',
        defaultValue: 10,
        valuePropName: 'pageSize',
        onChange: (pageSize) => {
          emit('sync:state', 'pageSize', pageSize);
          setCurrentPage(1, { pageSize });
        },
      });
      const pageSizesProps = props.get('pageSizes');
      const pageSizes = useMemo(() => {
        const jsonPageSizes = _.isString(pageSizesProps) ? _.attempt(JSON.parse, pageSizesProps) : pageSizesProps;
        return _.isArray(jsonPageSizes) ? jsonPageSizes : [10, 20, 50];
      }, [pageSizesProps]);

      useMemo(() => {
        emit('sync:state', 'currentPage', currentPage);
        emit('sync:state', 'pageSize', pageSize);
        return null;
      }, []);
      return {
        pageProps: {
          ...currentPageProps,
          ...pageSizeProps,
          pageSizes,
        },
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        pageSizes,
      };
    },
  })
  .addPlugin({
    name: 'handleSelect',
    handle(props) {
      const selection = props.get('selectionMode');
      const [value, setValue, valueProps] = useControllableValue(props);
      const classProps = props.get('class');
      const clearable = props.get('clearable');
      const className = useMemo(() => {
        return addClass(classProps, {
          selection: selection !== 'none',
        });
      }, [classProps, selection]);
      const clickFn = useCallback(
        (val) => {
          const isSelectedValue = _.includes(_.concat([], value), val);
          const newValue = _.match({ selection, clearable, isSelectedValue })
            .when(_.matches({ selection: 'single', clearable: true, isSelectedValue: true }), () => undefined)
            .when(_.matches({ selection: 'multiple', clearable: true, isSelectedValue: true }), () => _.without(value, val))
            .when(_.matches({ selection: 'single', isSelectedValue: false }), () => val)
            .when(_.matches({ selection: 'multiple', isSelectedValue: false }), () => _.concat(value, val).filter(Boolean))
            .otherwise(() => value);
          setValue(newValue);
        },
        [clearable, value, setValue, selection],
      );

      return {
        ...valueProps,
        class: className,
        value,
        setValue,
        clickFn,
      };
    },
  })
  .addPlugin({
    name: 'handleDataSource',
    handle(props) {
      const dataSource = props.get('dataSource');
      const model = props.get('model');
      const formMode = props.get('formMode');
      const currentPage = props.get('currentPage');
      const pagination = props.get('pagination', 'none');
      const pageSize = props.get('pageSize');
      const pageProps = props.get('pageProps');
      const selection = props.get('selectionMode');
      const ref = props.get('ref');
      const slots = props.get('slots');
      const value = props.get('value');
      const onClick = props.get('clickFn');
      const valueField = props.get('idField') || 'value';
      const textField = props.get('textField') || 'label';
      const defaultParams = [{ currentPage, pageSize, pagination: pagination !== 'none' }];
      const {
        data: resultData = { list: [], total: 0 },
        run,
        loading,
      } = useRequestDataSource(dataSource, {
        defaultParams,
        formatResult: (data, resultData) => loadMoreFormatResult(pagination)(formatResult(data), resultData),
      });
      const reload = (params) => {
        run({ currentPage, pageSize, pagination: pagination !== 'none', ...params });
      };
      const data = useHandleMapField({
        valueField,
        textField,
        dataSource: resultData.list as any,
      });
      const dataList = formMode ? model.value : data;
      const selfRef = _.assign(ref, { reload, data, getData: () => data });
      const defaultSlots = useCallback(() => {
        return _.map(dataList, (item, index) => {
          return (
            <div
              onClick={() => onClick(_.get(item, 'value', item))}
              class={addClass('el-list-components__frag', {
                'is-selected': _.includes(_.concat([], value), _.get(item, 'value', item)),
                'is-selectable': selection && selection !== 'none',
              })}
            >
              {/* {_.includes(value, _.get(item, 'value', item))} */}
              {_.isFunction(slots.default) ? (
                slots.default({
                  item: item?.itemSource ?? item,
                  index,
                  selected: _.includes(_.concat([], value), _.get(item, 'value', item)),
                } as any)
              ) : (
                <div style={{ width: '100%' }} class="el-list-components__default-text">
                  {item.label}
                </div>
              )}
            </div>
          );
        });
      }, [data, slots.default, value, selection]);
      return {
        dataSource,
        ref: selfRef,
        pageProps: _.assign(pageProps, { total: resultData.total }),
        loading,
        slots: _.assign({}, slots, { default: defaultSlots }),
      };
    },
  })
  .addPlugin({
    name: 'handlePaginationProps',
    handle(props) {
      const pagination = props.get('pagination');
      const pageProps = props.get('pageProps');
      const showTotal = props.get('showTotal');
      const showJumper = props.get('showJumper');
      const onPageChange = props.get('onPageChange', () => {});
      const layout = `${showTotal ? 'total' : ''},prev, pager, next,${showJumper ? 'jumper' : ''},sizes,`;
      return {
        pageProps: {
          ...pageProps,
          layout,
          onPageChange,
        },
        pagination,
      };
    },
  })
  .addPlugin({
    name: 'handlePaginationRender',
    handle(props) {
      const Component = props.get('render');
      const render = useCallback((props, { attrs, slots }) => {
        return (
          <div style={{ ...props.style, display: 'flex', flexDirection: 'column' }}>
            <Component {...props} {...attrs} v-slots={slots} />
            {props.pagination === 'page' && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                <ElPagination {...props.pageProps} total={props.pageProps.total} />
              </div>
            )}
          </div>
        );
      }, []);
      return {
        render,
      };
    },
  })
  .addPlugin({
    name: 'handleinfiniteScroll',
    handle(props) {
      const target = props.get('target') as unknown as Ref<Element>;
      const setCurrentPage = props.get('setCurrentPage');
      const currentPage = props.get('currentPage');
      const currentPageRef = useRef(currentPage);
      currentPageRef.value = currentPage;
      const pagination = props.get('pagination');
      const className = props.get('class');
      useEffect(() => {
        if (!_.isElement(target.value) || pagination !== 'autoMore') {
          return () => {};
        }
        const scrollHandler = () => {
          const { scrollHeight, clientHeight, scrollTop } = target.value;
          if (scrollHeight - scrollTop - clientHeight <= 50) {
            setCurrentPage?.(currentPageRef.value + 1);
          }
        };
        target.value?.addEventListener('scroll', scrollHandler);
        return () => {
          target.value?.removeEventListener('scroll', scrollHandler);
        };
      }, [pagination]);
      return {
        class: addClass(className, {
          'el-list-components-infinite-scroll': pagination === 'autoMore',
        }),
      };
    },
  })
  .addPlugin({
    name: 'handleColumn',
    handle(props) {
      const columnProps = props.get('column');
      const equalWidth = props.get('equalWidth');
      const rowGap = props.get('rowGap');
      const columnGap = props.get('columnGap');
      const classNameProps = props.get('class');
      const styleProps = props.get('style');

      // 构建样式对象，只有当 column 大于 0 时才设置 CSS 变量
      const style = useMemo(
        () => _.assign({}, styleProps, {
            '--row-gap': `${rowGap || 0}px`,
            '--column-gap': `${columnGap || 0}px`,
            '--el-list-components-column': columnProps <= 0 ? 5 : columnProps,
          }),
        [styleProps, rowGap, columnGap, columnProps],
      );
      const className = useMemo(
        () => addClass(classNameProps, {
            'el-list-components-plus': true,
            isEqualWidth: equalWidth,
            isColumn: columnProps > 0,
          }),
        [classNameProps, equalWidth, columnProps],
      );
      return {
        style,
        class: className,
      };
    },
  });
