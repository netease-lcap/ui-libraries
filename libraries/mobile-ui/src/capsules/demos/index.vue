<template>
  <demo-section>
    <demo-block title="normal">
      <div>value: {{active}}</div>
      <van-capsules :value.sync="active" :multiple="multiple" :cancelable="cancelable" @change="onChange">
        <van-capsules-item value="1" disabled>标签</van-capsules-item>
        <van-capsules-item value="2" flag>标签</van-capsules-item>
        <van-capsules-item value="3" label="1群">标签</van-capsules-item>
      </van-capsules>
    </demo-block>

    <demo-block title="normal group">
      <van-capsules :value.sync="active" :multiple="multiple" :cancelable="cancelable" @change="onChange">
        <van-capsules-group>
          <van-capsules-item value="1" disabled>标签</van-capsules-item>
          <van-capsules-item value="2" flag>标签</van-capsules-item>
        </van-capsules-group>

        <van-capsules-group>
          <van-capsules-item value="3" label="1群">标签</van-capsules-item>
          <van-capsules-item value="4" >标签</van-capsules-item>
        </van-capsules-group>

      </van-capsules>
    </demo-block>

    <demo-block title="designer">
      <van-capsules :value.sync="active" :multiple="multiple" :cancelable="cancelable" @change="onChange">
      </van-capsules>

      <van-capsules :value.sync="active" :multiple="multiple" :cancelable="cancelable" @change="onChange">
        <van-capsules-item value="1" disabled>标签</van-capsules-item>
        <van-capsules-item value="2" flag></van-capsules-item>
        <van-capsules-item value="3" label="1群">标签</van-capsules-item>
      </van-capsules>
    </demo-block>

    <demo-block>
      <van-capsules :ref="`capsules1`" style="--custom-start: auto;">
          <van-capsules-item :ref="`capsules_item1`" value="a">
                <van-text :ref="`text8`" :text="`Option-A`"></van-text>
          </van-capsules-item>
          <van-capsules-item :ref="`capsules_item2`">
                <van-text :ref="`text9`" :text="`Option-B`"></van-text>
          </van-capsules-item>
          <van-capsules-item :ref="`capsules_item3`">
                <van-text :ref="`text10`" :text="`Option-C`"></van-text>
          </van-capsules-item>
      </van-capsules>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      active: null,
      multiple: false,
      cancelable: false
    };
  },
  methods: {
    onChange(e) {
      console.log('onChange', e.value);
    }
  }
};
</script>

<style lang="less">
@import '../../style/var';

</style>
