/* eslint-disable no-shadow */
import _ from 'lodash';
import { ElTabPane, TabsProps } from 'element-plus';
import { useControllableValue, useMemo, useEffect, useState, useCallback } from '@/plugins/hooks';
import { $router, $route, $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';
import { getPropsIcon } from '@/plugins/common/icon';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import { getRouteTabTitle } from '@/utils/route-meta';
import { addClass } from '@/utils';

type RouteTabItem = {
  name: string;
  title: string;
  fullPath: string;
};

const TabsAccumulate = new PluginAccumulateTypes<nasl.ui.ElTabsOptions<any, any>, TabsProps>();

function createTabFromRoute(routeInfo: any): RouteTabItem | null {
  if (!routeInfo?.fullPath && !routeInfo?.path) return null;
  const fullPath = routeInfo.fullPath || routeInfo.path;
  const title = getRouteTabTitle(routeInfo) || fullPath;
  return {
    name: fullPath,
    title,
    fullPath,
  };
}

export default TabsAccumulate.addPlugin({
  name: 'handleDataSource',
  handle(props) {
    const routeLinkage = props.get('routeLinkage');
    const dataConfig = props.get('dataSource');
    const textField = props.get('titleField', 'label');
    const valueField = props.get('valueField') || 'value';
    const slots = props.get('slots');
    const deletePropsList = props.get($deletePropsList).concat($dataSourceDeleteField);
    const ref = props.get('ref');

    const onBefore = props.get('onBefore', () => {});
    const onSuccess = props.get('onSuccess', () => {});
    const onTabClick = props.get('onTabClick') ?? (() => {});

    const {
      data,
      run: reload,
      loading,
    } = useRequestDataSource(routeLinkage ? null : dataConfig, {
      onBefore: (params) => _.attempt(onBefore, params),
      onSuccess: (data, params) => _.attempt(onSuccess, data, params),
    });
    const dataSource = useHandleMapField({
      textField,
      valueField,
      value: 'name',
      dataSource: useFormatDataSource(data),
    });
    const selfRef = useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);

    const [, , updateVal] = useControllableValue(props);

    const dataSourceSlots = useMemo(
      () => (routeLinkage || _.isNil(dataConfig)
          ? {}
          : {
              default: () => _.map(dataSource, (item) => (
                <ElTabPane
                  {...item}
                  v-slots={{
                      label: () => slots?.label?.({ item: item?.itemSource ?? item } as any),
                      default: () => slots?.content?.({ item: item?.itemSource ?? item } as any),
                    }}
                />
                )),
            }),
      [routeLinkage, dataConfig, dataSource, textField, valueField, slots],
    );

    if (routeLinkage) {
      return {};
    }

    return {
      [$deletePropsList]: deletePropsList,
      ref: selfRef,
      loading,
      data,
      slots: _.assign(slots, dataSourceSlots),
      ...updateVal,
      onTabClick: _.wrap(onTabClick, (fn, ...args) => {
        _.attempt(fn, ...args);
      }),
    };
  },
})
  .addPlugin({
    name: 'handleValue',
    handle(props) {
      const routeLinkage = props.get('routeLinkage');
      const beforeChange = props.get('onBeforeChange', () => true);
      const afterChange = props.get('onAfterChange', () => {});
      const routerMeta = props.get($router);
      const router = props.get('router');
      const [, , valueProps] = useControllableValue(props, {
        beforeChange,
        afterChange,
        onChange: (value) => {
          if (!routeLinkage && router) {
            routerMeta.push(value);
          }
        },
      });
      if (routeLinkage) {
        return {};
      }
      return {
        ...valueProps,
      };
    },
  })
  .addPlugin({
    name: 'handleRouteLinkage',
    handle(props) {
      const routeLinkage = props.get('routeLinkage');
      const maxTabCount = props.get('maxTabCount') ?? 10;
      const showInDesigner = props.get('showInDesigner');
      const slots = props.get('slots');
      const className = props.get('class');
      const router = props.get($router);
      const route = props.get($route);
      const closable = props.get('closable');
      const onTabChangeProps = props.get('onTabChange', () => {});
      const onEditProps = props.get('onEdit', () => {});
      const onBeforeRemove = props.get('onBeforeRemove', () => {});
      const onAfterRemove = props.get('onAfterRemove', () => {});
      const beforeChange = props.get('onBeforeChange', () => true);
      const afterChange = props.get('onAfterChange', () => {});
      const deletePropsList = props.get($deletePropsList);

      const enabled = Boolean(routeLinkage) && !showInDesigner;
      const initialTab = enabled ? createTabFromRoute(route) : null;
      const [tabList, setTabList] = useState<RouteTabItem[]>(initialTab ? [initialTab] : []);
      const [value, setValue, valueProps] = useControllableValue(props, {
        defaultValue: initialTab?.name,
        beforeChange,
        afterChange,
      });

      const upsertTab = useCallback(
        (routeInfo: any) => {
          const nextTab = createTabFromRoute(routeInfo);
          if (!nextTab) return;

          setTabList((prev) => {
            const exists = prev.find((item) => item.name === nextTab.name);
            let next = exists
              ? prev.map((item) => (item.name === nextTab.name ? { ...item, ...nextTab } : item))
              : prev.concat(nextTab);

            const limit = Number(maxTabCount) || 10;
            if (next.length > limit) {
              next = next.slice(1);
            }
            return next;
          });
          setValue(nextTab.name);
        },
        [maxTabCount, setValue],
      );

      useEffect(() => {
        if (!enabled) {
          return () => {};
        }

        const removeAfterEach = router?.afterEach?.((to) => {
          upsertTab(to);
        });

        return () => {
          _.attempt(removeAfterEach);
        };
      }, [enabled, router, upsertTab]);

      const removeTab = useCallback(
        (paneName: string) => {
          setTabList((prev) => {
            const index = prev.findIndex((item) => item.name === paneName);
            if (index < 0) return prev;
            const next = prev.filter((item) => item.name !== paneName);

            if (value === paneName) {
              const fallback = next[index] || next[index - 1] || next[0];
              if (fallback) {
                setValue(fallback.name);
                router?.push?.(fallback.fullPath);
              } else {
                setValue(undefined);
              }
            }
            return next;
          });
        },
        [router, setValue, value],
      );

      if (!enabled) {
        return {};
      }

      return {
        ...valueProps,
        modelValue: value,
        closable: closable ?? true,
        addable: false,
        editable: false,
        class: addClass(className, 'el-tabs--route-linkage'),
        [$deletePropsList]: deletePropsList.concat(['routeLinkage', 'maxTabCount']),
        slots: _.assign({}, slots, {
          default: () => tabList.map((item) => (
            <ElTabPane key={item.name} name={item.name} label={item.title} closable={closable ?? true} />
          )),
        }),
        onTabChange: _.wrap(onTabChangeProps, (fn, name) => {
          _.attempt(fn, name);
          if (name && name !== route?.fullPath && name !== route?.path) {
            router?.push?.(name);
          }
        }),
        onEdit: _.wrap(onEditProps, (fn, paneName, action) => {
          if (action === 'remove') {
            _.attempt(onBeforeRemove, { value: paneName });
            removeTab(paneName as string);
          }
          _.attempt(fn, { value: paneName, action });
          if (action === 'remove') {
            _.attempt(onAfterRemove, { value: paneName });
          }
        }),
      };
    },
  })
  .addPlugin({
    name: 'handleAddIcon',
    handle(props) {
      const addIcon = props.get('addIcon');
      const slots = props.get('slots');
      const onEdit = props.get('onEdit', () => {});
      const onBeforeRemove = props.get('onBeforeRemove', () => {});
      const onAfterRemove = props.get('onAfterRemove', () => {});
      const routeLinkage = props.get('routeLinkage');
      if (routeLinkage) {
        return {};
      }
      return {
        slots: _.assign(slots, {
          'add-icon': () => getPropsIcon({ name: addIcon }),
        }),
        onEdit: _.wrap(onEdit, (fn, paneName, action) => {
          if (action === 'remove') {
            _.attempt(onBeforeRemove, { value: paneName });
          }
          _.attempt(fn, { value: paneName, action });
          if (action === 'remove') {
            _.attempt(onAfterRemove, { value: paneName });
          }
        }),
      };
    },
  });
