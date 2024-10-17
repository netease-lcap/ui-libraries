import isString from 'lodash/isString';
import { computed, SetupContext } from '@vue/composition-api';
import { CreateElement } from 'vue';
import { useElNodeJSX } from '../../hooks/tnode';
import { ElPrimaryTableProps } from '../type';
import Loading from '../../loading';
import useClassName from './useClassName';
import { useConfig } from '../../config-provider/useConfig';

export default function useAsyncLoading(props: ElPrimaryTableProps, context: SetupContext) {
  const renderElNode = useElNodeJSX();
  const { global } = useConfig('table', props.locale);
  const { isLoadingClass, isLoadMoreClass, asyncLoadingClass } = useClassName();

  const classes = computed(() => [
    asyncLoadingClass,
    {
      [isLoadingClass]: props.asyncLoading === 'loading',
      [isLoadMoreClass]: props.asyncLoading === 'load-more',
    },
  ]);

  function onLoadClick() {
    if (typeof props.asyncLoading !== 'string') return;
    props.onAsyncLoadingClick?.({ status: props.asyncLoading });
    // Vue3 ignore next line
    context.emit('async-loading-click', { status: props.asyncLoading });
  }

  // eslint-disable-next-line
  function renderAsyncLoading(h: CreateElement) {
    const asyncLoadingNode = renderElNode('asyncLoading');
    if (isString(asyncLoadingNode)) {
      const { asyncLoading } = props;
      const loadingText = {
        'load-more': global.value.loadingMoreText,
        loading: global.value.loadingText,
      }[String(asyncLoading)];
      return (
        <div class={classes.value} onClick={onLoadClick}>
          {<Loading indicator={asyncLoading === 'loading'} loading={!!asyncLoading} size="small" text={loadingText} />}
        </div>
      );
    }
    if (![null, false, undefined].includes(asyncLoadingNode)) {
      return (
        <div class={classes.value} onClick={onLoadClick}>
          {asyncLoadingNode}
        </div>
      );
    }
    return null;
  }
  return {
    renderAsyncLoading,
  };
}
