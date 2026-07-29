import _ from 'lodash';
import { ElDescriptionsItem, DescriptionProps } from 'element-plus';
import { cloneVNode, Comment } from 'vue';
import { $deletePropsList, $ide } from '@/plugins/constants';
import { useEffect, useMemo } from '@/plugins/hooks';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import { IIdePluginBase } from '@/types';

const DescriptionsBasicAccumulate = new PluginAccumulateTypes<
  nasl.ui.ElDescriptionsOptions,
  DescriptionProps & IIdePluginBase
>();

export default DescriptionsBasicAccumulate.addPlugin({
  name: 'handleNodePath',
  type: 'ide',
  handle: (props) => {
    const nodePath = props.get('data-nodepath');
    const myClass = props.get('class', '');
    const deletePropsList = props.get($deletePropsList).concat('data-nodepath');
    const nodeId = useMemo(() => _.uniqueId('Descriptions_'), []);
    useEffect(() => {
      const node = document.querySelector(`.${nodeId}`);
      const descriptionsElement = node?.closest('.el-descriptions');
      descriptionsElement?.setAttribute('data-nodepath', nodePath);
    }, []);

    return {
      class: `${myClass} ${nodeId}`,
      [$deletePropsList]: deletePropsList,
    };
  },
}).addPlugin({
  name: 'handleDescriptionsCell',
  handle(props) {
    const slots = props.get('slots');
    const defaultSlotVNode = slots?.default?.();

    const node = _.flatMap(defaultSlotVNode, (Vnode: any) => {
      if (Vnode.type === Comment) return [];
      const itemClass = _.uniqueId('Descriptions_');
      return [
        <ElDescriptionsItem
          {...Vnode.props}
          class-name={`${itemClass} ${_.get(Vnode, 'props.class', '')}`}
          label-class-name={`${itemClass} ${_.get(Vnode, 'props.labelClassName', '')}`}
          v-slots={_.omit(Vnode.children, ['default'])}
        >
          {cloneVNode(Vnode, { contentClassName: itemClass })}
        </ElDescriptionsItem>,
      ];
    });
    return {
      slots: _.assign(slots, {
        default: () => node,
      }),
    };
  },
});
