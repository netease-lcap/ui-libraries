<template>
  <div class="u-for-com" vusion-slot-name="default">
    <template v-if="options.length > 0">
      <div v-for="(item, index) in options" :key="index" class="u-for-com-frag">
        <u-list-components-item
          v-for="(item2, index2) in item"
          :key="idField ? $at(item2, idField) || item2 : index2"
          :item="item2"
          :colnum="colnum || 5"
          :equal-width="equalWidth"
          :index="comIndex(index, index2)"
        >
        <template #default="item2">
            <slot :item="item2.item" :index="comIndex(index, index2)"></slot>
            <s-empty v-if="$scopedSlots
                &&!($scopedSlots.default && $scopedSlots.default(item2))
                &&$env.VUE_APP_DESIGNER
                && !!$attrs['vusion-node-path']"></s-empty>
          </template>
        </u-list-components-item>
      </div>
    </template>
    <template v-else-if="$env.VUE_APP_DESIGNER">
        <slot><s-empty v-if="!$slots.default && $env.VUE_APP_DESIGNER && !!$attrs['vusion-node-path']"></s-empty></slot>
    </template>
  </div>
</template>

<script>
import { sync } from '@lcap/vue2-utils';
import UListComponentsItem from './item.vue';
import SEmpty from '../../components/s-empty.vue';
import { formatDSResult } from '../../utils/DataSource/format';

export default {
    name: 'u-list-components',
    mixins: [
      sync({
        data: 'options',
      })
    ],
    components: {
        UListComponentsItem,
        SEmpty,
    },
    props: {
        dataSource: {
            type: [Array, Object, Function, String],
            default: () => [],
        },
        colnum: {
            type: Number,
            default: 5,
        },
        equalWidth: {
            type: Boolean,
            default: true,
        },
        idField: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            options: [],
        };
    },
    computed: {},
    watch: {
        dataSource: {
            deep: true,
            handler: 'update',
            immediate: true,
        },
    },
    methods: {
        divide(arr) {
            const result = [];
            const arre = [...arr];
            while (arre.length > 0) {
                const temp = arre.splice(0, this.colnum || 5);
                result.push(temp);
            }
            return result;
        },
        async update() {
            if (typeof (this.dataSource) === 'function') {
                try {
                    const res = await this.dataSource({
                        page: 1,
                        size: 1000,
                    });
                    this.options = this.divide(formatDSResult(res));
                } catch (error) {
                    console.error(error);
                }
            } else {
                this.options = this.divide(formatDSResult(this.dataSource));
            }
        },
        comIndex(index1, index2) {
            return index1 * (this.colnum || 5) + index2;
        },
    },
};
</script>

<style>
.u-for-com-frag {
  display: flex;
  flex-basis: auto;
  flex-wrap: wrap;
}
</style>
