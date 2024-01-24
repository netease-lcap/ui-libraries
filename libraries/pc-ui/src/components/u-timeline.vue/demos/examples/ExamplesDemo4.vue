<!-- 使用label单独展示时间 -->
<template>
<u-timeline mode="label">
    <u-timeline-item label="2020-01-20">
        服务测试数据1
        <div :class="$style.sub">这是一段测试文案1</div>
    </u-timeline-item>
    <u-timeline-item label="2020-01-21">
        服务测试数据2
        <div :class="$style.sub">这是一段测试文案2</div>
    </u-timeline-item>
    <u-timeline-item label="2020-01-22">
        服务测试数据3
        <div :class="$style.sub">这是一段测试文案3</div>
    </u-timeline-item>
    <u-timeline-item label="2020-01-23">
        服务测试数据4
        <div :class="$style.sub">这是一段测试文案4</div>
    </u-timeline-item>
    <u-timeline-item label="2020-01-24">
        服务测试数据5
        <div :class="$style.sub">这是一段测试文案5</div>
    </u-timeline-item>
</u-timeline>
</template>
<style module>
.sub {
    font-size: var(--font-size-small);
    color: var(--color-light)
}
</style>