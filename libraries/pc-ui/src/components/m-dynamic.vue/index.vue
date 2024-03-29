<script>
import MEmitter from '../m-emitter.vue';
import cloneDeep from 'lodash/cloneDeep';

export default {
    name: 'm-dynamic',
    mixins: [MEmitter],
    props: {
        data: Array,
        dynamic: { type: Boolean, default: true },
        getDefaultItem: Function,
        initialAdd: { type: Boolean, default: true },
        minCount: { type: Number, default: 1 },
        maxCount: { type: Number, default: Infinity },
    },
    data() {
        return { currentData: this.data, keysArray: [] };
    },
    watch: {
        data(data) {
            this.currentData = data;
        },
    },
    created() {
        const needCount = this.minCount - this.currentData.length;
        if (this.initialAdd && needCount > 0) {
            for (let i = 0; i < needCount; i++)
                this.add();
        }
        // 设置行的key。行的key设置为rowIndex，会导致里面的validator错误信息错位
        // 这里设置每行的唯一key
        this.currentData.forEach((item, index) => {
            this.setKey(item, index);
        });
    },
    methods: {
        add() {
            if (this.currentData.length >= this.maxCount)
                return;
            const item = this.getDefaultItem ? this.getDefaultItem() : {};
            const index = this.currentData.length;
            if (this.$emitPrevent('before-add', { item, index, data: this.currentData }, this))
                return;
            this.setKey(item, this.currentData.length + 1);
            this.currentData.push(item);
            this.$emit('add', { item, index, data: this.currentData }, this);
            this.$emit('splice', { item, index, data: this.currentData }, this);
        },
        duplicate(index) {
            if (this.currentData.length >= this.maxCount)
                return;
            const item = cloneDeep(this.currentData[index]);
            if (this.$emitPrevent('before-duplicate', { item, index, data: this.currentData }, this))
                return;
            this.setKey(item, this.currentData.length + 1);
            this.currentData.splice(index, 0, item);
            this.$emit('duplicate', { item, index, data: this.currentData }, this);
            this.$emit('splice', { item, index, data: this.currentData }, this);
        },
        remove(index) {
            if (this.currentData.length <= this.minCount)
                return;
            const item = this.currentData[index];
            if (this.$emitPrevent('before-remove', { item, index, data: this.currentData }, this))
                return;
            this.currentData.splice(index, 1);
            this.$emit('remove', { item, index, data: this.currentData }, this);
            this.$emit('splice', { item, index, data: this.currentData }, this);
        },
        setKey(item, index) {
            const key = `${(new Date()).getTime()}_${index}`;
            this.keysArray.push({ item, key });
        },
        getKey(item) {
            const keyItem = this.keysArray.find((keyItem) => keyItem.item === item);
            return keyItem && keyItem.key;
        },
    },
};
</script>
