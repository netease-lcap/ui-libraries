<template>
  <demo-section>
    <demo-block title="预览模式">
      <van-radio-group
        preview
        :value="value"
        :data-source="[4,5]"
        :column="3"
      >
        <van-radio :name="1" title="选框1"></van-radio>
        <van-radio :name="2" title="选框2"></van-radio>
        <van-radio :name="3" title="选框3"></van-radio>

        <template #item="current">
          <van-radio
            :name="current.item"
            :title="'选项' + current.item"
          ></van-radio>
        </template>
      </van-radio-group>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      value: 2
    };
  }
}
</script>
