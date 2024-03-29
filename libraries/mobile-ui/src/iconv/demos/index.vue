<template>
  <demo-section>
    <van-tabs v-model="tab" sticky>
      <van-tab :title="t('demo')">
        <demo-block :title="t('basicUsage')">
          <van-col span="6" @click="copy(demoIcon)">
            <van-iconv badge="9" name="https://static-vusion.163yun.com/h5-template/svgviewer-output.svg"></van-iconv>
          </van-col>
          <van-col span="6" @click="copy(demoIcon)">
            <van-iconv :name="demoIcon"></van-iconv>
          </van-col>
          <van-col span="6" @click="copy(demoImage)">
            <van-iconv :name="demoImage" />
          </van-col>
        </demo-block>

        <demo-block :title="t('badge')">
          <van-col span="6" @click="copy(demoIcon, { dot: true })">
            <van-iconv :name="demoIcon" dot />
          </van-col>
          <van-col span="6" @click="copy(demoIcon, { badge: '9' })">
            <van-iconv :name="demoIcon" badge="9" />
          </van-col>
          <van-col span="6" @click="copy(demoIcon, { badge: '99+' })">
            <van-iconv :name="demoIcon" badge="99+" />
          </van-col>
        </demo-block>

        <demo-block :title="t('color')">
          <van-col span="6" @click="copy(demoIcon, { color: '#1989fa' })">
            <van-iconv name="cart-o" color="#1989fa" />
          </van-col>
          <van-col span="6" @click="copy(demoIcon, { color: RED })">
            <van-iconv name="fire-o" :color="RED" />
          </van-col>
        </demo-block>

        <demo-block :title="t('size')">
          <van-col span="6" @click="copy(demoIcon, { size: '40' })">
            <van-iconv :name="demoIcon" size="40" />
          </van-col>
          <van-col span="6" @click="copy(demoIcon, { size: '3rem' })">
            <van-iconv :name="demoIcon" size="3rem" />
          </van-col>
        </demo-block>
      </van-tab>

      <van-tab :title="t('basic')">
        <van-col
          v-for="icon in icons.glyphs"
          :key="icon.font_class"
          span="6"
          @click="copy(icon)"
        >
          <van-iconv :name="icon.font_class" />
        </van-col>
      </van-tab>
    </van-tabs>
  </demo-section>
</template>

<script>
import icons from '../config';
import { RED } from '../../utils/constant';

// from https://30secondsofcode.org
function copyToClipboard(str) {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);

  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;

  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);

  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
}

export default {
  i18n: {
    'zh-CN': {
      title: '图标列表',
      badge: '徽标提示',
      basic: '基础图标',
      copied: '复制成功',
      outline: '线框风格',
      filled: '实底风格',
      demo: '用法示例',
      color: '图标颜色',
      size: '图标大小',
    },
    'en-US': {
      title: 'Icon List',
      badge: 'Show Badge',
      basic: 'Basic',
      copied: 'Copied',
      outline: 'Outline',
      filled: 'Filled',
      demo: 'Demo',
      color: 'Icon Color',
      size: 'Icon Size',
    },
  },

  data() {
    this.RED = RED;
    this.icons = icons;
    return {
      tab: 0,
      demoIcon: 'chat-o',
      demoImage: 'https://b.yzcdn.cn/vant/icon-demo-1126.png',
    };
  },

  methods: {
    copy(icon, option = {}) {
      let tag = `<van-iconv name="${icon}"`;
      if ('dot' in option) {
        tag = `${tag} ${option.dot ? 'dot' : ''}`;
      }
      if ('badge' in option) {
        tag = `${tag} badge="${option.badge}"`;
      }
      if ('color' in option) {
        tag = `${tag} color="${option.color}"`;
      }
      if ('size' in option) {
        tag = `${tag} size="${option.size}"`;
      }
      tag = `${tag} />`;
      copyToClipboard(tag);

      this.$notify({
        type: 'success',
        duration: 1500,
        className: 'demo-icon-notify',
        message: `${this.t('copied')}：${tag}`,
      });
    },
  },
};
</script>

<style lang="less">
@import '../../style/var';

.demo-iconv {
  font-size: 0;

  &-notify {
    font-size: 13px;
  }

  .van-col {
    display: inline-block;
    float: none;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;

    span {
      display: block;
      height: 36px;
      margin: -4px 0 4px;
      padding: 0 5px;
      color: @gray-7;
      font-size: 12px;
      line-height: 18px;
    }

    &:active {
      background-color: @active-color;
    }
  }

  .van-iconv {
    margin: 16px 0 16px;
    color: @text-color;
    font-size: 32px;
  }

  .van-tab__pane {
    width: auto;
    margin: 20px;
    background-color: #fff;
    border-radius: 12px;
  }
}
</style>
