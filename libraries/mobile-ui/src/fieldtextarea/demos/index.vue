<template>
  <demo-section>
    <demo-block title="预览模式">
      <van-fieldtextarea
        :preview="true"
        value="我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入"
      >
      </van-fieldtextarea>
    </demo-block>

    <demo-block title="最大字数">
      <van-fieldtextarea
        style="height: 120px; background-color: bisque;"
        :maxlength="100"
        showWordLimit
        value="我是多行输入我是多行输入我是多行输入我是多行输入我输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入"
      >
      </van-fieldtextarea>
    </demo-block>
  </demo-section>
</template>

<script>
export default {

}
</script>
