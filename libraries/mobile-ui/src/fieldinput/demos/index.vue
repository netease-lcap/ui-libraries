<template>
  <demo-section>
    <demo-block title="4位密码">
      <van-fieldinput
        ref="fieldinput3"
        style="--van-fieldinput-text-color:#a38989; --van-password-input-cell-gap: 5px"
        placeholder="请输入"
        type="point"
        inputstyle="password"
        keytheme="custom"
        :clearable="false"
        :maxlength="4"
        confirm-size="default">
      </van-fieldinput>
    </demo-block>

    <demo-block title="预览模式">
      <van-fieldinput
        :preview="true"
        value="123412321312"
        type="password"
      >
      </van-fieldinput>
    </demo-block>
  </demo-section>
</template>

<script>
export default {

}
</script>
