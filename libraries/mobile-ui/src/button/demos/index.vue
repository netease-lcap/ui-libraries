<template>
  <demo-section>
    <demo-block :title="t('type')">
      <div>
        <van-button
          size="middle"
          type="info"
          class="u-code-example_demo_"
          squareroud="round"
          >{{ t('info') }}</van-button
        >
        <van-button
          size="middle"
          type="info"
          :disabled="true"
          class="u-code-example_demo_"
          squareroud="round"
          >{{ t('info') }}</van-button
        >
      </div>
      <div style="margin-top: 10px">
        <van-button
          size="normal"
          type="info_secondary"
          class="u-code-example_demo_"
          squareroud="round"
          >{{ t('info') }}</van-button
        >
        <van-button
          size="normal"
          :disabled="true"
          type="info_secondary"
          class="u-code-example_demo_"
          squareroud="round"
          >{{ t('info') }}</van-button
        >
      </div>
      <div style="margin-top: 10px">
        <van-button
          size="normal"
          type="default"
          class="u-code-example_demo_"
          squareroud="round"
          >{{ t('info') }}</van-button
        >
        <van-button
          size="normal"
          :disabled="true"
          type="default"
          class="u-code-example_demo_"
          squareroud="round"
          >{{ t('info') }}</van-button
        >
      </div>
      <div style="margin-top: 10px">
        <van-button
          size="normal"
          type="warning"
          class="u-code-example_demo_"
          squareroud="round"
          >{{ t('info') }}</van-button
        >
        <van-button
          size="normal"
          :disabled="true"
          type="warning"
          class="u-code-example_demo_"
          squareroud="round"
          >{{ t('info') }}</van-button
        >
      </div>
      <div style="margin-top: 10px">
        <van-button
          size="normal"
          type="warning_secondary"
          class="u-code-example_demo_"
          squareroud="round"
          >{{ t('info') }}</van-button
        >
        <van-button
          size="normal"
          :disabled="true"
          type="warning_secondary"
          class="u-code-example_demo_"
          squareroud="round"
          >{{ t('info') }}</van-button
        >
      </div>
      <div style="margin-top: 10px">
        <van-button
          size="normal"
          type="danger"
          class="u-code-example_demo_"
          squareroud="round"
          >{{ t('info') }}</van-button
        >
        <van-button
          size="normal"
          :disabled="true"
          type="danger"
          class="u-code-example_demo_"
          squareroud="round"
          >{{ t('info') }}</van-button
        >
      </div>
      <div style="margin-top: 10px">
        <van-button
          size="normal"
          type="danger_secondary"
          class="u-code-example_demo_"
          squareroud="round"
          >{{ t('info') }}</van-button
        >
        <van-button
          :disabled="true"
          size="normal"
          type="danger_secondary"
          class="u-code-example_demo_"
          squareroud="round"
          >{{ t('info') }}</van-button
        >
      </div>
    </demo-block>
    <demo-block :title="t('shape')">
      <div class="demo-button-row">
        <van-button
          size="normal"
          type="info"
          class="u-code-example_demo_"
          squareroud="square"
          >{{ t('info') }}</van-button
        >
        <van-button
          size="normal"
          type="info_secondary"
          class="u-code-example_demo_"
          squareroud="square"
          >{{ t('info') }}</van-button
        >
        <van-button
          size="normal"
          type="default"
          class="u-code-example_demo_"
          squareroud="square"
          >{{ t('info') }}</van-button
        >
      </div>
      <div class="demo-button-row">
        <van-button
          size="normal"
          type="info"
          class="u-code-example_demo_"
          squareroud="round"
          >{{ t('info') }}</van-button
        >
        <van-button
          size="normal"
          type="info_secondary"
          class="u-code-example_demo_"
          squareroud="round"
          >{{ t('info') }}</van-button
        >
        <van-button
          size="normal"
          type="default"
          class="u-code-example_demo_"
          squareroud="round"
          >{{ t('info') }}</van-button
        >
        <van-button
          size="middle"
          icon="sure"
          type="default"
          class="u-code-example_demo_"
          squareroud="round"
          >{{ t('info') }}</van-button
        >
      </div>
    </demo-block>
    <demo-block :title="t('size')">
      <div class="demo-button-row">
        <van-button
          size="mini"
          type="info"
          class="u-code-example_demo_"
          squareroud="round"
          >{{ t('info') }}</van-button
        >
        <van-button
          size="small"
          type="info"
          class="u-code-example_demo_"
          squareroud="round"
          >{{ t('info') }}</van-button
        >
        <van-button
          size="normal"
          type="info"
          class="u-code-example_demo_"
          squareroud="round"
          >{{ t('info') }}</van-button
        >

        <van-button
          size="middle"
          type="info"
          class="u-code-example_demo_"
          squareroud="round"
          >{{ t('info') }}</van-button
        >
        <van-button
          size="large"
          type="info"
          class="u-code-example_demo_"
          squareroud="round"
          >{{ t('info') }}</van-button
        >
      </div>
    </demo-block>

    <demo-block title="点击防抖">
      <van-button
        size="normal"
        type="info"
        class="u-code-example_demo_"
        squareroud="round"
        @click="onClick"
        >{{ t('info') }}</van-button
      >
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  methods: {
    beforeNavigate(...args) {
      console.log(args);
    }
  },
  i18n: {
    'zh-CN': {
      type: '按钮类型',
      size: '按钮尺寸',
      icon: '图标按钮',
      loading: '加载状态',
      shape: '按钮形状',
      default: '默认按钮',
      primary: '主要按钮',
      info: '确定',
      danger: '危险按钮',
      warning: '警告按钮',
      large: '大号按钮',
      normal: '普通按钮',
      small: '小型按钮',
      mini: '迷你按钮',
      plain: '朴素按钮',
      square: '方形按钮',
      round: '圆形按钮',
      hairline: '细边框',
      hairlineButton: '细边框按钮',
      loadingText: '加载中...',
      router: '页面导航',
      urlRoute: 'URL 跳转',
      vueRoute: '路由跳转',
      customColor: '自定义颜色',
      pure: '单色按钮',
      gradient: '渐变色按钮',
      blockElement: '块级元素'
    },
    'en-US': {
      type: 'Type',
      size: 'Size',
      icon: 'Icon',
      loading: 'Loading',
      shape: 'Shape',
      default: 'Default',
      primary: 'Primary',
      info: 'Info',
      danger: 'Danger',
      warning: 'Warning',
      large: 'Large',
      normal: 'Normal',
      small: 'Small',
      mini: 'Mini',
      plain: 'Plain',
      square: 'Square',
      round: 'Round',
      hairline: 'Hairline',
      hairlineButton: 'Hairline',
      loadingText: 'Loading...',
      router: 'Router',
      urlRoute: 'URL',
      vueRoute: 'Vue Router',
      customColor: 'Custom Color',
      pure: 'Pure',
      gradient: 'Gradient',
      blockElement: 'Block Element'
    }
  },
  methods: {
    onClick() {
      console.log('click');
    }
  }
};
</script>

<style lang="less">
@import '../../style/var';

.demo-button {
  .van-button {
    &--large {
      margin-bottom: @padding-md;
    }

    &--small,
    &--normal:not(:last-child) {
      margin-right: @padding-md;
    }
  }

  .van-doc-demo-block {
    padding: 0 @padding-md;
  }

  .van-doc-demo-block__title {
    padding-left: 0;
  }

  &-row {
    margin-bottom: @padding-sm;
  }
}
</style>
