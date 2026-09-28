/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'container',
      structured: true,
      childAccept: "target.tag === 'van-step'",
      forceUpdateWhenAttributeChange: true,
      dataSource: {
        dismiss:
          "!this.getAttribute('dataSource') && this.getDefaultElements().length > 0",
        display: 3,
        loopRule: 'nth-child(n+2)',
        loopElem: ".van-step",
        emptySlot: {
          display: 'large',
          condition: "!this.getAttribute('dataSource')",
          accept: false,
        },
      },
    },
  })
  @Component({
    title: '步骤条',
    icon: 'steps',
    description: '用于展示操作流程的各个环节，让用户了解当前的操作在整体流程中的位置。',
    group: 'Navigation',
  })
  export class VanSteps<T, V> extends ViewComponent {
    @Method({
      title: '上一步',
      description: '上一步',
    })
    prev(): void {}

    @Method({
      title: '下一步',
      description: '下一步',
    })
    next(): void {}

    @Method({
      title: '重新加载',
      description: '清除缓存，重新加载',
    })
    reload(): void {}

    constructor(options?: Partial<VanStepsOptions<T, V>>) {
      super();
    }
  }

  export class VanStepsOptions<T, V> extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '数据源',
      description:
        '展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑。',
      docDescription:
        '支持动态绑定集合类型变量（List<T>）或输出参数为集合类型的逻辑',
      designerValue: [{}, {}, {}],
      setter: {
        concept: 'DataSourceSetter',
      },
    })
    dataSource:
      | { list: nasl.collection.List<T>; total: nasl.core.Integer }
      | nasl.collection.List<T>;

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明',
      docDescription:
        '该属性为只读状态，当数据源动态绑定集合List<T>后，会自动识别T的类型并进行展示。',
    })
    dataSchema: T;

    @Prop({
      group: '数据属性',
      title: '步骤别名字段',
      description: '集合的元素类型中，用于步骤别名字段',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    valueField: (item: T) => nasl.core.String = ((item: any) => item.value) as any;

    @Prop({
      group: '主要属性',
      title: '当前步骤对应的索引值',
      description: '当前步骤对应的索引值',
      setter: {
        concept: 'NumberInputSetter',
      },
      sync: true,
    })
    active: nasl.core.Integer = 0;

    @Prop({
      group: '主要属性',
      title: '步骤条方向',
      description: '步骤条方向',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '垂直' }, { title: '水平' }],
      },
    })
    direction: 'vertical' | 'horizontal' = 'horizontal';

    @Prop({
      group: '主要属性',
      title: '当前步骤图标',
      description: '当前步骤对应的底部图标',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_VANT4_ICONS',
      },
    })
    activeIcon: nasl.core.String = 'checked';

    @Prop({
      group: '主要属性',
      title: '非当前步骤图标',
      description: '非当前步骤对应的底部图标',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_VANT4_ICONS',
      },
    })
    inactiveIcon: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '已完成步骤图标',
      description: '已完成步骤对应的底部图标，优先级高于 inactive-icon',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_VANT4_ICONS',
      },
    })
    finishIcon: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '当前步骤和已完成步骤的颜色',
      description: '当前步骤和已完成步骤的颜色',
      setter: {
        concept: 'InputSetter',
      },
    })
    activeColor: nasl.core.String = '#1989fa';

    @Prop({
      group: '主要属性',
      title: '未激活步骤的颜色',
      description: '未激活步骤的颜色',
      setter: {
        concept: 'InputSetter',
      },
    })
    inactiveColor: nasl.core.String = '#969799';

    @Event({
      title: '步骤切换',
      description: '步骤切换',
    })
    onClickStep: (current: Current<T>) => void;

    @Slot({
      title: '默认插槽',
      description: '默认插槽',
      emptyBackground: 'add-sub',
      snippets: [
        {
          title: '步骤条项',
          code: '<van-step><van-text text="步骤 N"></van-text></van-step>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '步骤条项内容',
      description: '步骤条项内容',
    })
    slotContent: (current: Current<T>) => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      parentAccept: "target.tag.endsWith('van-steps')",
      forceRefresh: 'parent',
    },
  })
  @Component({
    title: '步骤条项',
    description: '步骤条项',
  })
  export class VanStep extends ViewComponent {
    constructor(options?: Partial<VanStepOptions>) {
      super();
    }
  }

  export class VanStepOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '步骤别名',
      description: '步骤别名，用与步骤条根据别名来指定当前步骤',
      setter: {
        concept: 'InputSetter',
      },
    })
    value: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '激活状态图标',
      description: '激活状态图标',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_VANT4_ICONS',
      },
    })
    activeIcon: nasl.core.String = 'checked';

    @Prop({
      group: '主要属性',
      title: '未激活状态图标',
      description: '未激活状态图标',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_VANT4_ICONS',
      },
    })
    inactiveIcon: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '已完成步骤图标',
      description: '已完成步骤图标，优先级高于 inactive-icon',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_VANT4_ICONS',
      },
    })
    finishIcon: nasl.core.String;

    @Slot({
      title: '默认插槽',
      description: '默认插槽',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}