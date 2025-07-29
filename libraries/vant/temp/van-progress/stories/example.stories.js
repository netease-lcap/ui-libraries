import Component from '../index';

export default {
  id: 'van-progress-examples',
  title: '组件列表/Progress 进度条/示例',
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
        percentage: 50,
        handleClick(event) {
          console.log('进度条点击:', event);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-progress 
          v-model="percentage" 
          v-bind="args" 
          @click="handleClick">
        </van-progress>
        <p style="margin-top: 10px;">当前进度: {{ percentage }}%</p>
      </div>
    `,
  }),
  args: {
    type: 'line',
    color: '#1989fa',
    trackColor: '#ebedf0',
    strokeWidth: 4,
    showPivot: true,
  },
};

export const CircleProgress = {
  name: '环形进度条',
  render: () => ({
    setup() {
      return {
        percentage: 50,
        handleClick(event) {
          console.log('进度条点击:', event);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-progress 
          v-model="percentage" 
          type="circle"
          :size="120"
          :line-width="8"
          @click="handleClick">
        </van-progress>
        <p style="margin-top: 10px;">当前进度: {{ percentage }}%</p>
      </div>
    `,
  }),
};

export const CustomColor = {
  name: '自定义颜色',
  render: () => ({
    setup() {
      return {
        percentage: 50,
        handleClick(event) {
          console.log('进度条点击:', event);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-progress 
          v-model="percentage" 
          color="#ee0a24"
          track-color="#ffecf1"
          @click="handleClick">
        </van-progress>
        <p style="margin-top: 10px;">当前进度: {{ percentage }}%</p>
      </div>
    `,
  }),
};

export const CustomSize = {
  name: '自定义尺寸',
  render: () => ({
    setup() {
      return {
        percentage: 50,
        handleClick(event) {
          console.log('进度条点击:', event);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-progress 
          v-model="percentage" 
          :stroke-width="8"
          :track-width="8"
          @click="handleClick">
        </van-progress>
        <p style="margin-top: 10px;">当前进度: {{ percentage }}%</p>
      </div>
    `,
  }),
};

export const TextInside = {
  name: '文字内显',
  render: () => ({
    setup() {
      return {
        percentage: 50,
        handleClick(event) {
          console.log('进度条点击:', event);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-progress 
          v-model="percentage" 
          :stroke-width="20"
          text-inside
          @click="handleClick">
        </van-progress>
        <p style="margin-top: 10px;">当前进度: {{ percentage }}%</p>
      </div>
    `,
  }),
};

export const CustomText = {
  name: '自定义文字',
  render: () => ({
    setup() {
      return {
        percentage: 50,
        handleClick(event) {
          console.log('进度条点击:', event);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-progress 
          v-model="percentage" 
          pivot-text="已完成"
          @click="handleClick">
        </van-progress>
        <p style="margin-top: 10px;">当前进度: {{ percentage }}%</p>
      </div>
    `,
  }),
};

export const Animated = {
  name: '动画效果',
  render: () => ({
    setup() {
      return {
        percentage: 50,
        handleClick(event) {
          console.log('进度条点击:', event);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-progress 
          v-model="percentage" 
          animated
          :duration="1000"
          @click="handleClick">
        </van-progress>
        <p style="margin-top: 10px;">当前进度: {{ percentage }}%</p>
      </div>
    `,
  }),
};

export const Striped = {
  name: '条纹效果',
  render: () => ({
    setup() {
      return {
        percentage: 50,
        handleClick(event) {
          console.log('进度条点击:', event);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-progress 
          v-model="percentage" 
          striped
          @click="handleClick">
        </van-progress>
        <p style="margin-top: 10px;">当前进度: {{ percentage }}%</p>
      </div>
    `,
  }),
};

export const StripedFlow = {
  name: '流动条纹',
  render: () => ({
    setup() {
      return {
        percentage: 50,
        handleClick(event) {
          console.log('进度条点击:', event);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-progress 
          v-model="percentage" 
          striped
          striped-flow
          @click="handleClick">
        </van-progress>
        <p style="margin-top: 10px;">当前进度: {{ percentage }}%</p>
      </div>
    `,
  }),
};

export const TextPosition = {
  name: '文字位置',
  render: () => ({
    setup() {
      return {
        percentage: 50,
        handleClick(event) {
          console.log('进度条点击:', event);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-progress 
          v-model="percentage" 
          text-position="left"
          @click="handleClick">
        </van-progress>
        <p style="margin-top: 10px;">当前进度: {{ percentage }}%</p>
      </div>
    `,
  }),
};

export const HideText = {
  name: '隐藏文字',
  render: () => ({
    setup() {
      return {
        percentage: 50,
        handleClick(event) {
          console.log('进度条点击:', event);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-progress 
          v-model="percentage" 
          :show-pivot="false"
          @click="handleClick">
        </van-progress>
        <p style="margin-top: 10px;">当前进度: {{ percentage }}%</p>
      </div>
    `,
  }),
};

export const CustomFormat = {
  name: '自定义格式',
  render: () => ({
    setup() {
      return {
        percentage: 50,
        handleClick(event) {
          console.log('进度条点击:', event);
        },
        formatText(percentage) {
          if (percentage < 30) {
            return '低';
          } else if (percentage < 70) {
            return '中';
          } else {
            return '高';
          }
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-progress 
          v-model="percentage" 
          :format="formatText"
          @click="handleClick">
        </van-progress>
        <p style="margin-top: 10px;">当前进度: {{ percentage }}%</p>
      </div>
    `,
  }),
};

export const CircleCustom = {
  name: '环形自定义',
  render: () => ({
    setup() {
      return {
        percentage: 50,
        handleClick(event) {
          console.log('进度条点击:', event);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-progress 
          v-model="percentage" 
          type="circle"
          :size="150"
          :line-width="12"
          color="#07c160"
          track-color="#f0f9ff"
          stroke-linecap="round"
          @click="handleClick">
        </van-progress>
        <p style="margin-top: 10px;">当前进度: {{ percentage }}%</p>
      </div>
    `,
  }),
}; 
