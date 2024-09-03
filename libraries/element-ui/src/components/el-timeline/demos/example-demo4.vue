<!-- ⾃定义节点样式 -->
<!-- 数据源 -->
<template>
  <div>
    <div class="block">
      <el-timeline :dataSource="activities" :itemProps="setTimelineItemProps" :dotStyle="setDotStyle">
        <template #content="current">
          {{ current.item.content }}
        </template>
      </el-timeline>
    </div>
    <div class="block">
      <el-timeline :dataSource="activities1" :dotStyle="setDotStyle1">
        <template #content="current">
          {{ current.item.content }}
        </template>
      </el-timeline>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      variable1: 'red',
      activities: [
        {
          content: '支持使用图标',
          timestamp: '2018-04-12 20:46',
          size: 'large',
          type: 'primary',
          icon: 'success',
        },
        {
          content: '支持自定义颜色',
          timestamp: '2018-04-03 20:46',
          color: '#0bbd87',
          icon: 'error',
        },
        {
          content: '支持自定义尺寸',
          timestamp: '2018-04-03 20:46',
          size: 'large',
          icon: 'warning',
          hideTimestamp: true,
        },
        {
          content: '默认样式的节点',
          timestamp: '2018-04-03 20:46',
          icon: 'info',
          placement: 'top',
        },
      ],
      activities1: [
        {
          content: '支持使用图标',
          timestamp: '2018-04-12 20:46',
          size: 'large',
          type: 'primary',
        },
        {
          content: '支持自定义颜色',
          timestamp: '2018-04-03 20:46',
          color: '#0bbd87',
        },
        {
          content: '支持自定义尺寸',
          timestamp: '2018-04-03 20:46',
          size: 'large',
          hideTimestamp: true,
        },
        {
          content: '默认样式的节点',
          timestamp: '2018-04-03 20:46',
          placement: 'top',
        },
      ],
    };
  },
  methods: {
    setTimelineItemProps(current) {
      return {
        type: current.item.type,
        size: current.item.size,
        timestamp: current.item.timestamp,
        icon: current.item.icon,
        hideTimestamp: current.item.hideTimestamp,
        placement: current.item.placement,
      };
    },
    setDotStyle(current) {
      return {
        color: current.item.color,
      };
    },
    setDotStyle1(current) {
      return {
        backgroundColor: this.variable1,
      };
    },
  }
};
</script>
