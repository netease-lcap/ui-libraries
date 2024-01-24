<!-- 普通用法 -->

<template>
  <u-timeline :dataSource="[{}, {}, {}]">
    <template #item="current">
        <u-timeline-item insource>
            <template #label>
            </template>
        </u-timeline-item>
    </template>
</u-timeline>
</template>