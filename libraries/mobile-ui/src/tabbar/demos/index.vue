<template>
  <demo-section>
    <demo-block :title="t('basicUsage')">
      <van-tabbar>
        <van-tabbar-item icon="home-o" :badge="77" text="标签" destination="/zh-CN/tabbar"></van-tabbar-item>
        <van-tabbar-item icon="search" text="标签" destination="/tabbar"></van-tabbar-item>
        <van-tabbar-item icon="friends-o" text="标签"></van-tabbar-item>
        <van-tabbar-item icon="setting-o" text="标签"></van-tabbar-item>
      </van-tabbar>
    </demo-block>
    <demo-block :title="t('basicUsage')">
      <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o"></van-tabbar-item>
        <van-tabbar-item icon="search"></van-tabbar-item>
        <van-tabbar-item icon="friends-o"></van-tabbar-item>
        <van-tabbar-item icon="setting-o"></van-tabbar-item>
      </van-tabbar>
    </demo-block>

    <demo-block :title="t('matchByName')">
      <van-tabbar v-model="activeName">
        <van-tabbar-item name="home" icon="home-o">

        </van-tabbar-item>
        <van-tabbar-item name="search" icon="search">

        </van-tabbar-item>
        <van-tabbar-item name="friends" icon="friends-o">

        </van-tabbar-item>
        <van-tabbar-item name="setting" icon="setting-o">

        </van-tabbar-item>
      </van-tabbar>
    </demo-block>

    <demo-block :title="t('badge')">
      <van-tabbar v-model="active2">
        <van-tabbar-item icon="home-o"></van-tabbar-item>
        <van-tabbar-item icon="search" dot></van-tabbar-item>
        <van-tabbar-item icon="friends-o" badge="5">

        </van-tabbar-item>
        <van-tabbar-item icon="setting-o" badge="20">

        </van-tabbar-item>
      </van-tabbar>
    </demo-block>

    <demo-block :title="t('customIcon')">
      <van-tabbar v-model="active3">
        <van-tabbar-item badge="3">
          <span>{{ t('custom') }}</span>
          <template #icon="props">
            <img :src="props.active ? icon.active : icon.inactive" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item icon="search"></van-tabbar-item>
        <van-tabbar-item icon="setting-o"></van-tabbar-item>
      </van-tabbar>
    </demo-block>

    <demo-block :title="t('customColor')">
      <van-tabbar
        v-model="active4"
        active-color="#ee0a24"
        inactive-color="#000"
      >
        <van-tabbar-item icon="home-o"></van-tabbar-item>
        <van-tabbar-item icon="search"></van-tabbar-item>
        <van-tabbar-item icon="friends-o"></van-tabbar-item>
        <van-tabbar-item icon="setting-o"></van-tabbar-item>
      </van-tabbar>
    </demo-block>

    <demo-block :title="t('switchEvent')">
      <van-tabbar v-model="active5" @change="onChange">
        <van-tabbar-item icon="home-o">{{ t('tab') + 1 }}</van-tabbar-item>
        <van-tabbar-item icon="search">{{ t('tab') + 2 }}</van-tabbar-item>
        <van-tabbar-item icon="friends-o">{{ t('tab') + 3 }}</van-tabbar-item>
        <van-tabbar-item icon="setting-o">{{ t('tab') + 4 }}</van-tabbar-item>
      </van-tabbar>
    </demo-block>

    <demo-block>
      <van-tabbar :ref="`tabbar1`">
          <van-tabbar-item :ref="`tabbar_item1`" style="font-size:24px" icon="frontpage">
                <van-text :ref="`text14`" text="标签"></van-text>
          </van-tabbar-item>
            <van-tabbar-item :ref="`tabbar_item2`" style="font-size:24px" icon="contact" destination="https://www.baidu.com">
                <van-text :ref="`text15`" text="标签"></van-text>
          </van-tabbar-item>
      </van-tabbar>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  i18n: {
    'zh-CN': {
      badge: '徽标提示',
      customIcon: '自定义图标',
      customColor: '自定义颜色',
      matchByName: '通过名称匹配',
      switchEvent: '监听切换事件',
      selectTip: '你切换到了',
    },
    'en-US': {
      badge: 'Show Badge',
      customIcon: 'Custom Icon',
      customColor: 'Custom Color',
      matchByName: 'Match by name',
      switchEvent: 'Change Event',
      selectTip: 'You select ',
    },
  },

  data() {
    return {
      active: 0,
      active2: 0,
      active3: 0,
      active4: 0,
      active5: 0,
      activeName: 'home',
      icon: {
        active: 'https://img01.yzcdn.cn/vant/user-active.png',
        inactive: 'https://img01.yzcdn.cn/vant/user-inactive.png',
      },
    };
  },

  methods: {
    onChange(index) {
      this.$notify({
        type: 'primary',
        message: `${this.t('selectTip')} ${this.t('tab')}${index + 1}`,
      });
    },
  },
};
</script>

<style lang="less">
.demo-tabbar {
  .van-tabbar {
    position: relative;
    padding-bottom: 0;
  }
}
</style>
