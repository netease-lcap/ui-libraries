/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'container',
      structured: true,
      childAccept: "target.tag === 'van-swipe-item'",
      forceUpdateWhenAttributeChange: true,
      dataSource: {
        dismiss: "!this.getAttribute('dataSource') && this.getDefaultElements().length > 0",
        display: 1,
        emptySlot: {
          display: 'inline',
          condition: "!this.getAttribute('dataSource')",
          accept: false,
        },
      },
      events: {
        click: true,
      },
      displaySlotConditions: {
        content: "!!this.getAttribute('dataSource')",
      },
    }
  })
  @Component({
    title: '轮播图',
    icon: 'swipe',
    description: '用于循环播放一组图片或内容',
    group: 'Display',
  })
  export class VanSwipe<T> extends ViewComponent {
    @Method({
      title: '切换到上一轮播',
      description: '切换到上一轮播',
    })
    prev(): void {}

    @Method({
      title: '切换到下一轮播',
      description: '切换到下一轮播',
    })
    next(): void {}

    @Method({
      title: '切换到指定位置',
      description: '切换到指定位置',
    })
    swipeTo(
      @Param({
        title: '索引',
        description: '传入需要切换的幻灯片的索引，从 0 开始',
      })
      index: nasl.core.String | nasl.core.Integer,
      options: {
        immediate: nasl.core.Boolean;
      }
    ): void {}

    @Method({
      title: '重绘',
      description: '外层元素大小或组件显示状态变化时，可以调用此方法来触发重绘',
    })
    resize(): void {}

    constructor(options?: Partial<VanSwipeOptions<T>>) {
      super();
    }
  }
  export class VanSwipeOptions<T> extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑。',
      designerValue: [{}, {}, {}],
      setter: {
        concept: 'DataSourceSetter',
      },
    })
    dataSource: nasl.collection.List<T> | { total: nasl.core.Integer; list: nasl.collection.List<T> };

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '集合类型每一元素的数据类型'
    })
    dataSchema: T;
  
    @Prop({
      group: '主要属性',
      title: '自动轮播间隔',
      description: '自动轮播间隔，单位为 ms',
      setter: { concept: 'InputSetter' },
    })
    autoplay: nasl.core.Integer | nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '动画时长',
      description: '动画时长，单位为 ms',
      setter: { concept: 'InputSetter' },
    })
    duration: nasl.core.String = '500';

    @Prop({
      group: '主要属性',
      title: '初始位置索引值',
      description: '初始位置索引值',
      setter: { concept: 'InputSetter' },
    })
    initialSwipe: nasl.core.String = '0';

    @Prop({
      group: '主要属性',
      title: '滑块宽度',
      description: '滑块宽度，单位为 px',
      setter: { concept: 'NumberInputSetter' },
    })
    width: nasl.core.Integer;

    @Prop({
      group: '主要属性',
      title: '滑块高度',
      description: '滑块高度，单位为 px',
      setter: { concept: 'NumberInputSetter' },
    })
    height: nasl.core.Integer;

    @Prop({
      group: '主要属性',
      title: '是否开启循环播放',
      description: '是否开启循环播放',
      setter: { concept: 'SwitchSetter' },
    })
    loop: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '是否显示指示器',
      description: '是否显示指示器',
      setter: { concept: 'SwitchSetter' },
    })
    showIndicators: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '是否为纵向滚动',
      description: '是否为纵向滚动',
      setter: { concept: 'SwitchSetter' },
    })
    vertical: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否可以通过手势滑动',
      description: '是否可以通过手势滑动',
      setter: { concept: 'SwitchSetter' },
    })
    touchable: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '是否阻止滑动事件冒泡',
      description: '是否阻止滑动事件冒泡',
      setter: { concept: 'SwitchSetter' },
    })
    stopPropagation: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '是否延迟渲染未展示的轮播',
      description: '是否延迟渲染未展示的轮播',
      setter: { concept: 'SwitchSetter' },
    })
    lazyRender: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '指示器颜色',
      description: '指示器颜色',
      setter: { concept: 'InputSetter' },
    })
    indicatorColor: nasl.core.String = '#1989fa';

    @Prop({
      group: '主要属性',
      title: '自定义指示器',
      description: '是否自定义指示器',
      setter: { concept: 'SwitchSetter' },
    })
    isIndicator: nasl.core.Boolean = false;

    @Event({
      title: '每一页轮播结束后触发',
      description: '每一页轮播结束后触发',
    })
    onChange: (current: { index: number }) => void;

    @Event({
      title: '当用户开始拖动轮播组件时触发',
      description: '当用户开始拖动轮播组件时触发',
    })
    onDragStart: (current: { index: number }) => void;

    @Event({
      title: '当用户结束拖动轮播组件时触发',
      description: '当用户结束拖动轮播组件时触发',
    })
    onDragEnd: (current: { index: number }) => void;

    @Slot({
      title: '轮播图子项',
      description: '插入`van-swipe-item`子组件。',
      snippets: [
        {
          title: '轮播图子项',
          code: `<van-swipe-item>
            <van-image src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg" :isCustomDefault="false" />
          </van-swipe-item>`,
        },
      ],
    })
    slotDefault: () => Array<VanSwipeItem>;

    @Slot({
      title: '自定义指示器',
      description: '自定义指示器',
    })
    slotIndicator: (current: { active: number, total: number }) => Array<ViewComponent>;

    @Slot({
      title: '自定义轮播内容',
      description: '自定义轮播内容',
    })
    slotContent: (current: Current<T>) => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'container',
      forceUpdateWhenAttributeChange: true,
      parentAccept: "target.tag === 'van-swipe'",
    }
  })
  @Component({
    title: '轮播图子项',
    description: '轮播图子项',
  })
  export class VanSwipeItem extends ViewComponent {
    constructor(options?: Partial<VanSwipeItemOptions>) {
      super();
    }
  }

  export class VanSwipeItemOptions extends ViewComponentOptions {
    @Event({
      title: '点击时触发',
      description: '点击时触发',
    })
    onClick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => void;

    @Slot({
      title: '内容',
      description: '内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }
} 