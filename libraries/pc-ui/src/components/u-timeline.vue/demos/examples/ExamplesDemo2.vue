<!-- 修改颜色 -->
<template>
<u-timeline>
    <u-timeline-item color="black">
        <div>black</div>
        <div :class="$style.time">2020-01-20</div>
    </u-timeline-item>
    <u-timeline-item color="success">
        <div>success</div>
        <div :class="$style.time">2020-01-21</div>
    </u-timeline-item>
    <u-timeline-item color="warning">
        <div>warning</div>
        <div :class="$style.time">2020-01-21</div>
    </u-timeline-item>
    <u-timeline-item color="error">
        <div>error</div>
        <div :class="$style.time">2020-01-22</div>
    </u-timeline-item>
    <u-timeline-item>
        <div>默认颜色: primary</div>
        <div :class="$style.time">2020-01-23</div>
    </u-timeline-item>
</u-timeline>
</template>
<style module>
.time {
    font-size: var(--font-size-small);
    color: var(--color-light)
}
</style>