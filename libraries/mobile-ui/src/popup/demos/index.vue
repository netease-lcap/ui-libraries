<template>
  <demo-section>
    <demo-block card :title="t('basicUsage')">
      <van-cell :title="t('buttonBasic')" is-link @click="showBasic = true" />
      <van-popup
        class="cw-css-rule-popup1___asada"
        v-model="showBasic"
        position="bottom"
        safeAreaInsetBottom
        closeOnClickOverlay
        evn="picker"
      >
        <div
          vusion-slot-name="default"
          style="min-width: 200px; min-height: 200px; width: 100%; height: 100%;"
          :vusion-disabled-cut="true"
        >
        </div>
      </van-popup>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  i18n: {
    'zh-CN': {
      position: '弹出位置',
      buttonBasic: '展示弹出层',
      buttonTop: '顶部弹出',
      buttonBottom: '底部弹出',
      buttonLeft: '左侧弹出',
      buttonRight: '右侧弹出',
      getContainer: '指定挂载节点',
      roundCorner: '圆角弹窗',
      closeIcon: '关闭图标',
      customCloseIcon: '自定义图标',
      customIconPosition: '图标位置',
    },
  },

  data() {
    return {
      showBasic: false,
    };
  },
  methods: {

  }
};
</script>

<style lang="less">
@import '../../style/var';

.demo-popup {
  .van-row {
    margin-bottom: @padding-md;
  }

  .van-button {
    margin-left: @padding-md;
  }
}
</style>
