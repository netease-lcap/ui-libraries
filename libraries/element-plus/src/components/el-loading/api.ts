/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 8,
    ideusage: {
      idetype: 'container',
      forceUpdateWhenAttributeChange: true,
      selector: {
        expression: 'this',
        cssSelector: "[data-component-name='el-loading']",
        innerCSSSelector: {
          condition: "this.getAttribute('visible')?.value",
          cssSelector: '.el-loading-mask',
        },
      },
    },
  })
  @Component({
    title: 'Loading加载',
    icon: 'loading',
    description: '加载数据时显示动效。',
    group: 'Feedback',
  })
  export class ElLoading extends ViewComponent {
    @Method({
      title: '显示Loading',
      description: '显示Loading',
    })
    show(): void {}

    @Method({
      title: '关闭Loading',
      description: '关闭Loading',
    })
    hide(): void {}

    constructor(options?: Partial<ElLoadingOptions>) {
      super();
    }
  }

  export class ElLoadingOptions extends ViewComponentOptions {
    // ========== 涉及组件的可用、不可用、加载等状态 ==========
    @Prop({
      title: '显示状态',
      description: '控制加载动画的显示和隐藏',
      docDescription: '绑定加载动画的显示状态。true：显示加载动画；false：隐藏加载动画。支持双向绑定。',
      group: '状态属性',
      setter: {
        concept: 'SwitchSetter',
      },
      sync: true,
    })
    visible: nasl.core.Boolean = false;

    // ========== 展示类型/内容/效果/方式相关属性 ==========
    @Prop({
      title: '全屏显示',
      description: '是否全屏显示加载动画',
      docDescription: '开启后，加载动画会覆盖整个页面。关闭后，只在指定容器内显示。',
      group: '主要属性',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    fullscreen: nasl.core.Boolean = true;

    @Prop({
      title: '覆盖节点',
      description: '加载动画覆盖的DOM节点',
      docDescription: '设置加载动画需要覆盖的DOM节点。可传入DOM对象或CSS选择器字符串。',
      group: '主要属性',
      setter: {
        concept: 'InputSetter',
      },
    })
    private target: nasl.core.String;

    // ========== 涉及可选的交互操作和操作效果相关属性 ==========
    @Prop({
      title: '插入到body',
      description: '是否将加载动画插入到body元素',
      docDescription: '开启后，加载遮罩层会直接插入到document.body根节点下。',
      group: '交互属性',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    body: nasl.core.Boolean = false;

    @Prop({
      group: '交互属性',
      title: '滚动锁定',
      description: '是否在加载时锁定页面滚动',
      docDescription: '开启后，当加载动画显示时会锁定背景页面的滚动。',
      setter: { concept: 'SwitchSetter' },
    })
    lock: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '加载文案',
      description: '显示在加载图标下方的加载文案',
      setter: { concept: 'InputSetter' },
    })
    text: nasl.core.String;

    // @Prop({
    //   group: '主要属性',
    //   title: '自定义加载图标类名',
    //   description: '自定义加载图标类名',
    //   setter: { concept: 'InputSetter' },
    // })
    // spinner: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '自定义加载器',
      description: '自定义 SVG 元素覆盖默认加载器',
      setter: { concept: 'InputSetter' },
    })
    svg: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '设置 viewBox 属性',
      description: '设置用于加载 svg 元素的 viewBox 属性',
      setter: { concept: 'InputSetter' },
    })
    svgViewBox: nasl.core.String;

    @Prop({
      group: '样式属性',
      title: '遮罩层背景色',
      description: '遮罩层背景色',
      setter: { concept: 'InputSetter' },
    })
    background: nasl.core.String;

    // @Event({
    //   title: '关闭前的回调',
    //   description: 'Loading 关闭之前执行的函数。 如果此函数返回 false ，关闭过程将被中止。 反之，loading 将被关闭。',
    // })
    // onBeforeClose: (event: any) => any;

    // @Event({
    //   title: '完全关闭后触发的函数',
    //   description: 'Loading 完全关闭后触发的函数',
    // })
    // onClosed: (event: any) => any;

    @Slot({
      title: '覆盖节点',
      description: '覆盖节点',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
