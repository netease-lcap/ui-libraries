<template>
  <div style="background-color: #f5f5f5; padding: 6px">
    <van-cell-group  title="单元格组1" style="padding: 4px">
      <van-cell title="常规单元格" value="内容" />
      <van-cell title="大单元格" value="内容" size="large" label="描述信息-大单元格"/>
      <van-cell title="无内边框单元格" value="可点击" :border="false" icon="shop-o" center is-link clickable/>
      <van-cell title="带描述单元格" value="带额外信息" label="描述信息-必填" required>
        <template #extra>
          <van-text>额外信息</van-text>
        </template>
      </van-cell>
    </van-cell-group>

      <van-cell-group :inset="true" :border="true" title="单元格组2 圆角 无外边框" style="padding: 4px">
      <van-cell title="常规单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
    </van-cell-group>
  </div>
</template>
