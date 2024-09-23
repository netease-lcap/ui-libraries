import type { VNode } from 'vue';

export const forEachVNodes = (vnodes: VNode[], callback?: (v: VNode, i: number, collection: VNode[]) => (boolean | void), endCallback?: (v: VNode) => void) => {
  for (let i = 0; i < vnodes.length; i++) {
    const vnode = vnodes[i];

    if (!vnode) {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (callback && callback(vnode, i, vnodes)) {
      return true;
    }

    let children: VNode[] = [];

    if (Array.isArray(vnode.children)) {
      children = vnode.children;
    } else if (vnode.componentOptions && Array.isArray(vnode.componentOptions.children)) {
      children = vnode.componentOptions.children;
    }

    if (children.length > 0) {
      const stoped = forEachVNodes(children, callback, endCallback);

      if (stoped) {
        return true;
      }
    }

    if (endCallback) {
      endCallback(vnode);
    }
  }

  return false;
};

export const findVNode = (vnodes: VNode[], callback: (v: VNode, i: number) => boolean) => {
  let vnode = null;
  let index = -1;
  let collection;

  forEachVNodes(vnodes, (v, i, c) => {
    if (callback(v, i)) {
      vnode = v;
      index = i;
      collection = c;
      return true;
    }

    return false;
  });
  return {
    vnode,
    index,
    collection,
  } as {
    vnode: VNode | null,
    index: number,
    collection: VNode[],
  };
};

export const findVModelNodeIndex = (vnodes: VNode[]) => {
  return vnodes.findIndex((v) => {
    return v.componentOptions
      && v.componentOptions.Ctor
      && (v.componentOptions.Ctor as any).options
      && typeof (v.componentOptions.Ctor as any).options.model === 'object';
  });
};

export const findVModelNode = (vnodes: VNode[]) => {
  const index = findVModelNodeIndex(vnodes);
  return vnodes[index];
};
