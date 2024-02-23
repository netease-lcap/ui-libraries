<!-- 外观-card -->
<template>
  <div>
    <h3>slots</h3>
    <van-tabs titleField="title2">
      <template #nav-left>left</template>
      <template #nav-right>right</template>
      <van-tab title="AAA">test1</van-tab>
      <van-tab title="BBB">test2</van-tab>
      <van-tab title="标签页">test3</van-tab>
    </van-tabs>

    <h3 @click="onClick">dataSource: list</h3>
    <van-tabs :dataSource="tabList" titleField="title2">
      <template #nav-left>left</template>
      <template #nav-right>right</template>
    </van-tabs>
  
    <h3>dataSource: Promise</h3>
    <van-tabs :dataSource="load" titleField="title2">
      <template #nav-left>left</template>
      <template #nav-right>right</template>
    </van-tabs>

  </div>
</template>

<script>
export default {
    data() {
        return {
          tabList: [
            {
                title2: 'AAA-',
                // value: 1,
                contentUrl: '/components/u-tabs/cases',
                // disabled: true,
                titleField: 'title2',
            },
            {
                title2: 'BBB-',
                // value: 2,
                contentUrl: '/components/u-tabs/cases#形态',
                titleField: 'title2',
            },
            {
                title2: '标签页-',
                // value: 3,
                contentUrl: '/components/u-tabs/cases#添加',
                titleField: 'title2',
            }
          ]
        };
    },
    mounted() {
        // console.log(this, 'this');
    },
    methods: {

        load() {
            // 这里使用 Promise 和 setTimeout 模拟一个异步请求
            const index = Math.random() * 20 >> 0;
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(this.tabList.map((item)=>{
                        const newItem = Object.assign({}, item);
                        newItem.title2 = `${item.title2}${index}`;
                        return newItem;
                    }));
                }, 200);
            });
        },

        onClick() {
        // 
        },
    },
};
</script>


