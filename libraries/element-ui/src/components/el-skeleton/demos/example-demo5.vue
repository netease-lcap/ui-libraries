<!-- Loading 状态 -->
<!--  当 Loading 结束之后，我们往往需要显示真实的 UI，可以通过 `loading` 的值来控制是否显示真实的 DOM。然后通过 具名 Slot 来设置当 loading 结束之后需要展示的 UI。 -->
<template>
  <div>
    <div style="width: 240px">
      <p>
        <label style="margin-right: 16px">切换 Loading</label>
        <el-switch v-model="loading" />
      </p>
      <el-skeleton style="width: 240px" :loading="loading" animated>
        <template slot="template">
          <el-skeleton-item
            variant="image"
            style="width: 240px; height: 240px" />

            <el-skeleton-item variant="h3" style="width: 50%" />

            <el-skeleton-item variant="text" style="margin-right: 16px" />
            <el-skeleton-item variant="text" style="width: 30%" />
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
      loading: true,
      currentDate: '2021-06-01',
    };
  },
};
</script>
