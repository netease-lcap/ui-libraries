<template>
  <div class="van-doc-demo-block">
    <h2 v-if="title" class="van-doc-demo-block__title">{{ title }}</h2>
    <div v-if="card" class="van-doc-demo-block__card">
      <slot />
    </div>
    <slot v-else />
  </div>
</template>

<script>
export default {
  name: 'demo-block',

  props: {
    card: Boolean,
    title: String,
  },
};
</script>

<style lang="less">
@van-doc-black: #323233;
@van-doc-blue: #1989fa;
@van-doc-purple: #8080ff;
@van-doc-fuchsia: #a7419e;
@van-doc-green: #4fc08d;
@van-doc-text-color: #34495e;
@van-doc-text-light-blue: rgba(69, 90, 100, 0.6);
@van-doc-background-color: #f7f8fa;
@van-doc-grey: #999;
@van-doc-dark-grey: #666;
@van-doc-light-grey: #ccc;
@van-doc-border-color: #f1f4f8;
@van-doc-code-color: #58727e;
@van-doc-code-background-color: #f1f4f8;
@van-doc-code-font-family: 'Source Code Pro', 'Monaco', 'Inconsolata', monospace;
@van-doc-padding: 30px;
@van-doc-row-max-width: 1680px;
@van-doc-nav-width: 220px;
@van-doc-border-radius: 12px;

// header
@van-doc-header-top-height: 60px;
@van-doc-header-bottom-height: 50px;

// simulator
@van-doc-simulator-width: 360px;
@van-doc-simulator-small-width: 320px;
@van-doc-simulator-height: 620px;
@van-doc-simulator-small-height: 560px;


.van-doc-demo-block {
  &__title {
    margin: 0;
    padding: 32px 16px 16px;
    color: @van-doc-text-light-blue;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
  }

  &__card {
    margin: 12px 12px 0;
    overflow: hidden;
    border-radius: 8px;
  }

  &__title + &__card {
    margin-top: 0;
  }

  &:first-of-type {
    .van-doc-demo-block__title {
      padding-top: 20px;
    }
  }
}
</style>
