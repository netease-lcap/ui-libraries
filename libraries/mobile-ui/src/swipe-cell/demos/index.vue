<template>
  <div>
    <demo-section>
      <demo-block>
        <van-swipe-cell :leftforhelper="false" :rightforhelper="false">
          <template #left>
            <van-button
              style="height:100%;width:72px;border-radius:0;"
              squareroud="square"
              type="primary"
              text="选择"
              size="middle"
            />
          </template>
          <van-cell center>
            <template #title> 左侧文本 </template>
            右侧文本
          </van-cell>
          <template #right>
            <van-button
              style="height:100%;width:72px;border-radius:0;"
              squareroud="square"
              type="danger"
              text="删除"
              size="middle"
            />
          </template>
        </van-swipe-cell>
      </demo-block>
      <demo-block :title="t('basicUsage')">
        <van-swipe-cell>
          <template #left>
            <van-button square type="primary" :text="t('select')" />
          </template>
          <van-cell :border="false" :title="t('title')" :value="t('content')" />
          <template #right>
            <van-button square type="danger" :text="t('delete')" />
            <van-button square type="primary" :text="t('collect')" />
          </template>
        </van-swipe-cell>
      </demo-block>

      <demo-block :title="t('customContent')">
        <van-swipe-cell>
          <van-card
            num="2"
            price="2.00"
            :desc="t('desc')"
            :title="t('cardTitle')"
            :thumb="imageURL"
          />
          <template #right>
            <van-button
              square
              type="danger"
              class="delete-button"
              :text="t('delete')"
            />
          </template>
        </van-swipe-cell>
      </demo-block>

      <demo-block :title="t('beforeClose')">
        <van-swipe-cell :before-close="beforeClose">
          <template #left>
            <van-button square type="primary" :text="t('select')" />
          </template>
          <van-cell :border="false" :title="t('title')" :value="t('content')" />
          <template #right>
            <van-button square type="danger" :text="t('delete')" />
          </template>
        </van-swipe-cell>
      </demo-block>
    </demo-section>
  </div>
</template>

<script>
export default {
  i18n: {
    'zh-CN': {
      select: '选择',
      delete: '删除',
      collect: '收藏',
      title: '单元格',
      confirm: '确定删除吗？',
      cardTitle: '商品标题',
      beforeClose: '异步关闭',
      customContent: '自定义内容',
    },
    'en-US': {
      select: 'Select',
      delete: 'Delete',
      collect: 'Collect',
      title: 'Cell',
      confirm: 'Are you sure to delete?',
      cardTitle: 'Title',
      beforeClose: 'Before Close',
      customContent: 'Custom Content',
    },
  },

  data() {
    return {
      imageURL: 'https://img01.yzcdn.cn/vant/ipad.jpeg',
    };
  },

  methods: {
    beforeClose({ position, instance }) {
      switch (position) {
        case 'left':
        case 'cell':
        case 'outside':
          instance.close();
          break;
        case 'right':
          this.$dialog
            .confirm({
              message: this.t('confirm'),
            })
            .then(() => {
              instance.close();
            });
          break;
      }
    },
  },
};
</script>

<style lang="less">
@import '../../style/var';

.demo-swipe-cell {
  user-select: none;

  .van-card {
    margin: 0;
    background-color: @white;
  }

  .delete-button {
    height: 100%;
  }
}
</style>
