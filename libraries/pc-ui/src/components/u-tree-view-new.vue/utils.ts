import { get as _get } from 'lodash';

function forEachTreeData<T>(
  data: T[],
  { childrenField, parent }: { childrenField: string; parent?: T },
  callback: (item: T, p: T | undefined) => void,
) {
  data.forEach((item) => {
    const children = _get(item, childrenField);
    if (Array.isArray(children) && children.length > 0) {
      forEachTreeData(children, { childrenField, parent: item }, callback);
    }

    callback(item, parent);
  });
}

export function addChildrenValues<T, V>(
  item: T,
  checkList: Set<V>,
  { childrenField, valueField, disabledField }: { childrenField: string; valueField: string; disabledField: string },
) {
  const children = _get(item, childrenField);

  if (!Array.isArray(children) || children.length === 0) {
    return;
  }

  children.forEach((it) => {
    const disabled = _get(it, disabledField);
    if (disabled) {
      return;
    }

    const value = _get(it, valueField);
    checkList.add(value);

    addChildrenValues(it, checkList, { childrenField, valueField, disabledField });
  });
}

export function removeChildrenValues<T, V>(
  item: T,
  checkList: Set<V>,
  { childrenField, valueField, disabledField }: { childrenField: string; valueField: string; disabledField: string },
) {
  const children = _get(item, childrenField);

  if (!Array.isArray(children) || children.length === 0) {
    return;
  }

  children.forEach((it) => {
    const disabled = _get(it, disabledField);
    if (disabled) {
      return;
    }

    const value = _get(it, valueField);
    checkList.delete(value);

    removeChildrenValues(it, checkList, { childrenField, valueField, disabledField });
  });
}

export function addParentValues<T, V>(
  parent: T | undefined,
  {
    dataMap,
    childrenField,
    valueField,
    disabledField,
  }: {
    dataMap: Record<any, undefined | { item: T; parent: T }>;
    childrenField: string;
    valueField: string;
    disabledField: string;
  },
  checkList: Set<V>,
  halfCheckList: Set<V>,
) {
  if (!parent) {
    return;
  }

  const children = _get(parent, childrenField) as T[];
  const val = _get(parent, valueField) as V;
  const checked = children.every((it) => _get(it, disabledField) || checkList.has(_get(it, valueField)));

  let pos = dataMap[val]?.parent;

  if (checked) {
    checkList.add(val);
    addParentValues(
      pos,
      {
        dataMap,
        childrenField,
        valueField,
        disabledField,
      },
      checkList,
      halfCheckList,
    );
    return;
  }

  halfCheckList.add(val);

  while (true) {
    if (!pos) {
      break;
    }

    const k = _get(pos, valueField) as V;
    halfCheckList.add(k);

    pos = dataMap[k]?.parent;
  }
}

const dataWeekMap = new WeakMap();
export function getDataMap<T, V extends string | number>(data: T[], { childrenField, valueField }) {
  let dataMap: Record<V, undefined | { item: T; parent: T }> = {} as any;
  if (dataWeekMap.has(data)) {
    dataMap = dataWeekMap.get(data);
  } else {
    forEachTreeData(data, { childrenField }, (item, parent) => {
      const id = _get(item, valueField);
      dataMap[id] = {
        item,
        parent,
      };
    });
    dataWeekMap.set(data, dataMap);
  }

  return dataMap;
}

export function isDisabled<T, V extends string | number>(
  data: T[],
  v: V,
  { valueField, childrenField, disabledField },
) {
  let disabled = false;
  const dataMap: Record<V, undefined | { item: T; parent: T }> = getDataMap(data, { valueField, childrenField });
  const { item } = dataMap[v] || {};
  let curItem = item;
  while (!disabled) {
    if (!curItem) {
      break;
    }

    disabled = _get(curItem, disabledField);
    curItem = dataMap[_get(curItem, valueField)]?.parent;
  }

  return disabled;
}

export function filterParentValues<T, V extends string | number>(
  data: T[],
  values: V[],
  { valueField, childrenField, disabledField },
) {
  if (!data || data.length === 0) {
    return values;
  }
  const dataMap: Record<V, undefined | { item: T; parent: T }> = getDataMap(data, { valueField, childrenField });

  return values.filter((v) => {
    if (!dataMap[v] || !dataMap[v].item || isDisabled(data, v, { valueField, childrenField, disabledField })) {
      return true;
    }

    return !(Array.isArray((dataMap[v].item as any).children) && (dataMap[v].item as any).children.length > 0);
  });
}

export function getCheckInfo<T, V extends string | number>(
  data: T[],
  values: V[],
  { valueField, childrenField, disabledField },
) {
  if (!data || data.length === 0) {
    return {
      checkList: [...values],
      checkedValues: values,
      halfCheckList: [],
    };
  }
  const dataMap: Record<V, undefined | { item: T; parent: T }> = getDataMap(data, { valueField, childrenField });

  const checkList = new Set<V>();
  const halfCheckList = new Set<V>();
  values.forEach((v) => {
    if (checkList.has(v)) {
      return;
    }

    checkList.add(v);

    if (!dataMap[v]) {
      return;
    }

    const { item, parent } = dataMap[v];

    const disabled = _get(item, disabledField);
    if (disabled) {
      return;
    }

    addChildrenValues(item, checkList, { childrenField, valueField, disabledField });
    addParentValues(
      parent,
      {
        dataMap,
        childrenField,
        valueField,
        disabledField,
      },
      checkList,
      halfCheckList,
    );
  });

  const list = [...checkList];
  return {
    checkedList: list,
    checkedValues: filterParentValues(data, list, { valueField, childrenField, disabledField }),
    halfCheckList: [...halfCheckList].filter((v) => !checkList.has(v)),
  };
}
