<template>
  <demo-section>
    <demo-block card :title="t('basicUsage')">
      <van-cell is-link :title="t('title1')" @click="$toast({message: t('text'), duration: 1000 })" />
      <van-cell is-link :title="t('title2')" @click="showLoadingToast()" />
      <van-cell is-link :title="t('success')" @click="showSuccessToast" />
      <van-cell is-link :title="t('fail')" @click="showFailToast" />
    </demo-block>

    <demo-block card v-if="!isWeapp" :title="t('customIcon')">
      <van-cell is-link :title="t('customIcon')" @click="showIconToast" />
      <van-cell is-link :title="t('customImage')" @click="showImageToast" />
      <van-cell
        is-link
        :title="t('loadingType')"
        @click="showLoadingToast('spinner')"
      />
    </demo-block>

    <demo-block card v-if="!isWeapp" :title="t('customPosition')">
      <van-cell is-link :title="t('positionTop')" @click="showTopToast" />
      <van-cell is-link :title="t('positionBottom')" @click="showBottomToast" />
    </demo-block>

    <demo-block card :title="t('updateMessage')">
      <van-cell
        is-link
        :title="t('updateMessage')"
        @click="showCustomizedToast"
      />
    </demo-block>

    <demo-block title="调用式">
      <van-toast style="--van-toast-text-color: red;" ref="toast1" :message="msg" :duration="0" type="custom" custom-icon="info" @open="onShow1" @close="onHide1"></van-toast>
      <van-button @click="showToast1">打开toast</van-button>
      <van-button @click="() => $refs.toast1.close()">关闭toast</van-button>

      <van-toast style="--van-toast-text-color: yellow;" ref="toast2" :message="msg" :duration="0" type="custom" custom-icon="info"></van-toast>
      <van-button @click="() => $refs.toast2.open()">打开toast</van-button>
      <van-button @click="() => $refs.toast2.close()">关闭toast</van-button>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  i18n: {
    'zh-CN': {
      fail: '失败提示',
      text: '提示内容',
      text2: '成功文案',
      text3: '失败文案',
      text4: (second) => `倒计时 ${second} 秒`,
      title1: '文字提示',
      title2: '加载提示',
      title3: '成功/失败提示',
      success: '成功提示',
      customIcon: '自定义图标',
      customImage: '自定义图片',
      loadingType: '自定义加载图标',
      positionTop: '顶部展示',
      updateMessage: '动态更新提示',
      positionBottom: '底部展示',
      customPosition: '自定义位置',
    },
    'en-US': {
      fail: 'Fail',
      text: 'Some messages',
      text2: 'Success',
      text3: 'Fail',
      text4: (second) => `${second} seconds`,
      title1: 'Text',
      title2: 'Loading',
      title3: 'Success/Fail',
      success: 'Success',
      customIcon: 'Custom Icon',
      customImage: 'Custom Image',
      loadingType: 'Loading Type',
      positionTop: 'Top',
      updateMessage: 'Update Message',
      positionBottom: 'Bottom',
      customPosition: 'Custom Position',
    },
  },

  data() {
    return {
      msg: '弹出消息'
    }
  },

  methods: {
    showLoadingToast(loadingType) {
      this.$toast.loading({
        forbidClick: true,
        message: this.t('loading'),
        loadingType,
      });
    },

    showSuccessToast() {
      this.$toast.success(this.t('text2'));
    },

    showFailToast() {
      this.$toast.fail(this.t('text3'));
    },

    showTopToast() {
      this.$toast({
        message: this.t('positionTop'),
        position: 'top',
      });
    },

    showBottomToast() {
      this.$toast({
        message: this.t('positionBottom'),
        position: 'bottom',
      });
    },

    showIconToast() {
      this.$toast({
        message: this.t('customIcon'),
        icon: 'like-o',
      });
    },

    showImageToast() {
      this.$toast({
        message: this.t('customImage'),
        icon: 'https://img01.yzcdn.cn/vant/logo.png',
      });
    },

    showCustomizedToast() {
      const toast = this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: this.t('text4', 3),
      });

      let second = 3;
      const timer = setInterval(() => {
        second--;
        if (second) {
          toast.message = this.t('text4', second);
        } else {
          clearInterval(timer);
          this.$toast.clear();
        }
      }, 1000);
    },

    showToast1() {
      this.msg = '弹出消息1'
      this.$refs.toast1.open()

      // this.$toast.show({
      //   duration: 0,
      //   forbidClick: true,
      //   message: '自定义图标',
      //   // type: 'custom',
      //   type: 'warning',
      //   customIcon: 'fail'
      // });
    },
    hideToast1() {
      this.$refs.toast1.close()
    },
    onShow1() {
      console.log('show1');
    },
    onHide1() {
      console.log('hide1');
    }
  },
};
</script>
