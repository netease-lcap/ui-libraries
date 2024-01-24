<!-- 设置尺寸 -->
<template>
<u-linear-layout>
        <u-button>small
            <u-tooltip size="small">{{ content }}</u-tooltip>
        </u-button>
        <u-button>normal
            <u-tooltip>{{ content }}</u-tooltip>
        </u-button>
        <u-button>large
            <u-tooltip size="large">{{ content }}</u-tooltip>
        </u-button>
        <u-button>auto
            <u-tooltip size="auto">{{ content }}</u-tooltip>
        </u-button>
</u-linear-layout>
</template>

<script>
export default {
    data() {
        return {
            content: '深蓝的天空中挂着一轮金黄的圆月，下面是海边的沙地，都种着一望无际的碧绿的西瓜。其间有一个十一二岁的少年，项带银圈，手捏一柄钢叉，向一匹猹尽力地刺去。那猹却将身一扭，反从他的胯下逃走了。',
        };
    },
};
</script>