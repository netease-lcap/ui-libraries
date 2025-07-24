/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'container',
      dataSource: {
        display: 3,
        loopElem: '.van-list__item',
        displayData: '"[{}, {}, {}]"',
        propertyName: ':dataSource',
        emptySlot: {
          condition: 'this.elementsLength() === 0',
          accept: "target.concept === 'Entity'",
        },
      },
      childAccept: false,
      useTemplateInDefaultSlot: true,
    },
  })
  @Component({
    title: '列表',
    icon: 'list',
    description: '瀑布流滚动加载，用于展示长列表，当列表即将滚动到底部时，会触发事件并加载更多列表项。',
    group: 'Display',
  })
  export class VanList<T> extends ViewComponent {
    @Prop({
      title: '数据',
    })
    data: nasl.collection.List<T>;

    @Method({
      title: '重新加载',
      description: '清除缓存，重新加载',
    })
    reload(): void {}

    constructor(options?: Partial<VanListOptions<T>>) {
      super();
    }
  }

  export class VanListOptions<T> extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑',
      docDescription: '组件的数据源，配置内容为数据集对象或者返回数据集的逻辑。',
      bindOpen: true,
    })
    dataSource: nasl.collection.List<T> | { list: nasl.collection.List<T>; total: nasl.core.Integer };

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明',
      docDescription: 'IDE 根据配置的数据源动态计算返回内容的数据结构，用于动态配置项 current.item 的类型说明。',
    })
    dataSchema: T;

    @Prop({
      group: '主要属性',
      title: '是否正在加载',
      description: '是否处于加载状态，加载过程中不触发load事件',
      setter: { concept: 'SwitchSetter' },
    })
    loading: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否已加载完成',
      description: '是否已加载完成，完成后不再触发load事件',
      setter: { concept: 'SwitchSetter' },
    })
    finished: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否加载失败',
      description: '是否加载失败，失败后点击错误提示可以重新触发load事件',
      setter: { concept: 'SwitchSetter' },
    })
    error: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '滚动触发加载的阈值',
      description: '滚动条与底部距离小于 offset 时触发load事件',
      setter: { concept: 'NumberInputSetter' },
    })
    offset: nasl.core.Decimal = 300;

    @Prop({
      group: '主要属性',
      title: '是否开启下拉刷新',
      description: '是否开启下拉刷新',
      setter: { concept: 'SwitchSetter' },
    })
    pullRefresh: nasl.core.Boolean = false;

    @Prop({
      group: '样式属性',
      title: '加载过程中的提示文案',
      description: '加载过程中的提示文案',
      setter: { concept: 'InputSetter' },
    })
    loadingText: nasl.core.String = '加载中...';

    @Prop({
      group: '样式属性',
      title: '加载完成后的提示文案',
      description: '加载完成后的提示文案',
      setter: { concept: 'InputSetter' },
    })
    finishedText: nasl.core.String = '没有更多了';

    @Prop({
      group: '样式属性',
      title: '加载失败后的提示文案',
      description: '加载失败后的提示文案',
      setter: { concept: 'InputSetter' },
    })
    errorText: nasl.core.String = '请求失败，点击重新加载';

    @Prop({
      group: '主要属性',
      title: '是否在初始化时立即执行滚动位置检查',
      description: '是否在初始化时立即执行滚动位置检查',
      setter: { concept: 'SwitchSetter' },
    })
    immediateCheck: nasl.core.Boolean = true;

    @Event({
      title: '加载事件',
      description: '滚动条与底部距离小于 offset 时触发',
    })
    onLoad: (event: any) => any;

    @Event({
      title: '下拉刷新事件',
      description: '下拉刷新时触发',
    })
    onRefresh: (event: any) => any;

    @Slot({
      title: '默认',
      description: '列表项内容',
    })
    slotDefault: (current: Current<T>) => Array<ViewComponent>;

    @Slot({
      title: '加载中',
      description: '自定义底部加载中提示',
    })
    slotLoading: () => Array<ViewComponent>;

    @Slot({
      title: '加载完成',
      description: '自定义底部加载完成提示',
    })
    slotFinished: () => Array<ViewComponent>;

    @Slot({
      title: '加载失败',
      description: '自定义底部加载失败提示',
    })
    slotError: () => Array<ViewComponent>;
  }
} 