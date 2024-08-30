<template>
    <div class="u-for-com" vusion-slot-name="default">
        <template v-if="options.length > 0">
            <div v-for="(item, index) in options" :key="index" class="u-for-com-frag">
                <el-list-components-item v-for="(item2, index2) in item"
                    :key="idField ? $at(item2, idField) || item2 : index2" :item="item2" :colnum="colnum || 5"
                    :equal-width="equalWidth" :index="comIndex(index, index2)">
                    <template #default="item2">
                        <slot :item="item2.item" :index="comIndex(index, index2)"></slot>
                    </template>
                </el-list-components-item>
            </div>
        </template>
    </div>
</template>

<script>
import { sync } from '@lcap/vue2-utils';
import ElListComponentsItem from './item.vue';
function formatDSResult(result) {
    if (!result) {
        return [];
    } else if (typeof result === 'string') {
        let list = [];
        try {
            list = formatDSResult(JSON.parse(result));
        } catch (err) {
            console.error(err);
        }
        return list;
    } else if (Array.isArray(result)) {
        return result;
    } else if (result && Array.isArray(result.list)) {
        return result.list;
    } else if (result && Array.isArray(result.content)) {
        return result.content;
    } else {
        return [];
    }
}

export default {
    name: 'u-list-components',
    mixins: [
        sync({
            data: 'options',
        })
    ],
    components: {
        ElListComponentsItem,
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
        async reload() {
            return await this.update();
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
