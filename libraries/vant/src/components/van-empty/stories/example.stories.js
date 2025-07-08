import Component from '../index';

export default {
  id: 'van-empty-examples',
  title: '组件列表/Empty 空状态/示例',
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
      return {
        args,
      };
    },
    template: `
      <van-empty v-bind="args" />
    `,
  }),
  args: {
    image: 'default',
    description: '暂无数据',
    imageSize: '160px',
    showImage: true,
    showDescription: true,
  },
};

export const ImageTypes = {
  name: '图片类型',
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <van-empty image="default" description="暂无数据" />
        <van-empty image="error" description="加载失败" />
        <van-empty image="network" description="网络错误" />
        <van-empty image="search" description="暂无搜索结果" />
      </div>
    `,
  }),
};

export const CustomImage = {
  name: '自定义图片',
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <van-empty
          custom-image="https://img01.yzcdn.cn/vant/leaf.jpg"
          description="自定义图片"
        />
        <van-empty
          custom-image="https://img01.yzcdn.cn/vant/cat.jpeg"
          description="可爱猫咪"
        />
      </div>
    `,
  }),
};

export const CustomSize = {
  name: '自定义大小',
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <van-empty
          image="default"
          description="小尺寸"
          image-size="80px"
        />
        <van-empty
          image="default"
          description="默认尺寸"
          image-size="160px"
        />
        <van-empty
          image="default"
          description="大尺寸"
          image-size="240px"
        />
      </div>
    `,
  }),
};

export const BottomContent = {
  name: '底部内容',
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <van-empty description="暂无数据">
          <van-button round type="primary" size="small">
            立即添加
          </van-button>
        </van-empty>
        <van-empty description="暂无搜索结果">
          <van-button round type="danger" size="small">
            重新搜索
          </van-button>
        </van-empty>
        <van-empty description="网络连接失败">
          <van-button round type="warning" size="small">
            重试
          </van-button>
        </van-empty>
      </div>
    `,
  }),
};

export const CustomSlots = {
  name: '自定义插槽',
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <van-empty>
          <template #image>
            <div style="width: 160px; height: 160px; background: #f2f3f5; display: flex; align-items: center; justify-content: center; border-radius: 8px;">
              <van-icon name="star" size="48" color="#969799" />
            </div>
          </template>
          <template #description>
            <span style="color: #1989fa; font-weight: bold;">自定义描述</span>
          </template>
          <van-button round type="primary" size="small">
            自定义按钮
          </van-button>
        </van-empty>
      </div>
    `,
  }),
};

export const HideElements = {
  name: '隐藏元素',
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <van-empty
          :show-image="false"
          description="只显示描述文字"
        />
        <van-empty
          :show-description="false"
          image="default"
        >
          <van-button round type="primary" size="small">
            只有图片和按钮
          </van-button>
        </van-empty>
        <van-empty
          :show-image="false"
          :show-description="false"
        >
          <van-button round type="primary" size="small">
            只有按钮
          </van-button>
        </van-empty>
      </div>
    `,
  }),
};

export const CustomStyle = {
  name: '自定义样式',
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <van-empty
          image="default"
          description="蓝色主题"
          description-color="#1989fa"
          description-font-size="16px"
        />
        <van-empty
          image="default"
          description="绿色主题"
          description-color="#07c160"
          description-font-size="18px"
        />
        <van-empty
          image="default"
          description="红色主题"
          description-color="#ee0a24"
          description-font-size="12px"
        />
      </div>
    `,
  }),
};

export const CustomMargin = {
  name: '自定义边距',
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <van-empty
          image="default"
          description="小边距"
          bottom-margin-top="8px"
        >
          <van-button round type="primary" size="small">
            按钮
          </van-button>
        </van-empty>
        <van-empty
          image="default"
          description="默认边距"
          bottom-margin-top="24px"
        >
          <van-button round type="primary" size="small">
            按钮
          </van-button>
        </van-empty>
        <van-empty
          image="default"
          description="大边距"
          bottom-margin-top="48px"
        >
          <van-button round type="primary" size="small">
            按钮
          </van-button>
        </van-empty>
      </div>
    `,
  }),
}; 