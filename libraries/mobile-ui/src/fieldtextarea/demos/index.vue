<template>
  <demo-section>
    <demo-block title="预览模式">
      <van-fieldtextarea
        :preview="true"
        :value="value"
      >
      </van-fieldtextarea>
    </demo-block>

    <demo-block title="最大字数-自动高度（autosize: undefined">
      <van-fieldtextarea
        style="background-color: bisque;"
        :maxlength="300"
        showWordLimit
        :value="value"
      >
      </van-fieldtextarea>
    </demo-block>

    <demo-block title="最大字数-自动高度（autosize: true）">
      <van-fieldtextarea
        style="background-color: bisque;"
        :maxlength="300"
        showWordLimit
        autosize
        :value="value"
      >
      </van-fieldtextarea>
    </demo-block>

    <demo-block title="最大字数-限制高度(autosize: { maxHeight: 150, minHeight: 100 })">
      <van-fieldtextarea
        style="background-color: bisque;"
        :maxlength="300"
        showWordLimit
        :autosize="{ maxHeight: 150, minHeight: 100 }"
        :value="value"
      >
      </van-fieldtextarea>
    </demo-block>

    <demo-block title="最大字数-限制高度(style) 不支持">
      <van-fieldtextarea
        style="background-color: bisque; height: 150px;"
        :maxlength="300"
        showWordLimit
        :value="value"
      >
      </van-fieldtextarea>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  data()  {
    return {
      value: '我是多行输入我是多行输入我是多行输入我是多行输入我输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入'
    }
  }
}
</script>
