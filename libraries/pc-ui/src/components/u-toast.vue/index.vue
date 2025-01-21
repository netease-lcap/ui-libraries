<template>
<transition-group tag="div" :class="[$style.root, cssRuleClassName]" :position="position"
    move-class="animate__move"
    enter-active-class="animate__animated animate__fadeInUpSmall"
    leave-active-class="animate__animated animate__fadeOutUpSmall fast animate__list-leave-active">
    <div v-for="item in items" :key="item.timestamp" :class="$style['item-wrap']" :style="item.staticStyle || {}">
        <div v-if="item.color === 'custom'" :class="$style.item" :position="position">
            <div v-if="item.customIcon" :class="$style.customIcon">
                <i-ico :name="item.customIcon"></i-ico>
            </div>

            <slot :item="item">{{ item.text }}</slot>
            <a :class="$style.close" v-if="closable" @click="close(item)"></a>
        </div>
        <div v-else :class="$style.item" :color="item.color" :position="position">
            <slot :item="item">{{ item.text }}</slot>
            <a :class="$style.close" v-if="closable" @click="close(item)"></a>
        </div>
    </div>
</transition-group>
</template>

<script>
export default {
    name: 'u-toast',
    props: {
        position: { type: String, default: 'top-center' },
        single: { type: Boolean, default: false },
        maxCount: { type: Number, default: 3 },
        duration: { type: Number, default: 3000 },
        color: { type: String },
        text: String,
        closable: { type: Boolean, default: false },

        customIcon: { type: String },
    },
    data() {
        return {
            items: [],
            itemsQueue: new Map(),

            events: new Map(),
            cssRuleClassName: '',
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
    },
    mounted() {
        if (this.position !== 'static') {
            const container = window.LcapMicro && window.LcapMicro.appendTo ? window.LcapMicro.appendTo : document.body;
            container.appendChild(this.$el);
        }
    },
    destroyed() {
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
            // 获取到当前key
            const event = this.events.get(item.key);
            if (event && event.onShow) {
                event.onShow(item);
            }
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

            const event = this.events.get(item.key);
            if (event && event.onHide) {
                event.onHide(item);
            }
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

        openToast(config) {
            const { key, text, color, duration, customIcon, onShow, onHide, staticStyle, cssRuleClassName } = config;

            if (!this.$el)
                this.$mount(document.createElement('div')); // Vue 加载完成后，触发某一事件后，先执行methods，再执行watch方法，会导致标签显示异常
            this.$nextTick(() => {
                this.cssRuleClassName = cssRuleClassName;
                this.events.set(key, {
                    onShow,
                    onHide,
                });

                this.open({
                    key,
                    text,
                    color,
                    duration,
                    customIcon,
                    timestamp: +new Date(),

                    staticStyle,
                });
            });
        },
        closeToast(key) {
            const target = this.items.find((item) => item.key === key);
            this.close(target);
        },
    },
    install(Vue, id) {
        const Ctor = Vue.component(id);
        if (!Ctor)
            return;
        const toast = (Vue.prototype.$toast = this.toast = new Ctor());
        const METHODS = [
            'show',
            'closeAll',
            'success',
            'warning',
            'info',
            'error',
        ];
        METHODS.forEach((method) => (this[method] = toast[method].bind(toast)));
    },
};
</script>

<style module src="./index.css"></style>
