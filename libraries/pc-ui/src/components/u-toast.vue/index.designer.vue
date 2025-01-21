<template>
<div
    v-show="designerVisible"
    :class="[$style.root, $designerStyle.root]" :position="position">
    <div :class="$designerStyle.overlay" v-show="designerVisible"></div>
    <div :class="[$style['item-wrap'], $designerStyle['item-wrap'], 'real-element-for-designer']">
        <div v-if="color === 'custom'" :class="$style.item">
            <slot name="inject"></slot>
            <div v-if="customIcon" :class="$style.customIcon">
                <i-ico :name="customIcon"></i-ico>
            </div>
            {{ text }}
            <a :class="$style.close" v-if="closable" @click="close(item)"></a>
        </div>
        <div v-else :class="$style.item" :color="color">
            <slot name="inject"></slot>
            {{ text }}
            <a :class="$style.close" v-if="closable" @click="closeAll()"></a>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'u-toast-desiger',
    props: {
        position: { type: String, default: 'top-center' },
        single: { type: Boolean, default: false },
        maxCount: { type: Number, default: 3 },
        duration: { type: Number, default: 3000 },
        color: { type: String },
        text: String,
        closable: { type: Boolean, default: false },
        customIcon: { type: String },
        visible:  { type: Boolean, default: false },
    },
    data() {
        return {
            items: [],
            itemsQueue: new Map(),

            designerVisible: this.visible,
        };
    },
    watch: {
        text(newValue, oldValue) {
            this.items.some((item, index) => {
                if (item.text === oldValue) {
                    item.text = newValue;
                    return true;
                }
                return false;
            });
        },
        visible(val) {
            this.designerVisible = val;
        }
    },
    mounted() {
        if (this.$env.VUE_APP_DESIGNER) {
            return;
        }

        if (this.position !== 'static') {
            const container = window.LcapMicro && window.LcapMicro.appendTo ? window.LcapMicro.appendTo : document.body;
            container.appendChild(this.$el);
        }
    },
    destroyed() {
        if (this.$env.VUE_APP_DESIGNER) {
            return;
        }

        if (this.position !== 'static') {
            const container = window.LcapMicro && window.LcapMicro.appendTo ? window.LcapMicro.appendTo : document.body;
            container.removeChild(this.$el);
        }
    },
    methods: {
        show(text, duration, color) {
            if (!this.$el)
                this.$mount(document.createElement('div')); // Vue 加载完成后，触发某一事件后，先执行methods，再执行watch方法，会导致标签显示异常
            this.$nextTick(() => {
                this.open({
                    text: String(text !== undefined ? text : (this.text || '')),
                    color,
                    duration: duration === undefined ? this.duration : duration,
                    timestamp: +new Date(),
                });
            });
        },
        open(item) {
            let maxCount = this.maxCount;
            if (this.single)
                maxCount = 1;
            if (this.items.length >= maxCount)
                this.close(this.items[0]);

            this.items.push(item);
            if (item.duration || item.duration === Infinity) {
                setTimeout(() => {
                    this.close(item);
                }, item.duration);
            }
            this.$emit('open', item, this);
        },
        close(item) {
            const index = this.items.indexOf(item);
            if (!~index)
                return;

            let cancel = false;
            this.$emit(
                'before-close',
                Object.assign({ preventDefault: () => (cancel = true) }, item),
                this,
            );
            if (cancel)
                return;
            this.items.splice(index, 1);
            this.$emit('close', item, this);
        },
        /**
         * @method closeAll() 关闭所有消息
         * @return {void}
         */
        closeAll() {
            this.items = [];
        },
        success(text, duration) {
            this.show(text, duration, 'success');
        },
        warning(text, duration) {
            this.show(text, duration, 'warning');
        },
        info(text, duration) {
            this.show(text, duration, 'info');
        },
        error(text, duration) {
            this.show(text, duration, 'error');
        },
    },
};
</script>

<style module src="./index.css"></style>
<style module="$designerStyle">
.root {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    z-index: var(--z-index-toast);
    /* pointer-events: none; */
}
.root .overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    /* background-color: rgba(0,0,0,.7); */
}
.root .item-wrap {
    position: absolute;
    z-index: 1;
}
</style>