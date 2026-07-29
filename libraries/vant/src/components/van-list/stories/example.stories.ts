import { ref } from 'vue';

interface ListItem {
  id: number;
  title: string;
  desc: string;
}

export default {
  id: 'van-list-examples',
  title: '组件列表/List 列表/示例',
  parameters: {
    layout: 'padded',
  },
};

export const Default = {
  name: '基础用法',
  render: (args: any, { argTypes }: any) => ({
    props: Object.keys(argTypes),
    setup() {
      const list = ref<ListItem[]>([]);
      const loading = ref(false);
      const finished = ref(false);

      // 模拟数据加载
      const loadData = [{}, {}, {}];
      console.log('object');
      const columns = async () => new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { text: '选项1', value: '1' },
            { text: '选项2', value: '2' },
            { text: '选项3', value: '3' },
            { text: '选项4', value: '4' },
            { text: '选项5', value: '5' },
          ].flatMap((item) => [item, item, item, item, item]));
        }, 1000);
      });
      //   setTimeout(
      //   () => {
      //     resolve([
      //       { text: '选项1', value: '1' },
      //       { text: '选项2', value: '2' },
      //       { text: '选项3', value: '3' },
      //       { text: '选项4', value: '4' },
      //       { text: '选项5', value: '5' },
      //     ].flatMap((item) => [item, item, item, item, item]));
      //   },
      //   1000,
      // ));
      return {
        args,
        columns,
        list,
        loading,
        finished,
        loadData,
      };
    },
    template: `
        <van-list
          style="height: 400px; "
          :dataSource="columns"
        :column="1" 
        >
          <template #item="item">
            <span>2</span>
          </template>
        </van-list>
    `,
  }),
};

export const Loading = {
  name: '加载状态',
  render: (args: any, { argTypes }: any) => ({
    props: Object.keys(argTypes),
    setup() {
      const list = ref<ListItem[]>([]);
      const loading = ref(true);
      const finished = ref(false);

      // 模拟长时间加载
      setTimeout(() => {
        const newItems: ListItem[] = Array.from({ length: 5 }, (_, index) => ({
          id: index + 1,
          title: `加载完成的列表项 ${index + 1}`,
          desc: `这是加载完成的第 ${index + 1} 个列表项`,
        }));

        list.value = newItems;
        loading.value = false;
      }, 3000);

      const onLoad = () => {
        console.log('触发加载事件');
      };

      return {
        args,
        list,
        loading,
        finished,
        onLoad,
      };
    },
    template: `
      <div style="height: 300px; overflow-y: auto;">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          loading-text="加载中..."
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell
            v-for="item in list"
            :key="item.id"
            :title="item.title"
            :label="item.desc"
          />
        </van-list>
      </div>
    `,
  }),
};

export const Error = {
  name: '错误状态',
  render: (args: any, { argTypes }: any) => ({
    props: Object.keys(argTypes),
    setup() {
      const list = ref<ListItem[]>([]);
      const loading = ref(false);
      const finished = ref(false);
      const error = ref(true);

      const onLoad = () => {
        if (error.value) {
          // 模拟错误状态
          console.log('加载失败，点击重试');
        } else {
          // 模拟成功加载
          loading.value = true;
          setTimeout(() => {
            const newItems: ListItem[] = Array.from({ length: 5 }, (_, index) => ({
              id: list.value.length + index + 1,
              title: `列表项 ${list.value.length + index + 1}`,
              desc: `这是第 ${list.value.length + index + 1} 个列表项`,
            }));

            list.value.push(...newItems);
            loading.value = false;
            error.value = false;
          }, 1000);
        }
      };

      const onRetry = () => {
        error.value = false;
        onLoad();
      };

      return {
        args,
        list,
        loading,
        finished,
        error,
        onLoad,
        onRetry,
      };
    },
    template: `
      <div style="height: 300px; overflow-y: auto;">
        <van-list
          v-model:loading="loading"
          v-model:error="error"
          :finished="finished"
          error-text="请求失败，点击重新加载"
          @load="onLoad"
          @retry="onRetry"
        >
          <van-cell
            v-for="item in list"
            :key="item.id"
            :title="item.title"
            :label="item.desc"
          />
        </van-list>
      </div>
    `,
  }),
};

export const PullRefresh = {
  name: '下拉刷新',
  render: (args: any, { argTypes }: any) => ({
    props: Object.keys(argTypes),
    setup() {
      const list = ref<ListItem[]>([]);
      const loading = ref(false);
      const finished = ref(false);
      const refreshing = ref(false);

      // 初始化数据
      const initData = () => {
        const items: ListItem[] = Array.from({ length: 10 }, (_, index) => ({
          id: index + 1,
          title: `列表项 ${index + 1}`,
          desc: `这是第 ${index + 1} 个列表项的描述信息`,
        }));
        list.value = items;
      };

      initData();

      const onLoad = () => {
        if (!loading.value && !finished.value) {
          loading.value = true;
          setTimeout(() => {
            const newItems: ListItem[] = Array.from({ length: 5 }, (_, index) => ({
              id: list.value.length + index + 1,
              title: `列表项 ${list.value.length + index + 1}`,
              desc: `这是第 ${list.value.length + index + 1} 个列表项`,
            }));

            list.value.push(...newItems);
            loading.value = false;

            if (list.value.length >= 25) {
              finished.value = true;
            }
          }, 1000);
        }
      };

      const onRefresh = () => {
        refreshing.value = true;
        setTimeout(() => {
          list.value = [];
          finished.value = false;
          initData();
          refreshing.value = false;
        }, 1000);
      };

      return {
        args,
        list,
        loading,
        finished,
        refreshing,
        onLoad,
        onRefresh,
      };
    },
    template: `
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <div style="height: 400px; overflow-y: auto;">
          <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="item in list"
              :key="item.id"
              :title="item.title"
              :label="item.desc"
            />
          </van-list>
        </div>
      </van-pull-refresh>
    `,
  }),
};

export const CustomLoading = {
  name: '自定义加载提示',
  render: (args: any, { argTypes }: any) => ({
    props: Object.keys(argTypes),
    setup() {
      const list = ref<ListItem[]>([]);
      const loading = ref(false);
      const finished = ref(false);

      const loadData = () => {
        loading.value = true;
        setTimeout(() => {
          const newItems: ListItem[] = Array.from({ length: 5 }, (_, index) => ({
            id: list.value.length + index + 1,
            title: `列表项 ${list.value.length + index + 1}`,
            desc: `这是第 ${list.value.length + index + 1} 个列表项`,
          }));

          list.value.push(...newItems);
          loading.value = false;

          if (list.value.length >= 20) {
            finished.value = true;
          }
        }, 1500);
      };

      loadData();

      const onLoad = () => {
        if (!loading.value && !finished.value) {
          loadData();
        }
      };

      return {
        args,
        list,
        loading,
        finished,
        onLoad,
      };
    },
    template: `
      <div style="height: 400px; overflow-y: auto;">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell
            v-for="item in list"
            :key="item.id"
            :title="item.title"
            :label="item.desc"
          />

          <template #loading>
            <div style="padding: 16px; text-align: center; color: #969799;">
              <van-loading size="24px">加载中...</van-loading>
            </div>
          </template>

          <template #finished>
            <div style="padding: 16px; text-align: center; color: #969799;">
              <van-icon name="success" style="margin-right: 8px;" />
              已加载完成
            </div>
          </template>
        </van-list>
      </div>
    `,
  }),
};

export const Offset = {
  name: '自定义触发距离',
  render: (args: any, { argTypes }: any) => ({
    props: Object.keys(argTypes),
    setup() {
      const list = ref<ListItem[]>([]);
      const loading = ref(false);
      const finished = ref(false);

      const loadData = () => {
        loading.value = true;
        setTimeout(() => {
          const newItems: ListItem[] = Array.from({ length: 3 }, (_, index) => ({
            id: list.value.length + index + 1,
            title: `列表项 ${list.value.length + index + 1}`,
            desc: `这是第 ${list.value.length + index + 1} 个列表项`,
          }));

          list.value.push(...newItems);
          loading.value = false;

          if (list.value.length >= 15) {
            finished.value = true;
          }
        }, 800);
      };

      loadData();

      const onLoad = () => {
        if (!loading.value && !finished.value) {
          loadData();
        }
      };

      return {
        args,
        list,
        loading,
        finished,
        onLoad,
      };
    },
    template: `
      <div style="height: 400px; overflow-y: auto;">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          :offset="100"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell
            v-for="item in list"
            :key="item.id"
            :title="item.title"
            :label="item.desc"
          />
        </van-list>
      </div>
    `,
  }),
};
