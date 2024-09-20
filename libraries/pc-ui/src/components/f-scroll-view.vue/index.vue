<template>
<div :class="$style.root" :native="native">
    <template v-if="!native">
        <div ref="wrap" :class="$style.wrap" :style="wrapStyle" @scroll="handleScroll">
            <div ref="resize" :class="$style.view">
                <slot></slot>
            </div>
        </div>
        <f-scroll-view-bar :move="moveX" :size="sizeWidth" v-if="sizeWidth" ref="widthbar"></f-scroll-view-bar>
        <f-scroll-view-bar direction="vertical" :move="moveY" :size="sizeHeight" v-if="sizeHeight" ref="heightbar"></f-scroll-view-bar>
    </template>
    <div v-else ref="wrap" :class="$style.wrap" :style="wrapStyle" @scroll="handleNativeScroll">
        <div ref="resize" :class="$style.view">
            <slot></slot>
        </div>
    </div>
</div>
</template>

<script>
import FScrollViewBar from './bar.vue';
import { addResizeListener, removeResizeListener } from '../../utils/dom/resize-event';

export default {
    name: 'f-scroll-view',
    components: {
        FScrollViewBar,
    },
    props: {
        native: { type: Boolean, default: false },
        wrapStyle: Object,
        viewStyle: Object,
        noresize: { type: Boolean, default: false },
        useThumbThreshold: { type: Boolean, default: false },
        thumbThreshold: { type: Number, default: 50 },
    },
    data() {
        return {
            sizeWidth: '0',
            sizeHeight: '0',
            moveX: '0',
            moveY: '0',
        };
    },
    mounted() {
        if (this.native) {
            return;
        }
        this.$nextTick(this.handleResize);
        !this.noresize && addResizeListener(this.$refs.resize, this.handleResize);
        // 某些情况root高度会变，但$refs.resize的高度不会变，这里再增加$el的监听
        !this.noresize && addResizeListener(this.$el, this.handleResize);
    },
    beforeDestroy() {
        if (this.native) {
            return;
        }
        !this.noresize && removeResizeListener(this.$refs.resize, this.handleResize);
        !this.noresize && removeResizeListener(this.$el, this.handleResize);
    },
    methods: {
        handleScroll(e) {
            const wrapEl = this.$refs.wrap;

            if (this.useThumbThreshold) {
                // 滚动条的宽度
                const heightBarWidth = this.heightBarWidth || 0;
                const widthBarHeight = this.widthBarHeight || 0;
                let height = this.sizeHeight? parseInt(this.sizeHeight.replace('px', '')) : 0;
                height = wrapEl.scrollHeight - wrapEl.clientHeight < height ? 0 : height;
                let width = this.sizeWidth? parseInt(this.sizeWidth.replace('px', '')) : 0;
                width = wrapEl.scrollWidth - wrapEl.clientWidth < width ? 0 : width;
                let moveY = ((wrapEl.scrollTop) / (wrapEl.scrollHeight)) * wrapEl.clientHeight;
                moveY = moveY > wrapEl.clientHeight - height ? wrapEl.clientHeight - height : moveY; // 避免translateY过大时，滚动条不显示
                moveY = moveY - heightBarWidth < 0 ? 0 : moveY - heightBarWidth;
                this.moveY = moveY + 'px';
                let moveX = ((wrapEl.scrollLeft) / wrapEl.scrollWidth) * wrapEl.clientWidth;
                moveX = moveX > wrapEl.clientWidth - width ? wrapEl.clientWidth - width : moveX;
                moveX = moveX - widthBarHeight < 0 ? 0 : moveX - widthBarHeight; // 避免超出表格宽度，表格body出滚动条
                this.moveX = moveX + 'px';
            } else {
                this.moveY = (wrapEl.scrollTop * 100) / wrapEl.clientHeight + '%';
                this.moveX = (wrapEl.scrollLeft * 100) / wrapEl.clientWidth + '%';
            }

            this.$emit('scroll', {
                scrollTop: wrapEl.scrollTop,
                scrollLeft: wrapEl.scrollLeft,
                clientWidth: wrapEl.clientWidth,
                clientHeight: wrapEl.clientHeight,
                scrollWidth: wrapEl.scrollWidth,
                scrollHeight: wrapEl.scrollHeight,
                target: wrapEl,
            });
        },
        handleResize() {
            const wrapEl = this.$refs.wrap;
            if (!wrapEl)
                return;

            if (this.useThumbThreshold) {
                let heightPercentage = (wrapEl.clientHeight) / wrapEl.scrollHeight;
                heightPercentage = heightPercentage < 1 ? heightPercentage * wrapEl.clientHeight  : '';
                let widthPercentage = (wrapEl.clientWidth) / wrapEl.scrollWidth;
                widthPercentage = widthPercentage < 1 ? widthPercentage * wrapEl.clientWidth  : '';

                const thumbThreshold = this.thumbThreshold;
                heightPercentage = heightPercentage < thumbThreshold && heightPercentage > 0 ? thumbThreshold : heightPercentage;
                widthPercentage = widthPercentage < thumbThreshold && widthPercentage > 0 ? thumbThreshold : widthPercentage;
                this.sizeHeight = heightPercentage === '' ? '' : heightPercentage + 'px';
                this.sizeWidth = widthPercentage === '' ? '' : widthPercentage + 'px';
                this.heightBarWidth = this.$refs.heightbar ? this.$refs.heightbar.$el.getBoundingClientRect().width : 0;
                this.widthBarHeight = this.$refs.widthbar ? this.$refs.widthbar.$el.getBoundingClientRect().height : 0;
            } else {
                const heightPercentage = (wrapEl.clientHeight * 100) / wrapEl.scrollHeight;
                const widthPercentage = (wrapEl.clientWidth * 100) / wrapEl.scrollWidth;

                this.sizeHeight = heightPercentage < 100 ? heightPercentage + '%' : '';
                this.sizeWidth = widthPercentage < 100 ? widthPercentage + '%' : '';
            }
        },
        handleNativeScroll() {
            const wrapEl = this.$refs.wrap;
            this.$emit('scroll', {
                scrollTop: wrapEl.scrollTop,
                scrollLeft: wrapEl.scrollLeft,
                clientWidth: wrapEl.clientWidth,
                clientHeight: wrapEl.clientHeight,
                scrollWidth: wrapEl.scrollWidth,
                scrollHeight: wrapEl.scrollHeight,
                target: wrapEl,
            });
        },
    },
};
</script>

<style module>
.root {
    /* overflow: hidden; */
    position: relative;
}

.root:not([native]) ::-webkit-scrollbar {
    width: 0;
    height: 0;
}

/* 加强样式，以免嵌套被覆盖 */
.root[native] ::-webkit-scrollbar {
    width: var(--scrollbar-size);
    height: var(--scrollbar-size);
}

.wrap {
    overflow: auto;
    height: 100%;
}

.root:not([native]) .wrap {
    -ms-overflow-style: none; /** IE11 */
    scrollbar-width: none; /** firefox */
}

.root > .bar {
    opacity: 1;
    /* background: red; */
    transition: opacity .34s ease-out;
}

.root:hover > .bar,
.root:focus > .bar,
.root:active > .bar {
    opacity: 1;
}

.root[color="light"] .bar_thumb {
    background-color: rgba(48,48,48,.2);
}

.root[color="light"] .bar_thumb:hover {
    background-color: rgba(48,48,48,.4);
}
/** hover时才出现bar */
.root[trigger="hover"] .bar {
     opacity: 0;
}
.root[trigger="hover"]:hover > .bar,
.root:focus > .bar,
.root[trigger="hover"]:active > .bar {
    opacity: 1;
}
</style>
