<template>
  <el-timeline
    :dataSource="data"
    timestampField="timestamp1"
    hideTimestampField="hideTimestamp1"
    centerField="center1"
    placementField="placement1"
    typeField="type1"
    colorField="color1"
    sizeField="size1"
    style="max-width: 600px">
    <template #content="current">
      {{ current.text }}
    </template>
  </el-timeline>
</template>

<script lang="ts" setup>
const data = [
  {
    text: 'Event start',
    timestamp1: '2018-04-15',
    // hideTimestamp1: true,
    center1: true,
    placement1: 'bottom',
    type1: 'primary',
    color1: 'red',
    size1: 'large',
  },
  {
    text: 'Approved',
    timestamp1: '2018-04-13',
    hideTimestamp1: false,
    center1: false,
    placement1: 'top',
    type1: 'success',
    color1: 'green',
    size1: 'normal',
  },
  {
    text: 'Success',
    timestamp1: '2018-04-11',
    // hideTimestamp1: true,
    center1: true,
    placement1: 'bottom',
    type1: 'warning',
    color1: 'yellow',
    size1: 'large',
  },
];
</script>
