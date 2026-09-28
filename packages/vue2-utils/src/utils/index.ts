import { get, set } from 'lodash';

// list to tree
export function listToTree(data: any[], options: {
  valueField: string;
  parentField: string;
  childrenField: string;
}) {
  const { valueField, parentField, childrenField } = options;
  const map: Record<string | number, any> = {};

  data.forEach((item) => {
    const children = get(item, childrenField);
    if (children) {
      set(item, childrenField, []);
    }

    const id = get(item, valueField);
    if (id) {
      map[id] = item;
    }
  });

  const tree: any[] = [];

  data.forEach((item) => {
    const parentId = get(item, parentField);
    const parent = map[parentId];

    if (!parent) {
      tree.push(item);
    } else {
      let children = get(parent, childrenField);

      if (!children) {
        children = [];
        set(parent, childrenField, children);
      }

      children.push(item);
    }
  });

  return tree;
}
