/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 13,
    ideusage: {
      idetype: 'container',
      structured: true,
      childAccept: "target.tag === 'el-anchor-link'",
      forceUpdateWhenAttributeChange: true,
      dataSource: {
        dismiss: "!this.getAttribute('dataSource') && this.getDefaultElements().length > 0",
        display: 3,
        loopRule: 'nth-child(n+2)',
        loopElem: ' > .el-anchor__item',
        emptySlot: {
          display: 'large',
          condition: "!this.getAttribute('dataSource')",
          accept: false,
        },
      },
      displaySlotConditions: {
        content: "!!this.getAttribute('dataSource')"
      }
    },
  })
  @Component({
    title: '锚点',
    icon: 'anchor',
    description: '快速找到当前页面上信息内容的位置',
    group: 'Display',
  })
  export class ElAnchor<T, V> extends ViewComponent {
    @Method({
      title: 'undefined',
      description: '清除缓存，重新加载',
    })
    reload(): void {}

    constructor(options?: Partial<ElAnchorOptions<T, V>>) {
      super();
    }
  }

  export class ElAnchorOptions<T, V> extends ViewComponentOptions {
    // ========== 数据来源相关属性 ==========
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '锚点的数据来源',
      docDescription: '设置锚点的数据来源，支持动态绑定集合类型变量（List<T>）或输出参数为集合类型的逻辑。',
      designerValue: [{}],
    })
    dataSource: { list: nasl.collection.List<T>; total: nasl.core.Integer } | nasl.collection.List<T>;

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构类型',
      docDescription: '该属性为只读状态，当数据源动态绑定集合List<T>后，会自动识别T的类型并进行展示说明。',
    })
    dataSchema: T;
    
    @Prop<ElAnchorOptions<T, V>, 'hrefField'>({
      group: '数据属性',
      title: '链接字段',
      description: '用于标识锚点链接的字段',
      docDescription: '集合的元素类型中，用于标识锚点链接地址的属性名称，支持自定义变更。',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    hrefField: (item: T) => V = ((item: any) => item.href) as any;

    // @Prop({
    //   group: '主要属性',
    //   title: '滚动的容器',
    //   description: '滚动的容器',
    //   setter: { concept: 'InputSetter' },
    // })
    // container: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '偏移量',
      description: '偏移量',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    offset: nasl.core.Integer = 0;

    @Prop({
      group: '主要属性',
      title: '位置偏移量',
      description: '触发锚点的元素的位置偏移量',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    bound: nasl.core.Integer = 15;

    @Prop({
      group: '主要属性',
      title: '滚动持续时间',
      description: '设置容器滚动持续时间，单位为毫秒。',
      setter: {
        concept: 'NumberInputSetter',
        min: 0,
      },
    })
    duration: nasl.core.Integer = 300;

    @Prop({
      group: '主要属性',
      title: '显示标记',
      description: '是否显示标记',
      setter: { concept: 'SwitchSetter' },
    })
    marker: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '类型',
      description: '设置锚点类型',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '默认' }, { title: '下划线' }],
      },
    })
    type: 'default' | 'underline' = 'default';

    @Prop({
      group: '主要属性',
      title: '锚点方向',
      description: '设置锚点方向',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '垂直' }, { title: '水平' }],
      },
    })
    direction: 'vertical' | 'horizontal' = 'vertical';

    @Prop({
      group: '主要属性',
      title: '选中位于顶部',
      description: '滚动时，链接是否选中位于顶部',
      setter: { concept: 'SwitchSetter' },
    })
    selectScrollTop: nasl.core.Boolean = false;

    @Event({
      title: '改变时触发',
      description: 'step 改变时的回调',
    })
    onChange: (href: nasl.core.String) => void;

    @Event({
      title: '点击',
      description: '当用户点击链接时触发',
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
    }, href: nasl.core.String) => void;

    @Slot({
      title: 'Default',
      description: '分割线内文案的内容',
      snippets: [
        {
          title: '锚点链接',
          code: `<el-anchor-link><el-text text="标题"></el-text></el-anchor-link>`,
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '内容',
      description: '内容',
    })
    slotContent: (current: Current<T>) => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      parentAccept: "target.tag === 'el-anchor'",
      // structured: true,
    },
  })
  @Component({
    title: '锚点链接',
    icon: 'anchor-link',
    description: '',
    group: 'Display',
  })
  export class ElAnchorLink extends ViewComponent {
    constructor(options?: Partial<ElAnchorLinkOptions>) {
      super();
    }
  }

  export class ElAnchorLinkOptions extends ViewComponentOptions {
    // @Prop({
    //   group: '主要属性',
    //   title: '链接文本',
    //   description: '链接的文本内容',
    //   setter: { concept: 'InputSetter' },
    // })
    // title: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '链接地址',
      description: '链接地址',
      setter: { concept: 'InputSetter' },
    })
    href: nasl.core.String;

    @Slot({
      title: '内容',
      description: '内容',
    })
    slotDefault: () => Array<ViewComponent>;

    // @Slot({
    //   title: '子链接',
    //   description: '子链接',
    //   snippets: [
    //     {
    //       title: '子链接',
    //       code: `<el-anchor-link><el-text text="标题"></el-text></el-anchor-link>`,
    //     },
    //   ],
    // })
    // slotSubLink: () => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
    },
  })
  @Component({
    title: '锚点项',
    icon: 'anchor-item',
    description: '',
    group: 'Display',
  })
  export class ElAnchorItem extends ViewComponent {
    constructor(options?: Partial<ElAnchorItemOptions>) {
      super();
    }
  }

  export class ElAnchorItemOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '标识',
      description: '锚点的唯一标识，用于跳转链接，如"section1"',
      docDescription: '锚点的唯一标识，用于跳转链接，标识为空时，默认将组件名作为标识',
      setter: { concept: 'InputSetter' },
    })
    label: nasl.core.String;

    @Slot({
      title: '内容',
      description: '内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
