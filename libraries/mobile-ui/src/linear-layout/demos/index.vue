<template>
  <demo-section>
    <demo-block title="行内">
      <div style="height: 100px; background-color: red;">
          <van-linear-layout mode="inline" style="width: 100px; height: 50px; background-color: blue;">
          </van-linear-layout>
          <van-linear-layout mode="inline" style="width: 100px; height: 50px; background-color: green;">
          </van-linear-layout>
        </div>
    </demo-block>

    <demo-block title="块级">
      <div style="height: 100px; background-color: red;">
          <van-linear-layout mode="block" style="width: 100px; height: 50px; background-color: blue;">
          </van-linear-layout>
          <van-linear-layout mode="block" style="width: 100px; height: 50px; background-color: green;">
          </van-linear-layout>
        </div>
    </demo-block>

    <demo-block title="弹性--单行排布">
      <van-linear-layout mode="flex" direction="horizontal" gap="small" justify="center" alignment="center" style="height: 100px; background-color: red;">
          <div style="width: 100px; height: 50px; background-color: blue;">
          </div>
          <div style="width: 100px; height: 50px; background-color: green;">
          </div>
      </van-linear-layout>
    </demo-block>

    <demo-block title="多行排布">
      <van-linear-layout mode="flex" direction="vertical" gap="small" justify="center" alignment="center" style="background-color: red;">
          <div style="width: 100px; height: 50px; background-color: blue;">
          </div>
          <div style="width: 100px; height: 50px; background-color: green;">
          </div>
      </van-linear-layout>
    </demo-block>

    <demo-block title="两端排布">
      <van-linear-layout mode="flex" direction="horizontal" justify="space-between" alignment="center" style="height: 100px; background-color: red;">
        <div style="width: 100px; height: 50px; background-color: blue;">
          </div>
          <div style="width: 100px; height: 50px; background-color: green;">
          </div>
      </van-linear-layout>
    </demo-block>

    <demo-block title="平均排布">
      <van-linear-layout mode="flex" direction="horizontal" justify="space-around" alignment="center" style="height: 100px; background-color: red;">
        <div style="width: 100px; height: 50px; background-color: blue;">
          </div>
          <div style="width: 100px; height: 50px; background-color: green;">
          </div>
      </van-linear-layout>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
}
</script>
