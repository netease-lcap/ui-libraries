<template>
  <demo-section>
    <demo-block :title="t('basicUsage')">
      <van-cell title="抽屉弹出" is-link @click="showPopup = true" />
      <van-popup
        v-model="showPopup"
        position="bottom"
        :style="{ height: '30%' }"
      >
        <van-popover-origin>
          <template #reference>
            <van-button type="primary" text="触发弹出框组件，可删除替换"></van-button>
          </template>
          <van-text text="内容"></van-text>
        </van-popover-origin>
      </van-popup>
    </demo-block>
  </demo-section>
</template>
<script>

export default {
  i18n: {
    'zh-CN': {
      actions: [{ text: '选项一' }, { text: '选项二' }, { text: '选项三' }],
      shortActions: [{ text: '选项一' }, { text: '选项二' }],
      actionsWithIcon: [
        { text: '选项一', icon: 'add-o' },
        { text: '选项二', icon: 'music-o' },
        { text: '选项三', icon: 'more-o' },
      ],
      actionsDisabled: [
        { text: '选项一', disabled: true },
        { text: '选项二', disabled: true },
        { text: '选项三' },
      ],
      showIcon: '展示图标',
      placement: '弹出位置',
      darkTheme: '深色风格',
      lightTheme: '浅色风格',
      showPopover: '点击弹出气泡',
      actionOptions: '选项配置',
      customContent: '自定义内容',
      disableAction: '禁用选项',
      choosePlacement: '选择弹出位置',
    },
  },

  data() {
    return {
      showPopup: false,
    };
  },

  methods: {

  },
};
</script>

