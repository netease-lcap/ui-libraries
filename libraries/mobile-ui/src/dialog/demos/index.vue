<template>
  <demo-section>
    <!-- <demo-block card :title="t('basicUsage')">
      <van-cell is-link :title="t('alert1')" @click="onClickAlert" />
      <van-cell is-link :title="t('alert2')" @click="onClickAlert2" />
      <van-cell is-link :title="t('confirm')" @click="onClickConfirm" />
    </demo-block>

    <demo-block card :title="t('roundButton')">
      <van-cell is-link :title="t('alert1')" @click="onClickRound" />
      <van-cell is-link :title="t('alert2')" @click="onClickRound2" />
    </demo-block>

    <demo-block card :title="t('asyncClose')">
      <van-cell is-link :title="t('asyncClose')" @click="onClickAsyncClose" />
    </demo-block>

    <demo-block card :title="t('componentCall')">
      <van-cell is-link :title="t('componentCall')" @click="show = true" />
      <van-dialog
        v-model="show"
        :title="'退下' || t('title')"
        show-cancel-button
        :lazy-render="false"
        :close-on-click-overlay="wagover"
      >
        <img :src="image" />
      </van-dialog>
    </demo-block> -->
    <demo-block card :title="t('componentCall')">
      <!-- <van-cell is-link :title="t('componentCall')" @click="show2 = true" /> -->
      <van-cell is-link :title="t('componentCall')" @click="onxxx" />

      <van-dialog
        ref="xxx"
        :title="'退下2' || t('title')"
        show-cancel-button
      >
        <div>
            <van-calendar></van-calendar>
        </div>

        <!-- <template #footer>
          <van-button
            size="large"
            class="van-button van-button--default van-button--large van-dialog__cancel"
            text="取消"
            @click="show2 = false"
          ></van-button>
          <van-button
            size="large"
            class="van-button van-button--default van-button--large van-dialog__confirm van-hairline--left"
            text="确认"
            @click="show2 = false"
          ></van-button>
        </template> -->
      </van-dialog>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  i18n: {
    'zh-CN': {
      alert1: '提示弹窗',
      alert2: '提示弹窗（无标题）',
      confirm: '确认弹窗',
      asyncClose: '异步关闭',
      roundButton: '圆角按钮样式',
      componentCall: '组件调用',
      content: '代码是写出来给人看的，附带能在机器上运行',
    },
    'en-US': {
      alert1: 'Alert',
      alert2: 'Alert without title',
      confirm: 'Confirm dialog',
      asyncClose: 'Async Close',
      roundButton: 'Round Button Style',
      componentCall: 'Component Call',
    },
  },

  data() {
    return {
      wagover: false,
      show: false,
      show2: true,
      currentRate: 0,
      image: 'https://img01.yzcdn.cn/vant/apple-3.jpg',
    };
  },
  mounted() {
    setTimeout(() => {
      this.wagover = true;

      this.$refs.xxx.openModal()
    }, 2000);
  },
  methods: {
    onxxx() {
      this.$dialog.alert({
        title: this.t('title'),
        message: this.t('content'),
        closeOnClickOverlay: true,
      });
    },
    onClickAlert() {
      this.$dialog.alert({
        title: this.t('title'),
        message: this.t('content'),
      });
    },

    onClickAlert2() {
      this.$dialog.alert({
        message: this.t('content'),
      });
    },

    onClickRound() {
      this.$dialog.alert({
        theme: 'round-button',
        title: this.t('title'),
        message: this.t('content'),
      });
    },

    onClickRound2() {
      this.$dialog.alert({
        theme: 'round-button',
        message: this.t('content'),
      });
    },

    onClickConfirm() {
      this.$dialog.confirm({
        title: this.t('title'),
        message: this.t('content'),
      });
    },

    onClickAsyncClose() {
      function beforeClose(action, done) {
        if (action === 'confirm') {
          setTimeout(done, 1000);
        } else {
          done();
        }
      }

      this.$dialog.confirm({
        title: this.t('title'),
        message: this.t('content'),
        beforeClose,
      });
    },
  },
};
</script>

<style lang="less">
@import '../../style/var';

.demo-dialog {
  img {
    box-sizing: border-box;
    width: 100%;
    padding: 25px 20px 0;
  }
}
</style>
