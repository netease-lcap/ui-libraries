import { ref } from 'vue';
import Component from '../index';

export default {
  id: 'van-swipe-cell-examples',
  title: '组件列表/SwipeCell 滑动单元格/示例',
  component: Component,
  parameters: {
    layout: 'padded',
  },
};

export const Default = {
  name: '基础用法',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      const swipeCell = ref(null);
      setTimeout(() => {
        console.log(swipeCell, 'swipeCell');
      }, 1000);
      return {
        args,
        swipeCell,
        handleClick(event) {
          console.log('点击事件:', event);
        },
        handleOpen(event) {
          console.log('打开事件:', event);
        },
        handleClose(event) {
          console.log('关闭事件:', event);
        },
        handleBeforeClose(event) {
          console.log('关闭前事件:', event);
          return false;
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-swipe-cell 
          ref="swipeCell"
          v-bind="args" 
          @click="handleClick"
          @before-close="handleBeforeClose"
          @open="handleOpen"
          @close="handleClose">
          <van-text>123</van-text>
          <template #right>
            <van-button square type="danger" text="删除"></van-button>
          </template>
        </van-swipe-cell>
      </div>
    `,
  }),
  args: {
    name: 'swipe-cell-1',
    disabled: false,
  },
};

export const CustomWidth = {
  name: '自定义宽度',
  render: () => ({
    setup() {
      return {
        handleClick(event) {
          console.log('点击事件:', event);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-swipe-cell 
          :left-width="100"
          :right-width="100"
          @click="handleClick">
          <van-cell title="单元格" value="内容"></van-cell>
          <template #left>
            <van-button square type="primary" text="选择"></van-button>
          </template>
          <template #right>
            <van-button square type="danger" text="删除"></van-button>
          </template>
        </van-swipe-cell>
      </div>
    `,
  }),
};

export const MultipleButtons = {
  name: '多个按钮',
  render: () => ({
    setup() {
      return {
        handleClick(event) {
          console.log('点击事件:', event);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-swipe-cell @click="handleClick">
          <van-cell title="单元格" value="内容"></van-cell>
          <template #right>
            <van-button square type="primary" text="收藏"></van-button>
            <van-button square type="warning" text="编辑"></van-button>
            <van-button square type="danger" text="删除"></van-button>
          </template>
        </van-swipe-cell>
      </div>
    `,
  }),
};

export const Disabled = {
  name: '禁用状态',
  render: () => ({
    setup() {
      return {
        handleClick(event) {
          console.log('点击事件:', event);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-swipe-cell 
          disabled
          @click="handleClick">
          <van-cell title="单元格" value="内容"></van-cell>
          <template #right>
            <van-button square type="danger" text="删除"></van-button>
          </template>
        </van-swipe-cell>
      </div>
    `,
  }),
};

export const CustomContent = {
  name: '自定义内容',
  render: () => ({
    setup() {
      return {
        handleClick(event) {
          console.log('点击事件:', event);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-swipe-cell @click="handleClick">
          <div style="padding: 16px; background: #fff; border-bottom: 1px solid #ebedf0;">
            <div style="font-size: 16px; font-weight: bold;">自定义内容</div>
            <div style="font-size: 14px; color: #969799; margin-top: 4px;">这是自定义的内容区域</div>
          </div>
          <template #right>
            <van-button square type="danger" text="删除"></van-button>
          </template>
        </van-swipe-cell>
      </div>
    `,
  }),
};

export const ListExample = {
  name: '列表示例',
  render: () => ({
    setup() {
      return {
        items: [
          { id: 1, title: '商品1', price: '¥99.00' },
          { id: 2, title: '商品2', price: '¥199.00' },
          { id: 3, title: '商品3', price: '¥299.00' },
        ],
        handleClick(event) {
          console.log('点击事件:', event);
        },
        handleDelete(item) {
          console.log('删除商品:', item);
        },
        handleEdit(item) {
          console.log('编辑商品:', item);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-swipe-cell 
          v-for="item in items" 
          :key="item.id"
          :name="item.id"
          @click="handleClick">
          <van-cell :title="item.title" :value="item.price"></van-cell>
          <template #right>
            <van-button 
              square 
              type="warning" 
              text="编辑"
              @click="handleEdit(item)">
            </van-button>
            <van-button 
              square 
              type="danger" 
              text="删除"
              @click="handleDelete(item)">
            </van-button>
          </template>
        </van-swipe-cell>
      </div>
    `,
  }),
};

export const AsyncAction = {
  name: '异步操作',
  render: () => ({
    setup() {
      return {
        loading: false,
        handleClick(event) {
          console.log('点击事件:', event);
        },
        async handleDelete() {
          this.loading = true;
          // 模拟异步操作
          await new Promise((resolve) => setTimeout(resolve, 1000));
          console.log('删除成功');
          this.loading = false;
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-swipe-cell @click="handleClick">
          <van-cell title="单元格" value="内容"></van-cell>
          <template #right>
            <van-button 
              square 
              type="danger" 
              text="删除"
              :loading="loading"
              @click="handleDelete">
            </van-button>
          </template>
        </van-swipe-cell>
      </div>
    `,
  }),
};

export const CustomStyle = {
  name: '自定义样式',
  render: () => ({
    setup() {
      return {
        handleClick(event) {
          console.log('点击事件:', event);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-swipe-cell @click="handleClick">
          <van-cell title="单元格" value="内容"></van-cell>
          <template #right>
            <div style="display: flex; height: 100%;">
              <van-button 
                square 
                type="primary" 
                text="收藏"
                style="background: #1989fa;">
              </van-button>
              <van-button 
                square 
                type="warning" 
                text="编辑"
                style="background: #ff976a;">
              </van-button>
              <van-button 
                square 
                type="danger" 
                text="删除"
                style="background: #ee0a24;">
              </van-button>
            </div>
          </template>
        </van-swipe-cell>
      </div>
    `,
  }),
};
