<template>
  <demo-section>
    <demo-block title="基础用法">
      <van-cell :is-link="false">
        <template #title>
          <van-text text="值"></van-text>
        </template>
        {{ value }}
      </van-cell>

      <van-collapse :value.sync="value" :accordion="true">
            <van-collapse-item name="a" :is-link="false">
                <template #title>
                    <van-row :gutter="`0`" style="text-align: center;">
                        <van-col :span="`8`">
                              <van-text :text="`普通文本`"></van-text>
                        </van-col>
                          <van-col :span="`8`">
                              <van-text :text="`普通文本`"></van-text>
                        </van-col>
                          <van-col :span="`8`">
                              <van-text :text="`普通文本`"></van-text>
                        </van-col>
                    </van-row>
                </template>
                <van-text text="代码是写出来给人看的，附带能在机器上运行"></van-text>
            </van-collapse-item>
            <van-collapse-item  :name="`b`" :is-link="false">
                <template #title>
                    <van-row :gutter="`0`" style="text-align: center;">
                        <van-col :span="`8`">
                              <van-text :text="`普通文本`"></van-text>
                        </van-col>
                          <van-col :span="`8`">
                              <van-text :text="`普通文本`"></van-text>
                        </van-col>
                          <van-col :span="`8`">
                              <van-text :text="`普通文本`"></van-text>
                        </van-col>
                    </van-row>
                </template>
                <van-text text="代码是写出来给人看的，附带能在机器上运行"></van-text>
            </van-collapse-item>
            <van-collapse-item>
                <template #title>
                    <van-row :gutter="`0`" style="text-align: center;">
                        <van-col :span="`8`">
                              <van-text :text="`普通文本`"></van-text>
                        </van-col>
                          <van-col :span="`8`">
                              <van-text :text="`普通文本`"></van-text>
                        </van-col>
                          <van-col :span="`8`">
                              <van-text :text="`普通文本`"></van-text>
                        </van-col>
                    </van-row>
                </template>
                <van-text  text="代码是写出来给人看的，附带能在机器上运行"></van-text>
          </van-collapse-item>
      </van-collapse>
    </demo-block>

  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      value: '',
    };
  },
};
</script>

<style lang="less">
@import '../../style/var';

.demo-collapse {
  .van-icon-question-o {
    margin-left: 5px;
    color: @blue;
    font-size: 15px;
    vertical-align: -3px;
  }
}
</style>
