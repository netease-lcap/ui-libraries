import _ from 'lodash';

export const componentLog = (compDebugId: string | null, pluginHook: any, immutableState: any, result: any) => {
  if (!_.isString(compDebugId)) {
    return null;
  }
  if (immutableState.get('data-ref-id') !== compDebugId) {
    return null;
  }
  const name = _.isFunction(pluginHook) ? _.get(pluginHook, 'fnName') : _.get(pluginHook, 'name');
  console.groupCollapsed(name);
  console.log('params', immutableState.delete('ref').toJS());
  console.log('result', result);
  console.log('nextParams', immutableState.merge(result).delete('ref').toJS());
  console.groupEnd();
  return null;
};
