/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '选项卡',
    icon: 'tabsh5',
    description: '选项卡切换组件，常用于平级区域大块内容的收纳和展现',
    group: "Selector"
  })
  export class VanTabs<T, V> extends ViewComponent {
    constructor(options?: Partial<VanTabsOptions<T, V>>) {
      super();
    }
  }
  export class VanTabsOptions<T, V> extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '值',
      description: '用于标识选项卡的值',
      sync: true
    })
    value: nasl.core.String;

    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑 。',
      docDescription: '集合类型变量或者输出参数为集合类型的逻辑',
      designerValue: [{}, {}, {}],
    })
    dataSource: nasl.collection.List<T> | { list: nasl.collection.List<T>; total: nasl.core.Integer };

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明。'
    })
    dataSchema: T;

    @Prop({
      group: '数据属性',
      title: '标签项标题',
      description: '数据源集合的元素，用于显示标签标题的属性',
      docDescription: '数据源集合的元素，用于显示标签标题的属性',
      setter: {
          concept: 'PropertySelectSetter',
      },
    })
    textField: (item: T) => any = ((item: any)  => item.title) as any;

    @Prop<VanTabsOptions<T, V>, 'urlField'>({
      group: '数据属性',
      title: '标签项内容值字段',
      description: '数据源集合的元素，用于标识当前打开的标签项',
      docDescription: '数据源集合的元素，用于标识当前打开的标签项',
      setter: {
          concept: 'PropertySelectSetter',
      },
    })
    urlField: (item: T) => any = ((item: any)  => item.url) as any;
    
    @Prop({
      group: '主要属性',
      title: '样式类型',
      description: '设置选项卡为线条类型或胶囊类型',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '线条'
        }, {
          title: '胶囊'
        }]
      }
    })
    type: 'line' | 'card' = 'line';
    @Prop({
      group: '主要属性',
      title: '自动吸顶',
      setter: {
        concept: "SwitchSetter"
      }
    })
    sticky: nasl.core.Boolean = false;
    @Prop({
      group: '主要属性',
      title: '导航模式',
      description: '设置选项卡的导航模式',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '切换导航'
        }, {
          title: '滚动导航'
        }]
      }
    })
    scrollspystr: 'no' | 'scrollspy' = 'no';
    @Prop({
      group: '交互属性',
      title: '滑动切换',
      setter: {
        concept: "SwitchSetter"
      }
    })
    swipeable: nasl.core.Boolean = false;
    @Prop({
      group: '交互属性',
      title: '开启转场动画',
      setter: {
        concept: "SwitchSetter"
      }
    })
    animated: nasl.core.Boolean = false;
    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      setter: {
        concept: "SwitchSetter"
      }
    })
    disabled: nasl.core.Boolean = false;
    @Event({
      title: '点击标签',
      description: '点击标签时触发'
    })
    onClick: (event: nasl.core.String) => any ;
    @Event({
      title: '标签改变',
      description: '当前激活的标签改变时触发'
    })
    onChange: (event: nasl.core.String) => any ;
    @Slot({
      title: '默认',
      description: '插入`<van-tab>`子组件。',
      emptyBackground: 'add-sub',
      snippets: [{
        title: '子选项',
        code: '<van-tab title="标签页">内容</van-tab>'
      }]
    })
    slotDefault: () => Array<VanTab>;
  }
  @Component({
    title: '标签页',
    group: "Selector"
  })
  export class VanTab extends ViewComponent {
    constructor(options?: Partial<VanTabOptions>) {
      super();
    }
  }
  export class VanTabOptions extends ViewComponentOptions {
    @Prop({
      title: '标题',
      description: '自定义标题'
    })
    private title: nasl.core.String = '标题';
    @Prop({
      group: '数据属性',
      title: '选项值',
      description: '用于标识选项的值'
    })
    name: nasl.core.String;
    @Prop({
      group: '数据属性',
      title: '显示徽章',
      setter: {
        concept: "SwitchSetter"
      },
      onChange: [{
        clear: ['badge', 'badgemax']
      }]
    })
    badgebtn: nasl.core.Boolean = false;
    @Prop<VanTabOptions, 'badge'>({
      group: '数据属性',
      title: '徽章值',
      setter: {
        concept: "NumberInputSetter"
      },
      if: _ => _.badgebtn === true,
    })
    badge: nasl.core.Decimal;
    @Prop<VanTabOptions, 'badgemax'>({
      group: '数据属性',
      title: '徽章最大值',
      description: '徽章内容为数字时显示的最大值',
      setter: {
        concept: "NumberInputSetter"
      },
      if: _ => _.badgebtn === true,
    })
    badgemax: nasl.core.Decimal;
    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      setter: {
        concept: "SwitchSetter"
      }
    })
    disabled: nasl.core.Boolean = false;
    @Slot({
      title: '默认',
      description: '显示的内容'
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '',
      description: ''
    })
    slotTitle: () => Array<ViewComponent>;
  }
}
