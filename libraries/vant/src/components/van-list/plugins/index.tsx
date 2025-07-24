import _ from 'lodash';
import { List as VantList, PullRefresh as VantPullRefresh } from 'vant';
import { defineComponent, ref, computed, watch, nextTick } from 'vue';
import { $deletePropsList } from '@/plugins/constants';

// 格式化数据源结果
function formatDSResult(result) {
  if (!result) {
    return [];
  }
  if (typeof result === 'string') {
    let list = [];
    try {
      list = formatDSResult(JSON.parse(result));
    } catch (err) {
      console.error(err);
    }
    return list;
  }
  if (Array.isArray(result)) {
    return result;
  }
  if (result && Array.isArray(result.list)) {
    return result.list;
  }
  if (result && Array.isArray(result.content)) {
    return result.content;
  }
  return [];
}

// 生成唯一key
function getItemKey(item, index) {
  if (item && typeof item === 'object') {
    return item.id || item.key || item.value || `item-${index}`;
  }
  return `item-${index}`;
}

export function handleDataSource(props) {
  const dataSource = props.get('dataSource');
  const slots = props.get('slots');
  const ref = props.get('ref');
  const loading = props.get('loading', false);
  const finished = props.get('finished', false);
  const error = props.get('error', false);
  const onLoad = props.get('onLoad');
  const onRefresh = props.get('onRefresh');
  const pullRefresh = props.get('pullRefresh', false);

  const deletePropsList = props
    .get($deletePropsList, [])
    .concat(['dataSource']);

  const listData = ref([]);
  const selfRef = ref({});

  // 处理数据源更新
  const updateData = async () => {
    if (typeof dataSource === 'function') {
      try {
        const res = await dataSource({
          page: 1,
          size: 1000,
        });
        listData.value = formatDSResult(res);
      } catch (error) {
        console.error(error);
      }
    } else {
      listData.value = formatDSResult(dataSource);
    }
  };

  // 监听数据源变化
  watch(() => dataSource, updateData, { immediate: true, deep: true });

  // 重新加载方法
  const reload = () => {
    updateData();
  };

  // 扩展 ref
  Object.assign(selfRef.value, ref, { reload, data: listData });

  // 处理加载事件
  const handleLoad = () => {
    if (loading || finished || error) return;
    onLoad?.();
  };

  // 处理刷新事件
  const handleRefresh = () => {
    onRefresh?.();
  };

  // 渲染列表内容
  const renderContent = () => {
    if (pullRefresh) {
      return (
        <VantPullRefresh onRefresh={handleRefresh}>
          <VantList onLoad={handleLoad}>
            {listData.value.map((item, index) => (
              <div key={getItemKey(item, index)} class="van-list__item">
                {slots.default?.({ item, index })}
              </div>
            ))}
          </VantList>
        </VantPullRefresh>
      );
    }

    return (
      <VantList onLoad={handleLoad}>
        {listData.value.map((item, index) => (
          <div key={getItemKey(item, index)} class="van-list__item">
            {slots.default?.({ item, index })}
          </div>
        ))}
      </VantList>
    );
  };

  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    render: renderContent,
  };
}

handleDataSource.order = 1; 