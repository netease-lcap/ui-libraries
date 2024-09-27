<template>
  <demo-section>
    <demo-block title="普通">
      <van-fieldtextarea
        style="background-color: bisque;"
        :value.sync="value"
      >
      </van-fieldtextarea>
    </demo-block>

    <demo-block title="普通 预览">
      <van-fieldtextarea
        :preview="true"
        :value.sync="value"
      >
      </van-fieldtextarea>
    </demo-block>

    <demo-block title="最大字数,高度auto">
      <van-fieldtextarea
        style="height: auto; background-color: bisque;"
        :maxlength="2000"
        showWordLimit
        :value.sync="value"
      >
      </van-fieldtextarea>
    </demo-block>

    <demo-block title="最大字数,高度auto, 预览">
      <van-fieldtextarea
        :preview="true"
        style="height: auto;"
        :maxlength="2000"
        showWordLimit
        :value.sync="value"
      >
      </van-fieldtextarea>
    </demo-block>

    <demo-block title="最大字数,高度300">
      <van-fieldtextarea
        style="height: 300px; background-color: bisque;"
        :maxlength="2000"
        showWordLimit
        :value.sync="value"
      >
      </van-fieldtextarea>
    </demo-block>

    <demo-block title="最大字数,高度300,预览">
      <van-fieldtextarea
        :preview="true"
        style="height: 300px;"
        :maxlength="2000"
        showWordLimit
        :value.sync="value"
      >
      </van-fieldtextarea>
    </demo-block>

    <demo-block title="最大字数, autosize: { maxHeight: '200', minHeight: '100' }">
      <van-fieldtextarea
        style="background-color: bisque;"
        :maxlength="2000"
        showWordLimit
        :autosize="{ maxHeight: '200', minHeight: '100' }"
        :value.sync="value"
      >
      </van-fieldtextarea>
    </demo-block>

    <demo-block title="最大字数, autosize: { maxHeight: '200', minHeight: '100' }, 预览">
      <van-fieldtextarea
        :preview="true"
        :maxlength="2000"
        showWordLimit
        :autosize="{ maxHeight: '150', minHeight: '100' }"
        :value.sync="value"
      >
      </van-fieldtextarea>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      value: 'start我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入endstart我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入endstart我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入我是多行输入end'
    }
  }
}
</script>
