<!-- 防止渲染抖动 -->
<!--  有的时候，API 的请求回来的特别快，往往骨架占位刚刚被渲染，真实的数据就已经回来了，用户的界面会突然一闪，此时为了避免这种情况，就需要通过 `throttle` 属性来避免这个问题。 -->
<template>
  <div>
    <div style="width: 240px">
      <p>
        <label style="margin-right: 16px">切换 Loading</label>
        <el-switch v-model="loading" />
      </p>
      <el-skeleton
        style="width: 240px"
        :loading="loading"
        animated
        :throttle="500">
        <template slot="template">
          <el-skeleton-item
            variant="image"
            style="width: 240px; height: 240px" />
          <div style="padding: 14px">
            <el-skeleton-item variant="h3" style="width: 50%" />
            <div
              style="
                display: flex;
                align-items: center;
                justify-items: space-between;
                margin-top: 16px;
                height: 16px;
              ">
              <el-skeleton-item variant="text" style="margin-right: 16px" />
              <el-skeleton-item variant="text" style="width: 30%" />
            </div>
          </div>
        </template>
        <template>
          <el-card :body-style="{ padding: '0px', marginBottom: '1px' }">
            <img
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              class="image" />
            <div style="padding: 14px">
              <span>好吃的汉堡</span>
              <div class="bottom card-header">
                <span class="time">{{ currentDate }}</span>
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      currentDate: '2021-06-01',
    };
  },
};
</script>
