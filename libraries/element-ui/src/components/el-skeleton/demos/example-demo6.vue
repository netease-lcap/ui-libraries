<!-- 渲染多条数据 -->
<!--  大多时候, 骨架屏都被用来渲染列表, 当我们需要在从服务器获取数据的时候来渲染一个假的 UI。利用 `count` 这个属性就能控制渲染多少条假的数据在页面上 -->
<template>
  <div>
    <div style="width: 400px">
      <p>
        <el-button @click="setLoading">点我重新加载</el-button>
      </p>
      <el-skeleton style="width: 400px" :loading="loading" animated :count="3">
        <template slot="template">
          <el-skeleton-item
            variant="image"
            style="width: 400px; height: 267px" />
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
          <el-card
            :body-style="{ padding: '0px', marginBottom: '1px' }"
            v-for="item in lists"
            :key="item.name">
            <img :src="item.imgUrl" class="image multi-content" />
            <div style="padding: 14px">
              <span>{{ item.name }}</span>
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
      lists: [],
    };
  },
  mounted() {
    this.loading = false;
    this.lists = [
      {
        imgUrl:
          'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        name: '鹿',
      },
      {
        imgUrl:
          'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        name: '马',
      },
      {
        imgUrl:
          'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
        name: '山狮',
      },
    ];
  },
  methods: {
    setLoading() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    },
  },
};
</script>
