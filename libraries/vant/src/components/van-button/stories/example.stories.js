import Component from '../index';

export default {
  id: 'van-button-examples',
  title: '组件列表/Button 按钮/示例',
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
        handleClick() {
          console.log('按钮被点击');
        },
      };
    },
    template: `
      <van-button v-bind="args" @click="handleClick"></van-button>
    `,
  }),
  args: {
    text: '默认按钮',
    icon: 'plus',
    iconPosition: 'right',
    type: 'primary',
    disabled: false,
    plain: false,
    loading: false,
  },
};

export const Types = {
  name: '按钮类型',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
        handleClick() {
          console.log('按钮被点击');
        },
      };
    },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <van-button text="默认按钮" @click="handleClick"></van-button>
        <van-button text="主要按钮" type="primary" @click="handleClick"></van-button>
        <van-button text="成功按钮" type="success" @click="handleClick"></van-button>
        <van-button text="信息按钮" type="info" @click="handleClick"></van-button>
        <van-button text="警告按钮" type="warning" @click="handleClick"></van-button>
        <van-button text="危险按钮" type="danger" @click="handleClick"></van-button>
      </div>
    `,
  }),
};

export const Sizes = {
  name: '按钮尺寸',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
        handleClick() {
          console.log('按钮被点击');
        },
      };
    },
    template: `
      <div style="display: flex; gap: 8px; align-items: center;">
        <van-button text="小按钮" size="small" @click="handleClick"></van-button>
        <van-button text="默认按钮" size="default" @click="handleClick"></van-button>
        <van-button text="大按钮" size="large" @click="handleClick"></van-button>
      </div>
    `,
  }),
};

export const Plain = {
  name: '朴素按钮',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
        handleClick() {
          console.log('按钮被点击');
        },
      };
    },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <van-button text="朴素按钮" plain @click="handleClick"></van-button>
        <van-button text="主要按钮" type="primary" plain @click="handleClick"></van-button>
        <van-button text="成功按钮" type="success" plain @click="handleClick"></van-button>
        <van-button text="信息按钮" type="info" plain @click="handleClick"></van-button>
        <van-button text="警告按钮" type="warning" plain @click="handleClick"></van-button>
        <van-button text="危险按钮" type="danger" plain @click="handleClick"></van-button>
      </div>
    `,
  }),
};

export const Round = {
  name: '圆角按钮',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
        handleClick() {
          console.log('按钮被点击');
        },
      };
    },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <van-button text="圆角按钮" round @click="handleClick"></van-button>
        <van-button text="主要按钮" type="primary" round @click="handleClick"></van-button>
        <van-button text="成功按钮" type="success" round @click="handleClick"></van-button>
        <van-button text="信息按钮" type="info" round @click="handleClick"></van-button>
        <van-button text="警告按钮" type="warning" round @click="handleClick"></van-button>
        <van-button text="危险按钮" type="danger" round @click="handleClick"></van-button>
      </div>
    `,
  }),
};

export const Circle = {
  name: '圆形按钮',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
        handleClick() {
          console.log('按钮被点击');
        },
      };
    },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <van-button icon="Plus" circle @click="handleClick"></van-button>
        <van-button icon="Plus" type="primary" circle @click="handleClick"></van-button>
        <van-button icon="Plus" type="success" circle @click="handleClick"></van-button>
        <van-button icon="Plus" type="info" circle @click="handleClick"></van-button>
        <van-button icon="Plus" type="warning" circle @click="handleClick"></van-button>
        <van-button icon="Plus" type="danger" circle @click="handleClick"></van-button>
      </div>
    `,
  }),
};

export const Loading = {
  name: '加载状态',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
        handleClick() {
          console.log('按钮被点击');
        },
      };
    },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <van-button text="加载中" loading @click="handleClick"></van-button>
        <van-button text="加载中" type="primary" loading @click="handleClick"></van-button>
        <van-button text="加载中" type="success" loading @click="handleClick"></van-button>
        <van-button text="加载中" type="info" loading @click="handleClick"></van-button>
        <van-button text="加载中" type="warning" loading @click="handleClick"></van-button>
        <van-button text="加载中" type="danger" loading @click="handleClick"></van-button>
      </div>
    `,
  }),
};

export const Disabled = {
  name: '禁用状态',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
        handleClick() {
          console.log('按钮被点击');
        },
      };
    },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <van-button text="禁用按钮" disabled @click="handleClick"></van-button>
        <van-button text="禁用按钮" type="primary" disabled @click="handleClick"></van-button>
        <van-button text="禁用按钮" type="success" disabled @click="handleClick"></van-button>
        <van-button text="禁用按钮" type="info" disabled @click="handleClick"></van-button>
        <van-button text="禁用按钮" type="warning" disabled @click="handleClick"></van-button>
        <van-button text="禁用按钮" type="danger" disabled @click="handleClick"></van-button>
      </div>
    `,
  }),
};

export const WithIcon = {
  name: '带图标',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
        handleClick() {
          console.log('按钮被点击');
        },
      };
    },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <van-button text="左图标" icon="Search" @click="handleClick"></van-button>
        <van-button text="右图标" rightIcon="Arrow" @click="handleClick"></van-button>
        <van-button text="双图标" icon="Search" rightIcon="Arrow" @click="handleClick"></van-button>
      </div>
    `,
  }),
};

export const Block = {
  name: '块级元素',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
        handleClick() {
          console.log('按钮被点击');
        },
      };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <van-button text="块级按钮" block @click="handleClick"></van-button>
        <van-button text="块级按钮" type="primary" block @click="handleClick"></van-button>
        <van-button text="块级按钮" type="success" block @click="handleClick"></van-button>
      </div>
    `,
  }),
};
