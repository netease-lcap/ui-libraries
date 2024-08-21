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
  </div>
</template>
<script>
export default {
  data() {
    return {
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
  }
};
</script>
