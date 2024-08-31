import { get, set } from 'lodash';

// list to tree
export function listToTree(data: any[], options: {
  valueField: string;
  parentField: string;
  childrenField: string;
}) {
  const { valueField, parentField, childrenField } = options;
  const map: Record<string | number, any> = data.reduce((acc, item) => {
    const id = get(item, valueField);
    if (id) {
      acc[id] = item;
    }

    if (!get(item, childrenField)) {
      set(item, childrenField, []);
    }

    return acc;
  }, {});

  const tree: any[] = [];

  data.forEach((item) => {
    const parentId = get(item, parentField);
    const parent = map[parentId];

    if (!parent) {
      tree.push(item);
    } else {
      const children = get(parent, childrenField);
      children.push(item);
    }
  });

  return tree;
}
