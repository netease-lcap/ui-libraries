<template>
  <div>
    <van-skeleton :isCustomSkeleton="true" :row="3" title avatar round>
      <template #template>
        <div :style="{ display: 'flex', width: '100%' }">
          <van-skeleton-avatar />
          <div :style="{ flex: 1, marginLeft: '16px' }">
            <van-skeleton-title />
            <van-skeleton-paragraph row-width="60%" />
            <van-skeleton-paragraph />
            <van-skeleton-paragraph />
            <van-skeleton-paragraph />
            <van-row>
              <van-col span="12">
                <van-skeleton-image style="margin-top: 10px;" imageShape="round" />
              </van-col>
              <van-col span="12">
                <van-skeleton-image style="margin-top: 10px;" imageShape="square" />
              </van-col>
            </van-row>
          </div>
        </div>
      </template>
    </van-skeleton>
  </div>
</template>
